import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store';
import { setIsMobile } from './store/slices/uiSlice';
import { fetchTeams } from './store/slices/teamsSlice';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import BracketBuilder from './components/Bracket/BracketBuilder';
import TeamSelection from './components/Teams/TeamSelection';
import BracketList from './components/Bracket/BracketList';
import NotFound from './pages/NotFound';
import Notification from './components/common/Notification';
import './App.css';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state) => state.ui);
  const { selectedYear } = useAppSelector((state) => state.teams);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth < 768));
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Fetch teams data
  useEffect(() => {
    dispatch(fetchTeams(selectedYear));
  }, [dispatch, selectedYear]);

  return (
    <div className={`app min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      <Router>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<BracketBuilder />} />
            <Route path="/teams" element={<TeamSelection />} />
            <Route path="/brackets" element={<BracketList />} />
            <Route path="/bracket/:id" element={<BracketBuilder />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Notification />
      </Router>
    </div>
  );
};

export default App;