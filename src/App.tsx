import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Moon, Sun, Menu, X,
  BookOpen, Key, User, Landmark, CalendarDays, GitBranch,
} from 'lucide-react';
import { eschatologyData } from './data/content';
import { TimelineEvent } from './components/Timeline';
import AIChat from './components/AIChat';
import { RichText } from './components/RichText';
import { Bibliography } from './components/Bibliography';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginButton } from './components/auth/LoginButton';
import { UserMenu } from './components/auth/UserMenu';

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_TITLE = 'Escatologia Bíblica';
const PAGE_SUBTITLE =
  'Fundamentos, Sistemas, História e Consumação — Uma Enciclopédia Teológica';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
}

interface NavGroup {
  label: string;
  icon: React.ReactNode;
  items: NavItem[];
}

// ─── Navigation Structure ─────────────────────────────────────────────────────

const navGroups: NavGroup[] = [
  {
    label: 'Fundamentos',
    icon: <BookOpen size={15} aria-hidden="true" />,
    items: [
      { id: 'visaoGeral',     label: 'Visão Geral' },
      { id: 'jaEAindaNao',   label: 'Já e Ainda Não' },
      { id: 'diaDoSenhor',   label: 'Dia do Senhor' },
      { id: 'raizesJudaicas', label: 'Raízes Judaicas' },
    ],
  },
  {
    label: 'Chaves Hermenêuticas',
    icon: <Key size={15} aria-hidden="true" />,
    items: [
      { id: 'pactoVsDispensacional',   label: 'Pacto vs. Dispensacionalismo' },
      { id: 'hermeneuticaApocalipse',  label: 'Hermenêutica do Apocalipse' },
      { id: 'israelRomanos',           label: 'Israel em Romanos 9–11' },
    ],
  },
  {
    label: 'Escatologia Individual',
    icon: <User size={15} aria-hidden="true" />,
    items: [
      { id: 'estadoIntermediario', label: 'Estado Intermediário' },
    ],
  },
  {
    label: 'Sistemas e Tradições',
    icon: <Landmark size={15} aria-hidden="true" />,
    items: [
      { id: 'sistemas',                label: 'Sistemas' },
      { id: 'sistemasHeterodoxos',     label: 'Sistemas Heterodoxos' },
      { id: 'escatologiaOrtodoxa',     label: 'Escatologia Ortodoxa' },
      { id: 'historiaDoutrina',        label: 'História da Doutrina' },
      { id: 'escatologiaContemporanea', label: 'Escatologia Contemporânea' },
    ],
  },
  {
    label: 'Eventos Finais',
    icon: <CalendarDays size={15} aria-hidden="true" />,
    items: [
      { id: 'arrebatamento',  label: 'Arrebatamento' },
      { id: 'tribulacao',     label: 'Grande Tribulação' },
      { id: 'anticristo',     label: 'Anticristo' },
      { id: 'segundaVinda',   label: 'Segunda Vinda' },
      { id: 'milenio',        label: 'Milênio' },
      { id: 'julgamentos',    label: 'Julgamentos' },
      { id: 'eternidade',     label: 'Estado Eterno' },
    ],
  },
  {
    label: 'Síntese',
    icon: <GitBranch size={15} aria-hidden="true" />,
    items: [
      { id: 'cronologias', label: 'Cronologias' },
      { id: 'bibliografia', label: 'Bibliografia' },
    ],
  },
];

// ─── Auth Header Widget ───────────────────────────────────────────────────────
// Componente interno que usa useAuth() — deve ser filho de AuthProvider.

