import React from 'react';
import { formatNumber } from '../../../utils/numberFormat';
import { GrowthDataPoint } from '../../../hooks/useProfileAnalytics';

interface GrowthTableProps {
  handle: string;
  growthData: GrowthDataPoint[];
}

export const GrowthTable: React.FC<GrowthTableProps> = ({ growthData }) => {
  if (!growthData?.length) {
    return (
      <div className="bg-white/5 rounded-xl p-6">
        <div className="text-gray-400 text-center">No growth data available</div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-semibold">Daily Growth</h3>
      </div>
      
      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="pb-4">Date</th>
              <th className="pb-4">Total Followers</th>
              <th className="pb-4">Follower Change</th>
              <th className="pb-4">Total Posts</th>
              <th className="pb-4">New Posts</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {growthData.map((day, i) => (
              <tr key={i} className="border-t border-white/5">
                <td className="py-4">{day.date}</td>
                <td className="py-4">{formatNumber(day.totalFollowers)}</td>
                <td className="py-4">
                  <span className={day.followerChange >= 0 ? 'text-emerald-500' : 'text-red-500'}>
                    {day.followerChange >= 0 ? '+' : ''}{formatNumber(day.followerChange)}
                  </span>
                </td>
                <td className="py-4">{formatNumber(day.totalPosts)}</td>
                <td className="py-4">
                  {day.newPosts > 0 && (
                    <span className="text-emerald-500">+{day.newPosts}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="sm:hidden space-y-2">
        {growthData.map((day, i) => (
          <div key={i} className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-gray-400 text-xs mb-1">{day.date}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-300">
                    {formatNumber(day.totalFollowers)}
                  </span>
                  <span className={`text-xs ${
                    day.followerChange >= 0 ? 'text-emerald-500' : 'text-red-500'
                  }`}>
                    {day.followerChange >= 0 ? '+' : ''}{formatNumber(day.followerChange)}
                  </span>
                </div>
              </div>
              {day.newPosts > 0 && (
                <span className="text-xs text-emerald-500">+{day.newPosts} posts</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
