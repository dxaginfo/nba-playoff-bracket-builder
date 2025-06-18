import React from 'react';

interface ScoreInputProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
  label?: string;
}

const ScoreInput: React.FC<ScoreInputProps> = ({ value, onChange, max, label }) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {label && (
        <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</span>
      )}
      <div className="flex items-center">
        <button
          onClick={handleDecrement}
          className="w-6 h-6 flex items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded-l hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
          disabled={value === 0}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val) && val >= 0 && val <= max) {
              onChange(val);
            }
          }}
          min="0"
          max={max}
          className="w-8 h-6 text-center text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
        <button
          onClick={handleIncrement}
          className="w-6 h-6 flex items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded-r hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
          disabled={value === max}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ScoreInput;