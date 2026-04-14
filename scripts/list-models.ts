import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

async function listModels() {
  const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });

  try {
    const models = await ai.models.list();
    for await (const model of models) {
      if (model.name.includes("embed")) {
        console.log(`Model: ${model.name}`);
      }
    }
  } catch (e: any) {
    console.log(`❌ Failed: ${e.message}`);
  }
}

listModels();
