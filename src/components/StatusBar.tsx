import { AlertTriangle, XCircle, GitBranch, RefreshCw } from 'lucide-react';

const StatusBar = () => {
  return (
    <div className="flex items-center h-6 bg-vsc-statusbar text-primary-foreground text-[11px] select-none shrink-0">
      {/* Left side */}
      <div className="flex items-center gap-3 px-2">
        <span className="flex items-center gap-1">
          <AlertTriangle size={12} strokeWidth={1.5} /> 0
          <XCircle size={12} strokeWidth={1.5} className="ml-2" /> 0
        </span>
      </div>

      <div className="flex items-center gap-1 px-2">
        <GitBranch size={12} strokeWidth={1.5} />
        <span>main</span>
      </div>

      <div className="flex items-center gap-1 px-2">
        <RefreshCw size={10} strokeWidth={1.5} />
        <span>Ayoub's Portfolio</span>
      </div>

      {/* Right side */}
      <div className="flex-1" />
      <div className="flex items-center gap-3 px-2">
        <span className="hidden sm:inline">Copilot</span>
        <span className="hidden sm:inline">TypeScript React</span>
        <span className="hidden sm:inline">UTF-8</span>
        <span className="hidden sm:inline">Prettier</span>
        <span className="hidden md:inline">Ayoub Dark</span>
        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};

export default StatusBar;
