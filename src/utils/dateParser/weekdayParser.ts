import { WEEKDAYS, RELATIVE_WEEKDAY_PATTERNS } from './constants';
import { addDays, subDays, subWeeks, startOfWeek } from 'date-fns';

export function parseRelativeWeekday(input: string): Date | null {
  const text = input.toLowerCase().trim();
  
  // Handle "last [weekday]"
  const lastWeekdayMatch = text.match(RELATIVE_WEEKDAY_PATTERNS[0]);
  if (lastWeekdayMatch) {
    const weekday = WEEKDAYS.indexOf(lastWeekdayMatch[1]);
    if (weekday === -1) return null;
    
    const today = new Date();
    const currentDay = today.getDay();
    const daysToSubtract = currentDay <= weekday ? 
      7 + (currentDay - weekday) : 
      (currentDay - weekday);
    
    return subDays(today, daysToSubtract);
  }

  // Handle "[weekday] from last week"
  const lastWeekMatch = text.match(RELATIVE_WEEKDAY_PATTERNS[1]);
  if (lastWeekMatch) {
    const weekday = WEEKDAYS.indexOf(lastWeekMatch[1]);
    if (weekday === -1) return null;
    
    const lastWeek = subWeeks(new Date(), 1);
    const startOfLastWeek = startOfWeek(lastWeek);
    return addDays(startOfLastWeek, weekday);
  }

  // Handle "[weekday] [n] weeks ago"
  const weeksAgoMatch = text.match(RELATIVE_WEEKDAY_PATTERNS[2]);
  if (weeksAgoMatch) {
    const weekday = WEEKDAYS.indexOf(weeksAgoMatch[1]);
    const weeksAgo = parseInt(weeksAgoMatch[2], 10);
    if (weekday === -1 || isNaN(weeksAgo)) return null;
    
    const targetWeek = subWeeks(new Date(), weeksAgo);
    const startOfTargetWeek = startOfWeek(targetWeek);
    return addDays(startOfTargetWeek, weekday);
  }

  return null;
}