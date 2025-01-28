import React from 'react';
import { Users, Image, Heart, MessageCircle } from 'lucide-react';
import { MetricCard } from '../../metrics/MetricCard';
import { useSavedAnalytics } from '../../../../hooks/useSavedAnalytics';
import { formatNumber } from '../../../../utils/numberFormat';

interface SavedMetricsOverviewProps {
  handle: string;
  startDate?: Date | null;
  endDate?: Date | null;
}

export const SavedMetricsOverview: React.FC<SavedMetricsOverviewProps> = ({ 
  handle,
  startDate,
  endDate
}) => {
  const { data, isLoading } = useSavedAnalytics(handle, startDate, endDate);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-white/10 rounded w-24" />
              <div className="h-5 w-5 bg-white/10 rounded" />
            </div>
            <div className="h-8 bg-white/10 rounded w-32 mb-2" />
            <div className="h-4 bg-white/10 rounded w-16" />
          </div>
        ))}
      </div>
    );
  }

  const metrics = [
    {
      label: "Total Followers",
      value: formatNumber(data.totalFollowers),
      change: data.followerGrowth ? `${data.followerGrowth >= 0 ? '+' : ''}${formatNumber(data.followerGrowth)}` : "0",
      icon: Users
    },
    {
      label: "Total Posts",
      value: formatNumber(data.totalPosts),
      change: "+8.3%",
      icon: Image
    },
    {
      label: "Average Engagement",
      value: formatNumber(data.averageEngagement || 0),
      change: "+15.2%",
      icon: Heart
    },
    {
      label: "Total Comments",
      value: formatNumber(data.totalComments),
      change: "+10.7%",
      icon: MessageCircle
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          label={metric.label}
          value={metric.value}
          change={metric.change}
          icon={metric.icon}
        />
      ))}
    </div>
  );
};