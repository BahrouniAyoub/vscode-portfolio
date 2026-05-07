import { FileId } from './portfolio';

export type CommitType = 'feat' | 'fix' | 'refactor' | 'chore' | 'docs';
export type ChangeStatus = 'M' | 'A' | 'D';

export interface CommitEntry {
  id: string;
  hash: string;
  type: CommitType;
  message: string;
  timestamp: string;
  description: string;
  files: string[];
  tech: string[];
}

export interface ChangedFileEntry {
  id: string;
  status: ChangeStatus;
  file: string;
  path: string;
  description: string;
  tech: string[];
  fileId: FileId;
  repoUrl: string;
  demoUrl: string;
}

export const commitTypeStyles: Record<CommitType, { label: string; className: string; dot: string }> = {
  feat: { label: 'feat', className: 'text-vsc-green border-vsc-green/30 bg-vsc-green/10', dot: 'bg-vsc-green' },
  fix: { label: 'fix', className: 'text-vsc-yellow border-vsc-yellow/30 bg-vsc-yellow/10', dot: 'bg-vsc-yellow' },
  refactor: { label: 'refactor', className: 'text-vscode-blue border-vscode-blue/30 bg-vscode-blue/10', dot: 'bg-vscode-blue' },
  chore: { label: 'chore', className: 'text-muted-foreground border-border bg-secondary/30', dot: 'bg-muted-foreground' },
  docs: { label: 'docs', className: 'text-vsc-pink border-vsc-pink/30 bg-vsc-pink/10', dot: 'bg-vsc-pink' },
};

export const commitHistory: CommitEntry[] = [
  {
    id: 'commit-ai-assistant',
    hash: 'a7f4c91',
    type: 'feat',
    message: 'feat: added AI portfolio assistant',
    timestamp: '2 days ago',
    description: 'Shipped a contextual Copilot panel that answers recruiter questions from portfolio knowledge.',
    files: ['src/components/Chatbot.tsx', 'src/data/portfolioKnowledge.ts'],
    tech: ['React', 'TypeScript', 'NLP'],
  },
  {
    id: 'commit-terminal',
    hash: '91c0e42',
    type: 'feat',
    message: 'feat: added VSCode terminal emulator',
    timestamp: '1 week ago',
    description: 'Implemented command history, autocomplete, portfolio navigation, and resume download commands.',
    files: ['src/components/TerminalPanel.tsx'],
    tech: ['React', 'Terminal UX'],
  },
  {
    id: 'commit-responsive',
    hash: '3bb8a18',
    type: 'fix',
    message: 'fix: responsive mobile navbar',
    timestamp: '3 weeks ago',
    description: 'Removed mobile overflow, compacted controls, and converted sidebars into drawers.',
    files: ['src/components/AppShell.tsx', 'src/components/TitleBar.tsx'],
    tech: ['Tailwind CSS', 'Responsive UI'],
  },
  {
    id: 'commit-rag',
    hash: 'c462fd9',
    type: 'feat',
    message: 'feat: implemented RAG chatbot',
    timestamp: '2 months ago',
    description: 'Built retrieval-style answer routing for projects, skills, experience, contact, and resume topics.',
    files: ['src/data/portfolioKnowledge.ts', 'src/components/Chatbot.tsx'],
    tech: ['RAG', 'Prompt Engineering'],
  },
  {
    id: 'commit-backend',
    hash: 'ef2d8b0',
    type: 'refactor',
    message: 'refactor: improved backend architecture',
    timestamp: '3 months ago',
    description: 'Reworked API boundaries and service structure for AI education platform experiments.',
    files: ['api/services/model-router.ts', 'api/db/schema.sql'],
    tech: ['FastAPI', 'PostgreSQL'],
  },
  {
    id: 'commit-mqtt',
    hash: '74ad631',
    type: 'feat',
    message: 'feat: integrated MQTT real-time communication',
    timestamp: '5 months ago',
    description: 'Connected embedded telemetry to a live dashboard for sensor-driven irrigation workflows.',
    files: ['iot/mqtt-client.ts', 'dashboard/telemetry.tsx'],
    tech: ['MQTT', 'ESP32', 'IoT'],
  },
  {
    id: 'commit-irrigation',
    hash: '1f08bde',
    type: 'feat',
    message: 'feat: built smart irrigation IoT system',
    timestamp: '8 months ago',
    description: 'Built a predictive irrigation prototype using sensors, AI models, and mobile monitoring.',
    files: ['firmware/soil-sensor.ino', 'mobile/irrigation-screen.tsx'],
    tech: ['IoT', 'Flutter', 'AI'],
  },
  {
    id: 'commit-animation',
    hash: 'd93ab20',
    type: 'chore',
    message: 'chore: optimized animation rendering',
    timestamp: '10 months ago',
    description: 'Reduced animation cost and respected lower motion preferences for smoother interactions.',
    files: ['src/index.css', 'src/components/CustomCursor.tsx'],
    tech: ['CSS', 'Performance'],
  },
  {
    id: 'commit-readme',
    hash: '5ab219c',
    type: 'docs',
    message: 'docs: updated README.md',
    timestamp: '1 year ago',
    description: 'Documented the portfolio stack, contact links, and developer story.',
    files: ['README.md'],
    tech: ['Markdown', 'Docs'],
  },
];

