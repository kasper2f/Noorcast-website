import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { sendMessage, listenToChat, getChatId } from '../services/chatService';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const chatId = getChatId();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = listenToChat(chatId, (data) => {
      if (data) {
        setMessages(Object.values(data));
      }
    });
    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(chatId, message, 'user');
    setMessage('');
  };

  const handleServiceClick = (text: string) => {
    const serviceId = text.replace('noorcast://service/', '');
    window.location.hash = `#service-${serviceId}`;
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60] bg-amber-500 p-3.5 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-all"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-black" />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 md:bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] sm:w-80 h-[60vh] md:h-96 max-h-[500px] bg-[#121212] border border-white/10 rounded-2xl shadow-2xl z-[60] flex flex-col overflow-hidden">
          <div className="p-3 md:p-4 bg-black/40 flex justify-between items-center border-b border-white/5">
            <span className="text-white font-bold text-sm md:text-base">دعم نوركاست</span>
            <button onClick={() => setIsOpen(false)}><X size={18} className="text-white/50 hover:text-white transition-colors"/></button>
          </div>
          
          <div className="flex-1 p-3 md:p-4 overflow-y-auto space-y-3">
            {messages.map((m, i) => {
              const textContent = typeof m === 'string' ? m : (m.text || "");
              const isServiceLink = typeof textContent === 'string' && textContent.startsWith('noorcast://service/');
              const sender = m.sender || 'user';

              return (
                <div key={i} className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {isServiceLink ? (
                    <button 
                      onClick={() => handleServiceClick(textContent)}
                      className="p-2.5 md:p-3 rounded-xl max-w-[85%] md:max-w-[80%] text-xs md:text-sm bg-amber-500 text-black font-bold hover:bg-amber-400 transition-all border border-black/10 text-right"
                    >
                      عرض الخدمة المطلوبة ↗
                    </button>
                  ) : (
                    <div className={`p-2.5 md:p-3 rounded-xl max-w-[85%] md:max-w-[80%] text-xs md:text-sm leading-relaxed ${sender === 'user' ? 'bg-amber-500 text-black' : 'bg-white/10 text-white'}`}>
                      {textContent}
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2.5 md:p-3 border-t border-white/5 flex gap-2">
            <input 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-black p-2.5 md:p-2 rounded-xl text-xs md:text-sm text-white outline-none border border-transparent focus:border-amber-500/50 transition-all" 
              placeholder="اكتب رسالتك..." 
            />
            <button onClick={handleSend} className="bg-amber-500 p-2.5 md:p-2 rounded-xl flex items-center justify-center shrink-0 hover:bg-amber-400 transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}