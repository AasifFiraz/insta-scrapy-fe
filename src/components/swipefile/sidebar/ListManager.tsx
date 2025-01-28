import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { CreateSwipefileDialog } from './CreateSwipefileDialog';

export const ListManager: React.FC = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsCreateDialogOpen(true)}
        className="w-full px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        <span>Create Swipefile</span>
      </button>

      {isCreateDialogOpen && (
        <CreateSwipefileDialog onClose={() => setIsCreateDialogOpen(false)} />
      )}
    </>
  );
};