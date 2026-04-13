import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { RichText } from './RichText';
import { VerseLink } from './BiblePopup';

interface EventProps {
  num: string;
  title: string;
  body: string[];
  refs?: string;
  color?: string;
}

export function TimelineEvent({ num, title, body, refs, color = 'var(--color-gold)' }: EventProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mb-10 pl-10">
      {/* Timeline Line */}
      <div className="absolute left-[1.1rem] top-0 bottom-[-2.5rem] w-px bg-gradient-to-b from-gold via-border to-transparent" />
      
      {/* Timeline Dot */}
      <div 
        className="absolute left-[-0.3rem] top-[0.6rem] w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]"
        style={{ backgroundColor: color, color: color }}
      />

      <div className="bg-surface border border-border rounded-md overflow-hidden transition-colors hover:border-gold/50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left px-6 py-5 flex items-center gap-4 hover:bg-surface2 transition-colors"
        >
          <span className="font-display text-sm font-semibold text-gold opacity-80 tracking-widest min-w-[2rem]">{num}</span>
          <span className="font-serif text-2xl font-semibold text-text-main flex-1">{title}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-text-muted"
          >
            <ChevronDown size={18} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 border-t border-border/50 pt-5">
                <div className="space-y-4 text-lg text-text-dim leading-relaxed text-justify">
                  {body.map((paragraph, idx) => (
                    <p key={idx}><RichText text={paragraph} /></p>
                  ))}
                </div>
                
                {refs && (
                  <div className="mt-6 p-4 bg-surface3 border border-border rounded-md text-sm text-text-muted">
                    <strong className="font-display text-xs tracking-widest text-gold block mb-2 uppercase">Textos-chave</strong>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {refs.split('·').map(r => r.trim()).map((ref, i) => (
                        <React.Fragment key={i}>
                          <VerseLink reference={ref} />
                          {i < refs.split('·').length - 1 && <span className="text-border">•</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
