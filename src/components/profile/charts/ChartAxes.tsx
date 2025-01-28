import React from 'react';
import { formatNumber } from '../../../utils/numberFormat';
import { DataPoint } from '../../../types/metrics';

interface ChartAxesProps {
  maxValue: number;
  minValue: number;
  data: DataPoint[];
}

export const ChartAxes: React.FC<ChartAxesProps> = ({ maxValue, minValue, data }) => {
  // Calculate y-axis values with proper distribution
  const valueRange = maxValue - minValue;
  const step = valueRange / 4;
  const yAxisValues = Array.from({ length: 5 }, (_, i) => maxValue - (step * i));
  
  // Calculate x-axis labels with proper spacing
  const labelCount = Math.min(7, data.length);
  const step_x = Math.max(1, Math.floor((data.length - 1) / (labelCount - 1)));
  const xAxisLabels = data.filter((_, i) => i % step_x === 0 || i === data.length - 1);

  return (
    <>
      {/* Y-axis labels */}
      <div className="absolute -left-16 h-full flex flex-col justify-between text-gray-400 text-xs">
        {yAxisValues.map((value, i) => (
          <div key={i} className="flex items-center h-6 -mt-3 first:mt-0 last:-mt-6">
            {formatNumber(value)}
          </div>
        ))}
      </div>

      {/* Y-axis grid lines */}
      <div className="absolute left-0 right-4 h-full pointer-events-none">
        {yAxisValues.map((_, i) => (
          <div
            key={i}
            className="absolute w-full border-t border-white/10"
            style={{ top: `${(i * 100) / 4}%` }}
          />
        ))}
      </div>

      {/* X-axis labels */}
      <div className="absolute left-0 right-4 top-full flex justify-between mt-4">
        {xAxisLabels.map((point, i) => (
          <div 
            key={i}
            className="text-gray-400 text-xs transform -translate-x-1/2"
            style={{
              position: 'absolute',
              left: `${(i * step_x / (data.length - 1)) * 100}%`,
              width: 'auto'
            }}
          >
            {point.date}
          </div>
        ))}
      </div>
    </>
  );
};