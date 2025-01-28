import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { KeywordTypeFilter } from './KeywordTypeFilter';
import { KeywordList } from './KeywordList';
import { KeywordType } from './types';
import { PostType } from '../../../../types/postType';

interface KeywordResearchProps {
  handle: string;
  postType: PostType | 'all';
}

export const KeywordResearch: React.FC<KeywordResearchProps> = ({ 
  handle,
  postType
}) => {
  const [selectedKeywordType, setSelectedKeywordType] = useState<KeywordType>('keywords');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-400" />
          <h3 className="text-white font-semibold">Keyword Research</h3>
        </div>
        <KeywordTypeFilter 
          selected={selectedKeywordType}
          onChange={setSelectedKeywordType}
        />
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search keywords..."
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <KeywordList 
        handle={handle}
        postType={postType}
        keywordType={selectedKeywordType}
        searchQuery={searchQuery}
      />
    </div>
  );
};