import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, ChevronDown, ChevronRight, ExternalLink, GitBranch, GitCommitHorizontal, GitPullRequest, RefreshCw, Radio, Terminal, X } from 'lucide-react';
import { FileId } from '@/data/portfolio';
import { ChangedFileEntry, CommitEntry, changedFiles, commitHistory, commitTypeStyles, liveCommitMessages } from '@/data/sourceControl';
import { useGitHubStats } from '@/hooks/useGitHubStats';

interface SourceControlPanelProps {
  isOpen: boolean;
  onFileSelect: (id: FileId) => void;
}

type TerminalLineKind = 'command' | 'output' | 'success';

interface TerminalLineData {
  id: string;
  kind: TerminalLineKind;
  text: string;
}

const statusClasses = {
  M: 'text-vsc-yellow border-vsc-yellow/30 bg-vsc-yellow/10',
  A: 'text-vsc-green border-vsc-green/30 bg-vsc-green/10',
  D: 'text-vsc-red border-vsc-red/30 bg-vsc-red/10',
};

const terminalPresets: Record<string, string[]> = {
  'git status': ['On branch main', 'Your branch is ahead of origin/main by 3 commits.', 'Changes not staged for commit:', '  modified: portfolio.tsx', '  modified: ai-assistant.ts'],
  'git log': commitHistory.slice(0, 4).map((commit) => `${commit.hash} ${commit.message} (${commit.timestamp})`),
  'git branch': ['* main', '  feature/source-control-workspace', '  experiment/rag-assistant'],
  'git commit -m "feat: added AI chatbot"': ['[main b91e7ac] feat: added AI chatbot', ' 2 files changed, 148 insertions(+)'],
  'git push': ['Enumerating objects: 18, done.', 'Compressing objects: 100% (12/12), done.', 'Writing objects: 100% (18/18), 24.2 KiB | 4.8 MiB/s, done.', '[OK] Push successful.'],
  'npm run dev': ['VITE v5.4.19 ready in 418 ms', 'Local: http://localhost:5173/', 'press h + enter to show help'],
  'docker compose up': ['[+] Running 3/3', 'api-1 healthy', 'postgres-1 accepting connections', 'worker-1 processing git telemetry'],
};

const commands = Object.keys(terminalPresets);

const MotionDiv = motion.div;

