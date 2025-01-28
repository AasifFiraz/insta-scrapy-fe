import React, { createContext, useContext, useState, useCallback } from 'react';
import { TimeRange } from '../../../types/metrics';

interface TimeRangeContextType {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
}

const TimeRangeContext = createContext<TimeRangeContextType | undefined>(undefined);

interface TimeRangeProviderProps {
  children: React.ReactNode;
  initialValue: TimeRange;
  onChange: (range: TimeRange) => void;
}

export const TimeRangeProvider: React.FC<TimeRangeProviderProps> = ({ 
  children,
  initialValue,
  onChange
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>(initialValue);

  const handleTimeRangeChange = useCallback((range: TimeRange) => {
    setTimeRange(range);
    onChange(range);
  }, [onChange]);

  return (
    <TimeRangeContext.Provider value={{ 
      timeRange, 
      setTimeRange: handleTimeRangeChange 
    }}>
      {children}
    </TimeRangeContext.Provider>
  );
};

export const useTimeRange = () => {
  const context = useContext(TimeRangeContext);
  if (!context) {
    throw new Error('useTimeRange must be used within a TimeRangeProvider');
  }
  return context;
};