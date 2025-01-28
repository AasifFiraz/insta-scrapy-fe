import React from 'react';
import { SavedAnalytics } from './analytics/SavedAnalytics';

interface SaveTabProps {
  handle: string;
  startDate?: Date | null;
  endDate?: Date | null;
}

export const SaveTab: React.FC<SaveTabProps> = ({ 
  handle,
  startDate,
  endDate
}) => {
  return (
    <SavedAnalytics 
      handle={handle}
      startDate={startDate}
      endDate={endDate}
    />
  );
};