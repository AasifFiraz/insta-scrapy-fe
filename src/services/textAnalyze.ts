import { ReadabilityLevel, ReadabilityStats, ComplexityStats, DocumentStats } from '../types/editor';

interface ApiResponse {
  stats: {
    words: number;
    characters: number;
    sentences: number;
    paragraphs: number;
    readingTime: string;
  };
  readability: {
    score: number;
    level: string;
    fleschKincaid: number;
    gunningFog: number;
    colemanLiau: number;
    smog: number;
    automatedReadability: number;
  };
  complexity: ComplexityStats;
}

const API_URL = process.env.NODE_ENV === "production" ? "https://postlyze.com" : "http://localhost:5000";

const isValidReadabilityLevel = (level: string): level is ReadabilityLevel => {
  return ['Very Easy', 'Easy', 'Good', 'Moderate', 'Complex'].includes(level);
};

export const analyzeText = async (text: string): Promise<DocumentStats> => {
  try {
    const response = await fetch(`${API_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze text');
    }

    const data: ApiResponse = await response.json();

    // Validate and convert readability level
    const readabilityLevel = isValidReadabilityLevel(data.readability.level) 
      ? data.readability.level 
      : 'Very Easy' as ReadabilityLevel;

    // Transform API response to match DocumentStats type
    return {
      ...data.stats,
      readability: {
        ...data.readability,
        level: readabilityLevel
      },
      complexity: data.complexity
    };
  } catch (error) {
    console.error('Error analyzing text:', error);
    // Return default values in case of error
    return {
      words: 0,
      characters: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: '0s',
      readability: {
        score: 0,
        level: 'Very Easy',
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
};
