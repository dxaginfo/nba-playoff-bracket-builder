import React, { useState } from 'react';
import { useAppSelector } from '../../store';

interface BracketHeaderProps {
  bracketName: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  year: number;
  onSave: () => void;
}

const BracketHeader: React.FC<BracketHeaderProps> = ({
  bracketName,
  onNameChange,
  year,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { editMode } = useAppSelector((state) => state.ui);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    onSave();
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              value={bracketName}
              onChange={onNameChange}
              className="border-b-2 border-nba-blue dark:border-blue-500 bg-transparent text-2xl font-bold py-1 px-2 mr-2 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="bg-nba-blue dark:bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">{bracketName}</h1>
            <button
              onClick={() => setIsEditing(true)}
              className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              aria-label="Edit bracket name"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="mt-2 sm:mt-0 flex items-center">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-4">
            {year} NBA Playoffs
          </span>

          <button
            onClick={onSave}
            className="flex items-center bg-green-600 hover:bg-green-700 text-white py-1.5 px-3 rounded transition text-sm font-medium"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
            Save Bracket
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            editMode
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
          }`}
        >
          {editMode ? 'Edit Mode' : 'View Mode'}
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 ml-3">
          {editMode 
            ? 'Click on team slots to set winners and edit scores'
            : 'Switch to edit mode to make changes to your bracket'}
        </div>
      </div>
    </div>
  );
};

export default BracketHeader;