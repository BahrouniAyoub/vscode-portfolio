import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Sparkles, X, Send, PenLine, Bot } from 'lucide-react';
import { FileId, TabId } from '@/data/portfolio';
import { AssistantSource, portfolioKnowledge, projectSource } from '@/data/portfolioKnowledge';

interface ChatbotProps {
  isOpen: boolean;
  activeTab: TabId;
  onClose: () => void;
  onFileSelect: (id: FileId) => void;
  onDownloadResume: () => void;
}

interface Message {
  id: number;
  role: 'user' | 'bot';
  text: string;
  sources?: AssistantSource[];
}

interface AssistantResult {
  reply: string;
  topic?: string;
  sources?: AssistantSource[];
  action?: () => void;
}

const MAX_MSGS = 12;
const TYPE_SPEED_MS = 14;

const defaultSuggestions = [
  'Tell me about Ayoub',
  'Show my projects',
  'What technologies do you use?',
  'Download resume',
];

const suggestionsByTab: Partial<Record<TabId, string[]>> = {
  home: ['Tell me about your AI projects', 'What technologies do you use?', 'Open contact'],
  projects: ['Show best project', 'Explain PagePal', 'What tech did you use?'],
  skills: ['Summarize AI skills', 'Open projects', 'What backend tools do you use?'],
  experience: ['Tell me about internships', 'What did you do at Tak-Tik?', 'Open resume'],
  contact: ['How can I contact Ayoub?', 'Open LinkedIn info', 'Download resume'],
  about: ['What is Ayoub focused on?', 'Tell me about education', 'Open skills'],
  readme: ['Summarize portfolio', 'Open projects', 'Contact Ayoub'],
};

const sourceForTopic = (topic: string): AssistantSource[] => {
  if (topic === 'projects') return [projectSource];
  if (topic === 'skills') return [portfolioKnowledge.skills.source];
  if (topic === 'experience') return [portfolioKnowledge.experience.source];
  if (topic === 'contact') return [portfolioKnowledge.contact.source];
  if (topic === 'resume') return [portfolioKnowledge.resume.source];
  return [portfolioKnowledge.about.source];
};

const includesAny = (text: string, words: string[]) => words.some((word) => text.includes(word));

