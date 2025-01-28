import { NUMBER_WORDS, TIME_UNITS } from './constants';

export function parseNumberWords(text: string): number | null {
  // Convert text to lowercase and trim
  text = text.toLowerCase().trim();
  
  // Direct match with number words
  if (text in NUMBER_WORDS) {
    return NUMBER_WORDS[text as keyof typeof NUMBER_WORDS];
  }

  // Handle compound numbers (e.g., "twenty five")
  const parts = text.split(/\s+/);
  if (parts.length === 2) {
    const tens = NUMBER_WORDS[parts[0] as keyof typeof NUMBER_WORDS];
    const ones = NUMBER_WORDS[parts[1] as keyof typeof NUMBER_WORDS];
    if (tens && ones && tens % 10 === 0) {
      return tens + ones;
    }
  }

  // Try parsing as a regular number
  const num = parseInt(text);
  return isNaN(num) ? null : num;
}

export function parseRelativeTimeExpression(text: string): Date | null {
  // Convert to lowercase and trim
  text = text.toLowerCase().trim();
  
  // Match patterns like "three weeks ago", "2 months ago"
  const matches = text.match(/^([\w\s]+)\s+(day|days|week|weeks|month|months|year|years)\s+ago$/i);
  if (!matches) return null;

  const [_, amount, unit] = matches;
  const number = parseNumberWords(amount);
  if (!number) return null;

  // Get the base unit in days
  const unitBase = TIME_UNITS[unit.replace(/s$/, '') as keyof typeof TIME_UNITS];
  if (!unitBase) return null;

  // Calculate total days to subtract
  const daysToSubtract = number * unitBase;
  
  const date = new Date();
  date.setDate(date.getDate() - daysToSubtract);
  return date;
}