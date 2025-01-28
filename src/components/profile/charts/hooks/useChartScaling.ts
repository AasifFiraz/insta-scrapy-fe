import { useMemo } from 'react';
import { DataPoint } from '../../../../types/metrics';

export const useChartScaling = (data: DataPoint[]) => {
  return useMemo(() => {
    if (!data || data.length === 0) {
      return {
        pathD: '',
        areaPathD: '',
        valueRange: 0,
        maxValue: 0,
        minValue: 0
      };
    }

    const values = data.map(d => d.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const valueRange = maxValue - minValue;
    const padding = valueRange * 0.1;

    // Calculate points with padding and ensure minimum range
    const effectiveMax = maxValue + padding;
    const effectiveMin = Math.max(0, minValue - padding);
    const effectiveRange = Math.max(effectiveMax - effectiveMin, 1); // Prevent division by zero

    // Generate normalized points (0-100 range) with smoothing
    const points = data.map((d, i) => ({
      x: (i / Math.max(data.length - 1, 1)) * 100,
      y: 100 - ((d.value - effectiveMin) / effectiveRange) * 100
    }));

    // Generate SVG paths with cubic bezier curves for smoothing
    const pathD = points.length > 1 
      ? `M ${points[0].x} ${points[0].y} ` + 
        points.slice(1).map((point, i) => {
          const prev = points[i];
          const cp1x = prev.x + (point.x - prev.x) * 0.5;
          const cp2x = prev.x + (point.x - prev.x) * 0.5;
          return `C ${cp1x} ${prev.y} ${cp2x} ${point.y} ${point.x} ${point.y}`;
        }).join(' ')
      : '';
      
    const areaPathD = points.length > 1
      ? `${pathD} L ${points[points.length - 1].x} 100 L 0 100 Z`
      : '';

    return {
      pathD,
      areaPathD,
      valueRange: effectiveRange,
      maxValue: effectiveMax,
      minValue: effectiveMin
    };
  }, [data]);
};