const Chatbot = ({ isOpen, activeTab, onClose, onFileSelect, onDownloadResume }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [visible, setVisible] = useState(false);
  const [msgCount, setMsgCount] = useState(MAX_MSGS);
  const [isTyping, setIsTyping] = useState(false);
  const [lastTopic, setLastTopic] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const nextIdRef = useRef(1);
  const typingTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const suggestions = useMemo(() => suggestionsByTab[activeTab] ?? defaultSuggestions, [activeTab]);

  const clearTypingTimers = useCallback(() => {
    typingTimersRef.current.forEach(clearTimeout);
    typingTimersRef.current = [];
    setIsTyping(false);
  }, []);

  useEffect(() => {
    if (isOpen) requestAnimationFrame(() => setVisible(true));
    else setVisible(false);
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, handleEsc]);

  useEffect(() => () => clearTypingTimers(), [clearTypingTimers]);

  useEffect(() => {
    const clearHandler = () => {
      clearTypingTimers();
      setMessages([]);
      setMsgCount(MAX_MSGS);
      setInput('');
      setLastTopic(null);
    };
    window.addEventListener('app:copilot-clear-chat', clearHandler as EventListener);
    return () => window.removeEventListener('app:copilot-clear-chat', clearHandler as EventListener);
  }, [clearTypingTimers]);

  const streamBotMessage = useCallback((reply: string, sources?: AssistantSource[]) => {
    const id = nextIdRef.current++;
    setIsTyping(true);
    setMessages((prev) => [...prev, { id, role: 'bot', text: '', sources }]);

    Array.from(reply).forEach((_, index) => {
      const timer = setTimeout(() => {
        setMessages((prev) => prev.map((msg) => (
          msg.id === id ? { ...msg, text: reply.slice(0, index + 1) } : msg
        )));
        if (index === reply.length - 1) setIsTyping(false);
      }, index * TYPE_SPEED_MS);
      typingTimersRef.current.push(timer);
    });
  }, []);

  const getAssistantResult = useCallback((rawMessage: string): AssistantResult => {
    const message = rawMessage.toLowerCase();
    const openAction = (fileId: FileId) => () => onFileSelect(fileId);

    if (includesAny(message, ['download resume', 'resume download', 'get resume'])) {
      return {
        reply: `Opening the resume download. You can also find it as ${portfolioKnowledge.resume.label}.`,
        topic: 'resume',
        sources: [portfolioKnowledge.resume.source],
        action: onDownloadResume,
      };
    }

    if (includesAny(message, ['show projects', 'open projects', 'projects file', 'project tab'])) {
      return {
        reply: 'Opening projects.json. It lists PagePal, CodeSage, CodeQuest, Customer Churn Prediction, and Resume Builder.',
        topic: 'projects',
        sources: [projectSource],
        action: openAction('projects'),
      };
    }

    if (includesAny(message, ['open skills', 'show skills', 'skills file', 'tech stack'])) {
      return {
        reply: `Opening skills.ts. Ayoub works with ${portfolioKnowledge.skills.languages.join(', ')}, plus AI tools like ${portfolioKnowledge.skills.ai.slice(0, 4).join(', ')}.`,
        topic: 'skills',
        sources: [portfolioKnowledge.skills.source],
        action: openAction('skills'),
      };
    }

    if (includesAny(message, ['open contact', 'contact page', 'contact ayoub', 'email'])) {
      return {
        reply: `Opening contact.ts. The main email listed is ${portfolioKnowledge.contact.email}.`,
        topic: 'contact',
        sources: [portfolioKnowledge.contact.source],
        action: openAction('contact'),
      };
    }

    if (includesAny(message, ['open experience', 'show experience', 'internship', 'internships'])) {
      return {
        reply: 'Opening experience.ts. It includes internships at Tunisie Telecom and Tak-Tik, focused on IoT, AI, accessibility, and real-time systems.',
        topic: 'experience',
        sources: [portfolioKnowledge.experience.source],
        action: openAction('experience'),
      };
    }

    const pagePal = portfolioKnowledge.projects.find((project) => project.name === 'PagePal');
    if (message.includes('pagepal') && pagePal) {
      return {
        reply: `${pagePal.name} is ${pagePal.type}: ${pagePal.summary} Stack: ${pagePal.stack.join(', ')}. Status: ${pagePal.status}.`,
        topic: 'pagepal',
        sources: [projectSource],
      };
    }

    if (includesAny(message, ['best project', 'top project', 'strongest project'])) {
      return {
        reply: 'PagePal is the strongest portfolio project listed because it combines AI voice, full-stack product architecture, authentication, file handling, and production deployment.',
        topic: 'pagepal',
        sources: [projectSource],
      };
    }

    if (includesAny(message, ['what tech', 'technologies', 'stack']) && lastTopic === 'pagepal' && pagePal) {
      return {
        reply: `For PagePal, Ayoub used ${pagePal.stack.join(', ')}.`,
        topic: 'pagepal',
        sources: [projectSource],
      };
    }

    if (includesAny(message, ['ai projects', 'ml projects', 'machine learning projects'])) {
      const aiProjects = portfolioKnowledge.projects.filter((project) => /ai|machine|ml/i.test(`${project.type} ${project.summary}`));
      return {
        reply: `AI-focused projects listed here include ${aiProjects.map((project) => project.name).join(', ')}. PagePal is the most product-ready AI SaaS example.`,
        topic: 'projects',
        sources: [projectSource],
      };
    }

    if (includesAny(message, ['project', 'projects'])) {
      return {
        reply: `Ayoub's listed projects are ${portfolioKnowledge.projects.map((project) => project.name).join(', ')}. They cover AI SaaS, developer tools, gamified learning, ML pipelines, and full-stack apps.`,
        topic: 'projects',
        sources: [projectSource],
      };
    }

    if (includesAny(message, ['skill', 'skills', 'tools', 'technology', 'technologies', 'backend', 'frontend', 'ai skill'])) {
      return {
        reply: `Ayoub's stack includes ${portfolioKnowledge.skills.languages.join(', ')}; AI/LLM tools like ${portfolioKnowledge.skills.ai.join(', ')}; backend tools like ${portfolioKnowledge.skills.backend.join(', ')}; and frontend tools like ${portfolioKnowledge.skills.frontend.join(', ')}.`,
        topic: 'skills',
        sources: [portfolioKnowledge.skills.source],
      };
    }

    if (includesAny(message, ['experience', 'work', 'taktik', 'tak-tik', 'telecom'])) {
      return {
        reply: portfolioKnowledge.experience.items.map((item) => `${item.role} at ${item.company} (${item.period}): ${item.focus}`).join(' '),
        topic: 'experience',
        sources: [portfolioKnowledge.experience.source],
      };
    }

    if (includesAny(message, ['education', 'school', 'degree', 'university', 'esprit'])) {
      return {
        reply: portfolioKnowledge.education.items.join(' '),
        topic: 'education',
        sources: [portfolioKnowledge.about.source],
      };
    }

    if (includesAny(message, ['who', 'about', 'focus', 'ayoub', 'open to work'])) {
      return {
        reply: `${portfolioKnowledge.about.summary} Current focus: ${portfolioKnowledge.about.focus.join(', ')}. Status: ${portfolioKnowledge.about.status}`,
        topic: 'about',
        sources: [portfolioKnowledge.about.source],
      };
    }

    if (includesAny(message, ['linkedin', 'github', 'medium', 'reach'])) {
      return {
        reply: `Contact links listed in the portfolio: email ${portfolioKnowledge.contact.email}, LinkedIn ${portfolioKnowledge.contact.linkedin}, GitHub ${portfolioKnowledge.contact.github}, and Medium ${portfolioKnowledge.contact.medium}.`,
        topic: 'contact',
        sources: [portfolioKnowledge.contact.source],
      };
    }

    return {
      reply: 'I can only answer questions about Ayoub Bahrouni\'s portfolio: about, skills, projects, experience, education, resume, and contact info. Try asking “show projects” or “what technologies do you use?”',
      topic: lastTopic ?? undefined,
      sources: lastTopic ? sourceForTopic(lastTopic) : undefined,
    };
  }, [lastTopic, onDownloadResume, onFileSelect]);

  const handleSend = (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || msgCount <= 0 || isTyping) return;

    clearTypingTimers();
    setMessages((prev) => [...prev, { id: nextIdRef.current++, role: 'user', text: msg }]);
    setInput('');
    setMsgCount((count) => count - 1);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    const result = getAssistantResult(msg);
    result.action?.();
    if (result.topic) setLastTopic(result.topic);
    streamBotMessage(result.reply, result.sources);
  };

  const handleNewChat = () => {
    clearTypingTimers();
    setMessages([]);
    setMsgCount(MAX_MSGS);
    setLastTopic(null);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  };

  const isWelcome = messages.length === 0;

  return (
    <div
      className="fixed top-0 right-0 h-screen w-[calc(100vw-16px)] max-w-full sm:w-[360px] flex flex-col overflow-hidden bg-vsc-sidebar transition-all duration-300 ease-out z-[80]"
      style={{
        transform: visible ? 'translateX(0)' : 'translateX(100%)',
        pointerEvents: isOpen ? 'auto' : 'none',
        borderLeft: '1px solid hsl(var(--border))',
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="flex flex-col w-full h-full min-w-0 shrink-0">
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-border">
          <div className="flex min-w-0 items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))' }}>
              <Bot size={13} strokeWidth={2} className="text-primary-foreground" />
            </div>
            <span className="truncate text-[13px] font-semibold text-foreground tracking-tight">Ayoub's AI Assistant</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={handleNewChat} className="w-7 h-7 flex items-center justify-center rounded hover:bg-secondary/60 transition-colors text-muted-foreground hover:text-foreground" title="New Chat">
              <PenLine size={14} strokeWidth={1.5} />
            </button>
            <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded hover:bg-secondary/60 transition-colors text-muted-foreground hover:text-foreground" title="Close">
              <X size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-vsc-tab-inactive">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Workspace</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="truncate text-[10px] text-muted-foreground">portfolio · {activeTab}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3">
          {isWelcome ? (
            <div className="flex flex-col items-center pt-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))' }}>
                <Sparkles size={22} strokeWidth={1.5} className="text-primary-foreground" />
              </div>
              <p className="text-[14px] font-semibold text-foreground mb-1">Hi! I'm Ayoub's Copilot</p>
              <p className="text-[11px] text-muted-foreground text-center mb-5 max-w-[280px] leading-relaxed">
                Ask me about Ayoub's projects, skills, experience, education, resume, or contact info.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start gap-2'}`}>
                  {msg.role === 'bot' && (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))' }}>
                      <Bot size={11} strokeWidth={2} className="text-primary-foreground" />
                    </div>
                  )}
                  <div className="max-w-[85%] min-w-0 break-words">
                    <div
                      className={`px-3 py-2 text-[12px] leading-relaxed ${msg.role === 'user' ? 'rounded-[12px_12px_4px_12px] bg-primary text-primary-foreground' : 'rounded-[12px_12px_12px_4px] bg-secondary/70 text-foreground border border-border/60'}`}
                    >
                      {msg.text || (msg.role === 'bot' ? '...' : '')}
                    </div>
                    {msg.role === 'bot' && msg.sources && msg.text && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {msg.sources.map((source) => (
                          <button key={`${msg.id}-${source.label}`} onClick={() => onFileSelect(source.fileId)} className="text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors">
                            {source.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <div className="px-3 pb-2 pt-1 border-t border-border/60">
          <div className="mb-2 grid grid-cols-1 gap-1.5">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSend(suggestion)}
                disabled={isTyping || msgCount <= 0}
                className="rounded border border-border bg-secondary/30 px-2.5 py-1.5 text-left text-[11px] text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground hover:bg-secondary/60 disabled:opacity-50"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="flex items-end gap-2 rounded-lg px-3 py-2 bg-secondary/40 border border-border focus-within:border-primary/70">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about projects, skills, resume..."
              rows={1}
              className="min-w-0 flex-1 bg-transparent text-foreground text-[12px] leading-relaxed resize-none focus:outline-none placeholder:text-muted-foreground/60"
              style={{ maxHeight: 120 }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || msgCount <= 0 || isTyping}
              className="w-7 h-7 rounded flex items-center justify-center shrink-0 transition-colors disabled:opacity-50"
              style={{
                background: input.trim() && !isTyping ? 'hsl(var(--primary))' : 'transparent',
                color: input.trim() && !isTyping ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))',
                cursor: input.trim() && !isTyping ? 'pointer' : 'default',
              }}
            >
              <Send size={13} strokeWidth={1.5} />
            </button>
          </div>
          <div className="flex items-center justify-between gap-2 mt-1.5 px-1">
            <span className="text-[10px] text-muted-foreground/60">{msgCount} msgs left</span>
            {lastTopic && <span className="truncate text-[10px] text-muted-foreground/60">context: {lastTopic}</span>}
          </div>
          <p className="text-[9px] text-muted-foreground/50 text-center mt-1">
            Answers are limited to the portfolio knowledge base.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
