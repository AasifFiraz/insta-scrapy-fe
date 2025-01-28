import React from 'react';
import { SwipefileHeader } from './header/SwipefileHeader';
import { SwipefileContent } from './content/SwipefileContent';
import { SwipefileControls } from './controls/SwipefileControls';
import { useSwipefile } from '../../context/SwipefileContext';

export const SwipefilePage: React.FC = () => {
  const { state } = useSwipefile();

  return (
    <div className="min-h-screen bg-black pt-24 px-4 pb-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with controls */}
        <div className="bg-white/5 rounded-xl p-4 sm:p-6">
          <SwipefileHeader />
          <div className="mt-6">
            <SwipefileControls />
          </div>
        </div>

        {/* Main content */}
        <div className="w-full">
          <SwipefileContent 
            activeListId={state.activeListId}
            viewMode={state.viewMode}
          />
        </div>
      </div>
    </div>
  );
};