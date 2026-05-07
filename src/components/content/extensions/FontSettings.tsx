import { useEffect, useState } from 'react';
import { Type, Check } from 'lucide-react';

const FontSettings = () => {
  const [fontFamily, setFontFamily] = useState('JetBrains Mono');
  const [fontSize, setFontSize] = useState(13);
  const [lineHeight, setLineHeight] = useState(1.4);
  const [letterSpacing, setLetterSpacing] = useState(-0.02);

  const FONT_KEY = 'portfolio.extensions.font';
  const FONT_SIZE_KEY = 'portfolio.extensions.fontSize';
  const LINE_HEIGHT_KEY = 'portfolio.extensions.lineHeight';
  const LETTER_SPACING_KEY = 'portfolio.extensions.letterSpacing';

  useEffect(() => {
    setFontFamily(localStorage.getItem(FONT_KEY) || 'JetBrains Mono');
    setFontSize(Number(localStorage.getItem(FONT_SIZE_KEY) || 13));
    setLineHeight(Number(localStorage.getItem(LINE_HEIGHT_KEY) || 1.4));
    setLetterSpacing(Number(localStorage.getItem(LETTER_SPACING_KEY) || -0.02));
  }, []);

  useEffect(() => {
    const fontMap: Record<string, string> = {
      'JetBrains Mono': "'JetBrains Mono', monospace",
      Inter: "Inter, system-ui, sans-serif",
      'System Mono': "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    };
    document.body.style.fontFamily = fontMap[fontFamily];
    localStorage.setItem(FONT_KEY, fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;
    localStorage.setItem(FONT_SIZE_KEY, String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    document.body.style.lineHeight = String(lineHeight);
    localStorage.setItem(LINE_HEIGHT_KEY, String(lineHeight));
  }, [lineHeight]);

  useEffect(() => {
    document.body.style.letterSpacing = `${letterSpacing}em`;
    localStorage.setItem(LETTER_SPACING_KEY, String(letterSpacing));
  }, [letterSpacing]);

  const fontOptions = ['JetBrains Mono', 'Inter', 'System Mono'];

  return (
    <div className="flex-1 overflow-y-auto bg-vsc-editor">
      {/* Header */}
      <div className="px-4 py-5 sm:px-8 sm:py-6 border-b border-border">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded bg-primary/20">
            <Type size={24} className="text-primary" strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground break-words">Font Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">Customize typography and spacing.</p>
            <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-vsc-green/20 text-vsc-green rounded text-xs font-medium">
              <Check size={12} /> Installed
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 sm:px-8 sm:py-6 space-y-8">
        {/* Font Family */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">Font Family</label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full px-3 py-2 bg-vsc-sidebar border border-border rounded text-sm text-foreground outline-none focus:border-primary transition-colors"
          >
            {fontOptions.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-foreground">Font Size</label>
            <span className="text-xs text-muted-foreground font-mono">{fontSize}px</span>
          </div>
          <input
            type="range"
            min={11}
            max={18}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full"
          />
          <div className="mt-4 p-4 bg-secondary/30 rounded border border-border text-sm text-foreground font-code">
            Preview text for font size adjustment
          </div>
        </div>

        {/* Line Height */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-foreground">Line Height</label>
            <span className="text-xs text-muted-foreground font-mono">{lineHeight.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={1.2}
            max={1.8}
            step={0.05}
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Letter Spacing */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-foreground">Letter Spacing</label>
            <span className="text-xs text-muted-foreground font-mono">{letterSpacing.toFixed(2)}em</span>
          </div>
          <input
            type="range"
            min={-0.05}
            max={0.08}
            step={0.01}
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FontSettings;
