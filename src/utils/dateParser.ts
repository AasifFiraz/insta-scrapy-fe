import { parse, isValid } from 'date-fns';

export const parseNaturalDate = (input: string): Date | null => {
  // Convert to lowercase and trim whitespace
  const text = input.toLowerCase().trim();

  // Handle relative dates
  if (text === 'today') {
    return new Date();
  }
  if (text === 'yesterday') {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }

  // Handle "X days ago" format
  if (text.match(/^(\d+)\s*(day|days|d)s?\s*ago$/)) {
    const days = parseInt(text.match(/\d+/)?.[0] || '0');
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }

  // Handle "last X" format
  if (text.match(/^last\s+(week|month|year)$/)) {
    const date = new Date();
    const unit = text.match(/week|month|year/)?.[0];
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

  // Handle month and day without year (e.g., "Nov 11th", "Dec 19th")
  const monthDayPattern = /^(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+(\d+)(?:st|nd|rd|th)?$/i;
  const monthDayMatch = text.match(monthDayPattern);
  
  if (monthDayMatch) {
    const [_, month, day] = monthDayMatch;
    const currentYear = new Date().getFullYear();
    const dateString = `${month} ${day} ${currentYear}`;
    
    // Try parsing with both full and abbreviated month names
    const formats = ['MMMM d yyyy', 'MMM d yyyy'];
    for (const format of formats) {
      const parsed = parse(dateString, format, new Date());
      if (isValid(parsed)) {
        // If the date would be in the future, use last year instead
        if (parsed > new Date()) {
          parsed.setFullYear(currentYear - 1);
        }
        return parsed;
      }
    }
  }

  // Handle month names with ordinal numbers and year
  const monthDayYearPattern = /^(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+(\d+)(?:st|nd|rd|th)?\s*,?\s*(\d{4}|\d{2})$/i;
  const monthMatch = text.match(monthDayYearPattern);
  
  if (monthMatch) {
    const [_, month, day, year] = monthMatch;
    const fullYear = year.length === 2 ? `20${year}` : year;
    const dateString = `${month} ${day} ${fullYear}`;
    
    // Try parsing with both full and abbreviated month names
    const formats = ['MMMM d yyyy', 'MMM d yyyy'];
    for (const format of formats) {
      const parsed = parse(dateString, format, new Date());
      if (isValid(parsed)) {
        return parsed;
      }
    }
  }

  // Try parsing standard formats
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
};

// Helper function to test if a string is a valid ordinal number
const isOrdinalNumber = (str: string): boolean => {
  return /^\d+(st|nd|rd|th)$/.test(str);
};

// Helper function to convert ordinal to cardinal number
const ordinalToCardinal = (str: string): string => {
  return str.replace(/(st|nd|rd|th)$/, '');
};