import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { UnauthenticatedRoute } from './components/auth/UnauthenticatedRoute';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <SavedProfilesProvider>
            <SwipefileProvider>
              <div className="min-h-screen bg-black">
                <Navbar />
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
                </Routes>
              </div>
            </SwipefileProvider>
          </SavedProfilesProvider>
        </AuthProvider>
      </Router>
    </Provider>
  );
};