export interface PostGoal {
  name: string;
  description: string;
  metrics: {
    image: number;
    carousel: number;
    reel: number;
  };
}

export const POST_GOALS: PostGoal[] = [
  {
    name: 'Followers',
    description: 'Growth in follower count',
    metrics: {
      image: 15,
      carousel: 20,
      reel: 30
    }
  },
  {
    name: 'Engagement',
    description: 'Likes, comments, and saves',
    metrics: {
      image: 25,
      carousel: 25,
      reel: 25
    }
  },
  {
    name: 'Pipeline',
    description: 'Lead generation and conversions',
    metrics: {
      image: 20,
      carousel: 30,
      reel: 15
    }
  },
  {
    name: 'Trust',
    description: 'Authority and credibility building',
    metrics: {
      image: 25,
      carousel: 15,
      reel: 15
    }
  },
  {
    name: 'Resonance',
    description: 'Parasocial relationship building',
    metrics: {
      image: 15,
      carousel: 10,
      reel: 15
    }
  }
];