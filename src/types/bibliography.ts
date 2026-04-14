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
