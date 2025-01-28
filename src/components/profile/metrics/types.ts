export interface ProfileMetric {
  label: string;
  value: string;
  change: string;
  icon: React.ComponentType;
}

export interface ProfileMetrics {
  followers: string;
  posts: string;
  likes: string;
  comments: string;
}