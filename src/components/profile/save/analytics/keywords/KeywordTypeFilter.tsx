import React from 'react';
import { KeywordType } from './types';

interface KeywordTypeFilterProps {
  selected: KeywordType;
  onChange: (type: KeywordType) => void;
}

export const KeywordTypeFilter: React.FC<KeywordTypeFilterProps> = ({
  selected,
  onChange
}) => {
  return (
    <div className="flex gap-2 bg-white/5 rounded-lg p-1">
      <button
        onClick={() => onChange('keywords')}
        className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
          selected === 'keywords'
            ? 'bg-white/10 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        Keywords
      </button>
      <button
        onClick={() => onChange('questions')}
        className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
          selected === 'questions'
            ? 'bg-white/10 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        Questions
      </button>
      <button
        onClick={() => onChange('phrases')}
        className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
          selected === 'phrases'
            ? 'bg-white/10 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        Phrases
      </button>
    </div>
  );
};