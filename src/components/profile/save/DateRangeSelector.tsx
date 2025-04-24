import React, { useState, useRef } from 'react';
import { Calendar, X } from 'lucide-react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { format } from 'date-fns';
import { DateRangePopup } from './DateRangePopup';

interface DateRangeProps {
  startDate: Date | null | undefined;  // Updated to allow undefined
  endDate: Date | null | undefined;    // Updated to allow undefined
  onDateChange: (start: Date | null, end: Date | null) => void;
  maxDays?: number; // Maximum allowed days in the range
  isLoading?: boolean; // Whether the component should be disabled
}

export const DateRangeSelector: React.FC<DateRangeProps> = ({
  startDate,
  endDate,
  onDateChange,
  maxDays,
  isLoading = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useClickOutside(buttonRef, () => setIsOpen(false), isOpen);

  const formatDisplayDate = (date: Date | null | undefined) => {
    if (!date) return '';
    return format(date, 'MMM d, yyyy');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDateChange(null, null);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={buttonRef}>
      {/* Mobile version */}
      <div className="sm:hidden flex gap-2 bg-white/5 rounded-lg p-1">
        <button
          onClick={() => !isLoading && setIsOpen(!isOpen)}
          className={`flex-1 p-2 rounded-md transition-colors text-gray-400 ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
          disabled={isLoading}
        >
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {startDate && endDate ? 'Custom' : 'Last 7 days'}
            </span>
          </div>
        </button>
      </div>

      {/* Desktop version */}
      <div
        onClick={() => !isLoading && setIsOpen(!isOpen)}
        className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-white/5 ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-white/10'} text-white w-full sm:w-auto cursor-pointer`}
      >
        <Calendar className="w-4 h-4 shrink-0" />
        <span className="truncate">
          {startDate && endDate ? (
            <span className="flex items-center gap-2">
              <span className="truncate">
                {formatDisplayDate(startDate)} - {formatDisplayDate(endDate)}
              </span>
              <div
                onClick={(e) => !isLoading && handleClear(e)}
                className={`p-0.5 ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-white/10'} rounded cursor-pointer`}
              >
                <X className="w-3 h-3" />
              </div>
            </span>
          ) : (
            'Last 7 days'
          )}
        </span>
      </div>

      {isOpen && (
        <DateRangePopup
          startDate={startDate || null}  // Convert undefined to null
          endDate={endDate || null}      // Convert undefined to null
          onDateChange={onDateChange}
          onClose={() => setIsOpen(false)}
          isMobile={window.innerWidth < 640}
          maxDays={maxDays}
        />
      )}
    </div>
  );
};
