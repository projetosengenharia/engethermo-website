import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader } from 'lucide-react';
import { Streamdown } from 'streamdown';

const WHATSAPP_NUMBER = '5543984111736';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
const ICON_URL = '/images/icon-et-cropped_9f642670.png';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Bem-vindo a Engethermo Engenharia. Como podemos ajudar?',
      timestamp: new Date(),
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          message: input,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const response = (await res.json()) as { reply: string; success: boolean };

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: typeof response.reply === 'string' ? response.reply : JSON.stringify(response.reply),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Desculpe, tive um problema ao processar sua mensagem. Por favor, tente novamente.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-105 ring-1 ring-red-500/30"
        aria-label="Abrir assistente"
      >
        {isOpen ? (
          <X className="w-5 h-5" strokeWidth={2.5} />
        ) : (
          <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-32px)] h-[520px] bg-[#1d1c1e] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white px-4 py-3 flex items-center justify-between gap-3 border-b border-red-900/60 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <img
                  src={ICON_URL}
                  alt="ENGETHERMO"
                  className="w-9 h-9 object-contain"
                />
              </div>
              <div className="leading-tight">
                <h3 className="font-bold text-sm tracking-widest uppercase">Engethermo</h3>
                <p className="text-[10px] text-red-200/80 font-medium tracking-wide">Assistente Virtual</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5 bg-[#1d1c1e] custom-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl ${
                    message.role === 'user'
                      ? 'bg-red-600 text-white rounded-br-sm shadow-md'
                      : 'bg-[#262626] text-gray-100 border border-gray-700/60 rounded-bl-sm shadow-sm'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div className="chat-message-content">
                      <Streamdown>{message.content as string}</Streamdown>
                    </div>
                  ) : (
                    <p className="text-[12.5px] leading-relaxed">{message.content}</p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#262626] text-gray-100 border border-gray-700/60 px-3 py-2 rounded-xl rounded-bl-sm flex items-center gap-2 shadow-sm">
                  <Loader className="w-3.5 h-3.5 animate-spin text-red-500" />
                  <span className="text-[12px] text-gray-300">Digitando...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-800 px-3 py-3 bg-[#1d1c1e]">
            <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Faça uma pergunta..."
                className="flex-1 px-3 py-2 bg-[#262626] border border-gray-700 text-white text-[12.5px] rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 placeholder-gray-500 transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex items-center justify-center"
                aria-label="Enviar"
              >
                <Send className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </form>
            <div className="flex justify-center mt-2">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-gray-500 hover:text-red-400 transition-colors tracking-wide flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
                Fale com um especialista
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
