import React from 'react';
import { TextHighlight } from '../../../utils/editor/analysis/types';

interface FormattedTextProps {
  tokens: any[];
  highlights: TextHighlight[];
  onHighlightClick?: (highlight: TextHighlight) => void;
}

export const FormattedText: React.FC<FormattedTextProps> = ({ 
  tokens, 
  highlights,
  onHighlightClick 
}) => {
  return (
    <div className="whitespace-pre-wrap">
      {tokens.map((token, index) => {
        // Find any highlights that overlap with this token
        const tokenHighlights = highlights.filter(h => {
          const tokenStart = token.start || 0;
          const tokenEnd = tokenStart + (token.content?.length || 0);
          return h.start < tokenEnd && h.end > tokenStart;
        });

        const content = tokenHighlights.length > 0 ? (
          <mark 
            className={getHighlightClass(tokenHighlights[0].type)}
            onClick={() => onHighlightClick?.(tokenHighlights[0])}
          >
            {token.content}
          </mark>
        ) : token.content;

        switch (token.type) {
          case 'bold':
            return <strong key={index} className="font-bold text-white">{content}</strong>;
          case 'italic':
            return <em key={index} className="italic text-white">{content}</em>;
          case 'underline':
            return <u key={index} className="text-white">{content}</u>;
          case 'link':
            return (
              <span key={index} className="text-blue-400">{content}</span>
            );
          case 'list':
            return (
              <div key={index} className="flex gap-2 text-white">
                <span>{token.listType === 'bullet' ? '•' : `${index + 1}.`}</span>
                <span>{content}</span>
              </div>
            );
          default:
            return <span key={index} className="text-white">{content}</span>;
        }
      })}
    </div>
  );
};

const getHighlightClass = (type: TextHighlight['type']): string => {
  switch (type) {
    case 'hardToRead':
      return 'bg-yellow-500/20 cursor-pointer';
    case 'veryHardToRead':
      return 'bg-red-500/20 cursor-pointer';
    case 'adverb':
    case 'passiveVoice':
    case 'qualifier':
      return 'bg-blue-500/20 cursor-pointer';
    case 'simpleAlternative':
      return 'bg-purple-500/20 cursor-pointer';
    default:
      return '';
  }
};