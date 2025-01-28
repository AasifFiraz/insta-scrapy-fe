import React from 'react';
import { useSwipefile } from '../../../../context/SwipefileContext';
import { SavedAnalytics } from '../../../profile/save/analytics/SavedAnalytics';
import { InsightsMetricsGrid } from '../../../profile/insights/metrics/InsightsMetricsGrid';
import { useInsightsMetrics } from '../../../../hooks/useInsightsMetrics';

interface InsightsViewProps {
  listId: string | null;
}

export const InsightsView: React.FC<InsightsViewProps> = ({ listId }) => {
  const { state } = useSwipefile();

  // Get all handles from the current list
  const handles = React.useMemo(() => {
    if (!listId) return [];
    
    const list = state.lists.find(l => l.id === listId);
    if (!list) return [];

    return list.profileIds
      .map(id => state.savedProfiles.find(p => p.id === id)?.handle)
      .filter(Boolean) as string[];
  }, [state.lists, state.savedProfiles, listId]);

  // Get aggregated metrics for all handles
  const { metrics, isLoading } = useInsightsMetrics(handles[0]); // TODO: Aggregate metrics from all handles

  if (handles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No profiles in this list yet.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-6">
              <div className="h-4 bg-white/10 rounded w-24 mb-4" />
              <div className="h-8 bg-white/10 rounded w-32" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      {metrics && (
        <div className="px-4 -mx-4 sm:px-0 sm:mx-0">
          <InsightsMetricsGrid metrics={metrics} />
        </div>
      )}

      {/* Analytics Components */}
      {handles.map(handle => (
        <SavedAnalytics 
          key={handle}
          handle={handle}
          postType="all"
        />
      ))}
    </div>
  );
};