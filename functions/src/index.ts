import * as functions from "firebase-functions/v1";
import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue, Timestamp } from "firebase-admin/firestore";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import { buildSystemPrompt } from "./chatPrompt";

// ---------------------------------------------------------------------------
// Configurações Globais
// ---------------------------------------------------------------------------
const DATABASE_ID = "apocalipse-biblico";
const EMBED_MODEL = "gemini-embedding-001";
const CHAT_MODEL = "gemini-2.5-flash";
const OUTPUT_DIM = 768;

// ---------------------------------------------------------------------------
// Firebase Admin — inicialização idempotente
// ---------------------------------------------------------------------------
if (getApps().length === 0) {
  initializeApp();
}

const db = getFirestore(DATABASE_ID);

// ---------------------------------------------------------------------------
// Constantes de quota
// ---------------------------------------------------------------------------
const FREE_QUOTA = 10;
const SUBSCRIBER_QUOTA = 500;

// ---------------------------------------------------------------------------
// Helpers — Autenticação e Quota
// ---------------------------------------------------------------------------

async function verifyToken(
  authHeader: string | undefined
): Promise<{ uid: string; isSubscriber: boolean }> {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Token ausente ou malformado.");
  }
  const token = authHeader.slice(7);
  const decoded = await getAuth().verifyIdToken(token);
  return {
    uid: decoded.uid,
    isSubscriber: decoded["subscriber"] === true,
  };
}

function currentMonthKey(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

async function checkAndIncrementQuota(
  uid: string,
  isSubscriber: boolean
): Promise<{ allowed: boolean; used: number; limit: number; resetsAt: string }> {
  const limit = isSubscriber ? SUBSCRIBER_QUOTA : FREE_QUOTA;
  const monthKey = currentMonthKey();

  const now = new Date();
  const nextMonthDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)
  );
  const resetsAt = nextMonthDate.toISOString().split("T")[0] as string;

  const docRef = db
    .collection("users")
    .doc(uid)
    .collection("usage")
    .doc("chat");

  let used = 0;
  let allowed = false;

  await db.runTransaction(async (transaction) => {
    const snap = await transaction.get(docRef);

    if (!snap.exists) {
      transaction.set(docRef, {
        monthKey,
        count: 1,
        updatedAt: Timestamp.now(),
      });
      used = 1;
      allowed = true;
      return;
    }

    const data = snap.data()!;
    const storedMonth = data["monthKey"] as string;
    const currentCount = data["count"] as number;

    if (storedMonth !== monthKey) {
      transaction.set(docRef, {
        monthKey,
        count: 1,
        updatedAt: Timestamp.now(),
      });
      used = 1;
      allowed = true;
      return;
    }

    if (currentCount >= limit) {
      used = currentCount;
      allowed = false;
      return;
    }

    transaction.update(docRef, {
      count: FieldValue.increment(1),
      updatedAt: Timestamp.now(),
    });
    used = currentCount + 1;
    allowed = true;
  });

  return { allowed, used, limit, resetsAt };
}

async function decrementQuota(uid: string): Promise<void> {
  try {
    const docRef = db
      .collection("users")
      .doc(uid)
      .collection("usage")
      .doc("chat");
    await docRef.update({
      count: FieldValue.increment(-1),
      updatedAt: Timestamp.now(),
    });
  } catch (err) {
    console.error("[chat] Falha na compensação de quota:", err);
  }
}

// ---------------------------------------------------------------------------
// Helpers — RAG (Retrieval-Augmented Generation)
// ---------------------------------------------------------------------------

/**
 * Gera o embedding do query usando o padrão GoogleGenAI.
 */
async function embedQuery(ai: any, text: string): Promise<number[]> {
  const result = await ai.models.embedContent({
    model: EMBED_MODEL,
    contents: text,
    config: {
      taskType: "RETRIEVAL_QUERY",
      outputDimensionality: OUTPUT_DIM,
    }
  });
  return result.embeddings[0].values;
}

/**
 * Recupera o contexto relevante do Firestore usando busca vetorial.
 */
