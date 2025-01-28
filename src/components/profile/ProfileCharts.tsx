import React from 'react';
import { ProfileDetailedInfo } from '../../types/profile';

interface ProfileChartsProps {
  profile: ProfileDetailedInfo;
}

export const ProfileCharts: React.FC<ProfileChartsProps> = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Monthly Views</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {/* Placeholder for actual chart */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t"
              style={{ height: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      </div>
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Subscriber Growth</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {/* Placeholder for actual chart */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t"
              style={{ height: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};