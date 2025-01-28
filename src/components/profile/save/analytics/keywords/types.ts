export type KeywordType = 'keywords' | 'questions' | 'phrases';

export interface KeywordData {
  text: string;
  volume: number;
  difficulty: number;
  engagement: number;
  examples: string[];
}

export interface KeywordStats {
  keywords: KeywordData[];
  questions: KeywordData[];
  phrases: KeywordData[];
}