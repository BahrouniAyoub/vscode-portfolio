import { useEffect, useState } from 'react';
import { Bot, Check } from 'lucide-react';

interface CopilotSettingsProps {
  onOpenCopilot?: () => void;
}

const CopilotSettings = ({ onOpenCopilot }: CopilotSettingsProps) => {
  const [copilotSuggestions, setCopilotSuggestions] = useState(true);
  const SUGGESTIONS_KEY = 'portfolio.extensions.copilotSuggestions';

  useEffect(() => {
    setCopilotSuggestions(localStorage.getItem(SUGGESTIONS_KEY) !== 'false');
  }, []);

  useEffect(() => {
    localStorage.setItem(SUGGESTIONS_KEY, String(copilotSuggestions));
  }, [copilotSuggestions]);

  const handleClearChat = () => {
    window.dispatchEvent(new CustomEvent('app:copilot-clear-chat'));
  };

  return (
    <div className="flex-1 overflow-y-auto bg-vsc-editor">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded bg-primary/20">
            <Bot size={24} className="text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Copilot Enhancer</h1>
            <p className="text-sm text-muted-foreground mt-1">Configure the AI assistant.</p>
            <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-vsc-green/20 text-vsc-green rounded text-xs font-medium">
              <Check size={12} /> Installed
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6 space-y-4">
        {/* Open Copilot */}
        <button
          onClick={onOpenCopilot}
          className="w-full p-4 bg-primary text-primary-foreground rounded border border-primary hover:bg-primary/90 transition-colors text-left font-medium"
        >
          Open Copilot Panel
        </button>

        {/* Clear Chat */}
        <button
          onClick={handleClearChat}
          className="w-full p-4 bg-transparent border border-border rounded hover:bg-secondary/20 transition-colors text-foreground text-left font-medium"
        >
          Clear Chat History
        </button>

        {/* Suggestions Toggle */}
        <div className="border border-border rounded p-4 bg-secondary/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Suggestions</h3>
              <p className="text-xs text-muted-foreground mt-1">Enable contextual AI suggestions</p>
            </div>
            <button
              onClick={() => setCopilotSuggestions(!copilotSuggestions)}
              className={`px-4 py-2 rounded border transition-all ${
                copilotSuggestions
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              {copilotSuggestions ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-vsc-sidebar border border-border rounded">
          <p className="text-xs text-muted-foreground">
            💡 Copilot is an AI assistant that can help you learn more about the portfolio and answer questions about projects and skills.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CopilotSettings;
