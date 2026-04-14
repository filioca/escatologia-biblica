/**
 * Inicialização do Firebase SDK para o frontend.
 *
 * Todas as variáveis de configuração devem estar presentes em .env.local
 * (nunca usar fallbacks silenciosos — falha rápido e explicitamente).
 */

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  browserLocalPersistence,
  setPersistence,
  GoogleAuthProvider,
  type Auth,
} from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

// ---------------------------------------------------------------------------
// Guard: valida env vars antes de qualquer inicialização
// ---------------------------------------------------------------------------
function requireEnv(key: string): string {
  const value = import.meta.env[key];
  if (!value || value.trim() === '') {
    throw new Error(
      `[firebase.ts] Variável de ambiente obrigatória ausente: ${key}\n` +
        `Copie .env.example para .env.local e preencha os valores do Console Firebase.\n` +
        `Console: https://console.firebase.google.com/project/apocalipse-biblico/settings/general`,
    );
  }
  return value as string;
}

const firebaseConfig = {
  apiKey: requireEnv('VITE_FIREBASE_API_KEY'),
  authDomain: requireEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: requireEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: requireEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: requireEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: requireEnv('VITE_FIREBASE_APP_ID'),
};

// ---------------------------------------------------------------------------
// Inicialização (singleton — evita "already initialized" em HMR do Vite)
// ---------------------------------------------------------------------------
const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]!;

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app, 'apocalipse-biblico');
const googleProvider = new GoogleAuthProvider();

// Configura persistência local (mantém sessão entre reloads do browser).
// Executado de forma assíncrona; erros são apenas logados para não bloquear
// a inicialização do app.
setPersistence(auth, browserLocalPersistence).catch((err: unknown) => {
  console.error('[firebase.ts] Falha ao configurar persistência local:', err);
});

export { app, auth, db, googleProvider };
