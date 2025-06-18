import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store-index';
import { fetchBrackets, fetchTeams } from '../store-slices';
import BracketList from './Bracket/BracketList';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { brackets, loading: bracketsLoading } = useAppSelector((state) => state.bracket);
  const { teams, loading: teamsLoading, selectedYear } = useAppSelector((state) => state.teams);

  // Load initial data
  useEffect(() => {
    if (brackets.length === 0 && !bracketsLoading) {
      dispatch(fetchBrackets());
    }

    if (teams.length === 0 && !teamsLoading) {
      dispatch(fetchTeams(selectedYear));
    }
  }, [dispatch, brackets.length, bracketsLoading, teams.length, teamsLoading, selectedYear]);

  // Group brackets by year
  const bracketsByYear = brackets.reduce((acc, bracket) => {
    if (!acc[bracket.year]) {
      acc[bracket.year] = [];
    }
    acc[bracket.year].push(bracket);
    return acc;
  }, {} as Record<number, typeof brackets>);

  // Count brackets with champions
  const completedBrackets = brackets.filter(bracket => bracket.champion).length;

  return (
    <div className="dashboard-container max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Bracket Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Your Brackets</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{brackets.length}</p>
              <p className="text-gray-600 dark:text-gray-400">Total</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{completedBrackets}</p>
              <p className="text-gray-600 dark:text-gray-400">Completed</p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              to="/brackets"
              className="block text-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              View All Brackets →
            </Link>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {brackets.length > 0 ? (
            <ul className="space-y-3">
              {brackets
                .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                .slice(0, 3)
                .map((bracket) => (
                  <li key={bracket.id} className="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0">
                    <Link
                      to={`/bracket/${bracket.id}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <p className="font-medium">{bracket.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Updated {new Date(bracket.updatedAt).toLocaleDateString()}
                      </p>
                    </Link>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No recent activity
            </p>
          )}
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/"
              className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-md transition"
            >
              Create New Bracket
            </Link>
            <Link
              to="/settings"
              className="block w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-center rounded-md transition"
            >
              Settings
            </Link>
            <a
              href="https://www.nba.com/playoffs/2024"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-center rounded-md transition"
            >
              View NBA Playoffs
            </a>
          </div>
        </div>
      </div>

      {/* Recent Brackets */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Brackets</h2>
          <Link
            to="/brackets"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            View All →
          </Link>
        </div>
        {brackets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brackets
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
              .slice(0, 3)
              .map((bracket) => (
                <Link
                  key={bracket.id}
                  to={`/bracket/${bracket.id}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-md transition"
                >
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{bracket.name}</h3>
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span>{bracket.year} Season</span>
                      <span>{new Date(bracket.updatedAt).toLocaleDateString()}</span>
                    </div>
                    {bracket.champion ? (
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 mr-2">
                          <img
                            src={bracket.champion.logoUrl}
                            alt={`${bracket.champion.name} logo`}
                            className="h-8 w-8 object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Champion</p>
                          <p className="font-medium">{bracket.champion.name}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-yellow-600 dark:text-yellow-400">
                        No champion selected
                      </div>
                    )}
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              You haven't created any brackets yet.
            </p>
            <Link
              to="/"
              className="inline-block py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
            >
              Create Your First Bracket
            </Link>
          </div>
        )}
      </div>

      {/* Brackets by Season (if they exist) */}
      {Object.keys(bracketsByYear).length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Brackets by Season</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {Object.entries(bracketsByYear)
                .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
                .map(([year, yearBrackets]) => (
                  <div key={year} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                    <h3 className="font-semibold mb-2">{year} Season</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {yearBrackets.length} bracket{yearBrackets.length !== 1 ? 's' : ''}
                    </p>
                    <ul className="text-sm space-y-1">
                      {yearBrackets.slice(0, 3).map((bracket) => (
                        <li key={bracket.id}>
                          <Link
                            to={`/bracket/${bracket.id}`}
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {bracket.name}
                          </Link>
                        </li>
                      ))}
                      {yearBrackets.length > 3 && (
                        <li className="text-gray-500 dark:text-gray-400">
                          +{yearBrackets.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;