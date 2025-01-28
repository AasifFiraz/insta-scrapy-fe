import { TextHighlight } from './types';

const COMPLEX_WORDS: Record<string, string> = {
  utilize: 'use',
  implement: 'use',
  leverage: 'use',
  facilitate: 'help',
  commence: 'start',
  terminate: 'end',
  endeavor: 'try',
  transmit: 'send',
  obtain: 'get',
  purchase: 'buy',
  demonstrate: 'show',
  initiate: 'start',
  terminate: 'end',
  sufficient: 'enough',
  numerous: 'many',
  assistance: 'help'
};

export const findSimpleAlternatives = (text: string): TextHighlight[] => {
  const highlights: TextHighlight[] = [];
  const words = Object.keys(COMPLEX_WORDS);

  words.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      highlights.push({
        type: 'simpleAlternative',
        start: match.index,
        end: match.index + word.length,
        suggestion: `Consider using "${COMPLEX_WORDS[word]}" instead of "${word}"`
      });
    }
  });

  return highlights;
};