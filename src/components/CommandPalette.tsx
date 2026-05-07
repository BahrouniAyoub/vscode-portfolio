import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChevronRight, FileCode, FileJson, FileType2, FileText, Sparkles, File, LucideIcon } from 'lucide-react';
import { FileId } from '@/data/portfolio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (id: FileId) => void;
  onOpenCopilot: () => void;
}

type PaletteItem = {
  id: string;
  type: 'command' | 'file';
  title: string;
  icon?: LucideIcon;
  path?: string;
  shortcut?: string;
  fileId?: FileId;
};

const allItems: PaletteItem[] = [
  { id: 'cmd-copilot', type: 'command', title: "Open Ayoub's Copilot", icon: Sparkles, shortcut: 'Ctrl+Shift+C' },
  { id: 'file-home', type: 'file', title: 'index.ts', icon: FileCode, path: 'src/portfolio', fileId: 'home' },
  { id: 'file-about', type: 'file', title: 'about.ts', icon: FileCode, path: 'src/portfolio', fileId: 'about' },
  { id: 'file-projects', type: 'file', title: 'projects.json', icon: FileJson, path: 'src/portfolio', fileId: 'projects' },
  { id: 'file-skills', type: 'file', title: 'skills.ts', icon: FileCode, path: 'src/portfolio', fileId: 'skills' },
  { id: 'file-experience', type: 'file', title: 'experience.ts', icon: FileType2, path: 'src/portfolio', fileId: 'experience' },
  { id: 'file-contact', type: 'file', title: 'contact.ts', icon: FileCode, path: 'src/portfolio', fileId: 'contact' },
  { id: 'file-readme', type: 'file', title: 'README.md', icon: FileText, path: '/', fileId: 'readme' },
  { id: 'file-resume', type: 'file', title: 'Ayoub_Bahrouni_Resume.pdf', icon: File, path: 'public', fileId: 'resume' },
];

const CommandPalette = ({ isOpen, onClose, onFileSelect, onOpenCopilot }: CommandPaletteProps) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const { commands, files, displayItems } = useMemo(() => {
    const filteredItems = allItems.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    const commands = filteredItems.filter(i => i.type === 'command');
    const files = filteredItems.filter(i => i.type === 'file');

    return {
      commands,
      files,
      displayItems: [...commands, ...files],
    };
  }, [query]);

  const executeAction = useCallback((item: PaletteItem) => {
    if (item.type === 'command') {
      onOpenCopilot();
    } else if (item.type === 'file' && item.fileId) {
      onFileSelect(item.fileId);
    }
    onClose();
  }, [onClose, onFileSelect, onOpenCopilot]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < displayItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : displayItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = displayItems[selectedIndex];
        if (selected) {
          executeAction(selected);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, displayItems, selectedIndex, onClose, executeAction]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-center bg-black/55 px-3 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="mt-10 sm:mt-[80px] w-[calc(100vw-24px)] max-w-[540px] h-fit max-h-[85vh] sm:max-h-[80vh] flex flex-col bg-vsc-bg rounded-md shadow-2xl border border-white/15 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center px-3.5 py-2.5 border-b border-white/10 shrink-0">
          <ChevronRight size={16} className="text-vscode-dim mr-2 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Go to file or run command..."
            className="min-w-0 flex-1 bg-transparent border-none outline-none font-mono text-[13px] sm:text-[14px] text-vscode-bright placeholder:text-vscode-dim"
          />
          <div className="hidden sm:block px-2 py-0.5 ml-2 text-[10px] uppercase font-bold tracking-wider text-vscode-dim bg-white/5 rounded border border-white/10">
            Esc
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden max-h-[320px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-2">
          {displayItems.length === 0 ? (
            <div className="py-8 text-center text-vscode-dim text-sm">
              No matching results
            </div>
          ) : (
            <>
              {commands.length > 0 && (
                <div className="mt-2 mb-1">
                  <div className="px-3.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-vscode-dim border-b border-white/5 mx-3.5 mb-1">
                    Commands
                  </div>
                  {commands.map((cmd) => {
                    const isActive = displayItems[selectedIndex]?.id === cmd.id;
                    const Icon = cmd.icon || Sparkles;
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => executeAction(cmd)}
                        className={`w-full flex items-center px-3.5 py-2 text-xs text-left group ${
                          isActive 
                            ? 'bg-primary/20 border-l-2 border-primary text-primary-foreground' 
                            : 'border-l-2 border-transparent text-vscode-bright hover:bg-white/5'
                        }`}
                      >
                        <Icon size={14} className="mr-2 opacity-80" />
                        <span className="min-w-0 flex-1 truncate">{cmd.title}</span>
                        {cmd.shortcut && (
                          <span className="hidden sm:inline text-[10px] text-vscode-dim ml-4 opacity-60 shrink-0">
                            {cmd.shortcut}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {files.length > 0 && (
                <div className="mt-2">
                  <div className="px-3.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-vscode-dim border-b border-white/5 mx-3.5 mb-1">
                    Files
                  </div>
                  {files.map((file) => {
                    const isActive = displayItems[selectedIndex]?.id === file.id;
                    const Icon = file.icon || File;
                    return (
                      <button
                        key={file.id}
                        onClick={() => executeAction(file)}
                        className={`w-full flex items-center px-3.5 py-2 text-xs text-left group ${
                          isActive 
                            ? 'bg-vsc-selection text-white border-l-2 border-vscode-blue' 
                            : 'border-l-2 border-transparent text-vscode-bright hover:bg-white/5'
                        }`}
                      >
                        <Icon size={14} className="mr-2 text-vscode-blue opacity-80" />
                        <span className="min-w-0 flex-1 truncate">{file.title}</span>
                        {file.path && (
                          <span className="hidden sm:inline text-[10px] text-vscode-dim ml-4 opacity-60 shrink-0">
                            {file.path}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-1.5 border-t border-white/10 shrink-0 bg-vsc-sidebar">
          <div className="text-[11px] text-vscode-dim flex flex-wrap items-center gap-3">
            <span><strong className="font-semibold text-vscode-bright">↑↓</strong> navigate</span>
            <span><strong className="font-semibold text-vscode-bright">↵</strong> open</span>
            <span><strong className="font-semibold text-vscode-bright">Esc</strong> close</span>
          </div>
          <div className="hidden sm:block text-[10px] text-vscode-dim italic opacity-70">
            Tip: type "copilot" to open AI chat
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
