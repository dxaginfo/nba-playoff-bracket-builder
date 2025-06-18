import React from 'react';
import { Matchup, RoundInfo } from '../../types';
import MatchupCard from './MatchupCard';

interface RoundColumnProps {
  round: number;
  roundInfo: RoundInfo;
  matchups: Matchup[];
}

const RoundColumn: React.FC<RoundColumnProps> = ({ round, roundInfo, matchups }) => {
  // Sort matchups by position to ensure they're displayed in the correct order
  const sortedMatchups = [...matchups].sort((a, b) => a.position - b.position);

  return (
    <div className="round-column">
      <h2 className="text-lg font-semibold text-center mb-4">{roundInfo.name}</h2>
      
      <div className="flex flex-col space-y-4 md:space-y-8">
        {sortedMatchups.map((matchup) => (
          <MatchupCard key={matchup.id} matchup={matchup} />
        ))}
      </div>
      
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
        Best of 7
      </div>
    </div>
  );
};

export default RoundColumn;