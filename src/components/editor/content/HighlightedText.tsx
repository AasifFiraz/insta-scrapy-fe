import React from 'react';
import { TextHighlight } from '../../../utils/editor/analysis/types';

interface HighlightedTextProps {
  content: string;
  highlights: TextHighlight[];
  onHighlightClick?: (highlight: TextHighlight) => void;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  content,
  highlights,
  onHighlightClick
}) => {
  // Sort highlights by start position to ensure proper rendering
  const sortedHighlights = [...highlights].sort((a, b) => a.start - b.start);

  // Build highlighted text segments
  const segments: JSX.Element[] = [];
  let currentPosition = 0;

  sortedHighlights.forEach((highlight, index) => {
    // Add non-highlighted text before this highlight
    if (highlight.start > currentPosition) {
      segments.push(
        <span key={`text-${index}`} className="text-white">
          {content.slice(currentPosition, highlight.start)}
        </span>
      );
    }

    // Add highlighted text
    segments.push(
      <mark
        key={`highlight-${index}`}
        className={getHighlightClass(highlight.type)}
        onClick={() => onHighlightClick?.(highlight)}
      >
        {content.slice(highlight.start, highlight.end)}
      </mark>
    );

    currentPosition = highlight.end;
  });

  // Add remaining text after last highlight
  if (currentPosition < content.length) {
    segments.push(
      <span key="text-end" className="text-white">
        {content.slice(currentPosition)}
      </span>
    );
  }

  return <>{segments}</>;
};

const getHighlightClass = (type: TextHighlight['type']): string => {
  switch (type) {
    case 'hardToRead':
      return 'bg-yellow-500/20 text-white cursor-pointer';
    case 'veryHardToRead':
      return 'bg-red-500/20 text-white cursor-pointer';
    case 'adverb':
    case 'passiveVoice':
    case 'qualifier':
      return 'bg-blue-500/20 text-white cursor-pointer';
    case 'simpleAlternative':
      return 'bg-purple-500/20 text-white cursor-pointer';
    default:
      return 'text-white';
  }
};