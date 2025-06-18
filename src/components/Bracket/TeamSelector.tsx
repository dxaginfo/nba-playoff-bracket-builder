import React, { useEffect, useRef, useState } from 'react';
import { Team } from '../../types';

interface TeamSelectorProps {
  teams: Team[];
  onSelect: (team: Team) => void;
  onClose: () => void;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({ teams, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTeams, setFilteredTeams] = useState<Team[]>(teams);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the search input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Close the selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Filter teams when the search term changes
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredTeams(teams);
    } else {
      const filtered = teams.filter((team) =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTeams(filtered);
    }
  }, [searchTerm, teams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div
      ref={ref}
      className="absolute top-0 left-0 right-0 z-10 mt-12 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-3"
    >
      <div className="mb-3">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search teams..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div className="max-h-60 overflow-y-auto">
        {filteredTeams.length > 0 ? (
          <ul className="space-y-1">
            {filteredTeams.map((team) => (
              <li key={team.id}>
                <button
                  onClick={() => onSelect(team)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition flex items-center"
                >
                  <div className="w-6 h-6 mr-2 flex-shrink-0">
                    <img
                      src={team.logoUrl}
                      alt={`${team.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{team.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {team.seed && `#${team.seed} Seed`} • {team.record}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No teams found matching "{searchTerm}"
          </div>
        )}
      </div>

      <div className="mt-3 flex justify-end">
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TeamSelector;