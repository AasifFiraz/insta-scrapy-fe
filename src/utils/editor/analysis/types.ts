export type HighlightType = 
  | 'hardToRead' 
  | 'veryHardToRead' 
  | 'adverb' 
  | 'passiveVoice' 
  | 'qualifier' 
  | 'simpleAlternative';

export interface TextHighlight {
  type: HighlightType;
  start: number;
  end: number;
  suggestion?: string;
}

export interface AnalysisResult {
  highlights: TextHighlight[];
  stats: {
    hardToRead: number;
    veryHardToRead: number;
    adverbs: number;
    passiveVoice: number;
    simpleAlternatives: number;
    qualifiers: number;
  };
}

export interface ReadabilityScore {
  grade: number;
  level: ReadabilityLevel;
}

export type ReadabilityLevel = 'Very Easy' | 'Easy' | 'Good' | 'Moderate' | 'Complex';
