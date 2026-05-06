import { useContext } from 'react';
import { ClickSoundContext } from './click-sound-context';

export function useClickSound() {
  const context = useContext(ClickSoundContext);
  if (!context) {
    throw new Error('useClickSound must be used within ClickSoundProvider');
  }
  return context;
}
