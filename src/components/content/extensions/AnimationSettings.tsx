import { useEffect, useState } from 'react';
import { Sparkles, Check } from 'lucide-react';

const AnimationSettings = () => {
  const [animationsOn, setAnimationsOn] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const ANIMATIONS_KEY = 'portfolio.extensions.animations';
  const REDUCED_MOTION_KEY = 'portfolio.extensions.reducedMotion';

  useEffect(() => {
    setAnimationsOn(localStorage.getItem(ANIMATIONS_KEY) !== 'false');
    setReducedMotion(localStorage.getItem(REDUCED_MOTION_KEY) === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem(ANIMATIONS_KEY, String(animationsOn));
    document.documentElement.dataset.animations = animationsOn ? 'on' : 'off';
  }, [animationsOn]);

  useEffect(() => {
    localStorage.setItem(REDUCED_MOTION_KEY, String(reducedMotion));
    document.documentElement.dataset.reducedMotion = reducedMotion ? 'on' : 'off';
  }, [reducedMotion]);

  return (
    <div className="flex-1 overflow-y-auto bg-vsc-editor">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded bg-primary/20">
            <Sparkles size={24} className="text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Animation Control</h1>
            <p className="text-sm text-muted-foreground mt-1">Toggle UI animations and motion preferences.</p>
            <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-vsc-green/20 text-vsc-green rounded text-xs font-medium">
              <Check size={12} /> Installed
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6 space-y-6">
        {/* Animations Toggle */}
        <div className="border border-border rounded p-4 bg-secondary/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Animations</h3>
              <p className="text-xs text-muted-foreground mt-1">Enable or disable UI animations</p>
            </div>
            <button
              onClick={() => setAnimationsOn(!animationsOn)}
              className={`px-4 py-2 rounded border transition-all ${
                animationsOn
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              {animationsOn ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        {/* Reduced Motion Toggle */}
        <div className="border border-border rounded p-4 bg-secondary/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Reduced Motion</h3>
              <p className="text-xs text-muted-foreground mt-1">Minimize animations for accessibility</p>
            </div>
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`px-4 py-2 rounded border transition-all ${
                reducedMotion
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              {reducedMotion ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-vsc-sidebar border border-border rounded">
          <p className="text-xs text-muted-foreground">
            💡 Animations enhance the visual experience. Reduced Motion mode is recommended for users with vestibular sensitivities or those who prefer minimal motion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimationSettings;
