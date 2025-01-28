import React from 'react';
import { Tooltip } from '../../common/Tooltip';
import { MetricCardProps } from './types';
import { formatNumber } from '../../../../utils/numberFormat';

export const InsightMetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  tooltip
}) => {
  const formattedValue = typeof value === 'number' ? formatNumber(value) : value;
  const formattedChange = typeof change === 'number' ? formatNumber(change) : change;

  return (
    <div className="bg-white/5 rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-gray-400" />
          <div className="flex items-center gap-1">
            <span className="text-gray-400 text-sm">{title}</span>
            {tooltip && (
              <Tooltip content={tooltip}>
                <div className="w-4 h-4 rounded-full bg-white/10 text-gray-400 text-xs flex items-center justify-center cursor-help">
                  ?
                </div>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <div className="text-2xl font-bold text-white">{formattedValue}</div>
        {change && (
          <div className={`text-sm ${
            changeType === 'increase' ? 'text-emerald-500' : 
            changeType === 'decrease' ? 'text-red-500' : 
            'text-gray-400'
          }`}>
            {changeType === 'increase' ? '+' : ''}
            {formattedChange}
          </div>
        )}
      </div>
    </div>
  );
};