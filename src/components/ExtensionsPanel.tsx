import { useEffect, useMemo, useState } from 'react';
import {
  Palette,
  Type,
  Languages,
  Sparkles,
  Bot,
  BarChart3,
  Gamepad2,
  NotebookPen,
  Search,
  Focus,
  Brain,
  Check,
} from 'lucide-react';
import { ExtensionId } from '@/data/portfolio';

type ExtensionKey =
  | 'theme'
  | 'font'
  | 'language'
  | 'animation'
  | 'copilot'
  | 'stats'
  | 'game'
  | 'notes'
  | 'search'
  | 'focus'
  | 'ai';

interface ExtensionsPanelProps {
  isOpen: boolean;
  onOpenSettings: () => void;
  onOpenCommandPalette: () => void;
  onOpenCopilot: () => void;
  onClearCopilot: () => void;
  onToggleFocusMode: () => void;
  onToggleAiMode: () => void;
  onOpenExtension: (extensionId: ExtensionId) => void;
  focusMode: boolean;
  aiMode: boolean;
}

const ENABLED_KEY = 'portfolio.extensions.enabled';

const DEFAULT_ENABLED: Record<ExtensionKey, boolean> = {
  theme: true,
  font: true,
  language: true,
  animation: true,
  copilot: true,
  stats: true,
  game: true,
  notes: true,
  search: true,
  focus: true,
  ai: true,
};

const ExtensionsPanel = ({
  isOpen,
  onOpenExtension,
  focusMode,
  aiMode,
}: ExtensionsPanelProps) => {
  const [query, setQuery] = useState('');
  const [enabled, setEnabled] = useState<Record<ExtensionKey, boolean>>(DEFAULT_ENABLED);

  useEffect(() => {
    const savedEnabled = localStorage.getItem(ENABLED_KEY);
    if (savedEnabled) setEnabled({ ...DEFAULT_ENABLED, ...JSON.parse(savedEnabled) });
  }, []);

  useEffect(() => {
    localStorage.setItem(ENABLED_KEY, JSON.stringify(enabled));
  }, [enabled]);

  const extensions = useMemo(() => ([
    { key: 'theme' as const, icon: Palette, name: 'Theme Switcher', desc: 'Change the website theme.', action: 'Configure' },
    { key: 'font' as const, icon: Type, name: 'Font Settings', desc: 'Customize typography.', action: 'Configure' },
    { key: 'language' as const, icon: Languages, name: 'Language Switcher', desc: 'Change portfolio language.', action: 'Configure' },
    { key: 'animation' as const, icon: Sparkles, name: 'Animation Control', desc: 'Toggle UI animations.', action: 'Configure' },
    { key: 'copilot' as const, icon: Bot, name: 'Copilot Enhancer', desc: 'Configure the AI assistant.', action: 'Use' },
    { key: 'stats' as const, icon: BarChart3, name: 'Stats Panel', desc: 'Show portfolio/project stats.', action: 'Open' },
    { key: 'game' as const, icon: Gamepad2, name: 'Game Mode', desc: 'Add playful CodeQuest-style effects.', action: 'Use' },
    { key: 'notes' as const, icon: NotebookPen, name: 'Notes / Scratchpad', desc: 'Temporary notes area.', action: 'Open' },
    { key: 'search' as const, icon: Search, name: 'Smart Search Enhancer', desc: 'Improves command palette navigation.', action: 'Use' },
    { key: 'focus' as const, icon: Focus, name: 'Focus Mode', desc: 'Hide distractions for reading.', action: 'Use' },
    { key: 'ai' as const, icon: Brain, name: 'AI Mode', desc: 'Highlight AI-related projects and tools.', action: 'Use' },
  ]), []);

  const filtered = extensions.filter((ext) =>
    `${ext.name} ${ext.desc}`.toLowerCase().includes(query.toLowerCase()),
  );

  const toggleEnabled = (key: ExtensionKey) => {
    setEnabled((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOpenExtension = (key: ExtensionKey) => {
    onOpenExtension(key as ExtensionId);
  };

  if (!isOpen) return null;

  return (
    <div className="w-[300px] bg-vsc-sidebar border-r border-border flex flex-col shrink-0 overflow-hidden">
      <div className="px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
        EXTENSIONS
      </div>
      <div className="px-3 pb-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Extensions"
          className="w-full bg-vsc-editor border border-border rounded-sm px-2 py-1.5 text-[12px] outline-none text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <div className="px-4 pb-1 text-[10px] uppercase tracking-widest text-muted-foreground">INSTALLED</div>
      <div className="flex-1 overflow-y-auto">
        {filtered.map((ext) => {
          const Icon = ext.icon;
          return (
            <div
              key={ext.key}
              onClick={() => handleOpenExtension(ext.key)}
              className="mx-2 mb-1 border rounded-sm px-2 py-2 cursor-pointer transition-colors bg-transparent border-border hover:bg-secondary/20 hover:border-primary/60"
            >
              <div className="flex items-start gap-2">
                <Icon size={15} className="mt-0.5 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-foreground truncate">{ext.name}</div>
                  <div className="text-[11px] text-muted-foreground leading-snug">{ext.desc}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[10px] text-vsc-green inline-flex items-center gap-1">
                      <Check size={10} /> Installed
                    </span>
                    <button
                      className="text-[10px] px-2 py-0.5 border border-border rounded-sm hover:bg-white/5 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenExtension(ext.key);
                      }}
                    >
                      {ext.action}
                    </button>
                    <button
                      className={`text-[10px] px-2 py-0.5 border rounded-sm transition-colors ${enabled[ext.key] ? 'border-primary text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleEnabled(ext.key);
                      }}
                    >
                      {enabled[ext.key] ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="px-3 py-2 text-[10px] text-muted-foreground border-t border-border bg-vsc-editor/50">
        <p>💡 Click any extension to open it in the editor as a tab.</p>
      </div>
    </div>
  );
};

export default ExtensionsPanel;

