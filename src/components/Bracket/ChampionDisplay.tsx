import React from 'react';
import { Team } from '../../types';

interface ChampionDisplayProps {
  champion: Team | null;
}

const ChampionDisplay: React.FC<ChampionDisplayProps> = ({ champion }) => {
  if (!champion) {
    return (
      <div className="champion-placeholder flex flex-col items-center justify-center p-6 h-48 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
          <svg
            className="w-8 h-8 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Complete the bracket to crown a champion
        </p>
      </div>
    );
  }

  return (
    <div
      className="champion-display flex flex-col items-center p-6 rounded-lg shadow-md"
      style={{
        background: `linear-gradient(to bottom, ${champion.primaryColor}20, ${champion.secondaryColor}10)`,
        borderTop: `4px solid ${champion.primaryColor}`,
      }}
    >
      <div className="relative mb-4">
        <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center overflow-hidden">
          <img
            src={champion.logoUrl}
            alt={`${champion.name} logo`}
            className="w-16 h-16 object-contain"
          />
        </div>
        <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-800 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-1">{champion.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {champion.conference} Conference
      </p>

      <div className="flex flex-col items-center">
        <div className="text-xl font-bold mb-1 text-yellow-600 dark:text-yellow-500">
          CHAMPIONS
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {champion.seed && `#${champion.seed} Seed`} • {champion.record}
        </div>
      </div>

      {/* Trophy Icon */}
      <div className="mt-4 text-yellow-500">
        <svg
          className="w-10 h-10"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
            clipRule="evenodd"
          />
          <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
        </svg>
      </div>
    </div>
  );
};

export default ChampionDisplay;