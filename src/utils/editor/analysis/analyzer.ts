import { AnalysisResult, TextHighlight } from './types';
import { findHardToReadSentences } from './readability';
import { findAdverbs, findQualifiers, findPassiveVoice } from './grammar';
import { findSimpleAlternatives } from './wordChoice';

export const analyzeText = (text: string): AnalysisResult => {
  if (!text?.trim()) {
    return {
      highlights: [],
      stats: {
        hardToRead: 0,
        veryHardToRead: 0,
        adverbs: 0,
        passiveVoice: 0,
        simpleAlternatives: 0,
        qualifiers: 0
      }
    };
  }

  // Collect all highlights
  const highlights: TextHighlight[] = [
    ...findHardToReadSentences(text),
    ...findAdverbs(text),
    ...findQualifiers(text),
    ...findPassiveVoice(text),
    ...findSimpleAlternatives(text)
  ];

  // Sort highlights by start position
  highlights.sort((a, b) => a.start - b.start);

  // Count occurrences of each type
  const stats = {
    hardToRead: highlights.filter(h => h.type === 'hardToRead').length,
    veryHardToRead: highlights.filter(h => h.type === 'veryHardToRead').length,
    adverbs: highlights.filter(h => h.type === 'adverb').length,
    passiveVoice: highlights.filter(h => h.type === 'passiveVoice').length,
    simpleAlternatives: highlights.filter(h => h.type === 'simpleAlternative').length,
    qualifiers: highlights.filter(h => h.type === 'qualifier').length
  };

  return { highlights, stats };
};
