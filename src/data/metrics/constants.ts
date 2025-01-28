export const METRICS_PATTERNS = {
  FOLLOWERS: {
    BASE: 2500000, // 2.5M base followers
    DAILY_GROWTH: {
      MIN: 1500,
      MAX: 3500
    },
    VOLATILITY: 0.2 // 20% daily variation
  },
  ENGAGEMENT: {
    BASE_RATE: 0.06, // 6% base engagement rate
    DAILY_VARIATION: 0.4, // 40% daily variation
    WEEKLY_PATTERN: [1.2, 1.1, 1.0, 1.1, 1.3, 1.4, 1.2] // Weekend peaks
  },
  POSTS: {
    TYPES: {
      IMAGE: { frequency: 0.4, baseEngagement: 1.0 },
      CAROUSEL: { frequency: 0.35, baseEngagement: 1.2 },
      REEL: { frequency: 0.25, baseEngagement: 1.5 }
    },
    DAILY_CHANCE: 0.7 // 70% chance of posting each day
  }
};