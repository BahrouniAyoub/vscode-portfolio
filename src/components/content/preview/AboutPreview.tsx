const focusItems = [
  'Building Full Stack systems & AI integrations.',
  'Deep interest in NLP, LLMs & ML pipelines.',
  'Currently exploring RAG, MLOps & Vector Databases.',
  'Making data stories non-data people actually get.',
];

const AboutPreview = () => (
  <div className="w-full max-w-[940px] px-4 py-6 sm:px-6 md:px-12 md:py-12 overflow-x-hidden">
    <p className="font-code text-vsc-comment text-sm mb-6">// about.ts - Ayoub Bahrouni</p>
    <h1 className="font-bold text-[28px] md:text-[40px] tracking-tight mb-1 text-foreground">About Me</h1>
    <p className="font-code text-vsc-comment text-sm mb-6">// who I am · what I do · where I build</p>
    <div className="rounded p-4 sm:p-6 mb-5 bg-white/[0.025] border border-border">
      <p className="text-[13px] leading-[1.9] text-muted-foreground">
        Hi! I'm <strong className="text-vscode-blue">Ayoub Bahrouni</strong>, a software developer living at the crossroads of{' '}
        <strong className="text-vscode-blue">Full Stack development</strong>, <strong className="text-vscode-blue">AI/ML</strong>, and{' '}
        <strong className="text-vscode-blue">Mobile development</strong>. I love building systems that are intelligent, scalable, and useful.
      </p>
    </div>
    <div className="rounded p-4 sm:p-5 mb-6 bg-white/[0.025] border border-border">
      <h2 className="uppercase font-bold text-[18px] mb-3 text-vsc-green tracking-[0.2em]">Current Focus</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
        {focusItems.map((item) => <div key={item} className="text-[12px] leading-relaxed text-muted-foreground">→ {item}</div>)}
      </div>
    </div>
    <h2 className="uppercase font-bold text-[18px] mb-3 text-vsc-green tracking-[0.2em]">Education</h2>
    <div className="space-y-3">
      <div className="rounded p-5 bg-white/[0.025] border border-border">
        <div className="flex flex-wrap justify-between gap-2 sm:gap-4"><strong className="text-foreground">Faculty of Sciences of Tunis</strong><span className="text-muted-foreground">2022 - 2025</span></div>
        <p className="text-vscode-blue text-xs mt-1">Computer Engineering · IoT & Embedded Systems</p>
      </div>
      <div className="rounded p-5 bg-white/[0.025] border border-border">
        <div className="flex flex-wrap justify-between gap-2 sm:gap-4"><strong className="text-foreground">3W Academy</strong><span className="text-muted-foreground">2024</span></div>
        <p className="text-vscode-blue text-xs mt-1">Full-Stack Web Development Certificate</p>
      </div>
    </div>
  </div>
);

export default AboutPreview;
