import { useState, useCallback } from 'react';

interface SavedProfile {
  handle: string;
  savedAt: string;
}

export const useSavedProfiles = () => {
  const [savedProfiles, setSavedProfiles] = useState<SavedProfile[]>([]);

  const isProfileSaved = useCallback((handle: string) => {
    return savedProfiles.some(profile => profile.handle === handle);
  }, [savedProfiles]);

  const saveProfile = useCallback((handle: string) => {
    setSavedProfiles(prev => {
      if (prev.some(profile => profile.handle === handle)) {
        return prev;
      }
      return [...prev, { handle, savedAt: new Date().toISOString() }];
    });
  }, []);

  const unsaveProfile = useCallback((handle: string) => {
    setSavedProfiles(prev => prev.filter(profile => profile.handle !== handle));
  }, []);

  return {
    savedProfiles,
    isProfileSaved,
    saveProfile,
    unsaveProfile
  };
};