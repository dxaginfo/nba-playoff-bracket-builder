import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleDarkMode } from '../../store/slices/uiSlice';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state) => state.ui);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-nba-blue dark:bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-2">
            <svg
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              fill="white"
            >
              <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 85c-19.3 0-35-15.7-35-35s15.7-35 35-35 35 15.7 35 35-15.7 35-35 35z" />
              <path d="M50 25c-13.8 0-25 11.2-25 25s11.2 25 25 25 25-11.2 25-25-11.2-25-25-25zm0 35c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z" />
            </svg>
            <Link to="/" className="text-xl font-bold tracking-tight">
              NBA Playoff Bracket Builder
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium hover:text-white ${
                isActive('/') ? 'text-white' : 'text-gray-300'
              }`}
            >
              Bracket Builder
            </Link>
            <Link
              to="/teams"
              className={`text-sm font-medium hover:text-white ${
                isActive('/teams') ? 'text-white' : 'text-gray-300'
              }`}
            >
              Teams
            </Link>
            <Link
              to="/brackets"
              className={`text-sm font-medium hover:text-white ${
                isActive('/brackets') ? 'text-white' : 'text-gray-300'
              }`}
            >
              My Brackets
            </Link>
            <button
              onClick={handleDarkModeToggle}
              className="p-2 rounded-full hover:bg-nba-darkblue dark:hover:bg-gray-700 transition"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-nba-darkblue dark:hover:bg-gray-700 transition"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden py-3 border-t border-nba-darkblue dark:border-gray-700">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`text-sm font-medium px-3 py-2 rounded-md ${
                  isActive('/')
                    ? 'bg-nba-darkblue dark:bg-gray-800'
                    : 'hover:bg-nba-darkblue dark:hover:bg-gray-800'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Bracket Builder
              </Link>
              <Link
                to="/teams"
                className={`text-sm font-medium px-3 py-2 rounded-md ${
                  isActive('/teams')
                    ? 'bg-nba-darkblue dark:bg-gray-800'
                    : 'hover:bg-nba-darkblue dark:hover:bg-gray-800'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Teams
              </Link>
              <Link
                to="/brackets"
                className={`text-sm font-medium px-3 py-2 rounded-md ${
                  isActive('/brackets')
                    ? 'bg-nba-darkblue dark:bg-gray-800'
                    : 'hover:bg-nba-darkblue dark:hover:bg-gray-800'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                My Brackets
              </Link>
              <button
                onClick={() => {
                  handleDarkModeToggle();
                  setMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-sm font-medium px-3 py-2 rounded-md hover:bg-nba-darkblue dark:hover:bg-gray-800"
              >
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                {darkMode ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;