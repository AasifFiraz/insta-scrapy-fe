import { addDays, subDays, format } from 'date-fns';
import { SavedContentAnalysis, ContentType, ContentAngle } from '../../types/content';

// Constants for content patterns
const CONTENT_PATTERNS = {
  TYPES: {
    CAROUSEL: {
      frequency: 0.45,
      avgSlides: 8,
      avgWords: 150,
      topics: {
        'Business Growth': 0.4,
        'Marketing': 0.3,
        'Mindset': 0.3
      },
      formats: {
        'Step-by-Step Guide': 0.4,
        'Case Study': 0.3,
        'Framework': 0.3
      }
    },
    REEL: {
      frequency: 0.35,
      avgDuration: 45, // seconds
      topics: {
        'Business Growth': 0.35,
        'Marketing': 0.35,
        'Mindset': 0.3
      },
      formats: {
        'Quick Tips': 0.4,
        'Story Time': 0.3,
        'Behind the Scenes': 0.3
      }
    },
    IMAGE: {
      frequency: 0.2,
      topics: {
        'Business Growth': 0.3,
        'Marketing': 0.3,
        'Mindset': 0.4
      },
      formats: {
        'Quote': 0.5,
        'Single Tip': 0.3,
        'Achievement': 0.2
      }
    }
  },
  HOOKS: [
    'The truth about...',
    'How I built...',
    'Why most people fail at...',
    'The biggest mistake in...',
    'What nobody tells you about...',
    'How to 10x your...',
    'The secret to...',
    'Stop doing this...',
    'Start doing this...',
    'The only way to...'
  ],
  TOPICS: {
    'Business Growth': [
      'Scaling strategies',
      'Revenue optimization',
      'Team building',
      'Systems and processes',
      'Business model innovation'
    ],
    'Marketing': [
      'Lead generation',
      'Sales psychology',
      'Offer creation',
      'Customer acquisition',
      'Market positioning'
    ],
    'Mindset': [
      'Decision making',
      'Risk management',
      'Personal development',
      'Leadership principles',
      'Success habits'
    ]
  }
};

// Generate a year of content data
const generateYearlyContent = (): SavedContentAnalysis => {
  const endDate = new Date();
  const startDate = subDays(endDate, 365);
  const posts: ContentType[] = [];
  const angles: ContentAngle[] = [];

  // Initialize angle stats
  Object.keys(CONTENT_PATTERNS.TOPICS).forEach(topic => {
    angles.push({
      type: topic,
      count: 0,
      engagement: 0,
      topPerforming: []
    });
  });

  // Generate posts for each day
  for (let i = 0; i < 365; i++) {
    const currentDate = addDays(startDate, i);
    
    // 70% chance of posting each day
    if (Math.random() < 0.7) {
      const type = determineContentType();
      const topic = determineContentTopic(type);
      const format = determineContentFormat(type);
      const hook = CONTENT_PATTERNS.HOOKS[Math.floor(Math.random() * CONTENT_PATTERNS.HOOKS.length)];
      const subtopic = CONTENT_PATTERNS.TOPICS[topic][Math.floor(Math.random() * CONTENT_PATTERNS.TOPICS[topic].length)];
      
      // Calculate engagement based on type and topic
      const baseEngagement = 150000; // Base engagement for a post
      const typeMultiplier = type === 'carousel' ? 1.2 : type === 'reel' ? 1.5 : 0.8;
      const randomVariance = 0.7 + Math.random() * 0.6; // 30% variance
      const engagement = Math.round(baseEngagement * typeMultiplier * randomVariance);

      const post: ContentType = {
        date: format(currentDate, 'MMM d'),
        type,
        topic,
        format,
        hook: `${hook} ${subtopic}`,
        engagement,
        details: generateContentDetails(type)
      };

      posts.push(post);

      // Update angle stats
      const angleIndex = angles.findIndex(a => a.type === topic);
      if (angleIndex !== -1) {
        angles[angleIndex].count++;
        angles[angleIndex].engagement += engagement;
        
        // Keep track of top performing content
        if (angles[angleIndex].topPerforming.length < 3 || 
            engagement > angles[angleIndex].topPerforming[angles[angleIndex].topPerforming.length - 1].engagement) {
          angles[angleIndex].topPerforming.push({
            hook: post.hook,
            type: post.type,
            engagement: post.engagement
          });
          angles[angleIndex].topPerforming.sort((a, b) => b.engagement - a.engagement);
          if (angles[angleIndex].topPerforming.length > 3) {
            angles[angleIndex].topPerforming.pop();
          }
        }
      }
    }
  }

  // Calculate averages for angles
  angles.forEach(angle => {
    if (angle.count > 0) {
      angle.engagement = Math.round(angle.engagement / angle.count);
    }
  });

  return {
    totalPosts: posts.length,
    contentTypes: calculateContentTypeStats(posts),
    contentAngles: angles,
    recentPosts: posts.slice(-30), // Last 30 posts
    topPosts: getTopPosts(posts)
  };
};

