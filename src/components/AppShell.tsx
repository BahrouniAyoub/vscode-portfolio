import { useState, useCallback, useEffect } from 'react';
import { TabId, FileId, ExtensionId } from '@/data/portfolio';
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
import { Gamepad2 } from 'lucide-react';

const AppShell = () => {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [openTabs, setOpenTabs] = useState<TabId[]>(['home']);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [dinoOpen, setDinoOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [extensionsOpen, setExtensionsOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [aiMode, setAiMode] = useState(false);

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

  const handleDownloadResume = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/Ayoub resume.pdf';
    link.download = 'Ayoub_Bahrouni_Resume.pdf';
    link.click();
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
        setCommandPaletteOpen(true);
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
        setTerminalOpen((prev) => !prev);
        return;
      }

      if (e.key === '`' || e.code === 'Backquote') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeTab, closeAllOverlays, handleCloseTab, openNewTab, toggleCopilotPanel]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TitleBar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onToggleTerminal={() => setTerminalOpen(p => !p)}
        onStartTerminal={handleStartTerminal}
        onToggleSidebar={() => setSidebarOpen((p) => !p)}
        onOpenCopilot={toggleCopilotPanel}
        copilotOpen={chatOpen}
        terminalOpen={terminalOpen}
        onCloseCurrentTab={() => handleCloseTab(activeTab)}
        onCloseAllTabs={() => {
          setOpenTabs(['home']);
          setActiveTab('home');
        }}
        onOpenFile={(id) => handleFileSelect(id as FileId)}
      />

      <div className="flex flex-1 overflow-hidden">
        <ActivityBar
          onToggleSidebar={() => setSidebarOpen((p) => !p)}
          onToggleExtensions={toggleExtensionsPanel}
          onToggleSettings={() => setSettingsOpen((p) => !p)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onToggleCopilot={toggleCopilotPanel}
          activeFile={activeTab as FileId}
          onFileSelect={handleFileSelect}
          chatOpen={chatOpen}
          extensionsOpen={extensionsOpen}
        />

        {!focusMode && !extensionsOpen && (
          <SidebarExplorer
            isOpen={sidebarOpen}
            activeFile={activeTab as FileId}
            onFileSelect={handleFileSelect}
            onOpenCopilot={toggleCopilotPanel}
            copilotOpen={chatOpen}
          />
        )}

        {!focusMode && (
          <ExtensionsPanel
            isOpen={extensionsOpen}
            onOpenSettings={() => setSettingsOpen(true)}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            onOpenCopilot={toggleCopilotPanel}
            onClearCopilot={() => window.dispatchEvent(new CustomEvent('app:copilot-clear-chat'))}
            onToggleFocusMode={toggleFocusMode}
            onToggleAiMode={() => setAiMode((p) => !p)}
            onOpenExtension={openExtension}
            focusMode={focusMode}
            aiMode={aiMode}
          />
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
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
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            onOpenCopilot={toggleCopilotPanel}
            onToggleFocusMode={toggleFocusMode}
            onToggleAiMode={() => setAiMode((p) => !p)}
            aiMode={aiMode}
            focusMode={focusMode}
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

      {/* Floating buttons */}
      <div className="fixed bottom-8 right-4 flex flex-col gap-2 z-40">
        <button
          onClick={() => setDinoOpen(true)}
          className="w-10 h-10 rounded-full bg-vsc-statusbar text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Play Dino Game"
        >
          <Gamepad2 size={18} strokeWidth={1.5} />
        </button>
      </div>

      <DinoGame isOpen={dinoOpen} onClose={() => setDinoOpen(false)} />
      <SettingsOverlay isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onFileSelect={handleFileSelect}
        onOpenCopilot={() => setChatOpen(true)}
      />
    </div>
  );
};

export default AppShell;
