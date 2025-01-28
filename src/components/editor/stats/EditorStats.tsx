import React from 'react';
import { calculateStats } from '../../../utils/editor/statsCalculator';

interface EditorStatsProps {
  content: string;
}

export const EditorStats: React.FC<EditorStatsProps> = ({ content }) => {
  const stats = calculateStats(content);

  return (
    <div className="space-y-6">
      {/* Readability Score */}
      <div>
        <div className="text-sm text-gray-400 mb-1">Readability</div>
        <div className="text-2xl font-bold text-white">Grade {stats.readabilityGrade}</div>
        <div className="text-sm text-gray-400">{stats.readabilityLabel}</div>
      </div>

      {/* Document Stats */}
      <div className="space-y-3">
        <div>
          <div className="text-sm text-gray-400 mb-1">Words</div>
          <div className="text-lg font-medium text-white">{stats.words}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400 mb-1">Characters</div>
          <div className="text-lg font-medium text-white">{stats.characters}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400 mb-1">Sentences</div>
          <div className="text-lg font-medium text-white">{stats.sentences}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400 mb-1">Paragraphs</div>
          <div className="text-lg font-medium text-white">{stats.paragraphs}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400 mb-1">Reading Time</div>
          <div className="text-lg font-medium text-white">{stats.readingTime}</div>
        </div>
      </div>
    </div>
  );
};