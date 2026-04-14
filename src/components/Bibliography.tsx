import React, { useState, useMemo } from 'react';
import { Search, Book, User, ExternalLink, Bookmark } from 'lucide-react';
import { bibliographyData } from '../data/bibliography';
import { BibEntry, BibCategory, BibCategoryId } from '../types/bibliography';

// ============================================================================
// Utilitários Puros (Exportados para Testes)
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
// Componentes Internos
// ============================================================================

const levelColors: Record<string, string> = {
  "introdutório": "bg-sys-green/10 text-sys-green border-sys-green/20",
  "intermediário": "bg-sys-blue/10 text-sys-blue border-sys-blue/20",
  "avançado": "bg-sys-emerald/10 text-sys-emerald border-sys-emerald/20",
  "acadêmico": "bg-sys-red/10 text-sys-red border-sys-red/20",
  "fonte primária": "bg-gold/10 text-gold border-gold/20"
};

const EntryCard: React.FC<{ entry: BibEntry }> = ({ entry }) => {
  const allAuthors = [entry.author];
  if (entry.coAuthors) allAuthors.push(...entry.coAuthors);
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
          {entry.subtitle && <span className="text-text-dim"> : {entry.subtitle}</span>}
        </h3>
      </header>

      <div className="space-y-3 flex-grow">
        <div className="text-sm text-text-muted font-sans flex flex-wrap gap-x-4 gap-y-1">
          <span>{entry.publisher || 'Edição original'}, {entry.year}</span>
          {entry.isbn && entry.isbn !== ISBN_PLACEHOLDER && (
            <span>ISBN: {entry.isbn}</span>
          )}
          {entry.translationPT && (
            <span className="text-text-dim bg-surface2 px-2 py-0.5 rounded-md">
              Ed. Brasil: {entry.translationPT.title} ({entry.translationPT.publisher}{entry.translationPT.year ? `, ${entry.translationPT.year}` : ''})
            </span>
          )}
        </div>

        <p className="text-base text-text-dim leading-relaxed text-justify border-l-2 border-gold/30 pl-4 py-1">
          {entry.review}
        </p>
      </div>
        
      {entry.onlineLinks && entry.onlineLinks.length > 0 && (
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
// Componente Principal
// ============================================================================

export const Bibliography: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<BibCategoryId | "Todas">("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"thematic" | "author">("thematic");

  const categories = bibliographyData.categories;
  const authorIndex = bibliographyData.authorIndex;

  const allCategoriesList = useMemo(() => {
    return [{ id: "Todas", title: "Todas" } as const, ...categories.map(c => ({ id: c.id, title: c.title }))];
  }, [categories]);

  // Render
  const renderContent = () => {
    if (viewMode === "thematic") {
      const filteredCats = filterByCategory(categories, activeCategoryId);
      
      const catsToRender = filteredCats.map(cat => {
        const catEntries = searchEntries(cat.entries, searchQuery);
        if (catEntries.length === 0) return null;

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
              {catEntries.map(entry => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          </section>
        );
      });

      if (catsToRender.every(c => c === null)) {
        return (
          <div className="text-center py-12 text-text-muted">
            <Book size={48} className="mx-auto mb-4 opacity-20" />
            <p>Nenhuma obra encontrada para esta pesquisa.</p>
          </div>
        );
      }
      return catsToRender;
    }

    // Modo "author"
    let hasResults = false;
    
    // Create a flat map of all entries for fast lookup
    const allEntriesMap = new Map<string, BibEntry>();
    categories.forEach(c => c.entries.forEach(e => allEntriesMap.set(e.id, e)));

    const authorSections = authorIndex.map(authorItem => {
      const entriesForAuthor = authorItem.entryIds.map(id => allEntriesMap.get(id)).filter((e): e is BibEntry => e !== undefined);
      const filteredAuthorEntries = searchEntries(entriesForAuthor, searchQuery);
      
      if (filteredAuthorEntries.length === 0) return null;
      hasResults = true;

      return (
        <section key={authorItem.author} className="mb-10">
          <h2 className="text-xl font-sans font-semibold text-text-main mb-4 flex items-center gap-2 bg-surface2 px-4 py-2 rounded-md">
            <User size={18} className="text-gold" />
            {authorItem.author}
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
