import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store-index';
import { toggleEditMode } from '../../store-slices';

interface BracketControlsProps {
  onSave: () => void;
}

const BracketControls: React.FC<BracketControlsProps> = ({ onSave }) => {
  const dispatch = useAppDispatch();
  const { editMode } = useAppSelector((state) => state.ui);
  const { currentBracket } = useAppSelector((state) => state.bracket);

  const handleToggleEditMode = () => {
    dispatch(toggleEditMode());
  };

  const handleShare = () => {
    // In a real app, this would generate a shareable link
    // For this demo, we'll copy a fake URL to the clipboard
    const shareableUrl = `https://nba-bracket-builder.example.com/bracket/${currentBracket?.id}`;
    
    navigator.clipboard.writeText(shareableUrl)
      .then(() => {
        alert('Bracket link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy URL: ', err);
        alert('Could not copy the URL to clipboard.');
      });
  };

  const handleExport = () => {
    // In a real app, this would generate a downloadable file
    // For this demo, we'll create a JSON string and open it in a new tab
    const bracketData = JSON.stringify(currentBracket, null, 2);
    const blob = new Blob([bracketData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    window.open(url, '_blank');
    
    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  return (
    <div className="bracket-controls mt-8 flex flex-wrap gap-4 justify-center">
      <button
        onClick={handleToggleEditMode}
        className={`flex items-center px-4 py-2 rounded-md transition ${
          editMode
            ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            : 'bg-blue-600 text-white dark:bg-blue-700'
        }`}
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {editMode ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          )}
        </svg>
        {editMode ? 'View Mode' : 'Edit Mode'}
      </button>

      <button
        onClick={onSave}
        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        <svg
          className="w-5 h-5 mr-2"
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

      <button
        onClick={handleShare}
        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        Share
      </button>

      <button
        onClick={handleExport}
        className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Export
      </button>
    </div>
  );
};

export default BracketControls;