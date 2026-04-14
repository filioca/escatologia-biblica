/**
 * LoginButton — botão "Entrar" exibido no header quando o usuário não está logado.
 *
 * Abre um modal com 2 opções de login:
 *   1. Google (popup)
 *   2. Magic Link (email passwordless)
 *
 * Acessibilidade: role=dialog, aria-modal, trap de foco, ESC fecha.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Loader2, Mail, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// ---------------------------------------------------------------------------
// Ícone SVG do Google (lucide-react não inclui ícones de terceiros)
// ---------------------------------------------------------------------------

const GoogleIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------

export const LoginButton: React.FC = () => {
  const { signInWithGoogle, sendMagicLink, loading } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // ── Foco e ESC ─────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;

    // Foca o primeiro elemento focável ao abrir
    const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
      'button:not([disabled]), input:not([disabled])',
    );
    firstFocusable?.focus();

    // Bloqueia scroll do body
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }
      if (e.key !== 'Tab') return;

      // Trap de foco: mantém o Tab dentro do modal
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Handlers ────────────────────────────────────────────────────────────────

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setLocalError(null);
    setMagicLinkSent(false);
    setEmail('');
  }, []);

  const handleGoogleSignIn = useCallback(async () => {
    setLocalLoading(true);
    setLocalError(null);
    try {
      await signInWithGoogle();
      closeModal();
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Erro ao entrar com Google.');
    } finally {
      setLocalLoading(false);
    }
  }, [signInWithGoogle, closeModal]);

  const handleSendMagicLink = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setLocalError('Digite seu email.');
      emailInputRef.current?.focus();
      return;
    }
    setLocalLoading(true);
    setLocalError(null);
    try {
      await sendMagicLink(email.trim());
      setMagicLinkSent(true);
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Erro ao enviar link.');
    } finally {
      setLocalLoading(false);
    }
  }, [email, sendMagicLink]);

  const isDisabled = localLoading || loading;

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-1.5 text-sm font-sans font-medium text-gold border border-gold/40 rounded-full hover:bg-gold/10 hover:border-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label="Abrir modal de login"
      >
        Entrar
      </button>

      {/* Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
            onClick={closeModal}
          />

          {/* Dialog */}
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-modal-title"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="bg-surface border border-border rounded-lg shadow-2xl p-8">

              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <h2
                  id="login-modal-title"
                  className="font-display text-2xl font-semibold text-gold tracking-wide"
                >
                  Entrar na Enciclopédia
                </h2>
                <button
                  onClick={closeModal}
                  className="p-1.5 text-text-muted hover:text-text-main transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label="Fechar modal"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              {/* Erro */}
              {localError && (
                <div
                  role="alert"
                  className="mb-4 px-4 py-3 rounded-lg border bg-sys-red/10 text-sys-red border-sys-red/20 text-sm font-sans"
                >
                  {localError}
                </div>
              )}

              {/* Sucesso — magic link enviado */}
              {magicLinkSent ? (
                <div
                  role="status"
                  className="flex flex-col items-center gap-4 py-4 text-center"
                >
                  <CheckCircle2 size={40} className="text-sys-green" aria-hidden="true" />
                  <p className="font-sans text-text-dim">
                    Email enviado para{' '}
                    <span className="font-semibold text-text-main">{email}</span>.
                    <br />
                    Verifique sua caixa de entrada e clique no link para entrar.
                  </p>
                  <button
                    onClick={closeModal}
                    className="mt-2 px-6 py-2 text-sm font-sans font-medium text-gold border border-gold/40 rounded-full hover:bg-gold/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    Fechar
                  </button>
                </div>
              ) : (
                <>
                  {/* Botão Google */}
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={isDisabled}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-surface border border-border rounded-lg font-sans font-medium text-text-main hover:bg-surface2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {localLoading ? (
                      <Loader2 size={18} className="animate-spin text-text-muted" aria-hidden="true" />
                    ) : (
                      <GoogleIcon size={18} />
                    )}
                    Continuar com Google
                  </button>

                  {/* Separator */}
                  <div className="flex items-center gap-4 my-5">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs font-sans text-text-muted uppercase tracking-widest">ou</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  {/* Magic Link */}
                  <form onSubmit={handleSendMagicLink} noValidate>
                    <label htmlFor="magic-link-email" className="block text-sm font-sans text-text-dim mb-2">
                      Receber link por email
                    </label>
                    <div className="flex gap-2">
                      <input
                        ref={emailInputRef}
                        id="magic-link-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isDisabled}
                        className="flex-1 px-3 py-2.5 bg-surface border border-border rounded-lg text-text-main text-sm font-sans placeholder:text-text-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 disabled:opacity-50"
                        autoComplete="email"
                      />
                      <button
                        type="submit"
                        disabled={isDisabled}
                        className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-sans font-medium text-gold border border-gold/40 rounded-lg hover:bg-gold/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        {localLoading ? (
                          <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                        ) : (
                          <Mail size={14} aria-hidden="true" />
                        )}
                        Enviar link
                      </button>
                    </div>
                  </form>
                </>
              )}

            </div>
          </div>
        </>
      )}
    </>
  );
};
