import { Focus, Check } from 'lucide-react';

interface FocusModeProps {
  onToggleFocusMode?: () => void;
  focusMode?: boolean;
}

const FocusMode = ({ onToggleFocusMode, focusMode = false }: FocusModeProps) => {
  return (
    <div className="flex-1 overflow-y-auto bg-vsc-editor">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded bg-primary/20">
            <Focus size={24} className="text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Focus Mode</h1>
            <p className="text-sm text-muted-foreground mt-1">Hide distractions for distraction-free reading.</p>
            <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-vsc-green/20 text-vsc-green rounded text-xs font-medium">
              <Check size={12} /> Installed
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6 space-y-6">
        {/* Toggle Button */}
        <button
          onClick={onToggleFocusMode}
          className={`w-full p-6 rounded border-2 transition-all text-left ${
            focusMode
              ? 'border-primary bg-primary/10'
              : 'border-border bg-secondary/20 hover:border-primary/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-foreground">Focus Mode</p>
              <p className="text-sm text-muted-foreground mt-1">
                {focusMode ? 'Enabled - Distraction-free viewing active' : 'Disabled - All UI elements visible'}
              </p>
            </div>
            <div
              className={`px-4 py-2 rounded ${
                focusMode
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent border border-border text-foreground'
              }`}
            >
              {focusMode ? 'On' : 'Off'}
            </div>
          </div>
        </button>

        {/* What Gets Hidden */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">What Focus Mode Hides</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2 p-3 border border-border rounded bg-secondary/10">
              <span className="text-primary font-bold">✓</span>
              <div>
                <p className="text-sm text-foreground">Sidebar</p>
                <p className="text-xs text-muted-foreground">File explorer and extensions panel</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 border border-border rounded bg-secondary/10">
              <span className="text-primary font-bold">✓</span>
              <div>
                <p className="text-sm text-foreground">Terminal</p>
                <p className="text-xs text-muted-foreground">Bottom terminal panel</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 border border-border rounded bg-secondary/10">
              <span className="text-primary font-bold">✓</span>
              <div>
                <p className="text-sm text-foreground">Chatbot</p>
                <p className="text-xs text-muted-foreground">Right-side chat panel</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-vsc-sidebar border border-border rounded">
          <p className="text-xs text-muted-foreground">
            💡 Focus mode provides a distraction-free experience for reading content and exploring the portfolio. Press Escape to exit focus mode.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FocusMode;
