import { Search, Check } from 'lucide-react';

interface SearchEnhancerProps {
  onOpenCommandPalette?: () => void;
}

const SearchEnhancer = ({ onOpenCommandPalette }: SearchEnhancerProps) => {
  return (
    <div className="flex-1 overflow-y-auto bg-vsc-editor">
      {/* Header */}
      <div className="px-4 py-5 sm:px-8 sm:py-6 border-b border-border">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded bg-primary/20">
            <Search size={24} className="text-primary" strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground break-words">Smart Search Enhancer</h1>
            <p className="text-sm text-muted-foreground mt-1">Improves command palette navigation.</p>
            <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-vsc-green/20 text-vsc-green rounded text-xs font-medium">
              <Check size={12} /> Installed
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 sm:px-8 sm:py-6 space-y-6">
        {/* Open Command Palette */}
        <button
          onClick={onOpenCommandPalette}
          className="w-full p-4 bg-primary text-primary-foreground rounded border border-primary hover:bg-primary/90 transition-colors text-left font-medium"
        >
          Open Command Palette (Ctrl+P)
        </button>

        {/* Features */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">Features</h3>
          <div className="space-y-3">
            <div className="p-3 border border-border rounded bg-secondary/10">
              <p className="text-sm font-medium text-foreground">🔍 Fuzzy Search</p>
              <p className="text-xs text-muted-foreground mt-1">Find files and commands with intelligent partial matching</p>
            </div>
            <div className="p-3 border border-border rounded bg-secondary/10">
              <p className="text-sm font-medium text-foreground">⚡ Quick Navigation</p>
              <p className="text-xs text-muted-foreground mt-1">Navigate to any section with keyboard shortcuts</p>
            </div>
            <div className="p-3 border border-border rounded bg-secondary/10">
              <p className="text-sm font-medium text-foreground">📝 Recent History</p>
              <p className="text-xs text-muted-foreground mt-1">Quick access to recently viewed sections</p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-vsc-sidebar border border-border rounded">
          <p className="text-xs text-muted-foreground">
            💡 Use Ctrl+P to open the Command Palette and search for files, sections, or commands from anywhere in the portfolio.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchEnhancer;
