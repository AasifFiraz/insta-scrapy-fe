import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useSwipefileActions } from '../../../hooks/useSwipefileActions';

interface CreateSwipefileDialogProps {
  onClose: () => void;
}

export const CreateSwipefileDialog: React.FC<CreateSwipefileDialogProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { createList } = useSwipefileActions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      createList(name.trim(), description.trim() || undefined);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-black border border-white/10 rounded-xl p-6 z-50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Create New Swipefile</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Swipefile Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Growth Experts"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description for your swipefile..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 h-24 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Swipefile
            </button>
          </div>
        </form>
      </div>
    </>
  );
};