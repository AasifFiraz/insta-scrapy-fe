import { TextHighlight } from './types';

const SENTENCE_THRESHOLDS = {
  HARD_TO_READ: 14,    // Sentences with 14+ words
  VERY_HARD_TO_READ: 20 // Sentences with 20+ words
};

export const findHardToReadSentences = (text: string): TextHighlight[] => {
  const highlights: TextHighlight[] = [];
  
  // Split text into sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  let currentPosition = 0;

  sentences.forEach(sentence => {
    const start = text.indexOf(sentence, currentPosition);
    const end = start + sentence.length;
    currentPosition = end;

    // Count words in sentence
    const words = sentence.trim().split(/\s+/);
    const wordCount = words.length;

    // Check sentence complexity
    if (wordCount >= SENTENCE_THRESHOLDS.VERY_HARD_TO_READ) {
      highlights.push({
        type: 'veryHardToRead',
        start,
        end,
        suggestion: 'This sentence is very hard to read. Try breaking it into smaller sentences.'
      });
    } else if (wordCount >= SENTENCE_THRESHOLDS.HARD_TO_READ) {
      highlights.push({
        type: 'hardToRead',
        start,
        end,
        suggestion: 'This sentence is hard to read. Consider making it shorter or simpler.'
      });
    }
  });

  return highlights;
};

export const calculateReadabilityGrade = (text: string): number => {
  if (!text?.trim()) return 0;

  const sentences = text.split(/[.!?]+/).filter(Boolean);
  if (sentences.length === 0) return 0;

  let totalWords = 0;
  let complexWords = 0;
  let totalSyllables = 0;
  let longSentences = 0;
  let veryLongSentences = 0;

  sentences.forEach(sentence => {
    const words = sentence.trim().split(/\s+/);
    totalWords += words.length;

    // Count long sentences
    if (words.length >= SENTENCE_THRESHOLDS.VERY_HARD_TO_READ) {
      veryLongSentences++;
    } else if (words.length >= SENTENCE_THRESHOLDS.HARD_TO_READ) {
      longSentences++;
    }

    // Analyze words
    words.forEach(word => {
      const syllableCount = countSyllables(word);
      totalSyllables += syllableCount;
      if (syllableCount >= 3 && !isCommonWord(word)) {
        complexWords++;
      }
    });
  });

  // Calculate base grade using Flesch-Kincaid formula
  const avgWordsPerSentence = totalWords / sentences.length;
  const avgSyllablesPerWord = totalSyllables / totalWords;
  let grade = (0.39 * avgWordsPerSentence) + (11.8 * avgSyllablesPerWord) - 15.59;

  // Adjust for sentence complexity
  grade += (longSentences / sentences.length) * 2;
  grade += (veryLongSentences / sentences.length) * 4;
  
  // Adjust for complex words
  grade += (complexWords / totalWords) * 3;

  return Math.max(1, Math.min(20, Math.round(grade)));
};

const countSyllables = (word: string): number => {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;

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
  
  return commonWords.has(word.toLowerCase());
};
