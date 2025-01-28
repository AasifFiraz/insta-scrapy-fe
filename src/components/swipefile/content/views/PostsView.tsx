import React, { useState } from 'react';
import { useSwipefile } from '../../../../context/SwipefileContext';
import { PostList } from '../../../profile/posts/PostList';
import { PostTypeFilter } from '../../../profile/save/analytics/goals/PostTypeFilter';
import { PostType } from '../../../../types/postType';
import { useSavedPosts } from '../../../../hooks/useSavedPosts';

interface PostsViewProps {
  listId: string | null;
}

export const PostsView: React.FC<PostsViewProps> = ({ listId }) => {
  const { state } = useSwipefile();
  const [selectedType, setSelectedType] = useState<PostType | 'all'>('all');

  // Get all handles from the current list
  const handles = React.useMemo(() => {
    if (!listId) return [];
    
    const list = state.lists.find(l => l.id === listId);
    if (!list) return [];

    return list.profileIds
      .map(id => state.savedProfiles.find(p => p.id === id)?.handle)
      .filter(Boolean) as string[];
  }, [state.lists, state.savedProfiles, listId]);

  // Get posts for all handles
  const allPosts = handles.map(handle => {
    const { posts } = useSavedPosts(handle, selectedType);
    return posts;
  }).flat();

  // Sort posts by date
  const sortedPosts = React.useMemo(() => {
    return [...allPosts].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [allPosts]);

  if (handles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No profiles in this list yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PostTypeFilter 
          selectedType={selectedType}
          onChange={setSelectedType}
        />
      </div>

      {sortedPosts.length > 0 ? (
        <PostList posts={sortedPosts} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No posts found.</p>
        </div>
      )}
    </div>
  );
};