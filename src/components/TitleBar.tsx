import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { downloadResume as downloadResumeFile } from '@/lib/resume';

interface TitleBarProps {
  onOpenCommandPalette?: () => void;
  onToggleTerminal?: () => void;
  onStartTerminal?: () => void;
  onToggleSidebar?: () => void;
  onOpenCopilot?: () => void;
  copilotOpen?: boolean;
  terminalOpen?: boolean;
  isFullscreen?: boolean;
  onMinimize?: () => void;
  onToggleFullscreen?: () => void;
  onCloseWindow?: () => void;
  onCloseCurrentTab?: () => void;
  onCloseAllTabs?: () => void;
  onOpenFile?: (id: string) => void;
  onDownloadResume?: () => void;
}

const recentFiles = [
  { name: 'index.ts', id: 'home' },
  { name: 'about.ts', id: 'about' },
  { name: 'projects.json', id: 'projects' },
  { name: 'skills.ts', id: 'skills' },
];

type MenuId = 'file' | 'edit' | 'view' | 'go' | 'run' | 'help' | null;

const TitleBar = ({
  onOpenCommandPalette,
  onToggleTerminal,
  onStartTerminal,
  onToggleSidebar,
  onOpenCopilot,
  copilotOpen,
  terminalOpen,
  isFullscreen,
  onMinimize,
  onToggleFullscreen,
  onCloseWindow,
  onCloseCurrentTab,
  onCloseAllTabs,
  onOpenFile,
  onDownloadResume,
}: TitleBarProps) => {
  const [openMenu, setOpenMenu] = useState<MenuId>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Refs for each menu button + dropdown
  const fileButtonRef = useRef<HTMLButtonElement>(null);
  const fileMenuRef = useRef<HTMLDivElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const editMenuRef = useRef<HTMLDivElement>(null);
  const viewButtonRef = useRef<HTMLButtonElement>(null);
  const viewMenuRef = useRef<HTMLDivElement>(null);
  const goButtonRef = useRef<HTMLButtonElement>(null);
  const goMenuRef = useRef<HTMLDivElement>(null);
  const runButtonRef = useRef<HTMLButtonElement>(null);
  const runMenuRef = useRef<HTMLDivElement>(null);
  const helpButtonRef = useRef<HTMLButtonElement>(null);
  const helpMenuRef = useRef<HTMLDivElement>(null);

  const closeMenus = useCallback(() => setOpenMenu(null), []);
  const toggleMenu = (id: MenuId) => setOpenMenu(prev => (prev === id ? null : id));
  const handleDownloadResume = useCallback(() => {
    (onDownloadResume ?? downloadResumeFile)();
    closeMenus();
  }, [closeMenus, onDownloadResume]);

  // ESC closes all
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenus();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [closeMenus]);

  useEffect(() => {
    const handler = () => closeMenus();
    window.addEventListener('app:close-menus', handler as EventListener);
    return () => window.removeEventListener('app:close-menus', handler as EventListener);
  }, [closeMenus]);

  // Click outside closes all
  useEffect(() => {
    if (!openMenu) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideFile =
        fileButtonRef.current?.contains(target) ||
        fileMenuRef.current?.contains(target);
      const insideEdit =
        editButtonRef.current?.contains(target) ||
        editMenuRef.current?.contains(target);
      const insideView =
        viewButtonRef.current?.contains(target) ||
        viewMenuRef.current?.contains(target);
      const insideGo =
        goButtonRef.current?.contains(target) ||
        goMenuRef.current?.contains(target);
      const insideRun =
        runButtonRef.current?.contains(target) ||
        runMenuRef.current?.contains(target);
      const insideHelp =
        helpButtonRef.current?.contains(target) ||
        helpMenuRef.current?.contains(target);
      if (!insideFile && !insideEdit && !insideView && !insideGo && !insideRun && !insideHelp) closeMenus();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [openMenu, closeMenus]);

  // ── Shared sub-components ──────────────────────────────────
  const Divider = () => <div className="border-t my-0.5" style={{ borderColor: 'var(--border)' }} />;

  const MenuItem = ({
    label,
    shortcut,
    onClick,
    disabled = false,
    indent = false,
  }: {
    label: string;
    shortcut?: string;
    onClick?: () => void;
    disabled?: boolean;
    indent?: boolean;
  }) => (
    <button
      onClick={() => { onClick?.(); closeMenus(); }}
      disabled={disabled}
      className={`w-full flex items-center gap-2 py-[5px] text-[12px] text-left border-none outline-none transition-colors ${disabled ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer hover:bg-white/5'
        } ${indent ? 'pl-8 pr-4' : 'px-4'}`}
      style={{ color: 'var(--text)' }}
    >
      <span className="flex-1">{label}</span>
      {shortcut && (
        <span className="text-[10px] ml-4 shrink-0" style={{ color: 'var(--dim)' }}>{shortcut}</span>
      )}
    </button>
  );

  const SectionLabel = ({ label }: { label: string }) => (
    <p className="px-4 pt-1.5 pb-0.5 text-[10px] uppercase tracking-widest" style={{ color: 'var(--dim)' }}>
      {label}
    </p>
  );

  const ShortcutRow = ({ keys, description }: { keys: string; description: string }) => (
    <div className="flex items-center gap-3 px-4 py-1">
      <kbd
        className="text-[10px] px-1.5 py-0.5 rounded border shrink-0"
        style={{
          background: 'rgba(255,255,255,0.06)',
          borderColor: 'var(--border)',
          color: 'var(--yel)',
        }}
      >
        {keys}
      </kbd>
      <span className="text-[11px]" style={{ color: 'var(--dim)' }}>{description}</span>
    </div>
  );

  const dropdownBase: React.CSSProperties = {
    width: 'min(240px, calc(100vw - 16px))',
    background: 'var(--bg3)',
    border: '1px solid var(--border-menu)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.65)',
    animation: 'fadeInMenu 180ms ease',
  };

  const getMenuPosition = (buttonRef: React.RefObject<HTMLButtonElement>, fallbackLeft: number) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    const width = Math.min(240, window.innerWidth - 16);
    if (!rect) return { top: 53, left: Math.min(fallbackLeft, window.innerWidth - width - 8) };
    return { top: Math.round(rect.bottom + 2), left: Math.max(8, Math.min(Math.round(rect.left), window.innerWidth - width - 8)) };
  };

  const setUiZoom = (nextZoom: number) => {
    const clamped = Math.max(0.8, Math.min(1.4, nextZoom));
    setZoomLevel(clamped);
    document.documentElement.style.setProperty('--ui-zoom', String(clamped));
    document.body.style.zoom = String(clamped);
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // no-op: some browsers can deny fullscreen in embedded contexts
    }
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="flex items-center h-8 bg-vsc-titlebar text-muted-foreground text-xs select-none shrink-0 relative min-w-0">
      {/* VSCode Icon */}
      <div className="flex items-center px-2 sm:px-3 shrink-0">
        <img src="/vscode.svg" alt="VSCode" className="w-4 h-4 opacity-80" />
      </div>

      {/* Menu bar */}
      <div className="hidden md:flex items-center gap-0 relative">

        {/* ── FILE ── */}
        <button
          ref={fileButtonRef}
          onClick={() => toggleMenu('file')}
          className={`px-2 py-1 rounded-sm transition-colors ${openMenu === 'file' ? 'bg-secondary/60 text-foreground' : 'hover:bg-secondary/50'
            }`}
        >
          File
        </button>

        {openMenu === 'file' && (
          <div
            ref={fileMenuRef}
            className="fixed z-[9999] rounded-sm py-0.5 overflow-hidden"
            style={{ top: 32, left: 8, ...dropdownBase }}
          >
            <MenuItem label="New Tab" shortcut="Ctrl+T" onClick={() => onOpenCommandPalette?.()} />
            <MenuItem label="Open File…" shortcut="Ctrl+P" onClick={() => onOpenCommandPalette?.()} />
            <Divider />
            <MenuItem label="Close Tab" shortcut="Ctrl+W" onClick={() => onCloseCurrentTab?.()} />
            <MenuItem label="Close All Tabs" onClick={() => onCloseAllTabs?.()} />
            <Divider />
            <SectionLabel label="Open Recent" />
            {recentFiles.map((f) => (
              <MenuItem key={f.id} label={f.name} indent onClick={() => onOpenFile?.(f.id)} />
            ))}
            <Divider />
            <MenuItem
              label="Download Resume"
              onClick={handleDownloadResume}
            />
          </div>
        )}

        {/* ── EDIT ── */}
        <button
          ref={editButtonRef}
          onClick={() => toggleMenu('edit')}
          className={`px-2 py-1 rounded-sm transition-colors ${openMenu === 'edit' ? 'bg-secondary/60 text-foreground' : 'hover:bg-secondary/50'
            }`}
        >
          Edit
        </button>

        {openMenu === 'edit' && (
          <div
            ref={editMenuRef}
            className="fixed z-[9999] rounded-sm py-0.5 overflow-hidden"
            style={{ top: 32, left: 52, ...dropdownBase }}
          >
            <MenuItem label="Find…" shortcut="Ctrl+P" onClick={() => onOpenCommandPalette?.()} />
            <Divider />
            <MenuItem label="Select All" shortcut="Ctrl+A" onClick={() => document.execCommand('selectAll')} />
            <MenuItem label="Copy" shortcut="Ctrl+C" onClick={() => document.execCommand('copy')} />
          </div>
        )}

        {/* ── VIEW ── */}
        <button
          ref={viewButtonRef}
          onClick={() => toggleMenu('view')}
          className={`px-2 py-1 rounded-sm transition-colors ${openMenu === 'view' ? 'bg-secondary/60 text-foreground' : 'hover:bg-secondary/50'
            }`}
        >
          View
        </button>

        {openMenu === 'view' && (
          <div
            ref={viewMenuRef}
            className="fixed z-[9999] rounded-sm py-0.5 overflow-hidden"
            style={{ ...getMenuPosition(viewButtonRef, 95), ...dropdownBase }}
          >
            <MenuItem label="Command Palette" shortcut="Ctrl+P" onClick={() => onOpenCommandPalette?.()} />
            <Divider />
            <MenuItem label="Toggle Sidebar" shortcut="Ctrl+B" onClick={() => onToggleSidebar?.()} />
            <MenuItem label="Toggle Terminal" shortcut="Ctrl+J" onClick={() => onToggleTerminal?.()} />
            <button
              onClick={() => { onOpenCopilot?.(); closeMenus(); }}
              className="w-full flex items-center gap-2 px-4 py-[5px] text-[12px] text-left cursor-pointer border-none outline-none bg-transparent transition-colors hover:bg-white/5"
              style={{ color: 'rgb(180, 142, 255)' }}
            >
              <span className="flex-1">✨ Ayoub's Copilot</span>
              <span className="text-[10px] ml-4 shrink-0" style={{ color: 'var(--dim)' }}>Ctrl+Shift+C</span>
            </button>
            <Divider />
            <MenuItem label="Enter Full Screen" shortcut="F11" onClick={toggleFullscreen} />
            <MenuItem label="Zoom In" shortcut="Ctrl++" onClick={() => setUiZoom(zoomLevel + 0.1)} />
            <MenuItem label="Zoom Out" shortcut="Ctrl+-" onClick={() => setUiZoom(zoomLevel - 0.1)} />
            <MenuItem label="Reset Zoom" onClick={() => setUiZoom(1)} />
          </div>
        )}

        {/* ── GO ── */}
        <button
          ref={goButtonRef}
          onClick={() => toggleMenu('go')}
          className={`px-2 py-1 rounded-sm transition-colors ${openMenu === 'go' ? 'bg-secondary/60 text-foreground' : 'hover:bg-secondary/50'
            }`}
        >
          Go
        </button>

        {openMenu === 'go' && (
          <div
            ref={goMenuRef}
            className="fixed z-[9999] rounded-sm py-0.5 overflow-hidden"
            style={{ ...getMenuPosition(goButtonRef, 141), ...dropdownBase }}
          >
            <MenuItem label="Go to File…" shortcut="Ctrl+P" onClick={() => onOpenCommandPalette?.()} />
            <Divider />
            <SectionLabel label="Files" />
            <MenuItem label="index.ts" indent onClick={() => onOpenFile?.('home')} />
            <MenuItem label="about.ts" indent onClick={() => onOpenFile?.('about')} />
            <MenuItem label="projects.json" indent onClick={() => onOpenFile?.('projects')} />
            <MenuItem label="skills.ts" indent onClick={() => onOpenFile?.('skills')} />
            <MenuItem label="experience.ts" indent onClick={() => onOpenFile?.('experience')} />
            <MenuItem label="contact.ts" indent onClick={() => onOpenFile?.('contact')} />
            <MenuItem label="README.md" indent onClick={() => onOpenFile?.('readme')} />
            <MenuItem
              label="Ayoub resume.pdf"
              indent
              onClick={handleDownloadResume}
            />
          </div>
        )}

        {/* ── RUN ── */}
        <button
          ref={runButtonRef}
          onClick={() => toggleMenu('run')}
          className={`px-2 py-1 rounded-sm transition-colors ${openMenu === 'run' ? 'bg-secondary/60 text-foreground' : 'hover:bg-secondary/50'
            }`}
        >
          Run
        </button>

        {openMenu === 'run' && (
          <div
            ref={runMenuRef}
            className="fixed z-[9999] rounded-sm py-0.5 overflow-hidden"
            style={{ ...getMenuPosition(runButtonRef, 170), ...dropdownBase }}
          >
            <MenuItem label="Start Terminal" shortcut="Ctrl+J" onClick={() => onStartTerminal?.()} />
            <MenuItem label="Run Last Command" disabled />
          </div>
        )}

        {/* ── HELP ── */}
        <button
          ref={helpButtonRef}
          onClick={() => toggleMenu('help')}
          className={`px-2 py-1 rounded-sm transition-colors ${openMenu === 'help' ? 'bg-secondary/60 text-foreground' : 'hover:bg-secondary/50'
            }`}
        >
          Help
        </button>

        {openMenu === 'help' && (
          <div
            ref={helpMenuRef}
            className="fixed z-[9999] rounded-sm py-0.5 overflow-hidden"
            style={{ ...getMenuPosition(helpButtonRef, 281), ...dropdownBase }}
          >
            <MenuItem label="Command Palette" shortcut="Ctrl+P" onClick={() => onOpenCommandPalette?.()} />
            <Divider />
            <SectionLabel label="Keyboard Shortcuts" />
            <ShortcutRow keys="Ctrl+P" description="Go to file" />
            <ShortcutRow keys="Ctrl+B" description="Toggle sidebar" />
            <ShortcutRow keys="Ctrl+J" description="Toggle terminal" />
            <ShortcutRow keys="Ctrl+Shift+C" description="Toggle Copilot ✨" />
            <ShortcutRow keys="Esc" description="Close overlay" />
            <Divider />
            <MenuItem
              label="GitHub ↗"
              onClick={() => window.open('https://github.com/BahrouniAyoub', '_blank', 'noopener,noreferrer')}
            />
            <MenuItem label="About" onClick={() => onOpenFile?.('about')} />
          </div>
        )}

        <button
          onClick={onOpenCopilot}
          className={`px-2 py-1 rounded-sm transition-colors ${copilotOpen ? 'bg-secondary/60 text-foreground' : 'hover:bg-secondary/50'
            }`}
        >
          Copilot
        </button>

        {/* Terminal — special trigger */}
        <button
          onClick={onToggleTerminal}
          className={`px-2 py-1 rounded-sm transition-colors ${terminalOpen ? 'bg-secondary/60 text-foreground' : 'hover:bg-secondary/50'
            }`}
        >
          Terminal
        </button>
      </div>

      {/* Center search */}
      <div className="flex-1 min-w-0 flex justify-center px-1">
        <button
          onClick={onOpenCommandPalette}
          className="flex min-w-0 max-w-full items-center justify-center gap-1.5 px-2 sm:px-3 py-1 rounded hover:bg-secondary/20 transition-colors cursor-pointer"
        >
          <Search size={12} strokeWidth={1.5} className="text-muted-foreground/70" />
          <span className="text-muted-foreground/70 truncate">
            ayoub-bahrouni : portfolio
            <span className="hidden sm:inline ml-2 px-1.5 py-0.5 bg-secondary rounded text-[10px]">Ctrl</span>
            <span className="hidden sm:inline ml-1 px-1.5 py-0.5 bg-secondary rounded text-[10px]">P</span>
          </span>
        </button>
      </div>

      {/* Window controls */}
      <div className="hidden md:flex items-center gap-2 px-3">
        <button
          onClick={onMinimize}
          className="cursor-pointer rounded-sm p-1 hover:bg-secondary/50 hover:text-foreground focus:outline-none focus:ring-1 focus:ring-primary/60"
          title="Minimize"
          aria-label="Minimize portfolio window"
        >
          <Minus size={14} strokeWidth={1.5} />
        </button>
        <button
          onClick={onToggleFullscreen}
          className="cursor-pointer rounded-sm p-1 hover:bg-secondary/50 hover:text-foreground focus:outline-none focus:ring-1 focus:ring-primary/60"
          title="Toggle Fullscreen"
          aria-label="Toggle fullscreen"
        >
          {isFullscreen ? <Minimize2 size={12} strokeWidth={1.5} /> : <Maximize2 size={12} strokeWidth={1.5} />}
        </button>
        <button
          onClick={onCloseWindow}
          className="cursor-pointer rounded-sm p-1 hover:bg-vsc-red/20 hover:text-vsc-red focus:outline-none focus:ring-1 focus:ring-vsc-red/60"
          title="Close"
          aria-label="Close portfolio window"
        >
          <X size={14} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
