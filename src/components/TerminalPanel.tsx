import { useState, useRef, useEffect, useCallback, type ReactNode, type FormEvent, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TerminalPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect?: (id: string) => void;
  onDownloadResume?: () => void;
}

interface TerminalLine {
  type: 'prompt' | 'welcome';
  command?: string;
  content?: ReactNode;
  variant?: 'output' | 'error' | 'info' | 'success';
}

interface ParsedCommand {
  raw: string;
  command: string;
  args: string[];
  lower: string;
}

interface CommandResult {
  content?: ReactNode;
  variant?: TerminalLine['variant'];
  clear?: boolean;
}

type CommandHandler = (parsed: ParsedCommand) => CommandResult;

const PROMPT_USER = 'ayoub';
const PROMPT_HOST = '@portfolio';
const PROMPT_DIR = '~';
const RESUME_FILE = 'Ayoub_Bahrouni_Resume.pdf';
const RESUME_PATH = '/resume.pdf';

const FILES = ['about.ts', 'projects.json', 'experience.ts', 'skills.ts', 'contact.ts', 'resume.pdf'];
const PROJECTS = ['PagePal', 'CodeQuest', 'CodeSage', 'Resume Builder', 'Customer Churn Prediction'];

const FILE_TO_SECTION: Record<string, string> = {
  'about.ts': 'about',
  'projects.json': 'projects',
  'skills.ts': 'skills',
  'experience.ts': 'experience',
  'contact.ts': 'contact',
  'resume.pdf': 'resume',
  'index.ts': 'home',
};

const PROJECT_ALIASES: Record<string, string> = {
  pagepal: 'PagePal',
  codequest: 'CodeQuest',
  codesage: 'CodeSage',
};

const COMMAND_SUGGESTIONS = [
  'help',
  'clear',
  'date',
  'echo',
  'pwd',
  'ls',
  'ls projects',
  'whoami',
  'skills',
  'contact',
  'resume',
  'open resume',
  'cat resume.pdf',
  'npm install ayoub-resume',
  'projects',
  'open pagepal',
  'open codequest',
  'open codesage',
  'neofetch',
  'run ai-model',
  'llm --status',
  'sudo hire ayoub',
  'make coffee',
  'rm -rf bugs',
  'git log',
  'python --version',
  'cd',
];

const parseCommand = (raw: string): ParsedCommand => {
  const trimmed = raw.trim();
  const args = trimmed ? trimmed.split(/\s+/) : [];
  return {
    raw: trimmed,
    command: args[0]?.toLowerCase() ?? '',
    args,
    lower: trimmed.toLowerCase(),
  };
};

const TerminalLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer" className="text-vsc-cyan hover:underline">
    {children}
  </a>
);

const HelpOutput = () => (
  <div className="space-y-1">
    <div className="text-vsc-keyword">Portfolio Commands:</div>
    <div className="pl-4">whoami</div>
    <div className="pl-4">skills</div>
    <div className="pl-4">projects</div>
    <div className="pl-4">contact</div>
    <div className="pl-4">resume</div>
    <div className="text-vsc-keyword pt-1">Project Commands:</div>
    <div className="pl-4">open pagepal</div>
    <div className="pl-4">open codequest</div>
    <div className="pl-4">open codesage</div>
    <div className="text-vsc-keyword pt-1">System Commands:</div>
    <div className="pl-4">clear</div>
    <div className="pl-4">pwd</div>
    <div className="pl-4">ls</div>
    <div className="pl-4">date</div>
    <div className="pl-4">echo &lt;text&gt;</div>
    <div className="text-vsc-keyword pt-1">Fun Commands:</div>
    <div className="pl-4">sudo hire ayoub</div>
    <div className="pl-4">neofetch</div>
    <div className="pl-4">make coffee</div>
    <div className="pl-4">rm -rf bugs</div>
    <div className="text-vsc-keyword pt-1">AI Commands:</div>
    <div className="pl-4">run ai-model</div>
    <div className="pl-4">llm --status</div>
  </div>
);

const SkillsOutput = () => (
  <div className="space-y-2">
    <div>
      <div className="text-vsc-cyan">Languages:</div>
      <div>- Python</div>
      <div>- TypeScript</div>
      <div>- JavaScript</div>
    </div>
    <div>
      <div className="text-vsc-cyan">Frameworks:</div>
      <div>- React</div>
      <div>- Next.js</div>
      <div>- FastAPI</div>
    </div>
    <div>
      <div className="text-vsc-cyan">AI/ML:</div>
      <div>- PyTorch</div>
      <div>- LangChain</div>
      <div>- RAG</div>
      <div>- LLMs</div>
    </div>
  </div>
);

