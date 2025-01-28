import React from 'react';
import { Bold, Italic, Underline } from 'lucide-react';

interface EditorToolbarProps {
  onFormat: (format: string) => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ onFormat }) => {
  return (
    <div className="flex items-center gap-2 border-b border-white/10 pb-3">
      <button
        onClick={() => onFormat('bold')}
        className="p-2 rounded hover:bg-white/5 text-gray-400 hover:text-white"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => onFormat('italic')}
        className="p-2 rounded hover:bg-white/5 text-gray-400 hover:text-white"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => onFormat('underline')}
        className="p-2 rounded hover:bg-white/5 text-gray-400 hover:text-white"
      >
        <Underline className="w-4 h-4" />
      </button>
    </div>
  );
};