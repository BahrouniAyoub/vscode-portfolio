import { useState, useEffect, useCallback } from 'react';
import { Check, Volume2, VolumeX } from 'lucide-react';
import { useClickSound } from '@/hooks/use-click-sound';

interface SettingsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCommandPalette: () => void;
  onToggleTerminal: () => void;
  onToggleCopilot: () => void;
  onDownloadResume: () => void;
  onToggleFullscreen: () => void;
}

const themes = [
  { id: 'ayoub-dark', name: 'Ayoub Dark', emoji: '💜', color: '138,43,226' },
  { id: 'rose-pine', name: 'Rosé Pine', emoji: '🌸', color: '235,111,146' },
  { id: 'tokyo-night', name: 'Tokyo Night', emoji: '🌃', color: '122,162,247' },
  { id: 'catppuccin', name: 'Catppuccin', emoji: '🐱', color: '203,166,247' },
  { id: 'nord', name: 'Nord', emoji: '🧊', color: '136,192,208' },
  { id: 'gruvbox', name: 'Gruvbox', emoji: '🔥', color: '251,73,52' },
];

const quickActions = [
  { emoji: '🔍', label: 'Command Palette', shortcut: 'Ctrl+P' },
  { emoji: '📟', label: 'Toggle Terminal', shortcut: 'Ctrl+J' },
  { emoji: '✨', label: 'Copilot Chat', shortcut: '' },
  { emoji: '📄', label: 'Download Resume', shortcut: '' },
  { emoji: '🖥️', label: 'Toggle Fullscreen', shortcut: 'F11' },
];

const shortcuts = [
  { keys: 'Ctrl P', desc: 'Go to file (command palette)' },
  { keys: 'Ctrl J', desc: 'Toggle terminal' },
  { keys: 'Ctrl B', desc: 'Toggle sidebar' },
  { keys: 'Esc', desc: 'Close overlay' },
  { keys: '↑ / ↓', desc: 'Terminal history' },
];

const SettingsOverlay = ({
  isOpen,
  onClose,
  onOpenCommandPalette,
  onToggleTerminal,
  onToggleCopilot,
  onDownloadResume,
  onToggleFullscreen,
}: SettingsOverlayProps) => {
  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('theme') || 'ayoub-dark';
  });
  const [visible, setVisible] = useState(false);
  const { enabled, toggleSound } = useClickSound();

  useEffect(() => {
    document.documentElement.dataset.theme = activeTheme;
    localStorage.setItem('theme', activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, handleEsc]);

  if (!isOpen) return null;

  const quickActionHandlers: Record<string, () => void> = {
    'Command Palette': onOpenCommandPalette,
    'Toggle Terminal': onToggleTerminal,
    'Copilot Chat': onToggleCopilot,
    'Download Resume': onDownloadResume,
    'Toggle Fullscreen': onToggleFullscreen,
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/50"
      onClick={onClose}
    >
      <div
        className="fixed z-[10000] w-[calc(100vw-24px)] max-w-72 overflow-y-auto rounded bg-vsc-sidebar border border-border shadow-[0_8px_32px_rgba(0,0,0,0.65)]"
        style={{
          top: 30,
          left: 'min(50px, 12px)',
          right: 12,
          maxHeight: 'calc(100vh - 40px)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 px-3 py-2 uppercase font-bold text-[10px] tracking-widest text-foreground border-b border-border bg-vsc-sidebar"
        >
          Settings
        </div>

        {/* Color Theme */}
        <Section label="🎨 Color Theme">
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => setActiveTheme(t.id)}
              className="w-full flex items-center gap-3 px-3 py-2 text-left text-[12px] cursor-pointer transition-colors"
              style={{
                background: activeTheme === t.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: activeTheme === t.id ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                borderLeft: `2px solid ${activeTheme === t.id ? 'hsl(var(--primary))' : 'transparent'}`,
              }}
            >
              <div
                className="w-4 h-4 rounded-full shrink-0"
                style={{
                  background: `rgb(${t.color})`,
                  boxShadow: `0 0 6px rgba(${t.color},0.5)`,
                  border: `1px solid rgba(${t.color},0.6)`,
                }}
              />
              <span className="min-w-0 truncate">{t.emoji} {t.name}</span>
              {activeTheme === t.id && (
                <Check size={12} className="ml-auto text-foreground" strokeWidth={2} />
              )}
            </button>
          ))}
        </Section>

        <Divider />

        {/* UI Sounds */}
        <Section label="🔊 UI Sounds">
          <button
            onClick={() => toggleSound(!enabled)}
            className="w-full flex items-center justify-between px-3 py-2 text-[12px] text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              {enabled ? 'Sounds ON' : 'Sounds OFF'}
            </span>
            <div
              className="w-8 h-4 rounded-full relative transition-colors"
              style={{
                background: enabled ? 'rgb(34, 197, 94)' : 'rgba(255,255,255,0.2)',
              }}
            >
              <div
                className="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform"
                style={{
                  left: enabled ? '18px' : '2px',
                }}
              />
            </div>
          </button>
        </Section>

        <Divider />

        {/* Quick Actions */}
        <Section label="⚡ Quick Actions">
          {quickActions.map((a) => (
            <button
              key={a.label}
              onClick={() => {
                quickActionHandlers[a.label]?.();
                onClose();
              }}
              className="w-full flex items-center px-3 py-2 text-[12px] text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors cursor-pointer text-left focus:outline-none focus:bg-white/[0.06] focus:text-foreground"
            >
              <span className="mr-3">{a.emoji}</span>
              <span className="min-w-0 truncate">{a.label}</span>
              {a.shortcut && (
                <span className="ml-auto shrink-0 text-[10px] text-muted-foreground/60">{a.shortcut}</span>
              )}
            </button>
          ))}
        </Section>

        <Divider />

        {/* Keyboard Shortcuts */}
        <Section label="⌨️ Keyboard Shortcuts">
          <div className="px-3 space-y-2 pb-1">
            {shortcuts.map((s) => (
              <div key={s.keys} className="flex items-center gap-3">
                <kbd
                  className="px-1.5 py-0.5 rounded border text-[10px]"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    borderColor: 'hsl(220 13% 30%)',
                    color: 'hsl(50 100% 70%)',
                  }}
                >
                  {s.keys}
                </kbd>
                <span className="text-[11px] text-muted-foreground">{s.desc}</span>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* Footer */}
        <div className="px-3 py-2.5 text-[11px] text-muted-foreground space-y-1">
          <p>Portfolio v3.0 · React + Vite + Tailwind</p>
          <p>
            Made by{' '}
            <a
              href="https://github.com/BahrouniAyoub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:opacity-70 transition-opacity"
            >
              Ayoub Bahrouni
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="py-1.5">
    <p className="px-3 py-1 uppercase text-[10px] tracking-widest text-muted-foreground">{label}</p>
    {children}
  </div>
);

const Divider = () => (
  <div className="mx-3 my-1 border-t border-border" />
);

export default SettingsOverlay;
