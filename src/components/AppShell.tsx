import { useState, useCallback, useEffect, useRef } from 'react';
import { TabId, FileId, ExtensionId } from '@/data/portfolio';
import { downloadResume } from '@/lib/resume';
import TitleBar from './TitleBar';
import ActivityBar from './ActivityBar';
import SidebarExplorer from './SidebarExplorer';
import EditorTabs from './EditorTabs';
import EditorContent from './EditorContent';
import StatusBar from './StatusBar';
import Chatbot from './Chatbot';
import DinoGame from './DinoGame';
import SettingsOverlay from './SettingsOverlay';
import CommandPalette from './CommandPalette';
import TerminalPanel from './TerminalPanel';
import ExtensionsPanel from './ExtensionsPanel';
import SourceControlPanel from './source-control/SourceControlPanel';

const AppShell = () => {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [openTabs, setOpenTabs] = useState<TabId[]>(['home']);
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [chatOpen, setChatOpen] = useState(false);
  const [dinoOpen, setDinoOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [extensionsOpen, setExtensionsOpen] = useState(false);
  const [sourceControlOpen, setSourceControlOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement));
  const [focusMode, setFocusMode] = useState(false);
  const [aiMode, setAiMode] = useState(false);
  const [resumeToastVisible, setResumeToastVisible] = useState(false);
  const resumeToastTimeoutRef = useRef<number>();

  // Open a tab (file or extension)
  const handleTabSelect = useCallback((id: TabId) => {
    setActiveTab(id);
    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  // Close a tab
  const handleCloseTab = useCallback((id: TabId) => {
    setOpenTabs((prev) => {
      const next = prev.filter((t) => t !== id);
      if (next.length === 0) return ['home'];
      return next;
    });
    setActiveTab((prev) => {
      if (prev === id) {
        const remaining = openTabs.filter((t) => t !== id);
        return remaining.length > 0 ? remaining[remaining.length - 1] : 'home';
      }
      return prev;
    });
  }, [openTabs]);

  // Helper to open file tabs (for compatibility)
  const handleFileSelect = useCallback((id: FileId) => {
    handleTabSelect(id);
  }, [handleTabSelect]);

  // Open extension as a tab
  const openExtension = useCallback((extensionId: ExtensionId) => {
    handleTabSelect(extensionId);
    setExtensionsOpen(false); // Close the extensions panel
  }, [handleTabSelect]);

  const closeAllOverlays = useCallback(() => {
    setCommandPaletteOpen(false);
    setTerminalOpen(false);
    setChatOpen(false);
    setExtensionsOpen(false);
    setSourceControlOpen(false);
    window.dispatchEvent(new CustomEvent('app:close-menus'));
  }, []);

  const openNewTab = useCallback(() => {
    const tabOrder: FileId[] = ['home', 'about', 'projects', 'skills', 'experience', 'contact', 'readme'];
    const next = tabOrder.find((id) => !openTabs.includes(id)) ?? activeTab;
    handleTabSelect(next);
  }, [openTabs, activeTab, handleTabSelect]);

  const handleStartTerminal = useCallback(() => {
    setTerminalOpen(true);
    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent('app:focus-terminal'));
    });
  }, []);

  const showResumeDownloadToast = useCallback(() => {
    setResumeToastVisible(true);
    if (resumeToastTimeoutRef.current) {
      window.clearTimeout(resumeToastTimeoutRef.current);
    }
    resumeToastTimeoutRef.current = window.setTimeout(() => {
      setResumeToastVisible(false);
    }, 2400);
  }, []);

  const handleDownloadResume = useCallback(() => {
    showResumeDownloadToast();
    downloadResume();
  }, [showResumeDownloadToast]);

  useEffect(() => {
    return () => {
      if (resumeToastTimeoutRef.current) {
        window.clearTimeout(resumeToastTimeoutRef.current);
      }
    };
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen can be denied by the browser or embedding context.
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleOpenCommandPalette = useCallback(() => {
    setCommandPaletteOpen(true);
    setTerminalOpen(false);
    setChatOpen(false);
    setExtensionsOpen(false);
    setSourceControlOpen(false);
    window.dispatchEvent(new CustomEvent('app:close-menus'));
  }, []);

  const toggleCopilotPanel = useCallback(() => {
    setChatOpen((prev) => {
      const next = !prev;
      if (next) {
        setCommandPaletteOpen(false);
        setTerminalOpen(false);
        setSettingsOpen(false);
        setDinoOpen(false);
        setExtensionsOpen(false);
        setSourceControlOpen(false);
        window.dispatchEvent(new CustomEvent('app:close-menus'));
      }
      return next;
    });
  }, []);

  const toggleTerminalPanel = useCallback(() => {
    setTerminalOpen((prev) => {
      const next = !prev;
      if (next) {
        setCommandPaletteOpen(false);
        setChatOpen(false);
        setExtensionsOpen(false);
        setSettingsOpen(false);
        setSourceControlOpen(false);
        window.dispatchEvent(new CustomEvent('app:close-menus'));
      }
      return next;
    });
  }, []);

  const toggleExtensionsPanel = useCallback(() => {
    setExtensionsOpen((prev) => {
      const next = !prev;
      if (next) {
        setCommandPaletteOpen(false);
        setSettingsOpen(false);
        setDinoOpen(false);
        setSourceControlOpen(false);
        window.dispatchEvent(new CustomEvent('app:close-menus'));
      }
      return next;
    });
  }, []);

  const toggleSourceControlPanel = useCallback(() => {
    setSourceControlOpen((prev) => {
      const next = !prev;
      if (next) {
        setSidebarOpen(false);
        setExtensionsOpen(false);
        setCommandPaletteOpen(false);
        setSettingsOpen(false);
        setDinoOpen(false);
        window.dispatchEvent(new CustomEvent('app:close-menus'));
      }
      return next;
    });
  }, []);

  const toggleFocusMode = useCallback(() => {
    setFocusMode((prev) => {
      const next = !prev;
      if (next) {
        setSidebarOpen(false);
        setTerminalOpen(false);
        setChatOpen(false);
        setExtensionsOpen(false);
        setSourceControlOpen(false);
        setCommandPaletteOpen(false);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const isTypingTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName.toLowerCase();
      return tag === 'input' || tag === 'textarea' || target.isContentEditable;
    };

    const handler = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;

      const key = e.key.toLowerCase();
      const isMod = e.ctrlKey || e.metaKey;

      if (e.key === 'Escape') {
        closeAllOverlays();
        return;
      }

      if (!isMod) return;

      if (key === 'p') {
        e.preventDefault();
        handleOpenCommandPalette();
        return;
      }

      if (key === 'b') {
        e.preventDefault();
        setSidebarOpen((prev) => !prev);
        return;
      }

      if (key === 'c' && e.shiftKey) {
        e.preventDefault();
        toggleCopilotPanel();
        return;
      }

      if (key === 't') {
        e.preventDefault();
        openNewTab();
        return;
      }

      if (key === 'w') {
        e.preventDefault();
        handleCloseTab(activeTab);
        return;
      }

      if (key === 'j') {
        e.preventDefault();
        toggleTerminalPanel();
        return;
      }

      if (e.key === '`' || e.code === 'Backquote') {
        e.preventDefault();
        toggleTerminalPanel();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeTab, closeAllOverlays, handleCloseTab, handleOpenCommandPalette, openNewTab, toggleCopilotPanel, toggleTerminalPanel]);

  return (
    <div className="h-screen w-screen max-w-full flex flex-col overflow-x-hidden overflow-y-hidden">
      <div className={`${isMinimized || isClosed ? 'hidden' : 'flex'} min-h-0 flex-1 flex-col overflow-hidden`}>
      <TitleBar
        onOpenCommandPalette={handleOpenCommandPalette}
        onToggleTerminal={toggleTerminalPanel}
        onStartTerminal={handleStartTerminal}
        onToggleSidebar={() => setSidebarOpen((p) => !p)}
        onOpenCopilot={toggleCopilotPanel}
        copilotOpen={chatOpen}
        terminalOpen={terminalOpen}
        isFullscreen={isFullscreen}
        onMinimize={() => setIsMinimized(true)}
        onToggleFullscreen={toggleFullscreen}
        onCloseWindow={() => setIsClosed(true)}
        onCloseCurrentTab={() => handleCloseTab(activeTab)}
        onCloseAllTabs={() => {
          setOpenTabs(['home']);
          setActiveTab('home');
        }}
        onOpenFile={(id) => handleFileSelect(id as FileId)}
        onDownloadResume={handleDownloadResume}
      />

      <div className="flex flex-1 min-w-0 overflow-hidden">
        <ActivityBar
          onToggleSidebar={() => {
            setSourceControlOpen(false);
            setExtensionsOpen(false);
            setSidebarOpen((p) => !p);
          }}
          onToggleExtensions={toggleExtensionsPanel}
          onToggleSourceControl={toggleSourceControlPanel}
          onToggleSettings={() => setSettingsOpen((p) => !p)}
          onOpenCommandPalette={handleOpenCommandPalette}
          onToggleCopilot={toggleCopilotPanel}
          activeFile={activeTab as FileId}
          onFileSelect={handleFileSelect}
          chatOpen={chatOpen}
          extensionsOpen={extensionsOpen}
          sourceControlOpen={sourceControlOpen}
        />

        {!focusMode && !extensionsOpen && !sourceControlOpen && sidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 top-8 z-30 bg-black/45 md:hidden"
          />
        )}

        {!focusMode && !extensionsOpen && !sourceControlOpen && (
          <SidebarExplorer
            isOpen={sidebarOpen}
            activeFile={activeTab as FileId}
            onFileSelect={(id) => {
              handleFileSelect(id);
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
            onOpenCopilot={toggleCopilotPanel}
            copilotOpen={chatOpen}
          />
        )}

        {!focusMode && (
          <ExtensionsPanel
            isOpen={extensionsOpen}
            onOpenSettings={() => setSettingsOpen(true)}
            onOpenCommandPalette={handleOpenCommandPalette}
            onOpenCopilot={toggleCopilotPanel}
            onClearCopilot={() => window.dispatchEvent(new CustomEvent('app:copilot-clear-chat'))}
            onToggleFocusMode={toggleFocusMode}
            onToggleAiMode={() => setAiMode((p) => !p)}
            onOpenExtension={openExtension}
            focusMode={focusMode}
            aiMode={aiMode}
          />
        )}

        {!focusMode && (
          <SourceControlPanel
            isOpen={sourceControlOpen}
            onFileSelect={(id) => {
              handleFileSelect(id);
              if (window.innerWidth < 768) setSourceControlOpen(false);
            }}
          />
        )}

        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          <EditorTabs
            activeTab={activeTab}
            openTabs={openTabs}
            onTabSelect={handleTabSelect}
            onCloseTab={handleCloseTab}
          />
          <EditorContent
            activeTab={activeTab}
            onFileSelect={handleFileSelect}
            onOpenSettings={() => setSettingsOpen(true)}
            onOpenCommandPalette={handleOpenCommandPalette}
            onOpenCopilot={toggleCopilotPanel}
            onToggleFocusMode={toggleFocusMode}
            onToggleAiMode={() => setAiMode((p) => !p)}
            aiMode={aiMode}
            focusMode={focusMode}
            onResumeDownloadStart={showResumeDownloadToast}
          />
          <TerminalPanel
            isOpen={!focusMode && terminalOpen}
            onClose={() => setTerminalOpen(false)}
            onFileSelect={(id) => handleFileSelect(id as FileId)}
            onDownloadResume={handleDownloadResume}
          />
        </div>

        {/* VSCode-style Copilot Panel pushes the editor */}
        <Chatbot
          isOpen={!focusMode && chatOpen}
          activeTab={activeTab}
          onClose={() => setChatOpen(false)}
          onFileSelect={handleFileSelect}
          onDownloadResume={handleDownloadResume}
        />
      </div>

      <StatusBar />
      </div>

      {isMinimized && !isClosed && (
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-4 left-1/2 z-[100] -translate-x-1/2 rounded border border-border bg-vsc-sidebar px-4 py-2 text-xs text-foreground shadow-2xl transition-colors hover:border-primary/60 hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/60"
        >
          Ayoub Portfolio minimized — Restore
        </button>
      )}

      {isClosed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-vsc-editor px-4">
          <div className="w-full max-w-sm rounded border border-border bg-vsc-sidebar p-6 text-center shadow-2xl">
            <p className="mb-4 text-sm font-semibold text-foreground">Portfolio window closed</p>
            <button
              type="button"
              onClick={() => {
                setIsClosed(false);
                setIsMinimized(false);
              }}
              className="rounded bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/60"
            >
              Reopen Portfolio
            </button>
          </div>
        </div>
      )}

      {resumeToastVisible && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-14 right-4 z-[120] rounded border border-primary/40 bg-vsc-sidebar px-4 py-2 text-xs text-foreground shadow-2xl animate-in fade-in slide-in-from-bottom-2"
        >
          Downloading Resume...
        </div>
      )}

      {/* Floating buttons */}
     

      <DinoGame isOpen={!isMinimized && !isClosed && dinoOpen} onClose={() => setDinoOpen(false)} />
      <SettingsOverlay
        isOpen={!isMinimized && !isClosed && settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onOpenCommandPalette={handleOpenCommandPalette}
        onToggleTerminal={toggleTerminalPanel}
        onToggleCopilot={toggleCopilotPanel}
        onDownloadResume={handleDownloadResume}
        onToggleFullscreen={toggleFullscreen}
      />
      <CommandPalette
        isOpen={!isMinimized && !isClosed && commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onFileSelect={handleFileSelect}
        onOpenCopilot={toggleCopilotPanel}
      />
    </div>
  );
};

export default AppShell;
