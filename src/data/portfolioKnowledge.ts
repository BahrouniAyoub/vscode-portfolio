import type { FileId } from './portfolio';

export type KnowledgeTopic = 'about' | 'skills' | 'projects' | 'experience' | 'education' | 'contact' | 'resume';

export interface AssistantSource {
  label: string;
  fileId: FileId;
}

export const portfolioKnowledge = {
  about: {
    summary: 'Ayoub Bahrouni is an AI Engineer and Full Stack Developer based in Tunisia. He builds intelligent, scalable products across AI/ML, full-stack development, mobile development, and data systems.',
    focus: ['LLMs', 'RAG', 'AI integrations', 'ML pipelines', 'scalable apps', 'data storytelling'],
    status: 'Open to AI, full-stack, data, and internship opportunities.',
    source: { label: 'about.ts', fileId: 'about' } as AssistantSource,
  },
  education: {
    items: [
      'Computer Engineering with IoT & Embedded Systems focus at Faculty of Sciences of Tunis.',
      'Full-Stack Web Development Certificate from 3W Academy in 2024.',
      'AI Engineer @ Esprit is listed in the portfolio UI.',
    ],
    source: { label: 'about.ts', fileId: 'about' } as AssistantSource,
  },
  skills: {
    languages: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
    ai: ['LangChain', 'LangGraph', 'RAG Pipelines', 'Prompt Engineering', 'Agentic Workflows', 'Hugging Face Transformers'],
    ml: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Pandas', 'NumPy', 'spaCy', 'NLTK'],
    backend: ['FastAPI', 'Flask', 'Django', 'Node.js'],
    frontend: ['React', 'Next.js', 'Tailwind CSS', 'Responsive Design'],
    data: ['PostgreSQL', 'MongoDB', 'Redis', 'Neo4j', 'FAISS', 'Pinecone'],
    tools: ['Docker', 'Git', 'Linux', 'AWS', 'GitHub Actions', 'Jupyter', 'Tableau', 'Power BI', 'Figma'],
    source: { label: 'skills.ts', fileId: 'skills' } as AssistantSource,
  },
  projects: [
    {
      name: 'PagePal',
      type: 'AI SaaS',
      summary: 'An AI-powered voice book reader that turns PDF books into natural voice narration with user libraries and usage tracking.',
      stack: ['Next.js', 'TypeScript', 'MongoDB', 'Clerk', 'Vapi AI', 'Tailwind CSS', 'Vercel Blob', 'PDF.js'],
      status: 'production',
      repo: 'github.com/BahrouniAyoub/pagepal',
    },
    {
      name: 'CodeSage',
      type: 'AI Developer Tool',
      summary: 'A tool that explains code snippets clearly with syntax-aware, beginner-friendly explanations.',
      stack: ['JavaScript', 'HTML', 'CSS', 'AI', 'Syntax Highlighting'],
      status: 'prototype',
      repo: 'github.com/BahrouniAyoub/AI-Code-Explainer',
    },
    {
      name: 'CodeQuest - Byte Blades Academy',
      type: 'Gamified Learning Platform',
      summary: 'A retro RPG coding platform with quests, XP, validation, guilds, and a Phaser.js game world.',
      stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Phaser.js', 'Tailwind CSS'],
      status: 'active build',
      repo: 'github.com/BahrouniAyoub/byte-blades-academy',
    },
    {
      name: 'Customer Churn Prediction',
      type: 'Machine Learning Pipeline',
      summary: 'An end-to-end churn prediction pipeline with custom feature selection and CatBoost reaching 84.2% AUC.',
      stack: ['Python', 'scikit-learn', 'CatBoost', 'XGBoost', 'Data Analysis', 'Feature Engineering'],
      status: 'completed',
      repo: 'github.com/BahrouniAyoub/customer-churn-prediction',
    },
    {
      name: 'Resume Builder',
      type: 'Full Stack App',
      summary: 'A multi-step resume creation app with template previews, dashboard management, and planned AI resume enhancement.',
      stack: ['React', 'Vite', 'Tailwind CSS', 'Redux', 'React Router', 'Node.js', 'Express', 'MongoDB'],
      status: 'in progress',
      repo: 'github.com/BahrouniAyoub/resume-builder',
    },
  ],
  experience: {
    items: [
      {
        role: 'IoT & Software Development Intern',
        company: 'Tunisie Telecom',
        period: 'Mar 2025 - Jun 2025',
        focus: 'Smart irrigation with IoT sensors, ESP32, AI models, real-time monitoring, Flutter, Node.js, MongoDB, and MQTT.',
      },
      {
        role: 'IoT Virtual Assistant Intern',
        company: 'Tak-Tik',
        period: 'May 2023 - Aug 2023',
        focus: 'Tunisian Sign Language accessibility assistant using IoT, AI, Computer Vision, and NLP.',
      },
    ],
    source: { label: 'experience.ts', fileId: 'experience' } as AssistantSource,
  },
  contact: {
    email: 'bahrouni.ayoub2003@gmail.com',
    linkedin: 'linkedin.com/in/ayoub-bahrouni',
    github: 'github.com/BahrouniAyoub',
    medium: 'medium.com/@BahrouniAyoub',
    source: { label: 'contact.ts', fileId: 'contact' } as AssistantSource,
  },
  resume: {
    label: 'Ayoub_Bahrouni_Resume.pdf',
    href: '/Ayoub resume.pdf',
    source: { label: 'Ayoub resume.pdf', fileId: 'resume' } as AssistantSource,
  },
};

export const projectSource: AssistantSource = { label: 'projects.json', fileId: 'projects' };