export const changedFiles: ChangedFileEntry[] = [
  {
    id: 'change-portfolio',
    status: 'M',
    file: 'portfolio.tsx',
    path: 'src/portfolio/portfolio.tsx',
    description: 'Updates the VSCode shell and responsive portfolio navigation.',
    tech: ['React', 'Tailwind CSS'],
    fileId: 'home',
    repoUrl: 'https://github.com/BahrouniAyoub',
    demoUrl: '/',
  },
  {
    id: 'change-assistant',
    status: 'M',
    file: 'ai-assistant.ts',
    path: 'src/ai/ai-assistant.ts',
    description: 'Improves Copilot responses and source-aware portfolio answers.',
    tech: ['TypeScript', 'RAG'],
    fileId: 'projects',
    repoUrl: 'https://github.com/BahrouniAyoub',
    demoUrl: '/',
  },
  {
    id: 'change-irrigation',
    status: 'A',
    file: 'smart-irrigation-dashboard.tsx',
    path: 'src/projects/smart-irrigation-dashboard.tsx',
    description: 'Adds a dashboard concept for IoT telemetry, pump state, and predictive watering.',
    tech: ['IoT', 'MQTT', 'React'],
    fileId: 'projects',
    repoUrl: 'https://github.com/BahrouniAyoub',
    demoUrl: '/',
  },
  {
    id: 'change-navbar',
    status: 'D',
    file: 'old-navbar.tsx',
    path: 'src/legacy/old-navbar.tsx',
    description: 'Removes an old portfolio navigation pattern now replaced by VSCode tabs.',
    tech: ['Cleanup', 'UX'],
    fileId: 'readme',
    repoUrl: 'https://github.com/BahrouniAyoub',
    demoUrl: '/',
  },
];

export const liveCommitMessages: CommitEntry[] = [
  {
    id: 'live-copilot-speed',
    hash: 'b91e7ac',
    type: 'feat',
    message: 'feat: improved Copilot response speed',
    timestamp: 'just now',
    description: 'Simulated live commit for faster assistant typing and answer routing.',
    files: ['src/components/Chatbot.tsx'],
    tech: ['React', 'AI UX'],
  },
  {
    id: 'live-mobile-overflow',
    hash: '0c4f2ae',
    type: 'fix',
    message: 'fix: mobile overflow issue',
    timestamp: 'just now',
    description: 'Simulated live commit for mobile viewport polish.',
    files: ['src/components/AppShell.tsx', 'src/index.css'],
    tech: ['Tailwind CSS'],
  },
  {
    id: 'live-theme-system',
    hash: '64de3f1',
    type: 'refactor',
    message: 'refactor: optimized theme system',
    timestamp: 'just now',
    description: 'Simulated live commit for theme token cleanup.',
    files: ['src/index.css'],
    tech: ['CSS Variables'],
  },
];
