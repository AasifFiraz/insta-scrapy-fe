import { Post } from './post';

export type TimeRange = '7D' | '28D' | '90D';
export type MetricType = 'followers' | 'engagement';

export interface DataPoint {
  date: string;
  value: number;
  posts?: Post[];
}

export interface MetricsResponse {
  data: DataPoint[];
  error?: string;
}