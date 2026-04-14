/**
 * UserMenu — dropdown exibido no header quando o usuário está logado.
 *
 * Trigger: avatar (foto ou inicial) + chevron.
 * Itens: email (info), status de assinatura, separador, "Sair".
 * Click fora fecha o dropdown.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, LogOut, BadgeCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// ---------------------------------------------------------------------------
// Sub-componente: Avatar
// ---------------------------------------------------------------------------

const Avatar: React.FC<{ photoURL: string | null; displayName: string | null; email: string | null }> = ({
  photoURL,
  displayName,
  email,
}) => {
  const initial = (displayName ?? email ?? '?').charAt(0).toUpperCase();

  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt={displayName ?? email ?? 'Usuário'}
        className="w-7 h-7 rounded-full object-cover ring-1 ring-gold/40"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <span className="w-7 h-7 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs font-display font-semibold">
      {initial}
    </span>
  );
};

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export const UserMenu: React.FC = () => {
  const { user, isSubscriber, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Click fora fecha ──────────────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleSignOut = useCallback(async () => {
    setSigningOut(true);
    try {
      await signOut();
      setIsOpen(false);
    } catch {
      // Erro ao sair — não é crítico; limpar estado local
    } finally {
      setSigningOut(false);
    }
  }, [signOut]);

  // Early return depois de todos os hooks
  if (!user) return null;

  const displayName = user.displayName;
  const email = user.email;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Menu do usuário"
        className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-border hover:border-gold/40 hover:bg-surface2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <Avatar photoURL={user.photoURL} displayName={displayName} email={email} />
        {displayName && (
          <span className="hidden sm:block text-sm font-sans text-text-dim max-w-[120px] truncate">
            {displayName}
          </span>
        )}
        <ChevronDown
          size={14}
          className={`text-text-muted transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          role="menu"
          aria-label="Opções do usuário"
          className="absolute right-0 top-full mt-2 w-64 bg-surface border border-border rounded-lg shadow-lg py-1 z-50"
        >
          {/* Email (info, não clicável) */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-xs font-sans text-text-muted truncate" title={email ?? ''}>
              {email}
            </p>
          </div>

          {/* Status de assinatura */}
          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
            {isSubscriber ? (
              <>
                <BadgeCheck size={15} className="text-gold flex-shrink-0" aria-hidden="true" />
                <span className="text-sm font-sans font-semibold text-gold">Assinante</span>
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-gold/10 border border-gold/30 text-gold font-display tracking-wide uppercase">
                  PRO
                </span>
              </>
            ) : (
              <span className="text-sm font-sans text-text-muted">Plano gratuito</span>
            )}
          </div>

          {/* Sair */}
          <button
            role="menuitem"
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm font-sans text-text-dim hover:text-sys-red hover:bg-sys-red/5 transition-colors focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-50"
          >
            <LogOut size={15} aria-hidden="true" />
            {signingOut ? 'Saindo…' : 'Sair'}
          </button>
        </div>
      )}
    </div>
  );
};
