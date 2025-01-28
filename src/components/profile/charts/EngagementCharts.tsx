import React from 'react';
import { ProfileDetailedInfo } from '../../../types/profile';
import { TimeRangeSelector } from './TimeRangeSelector';
import { LineChart } from './LineChart';

interface EngagementChartsProps {
  profile: ProfileDetailedInfo;
}

export const EngagementCharts: React.FC<EngagementChartsProps> = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold">Follower Growth</h3>
          <TimeRangeSelector />
        </div>
        <LineChart />
      </div>
      <div className="bg-white/5 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold">Post Engagement</h3>
          <TimeRangeSelector />
        </div>
        <LineChart />
      </div>
    </div>
  );
};