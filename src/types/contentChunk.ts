/**
 * Representa um "pedaço" de conteúdo processado para busca vetorial.
 */
export interface ContentChunk {
  chunkId: string;
  sectionId: string;
  kind: 'event' | 'section';
  subId: string;
  sectionTitle: string;
  chunkTitle: string | null;
  text: string;
  contentHash: string;
  embedding?: number[];
  embedModel?: string;
  updatedAt?: any;
}

/**
 * Resultado de uma busca vetorial no backend.
 */
export interface RetrievalResult {
  /** O chunk recuperado */
  chunk: ContentChunk;
  
  /** Score de similaridade (0 a 1) */
  score: number;
}
