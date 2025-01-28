import React, { useState } from 'react';
import { Hash } from 'lucide-react';
import { PostType } from '../../../../../types/postType';
import { formatNumber } from '../../../../../utils/numberFormat';

type AnalysisType = 'topics' | 'keywords';

interface TopicData {
  name: string;
  posts: number;
  engagement: number;
}

interface TopicAnalysisProps {
  handle: string;
  postType: PostType | 'all';
}

export const TopicAnalysis: React.FC<TopicAnalysisProps> = ({ 
  handle,
  postType 
}) => {
  const [analysisType, setAnalysisType] = useState<AnalysisType>('topics');

  // Mock data - replace with actual data from API
  const topics: TopicData[] = [
    { name: 'Business Growth', posts: 45, engagement: 12500 },
    { name: 'Marketing Strategy', posts: 38, engagement: 10800 },
    { name: 'Personal Development', posts: 32, engagement: 9500 },
    { name: 'Leadership', posts: 28, engagement: 8900 },
    { name: 'Productivity', posts: 25, engagement: 7600 }
  ];

  const keywords: TopicData[] = [
    { name: 'success mindset', posts: 42, engagement: 11800 },
    { name: 'business tips', posts: 36, engagement: 10200 },
    { name: 'growth strategy', posts: 31, engagement: 9100 },
    { name: 'marketing hacks', posts: 27, engagement: 8400 },
    { name: 'entrepreneur life', posts: 24, engagement: 7200 }
  ];

  const data = analysisType === 'topics' ? topics : keywords;

  return (
    <div className="bg-white/5 rounded-xl p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-gray-400" />
          <h3 className="text-white font-semibold">Topic Analysis</h3>
        </div>

        {/* Analysis Type Selector */}
        <div className="flex gap-2 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setAnalysisType('topics')}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-sm transition-colors ${
              analysisType === 'topics'
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Topics
          </button>
          <button
            onClick={() => setAnalysisType('keywords')}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-sm transition-colors ${
              analysisType === 'keywords'
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Keywords
          </button>
        </div>
      </div>

      {/* Topic/Keyword List */}
      <div className="space-y-4">
        {data.map((item) => (
          <div 
            key={item.name} 
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-white/5 last:border-0"
          >
            {/* Topic/Keyword Name */}
            <div className="text-white font-medium">{item.name}</div>
            
            {/* Stats */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 sm:hidden">Posts:</span>
                <span className="text-white">{item.posts}</span>
                <span className="text-gray-400 hidden sm:inline">posts</span>
              </div>
              <div className="w-px h-4 bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-gray-400 sm:hidden">Engagement:</span>
                <span className="text-white">{formatNumber(item.engagement)}</span>
                <span className="text-gray-400 hidden sm:inline">avg. engagement</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};