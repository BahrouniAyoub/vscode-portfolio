import { TabId, FileId, ExtensionId, extensionRegistry } from '@/data/portfolio';
import { sidebarFiles } from '@/data/portfolio';
import { X } from 'lucide-react';
import { FileIcon } from './FileIcon';

interface EditorTabsProps {
  activeTab: TabId;
  openTabs: TabId[];
  onTabSelect: (id: TabId) => void;
  onCloseTab: (id: TabId) => void;
}

const EditorTabs = ({ activeTab, openTabs, onTabSelect, onCloseTab }: EditorTabsProps) => {
  const getTabLabel = (tabId: TabId): { name: string; icon?: string } => {
    // Check if it's a file
    const file = sidebarFiles.find((f) => f.id === tabId);
    if (file) {
      return { name: file.name, icon: file.lucideIcon };
    }

    // Check if it's an extension
    const ext = extensionRegistry[tabId as ExtensionId];
    if (ext) {
      return { name: ext.name + '.extension', icon: undefined };
    }

    return { name: 'Unknown', icon: undefined };
  };

  return (
    <div className="flex items-center bg-vsc-tab-inactive border-b border-border overflow-x-auto shrink-0">
      {openTabs.map((tabId) => {
        const isActive = activeTab === tabId;
        const label = getTabLabel(tabId);

        // Check if it's a file or extension
        const file = sidebarFiles.find((f) => f.id === tabId);
        const iconColor = file ? file.iconColor : 'text-muted-foreground';

        return (
          <div
            key={tabId}
            onClick={() => onTabSelect(tabId)}
            className={`flex items-center gap-2 px-3 py-1.5 text-[13px] cursor-pointer border-r border-border shrink-0 transition-colors group ${
              isActive
                ? 'bg-vsc-tab-active text-foreground border-t-2 border-t-primary'
                : 'bg-vsc-tab-inactive text-muted-foreground hover:bg-secondary/30 border-t-2 border-t-transparent'
            }`}
          >
            {file && <FileIcon name={file.lucideIcon} className={`${iconColor}`} />}
            {!file && <span className="text-xs font-code">⚙️</span>}
            <span className="font-code text-xs">{label.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(tabId);
              }}
              className="ml-1 opacity-0 group-hover:opacity-100 hover:bg-secondary/50 rounded-sm w-4 h-4 flex items-center justify-center transition-opacity"
            >
              <X size={10} strokeWidth={1.5} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default EditorTabs;
