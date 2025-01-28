import React from 'react';
import { useSwipefile } from '../../../../context/SwipefileContext';
import { ProfileCard } from '../../../profile/ProfileCard';
import { DETAILED_PROFILES } from '../../../../data/mockProfiles';

interface ProfilesViewProps {
  listId: string | null;
}

export const ProfilesView: React.FC<ProfilesViewProps> = ({ listId }) => {
  const { state } = useSwipefile();

  // Get profiles for the current list
  const profiles = React.useMemo(() => {
    if (!listId) return [];
    
    const list = state.lists.find(l => l.id === listId);
    if (!list) return [];

    return list.profileIds
      .map(id => {
        const savedProfile = state.savedProfiles.find(p => p.id === id);
        if (!savedProfile) return null;
        return DETAILED_PROFILES.find(p => p.handle === savedProfile.handle);
      })
      .filter(Boolean);
  }, [state.lists, state.savedProfiles, listId]);

  if (profiles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No profiles in this list yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {profiles.map(profile => profile && (
        <ProfileCard 
          key={profile.id} 
          {...profile}
          onSelect={() => {}}
        />
      ))}
    </div>
  );
};