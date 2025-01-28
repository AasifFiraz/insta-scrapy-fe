export interface PostAngle {
  name: string;
  description: string;
  metrics: {
    image: number;
    carousel: number;
    reel: number;
  };
}

export const POST_ANGLES: PostAngle[] = [
  {
    name: 'How-to',
    description: 'Step-by-step tutorials and guides',
    metrics: {
      image: 10,
      carousel: 15,
      reel: 15
    }
  },
  {
    name: 'Case Study',
    description: 'Real examples and results',
    metrics: {
      image: 8,
      carousel: 15,
      reel: 10
    }
  },
  {
    name: 'Behind-the-Scenes',
    description: 'Process and journey sharing',
    metrics: {
      image: 12,
      carousel: 10,
      reel: 12
    }
  },
  {
    name: 'Quick Tips',
    description: 'Short, actionable advice',
    metrics: {
      image: 15,
      carousel: 8,
      reel: 12
    }
  },
  {
    name: 'Myth Busting',
    description: 'Correcting misconceptions',
    metrics: {
      image: 8,
      carousel: 12,
      reel: 8
    }
  },
  {
    name: 'Contrarian',
    description: 'Challenging conventional wisdom',
    metrics: {
      image: 10,
      carousel: 10,
      reel: 8
    }
  },
  {
    name: 'Framework',
    description: 'Systems and methodologies',
    metrics: {
      image: 5,
      carousel: 15,
      reel: 8
    }
  },
  {
    name: 'Story',
    description: 'Narrative-driven content',
    metrics: {
      image: 10,
      carousel: 5,
      reel: 12
    }
  },
  {
    name: 'Skit',
    description: 'Comedic or entertaining scenarios',
    metrics: {
      image: 7,
      carousel: 5,
      reel: 10
    }
  },
  {
    name: 'News Jacking',
    description: 'Leveraging trending news and events',
    metrics: {
      image: 15,
      carousel: 5,
      reel: 5
    }
  }
];