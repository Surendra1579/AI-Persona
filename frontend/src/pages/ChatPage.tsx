import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ChatPage = () => {
  const personaId = localStorage.getItem('selectedPersona') || 'fyodor';

  const getInitialGreeting = () => {
    switch(personaId) {
      case 'krishna': return "Welcome, dear soul. I've been waiting for you. What weighs on your heart today?";
      case 'rasputin': return "Strength is a choice. Why have you come to me? What power do you seek?";
      default: return "You are here. The mind is a labyrinth—shall we descend together?";
    }
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);

  useEffect(() => {
    setConversationId(null);
    setMessages([
      {
        id: '1',
        role: 'ai',
        content: getInitialGreeting(),
        timestamp: new Date()
      }
    ]);
  }, [personaId]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const getPersonaColor = () => {
    switch(personaId) {
      case 'krishna': return 'text-blue-400';
      case 'rasputin': return 'text-amber-500';
      default: return 'text-secondary';
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    const messageToSend = input;
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          persona_id: personaId,
          conversation_id: conversationId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Unable to generate an AI response. Please try again.');
      }

      const data = await response.json();
      if (data.conversation_id) {
        setConversationId(data.conversation_id);
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: error.message || 'Unable to generate an AI response. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Header Area */}
      <div className="flex items-center justify-between pb-6 mb-2 border-b border-border/50">
        <div>
          <h1 className="text-2xl font-bold text-text-primary capitalize flex items-center gap-2">
            <Sparkles className={clsx("w-5 h-5", getPersonaColor())} />
            {personaId}
          </h1>
          <p className="text-sm text-text-secondary mt-1">AI Companion Session</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-6 py-4">
        {messages.map((msg) => (
          <div key={msg.id} className={clsx("flex gap-4 max-w-[85%]", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}>
            
            <div className={clsx("w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1", 
              msg.role === 'user' ? "bg-surface border border-border text-text-secondary" : "bg-gradient-to-br from-secondary to-primary p-[1px]"
            )}>
              {msg.role === 'user' ? (
                <User className="w-4 h-4" />
              ) : (
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-text-primary" />
                </div>
              )}
            </div>

            <div className={clsx("px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm",
              msg.role === 'user' 
                ? "bg-primary text-white rounded-tr-sm shadow-[0_4px_15px_rgba(96,165,250,0.2)]" 
                : "glass-card rounded-tl-sm text-text-primary"
            )}>
              {msg.content}
            </div>
            
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-4 max-w-[85%]">
            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 bg-gradient-to-br from-secondary to-primary p-[1px]">
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-text-primary" />
              </div>
            </div>
            <div className="px-5 py-4 rounded-2xl glass-card rounded-tl-sm flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-text-secondary/50 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-text-secondary/50 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-text-secondary/50 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="pt-4 mt-2">
        <div className="relative flex items-end bg-surface-hover border border-border rounded-2xl p-2 transition-all focus-within:border-primary/50 focus-within:bg-surface-active focus-within:shadow-[0_0_20px_rgba(96,165,250,0.1)]">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Share your thoughts..."
            className="w-full max-h-32 min-h-[44px] bg-transparent resize-none py-2.5 px-4 text-text-primary placeholder:text-text-secondary/50 text-[15px]"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-2.5 mb-1 mr-1 rounded-xl bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-center text-xs text-text-secondary/50 mt-3 font-medium tracking-wide">
          AI PERSONA V1 - RESPONSES MAY VARY BASED ON PERSONA
        </p>
      </div>
    </div>
  );
};

export default ChatPage;
