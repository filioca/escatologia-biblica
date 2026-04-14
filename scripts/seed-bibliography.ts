/**
 * Seed one-shot: popula Firestore com os dados de src/data/bibliography.ts.
 *
 * Pré-requisitos:
 *   - Application Default Credentials (ADC) configuradas via gcloud CLI:
 *       gcloud auth application-default login
 *       gcloud config set project apocalipse-biblico
 *   - Credenciais salvas em:
 *       %APPDATA%\gcloud\application_default_credentials.json  (Windows)
 *       ~/.config/gcloud/application_default_credentials.json  (Linux/Mac)
 *
 * Uso:
 *   npm run seed
 *
 * Idempotência:
 *   Usa check-then-write: rodar duas vezes não duplica nem sobrescreve
 *   o campo createdAt de documentos já existentes.
 */

import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { categories } from '../src/data/bibliography.js';
import type { BibCategoryId } from '../src/types/bibliography.js';

// ---------------------------------------------------------------------------
// Configuração — Application Default Credentials (ADC)
// ---------------------------------------------------------------------------
initializeApp({
  credential: applicationDefault(),
  projectId: 'apocalipse-biblico',
});

const db = getFirestore(undefined, 'apocalipse-biblico');

// ---------------------------------------------------------------------------
// Constantes de domínio
// ---------------------------------------------------------------------------

/** Categorias de acesso gratuito (deve espelhar firestore.rules). */
const FREE_CATEGORY_IDS: ReadonlySet<BibCategoryId> = new Set([
  'fundamentos',
  'apocalipse',
  'antigoTestamento',
]);

// ---------------------------------------------------------------------------
// Utilitários
// ---------------------------------------------------------------------------

/**
 * Extrai o sobrenome normalizado do campo `author` para índice alfabético.
 * Replicado de src/data/bibliography.ts > buildAuthorIndex > normalizeAuthorName.
 */
function normalizeAuthorName(author: string): string {
  // Remove sufixos como (ed.), (eds.), (ed. geral), etc.
  let normalized = author.replace(/\s*\(eds?\.?[^)]*\)/gi, '').trim();

  // Formato padrão 'Sobrenome, Nome' — mantém como está
  if (normalized.includes(',')) return normalized;

  // Fallback para nomes sem vírgula (raros ou malformados)
  const parts = normalized.split(' ');
  if (parts.length > 1) {
    const lastName = parts.pop();
    return `${lastName}, ${parts.join(' ')}`;
  }
  return normalized;
}

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

async function seed(): Promise<void> {
  console.log('🌱 Iniciando seed do Bibliography...\n');

  const entriesCol = db.collection('bibliography_entries');
  const categoriesCol = db.collection('bibliography_categories');

  let totalEntries = 0;
  let totalCategories = 0;

  // Processa cada categoria
  for (let catIndex = 0; catIndex < categories.length; catIndex++) {
    const cat = categories[catIndex]!;
    const categoryOrder = catIndex + 1; // 1-based
    const isPremiumCategory = !FREE_CATEGORY_IDS.has(cat.id);

    // ── Documento de metadados da categoria ──
    const catRef = categoriesCol.doc(cat.id);
    const existingCat = await catRef.get();
    const catDoc = {
      id: cat.id,
      title: cat.title,
      intro: cat.intro,
      order: categoryOrder,
      isPremium: isPremiumCategory,
      updatedAt: FieldValue.serverTimestamp(),
    };
    if (!existingCat.exists) {
      await catRef.set({ ...catDoc, createdAt: FieldValue.serverTimestamp() });
    } else {
      await catRef.set(catDoc, { merge: true });
    }
    totalCategories++;

    // ── Documentos de entradas ──
    for (let entryIndex = 0; entryIndex < cat.entries.length; entryIndex++) {
      const entry = cat.entries[entryIndex]!;

      const doc: Record<string, unknown> = {
        id: entry.id,
        categoryId: cat.id,
        categoryOrder,
        entryOrder: entryIndex + 1, // 1-based dentro da categoria
        author: entry.author,
        authorNormalized: normalizeAuthorName(entry.author),
        coAuthors: entry.coAuthors ?? [],
        title: entry.title,
        subtitle: entry.subtitle ?? null,
        publisher: entry.publisher ?? null,
        year: entry.year,
        isbn: entry.isbn ?? null,
        originalLanguage: entry.originalLanguage,
        translationPT: entry.translationPT ?? null,
        level: entry.level,
        review: entry.review,
        onlineLinks: entry.onlineLinks ?? [],
        crossReferences: entry.crossReferences ?? [],
        citedInEventIds: entry.citedInEventIds ?? [],
        recommendedFor: entry.recommendedFor ?? [],
        isPremium: isPremiumCategory,
        updatedAt: FieldValue.serverTimestamp(),
      };

      const docRef = entriesCol.doc(entry.id);
      const existing = await docRef.get();
      if (!existing.exists) {
        await docRef.set({ ...doc, createdAt: FieldValue.serverTimestamp() });
      } else {
        await docRef.set(doc, { merge: true });
      }

      totalEntries++;
    }

    console.log(
      `  ✓ Categoria [${String(categoryOrder).padStart(2, '0')}/${categories.length}] ` +
        `"${cat.id}" — ${cat.entries.length} entradas`,
    );
  }

  console.log(`\n✅ Seed concluído: ${totalEntries} entradas em ${totalCategories} categorias.`);
}

// ---------------------------------------------------------------------------
// Entrypoint
// ---------------------------------------------------------------------------
seed().catch((err: unknown) => {
  console.error('❌ Seed falhou:', err);
  process.exit(1);
});
