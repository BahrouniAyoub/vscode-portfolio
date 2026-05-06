const experiences = [
  { period: 'Mar 2025 - Jun 2025', role: 'IoT & Software Development Intern', company: 'Tunisie Telecom', description: 'Developed a smart irrigation system using IoT sensors, ESP32, and AI models for predictive water management.', tags: ['ESP32', 'MQTT', 'IoT', 'Flutter', 'Node.js', 'MongoDB', 'AI'] },
  { period: 'May 2023 - Aug 2023', role: 'IoT Virtual Assistant Intern', company: 'Tak-Tik', description: 'Contributed to an IoT-based virtual assistant supporting Tunisian Sign Language interaction and accessibility.', tags: ['IoT', 'AI', 'Accessibility', 'Computer Vision', 'NLP'] },
];

const ExperiencePreview = () => (
  <div className="px-6 py-8 md:px-12 md:py-12 max-w-[940px] w-full font-code">
    <p className="italic text-[14px] text-vsc-comment mb-3">// experience.ts - professional journey</p>
    <h1 className="text-[35px] font-extrabold text-foreground tracking-tight mb-1">Experience</h1>
    <p className="text-muted-foreground text-[14px] mb-8">interface Career extends Timeline {'{'}</p>
    <div className="pl-3 border-l border-border">
      {experiences.map((exp) => (
        <div key={`${exp.role}-${exp.period}`} className="relative pl-5 mb-9">
          <div className="absolute -left-[4.5px] top-2 w-[9px] h-[9px] rounded-full bg-vscode-border ring-4 ring-background" />
          <div className="text-[14px] text-muted-foreground tracking-wide mb-1.5">{exp.period}</div>
          <h2 className="text-[20px] font-extrabold text-foreground mb-0.5">{exp.role}</h2>
          <div className="text-[14px] text-vscode-blue mb-2.5">@ {exp.company}</div>
          <p className="text-[14px] text-muted-foreground leading-[1.8] mb-3">{exp.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {exp.tags.map((tag) => <span key={tag} className="text-[12px] px-1.5 py-0.5 rounded-sm text-vscode-blue border border-vscode-blue2/25 bg-vscode-blue2/[0.08]">{tag}</span>)}
          </div>
        </div>
      ))}
    </div>
    <p className="text-muted-foreground text-[14px] mt-8">{'}'}</p>
  </div>
);

export default ExperiencePreview;
