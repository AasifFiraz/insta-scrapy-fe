import React, { useState, useRef } from 'react';
import { Calendar, X } from 'lucide-react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { format } from 'date-fns';
import { DateRangePopup } from './DateRangePopup';

interface DateRangeProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (start: Date | null, end: Date | null) => void;
}

export const DateRangeSelector: React.FC<DateRangeProps> = ({
  startDate,
  endDate,
  onDateChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useClickOutside(buttonRef, () => setIsOpen(false), isOpen);

  const formatDisplayDate = (date: Date | null) => {
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
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 p-2 rounded-md transition-colors text-gray-400 hover:text-white"
        >
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {startDate && endDate ? 'Custom' : 'All Time'}
            </span>
          </div>
        </button>
      </div>

      {/* Desktop version */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-white/5 hover:bg-white/10 text-white w-full sm:w-auto cursor-pointer"
      >
        <Calendar className="w-4 h-4 shrink-0" />
        <span className="truncate">
          {startDate && endDate ? (
            <span className="flex items-center gap-2">
              <span className="truncate">
                {formatDisplayDate(startDate)} - {formatDisplayDate(endDate)}
              </span>
              <div
                onClick={handleClear}
                className="p-0.5 hover:bg-white/10 rounded cursor-pointer"
              >
                <X className="w-3 h-3" />
              </div>
            </span>
          ) : (
            'All Time'
          )}
        </span>
      </div>

      {isOpen && (
        <DateRangePopup
          startDate={startDate}
          endDate={endDate}
          onDateChange={onDateChange}
          onClose={() => setIsOpen(false)}
          isMobile={window.innerWidth < 640}
        />
      )}
    </div>
  );
};