import type { ReactNode } from 'react';

interface CodeFileProps {
  lines: ReactNode[];
  className?: string;
}

const CodeFile = ({ lines, className = '' }: CodeFileProps) => {
  return (
    <div className={`min-w-full overflow-auto bg-vsc-editor font-code text-[13px] leading-6 ${className}`}>
      <div className="py-4 pr-8">
        {lines.map((line, index) => (
          <div key={index} className="flex min-w-max hover:bg-white/[0.025]">
            <span className="w-12 shrink-0 select-none pr-4 text-right text-vsc-line-number">
              {index + 1}
            </span>
            <pre className="m-0 whitespace-pre text-[#d4d4d4]">
              <code>{line || ' '}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeFile;
