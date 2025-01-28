import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { SearchHero } from './components/search/SearchHero';
import { SearchResults } from './components/search/SearchResults';
import { ProfileDashboard } from './components/profile/ProfileDashboard';
import { SwipefilePage } from './components/swipefile/SwipefilePage';
import { EditorPage } from './components/editor/EditorPage';
import { SavedProfilesProvider } from './context/SavedProfilesContext';
import { SwipefileProvider } from './context/SwipefileContext';

export const App: React.FC = () => {
  return (
    <SavedProfilesProvider>
      <SwipefileProvider>
        <Router>
          <div className="min-h-screen bg-black">
            <Navbar />
            <Routes>
              <Route path="/" element={<SearchHero />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/profile/:handle" element={<ProfileDashboard />} />
              <Route path="/swipefile" element={<SwipefilePage />} />
              <Route path="/editor" element={<EditorPage />} />
            </Routes>
          </div>
        </Router>
      </SwipefileProvider>
    </SavedProfilesProvider>
  );
};