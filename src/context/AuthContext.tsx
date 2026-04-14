/**
 * AuthContext — estado global de autenticação.
 *
 * Provê:
 *   - user, loading, isSubscriber, error (estado)
 *   - signInWithGoogle, sendMagicLink, signOut, refreshClaims, clearError (ações)
 *
 * RBAC: isSubscriber é lido do custom claim do JWT Firebase.
 * É usado APENAS para decidir qual query enviar ao Firestore —
 * a autoridade final é sempre firestore.rules (server-side).
 */

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import type { User } from 'firebase/auth';
import { getAuthService } from '../services/AuthService';

// ---------------------------------------------------------------------------
// Tipos públicos
// ---------------------------------------------------------------------------

interface AuthState {
  /** Usuário autenticado atual, ou null se não logado / ainda carregando. */
  user: User | null;
  /** true durante inicialização e operações de login/logout. */
  loading: boolean;
  /**
   * true se o JWT do usuário contém o custom claim subscriber === true.
   * Atribuído pelo backend (Cloud Functions via Stripe) — nunca pelo cliente.
   */
  isSubscriber: boolean;
  /**
   * Mensagem de erro originada no carregamento inicial (ex: magic link inválido).
   * Erros de operações específicas (Google popup, envio de link) são re-lançados
   * para o componente chamador tratar localmente.
   */
  error: string | null;
}

interface AuthActions {
  /** Abre popup de autenticação Google. Lança Error com msg em pt-BR em falha. */
  signInWithGoogle: () => Promise<void>;
  /** Envia email com link de acesso passwordless. Lança Error em falha. */
  sendMagicLink: (email: string) => Promise<void>;
  /** Encerra a sessão. */
  signOut: () => Promise<void>;
  /** Força re-fetch do token para atualizar isSubscriber após mudança de claim. */
  refreshClaims: () => Promise<void>;
  /** Limpa o campo error do estado. */
  clearError: () => void;
}

type AuthContextValue = AuthState & AuthActions;

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AuthContext = createContext<AuthContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const service = useMemo(() => getAuthService(), []);

  // ── Efeito principal: magic link + subscriber de onAuthStateChanged ────────

  useEffect(() => {
    // Passo 1: finalizar magic link se URL contém link de auth
    service.completeMagicLinkSignIn().catch((err: unknown) => {
      const msg = err instanceof Error ? err.message : 'Erro ao completar login por link.';
      setError(msg);
    });

    // Passo 2: escutar mudanças de auth state
    // `prevUser` rastreia se houve transição null → user (first login)
    // para forçar refresh de claims nesse caso.
    let prevUser: User | null = null;

    const unsubscribe = service.onAuthChange(async (newUser) => {
      const isFirstLogin = prevUser === null && newUser !== null;
      prevUser = newUser;

      if (newUser) {
        // Force refresh no primeiro login garante claims atualizados
        const result = await service.getIdTokenResult(isFirstLogin);
        setIsSubscriber(result?.claims['subscriber'] === true);
        setUser(newUser);
      } else {
        setUser(null);
        setIsSubscriber(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [service]);

  // ── Ações ─────────────────────────────────────────────────────────────────

  const signInWithGoogle = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await service.signInWithGoogle();
      // onAuthChange cuida do setUser, setIsSubscriber e setLoading(false)
    } catch (err) {
      // Re-lança para o componente chamador (LoginButton) mostrar localmente
      setLoading(false);
      throw err;
    }
  }, [service]);

  const sendMagicLink = useCallback(async (email: string) => {
    // Re-lança erro para LoginButton mostrar localmente (sem afetar loading global)
    await service.sendMagicLink(email);
  }, [service]);

  const signOut = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await service.signOut();
      // onAuthChange vai disparar com null e setLoading(false)
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }, [service]);

  const refreshClaims = useCallback(async () => {
    if (!user) return;
    const result = await service.getIdTokenResult(true);
    setIsSubscriber(result?.claims['subscriber'] === true);
  }, [user, service]);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isSubscriber,
      error,
      signInWithGoogle,
      sendMagicLink,
      signOut,
      refreshClaims,
      clearError,
    }),
    [user, loading, isSubscriber, error, signInWithGoogle, sendMagicLink, signOut, refreshClaims, clearError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Acessa o contexto de autenticação.
 *
 * @throws Error se chamado fora de um <AuthProvider>.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error(
      '[useAuth] Deve ser usado dentro de <AuthProvider>. ' +
        'Verifique se AuthProvider envolve a árvore de componentes em App.tsx.',
    );
  }
  return ctx;
}
