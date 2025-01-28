export const GROWTH_PATTERNS = {
  FOLLOWERS: {
    BASE: 2500000, // 2.5M base followers
    DAILY_GROWTH: {
      MIN: 1500,
      MAX: 3500
    },
    VOLATILITY: 0.2 // 20% daily variation
  },
  POSTS: {
    BASE: 3200,
    DAILY_NEW: {
      MIN: 1,
      MAX: 4
    },
    FREQUENCY: 0.7 // 70% chance of posting each day
  }
};