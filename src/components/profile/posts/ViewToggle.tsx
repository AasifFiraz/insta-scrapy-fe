import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

export type ViewMode = 'grid' | 'list';

interface ViewToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ mode, onChange }) => {
  return (
    <div className="flex gap-2 bg-white/5 rounded-lg p-1">
      <button
        onClick={() => onChange('grid')}
        className={`p-2 rounded-md transition-colors ${
          mode === 'grid'
            ? 'bg-white/10 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <LayoutGrid className="w-5 h-5" />
      </button>
      <button
        onClick={() => onChange('list')}
        className={`p-2 rounded-md transition-colors ${
          mode === 'list'
            ? 'bg-white/10 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
};