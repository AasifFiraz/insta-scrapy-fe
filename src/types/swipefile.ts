export type SwipefileViewMode = 'profiles' | 'posts' | 'insights';

export interface SwipefileList {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  profileIds: string[];
}

export interface SavedProfile {
  id: string;
  handle: string;
  savedAt: string;
  notes?: string;
  lists: string[]; // List IDs this profile belongs to
}

export interface SwipefileState {
  lists: SwipefileList[];
  savedProfiles: SavedProfile[];
  activeListId: string | null;
  viewMode: SwipefileViewMode;
}

export type SwipefileAction =
  | { type: 'SET_VIEW_MODE'; payload: SwipefileViewMode }
  | { type: 'SET_ACTIVE_LIST'; payload: string | null }
  | { type: 'CREATE_LIST'; payload: Omit<SwipefileList, 'id' | 'createdAt' | 'updatedAt' | 'profileIds'> }
  | { type: 'UPDATE_LIST'; payload: Partial<SwipefileList> & { id: string } }
  | { type: 'DELETE_LIST'; payload: string }
  | { type: 'ADD_PROFILE_TO_LIST'; payload: { listId: string; profileId: string } }
  | { type: 'REMOVE_PROFILE_FROM_LIST'; payload: { listId: string; profileId: string } }
  | { type: 'SAVE_PROFILE'; payload: Omit<SavedProfile, 'id' | 'savedAt' | 'lists'> }
  | { type: 'UPDATE_PROFILE'; payload: Partial<SavedProfile> & { id: string } }
  | { type: 'DELETE_PROFILE'; payload: string };