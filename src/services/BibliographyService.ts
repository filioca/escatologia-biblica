/**
 * BibliographyService — camada de acesso ao Firestore para a Bibliography.
 *
 * Abstrai toda a lógica de I/O do Firebase para facilitar:
 *   - Testes unitários (injetar mock de `db`)
 *   - Substituição futura de provedor (ex: Algolia na Fase 6)
 *   - Centralização do tratamento de erros de rede
 *
 * O controle de acesso real está em firestore.rules (server-side).
 * Aqui apenas interpretamos os erros retornados pelo SDK.
 */

import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  type Firestore,
  type FirestoreError,
} from 'firebase/firestore';
import type {
  FirestoreEntry,
  FirestoreCategory,
  EntriesQueryResult,
} from '../types/bibliography';
import { removeAccents } from '../components/Bibliography';

// ---------------------------------------------------------------------------
// Helpers internos
// ---------------------------------------------------------------------------

/** Código de erro retornado pelo Firestore quando as rules negam acesso. */
const PERMISSION_DENIED = 'permission-denied';

function isFirestoreError(err: unknown): err is FirestoreError {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    typeof (err as Record<string, unknown>).code === 'string'
  );
}

// ---------------------------------------------------------------------------
// Serviço
// ---------------------------------------------------------------------------

export class BibliographyService {
  private readonly db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  // ── Categorias ────────────────────────────────────────────────────────────

  /**
   * Lista todas as categorias ordenadas pelo campo `order`.
   *
   * A collection `bibliography_categories` tem leitura pública (veja
   * firestore.rules), portanto esta chamada nunca deve retornar
   * permission-denied.
   */
  async listCategories(): Promise<FirestoreCategory[]> {
    const col = collection(this.db, 'bibliography_categories');
    const q = query(col, orderBy('order', 'asc'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => doc.data() as FirestoreCategory);
  }

  // ── Entradas por categoria ────────────────────────────────────────────────

  /**
   * Lista todas as entradas de uma categoria, ordenadas por entryOrder.
   *
   * @param categoryId Id da categoria.
   * @param includeRestricted Quando true, NÃO aplica filtro
   *   isPremium === false. Usar APENAS para usuários autenticados
   *   com custom claim subscriber === true. Default: false.
   *
   * Se o Firestore retornar permission-denied (rules negaram acesso
   * por inconsistência entre query e claims), retorna
   * { accessDenied: true, entries: [] } em vez de propagar.
   *
   * Erros de rede genuínos são re-lançados.
   */
  async listEntriesByCategory(
    categoryId: string,
    includeRestricted = false,
  ): Promise<EntriesQueryResult> {
    try {
      const col = collection(this.db, 'bibliography_entries');
      const q = includeRestricted
        ? query(
            col,
            where('categoryId', '==', categoryId),
            orderBy('entryOrder', 'asc'),
          )
        : query(
            col,
            where('isPremium', '==', false),
            where('categoryId', '==', categoryId),
            orderBy('entryOrder', 'asc'),
          );
      const snap = await getDocs(q);
      const entries = snap.docs.map(doc => doc.data() as FirestoreEntry);
      return { accessDenied: false, entries };
    } catch (err) {
      if (isFirestoreError(err) && err.code === PERMISSION_DENIED) {
        return { accessDenied: true, entries: [] };
      }
      throw err;
    }
  }

  // ── Todas as entradas ─────────────────────────────────────────────────────

  /**
   * Lista todas as entradas visíveis para o usuário atual.
   *
   * Por padrão filtra apenas entradas gratuitas (isPremium === false).
   * Isso é necessário porque o Firestore avalia rules sobre TODOS os
   * documentos potencialmente retornados pela query — uma query sem
   * filtro de isPremium falharia com permission-denied para usuários
   * anônimos, mesmo se houvesse documentos gratuitos no resultado.
   *
   * @param includeRestricted Quando true, NÃO aplica filtro
   *   isPremium === false. Usar APENAS para usuários autenticados
   *   com custom claim subscriber === true. Caso contrário a query
   *   falhará com permission-denied. Default: false.
   *
   * Usado pelo modo "Por Autor" no Bibliography.tsx para construir
   * o índice alfabético.
   */
  async listAllEntries(includeRestricted = false): Promise<FirestoreEntry[]> {
    const col = collection(this.db, 'bibliography_entries');
    const q = includeRestricted
      ? query(col, orderBy('authorNormalized', 'asc'))
      : query(
          col,
          where('isPremium', '==', false),
          orderBy('authorNormalized', 'asc'),
        );
    const snap = await getDocs(q);
    return snap.docs.map(doc => doc.data() as FirestoreEntry);
  }

  // ── Busca ─────────────────────────────────────────────────────────────────

  /**
   * Busca entradas por texto livre.
   *
   * Implementação atual: fetch de todas as entradas visíveis + filtro
   * client-side. Adequado para o volume atual (~300 entradas gratuitas).
   *
   * TODO (Fase 6): migrar para Algolia ou Typesense para busca full-text
   * server-side, paginação e ranking por relevância.
   */
  async searchEntries(queryText: string): Promise<FirestoreEntry[]> {
    const all = await this.listAllEntries();
    if (!queryText.trim()) return all;

    const normalizedQuery = removeAccents(queryText.toLowerCase().trim());

    return all.filter(entry => {
      const allAuthors = [entry.author, ...entry.coAuthors];

      const titleMatch = removeAccents(entry.title.toLowerCase()).includes(normalizedQuery);
      const subtitleMatch =
        entry.subtitle !== null &&
        removeAccents(entry.subtitle.toLowerCase()).includes(normalizedQuery);
      const authorMatch = allAuthors.some(a =>
        removeAccents(a.toLowerCase()).includes(normalizedQuery),
      );
      const reviewMatch = removeAccents(entry.review.toLowerCase()).includes(normalizedQuery);
      const publisherMatch =
        entry.publisher !== null &&
        removeAccents(entry.publisher.toLowerCase()).includes(normalizedQuery);

      return titleMatch || subtitleMatch || authorMatch || reviewMatch || publisherMatch;
    });
  }
}

// ---------------------------------------------------------------------------
// Instância singleton (lazy — inicializada na primeira importação após db
// estar disponível)
// ---------------------------------------------------------------------------

let _instance: BibliographyService | null = null;

/**
 * Retorna (ou cria) a instância singleton do BibliographyService.
 *
 * O parâmetro `db` é usado APENAS na primeira chamada para
 * inicializar a instância. Nas chamadas subsequentes, `db` é
 * ignorado e a instância cached é retornada.
 *
 * ⚠️ PARA TESTES UNITÁRIOS:
 * NÃO use esta função. O cache impede injeção de mock após a
 * primeira chamada real. Em vez disso, instancie a classe
 * diretamente:
 *
 *   const service = new BibliographyService(mockDb);
 *
 * A classe BibliographyService é exportada justamente para
 * permitir esse padrão.
 */
export function getBibliographyService(db: Firestore): BibliographyService {
  if (!_instance) {
    _instance = new BibliographyService(db);
  }
  return _instance;
}
