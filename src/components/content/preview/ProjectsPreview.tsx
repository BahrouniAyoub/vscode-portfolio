import type { CSSProperties } from 'react';

const projects = [
  { title: 'PagePal', category: 'AI · Voice · Full Stack', description: 'Transforms PDF books into natural voice narration with user libraries and subscription-aware usage tracking.', tags: ['Next.js', 'MongoDB', 'Vapi AI', 'TypeScript'], accent: '#d2a8ff' },
  { title: 'CodeSage', category: 'AI · Developer Tool', description: 'Explains code snippets clearly with syntax-aware, beginner-friendly explanations.', tags: ['JavaScript', 'AI', 'HTML', 'CSS'], accent: '#7c5cff' },
  { title: 'CodeQuest', category: 'Gamified Learning', description: 'Retro RPG coding platform with quests, XP, validation, guilds, and a game world.', tags: ['React', 'TypeScript', 'Phaser.js', 'PostgreSQL'], accent: '#4ec9b0' },
  { title: 'Customer Churn Prediction', category: 'Machine Learning', description: 'End-to-end ML pipeline with custom feature selection and CatBoost AUC of 84.2%.', tags: ['Python', 'CatBoost', 'scikit-learn', 'XGBoost'], accent: '#f59e0b' },
  { title: 'Resume Builder', category: 'Full Stack App', description: 'Multi-step resume creation flow with template previews and dashboard management.', tags: ['React', 'Vite', 'Node.js', 'MongoDB'], accent: '#4fc1ff' },
];

const ProjectsPreview = ({ aiMode = false }: { aiMode?: boolean }) => (
  <div className="w-full max-w-[1040px] px-4 py-6 sm:px-6 md:p-8 overflow-x-hidden">
    <p className="text-xs italic text-vsc-comment mb-2">// projects.json — selected builds</p>
    <h1 className="text-[28px] md:text-[35px] font-bold text-foreground leading-tight">Projects</h1>
    <p className="text-xs text-vsc-comment mt-1 mb-8">// practical apps, AI experiments, and full-stack systems</p>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {projects.map((project) => {
        const isAiProject = /ai|ml|machine/i.test(`${project.category} ${project.title}`);
        return (
          <div
            key={project.title}
            className="project-card group relative min-w-0 overflow-hidden rounded-sm p-4 sm:p-5 bg-white/[0.02] border border-border hover:bg-white/[0.035] transition-colors"
            style={{
              '--card-accent': project.accent,
              boxShadow: aiMode && isAiProject ? 'inset 0 0 0 1px rgba(163,113,247,0.55)' : undefined,
            } as CSSProperties}
          >
            <div className="absolute left-0 top-0 h-[2px] w-0 opacity-70 transition-[width,opacity] duration-300 ease-out group-hover:w-full group-hover:opacity-100" style={{ background: 'var(--card-accent)', boxShadow: '0 0 6px var(--card-accent)' }} />
            <div className="text-[11px] uppercase tracking-[0.18em] mb-2 break-words" style={{ color: project.accent }}>{project.category}</div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2 break-words">{project.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 break-words">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => <span key={tag} className="text-[11px] px-2 py-1 rounded border border-border text-muted-foreground bg-white/[0.025]">{tag}</span>)}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default ProjectsPreview;
