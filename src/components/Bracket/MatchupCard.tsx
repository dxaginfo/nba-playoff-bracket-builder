import React, { useState } from 'react';
import { Matchup, Team } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store-index';
import { updateMatchup, showNotification } from '../../store-slices';
import TeamSlot from './TeamSlot';
import ScoreInput from './ScoreInput';

interface MatchupCardProps {
  matchup: Matchup;
}

const MatchupCard: React.FC<MatchupCardProps> = ({ matchup }) => {
  const dispatch = useAppDispatch();
  const { editMode } = useAppSelector((state) => state.ui);
  const [isEditing, setIsEditing] = useState(false);
  const [homeScore, setHomeScore] = useState(matchup.homeScore || 0);
  const [awayScore, setAwayScore] = useState(matchup.awayScore || 0);

  const handleTeamSelect = (team: Team, isHome: boolean) => {
    if (!editMode) return;

    if (isHome) {
      dispatch(
        updateMatchup({
          matchupId: matchup.id,
          homeTeam: team,
        })
      );
    } else {
      dispatch(
        updateMatchup({
          matchupId: matchup.id,
          awayTeam: team,
        })
      );
    }
  };

  const handleWinnerSelect = (team: Team) => {
    if (!editMode) return;

    // Check if both teams are set
    if (!matchup.homeTeam || !matchup.awayTeam) {
      dispatch(
        showNotification({
          message: 'Both teams must be set before selecting a winner',
          type: 'error',
        })
      );
      return;
    }

    // Update scores if needed
    let newHomeScore = homeScore;
    let newAwayScore = awayScore;

    // If scores are equal or don't make sense for the winner, auto-adjust
    if (
      (team.id === matchup.homeTeam.id && homeScore <= awayScore) ||
      (team.id === matchup.awayTeam.id && awayScore <= homeScore)
    ) {
      if (team.id === matchup.homeTeam.id) {
        newHomeScore = 4;
        newAwayScore = Math.min(3, awayScore);
      } else {
        newAwayScore = 4;
        newHomeScore = Math.min(3, homeScore);
      }
    }

    dispatch(
      updateMatchup({
        matchupId: matchup.id,
        winner: team,
        homeScore: newHomeScore,
        awayScore: newAwayScore,
      })
    );

    setHomeScore(newHomeScore);
    setAwayScore(newAwayScore);
    setIsEditing(false);
  };

  const handleEditScores = () => {
    if (!editMode) return;
    setIsEditing(true);
  };

  const handleSaveScores = () => {
    // Validate scores
    if (homeScore < 0 || awayScore < 0 || homeScore > 4 || awayScore > 4) {
      dispatch(
        showNotification({
          message: 'Scores must be between 0 and 4',
          type: 'error',
        })
      );
      return;
    }

    if (homeScore === 4 && awayScore === 4) {
      dispatch(
        showNotification({
          message: 'Both teams cannot have 4 wins',
          type: 'error',
        })
      );
      return;
    }

    // Determine winner based on scores
    let winner = null;
    if (homeScore === 4) {
      winner = matchup.homeTeam;
    } else if (awayScore === 4) {
      winner = matchup.awayTeam;
    }

    dispatch(
      updateMatchup({
        matchupId: matchup.id,
        homeScore,
        awayScore,
        winner,
      })
    );

    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setHomeScore(matchup.homeScore || 0);
    setAwayScore(matchup.awayScore || 0);
    setIsEditing(false);
  };

  return (
    <div className="matchup-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-3">
        {/* Home Team */}
        <TeamSlot
          team={matchup.homeTeam}
          score={matchup.homeScore}
          isWinner={matchup.winner?.id === matchup.homeTeam?.id}
          onTeamSelect={(team) => handleTeamSelect(team, true)}
          onWinnerSelect={handleWinnerSelect}
          editable={editMode}
          position="home"
        />

        {/* Divider */}
        <div className="flex items-center justify-center my-2">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          <span className="mx-2 text-xs text-gray-500 dark:text-gray-400">VS</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
        </div>

        {/* Away Team */}
        <TeamSlot
          team={matchup.awayTeam}
          score={matchup.awayScore}
          isWinner={matchup.winner?.id === matchup.awayTeam?.id}
          onTeamSelect={(team) => handleTeamSelect(team, false)}
          onWinnerSelect={handleWinnerSelect}
          editable={editMode}
          position="away"
        />
      </div>

      {/* Score Editing Controls */}
      {editMode && matchup.homeTeam && matchup.awayTeam && (
        <div className="bg-gray-50 dark:bg-gray-900 px-3 py-2 border-t border-gray-200 dark:border-gray-700">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <ScoreInput
                value={homeScore}
                onChange={(value) => setHomeScore(value)}
                max={4}
                label={matchup.homeTeam.abbreviation}
              />
              <span className="text-gray-500 dark:text-gray-400">—</span>
              <ScoreInput
                value={awayScore}
                onChange={(value) => setAwayScore(value)}
                max={4}
                label={matchup.awayTeam.abbreviation}
              />
              <div className="flex-1"></div>
              <button
                onClick={handleSaveScores}
                className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="text-xs px-2 py-1 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditScores}
              className="text-xs w-full py-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center justify-center"
            >
              <svg
                className="w-3 h-3 mr-1"
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
              Edit Scores
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MatchupCard;