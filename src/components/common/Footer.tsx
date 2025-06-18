import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-nba-blue dark:text-blue-400 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                fill="currentColor"
              >
                <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 85c-19.3 0-35-15.7-35-35s15.7-35 35-35 35 15.7 35 35-15.7 35-35 35z" />
                <path d="M50 25c-13.8 0-25 11.2-25 25s11.2 25 25 25 25-11.2 25-25-11.2-25-25-25zm0 35c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z" />
              </svg>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold">NBA Playoff Bracket Builder</span> — Create, share, and
                track your NBA playoff predictions
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Home
            </Link>
            <Link to="/teams" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Teams
            </Link>
            <Link to="/brackets" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              My Brackets
            </Link>
            <a
              href="https://github.com/dxaginfo/nba-playoff-bracket-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            © {currentYear} NBA Playoff Bracket Builder. This is a fan project and is not affiliated with or endorsed by the NBA.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
            All team names, logos, and brands are property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;