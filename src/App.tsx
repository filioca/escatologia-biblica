import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { eschatologyData } from './data/content';
import { TimelineEvent } from './components/Timeline';
import AIChat from './components/AIChat';
import { RichText } from './components/RichText';

const navItems = [
  { id: 'visaoGeral', label: 'Visão Geral' },
  { id: 'jaEAindaNao', label: 'Já e Ainda Não' },
  { id: 'diaDoSenhor', label: 'Dia do Senhor' },
  { id: 'pactoVsDispensacional', label: 'Pacto vs. Dispensacionalismo' },
  { id: 'sistemas', label: 'Sistemas' },
  { id: 'arrebatamento', label: 'Arrebatamento' },
  { id: 'tribulacao', label: 'Grande Tribulação' },
  { id: 'anticristo', label: 'Anticristo' },
  { id: 'segundaVinda', label: 'Segunda Vinda' },
  { id: 'milenio', label: 'Milênio' },
  { id: 'julgamentos', label: 'Julgamentos' },
  { id: 'eternidade', label: 'Estado Eterno' },
  { id: 'cronologias', label: 'Cronologias' }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('visaoGeral');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const renderContent = () => {
    const sectionData = eschatologyData[activeSection as keyof typeof eschatologyData];
    if (!sectionData) return null;

    return (
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="font-display text-4xl font-semibold text-gold tracking-wider uppercase mb-4">
          {sectionData.title}
        </h2>
        
        {sectionData.intro && (
          <p className="font-serif text-2xl text-text-dim italic mb-10 pb-6 border-b border-border">
            {sectionData.intro}
          </p>
        )}

        {/* Render Body Paragraphs (Overview) */}
        {'body' in sectionData && Array.isArray(sectionData.body) && !('events' in sectionData) && !('table' in sectionData) && (
          <div className="space-y-5 text-lg text-text-dim leading-relaxed text-justify">
            {sectionData.body.map((p, idx) => (
              <p key={idx}><RichText text={p} /></p>
            ))}
          </div>
        )}

        {/* Render Quote */}
        {'quote' in sectionData && (
          <blockquote className="border-l-2 border-gold my-10 pl-6 py-2 font-serif text-2xl italic text-text-dim">
            "{sectionData.quote.text}"
            <cite className="block mt-3 text-base not-italic text-text-muted font-sans">— {sectionData.quote.cite}</cite>
          </blockquote>
        )}

        {/* Render Events (Timeline) */}
        {'events' in sectionData && (
          <div className="mt-8">
            {sectionData.events.map((ev, idx) => (
              <TimelineEvent 
                key={ev.id}
                num={String(idx + 1).padStart(2, '0')}
                title={ev.title}
                body={ev.body}
                refs={ev.refs}
                color={ev.color}
              />
            ))}
          </div>
        )}

        {/* Render Table (Millennium) */}
        {'table' in sectionData && (
          <div className="overflow-x-auto mt-8 mb-8">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-surface2 border-b border-border">
                  {sectionData.table.headers.map((h, i) => (
                    <th key={i} className="px-4 py-3 font-display text-xs tracking-widest text-gold uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sectionData.table.rows.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-surface/50">
                    {row.map((cell, j) => (
                      <td key={j} className={`px-4 py-3 ${j === 0 ? 'text-text-main font-semibold' : 'text-text-dim'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Render Millennium Body */}
        {'table' in sectionData && 'body' in sectionData && (
          <div className="space-y-5 text-lg text-text-dim leading-relaxed mt-8 text-justify">
            {sectionData.body.map((p, idx) => (
              <p key={idx}><RichText text={p} /></p>
            ))}
          </div>
        )}

        {/* Render Chronologies */}
        {'systems' in sectionData && (
          <div className="space-y-12 mt-8">
            {sectionData.systems.map((sys, idx) => (
              <div key={idx}>
                <h3 className="font-display text-base tracking-widest uppercase mb-4 font-semibold" style={{ color: sys.color }}>
                  ● {sys.name}
                </h3>
                <div className="pl-6 border-l-2" style={{ borderColor: sys.color }}>
                  <div className="space-y-3 text-lg text-text-main">
                    {sys.steps.map((step, sIdx) => {
                      const isSub = step.trim().startsWith('—');
                      return (
                        <p key={sIdx} className={`${isSub ? 'pl-4 text-text-dim' : ''}`}>
                          <RichText text={step} />
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col relative z-10 transition-colors duration-300">
      <header className="relative text-center pt-16 pb-12 px-6 border-b border-border bg-[radial-gradient(ellipse_at_top,#ffffff_0%,var(--theme-deep)_70%)] dark:bg-[radial-gradient(ellipse_at_top,#2a2010_0%,var(--theme-deep)_70%)] overflow-hidden transition-colors duration-300">
        <button
          onClick={() => setIsDark(!isDark)}
          className="absolute top-6 right-6 p-2 text-gold hover:text-gold-light transition-colors"
          aria-label="Alternar tema"
        >
          {isDark ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-gold opacity-60 tracking-[2rem] text-lg">✦</div>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-gold tracking-widest uppercase mb-4">
          Escatologia Bíblica
        </h1>
        <p className="font-serif text-2xl md:text-3xl italic text-text-dim tracking-wide">
          O Final dos Tempos — Uma Análise Teológica Cronológica
        </p>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8" />
      </header>

      <nav className="sticky top-0 z-40 bg-deep/95 backdrop-blur-md border-b border-border px-4 overflow-x-auto no-scrollbar transition-colors duration-300">
        <div className="flex max-w-6xl mx-auto md:justify-center">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`whitespace-nowrap px-6 py-4 font-display text-sm font-semibold tracking-widest uppercase transition-colors border-b-2 ${
                activeSection === item.id 
                  ? 'text-gold border-gold' 
                  : 'text-text-dim border-transparent hover:text-gold'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="flex-1 px-6 py-12 pb-32">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      <AIChat />
    </div>
  );
}
