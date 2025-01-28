import React, { useState, useMemo } from 'react';
import { Heart, MessageCircle, FileText, AlignLeft } from 'lucide-react';
import { formatNumber } from '../../../../utils/numberFormat';
import { formatDistanceToNow } from '../../../../utils/dateFormat';
import { useSavedPosts } from '../../../../hooks/useSavedPosts';
import { PostType } from '../analytics/goals/PostTypeFilter';
import { SortOption } from '../../posts/PostsSorting';
import { MobileStructurePopup } from '../../../common/MobileStructurePopup';
import { SavedPostListDesktop } from './SavedPostListDesktop';
import { isWithinInterval } from 'date-fns';

interface SavedPostListProps {
  handle: string;
  postType: PostType;
  sortBy: SortOption;
  startDate?: Date | null;
  endDate?: Date | null;
}

export const SavedPostList: React.FC<SavedPostListProps> = ({
  handle,
  postType,
  sortBy,
  startDate,
  endDate
}) => {
  const { posts, isLoading } = useSavedPosts(handle, postType);
  const [mobilePopupText, setMobilePopupText] = useState<string | null>(null);

  // Filter posts by date range and sort
  const filteredAndSortedPosts = useMemo(() => {
    if (!posts) return [];
    
    let filtered = [...posts];

    // Apply date filtering if both dates are provided
    if (startDate && endDate) {
      filtered = filtered.filter(post => {
        const postDate = new Date(post.createdAt);
        return isWithinInterval(postDate, { start: startDate, end: endDate });
      });
    }
    
    // Sort posts
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'likes':
          return b.stats.likes - a.stats.likes;
        case 'comments':
          return b.stats.comments - a.stats.comments;
        default:
          return 0;
      }
    });
  }, [posts, sortBy, startDate, endDate]);

  if (isLoading) {
    return (
      <>
        {/* Desktop loading state */}
        <div className="hidden md:block">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-white/10 rounded" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-white/5 rounded" />
            ))}
          </div>
        </div>

        {/* Mobile loading state */}
        <div className="md:hidden space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-3 animate-pulse">
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-white/10 rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/10 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      {/* Desktop View */}
      <SavedPostListDesktop 
        posts={filteredAndSortedPosts}
        onShowStructure={setMobilePopupText}
      />

      {/* Mobile View */}
      <div className="md:hidden space-y-2">
        {filteredAndSortedPosts.map(post => (
          <div key={post.id} className="bg-white/5 rounded-lg p-3">
            {/* Post content */}
            <div className="flex items-center gap-3">
              <img 
                src={post.thumbnail} 
                alt={post.caption}
                className="w-16 h-16 rounded object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-white text-sm line-clamp-2 mb-1">{post.caption}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    <span>{formatNumber(post.stats.likes)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{formatNumber(post.stats.comments)}</span>
                  </div>
                  <span>•</span>
                  <span>{formatDistanceToNow(new Date(post.createdAt))}</span>
                </div>
              </div>
            </div>

            {/* Structure buttons */}
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setMobilePopupText(getPostStructure(post.type))}
                className="flex-1 flex items-center justify-center gap-1 text-xs bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white px-2 py-1.5 rounded transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Post Structure</span>
              </button>
              <button
                onClick={() => setMobilePopupText(getCaptionStructure(post.type))}
                className="flex-1 flex items-center justify-center gap-1 text-xs bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white px-2 py-1.5 rounded transition-colors"
              >
                <AlignLeft className="w-3.5 h-3.5" />
                <span>Caption Structure</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Structure Popup */}
      {mobilePopupText && (
        <MobileStructurePopup 
          text={mobilePopupText}
          onClose={() => setMobilePopupText(null)}
        />
      )}
    </>
  );
};

// Helper functions for post and caption structure
const getPostStructure = (type: string) => {
  switch (type) {
    case 'carousel':
      return `1. Hook slide (problem/pain point)\n2. Agitate the problem\n3. Present the solution\n4. Break down key points\n5. Share proof/results\n6. Call to action`;
    case 'reel':
      return `1. Hook (first 3 seconds)\n2. Identify problem\n3. Share solution\n4. Give quick tips\n5. End with CTA`;
    default:
      return `1. Strong visual\n2. Clear headline\n3. Key benefit\n4. Call to action`;
  }
};

const getCaptionStructure = (type: string) => {
  switch (type) {
    case 'carousel':
      return `🎯 Hook\n\n💡 Main point\n\nKey points:\n• Point 1\n• Point 2\n• Point 3\n\n🔑 Key takeaway\n\n👉 Call to action\n\n#hashtags`;
    case 'reel':
      return `🎬 Hook question\n\n💡 Main insight\n\n✨ Quick tips:\n1. Tip one\n2. Tip two\n3. Tip three\n\n👉 CTA\n\n#hashtags`;
    default:
      return `💡 Hook statement\n\nMain point expanded\n\n🎯 Key takeaway\n\n👉 Call to action\n\n#hashtags`;
  }
};