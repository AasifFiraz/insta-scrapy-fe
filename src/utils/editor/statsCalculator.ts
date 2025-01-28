import { DocumentStats, ReadabilityLevel, ReadabilityStats } from '../../types/editor';
import { calculateReadabilityScores } from './readability';

export const calculateBasicStats = (text: string): DocumentStats => {
  if (!text) {
    return {
      words: 0,
      characters: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: '0s',
      readability: {
        score: 0,
        level: 'Very Easy' as ReadabilityLevel,
        fleschKincaid: 0,
        gunningFog: 0,
        colemanLiau: 0,
        smog: 0,
        automatedReadability: 0
      },
      complexity: {
        hardToRead: 0,
        veryHardToRead: 0,
        complexWords: 0,
        longSentences: 0
      }
    };
  }

  // Basic stats calculation
  const words = text.trim().split(/\s+/).length;
  const characters = text.length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs = text.split(/\n\s*\n/).filter(Boolean).length || 1;

  // Calculate reading time
  const minutes = Math.floor(words / 200);
  const seconds = Math.floor((words % 200) / (200 / 60));
  const readingTime = minutes > 0 
    ? `${minutes}m ${seconds}s`
    : `${seconds}s`;

  // Calculate readability and complexity
  const readability: ReadabilityStats = calculateReadabilityScores(text);
  const complexity = calculateComplexityMetrics(text);

  return {
    words,
    characters,
    sentences,
    paragraphs,
    readingTime,
    readability,
    complexity
  };
};

const calculateComplexityMetrics = (text: string) => {
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const words = text.trim().split(/\s+/);

  return {
    hardToRead: sentences.filter(s => s.split(/\s+/).length >= 20).length,
    veryHardToRead: sentences.filter(s => s.split(/\s+/).length >= 30).length,
    complexWords: words.filter(w => countSyllables(w) > 2).length,
    longSentences: sentences.filter(s => s.split(/\s+/).length > 30).length
  };
};

const countSyllables = (word: string): number => {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  
  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
};
