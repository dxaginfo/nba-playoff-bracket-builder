import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store-index';
import { createBracket, fetchTeams, saveBracket, showNotification } from '../store-slices';
import { ROUND_INFO, Round } from '../types';
import RoundColumn from './RoundColumn';
import ChampionDisplay from './Bracket/ChampionDisplay';
import BracketControls from './Bracket/BracketControls';

const BracketBuilder: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentBracket, loading: bracketLoading } = useAppSelector((state) => state.bracket);
  const { teams, loading: teamsLoading, selectedYear } = useAppSelector((state) => state.teams);
  const [bracketName, setBracketName] = useState('My NBA Playoff Bracket');

  // Load teams data when the component mounts
  useEffect(() => {
    if (teams.length === 0 && !teamsLoading) {
      dispatch(fetchTeams(selectedYear));
    }
  }, [dispatch, teams.length, teamsLoading, selectedYear]);

  // Create a new bracket when teams are loaded
  useEffect(() => {
    if (teams.length > 0 && !currentBracket && !bracketLoading) {
      dispatch(createBracket({ year: selectedYear, name: bracketName }));
    }
  }, [dispatch, teams.length, currentBracket, bracketLoading, selectedYear, bracketName]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBracketName(e.target.value);
  };

  const handleSaveBracket = () => {
    if (!currentBracket) return;

    dispatch(saveBracket())
      .unwrap()
      .then(() => {
        dispatch(
          showNotification({
            message: 'Bracket saved successfully!',
            type: 'success',
          })
        );
      })
      .catch((error) => {
        dispatch(
          showNotification({
            message: `Failed to save bracket: ${error}`,
            type: 'error',
          })
        );
      });
  };

  if (teamsLoading || bracketLoading || !currentBracket) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading bracket...</span>
      </div>
    );
  }

  // Group matchups by round
  const matchupsByRound = currentBracket.matchups.reduce((acc, matchup) => {
    if (!acc[matchup.round]) {
      acc[matchup.round] = [];
    }
    acc[matchup.round].push(matchup);
    return acc;
  }, {} as Record<number, typeof currentBracket.matchups>);

  return (
    <div className="bracket-builder mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <input
            type="text"
            value={bracketName}
            onChange={handleNameChange}
            className="text-2xl font-bold bg-transparent border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
          />
          <span className="text-lg text-gray-500 dark:text-gray-400">{currentBracket.year}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Build your NBA playoff bracket by selecting teams and advancing them through each round.
        </p>
      </div>

      <div className="bracket-container overflow-x-auto">
        <div className="bracket-grid flex gap-4 min-w-max">
          {/* First Round */}
          <div className="round-col w-64">
            <RoundColumn
              round={Round.FIRST_ROUND}
              roundInfo={ROUND_INFO[Round.FIRST_ROUND]}
              matchups={matchupsByRound[Round.FIRST_ROUND] || []}
            />
          </div>

          {/* Conference Semifinals */}
          <div className="round-col w-64 pt-16">
            <RoundColumn
              round={Round.CONFERENCE_SEMIFINALS}
              roundInfo={ROUND_INFO[Round.CONFERENCE_SEMIFINALS]}
              matchups={matchupsByRound[Round.CONFERENCE_SEMIFINALS] || []}
            />
          </div>

          {/* Conference Finals */}
          <div className="round-col w-64 pt-48">
            <RoundColumn
              round={Round.CONFERENCE_FINALS}
              roundInfo={ROUND_INFO[Round.CONFERENCE_FINALS]}
              matchups={matchupsByRound[Round.CONFERENCE_FINALS] || []}
            />
          </div>

          {/* NBA Finals */}
          <div className="round-col w-64 pt-96">
            <RoundColumn
              round={Round.NBA_FINALS}
              roundInfo={ROUND_INFO[Round.NBA_FINALS]}
              matchups={matchupsByRound[Round.NBA_FINALS] || []}
            />
          </div>

          {/* Champion Display */}
          <div className="champion-col w-64 flex items-center justify-center pt-96">
            <ChampionDisplay champion={currentBracket.champion} />
          </div>
        </div>
      </div>

      <BracketControls onSave={handleSaveBracket} />
    </div>
  );
};

export default BracketBuilder;