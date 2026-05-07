import { useMemo } from 'react';
import { BarChart3, Check } from 'lucide-react';
import { projects } from '@/data/portfolio';

const StatsPanel = () => {
  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const frontendProjects = projects.filter((p) =>
      p.tech.some((t) => ['React', 'Vue', 'Angular', 'Svelte'].includes(t))
    ).length;
    const backendProjects = projects.filter((p) =>
      p.tech.some((t) => ['FastAPI', 'Flask', 'Node.js', 'Django', 'Express'].includes(t))
    ).length;
    const aiProjects = projects.filter((p) =>
      p.tech.some((t) =>
        ['Python', 'TensorFlow', 'PyTorch', 'LangChain', 'Transformers'].includes(t)
      )
    ).length;

    return {
      totalProjects,
      frontendProjects,
      backendProjects,
      aiProjects,
      totalSkills: 50,
    };
  }, []);

  const statCards = [
    { label: 'Total Projects', value: stats.totalProjects, icon: '📦' },
    { label: 'AI Projects', value: stats.aiProjects, icon: '🤖' },
    { label: 'Frontend Projects', value: stats.frontendProjects, icon: '🎨' },
    { label: 'Backend Projects', value: stats.backendProjects, icon: '⚙️' },
    { label: 'Total Skills', value: stats.totalSkills, icon: '🛠️' },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-vsc-editor">
      {/* Header */}
      <div className="px-4 py-5 sm:px-8 sm:py-6 border-b border-border">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded bg-primary/20">
            <BarChart3 size={24} className="text-primary" strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground break-words">Portfolio Stats</h1>
            <p className="text-sm text-muted-foreground mt-1">Overview of portfolio metrics and achievements.</p>
            <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-vsc-green/20 text-vsc-green rounded text-xs font-medium">
              <Check size={12} /> Installed
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 sm:px-8 sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {statCards.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 border border-border rounded bg-secondary/20 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                </div>
                <div className="text-2xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Link */}
        <div className="mt-6 p-4 bg-vsc-sidebar border border-border rounded">
          <p className="text-sm text-muted-foreground mb-3">Learn more about projects on GitHub:</p>
          <a
            href="https://github.com/BahrouniAyoub"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Visit GitHub Profile →
          </a>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
