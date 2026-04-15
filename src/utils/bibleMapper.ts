// ─── Translations ─────────────────────────────────────────────────────────────
//
// Data source: github.com/thiagobodruk/bible (JSON files, no API key required)
// Files are ~3-4 MB each and are loaded lazily, then cached in memory.

export type Translation = 'pt_acf' | 'pt_nvi' | 'en_kjv';

export const TRANSLATIONS: { id: Translation; label: string; description: string }[] = [
  { id: 'pt_acf', label: 'ACF',  description: 'Almeida Corrigida e Fiel' },
  { id: 'pt_nvi', label: 'NVI',  description: 'Nova Versão Internacional' },
  { id: 'en_kjv', label: 'KJV',  description: 'King James Version' },
];

export const TRANSLATION_STORAGE_KEY = 'bible-translation';

// ─── Abbreviation maps ────────────────────────────────────────────────────────
//
// Portuguese abbreviation → JSON abbreviation used in thiagobodruk/bible files.
// pt_acf and pt_nvi share the same abbreviations; en_kjv uses a different set.

const ptToPortAbbr: Record<string, string> = {
  'Gn':'gn',  'Êx':'ex',  'Lv':'lv',  'Nm':'nm',  'Dt':'dt',
  'Js':'js',  'Jz':'jz',  'Rt':'rt',  '1Sm':'1sm','2Sm':'2sm',
  '1Rs':'1rs','2Rs':'2rs','1Cr':'1cr','2Cr':'2cr',
  'Ed':'ed',  'Ne':'ne',  'Et':'et',  'Jó':'jó',  'Sl':'sl',
  'Pv':'pv',  'Ec':'ec',  'Ct':'ct',  'Is':'is',
  'Jr':'jr',  'Lm':'lm',  'Ez':'ez',  'Dn':'dn',
  'Os':'os',  'Jl':'jl',  'Am':'am',  'Ob':'ob',  'Jn':'jn',
  'Mq':'mq',  'Na':'na',  'Hc':'hc',  'Sf':'sf',  'Ag':'ag',
  'Zc':'zc',  'Ml':'ml',
  'Mt':'mt',  'Mc':'mc',  'Lc':'lc',  'Jo':'jo',  'At':'atos',
  'Rm':'rm',  '1Co':'1co','2Co':'2co','Gl':'gl',
  'Ef':'ef',  'Fp':'fp',  'Cl':'cl',  '1Ts':'1ts',
  '2Ts':'2ts','1Tm':'1tm','2Tm':'2tm','Tt':'tt',
  'Fm':'fm',  'Hb':'hb',  'Tg':'tg',  '1Pe':'1pe','2Pe':'2pe',
  '1Jo':'1jo','2Jo':'2jo','3Jo':'3jo','Jd':'jd',  'Ap':'ap',
};

const ptToKjvAbbr: Record<string, string> = {
  'Gn':'gn',  'Êx':'ex',  'Lv':'lv',  'Nm':'nm',  'Dt':'dt',
  'Js':'js',  'Jz':'jud', 'Rt':'rt',  '1Sm':'1sm','2Sm':'2sm',
  '1Rs':'1kgs','2Rs':'2kgs','1Cr':'1ch','2Cr':'2ch',
  'Ed':'ezr', 'Ne':'ne',  'Et':'et',  'Jó':'job', 'Sl':'ps',
  'Pv':'prv', 'Ec':'ec',  'Ct':'so',  'Is':'is',
  'Jr':'jr',  'Lm':'lm',  'Ez':'ez',  'Dn':'dn',
  'Os':'ho',  'Jl':'jl',  'Am':'am',  'Ob':'ob',  'Jn':'jn',
  'Mq':'mi',  'Na':'na',  'Hc':'hk',  'Sf':'zp',  'Ag':'hg',
  'Zc':'zc',  'Ml':'ml',
  'Mt':'mt',  'Mc':'mk',  'Lc':'lk',  'Jo':'jo',  'At':'act',
  'Rm':'rm',  '1Co':'1co','2Co':'2co','Gl':'gl',
  'Ef':'eph', 'Fp':'ph',  'Cl':'cl',  '1Ts':'1ts',
  '2Ts':'2ts','1Tm':'1tm','2Tm':'2tm','Tt':'tt',
  'Fm':'phm', 'Hb':'hb',  'Tg':'jm',  '1Pe':'1pe','2Pe':'2pe',
  '1Jo':'1jo','2Jo':'2jo','3Jo':'3jo','Jd':'jd',  'Ap':'re',
};

function getJsonAbbrev(ptAbbr: string, translation: Translation): string {
  return (translation === 'en_kjv' ? ptToKjvAbbr : ptToPortAbbr)[ptAbbr] ?? ptAbbr.toLowerCase();
}

// ─── Book name map (for display) ──────────────────────────────────────────────

