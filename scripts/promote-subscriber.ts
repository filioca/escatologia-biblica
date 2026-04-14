#!/usr/bin/env tsx
/**
 * promote-subscriber — atribui ou revoga o custom claim
 * subscriber no JWT de um usuário Firebase.
 *
 * Uso:
 *   npm run promote -- <email>            # promove a subscriber
 *   npm run promote -- <email> --revoke   # revoga subscriber
 *
 * Requisitos:
 *   - gcloud auth application-default login (ADC configurada)
 *   - Usuário deve existir (login pelo app pelo menos uma vez)
 */

import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const PROJECT_ID = 'apocalipse-biblico';

async function main() {
  const email = process.argv[2];
  const revoke = process.argv[3] === '--revoke';

  if (!email) {
    console.error('❌ Uso: npm run promote -- <email> [--revoke]');
    console.error('');
    console.error('   Exemplos:');
    console.error('     npm run promote -- joao@email.com');
    console.error('     npm run promote -- joao@email.com --revoke');
    process.exit(1);
  }

  console.log(`🔑 ${revoke ? 'Revogando' : 'Promovendo'} subscriber para: ${email}`);

  initializeApp({
    credential: applicationDefault(),
    projectId: PROJECT_ID,
  });

  const auth = getAuth();

  let user;
  try {
    user = await auth.getUserByEmail(email);
  } catch (err: unknown) {
    const code = (err as { code?: string }).code;
    if (code === 'auth/user-not-found') {
      console.error(`❌ Usuário não encontrado: ${email}`);
      console.error('   Faça login pelo app primeiro para criar a conta.');
      process.exit(1);
    }
    throw err;
  }

  const existingClaims = user.customClaims ?? {};
  const newClaims = { ...existingClaims, subscriber: !revoke };

  console.log(`   UID:           ${user.uid}`);
  console.log(`   Claims antes:  ${JSON.stringify(existingClaims)}`);

  await auth.setCustomUserClaims(user.uid, newClaims);

  console.log(`   Claims depois: ${JSON.stringify(newClaims)}`);
  console.log('');
  console.log('✅ Claim aplicado com sucesso.');
  console.log('');
  console.log('⚠️  O usuário deve fazer LOGOUT e LOGIN novamente no app');
  console.log('   para o claim entrar em vigor. Alternativamente, o token');
  console.log('   refresca automaticamente após ~1h.');
}

main().catch((err: unknown) => {
  const msg = err instanceof Error ? err.message : String(err);
  console.error('❌ Erro:', msg);
  process.exit(1);
});
