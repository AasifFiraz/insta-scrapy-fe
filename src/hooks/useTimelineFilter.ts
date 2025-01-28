import { useState, useCallback } from 'react';
import { TimeRange } from '../types/metrics';
import { subDays } from 'date-fns';

export const useTimelineFilter = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('28D');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleTimeRangeChange = useCallback((range: TimeRange) => {
    setTimeRange(range);
    setStartDate(null);
    setEndDate(null);
  }, []);

  const handleDateRangeChange = useCallback((start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    setTimeRange('28D'); // Reset time range when custom dates are selected
  }, []);

  // Get the effective date range based on either timeRange or custom dates
  const getEffectiveDateRange = useCallback(() => {
    if (startDate && endDate) {
      return { start: startDate, end: endDate };
    }

    const end = new Date();
    let start: Date;

    switch (timeRange) {
      case '7D':
        start = subDays(end, 7);
        break;
      case '28D':
        start = subDays(end, 28);
        break;
      case '90D':
        start = subDays(end, 90);
        break;
      default:
        start = subDays(end, 28);
    }

    return { start, end };
  }, [timeRange, startDate, endDate]);

  return {
    timeRange,
    startDate,
    endDate,
    handleTimeRangeChange,
    handleDateRangeChange,
    getEffectiveDateRange
  };
};