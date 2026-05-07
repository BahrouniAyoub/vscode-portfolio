import { useState } from 'react';
import { Gamepad2, Check } from 'lucide-react';

const GameMode = () => {
  const [soundOn, setSoundOn] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-vsc-editor">
      {/* Header */}
      <div className="px-4 py-5 sm:px-8 sm:py-6 border-b border-border">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded bg-primary/20">
            <Gamepad2 size={24} className="text-primary" strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground break-words">Game Mode</h1>
            <p className="text-sm text-muted-foreground mt-1">Add playful CodeQuest-style effects.</p>
            <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-vsc-green/20 text-vsc-green rounded text-xs font-medium">
              <Check size={12} /> Installed
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 sm:px-8 sm:py-6 space-y-6">
        {/* XP Progress */}
        <div className="border border-border rounded p-6 bg-secondary/20">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Experience Progress</h3>
              <p className="text-xs text-muted-foreground mt-1">Level up by exploring the portfolio</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">68%</p>
              <p className="text-xs text-muted-foreground">Level 5</p>
            </div>
          </div>
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden border border-border">
            <div className="h-full bg-gradient-to-r from-primary to-primary/60" style={{ width: '68%' }} />
          </div>
        </div>

        {/* Pixel Badge */}
        <div className="border border-border rounded p-6 bg-secondary/20">
          <h3 className="font-semibold text-foreground mb-4">Achievements</h3>
          <div className="flex gap-4">
            <div className="px-4 py-3 border-2 border-primary bg-primary/10 rounded inline-flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="text-sm font-medium text-foreground">PIXEL BADGE</p>
                <p className="text-xs text-muted-foreground">Explorer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sound Toggle */}
        <div className="border border-border rounded p-4 bg-secondary/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Game Audio</h3>
              <p className="text-xs text-muted-foreground mt-1">Enable game mode sound effects</p>
            </div>
            <button
              onClick={() => setSoundOn(!soundOn)}
              className={`px-4 py-2 rounded border transition-all ${
                soundOn
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              {soundOn ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-vsc-sidebar border border-border rounded">
          <p className="text-xs text-muted-foreground">
            💡 Game mode adds playful interactions and achievements as you explore the portfolio. Coming soon: more levels and challenges!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameMode;
