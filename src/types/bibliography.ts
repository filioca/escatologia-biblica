export type BibLanguage =
  | 'pt' | 'en' | 'de' | 'fr' | 'la' | 'gr' | 'he' | 'nl' | 'es';

export type BibLevel =
  | 'introdutório'
  | 'intermediário'
  | 'avançado'
  | 'acadêmico'
  | 'fonte primária';

export type BibCategoryId =
  | 'fundamentos'
  | 'antigoTestamento'
  | 'apocalipse'
  | 'sistemasMilenaristas'
  | 'tribulacionismo'
  | 'pactoVsDispensacional'
  | 'estadoIntermediario'
  | 'historiaDoutrina'
  | 'contemporanea'
  | 'catolicaOrtodoxa'
  | 'heterodoxosSionismo'
  | 'escatologiaPaulina'
  | 'escatologiaJoanina'
  | 'exegeseComentarios';

export interface BibTranslationPT {
  title: string;
  publisher: string;
  year?: number;
  isbn?: string;
}

export interface BibOnlineLink {
  label: string;
  url: string;
}

export interface BibEntry {
  id: string;
  author: string;
  role?: 'author' | 'editor' | 'coEditor';
  coAuthors?: string[];
  title: string;
  subtitle?: string;
  publisher?: string;
  year: number | string;
  isbn?: string;
  originalLanguage: BibLanguage;
  translationPT?: BibTranslationPT;
  level: BibLevel;
  review: string;
  onlineLinks?: BibOnlineLink[];
  citedInEventIds?: string[];
  recommendedFor?: string[];
  crossReferences?: string[];
}

export interface BibCategory {
  id: BibCategoryId;
  title: string;
  intro: string;
  entries: BibEntry[];
}

export interface BibAuthorIndexItem {
  author: string;
  entryIds: string[];
}

export interface BibliographyData {
  categories: BibCategory[];
  authorIndex: BibAuthorIndexItem[];
}

// ---------------------------------------------------------------------------
// Tipos Firestore — adicionados na Fase 1 (não substituem os tipos acima)
// ---------------------------------------------------------------------------

/**
 * Documento na collection `bibliography_entries` do Firestore.
 * Shape produzido pelo seed e consumido pelo BibliographyService.
 */
export interface FirestoreEntry {
  id: string;
  categoryId: BibCategoryId;
  categoryOrder: number;
  entryOrder: number;
  author: string;
  authorNormalized: string;
  coAuthors: string[];
  title: string;
  subtitle: string | null;
  publisher: string | null;
  year: number | string;
  isbn: string | null;
  originalLanguage: BibLanguage;
  translationPT: BibTranslationPT | null;
  level: BibLevel;
  review: string;
  onlineLinks: BibOnlineLink[];
  crossReferences: string[];
  citedInEventIds: string[];
  recommendedFor: string[];
  isPremium: boolean;
  createdAt: unknown; // Firestore Timestamp — não tipado aqui para evitar dep. no SDK
  updatedAt: unknown;
}

/**
 * Documento na collection `bibliography_categories` do Firestore.
 */
export interface FirestoreCategory {
  id: BibCategoryId;
  title: string;
  intro: string;
  order: number;
  isPremium: boolean;
  updatedAt: unknown;
}

/**
 * Resultado de listEntriesByCategory quando o acesso é negado pelas rules.
 */
export interface AccessDeniedResult {
  accessDenied: true;
  entries: [];
}

/**
 * Resultado bem-sucedido de listEntriesByCategory.
 */
export interface EntriesResult {
  accessDenied: false;
  entries: FirestoreEntry[];
}

export type EntriesQueryResult = EntriesResult | AccessDeniedResult;
