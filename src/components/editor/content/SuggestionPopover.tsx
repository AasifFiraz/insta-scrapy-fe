import React from 'react';
import { TextHighlight } from '../../../utils/editor/analysis/types';

interface SuggestionPopoverProps {
  highlight: TextHighlight;
  onClose: () => void;
}

export const SuggestionPopover: React.FC<SuggestionPopoverProps> = ({
  highlight,
  onClose
}) => {
  const getSuggestionTitle = () => {
    switch (highlight.type) {
      case 'hardToRead':
        return 'Hard to Read';
      case 'veryHardToRead':
        return 'Very Hard to Read';
      case 'adverb':
        return 'Adverb';
      case 'passiveVoice':
        return 'Passive Voice';
      case 'qualifier':
        return 'Qualifier';
      case 'simpleAlternative':
        return 'Complex Word';
      default:
        return '';
    }
  };

  return (
    <div className="absolute z-50 w-64 bg-black border border-white/10 rounded-lg shadow-xl p-3">
      <div className="text-sm font-medium text-white mb-1">
        {getSuggestionTitle()}
      </div>
      {highlight.suggestion && (
        <div className="text-sm text-gray-400">
          {highlight.suggestion}
        </div>
      )}
    </div>
  );
};