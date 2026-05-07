export const THEME_STORAGE_KEY = 'selectedTheme';
export const LEGACY_THEME_STORAGE_KEY = 'theme';

export interface PortfolioTheme {
  id: string;
  name: string;
  emoji: string;
  description: string;
  accent: string;
}

export const themes: PortfolioTheme[] = [
  {
    id: 'ayoub-dark',
    name: 'Ayoub Dark',
    emoji: '💜',
    description: 'Current dark VSCode-inspired theme with a vivid purple accent.',
    accent: '#8a2be2',
  },
  {
    id: 'rose-pine',
    name: 'Rosé Pine',
    emoji: '🌸',
    description: 'Soft rose-tinted dark theme with warm muted contrast.',
    accent: '#ebbcba',
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    emoji: '🌃',
    description: 'Deep blue editor palette inspired by late-night coding sessions.',
    accent: '#7aa2f7',
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin',
    emoji: '🐱',
    description: 'Mocha-toned theme with bright lavender highlights.',
    accent: '#cba6f7',
  },
  {
    id: 'nord',
    name: 'Nord',
    emoji: '🧊',
    description: 'Cool arctic blues with calm readable contrast.',
    accent: '#88c0d0',
  },
  {
    id: 'gruvbox',
    name: 'Gruvbox',
    emoji: '🔥',
    description: 'Warm retro terminal palette with orange accents.',
    accent: '#fb4934',
  },
  {
    id: 'light',
    name: 'Light Theme',
    emoji: '☀️',
    description: 'Clean bright VSCode-inspired theme for daytime use.',
    accent: '#007acc',
  },
];

export const defaultThemeId = themes[0].id;

export const getStoredThemeId = () => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY) || localStorage.getItem(LEGACY_THEME_STORAGE_KEY);
  return themes.some((theme) => theme.id === stored) ? stored! : defaultThemeId;
};

export const applyTheme = (themeId: string) => {
  const nextThemeId = themes.some((theme) => theme.id === themeId) ? themeId : defaultThemeId;
  document.documentElement.dataset.theme = nextThemeId;
  localStorage.setItem(THEME_STORAGE_KEY, nextThemeId);
  localStorage.setItem(LEGACY_THEME_STORAGE_KEY, nextThemeId);
  window.dispatchEvent(new CustomEvent('portfolio:theme-change', { detail: { themeId: nextThemeId } }));
  return nextThemeId;
};