// Helper functions
const determineContentType = (): 'carousel' | 'reel' | 'image' => {
  const rand = Math.random();
  const { CAROUSEL, REEL, IMAGE } = CONTENT_PATTERNS.TYPES;
  
  if (rand < CAROUSEL.frequency) return 'carousel';
  if (rand < CAROUSEL.frequency + REEL.frequency) return 'reel';
  return 'image';
};

const determineContentTopic = (type: 'carousel' | 'reel' | 'image'): string => {
  const topics = CONTENT_PATTERNS.TYPES[type].topics;
  const rand = Math.random();
  let cumulative = 0;
  
  for (const [topic, probability] of Object.entries(topics)) {
    cumulative += probability;
    if (rand < cumulative) return topic;
  }
  
  return Object.keys(topics)[0];
};

const determineContentFormat = (type: 'carousel' | 'reel' | 'image'): string => {
  const formats = CONTENT_PATTERNS.TYPES[type].formats;
  const rand = Math.random();
  let cumulative = 0;
  
  for (const [format, probability] of Object.entries(formats)) {
    cumulative += probability;
    if (rand < cumulative) return format;
  }
  
  return Object.keys(formats)[0];
};

const generateContentDetails = (type: 'carousel' | 'reel' | 'image') => {
  switch (type) {
    case 'carousel':
      return {
        slides: Math.floor(Math.random() * 4) + 6, // 6-10 slides
        wordsPerSlide: Math.floor(Math.random() * 50) + 100 // 100-150 words
      };
    case 'reel':
      return {
        duration: Math.floor(Math.random() * 30) + 30, // 30-60 seconds
        hasVoiceover: Math.random() > 0.2, // 80% chance of voiceover
        hasMusic: Math.random() > 0.1 // 90% chance of music
      };
    case 'image':
      return {
        hasText: Math.random() > 0.1, // 90% chance of text overlay
        filter: ['None', 'Minimal', 'Brand'][Math.floor(Math.random() * 3)]
      };
  }
};

const calculateContentTypeStats = (posts: ContentType[]) => {
  const stats = {
    carousel: { count: 0, engagement: 0 },
    reel: { count: 0, engagement: 0 },
    image: { count: 0, engagement: 0 }
  };

  posts.forEach(post => {
    stats[post.type].count++;
    stats[post.type].engagement += post.engagement;
  });

  Object.keys(stats).forEach(type => {
    const typeStats = stats[type as keyof typeof stats];
    if (typeStats.count > 0) {
      typeStats.engagement = Math.round(typeStats.engagement / typeStats.count);
    }
  });

  return stats;
};

const getTopPosts = (posts: ContentType[]) => {
  return [...posts]
    .sort((a, b) => b.engagement - a.engagement)
    .slice(0, 10);
};

export const getHormoziContentAnalysis = (): SavedContentAnalysis => {
  return generateYearlyContent();
};