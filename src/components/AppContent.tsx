import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { checkAuth } from '../store/features/auth/authThunks';
import { Navbar } from './layout/Navbar';
import { SearchHero } from './search/SearchHero';
import { SearchResults } from './search/SearchResults';
import { ProfileDashboard } from './profile/ProfileDashboard';
import { SwipefilePage } from './swipefile/SwipefilePage';
import { EditorPage } from './editor/EditorPage';
import { LoginPage } from './auth/LoginPage';
import { SignupPage } from './auth/SignupPage';

export const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, authChecked } = useAppSelector(state => state.auth);
  const { profile } = useAppSelector(state => state.user);

  useEffect(() => {
    // Only check auth once when the component mounts and auth hasn't been checked yet
    if (!authChecked && !loading) {
      dispatch(checkAuth());
    }
  }, [dispatch, authChecked, loading]);

  // Debug logs
  console.log('App state:', { isAuthenticated, loading, authChecked, profile });

  // Optional: Show loading spinner while checking initial auth
  if (!authChecked && loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchHero />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/profile/:handle" element={<ProfileDashboard />} />
        <Route path="/swipefile" element={<SwipefilePage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}; 