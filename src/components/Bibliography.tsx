import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, Book, User, ExternalLink, Bookmark, AlertCircle, Lock } from 'lucide-react';
import { BibEntry, BibCategory, BibCategoryId, FirestoreEntry, FirestoreCategory } from '../types/bibliography';
import { db } from '../lib/firebase';
import { getBibliographyService } from '../services/BibliographyService';

// ============================================================================
// Utilitários Puros (Exportados para Testes) — PRESERVADOS INTEGRALMENTE
// ============================================================================

const ISBN_PLACEHOLDER = "// ISBN a confirmar";

export const removeAccents = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export function searchEntries(entries: BibEntry[], query: string): BibEntry[] {
  if (!query.trim()) return entries;
  const lowerQuery = removeAccents(query.toLowerCase());

  return entries.filter(entry => {
    const titleMatch = removeAccents(entry.title.toLowerCase()).includes(lowerQuery);
    const subtitleMatch = entry.subtitle ? removeAccents(entry.subtitle.toLowerCase()).includes(lowerQuery) : false;

    const allAuthors = [entry.author];
    if (entry.coAuthors) allAuthors.push(...entry.coAuthors);

    const authorMatch = allAuthors.some(a => removeAccents(a.toLowerCase()).includes(lowerQuery));

    return titleMatch || subtitleMatch || authorMatch;
  });
}

export function filterByCategory(categories: BibCategory[], categoryId: BibCategoryId | 'Todas'): BibCategory[] {
  if (categoryId === 'Todas') return categories;
  return categories.filter(c => c.id === categoryId);
}

// ============================================================================
// Componentes de Estado (Loading / Error / Premium) — DEFESA ATIVA
// ============================================================================

/** Skeleton animado exibido enquanto os dados carregam do Firestore. */
const BibliographySkeleton: React.FC = () => (
  <div className="space-y-12" aria-busy="true" aria-label="Carregando bibliografia...">
    {[1, 2].map(section => (
      <section key={section} className="mb-12">
        <div className="h-8 bg-surface2 rounded-lg w-1/3 mb-6 animate-pulse" />
        <div className="h-4 bg-surface2 rounded w-2/3 mb-6 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(card => (
            <div key={card} className="p-6 bg-surface border border-border rounded-lg h-52 animate-pulse">
              <div className="h-4 bg-surface2 rounded w-1/2 mb-3" />
              <div className="h-6 bg-surface2 rounded w-3/4 mb-4" />
              <div className="space-y-2">
                <div className="h-3 bg-surface2 rounded" />
                <div className="h-3 bg-surface2 rounded w-5/6" />
                <div className="h-3 bg-surface2 rounded w-4/6" />
              </div>
            </div>
          ))}
        </div>
      </section>
    ))}
  </div>
);

/** Mensagem de erro com botão de retry. */
const BibliographyError: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
  <div className="text-center py-16" role="alert">
    <AlertCircle size={48} className="mx-auto mb-4 text-sys-red opacity-70" />
    <p className="text-text-dim mb-2 font-semibold">Erro ao carregar a bibliografia</p>
    <p className="text-text-muted text-sm mb-6 max-w-md mx-auto">{message}</p>
    <button
      onClick={onRetry}
      className="px-6 py-2 bg-gold/10 border border-gold/30 text-gold rounded-lg hover:bg-gold/20 transition-colors font-medium text-sm"
    >
      Tentar novamente
    </button>
  </div>
);

/**
 * Placeholder neutro para categorias premium sem acesso.
 * NÃO implementa paywall UI — isso é Fase 4.
 */
const PremiumPlaceholder: React.FC<{ categoryTitle: string }> = ({ categoryTitle }) => (
  <div className="text-center py-16 border border-border rounded-lg bg-surface" role="status">
    <Lock size={40} className="mx-auto mb-4 text-text-muted opacity-40" />
    <p className="text-text-dim font-semibold mb-1">Conteúdo Premium</p>
    <p className="text-text-muted text-sm max-w-sm mx-auto">
      As obras da categoria <span className="italic">{categoryTitle}</span> fazem parte do plano pago.
    </p>
  </div>
);

// ============================================================================
// Componentes Internos — PRESERVADOS INTEGRALMENTE
// ============================================================================

const levelColors: Record<string, string> = {
  "introdutório": "bg-sys-green/10 text-sys-green border-sys-green/20",
  "intermediário": "bg-sys-blue/10 text-sys-blue border-sys-blue/20",
  "avançado": "bg-sys-purple/10 text-sys-purple border-sys-purple/20",
  "acadêmico": "bg-sys-red/10 text-sys-red border-sys-red/20",
  "fonte primária": "bg-gold/10 text-gold border-gold/20"
};