function AuthHeaderWidget() {
  const { user } = useAuth();
  return user ? <UserMenu /> : <LoginButton />;
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState('visaoGeral');
  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Close drawer on resize to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setSidebarOpen(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── Render Content ──────────────────────────────────────────────────────────

  const renderContent = () => {
    if (activeSection === 'bibliografia') {
      return (
        <motion.div
          key="bibliografia"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
          className="w-full"
        >
          <Bibliography />
        </motion.div>
      );
    }

    const sectionData = eschatologyData[activeSection as keyof typeof eschatologyData];
    if (!sectionData) return null;

    return (
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
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

        {/* Body Paragraphs (Overview) */}
        {'body' in sectionData && Array.isArray(sectionData.body) && !('events' in sectionData) && !('table' in sectionData) && (
          <div className="space-y-5 text-lg text-text-dim leading-relaxed text-justify">
            {sectionData.body.map((p, idx) => (
              <p key={idx}><RichText text={p} /></p>
            ))}
          </div>
        )}

        {/* Quote */}
        {'quote' in sectionData && (
          <blockquote className="border-l-2 border-gold my-10 pl-6 py-2 font-serif text-2xl italic text-text-dim">
            “{sectionData.quote.text}”
            <cite className="block mt-3 text-base not-italic text-text-muted font-sans">— {sectionData.quote.cite}</cite>
          </blockquote>
        )}

        {/* Events (Timeline) */}
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

        {/* Table (Millennium) */}
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

        {/* Millennium Body */}
        {'table' in sectionData && 'body' in sectionData && (
          <div className="space-y-5 text-lg text-text-dim leading-relaxed mt-8 text-justify">
            {sectionData.body.map((p, idx) => (
              <p key={idx}><RichText text={p} /></p>
            ))}
          </div>
        )}

        {/* Chronologies */}
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

  // ─── Sidebar Content (shared between desktop + drawer) ────────────────────────

  const SidebarContent = () => (
    <nav aria-label="Navegação principal">
      {navGroups.map((group, gIdx) => (
        <div key={group.label} className={gIdx > 0 ? 'mt-1 pt-1 border-t border-border/50' : ''}>
          {/* Group Header */}
          <div className="flex items-center gap-2 px-4 pt-4 pb-2 text-text-muted">
            {group.icon}
            <span className="font-display text-[0.6rem] tracking-[0.15em] uppercase font-semibold">
              {group.label}
            </span>
          </div>

          {/* Group Items */}
          {group.items.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full text-left px-4 py-2 font-sans text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold ${
                  isActive
                    ? 'text-gold bg-surface2 border-r-2 border-gold font-semibold'
                    : 'text-text-dim hover:text-gold hover:bg-surface/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      ))}
    </nav>
  );

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <AuthProvider>
    <div className="min-h-screen flex flex-col relative z-10 transition-colors duration-300">

      {/* ── Header (full-width) ─────────────────────────────────────── */}
      <header className="relative text-center pt-16 pb-12 px-6 border-b border-border bg-[radial-gradient(ellipse_at_top,var(--color-surface)_0%,var(--color-deep)_70%)] dark:bg-[radial-gradient(ellipse_at_top,#2a2010_0%,var(--color-deep)_70%)] overflow-hidden transition-colors duration-300">

        {/* Header right actions: auth widget + dark/light toggle */}
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <AuthHeaderWidget />
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-gold hover:text-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full"
            aria-label="Alternar tema"
          >
            {isDark ? <Sun size={24} aria-hidden="true" /> : <Moon size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden absolute top-6 left-6 p-2 text-gold hover:text-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full"
          aria-label="Abrir menu de navegação"
          aria-expanded={sidebarOpen}
          aria-controls="mobile-drawer"
        >
          <Menu size={24} aria-hidden="true" />
        </button>

        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-gold opacity-60 tracking-[2rem] text-lg">✦</div>

        <h1 className="font-display text-5xl md:text-6xl font-bold text-gold tracking-widest uppercase mb-4">
          {PAGE_TITLE}
        </h1>
        <p className="font-serif text-2xl md:text-3xl italic text-text-dim tracking-wide">
          {PAGE_SUBTITLE}
        </p>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8" />
      </header>

      {/* ── Body: Sidebar + Main ────────────────────────────────────── */}
      <div className="flex flex-1">

        {/* Desktop Sidebar */}
        <aside
          aria-label="Sidebar de navegação"
          className="hidden md:flex flex-col w-60 shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-border bg-deep/95 backdrop-blur-md transition-colors duration-300"
        >
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 py-12 pb-32 min-w-0">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </main>
      </div>

      {/* ── Mobile Drawer ───────────────────────────────────────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-drawer"
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              initial={{ x: prefersReducedMotion ? 0 : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: prefersReducedMotion ? 0 : '-100%' }}
              transition={{ type: 'tween', duration: prefersReducedMotion ? 0 : 0.28, ease: 'easeOut' }}
              className="fixed top-0 left-0 z-50 h-full w-72 bg-deep border-r border-border overflow-y-auto overscroll-contain md:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-border">
                <span className="font-display text-xs tracking-[0.15em] uppercase text-gold">Navegação</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 text-text-muted hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                  aria-label="Fechar menu"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── AI Chat (fixed, unaffected by layout) ───────────────────── */}
      <AIChat />
    </div>
    </AuthProvider>
  );
}
