import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

async function testEmbed() {
  const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });

  const modelsToTest = ['text-embedding-004', 'embedding-001', 'models/text-embedding-004', 'gemini-1.5-flash'];

  for (const model of modelsToTest) {
    try {
      console.log(`Testing model: ${model}`);
      const response = await ai.models.embedContent({
        model: model,
        contents: "teste",
        config: {
          outputDimensionality: 768,
        }
      });
      console.log(`✅ Success for ${model}! Vector size: ${response.embeddings?.[0]?.values?.length}`);
    } catch (e: any) {
      console.log(`❌ Failed for ${model}: ${e.message}`);
    }
  }
}

testEmbed();
