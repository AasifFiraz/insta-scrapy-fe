import React, { createContext, useContext } from 'react';
import { useSavedProfiles } from '../hooks/useSavedProfiles';

interface SavedProfilesContextType {
  savedProfiles: { handle: string; savedAt: string; }[];
  isProfileSaved: (handle: string) => boolean;
  saveProfile: (handle: string) => void;
  unsaveProfile: (handle: string) => void;
}

const SavedProfilesContext = createContext<SavedProfilesContextType | undefined>(undefined);

export const SavedProfilesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const savedProfilesState = useSavedProfiles();

  return (
    <SavedProfilesContext.Provider value={savedProfilesState}>
      {children}
    </SavedProfilesContext.Provider>
  );
};

export const useSavedProfilesContext = () => {
  const context = useContext(SavedProfilesContext);
  if (!context) {
    throw new Error('useSavedProfilesContext must be used within a SavedProfilesProvider');
  }
  return context;
};