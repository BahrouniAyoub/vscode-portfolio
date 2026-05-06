import { ExtensionId } from '@/data/portfolio';
import ThemeSettings from './extensions/ThemeSettings';
import FontSettings from './extensions/FontSettings';
import LanguageSettings from './extensions/LanguageSettings';
import AnimationSettings from './extensions/AnimationSettings';
import CopilotSettings from './extensions/CopilotSettings';
import StatsPanel from './extensions/StatsPanel';
import GameMode from './extensions/GameMode';
import NotesPanel from './extensions/NotesPanel';
import SearchEnhancer from './extensions/SearchEnhancer';
import FocusMode from './extensions/FocusMode';
import AIMode from './extensions/AIMode';

interface ExtensionPageProps {
  extensionId: ExtensionId;
  onOpenSettings?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenCopilot?: () => void;
  onToggleFocusMode?: () => void;
  onToggleAiMode?: () => void;
  focusMode?: boolean;
  aiMode?: boolean;
}

const ExtensionPage = ({
  extensionId,
  onOpenSettings,
  onOpenCommandPalette,
  onOpenCopilot,
  onToggleFocusMode,
  onToggleAiMode,
  focusMode = false,
  aiMode = false,
}: ExtensionPageProps) => {
  const renderExtension = () => {
    switch (extensionId) {
      case 'theme':
        return <ThemeSettings onOpenSettings={onOpenSettings} />;
      case 'font':
        return <FontSettings />;
      case 'language':
        return <LanguageSettings />;
      case 'animation':
        return <AnimationSettings />;
      case 'copilot':
        return <CopilotSettings onOpenCopilot={onOpenCopilot} />;
      case 'stats':
        return <StatsPanel />;
      case 'game':
        return <GameMode />;
      case 'notes':
        return <NotesPanel />;
      case 'search':
        return <SearchEnhancer onOpenCommandPalette={onOpenCommandPalette} />;
      case 'focus':
        return <FocusMode onToggleFocusMode={onToggleFocusMode} focusMode={focusMode} />;
      case 'ai':
        return <AIMode onToggleAiMode={onToggleAiMode} aiMode={aiMode} />;
      default:
        return null;
    }
  };

  return renderExtension();
};

export default ExtensionPage;
