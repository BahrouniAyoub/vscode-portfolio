import { useState } from 'react';
import { TabId, FileId, sidebarFiles, ExtensionId, extensionRegistry } from '@/data/portfolio';
import HomeContent from './content/HomeContent';
import AboutContent from './content/AboutContent';
import ProjectsContent from './content/ProjectsContent';
import SkillsContent from './content/SkillsContent';
import ExperienceContent from './content/ExperienceContent';
import ContactContent from './content/ContactContent';
import ReadmeContent from './content/ReadmeContent';
import HomePreview from './content/preview/HomePreview';
import AboutPreview from './content/preview/AboutPreview';
import ProjectsPreview from './content/preview/ProjectsPreview';
import SkillsPreview from './content/preview/SkillsPreview';
import ExperiencePreview from './content/preview/ExperiencePreview';
import ContactPreview from './content/preview/ContactPreview';
import ReadmeCodeContent from './content/code/ReadmeCodeContent';
import ExtensionPage from './content/ExtensionPage';
import { FileDown, Download, ChevronRight } from 'lucide-react';
import { RESUME_DOWNLOAD_NAME, RESUME_DOWNLOAD_PATH } from '@/lib/resume';

type ViewMode = 'preview' | 'code';

interface EditorContentProps {
  activeTab: TabId;
  onFileSelect: (id: FileId) => void;
  onOpenSettings?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenCopilot?: () => void;
  onToggleFocusMode?: () => void;
  onToggleAiMode?: () => void;
  aiMode?: boolean;
  focusMode?: boolean;
  onResumeDownloadStart?: () => void;
}

const EditorContent = ({
  activeTab,
  onFileSelect,
  onOpenSettings,
  onOpenCommandPalette,
  onOpenCopilot,
  onToggleFocusMode,
  onToggleAiMode,
  aiMode = false,
  focusMode = false,
  onResumeDownloadStart,
}: EditorContentProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const isExtension = extensionRegistry[activeTab as ExtensionId];
  const file = sidebarFiles.find((f) => f.id === activeTab);
  const breadcrumbParts = file?.path ?? (file ? [file.name] : []);
  const showCode = viewMode === 'code';

  const renderContent = () => {
    if (isExtension) {
      return (
        <ExtensionPage
          extensionId={activeTab as ExtensionId}
          onOpenSettings={onOpenSettings}
          onOpenCommandPalette={onOpenCommandPalette}
          onOpenCopilot={onOpenCopilot}
          onToggleFocusMode={onToggleFocusMode}
          onToggleAiMode={onToggleAiMode}
          focusMode={focusMode}
          aiMode={aiMode}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return showCode ? <HomeContent onFileSelect={onFileSelect} /> : <HomePreview onFileSelect={onFileSelect} />;
      case 'about':
        return showCode ? <AboutContent /> : <AboutPreview />;
      case 'projects':
        return showCode ? <ProjectsContent aiMode={aiMode} /> : <ProjectsPreview aiMode={aiMode} />;
      case 'skills':
        return showCode ? <SkillsContent aiMode={aiMode} /> : <SkillsPreview aiMode={aiMode} />;
      case 'experience':
        return showCode ? <ExperienceContent /> : <ExperiencePreview />;
      case 'contact':
        return showCode ? <ContactContent /> : <ContactPreview />;
      case 'readme':
        return showCode ? <ReadmeCodeContent /> : <ReadmeContent />;
      case 'resume':
        return (
          <div className="p-8">
            <p className="font-code text-vsc-comment text-sm mb-4">{'// Resume'}</p>
            <div className="border border-border rounded p-6 bg-secondary/10 text-center">
              <FileDown size={40} strokeWidth={1.5} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Ayoub Bahrouni — Resume</h3>
              <p className="text-sm text-muted-foreground mb-4">Download or view my latest resume</p>
              <a
                href={RESUME_DOWNLOAD_PATH}
                download={RESUME_DOWNLOAD_NAME}
                onClick={onResumeDownloadStart}
                aria-label={`Download ${RESUME_DOWNLOAD_NAME}`}
                className="group px-4 py-4 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-all hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-vsc-editor active:scale-[0.98] inline-flex items-center gap-2"
              >
                <Download size={14} strokeWidth={1.5} className="transition-transform group-hover:animate-bounce" /> Download Resume
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden bg-vsc-editor">
      {!isExtension && (
        <div className="px-2 sm:px-3 py-1 text-xs text-muted-foreground font-code border-b border-border flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-1 min-w-0">
            {showCode ? breadcrumbParts.map((part, index) => (
              <span key={`${part}-${index}`} className="inline-flex items-center gap-1 shrink-0">
                <span className={`${index === breadcrumbParts.length - 1 ? 'text-foreground' : ''} truncate`}>{part}</span>
                {index < breadcrumbParts.length - 1 && <ChevronRight size={10} strokeWidth={1.5} />}
              </span>
            )) : <span className="truncate">Preview · {file?.name}</span>}
          </div>
          <div className="flex items-center gap-1 rounded-sm bg-vsc-tab-inactive p-0.5 border border-border shrink-0">
            {(['preview', 'code'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-2 py-0.5 rounded-sm text-[11px] capitalize transition-colors ${viewMode === mode
                  ? 'bg-secondary/70 text-foreground'
                  : 'text-muted-foreground hover:bg-secondary/30 hover:text-foreground'
                  }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      )}

      {renderContent()}
    </div>
  );
};

export default EditorContent;
