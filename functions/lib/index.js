"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignUserRole = exports.apiV1 = void 0;
const functions = __importStar(require("firebase-functions/v1"));
const admin = __importStar(require("firebase-admin"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const genai_1 = require("@google/genai");
admin.initializeApp();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true }));
app.use(express_1.default.json());
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});
app.post("/api/chat", async (req, res) => {
    try {
        const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const { message, context } = req.body;
        const prompt = `Você é um assistente teológico especializado em Escatologia Bíblica. 
Responda à pergunta do usuário com base no seguinte contexto do material de estudo.
Seja claro, objetivo e mantenha um tom respeitoso e acadêmico.

Contexto do material:
${context}

Pergunta do usuário:
${message}`;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        res.json({ reply: response.text });
    }
    catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});
// Usando runWith para acionar o suporte a secrets nativo da v1
exports.apiV1 = functions.runWith({ secrets: ["GEMINI_API_KEY"] }).https.onRequest(app);
// ============================================================================
// Auth & Identity Management
// ============================================================================
exports.assignUserRole = functions.https.onCall(async (data, context) => {
    // Check if user is authenticated
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "User must be logged in.");
    }
    // Enforce caller MUST be an admin
    // (During bootstrapping, you might manually set the initial admin from the Firebase Console)
    const isCallerAdmin = context.auth.token.admin === true;
    if (!isCallerAdmin) {
        throw new functions.https.HttpsError("permission-denied", "Only admins can assign roles.");
    }
    const targetUid = data.uid;
    const role = data.role; // 'GUEST', 'SUBSCRIBER', 'ADMIN'
    if (!targetUid || !role) {
        throw new functions.https.HttpsError("invalid-argument", "Missing target uid or role.");
    }
    const validRoles = ["GUEST", "SUBSCRIBER", "ADMIN"];
    if (!validRoles.includes(role)) {
        throw new functions.https.HttpsError("invalid-argument", "Role must be GUEST, SUBSCRIBER, or ADMIN.");
    }
    // Create progressive claims
    const customClaims = {
        guest: role === "GUEST",
        subscriber: role === "SUBSCRIBER" || role === "ADMIN",
        admin: role === "ADMIN"
    };
    try {
        await admin.auth().setCustomUserClaims(targetUid, customClaims);
        return { message: `Successfully assigned role ${role} to user ${targetUid}.` };
    }
    catch (error) {
        console.error("Error setting custom claims:", error);
        throw new functions.https.HttpsError("internal", "Failed to assign role.");
    }
});
//# sourceMappingURL=index.js.map