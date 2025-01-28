import React, { useState, useRef } from 'react';
import { BarChart2, Search, Folder, LineChart, FileBarChart, Bot } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { ProBadge } from '../common/ProBadge';

export const MoreToolsDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const tools = [
    { id: 'compare', label: 'Compare', icon: BarChart2 },
    { id: 'keywords', label: 'Keywords', icon: Search },
    { id: 'swipefile', label: 'Swipefile', icon: Folder },
    { id: 'analysis', label: 'Analysis', icon: LineChart },
    { id: 'reporting', label: 'Reporting', icon: FileBarChart },
    { id: 'agent', label: 'Agent', icon: Bot }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-white"
      >
        Coming soon
        <ProBadge />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-black border border-white/10 rounded-lg shadow-xl z-50">
          {tools.map(tool => (
            <button
              key={tool.id}
              className="w-full px-4 py-3 text-left hover:bg-white/5 flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
            >
              <tool.icon className="w-4 h-4" />
              <span className="text-sm">{tool.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};