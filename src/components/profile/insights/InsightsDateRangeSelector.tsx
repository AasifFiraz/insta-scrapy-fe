import React from 'react';
import { DateRangeSelector } from '../save/DateRangeSelector';
import { differenceInDays, subDays } from 'date-fns';

interface InsightsDateRangeSelectorProps {
  startDate: Date | null | undefined;
  endDate: Date | null | undefined;
  onDateChange: (start: Date | null, end: Date | null) => void;
  isLoading?: boolean;
}

export const InsightsDateRangeSelector: React.FC<InsightsDateRangeSelectorProps> = ({
  startDate,
  endDate,
  onDateChange,
  isLoading = false
}) => {
  // Custom date change handler to enforce 30-day limit
  const handleDateChange = (start: Date | null, end: Date | null) => {
    if (start && end) {
      const days = differenceInDays(end, start);
      if (days > 30) {
        // Adjust startDate to be 30 days before endDate
        const newStartDate = subDays(end, 30);
        onDateChange(newStartDate, end);
      } else {
        onDateChange(start, end);
      }
    } else {
      onDateChange(start, end);
    }
  };

  return (
    <DateRangeSelector
      startDate={startDate}
      endDate={endDate}
      onDateChange={handleDateChange}
      isLoading={isLoading}
    />
  );
};