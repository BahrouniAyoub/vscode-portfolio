import { useEffect, useState } from 'react';
import { Palette, Check } from 'lucide-react';

interface ThemeSettingsProps {
  onOpenSettings?: () => void;
}

const ThemeSettings = ({ onOpenSettings }: ThemeSettingsProps) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const themes = [
    { id: 'dark', name: 'Dark (Default)', description: 'Dark theme for reduced eye strain' },
    { id: 'light', name: 'Light', description: 'Light theme for better visibility' },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-vsc-editor">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded bg-primary/20">
            <Palette size={24} className="text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Theme Switcher</h1>
            <p className="text-sm text-muted-foreground mt-1">Change the website theme.</p>
            <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-vsc-green/20 text-vsc-green rounded text-xs font-medium">
              <Check size={12} /> Installed
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-4">Select Theme</h2>
            <div className="space-y-3">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as 'dark' | 'light')}
                  className={`w-full p-4 rounded border-2 transition-all text-left ${
                    theme === t.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-secondary/20 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{t.description}</div>
                    </div>
                    {theme === t.id && <Check size={20} className="text-primary" strokeWidth={2} />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <button
              onClick={onOpenSettings}
              className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors"
            >
              Advanced Theme Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
