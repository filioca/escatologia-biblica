import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  parseRef,
  loadBible,
  lookupChapter,
  buildVerseHtml,
  TRANSLATIONS,
  TRANSLATION_STORAGE_KEY,
  type Translation,
} from '../utils/bibleMapper';

interface ChapterData {
  chapterNum: number;
  html: string;
}

export const VerseLink: React.FC<{ reference: string }> = ({ reference }) => {
  const [isOpen,      setIsOpen]      = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');
  const [translation, setTranslation] = useState<Translation>(
    () => (localStorage.getItem(TRANSLATION_STORAGE_KEY) as Translation) || 'pt_acf'
  );
  const [chaptersData, setChaptersData] = useState<ChapterData[] | null>(null);

  const parsedRef = useMemo(() => parseRef(reference), [reference]);

  const fetchFor = async (trans: Translation) => {
    if (!parsedRef) { setError('Referência não reconhecida'); return; }

    setLoading(true);
    setError('');
    setChaptersData(null);

    try {
      const index   = await loadBible(trans);
      const isRange = parsedRef.chapters.length > 1;

      const results: ChapterData[] = parsedRef.chapters.map((chapterNum: number) => {
        const verses = lookupChapter(index, parsedRef.abbr, chapterNum, trans);
        const html   = buildVerseHtml(
          verses,
          isRange ? undefined : parsedRef.verseStart,
          isRange ? undefined : parsedRef.verseEnd,
        );
        return { chapterNum, html };
      });

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

  const restPart     = reference.includes(' ') ? reference.slice(reference.indexOf(' ') + 1) : '';
  const displayTitle = parsedRef ? `${parsedRef.bookName} ${restPart}` : reference;
  const isMulti      = (parsedRef?.chapters.length ?? 0) > 1;

  return (
    <>
      <button
        onClick={handleOpen}
        className="inline-flex items-center gap-1 text-gold hover:text-gold-light underline decoration-gold/30 hover:decoration-gold transition-colors font-semibold"
      >
        {reference}
      </button>

      {createPortal(
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
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                className="bg-surface border border-border rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-border bg-surface2 flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-gold flex-1 min-w-0">
                    <BookOpen size={18} className="shrink-0" />
                    <h3 className="font-display font-semibold tracking-wider truncate text-sm">
                      {displayTitle}
                    </h3>
                  </div>

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

                <div className="p-6 overflow-y-auto">
                  {loading ? (
                    <div className="flex items-center justify-center py-8 gap-3 text-gold">
                      <Loader2 className="animate-spin" size={24} />
                      <span className="text-sm">Carregando tradução…</span>
                    </div>
                  ) : error ? (
                    <div className="text-sys-red text-center py-4 text-sm">{error}</div>
                  ) : chaptersData ? (
                    <div className="space-y-6">
                      {chaptersData.map(({ chapterNum, html }) => (
                        <div key={chapterNum}>
                          {isMulti && (
                            <p className="text-xs font-mono uppercase tracking-widest text-gold/60 mb-3">
                              Capítulo {chapterNum}
                            </p>
                          )}
                          {/* eslint-disable-next-line react/no-danger */}
                          <div
                            className="text-xl md:text-2xl text-text-main leading-relaxed font-sans text-justify not-italic"
                            dangerouslySetInnerHTML={{ __html: html }}
                          />
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
