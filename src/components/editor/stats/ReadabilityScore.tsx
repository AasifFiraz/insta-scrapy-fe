import React from 'react';

interface ReadabilityScoreProps {
  score: number;
  level: string;
}

export const ReadabilityScore: React.FC<ReadabilityScoreProps> = ({ score, level }) => {
  const getScoreColor = () => {
    switch (level) {
      case 'Very Easy': return 'text-emerald-500';
      case 'Easy': return 'text-emerald-400';
      case 'Good': return 'text-yellow-500';
      case 'Moderate': return 'text-orange-500';
      case 'Complex': return 'text-red-500';
      default: return 'text-white';
    }
  };

  return (
    <div>
      <div className="text-sm text-gray-400 mb-1">Readability</div>
      <div className="text-2xl font-bold text-white">
        Grade {score}
      </div>
      <div className={`text-sm ${getScoreColor()}`}>
        {level}
      </div>
    </div>
  );
};
