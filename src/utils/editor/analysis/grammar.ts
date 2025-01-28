import { TextHighlight } from './types';

// Common adverb suffixes and patterns
const ADVERB_PATTERNS = [
  /\w+ly\b/i,  // Words ending in 'ly'
  /\b(very|rather|quite|somewhat|really|pretty|fairly|almost|nearly|just|too|so|quite|more|most|less|least)\b/i
];

// Words ending in 'ly' that aren't adverbs
const NON_ADVERB_EXCEPTIONS = new Set([
  'supply', 'reply', 'apply', 'multiply', 'comply', 'ally',
  'belly', 'family', 'italy', 'july', 'fly', 'ugly', 'early',
  'holy', 'silly', 'lonely', 'lovely', 'friendly', 'likely'
]);

export const findAdverbs = (text: string): TextHighlight[] => {
  const highlights: TextHighlight[] = [];
  let match;

  // Check each pattern
  ADVERB_PATTERNS.forEach(pattern => {
    while ((match = pattern.exec(text)) !== null) {
      const word = match[0].toLowerCase();
      
      // Skip if it's in our exception list
      if (NON_ADVERB_EXCEPTIONS.has(word)) continue;

      highlights.push({
        type: 'adverb',
        start: match.index,
        end: match.index + match[0].length,
        suggestion: `Consider removing "${match[0]}" or using a stronger verb instead`
      });
    }
  });

  return highlights;
};

const QUALIFIERS = [
  'just',
  'maybe',
  'probably',
  'rather',
  'quite',
  'somehow',
  'somewhat',
  'sort of',
  'kind of',
  'fairly',
  'slightly',
  'mostly',
  'almost',
  'basically',
  'presumably',
  'supposedly',
  'perhaps'
];

export const findQualifiers = (text: string): TextHighlight[] => {
  const highlights: TextHighlight[] = [];

  QUALIFIERS.forEach(qualifier => {
    const regex = new RegExp(`\\b${qualifier}\\b`, 'gi');
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      highlights.push({
        type: 'qualifier',
        start: match.index,
        end: match.index + qualifier.length,
        suggestion: `Consider removing "${qualifier}" to make your statement stronger`
      });
    }
  });

  return highlights;
};

export const findPassiveVoice = (text: string): TextHighlight[] => {
  const highlights: TextHighlight[] = [];
  
  // More comprehensive passive voice pattern
  const passivePatterns = [
    /\b(?:am|is|are|was|were|be|been|being)\s+(\w+ed|put|set|made|done)\b/gi,
    /\b(?:has|have|had)\s+been\s+(\w+ed)\b/gi,
    /\b(?:will|shall|must|might|may|can|could|would|should)\s+be\s+(\w+ed)\b/gi
  ];

  passivePatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      // Verify it's not a false positive
      if (!isException(match[0])) {
        highlights.push({
          type: 'passiveVoice',
          start: match.index,
          end: match.index + match[0].length,
          suggestion: 'Consider using active voice for stronger, clearer writing'
        });
      }
    }
  });

  return highlights;
};

// Helper to check for common false positives
const isException = (phrase: string): boolean => {
  const exceptions = [
    'is used to',
    'are used to',
    'was used to',
    'were used to',
    'is dedicated to',
    'is interested in',
    'are interested in'
  ];
  
  return exceptions.some(exception => 
    phrase.toLowerCase().includes(exception)
  );
};