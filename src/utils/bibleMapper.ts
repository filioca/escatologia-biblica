export type Translation = 'porARC' | 'porNVI' | 'porNTLH';

export const TRANSLATIONS: { id: Translation; label: string; description: string }[] = [
  { id: 'porARC', label: 'ARC', description: 'Almeida Revista e Corrigida' },
  { id: 'porNVI', label: 'NVI', description: 'Nova Versão Internacional' },
  { id: 'porNTLH', label: 'NTLH', description: 'Nova Tradução na Linguagem de Hoje' },
];

export const TRANSLATION_STORAGE_KEY = 'bible-translation';

// Portuguese abbreviation → 3-letter book code (for bible.helloao.org API)
const bookCodeMap: Record<string, string> = {
  'Gn': 'GEN', 'Êx': 'EXO', 'Lv': 'LEV', 'Nm': 'NUM', 'Dt': 'DEU',
  'Js': 'JOS', 'Jz': 'JDG', 'Rt': 'RUT', '1Sm': '1SA', '2Sm': '2SA',
  '1Rs': '1KI', '2Rs': '2KI', '1Cr': '1CH', '2Cr': '2CH',
  'Ed': 'EZR', 'Ne': 'NEH', 'Et': 'EST', 'Jó': 'JOB', 'Sl': 'PSA',
  'Pv': 'PRO', 'Ec': 'ECC', 'Ct': 'SNG', 'Is': 'ISA',
  'Jr': 'JER', 'Lm': 'LAM', 'Ez': 'EZK', 'Dn': 'DAN',
  'Os': 'HOS', 'Jl': 'JOL', 'Am': 'AMO', 'Ob': 'OBA', 'Jn': 'JON',
  'Mq': 'MIC', 'Na': 'NAM', 'Hc': 'HAB', 'Sf': 'ZEP', 'Ag': 'HAG',
  'Zc': 'ZEC', 'Ml': 'MAL',
  'Mt': 'MAT', 'Mc': 'MRK', 'Lc': 'LUK', 'Jo': 'JHN', 'At': 'ACT',
  'Rm': 'ROM', '1Co': '1CO', '2Co': '2CO', 'Gl': 'GAL',
  'Ef': 'EPH', 'Fp': 'PHP', 'Cl': 'COL', '1Ts': '1TH',
  '2Ts': '2TH', '1Tm': '1TI', '2Tm': '2TI', 'Tt': 'TIT',
  'Fm': 'PHM', 'Hb': 'HEB', 'Tg': 'JAS', '1Pe': '1PE', '2Pe': '2PE',
  '1Jo': '1JN', '2Jo': '2JN', '3Jo': '3JN', 'Jd': 'JUD', 'Ap': 'REV',
};

// Portuguese abbreviation → full Portuguese name (for display)
const bookNameMap: Record<string, string> = {
  'Gn': 'Gênesis', 'Êx': 'Êxodo', 'Lv': 'Levítico', 'Nm': 'Números', 'Dt': 'Deuteronômio',
  'Js': 'Josué', 'Jz': 'Juízes', 'Rt': 'Rute', '1Sm': '1 Samuel', '2Sm': '2 Samuel',
  '1Rs': '1 Reis', '2Rs': '2 Reis', '1Cr': '1 Crônicas', '2Cr': '2 Crônicas',
  'Ed': 'Esdras', 'Ne': 'Neemias', 'Et': 'Ester', 'Jó': 'Jó', 'Sl': 'Salmos',
  'Pv': 'Provérbios', 'Ec': 'Eclesiastes', 'Ct': 'Cânticos', 'Is': 'Isaías',
  'Jr': 'Jeremias', 'Lm': 'Lamentações', 'Ez': 'Ezequiel', 'Dn': 'Daniel',
  'Os': 'Oséias', 'Jl': 'Joel', 'Am': 'Amós', 'Ob': 'Obadias', 'Jn': 'Jonas',
  'Mq': 'Miquéias', 'Na': 'Naum', 'Hc': 'Habacuque', 'Sf': 'Sofonias', 'Ag': 'Ageu',
  'Zc': 'Zacarias', 'Ml': 'Malaquias',
  'Mt': 'Mateus', 'Mc': 'Marcos', 'Lc': 'Lucas', 'Jo': 'João', 'At': 'Atos',
  'Rm': 'Romanos', '1Co': '1 Coríntios', '2Co': '2 Coríntios', 'Gl': 'Gálatas',
  'Ef': 'Efésios', 'Fp': 'Filipenses', 'Cl': 'Colossenses', '1Ts': '1 Tessalonicenses',
  '2Ts': '2 Tessalonicenses', '1Tm': '1 Timóteo', '2Tm': '2 Timóteo', 'Tt': 'Tito',
  'Fm': 'Filemom', 'Hb': 'Hebreus', 'Tg': 'Tiago', '1Pe': '1 Pedro', '2Pe': '2 Pedro',
  '1Jo': '1 João', '2Jo': '2 João', '3Jo': '3 João', 'Jd': 'Judas', 'Ap': 'Apocalipse',
};

