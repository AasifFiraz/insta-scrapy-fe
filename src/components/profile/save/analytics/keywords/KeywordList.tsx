import React from 'react';
import { PostType } from '../goals/PostTypeFilter';
import { KeywordType, KeywordData } from './types';
import { useKeywordData } from '../../../../../hooks/useKeywordData';
import { formatNumber } from '../../../../../utils/numberFormat';

interface KeywordListProps {
  handle: string;
  postType: PostType;
  keywordType: KeywordType;
  searchQuery: string;
}

export const KeywordList: React.FC<KeywordListProps> = ({
  handle,
  postType,
  keywordType,
  searchQuery
}) => {
  const { data, isLoading } = useKeywordData(handle, postType);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white/5 rounded-lg p-4 space-y-4">
            <div className="h-4 bg-white/10 rounded w-48" />
            <div className="flex justify-between">
              <div className="h-3 bg-white/10 rounded w-24" />
              <div className="h-3 bg-white/10 rounded w-24" />
              <div className="h-3 bg-white/10 rounded w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Ensure data exists and has the required property before accessing
  if (!data || !data[keywordType]) {
    return (
      <div className="text-gray-400 text-center py-8">
        No keyword data available
      </div>
    );
  }

  const keywords = data[keywordType].filter(keyword =>
    keyword.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (keywords.length === 0) {
    return (
      <div className="text-gray-400 text-center py-8">
        No results found for "{searchQuery}"
      </div>
    );
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return 'text-emerald-500';
    if (difficulty < 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-4">
      {keywords.map((keyword: KeywordData) => (
        <div key={keyword.text} className="bg-white/5 rounded-lg p-4">
          <div className="flex items-baseline justify-between mb-4">
            <h4 className="text-white font-medium">{keyword.text}</h4>
            <div className={getDifficultyColor(keyword.difficulty)}>
              {keyword.difficulty}% difficulty
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-sm">
              <div className="text-gray-400 mb-1">Monthly Volume</div>
              <div className="text-white">{formatNumber(keyword.volume)}</div>
            </div>
            <div className="text-sm">
              <div className="text-gray-400 mb-1">Avg. Engagement</div>
              <div className="text-white">{formatNumber(keyword.engagement)}</div>
            </div>
            <div className="text-sm">
              <div className="text-gray-400 mb-1">Example Posts</div>
              <div className="text-white">{keyword.examples.length}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};