const bookNameMap: Record<string, string> = {
  'Gn':'Gênesis',  'Êx':'Êxodo',       'Lv':'Levítico',     'Nm':'Números',      'Dt':'Deuteronômio',
  'Js':'Josué',    'Jz':'Juízes',       'Rt':'Rute',         '1Sm':'1 Samuel',    '2Sm':'2 Samuel',
  '1Rs':'1 Reis',  '2Rs':'2 Reis',      '1Cr':'1 Crônicas',  '2Cr':'2 Crônicas',
  'Ed':'Esdras',   'Ne':'Neemias',      'Et':'Ester',        'Jó':'Jó',           'Sl':'Salmos',
  'Pv':'Provérbios','Ec':'Eclesiastes', 'Ct':'Cânticos',     'Is':'Isaías',
  'Jr':'Jeremias', 'Lm':'Lamentações',  'Ez':'Ezequiel',     'Dn':'Daniel',
  'Os':'Oséias',   'Jl':'Joel',         'Am':'Amós',         'Ob':'Obadias',      'Jn':'Jonas',
  'Mq':'Miquéias', 'Na':'Naum',         'Hc':'Habacuque',    'Sf':'Sofonias',     'Ag':'Ageu',
  'Zc':'Zacarias', 'Ml':'Malaquias',
  'Mt':'Mateus',   'Mc':'Marcos',       'Lc':'Lucas',        'Jo':'João',         'At':'Atos',
  'Rm':'Romanos',  '1Co':'1 Coríntios', '2Co':'2 Coríntios', 'Gl':'Gálatas',
  'Ef':'Efésios',  'Fp':'Filipenses',   'Cl':'Colossenses',  '1Ts':'1 Tessalonicenses',
  '2Ts':'2 Tessalonicenses','1Tm':'1 Timóteo','2Tm':'2 Timóteo','Tt':'Tito',
  'Fm':'Filemom',  'Hb':'Hebreus',      'Tg':'Tiago',        '1Pe':'1 Pedro',     '2Pe':'2 Pedro',
  '1Jo':'1 João',  '2Jo':'2 João',      '3Jo':'3 João',      'Jd':'Judas',        'Ap':'Apocalipse',
};

// ─── Reference parser ─────────────────────────────────────────────────────────

export interface ParsedBibleRef {
  abbr: string;
  bookName: string;
  chapters: number[];
  verseStart?: number;
  verseEnd?: number;
}

/**
 * Parses a Portuguese Bible reference.
 * "Mt 5"      → chapter 5 (whole chapter)
 * "Mt 5-7"    → chapters 5–7
 * "Mt 5.3"    → verse 3
 * "Mt 5.3-12" → verses 3–12
 */
export function parseRef(ptRef: string): ParsedBibleRef | null {
  const m = ptRef.trim().match(/^([^\s]+)\s+(.+)$/);
  if (!m) return null;

  const abbr     = m[1];
  const rest     = m[2];
  const bookName = bookNameMap[abbr];
  if (!bookName) return null;

  const cr  = rest.match(/^(\d+)[–-](\d+)$/);
  if (cr) {
    const s = +cr[1], e = +cr[2];
    return { abbr, bookName, chapters: Array.from({ length: e - s + 1 }, (_, i) => s + i) };
  }

  const cvr = rest.match(/^(\d+)[.](\d+)[–-](\d+)$/);
  if (cvr) return { abbr, bookName, chapters: [+cvr[1]], verseStart: +cvr[2], verseEnd: +cvr[3] };

  const cv  = rest.match(/^(\d+)[.](\d+)$/);
  if (cv)  return { abbr, bookName, chapters: [+cv[1]], verseStart: +cv[2], verseEnd: +cv[2] };

  const sc  = rest.match(/^(\d+)$/);
  if (sc)  return { abbr, bookName, chapters: [+sc[1]] };

  const csv = rest.match(/^(\d+)[.](\d+(?:,\d+)+)$/);
  if (csv) {
    const nums = csv[2].split(',').map(Number);
    return { abbr, bookName, chapters: [+csv[1]], verseStart: nums[0], verseEnd: nums[nums.length - 1] };
  }

  return null;
}

// ─── Bible data loading (lazy, cached) ───────────────────────────────────────

interface BibleBook { abbrev: string; chapters: string[][] }

const bibleCache = new Map<Translation, BibleBook[]>();

const GITHUB_BASE = 'https://raw.githubusercontent.com/thiagobodruk/bible/master/json';

/**
 * Loads the full Bible JSON for a translation (~3-4 MB).
 * Result is cached in memory; subsequent calls are instant.
 */
export async function loadBible(translation: Translation): Promise<BibleBook[]> {
  const cached = bibleCache.get(translation);
  if (cached) return cached;
  const res = await fetch(`${GITHUB_BASE}/${translation}.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data: BibleBook[] = await res.json();
  bibleCache.set(translation, data);
  return data;
}

/**
 * Returns the verse strings for a specific chapter.
 * The returned array is 0-indexed: index 0 = verse 1.
 */
export function lookupChapter(
  books: BibleBook[],
  ptAbbr: string,
  chapter: number,
  translation: Translation,
): string[] {
  const jsonAbbrev = getJsonAbbrev(ptAbbr, translation);
  const book = books.find(b => b.abbrev === jsonAbbrev);
  return book?.chapters[chapter - 1] ?? [];
}

// ─── HTML builder ─────────────────────────────────────────────────────────────

const SUP = 'font-size:.68em;opacity:.45;vertical-align:super;line-height:0;margin-right:.15em;';

/**
 * Builds displayable HTML from an array of verse strings.
 * Verse numbers become superscripts; verses flow as continuous prose.
 */
export function buildVerseHtml(
  verses: string[],
  verseStart?: number,
  verseEnd?: number,
): string {
  return verses
    .map((text, i) => ({ verse: i + 1, text }))
    .filter(v => verseStart === undefined || (v.verse >= verseStart && v.verse <= (verseEnd ?? verseStart)))
    .map(v => `<sup style="${SUP}">${v.verse}</sup>${v.text.trim()}`)
    .join(' ');
}

// ─── Legacy export ────────────────────────────────────────────────────────────

/** @deprecated */
export function parseBibleRef(ptRef: string): string {
  const p = parseRef(ptRef);
  if (!p) return ptRef;
  return `${p.bookName} ${p.chapters[0]}${p.verseStart ? ':' + p.verseStart : ''}`;
}
