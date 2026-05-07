import { useEffect, useState } from 'react';
import { NotebookPen, Check } from 'lucide-react';

const NotesPanel = () => {
  const [notes, setNotes] = useState('');
  const NOTES_KEY = 'portfolio.extensions.notes';

  useEffect(() => {
    const saved = localStorage.getItem(NOTES_KEY);
    if (saved) setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, notes);
  }, [notes]);

  return (
    <div className="flex-1 overflow-y-auto bg-vsc-editor">
      {/* Header */}
      <div className="px-4 py-5 sm:px-8 sm:py-6 border-b border-border">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded bg-primary/20">
            <NotebookPen size={24} className="text-primary" strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground break-words">Notes / Scratchpad</h1>
            <p className="text-sm text-muted-foreground mt-1">Write temporary notes and ideas.</p>
            <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-vsc-green/20 text-vsc-green rounded text-xs font-medium">
              <Check size={12} /> Installed
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 sm:px-8 sm:py-6">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Type your notes here... They will be automatically saved to your browser's local storage."
          className="w-full h-[45vh] sm:h-[400px] p-4 bg-vsc-sidebar border border-border rounded font-code text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none"
        />

        <div className="mt-4 p-4 bg-vsc-sidebar border border-border rounded">
          <p className="text-xs text-muted-foreground">
            💡 Your notes are saved locally in your browser. They will persist across sessions but are not synced to the cloud.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotesPanel;
