import React from 'react';

export const TimeRangeSelector: React.FC = () => {
  return (
    <div className="flex gap-2">
      {['7D', '30D', '3M', '1Y', 'Max'].map((range) => (
        <button
          key={range}
          className={`px-3 py-1 rounded-lg text-sm ${
            range === '30D'
              ? 'bg-white/10 text-white'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
};