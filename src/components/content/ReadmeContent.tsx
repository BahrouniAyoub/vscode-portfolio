import React from 'react';

const CodeTag = ({ children }: { children: string }) => (
  <code
    className="px-2 py-px rounded-sm text-[12px] mx-0.5"
    style={{ background: 'rgba(255,255,255,0.07)', color: 'hsl(var(--vsc-orange))' }}
  >
    {children}
  </code>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="font-bold text-[24px] md:text-[30px] text-foreground border-b border-border pb-2 mb-3"
  >
    {children}
  </h2>
);

const badges = [
 { label: 'Python', color: '59,130,246', bg: 'rgba(59,130,246,0.1)', icon: '🐍' },
{ label: 'TypeScript', color: '100,149,237', bg: 'rgba(100,149,237,0.1)', icon: 'TS' },
{ label: 'FastAPI', color: '75,207,170', bg: 'rgba(75,207,170,0.1)', icon: '⚡' },
{ label: 'LangChain', color: '168,85,247', bg: 'rgba(168,85,247,0.1)', icon: '🔗' },
{ label: 'PyTorch', color: '249,115,22', bg: 'rgba(249,115,22,0.1)', icon: '🔥' },
];

const stack: { label: string; items: string[] }[] = [
  { label: 'Languages', items: ['Python', 'TypeScript', 'SQL', 'JavaScript', 'Java'] },
  { label: 'AI / ML', items: ['PyTorch', 'LangChain', 'HuggingFace', 'scikit-learn', 'TensorFlow'] },
  { label: 'Backend', items: ['FastAPI', 'Flask', 'Django', 'PostgreSQL', 'Redis'] },
  { label: 'DevOps', items: ['Docker', 'AWS', 'Linux', 'Git'] },
];

const aboutItems = [
  { icon: '🔭', pre: 'Building scalable ', highlight: 'AI integrations', post: ' at EduVanceAI' },
  { icon: '🤖', pre: '', highlight: 'NLP, LLMs, RAG pipelines, Vector DBs', post: '' },
  { icon: '⚡', pre: 'Making ', highlight: 'data stories', post: ' non-data people get' },
  { icon: '✨', pre: '', highlight: 'Always learning, always shipping', post: '' },
];

const connectItems = [
  { label: 'Email', value: 'bahrouni.ayoub2003@gmail.com' },
  { label: 'GitHub', value: 'BahrouniAyoub' },
  { label: 'LinkedIn', value: 'bahrouni-ayoub' },
  // { label: 'Tableau', value: 'bahrouni.ayoub' },
];

const ReadmeContent = () => {
  return (
    <div className="overflow-y-auto overflow-x-hidden h-full w-full">
      <div className="w-full max-w-[760px] px-4 py-6 sm:px-6 md:px-12 md:py-12">

        {/* Header */}
        <h1
          className="font-display font-extrabold text-[28px] md:text-[35px] text-foreground border-b border-border pb-[10px] mb-[12px]"
        >
          Bahrouni Ayoub
        </h1>

        <p className="text-muted-foreground mb-[10px]" style={{ fontSize: 14 }}>
          AI Engineer @ Esprit · Tunisia 🇹🇳
        </p>

        {/* Skill Badges */}
        <div className="flex flex-wrap gap-1 mb-4">
          {badges.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-[12px] border"
              style={{
                color: `rgb(${b.color})`,
                borderColor: `rgba(${b.color},0.35)`,
                background: b.bg,
              }}
            >
              <span>{b.icon}</span>
              {b.label}
            </span>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-border my-4" />

        {/* About Section */}
        <div className="mb-8">
          <h3 className="text-[16px] font-bold text-foreground mb-3">💜 About</h3>
          <p className="text-muted-foreground leading-[1.8] mb-4" style={{ fontSize: 14 }}>
            Hi, Ayoub on this side! I am an aspiring computer engineer and am curious to learn new things about life every day! Perfection is something I always aim for. Being big on integrity and authenticity is something I always believe in. I enjoy painting, photography, designing, and editing. Growing up, I have always loved spending quality time making music on the keyboard. Glad to see you, cheers!
          </p>
          <ul className="space-y-1.5 text-[13px] text-muted-foreground" style={{ paddingLeft: 24 }}>
            {aboutItems.map((item, i) => (
              <li key={i}>
                {item.icon}{' '}{item.pre}
                <span className="text-foreground font-medium">{item.highlight}</span>
                {item.post}
              </li>
            ))}
          </ul>
        </div>

        {/* Stack Section */}
        <div className="mb-8">
          <SectionHeading>Stack</SectionHeading>
          <div className="space-y-1" style={{ fontSize: 14, lineHeight: 1.8 }}>
            {stack.map(({ label, items }) => (
              <div key={label} className="text-muted-foreground break-words">
                <span className="text-foreground font-bold">{label}: </span>
                {items.map((item) => (
                  <CodeTag key={item}>{item}</CodeTag>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Connect Section */}
        <div className="mb-10">
          <SectionHeading>Connect</SectionHeading>
          <ul className="space-y-1.5 text-muted-foreground" style={{ paddingLeft: 20, fontSize: 14 }}>
            {connectItems.map(({ label, value }) => (
              <li key={label}>
                {label}:{' '}
                <span className="text-foreground font-medium">{value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-muted-foreground border-t border-border pt-4">
          Made with 🔥 by Ayoub · 2026
        </p>

      </div>
    </div>
  );
};

export default ReadmeContent;