const EntryCard: React.FC<{ entry: FirestoreEntry }> = ({ entry }) => {
  const allAuthors = [entry.author, ...entry.coAuthors];
  const authorsText = allAuthors.join(", ");

  return (
    <article className="p-6 bg-surface border border-border rounded-lg shadow-sm hover:border-gold/50 transition-colors h-full flex flex-col">
      <header className="mb-3">
        <div className="flex flex-wrap gap-2 items-center justify-between mb-2">
          <span className="font-sans font-semibold text-text-dim text-sm tracking-wide">
            {authorsText}
          </span>
          <span className={`text-xs px-2.5 py-0.5 rounded-full border ${levelColors[entry.level] || 'bg-surface2 text-text-muted border-border'}`}>
            {entry.level.toUpperCase()}
          </span>
        </div>
        <h3 className="text-xl text-text-main font-serif leading-snug">
          <em className="font-semibold text-gold">{entry.title}</em>
          {entry.subtitle != null && <span className="text-text-dim"> : {entry.subtitle}</span>}
        </h3>
      </header>

      <div className="space-y-3 flex-grow">
        <div className="text-sm text-text-muted font-sans flex flex-wrap gap-x-4 gap-y-1">
          <span>{entry.publisher ?? 'Edição original'}, {entry.year}</span>
          {entry.isbn != null && entry.isbn !== ISBN_PLACEHOLDER && (
            <span>ISBN: {entry.isbn}</span>
          )}
          {entry.translationPT != null && (
            <span className="text-text-dim bg-surface2 px-2 py-0.5 rounded-md">
              Ed. Brasil: {entry.translationPT.title} ({entry.translationPT.publisher}{entry.translationPT.year ? `, ${entry.translationPT.year}` : ''})
            </span>
          )}
        </div>

        <p className="text-base text-text-dim leading-relaxed text-justify border-l-2 border-gold/30 pl-4 py-1">
          {entry.review}
        </p>
      </div>

      {entry.onlineLinks.length > 0 && (
        <div className="flex gap-3 pt-4 mt-auto">
          {entry.onlineLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-sys-blue hover:text-sys-blue/80 transition-colors font-medium"
              aria-label={`Abrir ${link.label} em nova aba`}
            >
              <ExternalLink size={14} />
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
};

// ============================================================================
// Helpers internos
// ============================================================================

/** Aplica busca textual sobre FirestoreEntry[] (análoga à searchEntries exportada). */
function searchFirestoreEntries(entries: FirestoreEntry[], query: string): FirestoreEntry[] {
  if (!query.trim()) return entries;
  const lowerQuery = removeAccents(query.toLowerCase());

  return entries.filter(entry => {
    const titleMatch = removeAccents(entry.title.toLowerCase()).includes(lowerQuery);
    const subtitleMatch =
      entry.subtitle != null && removeAccents(entry.subtitle.toLowerCase()).includes(lowerQuery);
    const allAuthors = [entry.author, ...entry.coAuthors];
    const authorMatch = allAuthors.some(a => removeAccents(a.toLowerCase()).includes(lowerQuery));
    return titleMatch || subtitleMatch || authorMatch;
  });
}

// ============================================================================
// Componente Principal
// ============================================================================

export const Bibliography: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<BibCategoryId | "Todas">("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"thematic" | "author">("thematic");

  // ── Estado de dados Firestore ──
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [firestoreCategories, setFirestoreCategories] = useState<FirestoreCategory[]>([]);
  const [allEntries, setAllEntries] = useState<FirestoreEntry[]>([]);

  // ── Carregamento ──
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const service = getBibliographyService(db);
      const [cats, entries] = await Promise.all([
        service.listCategories(),
        service.listAllEntries(),
      ]);
      setFirestoreCategories(cats);
      setAllEntries(entries);
    } catch (err) {
      console.error('[Bibliography] Falha ao carregar dados do Firestore:', err);
      setError(err instanceof Error ? err : new Error('Erro desconhecido ao carregar a bibliografia.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  // ── Derivados ──
  const allCategoriesList = useMemo(() => {
    return [
      { id: "Todas" as const, title: "Todas", isPremium: false },
      ...firestoreCategories.map(c => ({ id: c.id, title: c.title, isPremium: c.isPremium })),
    ];
  }, [firestoreCategories]);

  /** Índice de autores construído a partir das entradas carregadas. */
  const authorIndex = useMemo(() => {
    const authorMap = new Map<string, FirestoreEntry[]>();
    for (const entry of allEntries) {
      const key = entry.authorNormalized;
      const existing = authorMap.get(key);
      if (existing) {
        existing.push(entry);
      } else {
        authorMap.set(key, [entry]);
      }
    }
    return Array.from(authorMap.entries())
      .sort(([a], [b]) => a.localeCompare(b, 'pt-BR'))
      .map(([author, entries]) => ({ author, entries }));
  }, [allEntries]);

  // ── Render ──
  const renderContent = () => {
    if (loading) {
      return <BibliographySkeleton />;
    }

    if (error) {
      return <BibliographyError message={error.message} onRetry={loadData} />;
    }

    if (viewMode === "thematic") {
      const categoriesToRender =
        activeCategoryId === "Todas"
          ? firestoreCategories
          : firestoreCategories.filter(c => c.id === activeCategoryId);

      const sections = categoriesToRender.map(cat => {
        const catEntries = allEntries.filter(e => e.categoryId === cat.id);
        const filteredEntries = searchFirestoreEntries(catEntries, searchQuery);

        // Categoria premium sem entradas = acesso negado pelas rules (Fase 4 implementará paywall)
        if (cat.isPremium && catEntries.length === 0) {
          return (
            <section key={cat.id} className="mb-12">
              <h2 className="text-2xl font-display font-semibold text-gold mb-2 border-b border-border pb-2 flex items-center gap-2">
                <Bookmark size={24} className="opacity-70" />
                {cat.title}
              </h2>
              <PremiumPlaceholder categoryTitle={cat.title} />
            </section>
          );
        }

        if (filteredEntries.length === 0) return null;

        return (
          <section key={cat.id} className="mb-12">
            <h2 className="text-2xl font-display font-semibold text-gold mb-2 border-b border-border pb-2 flex items-center gap-2">
              <Bookmark size={24} className="opacity-70" />
              {cat.title}
            </h2>
            {cat.intro && (
              <p className="font-serif text-lg text-text-dim italic mb-6">
                {cat.intro}
              </p>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredEntries.map(entry => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          </section>
        );
      });

      const hasAnyVisible = sections.some(s => s !== null);
      if (!hasAnyVisible) {
        return (
          <div className="text-center py-12 text-text-muted">
            <Book size={48} className="mx-auto mb-4 opacity-20" />
            <p>Nenhuma obra encontrada para esta pesquisa.</p>
          </div>
        );
      }
      return sections;
    }

    // Modo "author"
    let hasResults = false;

    const authorSections = authorIndex.map(({ author, entries }) => {
      const filteredAuthorEntries = searchFirestoreEntries(entries, searchQuery);
      if (filteredAuthorEntries.length === 0) return null;
      hasResults = true;

      return (
        <section key={author} className="mb-10">
          <h2 className="text-xl font-sans font-semibold text-text-main mb-4 flex items-center gap-2 bg-surface2 px-4 py-2 rounded-md">
            <User size={18} className="text-gold" />
            {author}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pl-4 md:pl-8 border-l border-gold/20">
            {filteredAuthorEntries.map(entry => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </section>
      );
    });

    if (!hasResults) {
      return (
        <div className="text-center py-12 text-text-muted">
          <Book size={48} className="mx-auto mb-4 opacity-20" />
          <p>Nenhuma obra encontrada para esta pesquisa.</p>
        </div>
      );
    }

    return authorSections;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-10 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-muted" />
            </div>
            <input
              type="text"
              placeholder="Buscar título, autor ou assunto..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-text-main focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-shadow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Buscar na bibliografia"
            />
          </div>

          <div className="flex bg-surface border border-border rounded-lg p-1 w-full md:w-auto">
            <button
              onClick={() => setViewMode("thematic")}
              className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === "thematic" ? 'bg-surface3 text-text-main shadow-sm' : 'text-text-muted hover:text-text-main'}`}
              aria-label="Visão Temática por Categorias"
              role="button"
              aria-pressed={viewMode === "thematic"}
            >
              <span className="flex items-center justify-center gap-2">
                <Book size={16} /> Visão Temática
              </span>
            </button>
            <button
              onClick={() => setViewMode("author")}
              className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === "author" ? 'bg-surface3 text-text-main shadow-sm' : 'text-text-muted hover:text-text-main'}`}
              aria-label="Índice Alfabético de Autores"
              role="button"
              aria-pressed={viewMode === "author"}
            >
              <span className="flex items-center justify-center gap-2">
                <User size={16} /> Índice de Autores
              </span>
            </button>
          </div>
        </div>

        {viewMode === "thematic" && (
          <div
            className="flex flex-nowrap overflow-x-auto pb-2 gap-2 scrollbar-hide"
            role="tablist"
            aria-label="Filtro de Categorias Bibliográficas"
          >
            {allCategoriesList.map(cat => (
              <button
                key={cat.id}
                role="button"
                aria-pressed={activeCategoryId === cat.id}
                onClick={() => setActiveCategoryId(cat.id as BibCategoryId | "Todas")}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  activeCategoryId === cat.id
                    ? 'bg-gold/10 border-gold text-gold-light'
                    : 'bg-surface border-border text-text-muted hover:border-gold/30 hover:text-text-main'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="min-h-[50vh]">
        {renderContent()}
      </main>
    </div>
  );
};
