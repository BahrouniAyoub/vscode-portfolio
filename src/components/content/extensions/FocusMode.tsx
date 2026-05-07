import { Brain, Check } from 'lucide-react';

interface AIModeProps {
  onToggleAiMode?: () => void;
  aiMode?: boolean;
}

const AIMode = ({ onToggleAiMode, aiMode = false }: AIModeProps) => {
  return (
    <div className="flex-1 overflow-y-auto bg-vsc-editor">
      {/* Header */}
      <div className="px-4 py-5 sm:px-8 sm:py-6 border-b border-border">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded bg-primary/20">
            <Brain size={24} className="text-primary" strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground break-words">AI Mode</h1>
            <p className="text-sm text-muted-foreground mt-1">Highlight AI-related projects and tools.</p>
            <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-vsc-green/20 text-vsc-green rounded text-xs font-medium">
              <Check size={12} /> Installed
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 sm:px-8 sm:py-6 space-y-6">
        {/* Toggle Button */}
        <button
          onClick={onToggleAiMode}
          className={`w-full p-6 rounded border-2 transition-all text-left ${
            aiMode
              ? 'border-primary bg-primary/10'
              : 'border-border bg-secondary/20 hover:border-primary/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-foreground">AI Mode</p>
              <p className="text-sm text-muted-foreground mt-1">
                {aiMode
                  ? 'Enabled - AI/ML content highlighted'
                  : 'Disabled - All content shown equally'}
              </p>
            </div>
            <div
              className={`px-4 py-2 rounded ${
                aiMode
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent border border-border text-foreground'
              }`}
            >
              {aiMode ? 'On' : 'Off'}
            </div>
          </div>
        </button>

        {/* What AI Mode Highlights */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">AI Mode Highlights</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2 p-3 border border-primary/50 rounded bg-primary/10">
              <span className="text-primary font-bold">🤖</span>
              <div>
                <p className="text-sm text-foreground">AI/ML Projects</p>
                <p className="text-xs text-muted-foreground">Projects using AI and machine learning</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 border border-primary/50 rounded bg-primary/10">
              <span className="text-primary font-bold">🧠</span>
              <div>
                <p className="text-sm text-foreground">Generative AI Skills</p>
                <p className="text-xs text-muted-foreground">LLM engineering and prompt optimization</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 border border-primary/50 rounded bg-primary/10">
              <span className="text-primary font-bold">📊</span>
              <div>
                <p className="text-sm text-foreground">Data Science Tools</p>
                <p className="text-xs text-muted-foreground">TensorFlow, PyTorch, Pandas, and more</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-vsc-sidebar border border-border rounded">
          <p className="text-xs text-muted-foreground">
            💡 AI Mode prioritizes and highlights AI/ML related content throughout the portfolio to help you focus on artificial intelligence projects and skills.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIMode;
