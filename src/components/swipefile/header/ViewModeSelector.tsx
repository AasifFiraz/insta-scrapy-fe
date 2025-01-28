import React from 'react';
import { Users, Grid, Lightbulb } from 'lucide-react';
import { SwipefileViewMode } from '../../../types/swipefile';
import { useSwipefile } from '../../../context/SwipefileContext';
import { useSwipefileActions } from '../../../hooks/useSwipefileActions';

export const ViewModeSelector: React.FC = () => {
  const { state } = useSwipefile();
  const { setViewMode } = useSwipefileActions();

  const modes: { id: SwipefileViewMode; label: string; icon: React.ElementType }[] = [
    { id: 'profiles', label: 'Profiles', icon: Users },
    { id: 'posts', label: 'Posts', icon: Grid },
    { id: 'insights', label: 'Insights', icon: Lightbulb }
  ];

  return (
    <div className="flex gap-2 bg-white/5 rounded-lg p-1">
      {modes.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setViewMode(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            state.viewMode === id
              ? 'bg-white/10 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};