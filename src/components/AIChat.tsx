import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

const CHAT_API_URL = 'https://us-central1-apocalipse-biblico.cloudfunctions.net/apiV1/api/chat';

interface AIChatProps {
  activeSection?: string;
}

export default function AIChat({ activeSection }: AIChatProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    {
      role: 'ai',
      text: 'Olá! Sou seu assistente teológico. Como posso ajudar você a entender melhor a escatologia bíblica hoje?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!user) {
      setMessages((prev) => [
        ...prev,
        { role: 'user', text: input.trim() },
        {
          role: 'ai',
          text: 'Você precisa estar logado para usar o assistente teológico. Por favor, faça login clicando no ícone de perfil no topo da página.',
        },
      ]);
      setInput('');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const idToken = await user.getIdToken();

      // Mapeia o histórico para o formato esperado pelo backend (RAG)
      const chatHistory = messages.map(m => ({
        role: m.role === 'ai' ? 'assistant' : 'user',
        content: m.text
      }));

      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Enviamos o histórico completo + a nova mensagem para o backend recuperar o contexto
          // Adicionamos o sectionId (activeSection) para possibilitar o Metadata Filtering no RAG
          messages: [...chatHistory, { role: 'user', content: userMessage }],
          sectionId: activeSection
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setMessages((prev) => [
            ...prev,
            {
              role: 'ai',
              text: data.message || 'Sua quota de mensagens deste mês esgotou.',
            },
          ]);
        } else {
          throw new Error(data.message || 'Erro no servidor');
        }
        return;
      }

      setMessages((prev) => [...prev, { role: 'ai', text: data.reply }]);
    } catch (error) {
      console.error('[AIChat] Erro ao chamar backend:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: 'Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente mais tarde.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-gold text-white rounded-full shadow-lg hover:bg-gold-light transition-colors z-50 flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/50"
        aria-label="Abrir assistente teológico"
      >
        <MessageCircle size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-surface border border-border rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            <div className="p-4 bg-surface2 border-b border-border flex justify-between items-center">
              <div>
                <h3 className="font-display text-gold text-sm tracking-wider uppercase">Assistente Teológico</h3>
                <p className="text-xs text-text-dim">Tire suas dúvidas sobre escatologia</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-text-main transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded" aria-label="Fechar assistente">
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-lg p-4 text-base ${
                      msg.role === 'user'
                        ? 'bg-gold text-white rounded-br-none'
                        : 'bg-surface3 text-text-main rounded-bl-none border border-border'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface3 text-text-main rounded-lg rounded-bl-none border border-border p-4 flex items-center gap-3">
                    <Loader2 size={18} className="animate-spin text-gold" />
                    <span className="text-base text-text-dim">Pensando...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-surface2 border-t border-border flex gap-3">
              <label htmlFor="chat-input" className="sr-only">Faça uma pergunta</label>
              <input
                id="chat-input"
                name="chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Faça uma pergunta..."
                autoComplete="off"
                className="flex-1 bg-surface border border-border rounded-md px-4 py-3 text-base text-text-main focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus:border-gold transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                aria-label="Enviar mensagem"
                className="p-3 bg-gold text-white rounded-md hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Send size={20} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
