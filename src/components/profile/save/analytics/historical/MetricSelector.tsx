import React, { useState, useRef } from 'react';
import { HistoricalMetric, MetricOption, METRIC_OPTIONS } from './types';
import { useClickOutside } from '../../../../../hooks/useClickOutside';

interface MetricSelectorProps {
  selectedMetric: HistoricalMetric;
  onChange: (metric: HistoricalMetric) => void;
}

export const MetricSelector: React.FC<MetricSelectorProps> = ({
  selectedMetric,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const selectedOption = METRIC_OPTIONS.find(m => m.value === selectedMetric);
  const isMobile = window.innerWidth < 640;

  const categories = {
    growth: 'Growth Metrics',
    engagement: 'Engagement Metrics',
    content: 'Content Metrics'
  };

  const handleSelect = (metric: HistoricalMetric) => {
    onChange(metric);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/5 hover:bg-white/10 text-white w-full"
        >
          <span className="truncate">{selectedOption?.label}</span>
        </button>

        {isOpen && (
          <>
            {/* Mobile Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile Bottom Sheet */}
            <div className="fixed inset-x-0 bottom-0 bg-black border-t border-white/10 rounded-t-xl p-4 space-y-6 z-50 max-h-[80vh] overflow-y-auto">
              <div className="text-center mb-2">
                <h3 className="text-white font-semibold text-lg">Select Metric</h3>
              </div>

              {Object.entries(categories).map(([category, title]) => (
                <div key={category} className="space-y-3">
                  <h4 className="text-white font-bold text-base">{title}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {METRIC_OPTIONS
                      .filter(metric => metric.category === category)
                      .map(metric => (
                        <button
                          key={metric.value}
                          onClick={() => handleSelect(metric.value)}
                          className={`p-3 rounded-lg text-left ${
                            selectedMetric === metric.value
                              ? 'bg-white/10 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <div className="text-sm font-medium">{metric.label}</div>
                          <div className="text-xs mt-1 line-clamp-2">{metric.description}</div>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/5 hover:bg-white/10 text-white"
      >
        <span>{selectedOption?.label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-black border border-white/10 rounded-lg shadow-xl z-10">
          {Object.entries(categories).map(([category, title]) => (
            <div key={category} className="border-b border-white/10 last:border-0">
              <div className="px-4 py-3">
                <h4 className="text-white font-bold text-base">{title}</h4>
              </div>
              {METRIC_OPTIONS
                .filter(metric => metric.category === category)
                .map(metric => (
                  <button
                    key={metric.value}
                    onClick={() => handleSelect(metric.value)}
                    className={`w-full px-4 py-3 text-left hover:bg-white/5 ${
                      selectedMetric === metric.value ? 'bg-white/10' : ''
                    }`}
                  >
                    <div className="text-sm font-medium text-white">{metric.label}</div>
                    <div className="text-xs text-gray-400">{metric.description}</div>
                  </button>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};