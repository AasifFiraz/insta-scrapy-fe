export type ReadabilityLevel = 'Very Easy' | 'Easy' | 'Good' | 'Moderate' | 'Complex';

export interface ReadabilityStats {
  score: number;
  level: ReadabilityLevel;
  fleschKincaid: number;
  gunningFog: number;
  colemanLiau: number;
  smog: number;
  automatedReadability: number;
}

export interface ComplexityStats {
  hardToRead: number;
  veryHardToRead: number;
  complexWords: number;
  longSentences: number;
}

export interface DocumentStats {
  words: number;
  characters: number;
  sentences: number;
  paragraphs: number;
  readingTime: string;
  readability: ReadabilityStats;
  complexity: ComplexityStats;
}
