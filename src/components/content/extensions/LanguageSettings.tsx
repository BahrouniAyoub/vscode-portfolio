import { useEffect, useState } from 'react';
import { Languages, Check } from 'lucide-react';

const LanguageSettings = () => {
  const [language, setLanguage] = useState<'English' | 'French' | 'Arabic'>('English');
  const LANG_KEY = 'portfolio.extensions.language';

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved) setLanguage(saved as 'English' | 'French' | 'Arabic');
  }, []);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, language);
  }, [language]);

  const languages = [
    { id: 'English', label: 'English', status: 'Active' },
    { id: 'French', label: 'Français', status: 'Coming Soon' },
    { id: 'Arabic', label: 'العربية', status: 'Coming Soon' },
  ] as const;

  return (
    <div className="flex-1 overflow-y-auto bg-vsc-editor">
      {/* Header */}
      <div className="px-4 py-5 sm:px-8 sm:py-6 border-b border-border">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded bg-primary/20">
            <Languages size={24} className="text-primary" strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground break-words">Language Switcher</h1>
            <p className="text-sm text-muted-foreground mt-1">Change portfolio language.</p>
            <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-vsc-green/20 text-vsc-green rounded text-xs font-medium">
              <Check size={12} /> Installed
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 sm:px-8 sm:py-6">
        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setLanguage(lang.id)}
              disabled={lang.status === 'Coming Soon'}
              className={`w-full p-4 rounded border-2 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed ${
                language === lang.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-secondary/20 hover:border-primary/50 disabled:hover:border-border'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">{lang.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{lang.status}</div>
                </div>
                {language === lang.id && lang.status !== 'Coming Soon' && (
                  <Check size={20} className="text-primary" strokeWidth={2} />
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-vsc-sidebar border border-border rounded">
          <p className="text-xs text-muted-foreground">
            💡 Additional languages will be available in future updates. Currently only English is fully supported.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSettings;
