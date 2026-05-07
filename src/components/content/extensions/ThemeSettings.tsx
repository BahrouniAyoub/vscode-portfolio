import { useEffect, useState } from 'react';
import { Check, Palette } from 'lucide-react';
import { applyTheme, getStoredThemeId, themes } from '@/data/themes';

interface ThemeSettingsProps {
  onOpenSettings?: () => void;
}

const ThemeSettings = ({ onOpenSettings }: ThemeSettingsProps) => {
  const [activeTheme, setActiveTheme] = useState(getStoredThemeId);

  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const themeId = (event as CustomEvent<{ themeId: string }>).detail?.themeId;
      if (themeId) setActiveTheme(themeId);
    };

    const handleStorage = () => setActiveTheme(getStoredThemeId());
    window.addEventListener('portfolio:theme-change', handleThemeChange);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('portfolio:theme-change', handleThemeChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const handleApplyTheme = (themeId: string) => {
    setActiveTheme(applyTheme(themeId));
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden bg-vsc-editor">
      <div className="px-4 py-5 sm:px-8 sm:py-6 border-b border-border">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary/20 ring-1 ring-primary/25">
            <Palette size={24} className="text-primary" strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground break-words">Theme Switcher</h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              Choose a global VSCode-inspired theme. The selected theme updates the title bar, sidebar, editor, terminal, Copilot, forms, and overlays instantly.
            </p>
            <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-vsc-green/20 text-vsc-green rounded text-xs font-medium">
              <Check size={12} /> Installed
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 sm:px-8 sm:py-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Select Theme</h2>
            <p className="text-xs text-muted-foreground mt-1">Active theme is saved to localStorage as <code className="text-vsc-orange">selectedTheme</code>.</p>
          </div>
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="rounded border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              Open Settings
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {themes.map((theme) => {
            const isActive = activeTheme === theme.id;
            return (
              <div
                key={theme.id}
                className={`group min-w-0 rounded border p-4 transition-colors ${isActive
                  ? 'border-primary bg-primary/10 shadow-[inset_3px_0_0_hsl(var(--primary))]'
                  : 'border-border bg-secondary/15 hover:border-primary/50 hover:bg-secondary/25'
                  }`}
              >
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex min-w-0 items-center gap-2">
                      <span className="text-lg" aria-hidden="true">{theme.emoji}</span>
                      <h3 className="truncate text-sm font-semibold text-foreground">{theme.name}</h3>
                      {isActive && <Check size={15} className="shrink-0 text-primary" strokeWidth={2} />}
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">{theme.description}</p>
                  </div>
                  <div
                    className="mt-1 h-4 w-4 shrink-0 rounded-full border border-border"
                    style={{ background: theme.accent, boxShadow: `0 0 10px ${theme.accent}` }}
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <span className="h-2 w-2 rounded-full" style={{ background: theme.accent }} />
                    <span>{theme.accent}</span>
                  </div>
                  <button
                    onClick={() => handleApplyTheme(theme.id)}
                    disabled={isActive}
                    className={`rounded px-3 py-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-primary ${isActive
                      ? 'cursor-default bg-primary/20 text-primary'
                      : 'border border-border text-foreground hover:border-primary/60 hover:bg-primary/10'
                      }`}
                  >
                    {isActive ? 'Applied' : 'Apply'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
