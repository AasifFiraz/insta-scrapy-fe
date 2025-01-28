import React from 'react';
import { Folder } from 'lucide-react';
import { ViewModeSelector } from './ViewModeSelector';
import { useSwipefile } from '../../../context/SwipefileContext';

export const SwipefileHeader: React.FC = () => {
  const { state } = useSwipefile();
  const activeList = state.lists.find(list => list.id === state.activeListId);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Folder className="w-5 h-5 text-gray-400" />
          <h1 className="text-xl font-bold text-white">Swipefile</h1>
        </div>
        <p className="text-gray-400">
          {activeList?.name || 'All Profiles'}
        </p>
      </div>
      <ViewModeSelector />
    </div>
  );
};