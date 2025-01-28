import { parseRelativeWeekday } from './weekdayParser';
import { parseRelativeTimeExpression } from './wordParser';
import { parse, isValid } from 'date-fns';

export function parseNaturalDate(input: string): Date | null {
  // Convert to lowercase and trim whitespace
  const text = input.toLowerCase().trim();

  // Try parsing relative time expressions first (e.g., "three weeks ago")
  const relativeDate = parseRelativeTimeExpression(text);
  if (relativeDate) return relativeDate;

  // Try parsing weekday expressions (e.g., "last friday")
  const weekdayDate = parseRelativeWeekday(text);
  if (weekdayDate) return weekdayDate;

  // Handle simple relative dates
  if (text === 'today') {
    return new Date();
  }
  if (text === 'yesterday') {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }

  // Handle "X days ago" format
  const daysAgoMatch = text.match(/^(\d+)\s*(day|days|d)s?\s*ago$/);
  if (daysAgoMatch) {
    const days = parseInt(daysAgoMatch[1]);
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }

  // Handle "last X" format
  const lastUnitMatch = text.match(/^last\s+(week|month|year)$/);
  if (lastUnitMatch) {
    const date = new Date();
    const unit = lastUnitMatch[1];
    switch (unit) {
      case 'week':
        date.setDate(date.getDate() - 7);
        break;
      case 'month':
        date.setMonth(date.getMonth() - 1);
        break;
      case 'year':
        date.setFullYear(date.getFullYear() - 1);
        break;
    }
    return date;
  }

  // Try standard date formats as fallback
  const standardFormats = [
    'MM/dd/yy',
    'MM/dd/yyyy',
    'M/d/yy',
    'M/d/yyyy',
    'MMM d yyyy',
    'MMMM d yyyy',
    'yyyy-MM-dd',
    'MMMM d, yyyy',
    'MMM d, yyyy'
  ];

  for (const format of standardFormats) {
    const parsed = parse(text, format, new Date());
    if (isValid(parsed)) {
      return parsed;
    }
  }

  return null;
}