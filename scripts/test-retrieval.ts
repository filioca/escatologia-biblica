import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';
import { ContentChunk } from '../src/types/contentChunk.js';

/**
 * CONFIGURAÇÕES RAG
 */
const PROJECT_ID = 'apocalipse-biblico';
const DATABASE_ID = 'apocalipse-biblico';
const EMBED_MODEL = 'gemini-embedding-001';
const OUTPUT_DIM = 768;

/**
 * INICIALIZAÇÃO
 */
initializeApp({
  projectId: PROJECT_ID,
  credential: applicationDefault()
});

const db = getFirestore(DATABASE_ID);
const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

/**
 * Perguntas sintéticas para teste de retrieval
 */
const TEST_QUERIES = [
  "O que é a estrutura dos dois eons?",
  "Diferença entre dispensacionalismo e teologia do pacto?",
  "O dia do Senhor no Antigo Testamento"
];

/**
 * Gera o embedding de uma pergunta usando taskType: RETRIEVAL_QUERY.
 */
async function embedQuery(text: string): Promise<number[]> {
  const result = await ai.models.embedContent({
    model: EMBED_MODEL,
    contents: text,
    config: {
      taskType: 'RETRIEVAL_QUERY',
      outputDimensionality: OUTPUT_DIM,
    }
  });
  return result.embeddings[0].values;
}

/**
 * Executa a busca vetorial no Firestore.
 */
async function performRetrieval(queryText: string) {
  process.stdout.write(`🔍 Pesquisando: "${queryText}"... `);
  
  try {
    const vector = await embedQuery(queryText);
    const collectionRef = db.collection('content_chunks');
    
    // Busca vetorial usando findNearest
    const snapshot = await collectionRef.findNearest({
      vectorField: 'embedding',
      queryVector: vector,
      distanceMeasure: 'COSINE',
      limit: 5
    }).get();

    console.log('✅ Finalizado.\n');

    if (snapshot.empty) {
      console.log('⚠️ Nenhum resultado encontrado.');
      return;
    }

    snapshot.forEach((doc) => {
      const data = doc.data() as ContentChunk;
      const titleStr = data.chunkTitle ? `${data.sectionTitle} - ${data.chunkTitle}` : data.sectionTitle;
      console.log(`📌 SECÇÃO: ${data.sectionId} | TÍTULO: ${titleStr}`);
      console.log(`📄 PREVIEW: ${data.text.substring(0, 150).replace(/\n/g, ' ')}...`);
      console.log(`---`);
    });
    console.log('\n');

  } catch (error) {
    console.error(`\n❌ Erro durante o retrieval:`, error);
  }
}

/**
 * SCRIPT PRINCIPAL
 */
async function main() {
  console.log('🧪 Iniciando Teste de Retrieval Sintético...\n');
  
  for (const query of TEST_QUERIES) {
    await performRetrieval(query);
  }

  console.log('🏁 Teste de Retrieval concluído.');
}

main().catch(err => {
  console.error('💥 Erro fatal no teste:', err);
  process.exit(1);
});
