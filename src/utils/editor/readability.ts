import { ReadabilityLevel, ReadabilityStats } from '../../types/editor';

export const calculateReadabilityScores = (text: string): ReadabilityStats => {
  if (!text.trim()) {
    return {
      score: 0,
      level: 'Very Easy' as ReadabilityLevel,
      fleschKincaid: 0,
      gunningFog: 0,
      colemanLiau: 0,
      smog: 0,
      automatedReadability: 0
    };
  }

  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const words = text.trim().split(/\s+/);
  const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0);

  const averageWordsPerSentence = words.length / sentences.length;
  const averageSyllablesPerWord = syllables / words.length;

  // Calculate Flesch-Kincaid Grade Level
  const fleschKincaid = 0.39 * averageWordsPerSentence + 11.8 * averageSyllablesPerWord - 15.59;

  // Calculate Gunning Fog Index
  const complexWords = words.filter(word => countSyllables(word) > 2).length;
  const percentageComplex = (complexWords / words.length) * 100;
  const gunningFog = 0.4 * (averageWordsPerSentence + percentageComplex);

  // Calculate Coleman-Liau Index
  const letters = text.replace(/[^a-zA-Z]/g, '').length;
  const L = (letters / words.length) * 100;
  const S = (sentences.length / words.length) * 100;
  const colemanLiau = 0.0588 * L - 0.296 * S - 15.8;

  // Calculate SMOG Index
  const polysyllables = words.filter(word => countSyllables(word) >= 3).length;
  const smog = 1.043 * Math.sqrt(polysyllables * (30 / sentences.length)) + 3.1291;

  // Calculate Automated Readability Index
  const characters = text.length;
  const automatedReadability = 4.71 * (characters / words.length) + 0.5 * averageWordsPerSentence - 21.43;

  // Calculate average score
  const score = (fleschKincaid + gunningFog + colemanLiau + smog + automatedReadability) / 5;

  // Determine reading level
  const level = getReadingLevel(score);

  return {
    score,
    level,
    fleschKincaid,
    gunningFog,
    colemanLiau,
    smog,
    automatedReadability
  };
};

const getReadingLevel = (score: number): ReadabilityLevel => {
  if (score <= 6) return 'Very Easy';
  if (score <= 8) return 'Easy';
  if (score <= 10) return 'Good';
  if (score <= 12) return 'Moderate';
  return 'Complex';
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
