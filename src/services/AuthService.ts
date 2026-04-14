/**
 * AuthService — camada de serviço para Firebase Authentication.
 *
 * Abstrai toda a lógica de I/O do Firebase Auth para facilitar:
 *   - Testes unitários (instanciar com mock de auth/googleProvider)
 *   - Centralização do mapeamento de erros para mensagens em português
 *   - Encapsulamento do fluxo de Magic Link (localStorage ↔ email)
 *
 * NÃO importar diretamente em componentes — usar via AuthContext/useAuth.
 */

import {
  signInWithPopup,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
  type IdTokenResult,
  type Unsubscribe,
  type AuthError,
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

// ---------------------------------------------------------------------------
// Constantes
// ---------------------------------------------------------------------------

/** Chave no localStorage para guardar o email entre envio e clique do link. */
const MAGIC_LINK_EMAIL_KEY = 'magicLinkEmail';

// ---------------------------------------------------------------------------
// Mapeamento de erros Firebase → português
// ---------------------------------------------------------------------------

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/popup-closed-by-user': 'Login cancelado pelo usuário.',
  'auth/cancelled-popup-request': 'Login cancelado pelo usuário.',
  'auth/popup-blocked': 'Popup bloqueado pelo navegador. Permita popups para este site.',
  'auth/network-request-failed': 'Falha de rede. Verifique sua conexão.',
  'auth/invalid-email': 'Email inválido.',
  'auth/user-disabled': 'Esta conta foi desativada.',
  'auth/invalid-action-code': 'Link expirado ou já utilizado. Solicite um novo.',
  'auth/expired-action-code': 'Link expirado. Solicite um novo.',
};

function mapAuthError(err: unknown): Error {
  const code = (err as AuthError)?.code;
  const message =
    code != null
      ? (AUTH_ERROR_MESSAGES[code] ?? 'Erro de autenticação. Tente novamente.')
      : 'Erro de autenticação. Tente novamente.';
  return new Error(message);
}

// ---------------------------------------------------------------------------
// Serviço
// ---------------------------------------------------------------------------

export class AuthService {

  // ── Google Sign-In ────────────────────────────────────────────────────────

  /** Abre popup de autenticação Google. Retorna o User autenticado. */
  async signInWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err) {
      throw mapAuthError(err);
    }
  }

  // ── Magic Link ─────────────────────────────────────────────────────────────

  /**
   * Envia email com link de acesso passwordless.
   * Salva o email no localStorage para completar o login ao clicar no link.
   */
  async sendMagicLink(email: string): Promise<void> {
    const actionCodeSettings = {
      url: `${window.location.origin}/?magicLink=true`,
      handleCodeInApp: true,
    };
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem(MAGIC_LINK_EMAIL_KEY, email);
    } catch (err) {
      throw mapAuthError(err);
    }
  }

  /**
   * Chamado no carregamento da página.
   * Se a URL atual contém um link de autenticação por email, finaliza o login.
   * Retorna o User autenticado, ou null se a URL não é um link de auth.
   *
   * Se o email não estiver no localStorage (link aberto em outro dispositivo),
   * retorna null sem lançar erro — o componente deverá pedir o email ao usuário.
   */
  async completeMagicLinkSignIn(): Promise<User | null> {
    if (!isSignInWithEmailLink(auth, window.location.href)) {
      return null;
    }
    const email = window.localStorage.getItem(MAGIC_LINK_EMAIL_KEY);
    if (!email) {
      // Link aberto em dispositivo diferente do qual foi enviado.
      // Retorna null — tratamento futuro pode pedir email ao usuário.
      return null;
    }
    try {
      const result = await signInWithEmailLink(auth, email, window.location.href);
      window.localStorage.removeItem(MAGIC_LINK_EMAIL_KEY);
      // Limpa os parâmetros do link da URL sem recarregar a página
      window.history.replaceState({}, document.title, window.location.pathname);
      return result.user;
    } catch (err) {
      throw mapAuthError(err);
    }
  }

  // ── Sign Out ──────────────────────────────────────────────────────────────

  /** Encerra a sessão atual. */
  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      throw mapAuthError(err);
    }
  }

  // ── Token / Claims ────────────────────────────────────────────────────────

  /** Retorna o usuário atual de forma síncrona (pode ser null antes da init). */
  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  /**
   * Retorna o IdTokenResult com claims decodificados, ou null se não logado.
   * Use forceRefresh=true após login para garantir claims atualizados.
   */
  async getIdTokenResult(forceRefresh: boolean): Promise<IdTokenResult | null> {
    const user = auth.currentUser;
    if (!user) return null;
    try {
      return await user.getIdTokenResult(forceRefresh);
    } catch {
      // Token fetch falhou (ex: offline) — trata como não-assinante
      return null;
    }
  }

  // ── Auth State ────────────────────────────────────────────────────────────

  /** Wrapper de onAuthStateChanged. Retorna função de unsubscribe. */
  onAuthChange(callback: (user: User | null) => void): Unsubscribe {
    return onAuthStateChanged(auth, callback);
  }
}

// ---------------------------------------------------------------------------
// Singleton
// ---------------------------------------------------------------------------

let _instance: AuthService | null = null;

/**
 * Retorna (ou cria) a instância singleton do AuthService.
 *
 * ⚠️ PARA TESTES UNITÁRIOS:
 * NÃO use esta função. O cache impede injeção de mock após a primeira
 * chamada real. Em vez disso, instancie a classe diretamente:
 *
 *   const service = new AuthService();
 */
export function getAuthService(): AuthService {
  if (!_instance) {
    _instance = new AuthService();
  }
  return _instance;
}
