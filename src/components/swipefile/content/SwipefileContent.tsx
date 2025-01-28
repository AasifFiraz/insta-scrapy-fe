import React from 'react';
import { SwipefileViewMode } from '../../../types/swipefile';
import { ProfilesView } from './views/ProfilesView';
import { PostsView } from './views/PostsView';
import { InsightsView } from './views/InsightsView';

interface SwipefileContentProps {
  activeListId: string | null;
  viewMode: SwipefileViewMode;
}

export const SwipefileContent: React.FC<SwipefileContentProps> = ({
  activeListId,
  viewMode
}) => {
  // Render appropriate view based on viewMode
  switch (viewMode) {
    case 'profiles':
      return <ProfilesView listId={activeListId} />;
    case 'posts':
      return <PostsView listId={activeListId} />;
    case 'insights':
      return <InsightsView listId={activeListId} />;
    default:
      return null;
  }
};