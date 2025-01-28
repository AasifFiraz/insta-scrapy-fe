export const WEEKDAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const RELATIVE_WEEKDAY_PATTERNS = [
  // "last friday", "last monday", etc.
  /^last\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)$/i,
  
  // "monday from last week", "friday from last week", etc.
  /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s+from\s+last\s+week$/i,
  
  // "monday two weeks ago", "friday 2 weeks ago", etc.
  /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)(?:\s+from)?\s+(\d+)\s+weeks?\s+ago$/i
];

export const NUMBER_WORDS = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90
};

export const TIME_UNITS = {
  day: 1,
  week: 7,
  month: 30,
  year: 365
};