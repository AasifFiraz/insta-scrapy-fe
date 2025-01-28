import React from 'react';
import { formatNumber } from '../../../../utils/numberFormat';

interface SavedChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const SavedChartTooltip: React.FC<SavedChartTooltipProps> = ({ 
  active, 
  payload, 
  label 
}) => {
  if (!active || !payload || !payload[0]) {
    return null;
  }

  const data = payload[0].payload;

  return (
    <div className="bg-black/90 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-white/20">
      <p className="text-white font-medium mb-1">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-gray-300">
          {entry.dataKey === 'followers' ? 'Followers: ' : 'Engagement: '}
          <span className="font-medium">{formatNumber(entry.value)}</span>
        </p>
      ))}
    </div>
  );
};