import { useEffect, useState, useCallback, useRef, type ReactNode } from 'react';
import { ClickSoundContext } from './click-sound-context';

const DEBOUNCE_MS = 100;
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      audioContext = new AudioCtx();
    }
  }
  return audioContext;
}

function playClickSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  } catch {
    // Audio is a progressive enhancement; ignore browser playback failures.
  }
}

export function ClickSoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(() => {
    const stored = localStorage.getItem('ui-sounds-enabled');
    return stored === null ? true : stored === 'true';
  });
  const lastPlayedRef = useRef(0);

  const toggleSound = useCallback((newEnabled: boolean) => {
    setEnabled(newEnabled);
    localStorage.setItem('ui-sounds-enabled', String(newEnabled));
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!enabled) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const now = Date.now();
      if (now - lastPlayedRef.current < DEBOUNCE_MS) return;
      lastPlayedRef.current = now;

      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('a') ||
        target.closest('.clickable') ||
        target.closest('[data-clickable]')
      ) {
        playClickSound();
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [enabled]);

  return (
    <ClickSoundContext.Provider value={{ enabled, toggleSound }}>
      {children}
    </ClickSoundContext.Provider>
  );
}
