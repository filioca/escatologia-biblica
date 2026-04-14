import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  parseRef,
  buildChapterUrl,
  extractVerseText,
  TRANSLATIONS,
  TRANSLATION_STORAGE_KEY,
  type Translation,
  type ParsedBibleRef,
} from '../utils/bibleMapper';

interface ChapterData {
  chapterNum: number;
  text: string;
}

export const VerseLink: React.FC<{ reference: string }> = ({ reference }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [translation, setTranslation] = useState<Translation>(
    () => (localStorage.getItem(TRANSLATION_STORAGE_KEY) as Translation) || 'porARC'
  );
  const [chaptersData, setChaptersData] = useState<ChapterData[] | null>(null);

  // Cache across translation changes: "porNVI:Mt 5-7" → ChapterData[]
  const cache = useRef<Map<string, ChapterData[]>>(new Map());

  // Parse the reference once
  const parsedRef = useRef<ParsedBibleRef | null>(parseRef(reference));

  useEffect(() => { setMounted(true); }, []);

  const fetchFor = async (trans: Translation) => {
    const cacheKey = `${trans}:${reference}`;
    const cached = cache.current.get(cacheKey);
    if (cached) {
      setChaptersData(cached);
      return;
    }

    const parsed = parsedRef.current;
    if (!parsed) {
      setError('Referência não reconhecida');
      return;
    }

    setLoading(true);
    setError('');
    setChaptersData(null);

    try {
      const results: ChapterData[] = [];
      const isMultiChapter = parsed.chapters.length > 1;

      for (const chapterNum of parsed.chapters) {
        const url = buildChapterUrl(parsed.bookCode, chapterNum, trans);
        const res = await fetch(url);
        if (!res.ok) throw new Error();
        const data = await res.json();

        // Only apply verse filter for single-chapter references
        const text = extractVerseText(
          data.chapter?.content ?? [],
          isMultiChapter ? undefined : parsed.verseStart,
          isMultiChapter ? undefined : parsed.verseEnd,
        );

        results.push({ chapterNum, text });
      }

      cache.current.set(cacheKey, results);
      setChaptersData(results);
    } catch {
      setError('Não foi possível carregar a passagem.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (!chaptersData && !loading) fetchFor(translation);
  };

  const handleTranslationChange = (newTrans: Translation) => {
    if (newTrans === translation) return;
    setTranslation(newTrans);
    localStorage.setItem(TRANSLATION_STORAGE_KEY, newTrans);
    fetchFor(newTrans);
  };

  // Build display title from parsed ref
  const parsed = parsedRef.current;
  const restPart = reference.includes(' ') ? reference.slice(reference.indexOf(' ') + 1) : '';
  const displayTitle = parsed ? `${parsed.bookName} ${restPart}` : reference;
  const isMultiChapter = (parsed?.chapters.length ?? 0) > 1;

  return (
    <>
      <button
        onClick={handleOpen}
        className="inline-flex items-center gap-1 text-gold hover:text-gold-light underline decoration-gold/30 hover:decoration-gold transition-colors font-semibold"
      >
        {reference}
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-deep/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                onClick={e => e.stopPropagation()}
                className="bg-surface border border-border rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col overflow-hidden"
              >
                {/* Header */}
                <div className="px-4 py-3 border-b border-border bg-surface2 flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-gold flex-1 min-w-0">
                    <BookOpen size={18} className="shrink-0" />
                    <h3 className="font-display font-semibold tracking-wider truncate text-sm">
                      {displayTitle}
                    </h3>
                  </div>

                  {/* Translation selector */}
                  <div className="flex rounded-lg overflow-hidden border border-border shrink-0">
                    {TRANSLATIONS.map(t => (
                      <button
                        key={t.id}
                        onClick={() => handleTranslationChange(t.id)}
                        title={t.description}
                        className={`px-2.5 py-1 text-xs font-mono transition-colors ${
                          translation === t.id
                            ? 'bg-gold text-deep font-bold'
                            : 'text-text-muted hover:text-text-main hover:bg-surface'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-text-muted hover:text-text-main transition-colors shrink-0"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                  {loading ? (
                    <div className="flex items-center justify-center py-8 gap-3 text-gold">
                      <Loader2 className="animate-spin" size={24} />
                      <span className="text-sm">Buscando passagem…</span>
                    </div>
                  ) : error ? (
                    <div className="text-sys-red text-center py-4 text-sm">{error}</div>
                  ) : chaptersData ? (
                    <div className="space-y-6">
                      {chaptersData.map(({ chapterNum, text }) => (
                        <div key={chapterNum}>
                          {isMultiChapter && (
                            <p className="text-xs font-mono uppercase tracking-widest text-gold/70 mb-3">
                              Capítulo {chapterNum}
                            </p>
                          )}
                          <p className="text-xl md:text-2xl text-text-main leading-relaxed font-sans text-justify whitespace-pre-wrap not-italic">
                            {text}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