const SourceControlPanel = ({ isOpen, onFileSelect }: SourceControlPanelProps) => {
  const prefersReducedMotion = useReducedMotion();
  const { data, loading, error, refreshing, refresh } = useGitHubStats('BahrouniAyoub');
  const [commits, setCommits] = useState(commitHistory);
  const [expandedCommit, setExpandedCommit] = useState<string | null>(commitHistory[0]?.id ?? null);
  const [selectedFile, setSelectedFile] = useState<ChangedFileEntry | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [lines, setLines] = useState<TerminalLineData[]>([
    { id: 'welcome', kind: 'success', text: 'Git workspace ready. Try git status, git log, git push, npm run dev.' },
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const animation = useMemo(() => prefersReducedMotion ? { duration: 0 } : { duration: 0.22, ease: 'easeOut' as const }, [prefersReducedMotion]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [lines, prefersReducedMotion]);

  useEffect(() => {
    if (!isOpen) return;
    const interval = window.setInterval(() => {
      const next = liveCommitMessages[Math.floor(Math.random() * liveCommitMessages.length)];
      const unique = { ...next, id: `${next.id}-${Date.now()}` };
      setCommits((prev) => [unique, ...prev.slice(0, 8)]);
      setLines((prev) => [...prev, { id: `live-cmd-${Date.now()}`, kind: 'command', text: `git commit -m "${next.message}"` }, { id: `live-ok-${Date.now()}`, kind: 'success', text: `[${next.hash}] Commit pushed successfully` }]);
      setToast('Commit pushed successfully');
      window.setTimeout(() => setToast(null), 3200);
    }, 30000);
    return () => window.clearInterval(interval);
  }, [isOpen]);

  const appendCommand = (command: string, output = terminalPresets[command] ?? [`Command simulated: ${command}`]) => {
    const stamp = Date.now();
    setLines((prev) => [
      ...prev,
      { id: `cmd-${stamp}`, kind: 'command', text: command },
      ...output.map((text, index) => ({ id: `out-${stamp}-${index}`, kind: text.includes('[OK]') || text.includes('successful') ? 'success' as const : 'output' as const, text })),
    ]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const command = input.trim();
    if (!command) return;
    appendCommand(command);
    setInput('');
  };

  const handleCommitClick = (commit: CommitEntry) => {
    setExpandedCommit((prev) => prev === commit.id ? null : commit.id);
    appendCommand(`git show --stat ${commit.hash}`, [`commit ${commit.hash}`, commit.description, `${commit.files.length} files changed`, ...commit.files.map((file) => `  ${file}`)]);
  };

  const handleFileClick = (file: ChangedFileEntry) => {
    setSelectedFile(file);
    onFileSelect(file.fileId);
    appendCommand(`git diff -- ${file.path}`, [`${file.status} ${file.path}`, file.description, `tech: ${file.tech.join(', ')}`]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed left-10 top-8 bottom-5 z-40 w-[min(380px,calc(100vw-40px))] bg-vsc-sidebar border-r border-border flex flex-col shrink-0 overflow-hidden shadow-2xl md:static md:inset-auto md:z-auto md:w-[360px] md:shadow-none">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Source Control</p>
          <p className="text-[10px] text-vsc-comment">GitHub-backed developer workspace</p>
        </div>
        <button onClick={refresh} className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground focus:outline-none focus:ring-1 focus:ring-primary" aria-label="Refresh GitHub stats">
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 space-y-3">
        <GitHubStats loading={loading} error={error} data={data} />
        <BranchStatusBar />
        <CommitTimeline commits={commits} expandedCommit={expandedCommit} onCommitClick={handleCommitClick} animation={animation} />
        <ChangedFilesPanel files={changedFiles} onFileClick={handleFileClick} animation={animation} />
        <GitTerminal lines={lines} input={input} setInput={setInput} onSubmit={handleSubmit} endRef={terminalEndRef} />
      </div>

      <div className="border-t border-border px-3 py-2 text-[10px] text-muted-foreground flex items-center justify-between gap-2 bg-vsc-editor/50">
        <span className="inline-flex items-center gap-1 min-w-0"><Radio size={11} className="text-vsc-green" /> live activity</span>
        <span className="truncate">last commit pushed 2m ago</span>
      </div>

      <AnimatePresence>
        {toast && (
          <MotionDiv initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={animation} className="absolute right-3 bottom-12 rounded border border-vsc-green/30 bg-vsc-editor px-3 py-2 text-[11px] text-vsc-green shadow-xl">
            <CheckCircle2 size={12} className="inline mr-1" /> {toast}
          </MotionDiv>
        )}
      </AnimatePresence>

      <FilePreviewModal file={selectedFile} onClose={() => setSelectedFile(null)} animation={animation} />
    </div>
  );
};

const Section = ({ title, count, children }: { title: string; count?: number; children: React.ReactNode }) => (
  <section className="rounded border border-border bg-vsc-editor/35 overflow-hidden">
    <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-border bg-vsc-tab-inactive/70">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{title}</span>
      {typeof count === 'number' && <span className="text-[10px] text-muted-foreground">{count}</span>}
    </div>
    {children}
  </section>
);

const GitHubStats = ({ loading, error, data }: { loading: boolean; error: string | null; data: ReturnType<typeof useGitHubStats>['data'] }) => (
  <Section title="GitHub Stats">
    {loading && !data ? (
      <div className="p-3 space-y-2 animate-pulse">
        <div className="h-10 rounded bg-secondary/60" />
        <div className="grid grid-cols-3 gap-2">{[1, 2, 3].map((item) => <div key={item} className="h-9 rounded bg-secondary/50" />)}</div>
      </div>
    ) : error && !data ? (
      <div className="p-3 text-[11px] text-vsc-yellow">{error}. Showing local Git story.</div>
    ) : data ? (
      <div className="p-3 space-y-3">
        <div className="flex min-w-0 items-center gap-3">
          <img src={data.user.avatar_url} alt="GitHub avatar" className="h-10 w-10 rounded-full border border-border" />
          <div className="min-w-0">
            <a href={data.user.html_url} target="_blank" rel="noreferrer" className="block truncate text-[12px] font-semibold text-foreground hover:text-primary">{data.user.name ?? 'BahrouniAyoub'}</a>
            <p className="line-clamp-2 text-[10px] text-muted-foreground">{data.user.bio ?? 'Full-stack, AI/ML, and IoT developer.'}</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1.5 text-center">
          <Metric label="repos" value={data.user.public_repos} />
          <Metric label="stars" value={data.totalStars} />
          <Metric label="followers" value={data.user.followers} />
          <Metric label="following" value={data.user.following} />
        </div>
        <div className="space-y-1.5">
          {data.languages.map((lang) => <LanguageBar key={lang.name} name={lang.name} pct={lang.pct} />)}
        </div>
        <div className="space-y-1">
          {data.recentRepos.slice(0, 3).map((repo) => (
            <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="flex min-w-0 items-center justify-between gap-2 rounded px-2 py-1 text-[10px] text-muted-foreground hover:bg-secondary/40 hover:text-foreground">
              <span className="truncate">{repo.name}</span><span className="shrink-0">★ {repo.stargazers_count}</span>
            </a>
          ))}
        </div>
      </div>
    ) : null}
  </Section>
);

const Metric = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded border border-border bg-secondary/20 px-1 py-1.5">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[13px] font-bold text-foreground">{value}</motion.div>
    <div className="text-[9px] text-muted-foreground">{label}</div>
  </div>
);

const LanguageBar = ({ name, pct }: { name: string; pct: number }) => (
  <div>
    <div className="mb-0.5 flex justify-between text-[10px]"><span className="text-muted-foreground">{name}</span><span className="text-muted-foreground">{pct}%</span></div>
    <div className="h-1 rounded bg-secondary/60"><motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className="h-full rounded bg-primary" /></div>
  </div>
);

const BranchStatusBar = () => (
  <Section title="Repository">
    <div className="p-2.5 grid grid-cols-2 gap-2 text-[11px]">
      <div className="rounded border border-border bg-secondary/20 p-2"><GitBranch size={13} className="inline mr-1 text-vscode-blue" /> main</div>
      <div className="rounded border border-border bg-secondary/20 p-2">portfolio-vscode</div>
      <div className="rounded border border-border bg-secondary/20 p-2 text-vsc-green">↑ 3 pushed</div>
      <div className="rounded border border-border bg-secondary/20 p-2 text-muted-foreground">↓ 0 behind</div>
      <div className="col-span-2 rounded border border-vsc-green/25 bg-vsc-green/10 p-2 text-vsc-green"><GitPullRequest size={13} className="inline mr-1" /> deployment healthy · last pushed 2m ago</div>
    </div>
  </Section>
);

const CommitTimeline = ({ commits, expandedCommit, onCommitClick, animation }: { commits: CommitEntry[]; expandedCommit: string | null; onCommitClick: (commit: CommitEntry) => void; animation: { duration: number; ease?: string } }) => (
  <Section title="Commit Timeline" count={commits.length}>
    <div className="p-2 space-y-1.5">
      <AnimatePresence initial={false}>
        {commits.map((commit, index) => <CommitCard key={commit.id} commit={commit} index={index} expanded={expandedCommit === commit.id} onClick={() => onCommitClick(commit)} animation={animation} />)}
      </AnimatePresence>
    </div>
  </Section>
);

const CommitCard = ({ commit, index, expanded, onClick, animation }: { commit: CommitEntry; index: number; expanded: boolean; onClick: () => void; animation: { duration: number; ease?: string } }) => {
  const style = commitTypeStyles[commit.type];
  return (
    <MotionDiv layout initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ ...animation, delay: Math.min(index * 0.025, 0.14) }}>
      <button onClick={onClick} className="w-full rounded border border-border bg-white/[0.015] p-2 text-left transition-colors hover:border-primary/40 hover:bg-secondary/25 focus:outline-none focus:ring-1 focus:ring-primary/60" aria-expanded={expanded}>
        <div className="flex min-w-0 items-start gap-2">
          <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${style.dot}`} />
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-1.5"><span className={`rounded border px-1.5 py-0.5 text-[9px] ${style.className}`}>{style.label}</span><span className="truncate text-[11px] text-foreground">{commit.message.replace(`${commit.type}: `, '')}</span></div>
            <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground"><GitCommitHorizontal size={11} /><span>{commit.hash}</span><span>{commit.timestamp}</span></div>
          </div>
          {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        </div>
      </button>
      <AnimatePresence>
        {expanded && (
          <MotionDiv initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={animation} className="overflow-hidden">
            <div className="ml-4 border-l border-border px-3 py-2 text-[11px] text-muted-foreground">
              <p className="mb-2 leading-relaxed">{commit.description}</p>
              <div className="mb-2 flex flex-wrap gap-1">{commit.tech.map((tech) => <span key={tech} className="rounded border border-border px-1.5 py-0.5 text-[9px]">{tech}</span>)}</div>
              <div className="space-y-1">{commit.files.map((file) => <div key={file} className="truncate text-[10px]">• {file}</div>)}</div>
              <button className="mt-2 text-[10px] text-primary hover:underline">View Diff</button>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </MotionDiv>
  );
};

const ChangedFilesPanel = ({ files, onFileClick, animation }: { files: ChangedFileEntry[]; onFileClick: (file: ChangedFileEntry) => void; animation: { duration: number; ease?: string } }) => (
  <Section title="Changes" count={files.length}>
    <div className="p-2 space-y-1">
      {files.map((file, index) => <MotionDiv key={file.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ ...animation, delay: index * 0.03 }}><ChangedFileItem file={file} onClick={() => onFileClick(file)} /></MotionDiv>)}
    </div>
  </Section>
);

const ChangedFileItem = ({ file, onClick }: { file: ChangedFileEntry; onClick: () => void }) => (
  <button onClick={onClick} className="group w-full rounded px-2 py-1.5 text-left transition-colors hover:bg-secondary/30 focus:outline-none focus:ring-1 focus:ring-primary/60" aria-label={`Open changed file ${file.file}`}>
    <div className="flex min-w-0 items-center gap-2">
      <span className={`w-5 rounded border text-center text-[10px] font-semibold ${statusClasses[file.status]}`}>{file.status}</span>
      <div className="min-w-0 flex-1"><div className="truncate text-[12px] text-foreground">{file.file}</div><div className="truncate text-[10px] text-muted-foreground">{file.path}</div></div>
      <ExternalLink size={12} className="shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
    </div>
  </button>
);

const GitTerminal = ({ lines, input, setInput, onSubmit, endRef }: { lines: TerminalLineData[]; input: string; setInput: (value: string) => void; onSubmit: (event: React.FormEvent) => void; endRef: React.RefObject<HTMLDivElement> }) => (
  <Section title="Git Terminal">
    <div className="max-h-[220px] overflow-y-auto bg-black/20 p-2 font-code text-[11px] leading-relaxed md:max-h-[260px]">
      {lines.map((line) => <TerminalLine key={line.id} line={line} />)}
      <form onSubmit={onSubmit} className="mt-1 flex min-w-0 items-center gap-1">
        <span className="text-vsc-green">›</span>
        <input value={input} onChange={(event) => setInput(event.target.value)} list="git-commands" className="min-w-0 flex-1 bg-transparent text-foreground outline-none" placeholder="git status" aria-label="Git terminal command" />
        <span className="h-3 w-1.5 animate-pulse bg-foreground/70" />
        <datalist id="git-commands">{commands.map((command) => <option key={command} value={command} />)}</datalist>
      </form>
      <div ref={endRef} />
    </div>
  </Section>
);

const TerminalLine = ({ line }: { line: TerminalLineData }) => {
  const color = line.kind === 'command' ? 'text-vsc-green' : line.kind === 'success' ? 'text-vsc-cyan' : 'text-muted-foreground';
  return <div className={`whitespace-pre-wrap break-words ${color}`}>{line.kind === 'command' ? `› ${line.text}` : line.text}</div>;
};

const FilePreviewModal = ({ file, onClose, animation }: { file: ChangedFileEntry | null; onClose: () => void; animation: { duration: number; ease?: string } }) => (
  <AnimatePresence>
    {file && (
      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={animation} className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 p-3" onClick={onClose}>
        <MotionDiv initial={{ scale: 0.96, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 10 }} transition={animation} className="w-full max-w-md rounded border border-border bg-vsc-sidebar shadow-2xl" onClick={(event) => event.stopPropagation()}>
          <div className="flex items-center justify-between border-b border-border px-4 py-2"><span className="truncate text-sm text-foreground">{file.file}</span><button onClick={onClose} className="rounded p-1 text-muted-foreground hover:bg-secondary/50 hover:text-foreground" aria-label="Close file preview"><X size={14} /></button></div>
          <div className="space-y-3 p-4 text-sm"><p className="text-muted-foreground leading-relaxed">{file.description}</p><div className="flex flex-wrap gap-1.5">{file.tech.map((tech) => <span key={tech} className="rounded border border-border px-2 py-1 text-[11px] text-muted-foreground">{tech}</span>)}</div><div className="flex flex-wrap gap-2"><a href={file.repoUrl} target="_blank" rel="noreferrer" className="rounded border border-border px-3 py-1.5 text-xs text-foreground hover:border-primary/50">GitHub Repo</a><a href={file.demoUrl} className="rounded bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:opacity-90">Live Demo</a></div></div>
        </MotionDiv>
      </MotionDiv>
    )}
  </AnimatePresence>
);

export default SourceControlPanel;
