import React from 'react';

interface StatsPanelProps {
  stats: {
    words: number;
    characters: number;
    sentences: number;
    paragraphs: number;
    readingTime: string;
    readability: {
      score: number;
      level: ReadabilityLevel;
      fleschKincaid: number;
      gunningFog: number;
      colemanLiau: number;
      smog: number;
      automatedReadability: number;
    };
    complexity: {
      hardToRead: number;
      veryHardToRead: number;
      complexWords: number;
      longSentences: number;
    };
  };
}

type ReadabilityLevel = 'Very Easy' | 'Easy' | 'Good' | 'Moderate' | 'Complex';

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const getReadabilityColor = (score: number): string => {
    if (score <= 6) return 'text-emerald-500'; // Very Easy
    if (score <= 8) return 'text-green-500';   // Easy
    if (score <= 10) return 'text-yellow-500'; // Good
    if (score <= 12) return 'text-orange-500'; // Moderate
    return 'text-red-500';                     // Complex
  };

  return (
    <div className="h-full overflow-y-auto pr-2">
    <div className="space-y-8">
      {/* Document Statistics */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Document Stats</h3>
        <div className="space-y-4">
          <StatItem label="Words" value={stats.words} />
          <StatItem label="Characters" value={stats.characters} />
          <StatItem label="Sentences" value={stats.sentences} />
          <StatItem label="Paragraphs" value={stats.paragraphs} />
          <StatItem label="Reading Time" value={stats.readingTime} />
        </div>
      </div>

      {/* Readability Scores */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Readability</h3>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-400">Overall Score</div>
            <div className={`text-2xl font-bold ${getReadabilityColor(stats.readability.score)}`}>
              Grade {stats.readability.score.toFixed(1)}
            </div>
            <div className="text-sm text-gray-400 mt-1">{stats.readability.level}</div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="text-sm text-gray-400 mb-3">Detailed Scores</div>
            <div className="space-y-3">
              <StatItem 
                label="Flesch-Kincaid" 
                value={stats.readability.fleschKincaid.toFixed(1)} 
                tooltip="Standard readability test used by US education system"
              />
              <StatItem 
                label="Gunning Fog" 
                value={stats.readability.gunningFog.toFixed(1)} 
                tooltip="Estimates years of formal education needed to understand text"
              />
              <StatItem 
                label="Coleman-Liau" 
                value={stats.readability.colemanLiau.toFixed(1)} 
                tooltip="Based on characters instead of syllables"
              />
              <StatItem 
                label="SMOG" 
                value={stats.readability.smog.toFixed(1)} 
                tooltip="Simple Measure of Gobbledygook - for health and safety documents"
              />
              <StatItem 
                label="ARI" 
                value={stats.readability.automatedReadability.toFixed(1)} 
                tooltip="Automated Readability Index"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Complexity Analysis */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Complexity</h3>
        <div className="space-y-4">
          <StatItem 
            label="Hard to Read Sentences" 
            value={stats.complexity.hardToRead}
            tooltip="Sentences that may be difficult to understand"
          />
          <StatItem 
            label="Very Hard to Read" 
            value={stats.complexity.veryHardToRead}
            tooltip="Sentences that should be simplified"
          />
          <StatItem 
            label="Complex Words" 
            value={stats.complexity.complexWords}
            tooltip="Words with three or more syllables"
          />
          <StatItem 
            label="Long Sentences" 
            value={stats.complexity.longSentences}
            tooltip="Sentences with more than 30 words"
          />
        </div>
      </div>
    </div>
    </div>
  );
};

interface StatItemProps {
  label: string;
  value: number | string;
  tooltip?: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, tooltip }) => (
  <div className="group relative">
    <div className="text-sm text-gray-400 flex items-center gap-1">
      {label}
      {tooltip && (
        <span className="cursor-help">
          ⓘ
          <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block">
            <div className="bg-black/90 text-white text-xs rounded-lg py-1 px-2 w-48">
              {tooltip}
            </div>
          </div>
        </span>
      )}
    </div>
    <div className="text-lg font-medium text-white">
      {typeof value === 'number' ? value.toLocaleString() : value}
    </div>
  </div>
);
