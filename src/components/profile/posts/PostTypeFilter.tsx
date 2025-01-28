import React from 'react';
import { Image, Images, Film, LayoutGrid } from 'lucide-react';
import { PostType } from '../../../types/postType';

interface PostTypeFilterProps {
  selectedType: PostType | 'all';
  onChange: (type: PostType | 'all') => void;
}

export const PostTypeFilter: React.FC<PostTypeFilterProps> = ({
  selectedType,
  onChange
}) => {
  return (
    <div className="flex gap-2 bg-white/5 rounded-lg p-1">
      <button
        onClick={() => onChange('all')}
        className={`p-2 rounded-md transition-colors ${
          selectedType === 'all'
            ? 'bg-white/10 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        title="All Posts"
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
      <button
        onClick={() => onChange('image')}
        className={`p-2 rounded-md transition-colors ${
          selectedType === 'image'
            ? 'bg-white/10 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        title="Images"
      >
        <Image className="w-4 h-4" />
      </button>
      <button
        onClick={() => onChange('carousel')}
        className={`p-2 rounded-md transition-colors ${
          selectedType === 'carousel'
            ? 'bg-white/10 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        title="Carousels"
      >
        <Images className="w-4 h-4" />
      </button>
      <button
        onClick={() => onChange('reel')}
        className={`p-2 rounded-md transition-colors ${
          selectedType === 'reel'
            ? 'bg-white/10 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        title="Reels"
      >
        <Film className="w-4 h-4" />
      </button>
    </div>
  );
};