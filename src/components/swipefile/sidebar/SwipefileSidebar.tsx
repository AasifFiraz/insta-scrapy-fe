import React from 'react';
import { ListManager } from './ListManager';
import { SwipefileSelector } from './SwipefileSelector';

export const SwipefileSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      <ListManager />
      <SwipefileSelector />
    </div>
  );
};