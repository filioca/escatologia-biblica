import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { parseBibleRef } from '../utils/bibleMapper';

export const VerseLink: React.FC<{ reference: string }> = ({ reference }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verseData, setVerseData] = useState<{ text: string; ref: string } | null>(null);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchVerse = async () => {
    setIsOpen(true);
    if (verseData) return;
    
    setLoading(true);
    setError('');
    try {
      const query = parseBibleRef(reference);
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(query)}?translation=almeida`);
      if (!res.ok) throw new Error('Passagem não encontrada');
      const data = await res.json();
      setVerseData({ text: data.text, ref: data.reference });
    } catch (err) {
      setError('Não foi possível carregar a passagem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={fetchVerse}
        className="inline-flex items-center gap-1 text-gold hover:text-gold-light underline decoration-gold/30 hover:decoration-gold transition-colors font-semibold"
      >
        {reference}
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-deep/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                onClick={e => e.stopPropagation()}
                className="bg-surface border border-border rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col overflow-hidden"
              >
                <div className="p-4 border-b border-border flex justify-between items-center bg-surface2">
                  <div className="flex items-center gap-2 text-gold">
                    <BookOpen size={18} />
                    <h3 className="font-display font-semibold tracking-wider">{verseData?.ref || reference}</h3>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-text-main transition-colors">
                    <X size={20} />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto text-xl md:text-2xl text-text-main leading-relaxed font-sans text-justify not-italic">
                  {loading ? (
                    <div className="flex items-center justify-center py-8 gap-3 text-gold">
                      <Loader2 className="animate-spin" size={24} />
                      <span>Buscando passagem...</span>
                    </div>
                  ) : error ? (
                    <div className="text-sys-red text-center py-4">{error}</div>
                  ) : (
                    <p className="whitespace-pre-wrap">{verseData?.text}</p>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
