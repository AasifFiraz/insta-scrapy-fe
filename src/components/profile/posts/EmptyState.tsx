import React from 'react';
import { Image, Film, Images } from 'lucide-react';
import { PostType } from '../../../types/postType';

interface EmptyStateProps {
  postType: PostType | 'all';
  startDate?: Date | null;
  endDate?: Date | null;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ postType, startDate, endDate }) => {
  const getPostTypeIcon = () => {
    switch (postType) {
      case 'image':
        return <Image className="w-12 h-12 text-gray-400" />;
      case 'reel':
        return <Film className="w-12 h-12 text-gray-400" />;
      case 'carousel':
        return <Images className="w-12 h-12 text-gray-400" />;
      default:
        return <Image className="w-12 h-12 text-gray-400" />;
    }
  };

  const getPostTypeText = () => {
    switch (postType) {
      case 'image':
        return 'image posts';
      case 'reel':
        return 'reel posts';
      case 'carousel':
        return 'carousel posts';
      default:
        return 'posts';
    }
  };

  const getDateRangeText = () => {
    if (!startDate || !endDate) {
      return 'in the last 7 days';
    }

    const start = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const end = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `between ${start} and ${end}`;
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-white/5 rounded-lg">
      {getPostTypeIcon()}
      <h3 className="mt-4 text-lg font-medium text-white">No posts available</h3>
      <p className="mt-2 text-sm text-gray-400 text-center max-w-md">
        We couldn't find any {getPostTypeText()} {getDateRangeText()}. Try adjusting your filters or checking back later.
      </p>
    </div>
  );
}; 