async function retrieveContext(ai: any, userQuery: string): Promise<string> {
  try {
    const vector = await embedQuery(ai, userQuery);
    const collectionRef = db.collection("content_chunks");

    const snapshot = await collectionRef.findNearest({
      vectorField: "embedding",
      queryVector: vector,
      distanceMeasure: "COSINE",
      limit: 5
    }).get();

    if (snapshot.empty) return "";

    let contextParts: string[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const titleStr = data.chunkTitle ? `${data.sectionTitle} - ${data.chunkTitle}` : data.sectionTitle;
      contextParts.push(`[Seção: ${titleStr}] ${data.text}`);
    });

    return contextParts.join("\n\n");
  } catch (err) {
    console.error("[RAG] Erro ao recuperar contexto:", err);
    throw new Error("Falha na recuperação de contexto teológico.");
  }
}

// ---------------------------------------------------------------------------
// Express App
// ---------------------------------------------------------------------------
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// GET /api/health
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// POST /api/chat
app.post("/api/chat", async (req, res) => {
  // ── 1. Autenticação ──
  let uid: string;
  let isSubscriber: boolean;

  try {
    const tokenResult = await verifyToken(req.headers.authorization);
    uid = tokenResult.uid;
    isSubscriber = tokenResult.isSubscriber;
  } catch (err) {
    console.error("[chat] Falha ao verificar token:", err);
    res.status(401).json({ error: "unauthorized", message: "Autenticação necessária." });
    return;
  }

  // ── 2. Quota ──
  let quota: { allowed: boolean; used: number; limit: number; resetsAt: string };
  try {
    quota = await checkAndIncrementQuota(uid, isSubscriber);
  } catch (err) {
    console.error("[chat] Falha ao verificar quota:", err);
    res.status(500).json({ error: "internal_error", message: "Erro ao verificar quota." });
    return;
  }

  if (!quota.allowed) {
    res.status(429).json({
      error: "quota_exceeded",
      message: `Limite de ${quota.limit} mensagens atingido.`,
      quota: { used: quota.used, limit: quota.limit, resetsAt: quota.resetsAt },
    });
    return;
  }

  // ── 3. Extração e Validação de Mensagens ──
  const { message, messages } = req.body as {
    message?: string;
    messages?: Array<{ role: string; content: string }>;
  };

  const chatHistory = messages || [];
  let lastUserQuery = "";

  if (message) {
    lastUserQuery = message.trim();
  } else if (chatHistory.length > 0) {
    for (let i = chatHistory.length - 1; i >= 0; i--) {
      if (chatHistory[i].role === "user") {
        lastUserQuery = chatHistory[i].content.trim();
        break;
      }
    }
  }

  if (!lastUserQuery) {
    await decrementQuota(uid);
    res.status(400).json({ error: "bad_request", message: "Pergunta do usuário não encontrada." });
    return;
  }

  // ── 4. Retrieval (RAG) ──
  let contextStr = "";
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    contextStr = await retrieveContext(ai, lastUserQuery);
  } catch (err) {
    console.error("[chat] Erro no RAG:", err);
    await decrementQuota(uid);
    res.status(500).json({ 
      error: "rag_error", 
      message: "Falha ao buscar contexto teológico. Tente novamente." 
    });
    return;
  }

  // ── 5. Geração de Resposta ──
  try {
    const systemInstruction = buildSystemPrompt(contextStr);

    const result = await ai.models.generateContent({
      model: CHAT_MODEL,
      contents: [
        { role: "user", parts: [{ text: systemInstruction }] },
        { role: "model", parts: [{ text: "Compreendido. Sou o assistente da Enciclopédia Escatológica Bíblica e responderei estritamente com base nos fatos e contextos fornecidos." }] },
        ...chatHistory.map(m => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }]
        })),
        ...(message ? [{ role: "user", parts: [{ text: message }] }] : [])
      ]
    });

    const replyText = result.text ?? "";

    console.log(`[chat] uid=${uid} quota=${quota.used}/${quota.limit} contextSize=${contextStr.length}`);

    res.json({
      reply: replyText,
      quota: {
        used: quota.used,
        limit: quota.limit,
        resetsAt: quota.resetsAt,
      },
    });

  } catch (err) {
    console.error("[chat] Falha na geração Gemini:", err);
    await decrementQuota(uid);
    res.status(500).json({
      error: "gemini_error",
      message: "Falha ao gerar resposta. Sua cota foi preservada.",
    });
  }
});

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
export const apiV1 = functions
  .runWith({ 
    secrets: ["GEMINI_API_KEY"],
    memory: "512MB",
    timeoutSeconds: 60
  })
  .https.onRequest(app);
