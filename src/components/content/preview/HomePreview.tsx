import { FileId, socialLinks } from '@/data/portfolio';
import { FolderOpen, Github, Linkedin, Mail, PenLine, BarChart3, Zap, Instagram, Youtube, User, type LucideIcon } from 'lucide-react';
import TypewriterText from '../../TypewriterText';

const socialIconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  'pen-line': PenLine,
  'bar-chart-3': BarChart3,
  zap: Zap,
  instagram: Instagram,
  mail: Mail,
  youtube: Youtube,
};

const HomePreview = ({ onFileSelect }: { onFileSelect: (id: FileId) => void }) => (
  <div className="p-8 max-w-4xl">
    <p className="font-code text-vsc-comment text-sm mb-6">{'// hello world !! Welcome to my portfolio'}</p>
    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-2">
      <span className="text-foreground">Ayoub</span>
      <br />
      <span className="text-primary font-extrabold">Bahrouni.</span>
    </h1>
    <div className="flex flex-wrap gap-2 mt-4 mb-4">
      {['Full Stack Development', 'AI / ML Dev', 'Open To Work'].map((role) => (
        <span key={role} className="flex items-center gap-2 px-3 py-1 border border-border rounded-full text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-vscode-blue" />
          {role}
        </span>
      ))}
      <span className="flex items-center gap-2 px-3 py-1 border border-vscode-blue rounded-full text-sm text-vscode-blue">
        <span className="w-2 h-2 rounded-full bg-vscode-blue" />
        @ Esprit
      </span>
    </div>
    <TypewriterText />
    <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-2xl">
      I live at the crossroads of <strong className="text-vscode-blue">Full Stack development</strong>,{' '}
      <strong className="text-vscode-blue">AI/ML</strong>, and <strong className="text-vscode-blue">Mobile development</strong>.
      I build systems that are genuinely <strong className="text-vscode-blue">intelligent and scalable</strong>.
    </p>
    <div className="flex flex-wrap gap-3 mb-8">
      <button onClick={() => onFileSelect('projects')} className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
        <FolderOpen size={14} strokeWidth={1.5} /> Projects
      </button>
      <button onClick={() => onFileSelect('about')} className="flex items-center gap-2 px-5 py-2 border-2 border-border text-foreground text-sm font-medium hover:bg-secondary/50 transition-colors">
        <User size={14} strokeWidth={1.5} /> About Me
      </button>
      <button onClick={() => onFileSelect('contact')} className="flex items-center gap-2 px-5 py-2 border-2 border-border text-foreground text-sm font-medium hover:bg-secondary/50 transition-colors">
        <Mail size={14} strokeWidth={1.5} /> Contact
      </button>
    </div>
    <div className="stats-glow rounded-lg p-6 flex flex-wrap justify-around gap-6 mb-8">
      {[['3+', 'Years'], ['10+', 'Projects'], ['∞', 'Curiosity'], ['↑', 'Always Learning']].map(([value, label]) => (
        <div key={label} className="text-center">
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
        </div>
      ))}
    </div>
    <div className="flex flex-wrap gap-2">
      {socialLinks.map((link) => {
        const Icon = socialIconMap[link.lucideIcon];
        return (
          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 border border-border rounded text-xs text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-colors">
            {Icon && <Icon size={13} strokeWidth={1.5} />}
            {link.name}
          </a>
        );
      })}
    </div>
  </div>
);

export default HomePreview;
