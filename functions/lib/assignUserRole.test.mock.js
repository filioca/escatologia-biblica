"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMocks = runMocks;
const index_1 = require("./index");
// Este mock de teste valida o fluxo isolado da nossa nova Cloud Function HTTPs nativa.
// Ele não necessita de um Test Runner e simula o ambiente do Firebase Auth.
async function runMocks() {
    console.log("=== INICIANDO TESTES DO ASSIGN USER ROLE ===");
    // Extraímos o wrapper subjacente usado na versão "v1" das firebase-functions
    // Para fins de demonstração, simulamos a injeção do evento.
    const mockFunction = index_1.assignUserRole;
    // =====================================================================
    // CENÁRIO 1: Acesso negado sem Autenticação
    // =====================================================================
    try {
        const req = { data: { uid: "user_123", role: "ADMIN" } };
        const context = {}; // no auth
        await mockFunction.run(req, context);
        console.error("❌ FALHA: Deveria ter barrado acesso sem autenticação.");
    }
    catch (error) {
        if (error.code === 'unauthenticated') {
            console.log("✅ PASSED: Acesso sem autenticação barrado com sucesso.");
        }
        else {
            console.error("❌ FALHA: Código de erro incorreto:", error.code);
        }
    }
    // =====================================================================
    // CENÁRIO 2: Acesso negado sem claim de ADMIN
    // =====================================================================
    try {
        const req = { data: { uid: "user_123", role: "SUBSCRIBER" } };
        const context = { auth: { uid: "user_guest", token: { admin: false } } };
        await mockFunction.run(req, context);
        console.error("❌ FALHA: Deveria ter barrado usuário que não é admin.");
    }
    catch (error) {
        if (error.code === 'permission-denied') {
            console.log("✅ PASSED: Acesso sem role de ADMIN barrado com sucesso.");
        }
        else {
            console.error("❌ FALHA: Código de erro incorreto:", error.code);
        }
    }
    // =====================================================================
    // CENÁRIO 3: Parâmetros falhos (Role inválida)
    // =====================================================================
    try {
        const req = { data: { uid: "user_123", role: "SUPER_GOD" } };
        const context = { auth: { uid: "user_admin", token: { admin: true } } };
        await mockFunction.run(req, context);
        console.error("❌ FALHA: Deveria ter barrado role inválida.");
    }
    catch (error) {
        if (error.code === 'invalid-argument') {
            console.log("✅ PASSED: Role inválida barrada corretamente.");
        }
        else {
            console.error("❌ FALHA: Código de erro incorreto:", error.code);
        }
    }
    console.log("=== TODOS OS TESTES MOCKS FINALIZADOS ===");
}
// Em um ambiente NodeJS limpo, isso é invocado via setup. 
// Para validar os mocks logicamente:
// runMocks();
//# sourceMappingURL=assignUserRole.test.mock.js.map