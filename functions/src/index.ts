import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/chat", async (req, res) => {
  try {
    // A chave agora é pega via process.env.GEMINI_API_KEY que o Secret Manager expõe
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const { message, context } = req.body;
    
    const prompt = `Você é um assistente teológico especializado em Escatologia Bíblica. 
Responda à pergunta do usuário com base no seguinte contexto do material de estudo.
Seja claro, objetivo e mantenha um tom respeitoso e acadêmico.

Contexto do material:
${context}

Pergunta do usuário:
${message}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

// Usando region default (us-central1) e permitindo acesso a segredos
export const api = onRequest({ secrets: ["GEMINI_API_KEY"] }, app);
