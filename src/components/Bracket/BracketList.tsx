import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store-index';
import { fetchBrackets, deleteBracket, showNotification } from '../../store-slices';
import { Bracket } from '../../types';

const BracketList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { brackets, loading } = useAppSelector((state) => state.bracket);
  const { darkMode } = useAppSelector((state) => state.ui);
  const [sortBy, setSortBy] = useState<'updatedAt' | 'name' | 'year'>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBrackets, setFilteredBrackets] = useState<Bracket[]>([]);

  // Load brackets when component mounts
  useEffect(() => {
    dispatch(fetchBrackets());
  }, [dispatch]);

  // Filter and sort brackets when criteria changes
  useEffect(() => {
    if (!brackets) return;

    let filtered = [...brackets];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (bracket) =>
          bracket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bracket.year.toString().includes(searchTerm)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'year':
          comparison = a.year - b.year;
          break;
        case 'updatedAt':
        default:
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    setFilteredBrackets(filtered);
  }, [brackets, searchTerm, sortBy, sortDirection]);

  const handleDeleteBracket = (bracketId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this bracket?')) {
      dispatch(deleteBracket(bracketId))
        .then(() => {
          dispatch(showNotification({
            message: 'Bracket deleted successfully',
            type: 'success'
          }));
        })
        .catch((error) => {
          dispatch(showNotification({
            message: `Failed to delete bracket: ${error}`,
            type: 'error'
          }));
        });
    }
  };

  const handleSortChange = (field: 'updatedAt' | 'name' | 'year') => {
    if (sortBy === field) {
      // Toggle direction if same field is clicked
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to descending for date, ascending for others
      setSortBy(field);
      setSortDirection(field === 'updatedAt' ? 'desc' : 'asc');
    }
  };

  const getSortIndicator = (field: 'updatedAt' | 'name' | 'year') => {
    if (sortBy !== field) return null;
    
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bracket-list-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Brackets</h1>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Create New Bracket
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search brackets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {filteredBrackets.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {searchTerm ? (
            <p>No brackets found matching "{searchTerm}"</p>
          ) : (
            <div>
              <p className="mb-4">You haven't created any brackets yet.</p>
              <Link
                to="/"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Create Your First Bracket
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700 text-left">
                  <th
                    className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange('name')}
                  >
                    Bracket Name {getSortIndicator('name')}
                  </th>
                  <th
                    className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange('year')}
                  >
                    Season {getSortIndicator('year')}
                  </th>
                  <th
                    className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange('updatedAt')}
                  >
                    Last Updated {getSortIndicator('updatedAt')}
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Champion
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {filteredBrackets.map((bracket) => (
                  <tr
                    key={bracket.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/bracket/${bracket.id}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        {bracket.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      {bracket.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      {new Date(bracket.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {bracket.champion ? (
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 mr-2">
                            <img
                              src={bracket.champion.logoUrl}
                              alt={`${bracket.champion.name} logo`}
                              className="h-8 w-8 object-contain"
                            />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {bracket.champion.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          Not completed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-2 justify-end">
                        <Link
                          to={`/bracket/${bracket.id}`}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={(e) => handleDeleteBracket(bracket.id, e)}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BracketList;