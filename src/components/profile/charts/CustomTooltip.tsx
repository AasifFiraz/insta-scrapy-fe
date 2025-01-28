import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { DataPoint } from '../../../types/metrics';
import { formatNumber } from '../../../utils/numberFormat';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload[0]) {
    return null;
  }

  const data = payload[0].payload as DataPoint;

  return (
    <div className="bg-black/90 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-white/20">
      <div className="mb-2">
        <p className="text-white font-medium">{data.date}</p>
        <p className="text-gray-300">{formatNumber(data.value)} followers</p>
      </div>

      {data.posts && data.posts.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="space-y-2">
            {data.posts.map(post => (
              <div key={post.id} className="flex items-center gap-3">
                <img 
                  src={post.thumbnail} 
                  alt={post.title}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{post.title}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};