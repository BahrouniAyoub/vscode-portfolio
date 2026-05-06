export type FileId = 'home' | 'about' | 'projects' | 'skills' | 'experience' | 'contact' | 'readme' | 'resume';

export type ExtensionId = 'theme' | 'font' | 'language' | 'animation' | 'copilot' | 'stats' | 'game' | 'notes' | 'search' | 'focus' | 'ai';

export type TabId = FileId | ExtensionId;

export interface Tab {
  id: TabId;
  type: 'file' | 'extension';
  name: string;
  icon?: string;
  iconColor?: string;
}

export type SidebarFileIcon = 'react' | 'globe' | 'file-json' | 'file-code' | 'file-type' | 'hash' | 'file-text' | 'file-down';

export interface SidebarFile {
  id: FileId;
  name: string;
  path: string[];
  lucideIcon: SidebarFileIcon;
  iconColor: string;
}

export const sidebarFiles: SidebarFile[] = [
  { id: 'home', name: 'index.ts', path: ['src', 'portfolio', 'index.ts'], lucideIcon: 'react', iconColor: 'text-vsc-cyan' },
  { id: 'about', name: 'about.ts', path: ['src', 'portfolio', 'about.ts'], lucideIcon: 'file-type', iconColor: 'text-vsc-cyan' },
  { id: 'projects', name: 'projects.json', path: ['src', 'portfolio', 'projects.json'], lucideIcon: 'file-json', iconColor: 'text-vsc-yellow' },
  { id: 'skills', name: 'skills.ts', path: ['src', 'portfolio', 'skills.ts'], lucideIcon: 'file-type', iconColor: 'text-vsc-cyan' },
  { id: 'experience', name: 'experience.ts', path: ['src', 'portfolio', 'experience.ts'], lucideIcon: 'file-type', iconColor: 'text-vsc-cyan' },
  { id: 'contact', name: 'contact.ts', path: ['src', 'portfolio', 'contact.ts'], lucideIcon: 'file-type', iconColor: 'text-vsc-cyan' },
  { id: 'readme', name: 'README.md', path: ['README.md'], lucideIcon: 'file-text', iconColor: 'text-muted-foreground' },
  { id: 'resume', name: 'Ayoub_Bahrouni_Resume...', path: ['public', 'Ayoub resume.pdf'], lucideIcon: 'file-down', iconColor: 'text-vsc-red' },
];

export const extensionRegistry: Record<ExtensionId, { name: string; description: string; action: string }> = {
  theme: { name: 'Theme Switcher', description: 'Change the website theme.', action: 'Configure' },
  font: { name: 'Font Settings', description: 'Customize typography.', action: 'Configure' },
  language: { name: 'Language Switcher', description: 'Change portfolio language.', action: 'Configure' },
  animation: { name: 'Animation Control', description: 'Toggle UI animations.', action: 'Configure' },
  copilot: { name: 'Copilot Enhancer', description: 'Configure the AI assistant.', action: 'Use' },
  stats: { name: 'Stats Panel', description: 'Show portfolio/project stats.', action: 'Open' },
  game: { name: 'Game Mode', description: 'Add playful CodeQuest-style effects.', action: 'Use' },
  notes: { name: 'Notes / Scratchpad', description: 'Temporary notes area.', action: 'Open' },
  search: { name: 'Smart Search Enhancer', description: 'Improves command palette navigation.', action: 'Use' },
  focus: { name: 'Focus Mode', description: 'Hide distractions for reading.', action: 'Use' },
  ai: { name: 'AI Mode', description: 'Highlight AI-related projects and tools.', action: 'Use' },
};