export interface ParsedBibleRef {
  abbr: string;
  bookName: string;
  bookCode: string;
  chapters: number[];
  verseStart?: number;
  verseEnd?: number;
}

/**
 * Parses a Portuguese Bible reference into its components.
 *
 * Supported formats:
 *   "Mt 5"        → chapter 5 (whole chapter)
 *   "Mt 5-7"      → chapters 5 through 7
 *   "Mt 5.3"      → chapter 5, verse 3
 *   "Mt 5.3-12"   → chapter 5, verses 3 to 12
 */
export function parseRef(ptRef: string): ParsedBibleRef | null {
  const match = ptRef.trim().match(/^([^\s]+)\s+(.+)$/);
  if (!match) return null;

  const abbr = match[1];
  const rest = match[2];
  const bookCode = bookCodeMap[abbr];
  const bookName = bookNameMap[abbr] || abbr;

  if (!bookCode) return null;

  // Chapter range: "5-7" or "5–7"
  const chapterRange = rest.match(/^(\d+)[–-](\d+)$/);
  if (chapterRange) {
    const start = parseInt(chapterRange[1]);
    const end = parseInt(chapterRange[2]);
    const chapters = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    return { abbr, bookName, bookCode, chapters };
  }

  // Chapter + verse range: "5.3-12" or "5.3–12"
  const chapterVerseRange = rest.match(/^(\d+)[.](\d+)[–-](\d+)$/);
  if (chapterVerseRange) {
    const chapter = parseInt(chapterVerseRange[1]);
    const verseStart = parseInt(chapterVerseRange[2]);
    const verseEnd = parseInt(chapterVerseRange[3]);
    return { abbr, bookName, bookCode, chapters: [chapter], verseStart, verseEnd };
  }

  // Chapter + single verse: "5.3"
  const chapterVerse = rest.match(/^(\d+)[.](\d+)$/);
  if (chapterVerse) {
    const chapter = parseInt(chapterVerse[1]);
    const verse = parseInt(chapterVerse[2]);
    return { abbr, bookName, bookCode, chapters: [chapter], verseStart: verse, verseEnd: verse };
  }

  // Whole chapter: "5"
  const singleChapter = rest.match(/^(\d+)$/);
  if (singleChapter) {
    return { abbr, bookName, bookCode, chapters: [parseInt(singleChapter[1])] };
  }

  // Chapter + comma-separated verses: "5.3,7" → treat as range 3-7
  const commaVerses = rest.match(/^(\d+)[.](\d+)(?:,(\d+))+$/);
  if (commaVerses) {
    const chapter = parseInt(commaVerses[1]);
    const nums = rest.split('.')[1].split(',').map(Number);
    return { abbr, bookName, bookCode, chapters: [chapter], verseStart: nums[0], verseEnd: nums[nums.length - 1] };
  }

  return null;
}

/** Builds the API URL for a specific chapter on bible.helloao.org */
export function buildChapterUrl(bookCode: string, chapter: number, translation: Translation): string {
  return `https://bible.helloao.org/api/${translation}/${bookCode}/${chapter}.json`;
}

/** Extracts verse text from the helloao chapter content array */
export function extractVerseText(
  content: any[],
  verseStart?: number,
  verseEnd?: number
): string {
  const lines: string[] = [];

  const textFromContent = (items: any[]): string =>
    items.map(item => {
      if (typeof item === 'string') return item;
      if (!item || typeof item !== 'object') return '';
      if (item.type === 'line_break') return ' ';
      if (item.type === 'footnote_ref') return '';
      if (item.text) return item.text;
      if (Array.isArray(item.content)) return textFromContent(item.content);
      return '';
    }).join('');

  for (const item of content) {
    if (item?.type !== 'verse') continue;
    const num: number = item.number;
    if (verseStart !== undefined && (num < verseStart || num > (verseEnd ?? verseStart))) continue;
    const text = textFromContent(item.content ?? []).trim();
    if (text) lines.push(`${num} ${text}`);
  }

  return lines.join('\n');
}

// ─── Legacy export (kept for compatibility) ──────────────────────────────────

/** @deprecated Use parseRef + buildChapterUrl instead */
export function parseBibleRef(ptRef: string): string {
  const parsed = parseRef(ptRef);
  if (!parsed) return ptRef;
  const chapter = parsed.chapters[0];
  let ref = `${parsed.bookName} ${chapter}`;
  if (parsed.verseStart) ref += `:${parsed.verseStart}`;
  if (parsed.verseEnd && parsed.verseEnd !== parsed.verseStart) ref += `-${parsed.verseEnd}`;
  return ref;
}
