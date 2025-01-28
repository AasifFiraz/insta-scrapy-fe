import React from 'react';
import { DataPoint } from '../../../types/metrics';
import { useChartScaling } from './hooks/useChartScaling';

interface ChartAreaProps {
  data: DataPoint[];
  onHover: (point: DataPoint | null) => void;
}

export const ChartArea: React.FC<ChartAreaProps> = ({ data, onHover }) => {
  const { pathD, areaPathD } = useChartScaling(data);

  if (!data || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <div className="h-full relative">
      <svg 
        className="w-full h-full overflow-visible" 
        preserveAspectRatio="none"
        viewBox={`0 0 100 100`}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        {areaPathD && (
          <path
            d={areaPathD}
            fill="url(#areaGradient)"
          />
        )}

        {/* Line */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>

      {/* Hover areas */}
      <div className="absolute inset-0 flex">
        {data.map((point, i) => (
          <div
            key={i}
            className="h-full flex-1 group cursor-pointer"
            onMouseEnter={() => onHover(point)}
            onMouseLeave={() => onHover(null)}
          >
            <div className="hidden group-hover:block absolute bottom-0 h-full w-px bg-white/20" 
              style={{ left: `${(i / (data.length - 1)) * 100}%` }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};