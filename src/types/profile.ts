export interface ProfileBasicInfo {
  id: number;
  avatar: string;
  name: string;
  handle: string;
  subscribers: string;
}

export interface ProfileDetailedInfo extends ProfileBasicInfo {
  videos: string;
  views: string;
  description: string;
}