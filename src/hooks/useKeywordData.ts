import { useState, useEffect } from 'react';
import { KeywordStats } from '../components/profile/save/analytics/keywords/types';
import { PostType } from '../components/profile/save/analytics/goals/PostTypeFilter';

const MOCK_KEYWORD_DATA: Record<PostType, KeywordStats> = {
  all: {
    keywords: [
      {
        text: 'business growth',
        volume: 25000,
        difficulty: 55,
        engagement: 18500,
        examples: ['post1', 'post2', 'post3']
      },
      {
        text: 'entrepreneurship',
        volume: 35000,
        difficulty: 60,
        engagement: 22000,
        examples: ['post4', 'post5']
      },
      {
        text: 'success mindset',
        volume: 20000,
        difficulty: 40,
        engagement: 19500,
        examples: ['post6', 'post7']
      }
    ],
    questions: [
      {
        text: 'how to grow a business?',
        volume: 15000,
        difficulty: 45,
        engagement: 16500,
        examples: ['post8', 'post9']
      },
      {
        text: 'what makes a successful entrepreneur?',
        volume: 12000,
        difficulty: 50,
        engagement: 14000,
        examples: ['post10', 'post11']
      }
    ],
    phrases: [
      {
        text: 'secrets of business success',
        volume: 8000,
        difficulty: 35,
        engagement: 21000,
        examples: ['post12', 'post13']
      },
      {
        text: 'business growth strategies',
        volume: 10000,
        difficulty: 45,
        engagement: 24000,
        examples: ['post14', 'post15']
      }
    ]
  },
  image: {
    keywords: [
      {
        text: 'business growth tips',
        volume: 12000,
        difficulty: 45,
        engagement: 8500,
        examples: ['post1', 'post2']
      },
      {
        text: 'marketing strategy',
        volume: 18000,
        difficulty: 65,
        engagement: 12000,
        examples: ['post3']
      }
    ],
    questions: [
      {
        text: 'how to scale a business?',
        volume: 5000,
        difficulty: 35,
        engagement: 9500,
        examples: ['post6']
      }
    ],
    phrases: [
      {
        text: 'the truth about success',
        volume: 2800,
        difficulty: 30,
        engagement: 11000,
        examples: ['post9']
      }
    ]
  },
  carousel: {
    keywords: [
      {
        text: 'business framework',
        volume: 15000,
        difficulty: 50,
        engagement: 18500,
        examples: ['post11', 'post12']
      }
    ],
    questions: [
      {
        text: 'how to increase revenue?',
        volume: 8500,
        difficulty: 45,
        engagement: 14500,
        examples: ['post14']
      }
    ],
    phrases: [
      {
        text: 'step by step guide to',
        volume: 6500,
        difficulty: 40,
        engagement: 19000,
        examples: ['post15', 'post16']
      }
    ]
  },
  reel: {
    keywords: [
      {
        text: 'quick business tips',
        volume: 25000,
        difficulty: 35,
        engagement: 28500,
        examples: ['post17', 'post18']
      }
    ],
    questions: [
      {
        text: 'why do businesses fail?',
        volume: 12500,
        difficulty: 30,
        engagement: 32000,
        examples: ['post19']
      }
    ],
    phrases: [
      {
        text: 'watch this before',
        volume: 18500,
        difficulty: 25,
        engagement: 35000,
        examples: ['post20', 'post21']
      }
    ]
  }
};

export const useKeywordData = (handle: string, postType: PostType) => {
  const [data, setData] = useState<KeywordStats>({
    keywords: [],
    questions: [],
    phrases: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(MOCK_KEYWORD_DATA[postType]);
      setIsLoading(false);
    };

    loadData();
  }, [handle, postType]);

  return { data, isLoading };
};