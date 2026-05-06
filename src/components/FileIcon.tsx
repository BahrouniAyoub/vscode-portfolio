import { Globe, FileCode, FileJson, FileType, Hash, FileText, FileDown, type LucideIcon } from 'lucide-react';
import type { SidebarFileIcon } from '@/data/portfolio';

const iconMap: Record<SidebarFileIcon, LucideIcon> = {
  react: FileCode,
  globe: Globe,
  'file-code': FileCode,
  'file-json': FileJson,
  'file-type': FileType,
  hash: Hash,
  'file-text': FileText,
  'file-down': FileDown,
};

export const FileIcon = ({ name, className }: { name: SidebarFileIcon; className?: string }) => {
  const Icon = iconMap[name] || FileText;
  return <Icon size={14} strokeWidth={1.5} className={className} />;
};
