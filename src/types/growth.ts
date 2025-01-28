export interface DailyGrowth {
  date: string;
  followers: {
    total: number;
    change: number;
  };
  posts: {
    total: number;
    new: number[];
  };
}

export interface GrowthResponse {
  data: DailyGrowth[];
  error?: string;
}