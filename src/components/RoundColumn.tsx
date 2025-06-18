import React from 'react';
import { Matchup, Round, RoundInfo } from '../types';
import MatchupCard from './Bracket/MatchupCard';

interface RoundColumnProps {
  round: Round;
  roundInfo: RoundInfo;
  matchups: Matchup[];
}

const RoundColumn: React.FC<RoundColumnProps> = ({ round, roundInfo, matchups }) => {
  // Sort matchups by position to ensure consistent order
  const sortedMatchups = [...matchups].sort((a, b) => a.position - b.position);
  
  // Calculate the spacing between matchups based on the round
  const getSpacing = () => {
    switch (round) {
      case Round.FIRST_ROUND:
        return 'gap-6';
      case Round.CONFERENCE_SEMIFINALS:
        return 'gap-20';
      case Round.CONFERENCE_FINALS:
        return 'gap-40';
      case Round.NBA_FINALS:
        return '';
      default:
        return 'gap-6';
    }
  };

  return (
    <div className="round-column">
      <div className="round-header mb-4 text-center">
        <h3 className="text-lg font-semibold">{roundInfo.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {round < Round.NBA_FINALS ? 'Best of 7' : 'Championship'}
        </p>
      </div>

      <div className={`matchups-container flex flex-col ${getSpacing()}`}>
        {sortedMatchups.map((matchup) => (
          <MatchupCard key={matchup.id} matchup={matchup} />
        ))}
      </div>
    </div>
  );
};

export default RoundColumn;