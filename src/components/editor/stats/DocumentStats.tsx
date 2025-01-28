import React from 'react';

interface DocumentStatsProps {
  stats: {
    words: number;
    sentences: number;
    hardToRead: number;
    veryHardToRead: number;
    adverbs: number;
    passiveVoice: number;
    complexWords: number;
  };
}

export const DocumentStats: React.FC<DocumentStatsProps> = ({ stats }) => {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm text-gray-400 mb-1">Words</div>
        <div className="text-lg font-medium text-white">{stats.words}</div>
      </div>
      <div>
        <div className="text-sm text-gray-400 mb-1">Sentences</div>
        <div className="text-lg font-medium text-white">{stats.sentences}</div>
      </div>
      <div>
        <div className="text-sm text-gray-400 mb-1">Reading Time</div>
        <div className="text-lg font-medium text-white">
          {Math.ceil(stats.words / 200)} min
        </div>
      </div>
    </div>
  );
};