export const socialLinks = [
  { name: 'GitHub', lucideIcon: 'github' as const, url: 'https://github.com/BahrouniAyoub' },
  { name: 'LinkedIn', lucideIcon: 'linkedin' as const, url: 'https://www.linkedin.com/in/ayoub-bahrouni' },
  { name: 'Email', lucideIcon: 'mail' as const, url: 'mailto:bahrouni.ayoub2003@gmail.com' },
  { name: 'Medium', lucideIcon: 'pen-line' as const, url: 'https://medium.com/@BahrouniAyoub' },
  { name: 'Tableau', lucideIcon: 'bar-chart-3' as const, url: 'https://public.tableau.com/app/profile/ayoub.bahrouni/vizzes' },
  { name: 'LeetCode', lucideIcon: 'zap' as const, url: 'https://leetcode.com/u/BahrouniAyoub/' },
  { name: 'Instagram', lucideIcon: 'instagram' as const, url: 'https://www.instagram.com/BahrouniAyoub1' },
  { name: 'Youtube', lucideIcon: 'youtube' as const, url: 'https://www.youtube.com/@BahrouniAyoub' },
];

export const projects = [
  {
    title: 'EduVanceAI',
    description: 'AI-powered educational platform with personalized learning paths and intelligent tutoring systems.',
    tech: ['Python', 'FastAPI', 'LangChain', 'React', 'PostgreSQL'],
    link: '#',
  },
  {
    title: 'Data Pipeline Engine',
    description: 'Scalable ETL pipeline for processing millions of records with real-time monitoring.',
    tech: ['Python', 'Apache Kafka', 'Spark', 'Docker'],
    link: '#',
  },
  {
    title: 'ML Model Registry',
    description: 'Centralized model management system with versioning, A/B testing, and deployment automation.',
    tech: ['Python', 'MLflow', 'Docker', 'Kubernetes'],
    link: '#',
  },
  {
    title: 'NLP Sentiment Analyzer',
    description: 'Real-time sentiment analysis tool for social media data with dashboard visualization.',
    tech: ['Python', 'Transformers', 'Flask', 'D3.js'],
    link: '#',
  },
  {
    title: 'Portfolio Website',
    description: 'VSCode-themed portfolio website built with modern web technologies.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    link: '#',
  },
];

export const skills = {
  languages: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'R', 'Java'],
  frameworks: ['FastAPI', 'Flask', 'React', 'Node.js', 'Django'],
  ai_ml: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'LangChain', 'Hugging Face'],
  data: ['PostgreSQL', 'MongoDB', 'Redis', 'Apache Kafka', 'Spark'],
  tools: ['Docker', 'Kubernetes', 'Git', 'AWS', 'GCP', 'Tableau'],
};

export const experiences = [
  {
    role: 'Backend Engineer & AI/ML Dev',
    company: 'EduVanceAI',
    period: '2023 - Present',
    description: 'Building intelligent backend systems and ML pipelines for an AI-powered education platform.',
    highlights: ['Designed scalable API architecture', 'Implemented ML model serving', 'Optimized database queries'],
  },
  {
    role: 'Data Science Intern',
    company: 'Tech Company',
    period: '2022 - 2023',
    description: 'Worked on data analysis, ML model development, and dashboard creation.',
    highlights: ['Built predictive models', 'Created data dashboards', 'Automated reporting'],
  },
];

export const chatbotResponses: Record<string, string> = {
  'who are you': "I'm Ayoub Bahrouni — a Backend Engineer, AI/ML Dev, and Data Scientist currently working at EduVanceAI.",
  'skills': "I work with Python, TypeScript, React, FastAPI, TensorFlow, PyTorch, LangChain, PostgreSQL, Docker, Kubernetes, and more!",
  'projects': "Check out my projects tab! I've built AI platforms, data pipelines, ML registries, and NLP tools.",
  'contact': "You can reach me at bahrouni.ayoub2003@gmail.com, or find me on GitHub, LinkedIn, and Medium.",
  'experience': "I'm currently a Backend Engineer & AI/ML Dev at EduVanceAI, building intelligent backend systems.",
  'hello': "Hey there! I'm Ayoub's Copilot. Ask me about her skills, projects, experience, or how to get in touch!",
  'default': "I can answer questions about Ayoub's skills, projects, experience, and contact info. Try asking about one of those!",
};
