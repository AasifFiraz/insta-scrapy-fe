// Constants for reading speed calculations
const WORDS_PER_MINUTE = 275; // Average adult reading speed
const CHARS_PER_WORD = 5; // Average characters per word
const PUNCTUATION_PAUSE_MS = 200; // Milliseconds pause for punctuation
const SECONDS_PER_MINUTE = 60;

interface ReadingTime {
  minutes: number;
  seconds: number;
  text: string;
}

export const calculateReadingTime = (content: string): ReadingTime => {
  // Count words, characters, and punctuation
  const words = content.trim().split(/\s+/).length;
  const chars = content.length;
  const punctuationCount = (content.match(/[.!?]/g) || []).length;

  // Calculate base reading time in milliseconds
  const wordTime = (words / WORDS_PER_MINUTE) * SECONDS_PER_MINUTE * 1000;
  const charAdjustment = Math.max(0, chars - (words * CHARS_PER_WORD)) * 30; // 30ms per extra character
  const punctuationTime = punctuationCount * PUNCTUATION_PAUSE_MS;

  // Total time in milliseconds
  const totalMs = wordTime + charAdjustment + punctuationTime;
  
  // Convert to minutes and seconds
  const totalSeconds = Math.round(totalMs / 1000);
  const minutes = Math.floor(totalSeconds / SECONDS_PER_MINUTE);
  const seconds = totalSeconds % SECONDS_PER_MINUTE;

  // Format display text with exact time
  let text = '';
  if (minutes > 0) {
    text = `${minutes}m ${seconds}s`;
  } else {
    text = `${seconds}s`;
  }

  return { minutes, seconds, text };
};