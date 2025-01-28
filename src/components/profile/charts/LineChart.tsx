import React from 'react';

export const LineChart: React.FC = () => {
  return (
    <div className="h-64 flex items-end justify-between gap-2">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t"
          style={{ height: `${Math.random() * 100}%` }}
        />
      ))}
    </div>
  );
};