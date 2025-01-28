// Constants for readability assessment
const READABILITY_THRESHOLDS = {
  VERY_EASY: 6,  // Grade 6 or below
  EASY: 8,       // Grade 7-8
  GOOD: 10,      // Grade 9-10
  MODERATE: 12,  // Grade 11-12
  COMPLEX: 13    // Grade 13 and above
} as const;

export type ReadabilityLevel = 'Very Easy' | 'Easy' | 'Good' | 'Moderate' | 'Complex';

interface ReadabilityScore {
  grade: number;
  level: ReadabilityLevel;
}

export const assessReadability = (text: string): ReadabilityScore => {
  // Calculate base metrics
  const words = text.trim().split(/\s+/);
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  
  if (words.length === 0 || sentences.length === 0) {
    return { grade: 0, level: 'Very Easy' };
  }

  // Calculate core metrics
  const avgWordsPerSentence = words.length / sentences.length;
  const complexWords = countComplexWords(words);
  const percentComplexWords = (complexWords / words.length) * 100;

  // Calculate grade level using simplified Flesch-Kincaid
  // Adjusted to more closely match Hemingway's scoring
  let grade = (0.39 * avgWordsPerSentence) + (0.0588 * percentComplexWords) - 15.8;

  // Apply sentence complexity adjustments
  const longSentences = sentences.filter(s => s.split(/\s+/).length > 14).length;
  const veryLongSentences = sentences.filter(s => s.split(/\s+/).length > 20).length;
  
  // Penalize for sentence complexity
  grade += (longSentences / sentences.length) * 2;
  grade += (veryLongSentences / sentences.length) * 3;

  // Ensure grade is within reasonable bounds
  grade = Math.max(1, Math.min(20, Math.round(grade)));

  // Determine readability level
  const level = getReadabilityLevel(grade);

  return { grade, level };
};

const countComplexWords = (words: string[]): number => {
  return words.filter(word => {
    // Remove common suffixes that don't affect complexity
    word = word.toLowerCase()
      .replace(/(?:ed|ing|ly|es|s)$/, '')
      .replace(/^(?:un|in|re)/, '');
    
    // Count syllables
    const syllables = countSyllables(word);
    
    // Words with 3+ syllables are complex, except common suffixes
    return syllables >= 3 && !isCommonWord(word);
  }).length;
};

const countSyllables = (word: string): number => {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  
  // Handle special cases
  if (word.length <= 3) return 1;
  
  // Remove common silent endings
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');

  // Count vowel groups
  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
};

const isCommonWord = (word: string): boolean => {
  // List of common words that shouldn't count as complex
  const commonWords = new Set([
    'everything', 'another', 'together', 'important', 'different',
    'interesting', 'understand', 'government', 'business', 'company',
    'family', 'history', 'information', 'education', 'community'
  ]);
  
  return commonWords.has(word);
};

const getReadabilityLevel = (grade: number): ReadabilityLevel => {
  if (grade <= READABILITY_THRESHOLDS.VERY_EASY) return 'Very Easy';
  if (grade <= READABILITY_THRESHOLDS.EASY) return 'Easy';
  if (grade <= READABILITY_THRESHOLDS.GOOD) return 'Good';
  if (grade <= READABILITY_THRESHOLDS.MODERATE) return 'Moderate';
  return 'Complex';
};