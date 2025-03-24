import React, { useState, useRef } from 'react';
import { parseNaturalDate } from '../../../utils/dateParser';
import { format, differenceInDays, subDays } from 'date-fns';
import { Calendar, AlertCircle } from 'lucide-react';

interface DateRangePopupProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (start: Date | null, end: Date | null) => void;
  onClose: () => void;
  isMobile?: boolean;
  maxDays?: number; // Maximum allowed number of days in the range
}

export const DateRangePopup: React.FC<DateRangePopupProps> = ({
  startDate,
  endDate,
  onDateChange,
  onClose,
  isMobile = false,
  maxDays
}) => {
  const [tempStart, setTempStart] = useState(startDate);
  const [tempEnd, setTempEnd] = useState(endDate);
  const [startInput, setStartInput] = useState(startDate ? format(startDate, 'MMM d, yyyy') : '');
  const [endInput, setEndInput] = useState(endDate ? format(endDate, 'MMM d, yyyy') : '');
  const endInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (value: string, isStart: boolean) => {
    if (isStart) {
      setStartInput(value);
    } else {
      setEndInput(value);
    }

    const parsedDate = parseNaturalDate(value);
    if (parsedDate) {
      if (isStart) {
        setTempStart(parsedDate);
        if (tempEnd && parsedDate > tempEnd) {
          setTempEnd(parsedDate);
          setEndInput(format(parsedDate, 'MMM d, yyyy'));
        } else if (tempEnd && maxDays && differenceInDays(tempEnd, parsedDate) > maxDays) {
          // If the new date would exceed maxDays, adjust it
          const newStart = subDays(tempEnd, maxDays);
          setTempStart(newStart);
          setStartInput(format(newStart, 'MMM d, yyyy'));
        } else {
          setTempStart(parsedDate);
        }
      } else {
        if (tempStart && parsedDate < tempStart) {
          setTempStart(parsedDate);
          setStartInput(format(parsedDate, 'MMM d, yyyy'));
        } else if (tempStart && maxDays && differenceInDays(parsedDate, tempStart) > maxDays) {
          // If the new date would exceed maxDays, adjust it
          const newEnd = subDays(parsedDate, 0); // Keep the selected end date
          const newStart = subDays(newEnd, maxDays); // But adjust the start date
          setTempStart(newStart);
          setStartInput(format(newStart, 'MMM d, yyyy'));
          setTempEnd(newEnd);
          setEndInput(format(newEnd, 'MMM d, yyyy'));
        } else {
          setTempEnd(parsedDate);
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, isStart: boolean) => {
    if (e.key === 'Enter') {
      if (isStart) {
        endInputRef.current?.focus();
      } else {
        handleApply();
      }
    }
  };

  const handleApply = () => {
    // Enforce maxDays if set
    if (maxDays && tempStart && tempEnd) {
      const days = differenceInDays(tempEnd, tempStart);
      if (days > maxDays) {
        // Adjust startDate to respect maxDays
        const newStartDate = subDays(tempEnd, maxDays);
        onDateChange(newStartDate, tempEnd);
        onClose();
        return;
      }
    }
    
    onDateChange(tempStart, tempEnd);
    onClose();
  };

  const handleClear = () => {
    setTempStart(null);
    setTempEnd(null);
    setStartInput('');
    setEndInput('');
    onDateChange(null, null);
    onClose();
  };

  const quickSelects = [
    { label: 'Last 7 days', value: '7 days ago' },
    { label: 'Last 30 days', value: '30 days ago' },
    { label: 'Last 90 days', value: '90 days ago' }
  ];

  // Filter out options that exceed maxDays
  const filteredQuickSelects = maxDays 
    ? quickSelects.filter(option => {
        const days = parseInt(option.value.split(' ')[0]);
        return days <= maxDays;
      })
    : quickSelects;

  // Add a note about the maximum days limit if specified
  const maxDaysNote = maxDays 
    ? `Note: Maximum range is limited to ${maxDays} days.`
    : null;

  if (isMobile) {
    return (
      <>
        {/* Mobile Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        
        {/* Mobile Bottom Sheet */}
        <div 
          className="fixed inset-x-0 bottom-0 bg-black border-t border-white/10 rounded-t-xl p-4 space-y-4 z-50"
          onClick={e => e.stopPropagation()}
        >
          {/* Quick select buttons */}
          <div className="grid grid-cols-3 gap-2">
            {filteredQuickSelects.map(({ label, value }) => (
              <button
                key={label}
                onClick={() => {
                  const end = new Date();
                  const start = parseNaturalDate(value);
                  if (start) {
                    setTempStart(start);
                    setTempEnd(end);
                    setStartInput(format(start, 'MMM d, yyyy'));
                    setEndInput(format(end, 'MMM d, yyyy'));
                  }
                }}
                className="px-3 py-2 rounded-lg text-sm bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Date inputs */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={startInput}
                  onChange={(e) => handleInputChange(e.target.value, true)}
                  onKeyDown={(e) => handleKeyDown(e, true)}
                  placeholder="e.g. '7 days ago' or 'last week'"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">End Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={endInputRef}
                  type="text"
                  value={endInput}
                  onChange={(e) => handleInputChange(e.target.value, false)}
                  onKeyDown={(e) => handleKeyDown(e, false)}
                  placeholder="e.g. 'today' or 'yesterday'"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Try: "today", "yesterday", "last week", "7 days ago"
          </p>

          {maxDaysNote && (
            <div className="flex items-center gap-2 text-xs text-amber-500">
              <AlertCircle className="w-4 h-4" />
              <p>{maxDaysNote}</p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleClear}
              className="flex-1 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5"
            >
              Clear
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-3 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Apply
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Desktop Backdrop */}
      <div 
        className="fixed inset-0 z-50"
        onClick={onClose}
      />
      
      {/* Desktop Popup */}
      <div className="absolute right-0 mt-2 w-[400px] bg-black border border-white/10 rounded-lg shadow-xl p-4 z-50">
        {/* Quick select buttons */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {filteredQuickSelects.map(({ label, value }) => (
            <button
              key={label}
              onClick={() => {
                const end = new Date();
                const start = parseNaturalDate(value);
                if (start) {
                  setTempStart(start);
                  setTempEnd(end);
                  setStartInput(format(start, 'MMM d, yyyy'));
                  setEndInput(format(end, 'MMM d, yyyy'));
                }
              }}
              className="px-3 py-2 rounded-lg text-sm bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Date inputs */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Start Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={startInput}
                onChange={(e) => handleInputChange(e.target.value, true)}
                onKeyDown={(e) => handleKeyDown(e, true)}
                placeholder="e.g. '7 days ago' or 'last week'"
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">End Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={endInputRef}
                type="text"
                value={endInput}
                onChange={(e) => handleInputChange(e.target.value, false)}
                onKeyDown={(e) => handleKeyDown(e, false)}
                placeholder="e.g. 'today' or 'yesterday'"
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Try: "today", "yesterday", "last week", "7 days ago"
        </p>

        {maxDaysNote && (
          <div className="flex items-center gap-2 text-xs text-amber-500 mt-2">
            <AlertCircle className="w-4 h-4" />
            <p>{maxDaysNote}</p>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5"
          >
            Clear
          </button>
          <button
            onClick={handleApply}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};