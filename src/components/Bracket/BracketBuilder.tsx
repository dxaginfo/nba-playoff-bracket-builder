import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { 
  createBracket, 
  loadBracket, 
  saveBracket 
} from '../../store/slices/bracketSlice';
import { showNotification } from '../../store/slices/uiSlice';
import { Round, ROUND_INFO } from '../../types';
import BracketHeader from './BracketHeader';
import RoundColumn from './RoundColumn';
import ChampionDisplay from './ChampionDisplay';
import BracketControls from './BracketControls';

const BracketBuilder: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { currentBracket, loading, error } = useAppSelector((state) => state.bracket);
  const { selectedYear } = useAppSelector((state) => state.teams);
  const [bracketName, setBracketName] = useState('NBA Playoffs Bracket');

  // Load existing bracket if ID is provided
  useEffect(() => {
    if (id) {
      dispatch(loadBracket(id));
    }
  }, [id, dispatch]);

  // Initialize a new bracket if no current bracket exists
  useEffect(() => {
    if (!currentBracket && !loading && !id) {
      dispatch(createBracket({ 
        year: selectedYear, 
        name: bracketName 
      }));
    }
  }, [currentBracket, loading, selectedYear, bracketName, id, dispatch]);

  // Update bracketName when currentBracket changes
  useEffect(() => {
    if (currentBracket) {
      setBracketName(currentBracket.name);
    }
  }, [currentBracket]);

  // Show error notification if loading fails
  useEffect(() => {
    if (error) {
      dispatch(
        showNotification({
          message: `Error: ${error}`,
          type: 'error',
        })
      );
    }
  }, [error, dispatch]);

  const handleSaveBracket = () => {
    if (currentBracket) {
      dispatch(saveBracket());
      dispatch(
        showNotification({
          message: 'Bracket saved successfully!',
          type: 'success',
        })
      );
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBracketName(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nba-blue"></div>
      </div>
    );
  }

  if (!currentBracket) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold">No bracket found</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Please try creating a new bracket or check your saved brackets.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <BracketHeader
        bracketName={bracketName}
        onNameChange={handleNameChange}
        year={currentBracket.year}
        onSave={handleSaveBracket}
      />

      <div className="bracket-container overflow-x-auto pb-4">
        {/* First Round */}
        <RoundColumn
          round={Round.FIRST_ROUND}
          roundInfo={ROUND_INFO[Round.FIRST_ROUND]}
          matchups={currentBracket.matchups.filter(
            (m) => m.round === Round.FIRST_ROUND
          )}
        />

        {/* Conference Semifinals */}
        <RoundColumn
          round={Round.CONFERENCE_SEMIFINALS}
          roundInfo={ROUND_INFO[Round.CONFERENCE_SEMIFINALS]}
          matchups={currentBracket.matchups.filter(
            (m) => m.round === Round.CONFERENCE_SEMIFINALS
          )}
        />

        {/* Conference Finals */}
        <RoundColumn
          round={Round.CONFERENCE_FINALS}
          roundInfo={ROUND_INFO[Round.CONFERENCE_FINALS]}
          matchups={currentBracket.matchups.filter(
            (m) => m.round === Round.CONFERENCE_FINALS
          )}
        />

        {/* NBA Finals */}
        <RoundColumn
          round={Round.NBA_FINALS}
          roundInfo={ROUND_INFO[Round.NBA_FINALS]}
          matchups={currentBracket.matchups.filter(
            (m) => m.round === Round.NBA_FINALS
          )}
        />

        {/* Champion Display */}
        <div className="round-column">
          <h2 className="text-lg font-semibold text-center mb-4">Champion</h2>
          <ChampionDisplay champion={currentBracket.champion} />
        </div>
      </div>

      <BracketControls onSave={handleSaveBracket} />
    </div>
  );
};

export default BracketBuilder;