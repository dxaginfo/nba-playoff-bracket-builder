import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store-index';
import { 
  createBracket, 
  fetchTeams, 
  saveBracket, 
  loadBracket, 
  showNotification, 
  toggleEditMode 
} from '../store-slices';
import { ROUND_INFO, Round } from '../types';
import RoundColumn from './RoundColumn';
import ChampionDisplay from './Bracket/ChampionDisplay';
import BracketControls from './Bracket/BracketControls';

const BracketBuilder: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const { currentBracket, loading: bracketLoading } = useAppSelector((state) => state.bracket);
  const { teams, loading: teamsLoading, selectedYear } = useAppSelector((state) => state.teams);
  const { editMode, isMobile } = useAppSelector((state) => state.ui);
  
  const [bracketName, setBracketName] = useState('My NBA Playoff Bracket');

  // Load teams data when the component mounts
  useEffect(() => {
    if (teams.length === 0 && !teamsLoading) {
      dispatch(fetchTeams(selectedYear));
    }
  }, [dispatch, teams.length, teamsLoading, selectedYear]);

  // Load bracket if ID is provided, otherwise create a new one
  useEffect(() => {
    if (id && !currentBracket) {
      dispatch(loadBracket(id));
    } else if (!id && !currentBracket && !bracketLoading && teams.length > 0) {
      dispatch(createBracket({ year: selectedYear, name: bracketName }));
    }
  }, [dispatch, id, currentBracket, bracketLoading, teams.length, selectedYear, bracketName]);

  // Update bracket name when current bracket changes
  useEffect(() => {
    if (currentBracket?.name) {
      setBracketName(currentBracket.name);
    }
  }, [currentBracket]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBracketName(e.target.value);
  };

  const handleSaveBracket = () => {
    if (!currentBracket) return;

    // Update bracket with current name
    const updatedBracket = {
      ...currentBracket,
      name: bracketName,
      updatedAt: new Date().toISOString()
    };

    dispatch(saveBracket(updatedBracket))
      .then(() => {
        dispatch(
          showNotification({
            message: 'Bracket saved successfully!',
            type: 'success',
          })
        );
        
        // If this is a new bracket (no ID in URL), navigate to the specific bracket URL
        if (!id) {
          navigate(`/bracket/${updatedBracket.id}`);
        }
        
        // Exit edit mode after saving
        if (editMode) {
          dispatch(toggleEditMode());
        }
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
      <div className="flex items-center justify-center h-80">
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
            disabled={!editMode}
            className={`text-2xl font-bold bg-transparent border-b-2 ${
              editMode 
                ? 'border-blue-500 dark:border-blue-400 focus:outline-none' 
                : 'border-transparent hover:border-gray-300 dark:hover:border-gray-700'
            } transition-colors`}
          />
          <span className="text-lg text-gray-500 dark:text-gray-400">{currentBracket.year}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: {new Date(currentBracket.updatedAt).toLocaleDateString()}
          </p>
          {editMode && (
            <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
              Edit Mode
            </span>
          )}
        </div>
      </div>

      <div className="bracket-container overflow-x-auto">
        <div className={`bracket-grid flex gap-4 ${isMobile ? 'min-w-max' : ''}`}>
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