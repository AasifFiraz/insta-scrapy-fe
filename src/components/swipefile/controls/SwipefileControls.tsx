import React, { useState } from 'react';
import { Plus, Folder } from 'lucide-react';
import { useSwipefile } from '../../../context/SwipefileContext';
import { useSwipefileActions } from '../../../hooks/useSwipefileActions';
import { CreateSwipefileDialog } from '../sidebar/CreateSwipefileDialog';
import { SwipefileOptionsMenu } from './SwipefileOptionsMenu';

export const SwipefileControls: React.FC = () => {
  const { state } = useSwipefile();
  const { setActiveList } = useSwipefileActions();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Create button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsCreateDialogOpen(true)}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Swipefile</span>
        </button>
      </div>

      {/* Swipefile list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {state.lists.map((list) => (
          <div
            key={list.id}
            className={`group flex items-center justify-between gap-2 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
              state.activeListId === list.id
                ? 'bg-white/10 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            onClick={() => setActiveList(list.id)}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Folder className="w-4 h-4 shrink-0" />
              <div className="min-w-0">
                <div className="font-medium truncate">{list.name}</div>
                {list.description && (
                  <div className="text-sm text-gray-500 truncate">
                    {list.description}
                  </div>
                )}
              </div>
            </div>

            {list.id !== 'all' && (
              <SwipefileOptionsMenu listId={list.id} />
            )}
          </div>
        ))}
      </div>

      {/* Create dialog */}
      {isCreateDialogOpen && (
        <CreateSwipefileDialog onClose={() => setIsCreateDialogOpen(false)} />
      )}
    </div>
  );
};