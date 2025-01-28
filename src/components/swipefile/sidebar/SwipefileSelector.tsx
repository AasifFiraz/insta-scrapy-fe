import React from 'react';
import { Folder } from 'lucide-react';
import { useSwipefile } from '../../../context/SwipefileContext';
import { useSwipefileActions } from '../../../hooks/useSwipefileActions';
import { SwipefileOptionsMenu } from './SwipefileOptionsMenu';

export const SwipefileSelector: React.FC = () => {
  const { state } = useSwipefile();
  const { setActiveList } = useSwipefileActions();

  return (
    <div className="space-y-1">
      {state.lists.map((list) => (
        <div
          key={list.id}
          className={`group flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
            state.activeListId === list.id
              ? 'bg-white/10 text-white'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
          onClick={() => setActiveList(list.id)}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Folder className="w-4 h-4 shrink-0" />
            <span className="truncate">{list.name}</span>
            {list.description && (
              <span className="text-xs text-gray-500 truncate hidden group-hover:inline">
                • {list.description}
              </span>
            )}
          </div>

          {list.id !== 'all' && (
            <SwipefileOptionsMenu listId={list.id} />
          )}
        </div>
      ))}
    </div>
  );
};