const ContactOutput = () => (
  <div className="space-y-1">
    <div>- GitHub: <TerminalLink href="https://github.com/BahrouniAyoub">github.com/BahrouniAyoub</TerminalLink></div>
    <div>- LinkedIn: <TerminalLink href="https://www.linkedin.com/in/ayoub-bahrouni">linkedin.com/in/ayoub-bahrouni</TerminalLink></div>
    <div>- Email: <TerminalLink href="mailto:bahrouni.ayoub2003@gmail.com">bahrouni.ayoub2003@gmail.com</TerminalLink></div>
  </div>
);

const ProjectsOutput = () => (
  <div>
    {PROJECTS.map(project => <div key={project}>- {project}</div>)}
  </div>
);

const NeofetchOutput = () => (
  <div className="grid grid-cols-[auto_1fr] gap-x-4 text-foreground/90">
    <pre className="hidden sm:block text-vsc-keyword leading-none">{`      /\\
     /  \\
    / /\\ \\
   / ____ \\
  /_/    \\_\\`}</pre>
    <div>
      <div><span className="text-vsc-cyan">OS:</span> AyoubOS 1.0</div>
      <div><span className="text-vsc-cyan">Role:</span> AI Engineer</div>
      <div><span className="text-vsc-cyan">Location:</span> Tunisia</div>
      <div><span className="text-vsc-cyan">Education:</span> ESPRIT</div>
      <div><span className="text-vsc-cyan">Stack:</span> React, FastAPI, Python, TypeScript</div>
      <div><span className="text-vsc-cyan">Focus:</span> AI Systems & Full Stack Development</div>
      <div><span className="text-vsc-green">Status:</span> Open to Work</div>
    </div>
  </div>
);

const PromptPrefix = () => (
  <span className="shrink-0">
    <span className="text-vsc-green">{PROMPT_USER}</span>
    <span className="text-muted-foreground">{PROMPT_HOST}</span>
    <span className="text-muted-foreground">:</span>
    <span className="text-vsc-green">{PROMPT_DIR}</span>
    <span className="text-muted-foreground">$ </span>
  </span>
);

const playTerminalSound = () => {
  try {
    if (localStorage.getItem('ui-sounds-enabled') === 'false') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const context = new AudioCtx();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.frequency.value = 520;
    oscillator.type = 'triangle';
    gain.gain.setValueAtTime(0.025, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.03);
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.03);
  } catch {
    // Terminal audio is a progressive enhancement.
  }
};

