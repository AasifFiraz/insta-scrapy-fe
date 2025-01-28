import React from 'react';
import { DailyGrowth } from '../../../types/growth';
import { formatNumber } from '../../../utils/numberFormat';
import { TrendingUp, Image } from 'lucide-react';

interface GrowthTableMobileProps {
  data: DailyGrowth[];
}

export const GrowthTableMobile: React.FC<GrowthTableMobileProps> = ({ data }) => {
  return (
    <div className="space-y-2">
      {data.map((day, i) => (
        <div key={i} className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left side: Date and Followers */}
            <div className="min-w-0 flex-1">
              <div className="text-gray-400 text-xs mb-1">{day.date}</div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-300 truncate">
                  {formatNumber(day.followers.total)}
                </span>
                <span className={`text-xs ${
                  day.followers.change >= 0 ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  {day.followers.change >= 0 ? '+' : ''}
                  {formatNumber(day.followers.change)}
                </span>
              </div>
            </div>

            {/* Right side: Posts */}
            <div className="flex items-center gap-2">
              <Image className="w-3.5 h-3.5 text-gray-400" />
              <span className={`text-xs ${
                day.posts.new.length > 0 
                  ? 'text-emerald-500'
                  : day.posts.new.length < 0
                    ? 'text-red-500'
                    : 'text-white'
              }`}>
                {day.posts.new.length > 0 
                  ? `+${day.posts.new.length}`
                  : day.posts.new.length < 0
                    ? day.posts.new.length
                    : '0'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};