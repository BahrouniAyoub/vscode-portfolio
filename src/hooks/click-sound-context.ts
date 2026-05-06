import { createContext } from 'react';

export interface ClickSoundContextType {
  enabled: boolean;
  toggleSound: (enabled: boolean) => void;
}

export const ClickSoundContext = createContext<ClickSoundContextType | null>(null);
