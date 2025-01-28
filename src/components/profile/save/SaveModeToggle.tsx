import React from 'react';
import { BarChart3, Grid } from 'lucide-react';
import { SaveMode } from '../../../types/save';

interface SaveModeToggleProps {
  mode: SaveMode;
  onChange: (mode: SaveMode) => void;
}

export const SaveModeToggle: React.FC<SaveModeToggleProps> = ({
  mode,
  onChange
}) => {
  return (
    <div className="w-full grid grid-cols-2 bg-white/5 rounded-lg p-1">
      <button
        onClick={() => onChange('analytics')}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          mode === 'analytics'
            ? 'bg-white/10 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <BarChart3 className="w-4 h-4" />
        <span>Profile Analysis</span>
      </button>
      <button
        onClick={() => onChange('posts')}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          mode === 'posts'
            ? 'bg-white/10 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <Grid className="w-4 h-4" />
        <span>Post Analysis</span>
      </button>
    </div>
  );
};