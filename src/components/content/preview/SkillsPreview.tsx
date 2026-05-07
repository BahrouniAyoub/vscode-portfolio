import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  pct: number;
  color: string;
}

interface Category {
  title: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python', pct: 92, color: '236,64,122' },
      { name: 'Java', pct: 72, color: '255,152,0' },
      { name: 'JavaScript', pct: 78, color: '255,213,79' },
      { name: 'TypeScript', pct: 74, color: '66,165,245' },
      { name: 'SQL', pct: 88, color: '186,104,200' },
    ],
  },
  {
    title: 'Generative AI & LLM Engineering',
    skills: [
      { name: 'LangChain', pct: 82, color: '0,200,83' },
      { name: 'LangGraph', pct: 78, color: '0,200,83' },
      { name: 'RAG Pipelines', pct: 85, color: '0,200,83' },
      { name: 'Prompt Engineering', pct: 90, color: '0,200,83' },
      { name: 'Agentic Workflows', pct: 80, color: '0,200,83' },
      { name: 'HF Transformers', pct: 83, color: '0,200,83' },
    ],
  },
  {
    title: 'AI · ML · Data Science',
    skills: [
      { name: 'PyTorch', pct: 85, color: '255,87,34' },
      { name: 'TensorFlow', pct: 80, color: '255,87,34' },
      { name: 'scikit-learn', pct: 90, color: '255,87,34' },
      { name: 'Pandas', pct: 88, color: '255,87,34' },
      { name: 'NumPy', pct: 86, color: '255,87,34' },
      { name: 'spaCy', pct: 80, color: '255,87,34' },
      { name: 'NLTK', pct: 75, color: '255,87,34' },
    ],
  },
  {
    title: 'Backend & APIs',
    skills: [
      { name: 'FastAPI', pct: 90, color: '0,188,212' },
      { name: 'Flask', pct: 82, color: '0,188,212' },
      { name: 'Django', pct: 76, color: '0,188,212' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', pct: 85, color: '100,181,246' },
      { name: 'Redis', pct: 72, color: '100,181,246' },
      { name: 'Neo4j', pct: 80, color: '100,181,246' },
    ],
  },
  {
    title: 'Vector Databases',
    skills: [
      { name: 'FAISS', pct: 82, color: '178,137,234' },
      { name: 'Pinecone', pct: 78, color: '178,137,234' },
    ],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'Docker', pct: 80, color: '38,166,154' },
      { name: 'Git', pct: 90, color: '38,166,154' },
      { name: 'Linux', pct: 88, color: '38,166,154' },
      { name: 'AWS', pct: 74, color: '38,166,154' },
      { name: 'GitHub Actions', pct: 80, color: '38,166,154' },
      { name: 'Jupyter', pct: 85, color: '38,166,154' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', pct: 80, color: '97,218,251' },
      { name: 'Next.js', pct: 72, color: '97,218,251' },
      { name: 'TailwindCSS', pct: 85, color: '97,218,251' },
      { name: 'Responsive Design', pct: 88, color: '97,218,251' },
    ],
  },
  {
    title: 'Design',
    skills: [
      { name: 'Figma', pct: 78, color: '244,143,177' },
      { name: 'UX Prototyping', pct: 75, color: '244,143,177' },
    ],
  },
  {
    title: 'Data Analytics',
    skills: [
      { name: 'Tableau', pct: 72, color: '255,183,77' },
      { name: 'Power BI', pct: 74, color: '255,183,77' },
    ],
  },
];

const familiarTags = [
  'Pandas', 'NumPy', 'Matplotlib', 'spaCy', 'NLTK', 'Jupyter', 'RAG',
  'FAISS', 'Pinecone', 'LangGraph', 'OpenAI API', 'Tableau', 'Power BI',
  'Figma', 'JIRA', 'MLOps', 'LLM Fine-tuning', 'Vector DBs',
];

const CategoryBlock = ({ cat, delay, aiMode = false }: { cat: Category; delay: number; aiMode?: boolean }) => {
  const [visible, setVisible] = useState(false);
  const [animateBars, setAnimateBars] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setAnimateBars(true), 100);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const isAiCategory = /ai|ml|llm|rag|agent/i.test(cat.title);

  return (
    <div
      ref={ref}
      className="transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        boxShadow: aiMode && isAiCategory ? 'inset 0 0 0 1px rgba(163,113,247,0.45)' : 'none',
        borderRadius: aiMode && isAiCategory ? '4px' : undefined,
        padding: aiMode && isAiCategory ? '8px' : undefined,
      }}
    >
      <h3
        className="text-xs font-semibold uppercase mb-3 pb-1.5 border-b border-[hsl(var(--border))]"
        style={{ letterSpacing: '0.2em', color: 'hsl(50,100%,70%)' }}
      >
        {cat.title}
      </h3>
      <div className="space-y-2">
        {cat.skills.map((skill) => (
          <div key={skill.name} className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span className="min-w-0 text-xs text-[hsl(220,13%,75%)] w-[96px] sm:w-[112px] shrink-0 truncate">
              {skill.name}
            </span>
            <div className="min-w-0 flex-1 h-[2px] rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: animateBars ? `${skill.pct}%` : '0%',
                  backgroundColor: `rgb(${skill.color})`,
                  transition: 'width 1400ms ease-out',
                }}
              />
            </div>
            <span className="text-[10px] w-8 text-right shrink-0" style={{ color: `rgb(${skill.color})` }}>
              {skill.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillsPreview = ({ aiMode = false }: { aiMode?: boolean }) => {
  return (
    <div className="w-full px-4 py-6 sm:px-6 md:p-8 flex justify-center overflow-x-hidden">
      <div className="w-full max-w-full" style={{ maxWidth: 940 }}>
        <p className="text-xs italic text-vsc-comment mb-2">
          {'// skills.json — tech stack & tools I actually use'}
        </p>
        <h1 className="text-[28px] md:text-[35px] font-bold text-foreground leading-tight" style={{ letterSpacing: '-0.02em' }}>
          Skills
        </h1>
        <p className="text-xs text-vsc-comment mt-1 mb-8">
          {'{ "status": "always_learning", "passion": "immeasurable" }'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
          {categories.map((cat, i) => (
            <CategoryBlock key={cat.title} cat={cat} delay={i * 80} aiMode={aiMode} />
          ))}
        </div>

        <div className="mt-10">
          <h3
            className="text-xs font-semibold uppercase mb-3 pb-1.5 border-b border-[hsl(var(--border))]"
            style={{ letterSpacing: '0.2em', color: 'hsl(50,100%,70%)' }}
          >
            Also Familiar With
          </h3>
          <div className="flex flex-wrap gap-2">
            {familiarTags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-1 rounded-sm border border-border text-muted-foreground bg-white/[0.02] hover:text-foreground hover:border-primary/40 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPreview;
