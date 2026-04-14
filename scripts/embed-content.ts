import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { GoogleGenAI } from '@google/genai';
import * as crypto from 'crypto';
import 'dotenv/config';
import { ContentChunk } from '../src/types/contentChunk.js';
import { eschatologyData } from '../src/data/content.js';

const PROJECT_ID = 'apocalipse-biblico';
const DATABASE_ID = 'apocalipse-biblico';
const EMBED_MODEL = 'gemini-embedding-001';
const OUTPUT_DIM = 768;

initializeApp({
  credential: applicationDefault(),
  projectId: PROJECT_ID,
});

const db = getFirestore(undefined, DATABASE_ID);
const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('❌ ERRO: Chave da API do Gemini não encontrada nas variáveis de ambiente.');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

function hashText(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex');
}

function extractChunks(): Partial<ContentChunk>[] {
  const chunks: Partial<ContentChunk>[] = [];

  for (const [sectionId, sectionData] of Object.entries(eschatologyData)) {
    const sData = sectionData as any;
    const sectionTitle = sData.title || sectionId;

    if (sData.events && Array.isArray(sData.events) && sData.events.length > 0) {
      sData.events.forEach((event: any) => {
        const textParts = [];
        if (event.title) textParts.push(event.title);
        if (event.body && Array.isArray(event.body)) {
          textParts.push(event.body.join('\n\n'));
        }

        const text = textParts.join('\n\n').trim();
        if (!text) return;

        chunks.push({
          chunkId: `ev-${event.id}`,
          sectionId,
          kind: 'event',
          subId: event.id,
          sectionTitle,
          chunkTitle: event.title || null,
          text
        });
      });
    }

    if (sData.intro || (sData.body && !sData.events)) {
      const textParts = [];
      if (sData.intro) textParts.push(sData.intro);
      if (sData.body && Array.isArray(sData.body)) {
        textParts.push(sData.body.join('\n\n'));
      }

      const text = textParts.join('\n\n').trim();
      if (text) {
        chunks.push({
          chunkId: `${sectionId}_main`,
          sectionId,
          kind: 'section',
          subId: 'main',
          sectionTitle,
          chunkTitle: null,
          text
        });
      }
    }
  }

  return chunks;
}

async function embedText(text: string): Promise<number[]> {
  try {
    const response = await ai.models.embedContent({
      model: EMBED_MODEL,
      contents: text,
      config: {
        outputDimensionality: OUTPUT_DIM,
        taskType: 'RETRIEVAL_DOCUMENT'
      }
    });

    if (!response.embeddings || response.embeddings.length === 0) {
      throw new Error('Nenhum embedding retornado pela API.');
    }

    return response.embeddings[0].values as number[];
  } catch (error: any) {
    throw new Error(`Falha da API: ${error.message}`);
  }
}

async function main() {
  try {
    const chunks = extractChunks();
    const total = chunks.length;
    console.log(`🚀 Iniciando ingestão vetorial no Firestore...`);
    console.log(`📦 Chunks extraídos: ${total}`);

    let countNew = 0;
    let countUpdated = 0;
    let countSkipped = 0;
    let countFailed = 0;

    const collection = db.collection('content_chunks');

    for (let i = 0; i < total; i++) {
      const chunk = chunks[i];
      const currentIndex = i + 1;

      if (!chunk.text || !chunk.chunkId) {
        countFailed++;
        continue;
      }

      const contentHash = hashText(chunk.text);

      try {
        const docRef = collection.doc(chunk.chunkId);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
          const storedHash = docSnap.data()?.contentHash;
          if (storedHash === contentHash) {
            console.log(`⏭️  [${currentIndex}/${total}] ${chunk.chunkId} (sem mudanças)`);
            countSkipped++;
            continue;
          }
        }

        const vector = await embedText(chunk.text);

        // A MÁGICA ACONTECE AQUI: FieldValue.vector()
        const chunkDoc: any = {
          chunkId: chunk.chunkId,
          sectionId: chunk.sectionId as string,
          kind: chunk.kind as 'event' | 'section',
          subId: chunk.subId as string,
          sectionTitle: chunk.sectionTitle as string,
          chunkTitle: chunk.chunkTitle as string | null,
          text: chunk.text,
          contentHash,
          embedding: FieldValue.vector(vector),
          embedModel: EMBED_MODEL,
          updatedAt: Timestamp.now()
        };

        await docRef.set(chunkDoc, { merge: false });

        if (docSnap.exists) {
          console.log(`🔄 [${currentIndex}/${total}] ${chunk.chunkId} atualizado.`);
          countUpdated++;
        } else {
          console.log(`✅ [${currentIndex}/${total}] ${chunk.chunkId} embedado com sucesso.`);
          countNew++;
        }

      } catch (error: any) {
        console.error(`❌ [${currentIndex}/${total}] Erro ao processar o chunk ${chunk.chunkId}: ${error.message}`);
        countFailed++;
      }
    }

    console.log(`\n--- RESUMO DA OPERAÇÃO ---`);
    console.log(`📊 Total: ${total}`);
    console.log(`✨ Novos: ${countNew}`);
    console.log(`🔄 Atualizados: ${countUpdated}`);
    console.log(`⏭️  Pulados: ${countSkipped}`);
    console.log(`⚠️  Falhas: ${countFailed}`);
    console.log(`--------------------------\n`);

    process.exit(0);
  } catch (error: any) {
    console.error(`\n💥 ERRO FATAL: ${error.message}`);
    process.exit(1);
  }
}

main();