import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SwipefileState, SwipefileAction, SwipefileList, SavedProfile } from '../types/swipefile';

// Sample data
const sampleLists: SwipefileList[] = [
  {
    id: 'all',
    name: 'All Profiles',
    description: 'All saved profiles',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    profileIds: ['profile-1', 'profile-2']
  },
  {
    id: 'growth-experts',
    name: 'Growth Experts',
    description: 'Top growth and marketing experts',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    profileIds: ['profile-1']
  },
  {
    id: 'business-leaders',
    name: 'Business Leaders',
    description: 'Successful entrepreneurs and business leaders',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    profileIds: ['profile-2']
  }
];

const sampleProfiles: SavedProfile[] = [
  {
    id: 'profile-1',
    handle: 'alexhormozi',
    savedAt: new Date().toISOString(),
    notes: 'Great insights on business growth and scaling',
    lists: ['all', 'growth-experts']
  },
  {
    id: 'profile-2',
    handle: 'leilahormozi',
    savedAt: new Date().toISOString(),
    notes: 'Excellent content on business leadership',
    lists: ['all', 'business-leaders']
  }
];

const initialState: SwipefileState = {
  lists: sampleLists,
  savedProfiles: sampleProfiles,
  activeListId: 'all',
  viewMode: 'profiles'
};

function swipefileReducer(state: SwipefileState, action: SwipefileAction): SwipefileState {
  switch (action.type) {
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };

    case 'SET_ACTIVE_LIST':
      return { ...state, activeListId: action.payload };

    case 'CREATE_LIST': {
      const newList: SwipefileList = {
        id: uuidv4(),
        name: action.payload.name,
        description: action.payload.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        profileIds: []
      };
      return {
        ...state,
        lists: [...state.lists, newList]
      };
    }

    case 'UPDATE_LIST': {
      const updatedLists = state.lists.map(list =>
        list.id === action.payload.id
          ? { ...list, ...action.payload, updatedAt: new Date().toISOString() }
          : list
      );
      return { ...state, lists: updatedLists };
    }

    case 'DELETE_LIST': {
      if (action.payload === 'all') return state; // Prevent deleting "All Profiles" list
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== action.payload),
        activeListId: state.activeListId === action.payload ? 'all' : state.activeListId
      };
    }

    case 'ADD_PROFILE_TO_LIST': {
      const updatedLists = state.lists.map(list =>
        list.id === action.payload.listId && !list.profileIds.includes(action.payload.profileId)
          ? {
              ...list,
              profileIds: [...list.profileIds, action.payload.profileId],
              updatedAt: new Date().toISOString()
            }
          : list
      );
      return { ...state, lists: updatedLists };
    }

    case 'REMOVE_PROFILE_FROM_LIST': {
      const updatedLists = state.lists.map(list =>
        list.id === action.payload.listId
          ? {
              ...list,
              profileIds: list.profileIds.filter(id => id !== action.payload.profileId),
              updatedAt: new Date().toISOString()
            }
          : list
      );
      return { ...state, lists: updatedLists };
    }

    case 'SAVE_PROFILE': {
      const newProfile: SavedProfile = {
        id: uuidv4(),
        handle: action.payload.handle,
        savedAt: new Date().toISOString(),
        notes: action.payload.notes,
        lists: ['all']
      };
      
      // Add to all profiles list
      const updatedLists = state.lists.map(list =>
        list.id === 'all'
          ? {
              ...list,
              profileIds: [...list.profileIds, newProfile.id],
              updatedAt: new Date().toISOString()
            }
          : list
      );

      return {
        ...state,
        savedProfiles: [...state.savedProfiles, newProfile],
        lists: updatedLists
      };
    }

    case 'UPDATE_PROFILE': {
      const updatedProfiles = state.savedProfiles.map(profile =>
        profile.id === action.payload.id
          ? { ...profile, ...action.payload }
          : profile
      );
      return { ...state, savedProfiles: updatedProfiles };
    }

    case 'DELETE_PROFILE': {
      // Remove profile from all lists
      const updatedLists = state.lists.map(list => ({
        ...list,
        profileIds: list.profileIds.filter(id => id !== action.payload),
        updatedAt: new Date().toISOString()
      }));

      return {
        ...state,
        savedProfiles: state.savedProfiles.filter(profile => profile.id !== action.payload),
        lists: updatedLists
      };
    }

    default:
      return state;
  }
}

const SwipefileContext = createContext<{
  state: SwipefileState;
  dispatch: React.Dispatch<SwipefileAction>;
} | null>(null);

export function SwipefileProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(swipefileReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('swipefileState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        Object.entries(parsedState).forEach(([key, value]) => {
          dispatch({ type: 'LOAD_STATE', payload: { key, value } } as SwipefileAction);
        });
      } catch (error) {
        console.error('Error loading swipefile state:', error);
      }
    }
  }, []);

  // Save state to localStorage on changes
  useEffect(() => {
    localStorage.setItem('swipefileState', JSON.stringify(state));
  }, [state]);

  return (
    <SwipefileContext.Provider value={{ state, dispatch }}>
      {children}
    </SwipefileContext.Provider>
  );
}

export function useSwipefile() {
  const context = useContext(SwipefileContext);
  if (!context) {
    throw new Error('useSwipefile must be used within a SwipefileProvider');
  }
  return context;
}