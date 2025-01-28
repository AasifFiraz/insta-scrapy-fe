import React, { useState, useRef } from 'react';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useSwipefileActions } from '../../../hooks/useSwipefileActions';
import { EditSwipefileDialog } from '../dialogs/EditSwipefileDialog';

interface SwipefileOptionsMenuProps {
  listId: string;
}

export const SwipefileOptionsMenu: React.FC<SwipefileOptionsMenuProps> = ({ listId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { deleteList } = useSwipefileActions();

  useClickOutside(menuRef, () => setIsOpen(false));

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this swipefile?')) {
      deleteList(listId);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={handleClick}
        className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-36 bg-black border border-white/10 rounded-lg shadow-xl overflow-hidden z-10">
          <button
            onClick={handleEdit}
            className="w-full px-3 py-2 flex items-center gap-2 text-sm text-left hover:bg-white/5 text-gray-400 hover:text-white"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-3 py-2 flex items-center gap-2 text-sm text-left hover:bg-white/5 text-red-400 hover:text-red-300"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      )}

      {isEditDialogOpen && (
        <EditSwipefileDialog 
          listId={listId} 
          onClose={() => setIsEditDialogOpen(false)} 
        />
      )}
    </div>
  );
};