const TerminalPanel = ({ isOpen, onClose, onFileSelect, onDownloadResume }: TerminalPanelProps) => {
  const [visible, setVisible] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'welcome', content: "Welcome to AyoubOS. Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'terminal' | 'problems' | 'output'>('terminal');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastSoundRef = useRef(0);

  const downloadResume = useCallback(() => {
    if (onDownloadResume) {
      onDownloadResume();
      return;
    }
    const link = document.createElement('a');
    link.href = RESUME_PATH;
    link.download = RESUME_FILE;
    link.click();
  }, [onDownloadResume]);

  const openFile = useCallback((file: string) => {
    const sectionId = FILE_TO_SECTION[file.toLowerCase()];
    if (!sectionId || !onFileSelect) return false;
    onFileSelect(sectionId);
    return true;
  }, [onFileSelect]);

  const commands = useRef<Record<string, CommandHandler>>({});

  useEffect(() => {
    commands.current = {
      help: () => ({ content: <HelpOutput />, variant: 'output' }),
      clear: () => ({ clear: true }),
      date: () => ({ content: new Date().toString(), variant: 'output' }),
      pwd: () => ({ content: '/Users/ayoub/portfolio', variant: 'output' }),
      ls: ({ lower }) => ({ content: lower === 'ls projects' ? <ProjectsOutput /> : FILES.join('   '), variant: 'output' }),
      whoami: () => ({
        content: `Ayoub Bahrouni
AI Engineer & Full Stack Developer
Currently exploring LLMs, RAG, scalable AI systems, and full-stack applications.
Open to opportunities.`,
        variant: 'output',
      }),
      skills: () => ({ content: <SkillsOutput />, variant: 'output' }),
      contact: () => {
        onFileSelect?.('contact');
        return { content: <ContactOutput />, variant: 'output' };
      },
      resume: () => {
        onFileSelect?.('resume');
        downloadResume();
        return { content: `[✔] Opening ${RESUME_FILE}...`, variant: 'success' };
      },
      projects: () => {
        onFileSelect?.('projects');
        return { content: <ProjectsOutput />, variant: 'output' };
      },
      neofetch: () => ({ content: <NeofetchOutput />, variant: 'output' }),
      cd: ({ args }) => {
        const dir = args[1];
        if (!dir || dir === '~') return { content: '/Users/ayoub/portfolio', variant: 'info' };
        if (dir === '..') return { content: 'Already at root directory.', variant: 'info' };
        return { content: `cd: ${dir}: No such file or directory`, variant: 'error' };
      },
      git: ({ lower }) => {
        if (lower !== 'git log') return { content: `git: unsupported command. Try 'git log'.`, variant: 'error' };
        return {
          content: `commit a3f9d21 (HEAD -> main)
Author: ayoub Bahrouni <ayoub@portfolio.dev>
Date:   Mon May 5 12:00:00 2026
    feat: add VSCode terminal panel

commit b8c2e10
Author: ayoub Bahrouni <ayoub@portfolio.dev>
Date:   Sun May 4 18:30:00 2026
    feat: implement global theme switching

commit c1d7f83
Author: ayoub Bahrouni <ayoub@portfolio.dev>
Date:   Sat May 3 14:15:00 2026
    feat: add Copilot side panel`,
          variant: 'output',
        };
      },
      python: ({ lower }) => {
        if (lower === 'python --version') return { content: 'Python 3.12.0', variant: 'output' };
        return { content: `python: unsupported command. Try 'python --version'.`, variant: 'error' };
      },
      echo: ({ raw }) => ({ content: raw.slice(5), variant: 'output' }),
      open: ({ args, lower }) => {
        const target = args.slice(1).join(' ').toLowerCase();
        if (!target) return { content: 'Usage: open <filename|project>', variant: 'error' };
        if (target === 'resume') {
          onFileSelect?.('resume');
          downloadResume();
          return { content: `[✔] Opening ${RESUME_FILE}...`, variant: 'success' };
        }
        if (PROJECT_ALIASES[target]) {
          onFileSelect?.('projects');
          return { content: `Opening ${PROJECT_ALIASES[target]} in projects.json...`, variant: 'info' };
        }
        if (openFile(target)) return { content: `Opening ${target}...`, variant: 'info' };
        return { content: `${lower.startsWith('open') ? 'open' : 'cat'}: ${target}: No such file or directory`, variant: 'error' };
      },
      cat: ({ args }) => {
        const target = args.slice(1).join(' ').toLowerCase();
        if (!target) return { content: 'Usage: cat <filename>', variant: 'error' };
        if (target === 'resume.pdf') {
          onFileSelect?.('resume');
          downloadResume();
          return { content: `[✔] Opening ${RESUME_FILE}...`, variant: 'success' };
        }
        if (openFile(target)) return { content: `Opening ${target}...`, variant: 'info' };
        return { content: `cat: ${target}: No such file or directory`, variant: 'error' };
      },
      npm: ({ lower }) => {
        if (lower === 'npm install ayoub-resume') {
          downloadResume();
          return {
            content: `[✔] Downloading ${RESUME_FILE}...
[📄] Resume installed successfully.`,
            variant: 'success',
          };
        }
        return { content: 'npm: package not found. Try npm install ayoub-resume', variant: 'error' };
      },
      run: ({ lower }) => {
        if (lower === 'run ai-model') {
          return { content: '[🧠] Initializing neural network...\n[✔] AI systems online.', variant: 'success' };
        }
        return { content: 'run: unknown target. Try run ai-model', variant: 'error' };
      },
      llm: ({ lower }) => {
        if (lower === 'llm --status') {
          return { content: 'RAG: active\nPrompt Engineering: active\nVector DB: learning\nLLM Systems: active', variant: 'output' };
        }
        return { content: 'llm: unknown flag. Try llm --status', variant: 'error' };
      },
      sudo: ({ lower }) => {
        if (lower === 'sudo hire ayoub') {
          return { content: '[✔] Access granted.\n[🚀] Hiring Ayoub...\n[💼] Offer accepted.\n[🎉] Congratulations, great choice.', variant: 'success' };
        }
        return { content: 'sudo: permission denied. Try sudo hire ayoub', variant: 'error' };
      },
      make: ({ lower }) => {
        if (lower === 'make coffee') return { content: '[☕] Brewing motivation...', variant: 'success' };
        return { content: 'make: no rule to make target. Try make coffee', variant: 'error' };
      },
      rm: ({ lower }) => {
        if (lower === 'rm -rf bugs') return { content: '[✔] Bugs deleted successfully.', variant: 'success' };
        return { content: 'rm: operation blocked in portfolio sandbox', variant: 'error' };
      },
    };
  }, [downloadResume, onFileSelect, openFile]);

  const processCommand = useCallback((cmd: string): CommandResult => {
    const parsed = parseCommand(cmd);
    const handler = commands.current[parsed.command];
    if (handler) return handler(parsed);

    return {
      content: `command not found: ${parsed.raw}\ntype 'help' for available commands`,
      variant: 'error',
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    window.addEventListener('app:focus-terminal', focusInput as EventListener);
    return () => window.removeEventListener('app:focus-terminal', focusInput as EventListener);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleEsc = useCallback((e: globalThis.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, handleEsc]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim();
    const result = processCommand(cmd);
    setInput('');
    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(null);
    playTerminalSound();

    if (result.clear) {
      setLines([]);
      return;
    }

    setLines(prev => [...prev, { type: 'prompt', command: cmd, content: result.content, variant: result.variant ?? 'output' }]);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0 || historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setInput('');
        return;
      }
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
      return;
    }

    if (e.key === 'Tab') {
      const suggestion = COMMAND_SUGGESTIONS.find(command => command.startsWith(input.toLowerCase()));
      if (suggestion) {
        e.preventDefault();
        setInput(suggestion);
      }
      return;
    }

    if (e.key.length === 1) {
      const now = Date.now();
      if (now - lastSoundRef.current > 70) {
        lastSoundRef.current = now;
        playTerminalSound();
      }
    }
  };

  const tabs = [
    { id: 'terminal' as const, label: 'TERMINAL' },
    { id: 'problems' as const, label: 'PROBLEMS' },
    { id: 'output' as const, label: 'OUTPUT' },
  ];

  if (!isOpen) return null;

  const getLineClassName = (variant?: TerminalLine['variant']) => {
    if (variant === 'error') return 'text-vsc-red';
    if (variant === 'info') return 'text-vsc-cyan';
    if (variant === 'success') return 'text-vsc-green';
    return 'text-foreground/80';
  };

  return (
    <div
      className="w-full max-w-full h-[40vh] md:h-[220px] shrink-0 flex flex-col overflow-hidden border-t border-border bg-vsc-editor"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 250ms ease, transform 250ms ease',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div
        className="flex items-center justify-between shrink-0 border-b border-border px-1"
        style={{ background: 'hsl(var(--vsc-sidebar-bg))', height: 30 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center h-full">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`h-full px-3 text-[11px] font-medium tracking-wider transition-colors ${activeTab === tab.id
                ? 'bg-vsc-editor text-foreground border-t border-t-primary'
                : 'text-muted-foreground hover:bg-white/5 border-t border-t-transparent'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors mr-1"
          title="Close Panel"
        >
          <X size={13} strokeWidth={1.5} />
        </button>
      </div>

      {activeTab === 'terminal' && (
        <div
          className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden px-2 sm:px-3.5 pt-2 pb-1 font-mono text-[11px] sm:text-xs leading-[1.8] break-words"
          style={{ background: 'hsl(var(--vsc-editor-bg))' }}
        >
          {lines.map((line, i) => (
            <div key={i}>
              {line.type === 'welcome' && (
                <div className="text-vsc-cyan mb-1">{line.content}</div>
              )}
              {line.type === 'prompt' && (
                <>
                  <div className="flex items-start gap-0">
                    <PromptPrefix />
                    <span className="text-foreground">{line.command}</span>
                  </div>
                  {line.content && (
                    <div className={`whitespace-pre-wrap break-words pl-0 ${getLineClassName(line.variant)}`}>
                      {line.content}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex items-center gap-0 mt-0.5">
            <PromptPrefix />
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              className="min-w-0 flex-1 bg-transparent text-foreground outline-none border-none font-mono text-xs caret-foreground"
              autoComplete="off"
              spellCheck={false}
            />
            <span aria-hidden="true" className="ml-0.5 h-4 w-1.5 bg-foreground/80 animate-pulse" />
          </form>
          {input && (
            <div className="text-[11px] text-muted-foreground/70">
              Tab autocomplete: {COMMAND_SUGGESTIONS.find(command => command.startsWith(input.toLowerCase())) ?? 'no suggestion'}
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      {activeTab === 'problems' && (
        <div
          className="flex-1 flex items-center justify-center text-muted-foreground text-xs"
          style={{ background: 'hsl(var(--vsc-editor-bg))' }}
        >
          No problems have been detected in the workspace.
        </div>
      )}

      {activeTab === 'output' && (
        <div
          className="flex-1 flex items-center justify-center text-muted-foreground text-xs"
          style={{ background: 'hsl(var(--vsc-editor-bg))' }}
        >
          No output yet.
        </div>
      )}
    </div>
  );
};

export default TerminalPanel;
