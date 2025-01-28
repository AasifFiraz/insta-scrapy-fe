export interface ContentType {
  date: string;
  type: 'carousel' | 'reel' | 'image';
  topic: string;
  format: string;
  hook: string;
  engagement: number;
  details: {
    slides?: number;
    wordsPerSlide?: number;
    duration?: number;
    hasVoiceover?: boolean;
    hasMusic?: boolean;
    hasText?: boolean;
    filter?: string;
  };
}

export interface TopPerforming {
  hook: string;
  type: 'carousel' | 'reel' | 'image';
  engagement: number;
}

export interface ContentAngle {
  type: string;
  count: number;
  engagement: number;
  topPerforming: TopPerforming[];
}

export interface SavedContentAnalysis {
  totalPosts: number;
  contentTypes: {
    carousel: { count: number; engagement: number; };
    reel: { count: number; engagement: number; };
    image: { count: number; engagement: number; };
  };
  contentAngles: ContentAngle[];
  recentPosts: ContentType[];
  topPosts: ContentType[];
}