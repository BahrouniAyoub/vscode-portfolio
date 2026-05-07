import { FileId, sidebarFiles } from '@/data/portfolio';
import { ChevronDown, Sparkles, GitBranch } from 'lucide-react';
import { FileIcon } from './FileIcon';

interface SidebarExplorerProps {
  isOpen: boolean;
  activeFile: FileId;
  onFileSelect: (id: FileId) => void;
  onOpenCopilot: () => void;
  copilotOpen: boolean;
}

const SidebarExplorer = ({ isOpen, activeFile, onFileSelect, onOpenCopilot, copilotOpen }: SidebarExplorerProps) => {
  if (!isOpen) return null;

  const portfolioFiles = sidebarFiles.filter((file) => file.path[0] === 'src');
  const rootFiles = sidebarFiles.filter((file) => file.path[0] !== 'src');

  return (
    <div className="fixed left-10 top-8 bottom-5 z-40 w-[min(280px,calc(100vw-40px))] bg-vsc-sidebar border-r border-border flex flex-col shrink-0 overflow-hidden shadow-2xl md:static md:inset-auto md:z-auto md:w-52 md:shadow-none">
      <div className="px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
        Portfolio
      </div>

      <div className="flex-1 overflow-y-auto py-1">
        <div className="flex items-center gap-1 px-3 py-1 text-[12px] font-code text-muted-foreground">
          <ChevronDown size={13} strokeWidth={1.5} />
          <span>src</span>
        </div>
        <div className="flex items-center gap-1 px-6 py-1 text-[12px] font-code text-muted-foreground">
          <ChevronDown size={13} strokeWidth={1.5} />
          <span>portfolio</span>
        </div>
        {portfolioFiles.map((file) => (
          <button
            key={file.id}
            onClick={() => onFileSelect(file.id)}
            className={`w-full flex items-center gap-2 pl-10 pr-4 py-1 text-[13px] font-code transition-colors text-left ${activeFile === file.id
                ? 'bg-secondary/60 text-foreground'
                : 'text-muted-foreground hover:bg-secondary/30 hover:text-foreground'
              }`}
          >
            <FileIcon name={file.lucideIcon} className={`${file.iconColor} w-4 h-4 shrink-0`} />
            <span className="truncate">{file.name}</span>
          </button>
        ))}
        <div className="mt-2 border-t border-border/60 pt-1">
          {rootFiles.map((file) => (
            <button
              key={file.id}
              onClick={() => onFileSelect(file.id)}
              className={`w-full flex items-center gap-2 px-4 py-1 text-[13px] font-code transition-colors text-left ${activeFile === file.id
                  ? 'bg-secondary/60 text-foreground'
                  : 'text-muted-foreground hover:bg-secondary/30 hover:text-foreground'
                }`}
            >
              <FileIcon name={file.lucideIcon} className={`${file.iconColor} w-4 h-4 shrink-0`} />
              <span className="truncate">{file.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Copilot button */}
      <div className="border-t border-border p-2">
        <div
          onClick={onOpenCopilot}
          className={`flex items-center gap-2 px-2 py-1.5 text-xs cursor-pointer border-l-2 transition-colors ${copilotOpen
            ? 'bg-primary/15 border-primary text-primary'
            : 'bg-secondary/20 border-transparent text-muted-foreground hover:bg-secondary/40 hover:text-foreground hover:border-primary/60'
            }`}
        >
          <Sparkles size={14} strokeWidth={1.5} />
          <span>Ayoub's Copilot</span>
          <span className={`ml-auto text-[10px] px-1 py-0.5 rounded ${copilotOpen ? 'bg-primary/20 text-primary' : 'bg-secondary/30 text-muted-foreground'}`}>AI</span>
        </div>
      </div>

      {/* Git info */}
      <div className="border-t border-border px-4 py-1.5 text-[11px] text-muted-foreground flex items-center gap-2">
        <GitBranch size={12} strokeWidth={1.5} />
        <span>main</span>
        <span className="ml-auto">↑1</span>
      </div>
    </div>
  );
};

export default SidebarExplorer;
