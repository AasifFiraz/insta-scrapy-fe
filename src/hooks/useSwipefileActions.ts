import { useCallback } from 'react';
import { useSwipefile } from '../context/SwipefileContext';
import { SwipefileViewMode, SwipefileList } from '../types/swipefile';

export function useSwipefileActions() {
  const { dispatch } = useSwipefile();

  const setViewMode = useCallback((mode: SwipefileViewMode) => {
    dispatch({ type: 'SET_VIEW_MODE', payload: mode });
  }, [dispatch]);

  const setActiveList = useCallback((listId: string | null) => {
    dispatch({ type: 'SET_ACTIVE_LIST', payload: listId });
  }, [dispatch]);

  const createList = useCallback((name: string, description?: string) => {
    dispatch({ type: 'CREATE_LIST', payload: { name, description } });
  }, [dispatch]);

  const updateList = useCallback((id: string, updates: Partial<SwipefileList>) => {
    dispatch({ type: 'UPDATE_LIST', payload: { id, ...updates } });
  }, [dispatch]);

  const deleteList = useCallback((id: string) => {
    dispatch({ type: 'DELETE_LIST', payload: id });
  }, [dispatch]);

  const addProfileToList = useCallback((listId: string, profileId: string) => {
    dispatch({ type: 'ADD_PROFILE_TO_LIST', payload: { listId, profileId } });
  }, [dispatch]);

  const removeProfileFromList = useCallback((listId: string, profileId: string) => {
    dispatch({ type: 'REMOVE_PROFILE_FROM_LIST', payload: { listId, profileId } });
  }, [dispatch]);

  const saveProfile = useCallback((handle: string, notes?: string) => {
    dispatch({ type: 'SAVE_PROFILE', payload: { handle, notes } });
  }, [dispatch]);

  const updateProfile = useCallback((id: string, updates: { notes?: string }) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: { id, ...updates } });
  }, [dispatch]);

  const deleteProfile = useCallback((id: string) => {
    dispatch({ type: 'DELETE_PROFILE', payload: id });
  }, [dispatch]);

  return {
    setViewMode,
    setActiveList,
    createList,
    updateList,
    deleteList,
    addProfileToList,
    removeProfileFromList,
    saveProfile,
    updateProfile,
    deleteProfile
  };
}