# Plano de Auditoria e Evolução: IA & Autenticação

Este documento detalha o diagnóstico técnico da arquitetura atual de inteligência artificial e controle de acesso do projeto Escatologia Bíblica, servindo como base para a próxima Epic de desenvolvimento.

---

## 1. Diagnóstico Técnico: AIChat.tsx e Fluxo de IA

O componente de chat atua como um cliente fino que delega a inteligência pesada para o backend via API.

*   **Tratamento de Mensagens**: O componente mantém um estado local de mensagens e, a cada nova interação, envia o **histórico completo** (`messages`) para a Cloud Function (`/api/chat`).
*   **Injeção de Contexto (RAG)**: O frontend não injeta o contexto teológico. Ele envia os tokens brutos e o backend (Cloud Function) é responsável por:
    1.  Gerar o embedding da pergunta do usuário.
    2.  Realizar a busca vetorial no Firestore.
    3.  Injetar os trechos recuperados no prompt do sistema (System Prompt) antes de chamar o modelo generativo.
*   **Gestão de Estado**: Utiliza `motion` para animações suaves e `useAuth` para bloquear interações de usuários anônimos a nível de UI.

---

## 2. Diagnóstico de Segurança: RBAC e AuthContext.tsx

A autenticação é robusta, baseada em Firebase Auth, mas possui dependências de sincronização.

*   **Identidade**: Suporta Google Sign-In e Magic Link (Passwordless), garantindo baixo atrito no onboarding.
*   **Claim `isSubscriber`**: O sistema utiliza *Custom Claims* do Firebase. O `AuthContext` lê o claim `subscriber` do token JWT para definir se o usuário tem acesso premium.
*   **Ponto de Atenção (Segurança)**: Embora o frontend oculte o chat para não-assinantes/não-logados, a segurança real reside na Cloud Function. Atualmente, o componente envia o `idToken` (Bearer), mas é imperativo que a Function valide o claim `subscriber` decodificando o token no servidor antes de processar a consulta de IA para evitar abusos via chamadas diretas de API.
*   **Quota (Rate Limit)**: Já existe tratamento para o erro `429` (Quota esgotada), indicando que o backend já possui alguma lógica de limites por usuário.

---

## 3. Diagnóstico de Dados: Embeddings e Metadados

O script `scripts/embed-content.ts` define a espinha dorsal do conhecimento da IA.

*   **Modelo e Dimensões**: Utiliza `gemini-embedding-001` com **768 dimensões**, o que é o padrão atual da Google para alta precisão semântica.
*   **Estrutura de Armazenamento**: Os dados são salvos na coleção `content_chunks` do Firestore utilizando o tipo nativo **Vector Search** (`FieldValue.vector`).
*   **Suporte a Filtros**: A estrutura atual **já suporta** filtros de metadados, pois armazena `sectionId` e `kind` junto ao vetor. Isso permite realizar buscas como: *"Busque o termo X apenas nos pedaços do tipo 'event' (Timeline)"*, o que aumenta drasticamente a precisão da resposta.

---

## 4. Plano de Ação: Próximas Tarefas (Epic: IA & Segurança)

Para blindar o sistema e elevar a qualidade das respostas, propomos as seguintes tarefas atômicas:

### Tarefa 1: Blindagem de Segurança (Server-side RBAC)
Refatorar a Cloud Function para validar explicitamente o claim `subscriber` no `DecodedIdToken` antes de qualquer processamento de IA.
- **Objetivo**: Garantir que apenas usuários com a claim ativa possam consumir créditos de IA.

### Tarefa 2: Precisão Contextual (Metadata Filtering)
Implementar lógica de "Context Injection" baseada na navegação atual do usuário. Se o usuário estiver na seção "Milênio", o chat deve priorizar (ou filtrar) os embeddings com `sectionId: 'milenio'`.
- **Objetivo**: Reduzir "alucinações" e focar a IA no tema atual de estudo.

### Tarefa 3: UX de Transição (Proactive Claims Refresh)
Adicionar um gatilho no `AuthContext` que force o `refreshClaims()` imediatamente após um webhook de sucesso do Stripe ser detectado via Firestore.
- **Objetivo**: Evitar que o usuário precise fazer logout/login para ativar suas funcionalidades premium após a compra.

---

## Verificação de Sucesso
- [ ] O chat bloqueia chamadas diretas via Postman/Curl se o token não tiver o claim `subscriber`.
- [ ] As respostas da IA são visivelmente mais precisas quando iniciadas de dentro de seções teológicas específicas.
- [ ] O status de premium é atualizado em tempo real no dashboard após a assinatura.
