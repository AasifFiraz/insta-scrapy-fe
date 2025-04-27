import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider } from './context/AuthContext';
import { SavedProfilesProvider } from './context/SavedProfilesContext';
import { SwipefileProvider } from './context/SwipefileContext';
import { Navbar } from './components/layout/Navbar';
import { SearchHero } from './components/search/SearchHero';
import { SearchResults } from './components/search/SearchResults';
import { ProfileDashboard } from './components/profile/ProfileDashboard';
import { SwipefilePage } from './components/swipefile/SwipefilePage';
import { EditorPage } from './components/editor/EditorPage';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { ResetPassword } from './components/auth/ResetPassword';
import { UnauthenticatedRoute } from './components/auth/UnauthenticatedRoute';

// Helper component to conditionally render the Navbar
const AppContent: React.FC = () => {
  const location = useLocation();
  const isPasswordResetPage = location.pathname.startsWith('/password-reset');

  return (
    <div className="min-h-screen bg-black">
      {!isPasswordResetPage && <Navbar />}
      <Routes>
        <Route path="/" element={<SearchHero />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/profile/:handle" element={<ProfileDashboard />} />
        <Route path="/swipefile" element={<SwipefilePage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route
          path="/login"
          element={
            <UnauthenticatedRoute>
              <LoginPage />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <UnauthenticatedRoute>
              <SignupPage />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <UnauthenticatedRoute>
              <ForgotPassword />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/password-reset/:token"
          element={
            <UnauthenticatedRoute>
              <ResetPassword />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/password-reset"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <SavedProfilesProvider>
            <SwipefileProvider>
              <AppContent />
            </SwipefileProvider>
          </SavedProfilesProvider>
        </AuthProvider>
      </Router>
    </Provider>
  );
};