import { FileId } from '@/data/portfolio';
import { FolderOpen, Search, GitBranch, Puzzle, Radio, Settings, Sparkles } from 'lucide-react';

interface ActivityBarProps {
  onToggleSidebar: () => void;
  onToggleExtensions?: () => void;
  onToggleSettings: () => void;
  onOpenCommandPalette?: () => void;
  onToggleCopilot?: () => void;
  activeFile: FileId;
  onFileSelect: (id: FileId) => void;
  chatOpen?: boolean;
  extensionsOpen?: boolean;
}

const ActivityBar = ({
  onToggleSidebar,
  onToggleExtensions,
  onToggleSettings,
  onOpenCommandPalette,
  onToggleCopilot,
  activeFile,
  onFileSelect,
  chatOpen,
  extensionsOpen,
}: ActivityBarProps) => {
  const icons = [
    { icon: FolderOpen, label: 'Explorer', action: onToggleSidebar },
    { icon: Search, label: 'Search', action: onOpenCommandPalette },
    { icon: GitBranch, label: 'Source Control' },
    { icon: Puzzle, label: 'Extensions', action: onToggleExtensions },
    { icon: Radio, label: 'Remote' },
  ];

  return (
    <div className="hidden md:flex flex-col items-center w-12 bg-vsc-activitybar py-2 gap-1 shrink-0">
      {icons.map((item, i) => {
        const isExtensions = item.label === 'Extensions';
        const active = isExtensions && extensionsOpen;
        return (
          <button
            key={i}
            onClick={item.action}
            title={item.label}
            className={`w-10 h-10 flex items-center justify-center transition-colors rounded-sm hover:bg-secondary/30 ${active ? 'text-foreground border-l-2 border-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <item.icon size={20} strokeWidth={1.5} />
          </button>
        );
      })}
      <div className="flex-1" />
      <button
        onClick={() => onFileSelect('about')}
        title="Ayoub profile"
        className={`w-10 h-10 flex items-center justify-center transition-colors rounded-sm hover:bg-white/[0.06] ${activeFile === 'about' ? 'border-l-2 border-foreground bg-white/[0.04]' : ''}`}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center ring-1 ring-white/15 hover:ring-white/30 transition-all">
          <img
            src="/ayoub-cuted.PNG"
            alt="Ayoub profile"
            className="w-7 h-7 rounded-full object-cover"
          />
        </div>
      </button>
      <button
        onClick={onToggleCopilot}
        title="Ayoub's Copilot"
        className={`w-10 h-10 flex items-center justify-center transition-colors rounded-sm hover:bg-secondary/30 ${chatOpen ? 'text-foreground border-l-2 border-foreground' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Sparkles size={20} strokeWidth={1.5} />
      </button>
      <button
        onClick={onToggleSettings}
        title="Settings"
        className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-sm hover:bg-secondary/30"
      >
        <Settings size={20} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default ActivityBar;
