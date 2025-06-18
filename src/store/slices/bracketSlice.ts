import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Bracket, Matchup, Round, Team } from '../../types';

interface BracketState {
  currentBracket: Bracket | null;
  savedBrackets: Bracket[];
  loading: boolean;
  error: string | null;
}

const initialState: BracketState = {
  currentBracket: null,
  savedBrackets: [],
  loading: false,
  error: null,
};

/**
 * Creates an empty playoff bracket structure
 */
export const createEmptyBracket = (year: number, name: string): Bracket => {
  // Create matchups for each round
  const matchups: Matchup[] = [];
  
  // First Round (8 matchups)
  for (let i = 0; i < 8; i++) {
    matchups.push({
      id: uuidv4(),
      round: Round.FIRST_ROUND,
      position: i,
      homeTeam: null,
      awayTeam: null,
      nextMatchupId: `semifinal-${Math.floor(i / 2)}`,
    });
  }
  
  // Conference Semifinals (4 matchups)
  for (let i = 0; i < 4; i++) {
    matchups.push({
      id: `semifinal-${i}`,
      round: Round.CONFERENCE_SEMIFINALS,
      position: i,
      homeTeam: null,
      awayTeam: null,
      nextMatchupId: `conference-final-${Math.floor(i / 2)}`,
    });
  }
  
  // Conference Finals (2 matchups)
  for (let i = 0; i < 2; i++) {
    matchups.push({
      id: `conference-final-${i}`,
      round: Round.CONFERENCE_FINALS,
      position: i,
      homeTeam: null,
      awayTeam: null,
      nextMatchupId: 'nba-finals',
    });
  }
  
  // NBA Finals (1 matchup)
  matchups.push({
    id: 'nba-finals',
    round: Round.NBA_FINALS,
    position: 0,
    homeTeam: null,
    awayTeam: null,
  });
  
  return {
    id: uuidv4(),
    name,
    year,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublic: false,
    matchups,
    champion: null,
  };
};

const bracketSlice = createSlice({
  name: 'bracket',
  initialState,
  reducers: {
    createBracket: (state, action: PayloadAction<{ year: number; name: string }>) => {
      const { year, name } = action.payload;
      state.currentBracket = createEmptyBracket(year, name);
      state.error = null;
    },
    
    saveBracket: (state) => {
      if (state.currentBracket) {
        const updatedBracket = {
          ...state.currentBracket,
          updatedAt: new Date().toISOString(),
        };
        
        // Check if the bracket already exists in savedBrackets
        const existingIndex = state.savedBrackets.findIndex(
          (bracket) => bracket.id === updatedBracket.id
        );
        
        if (existingIndex >= 0) {
          // Update existing bracket
          state.savedBrackets[existingIndex] = updatedBracket;
        } else {
          // Add new bracket
          state.savedBrackets.push(updatedBracket);
        }
        
        state.currentBracket = updatedBracket;
      }
    },
    
    loadBracket: (state, action: PayloadAction<string>) => {
      const bracketId = action.payload;
      const bracket = state.savedBrackets.find((b) => b.id === bracketId);
      
      if (bracket) {
        state.currentBracket = bracket;
        state.error = null;
      } else {
        state.error = 'Bracket not found';
      }
    },
    
    updateMatchup: (
      state,
      action: PayloadAction<{
        matchupId: string;
        homeTeam?: Team | null;
        awayTeam?: Team | null;
        homeScore?: number;
        awayScore?: number;
        winner?: Team | null;
      }>
    ) => {
      if (!state.currentBracket) return;
      
      const { matchupId, homeTeam, awayTeam, homeScore, awayScore, winner } = action.payload;
      
      // Find and update the matchup
      const matchupIndex = state.currentBracket.matchups.findIndex(
        (m) => m.id === matchupId
      );
      
      if (matchupIndex >= 0) {
        const matchup = state.currentBracket.matchups[matchupIndex];
        
        // Update the matchup with the new data
        state.currentBracket.matchups[matchupIndex] = {
          ...matchup,
          homeTeam: homeTeam !== undefined ? homeTeam : matchup.homeTeam,
          awayTeam: awayTeam !== undefined ? awayTeam : matchup.awayTeam,
          homeScore: homeScore !== undefined ? homeScore : matchup.homeScore,
          awayScore: awayScore !== undefined ? awayScore : matchup.awayScore,
          winner: winner !== undefined ? winner : matchup.winner,
        };
        
        // If there's a winner and this matchup connects to another one,
        // propagate the winner to the next matchup
        if (winner && matchup.nextMatchupId) {
          const nextMatchupIndex = state.currentBracket.matchups.findIndex(
            (m) => m.id === matchup.nextMatchupId
          );
          
          if (nextMatchupIndex >= 0) {
            const nextMatchup = state.currentBracket.matchups[nextMatchupIndex];
            
            // Determine if the winner should be placed in the home or away position
            // of the next matchup based on the current matchup's position
            if (matchup.position % 2 === 0) {
              // Even positions go to home team
              state.currentBracket.matchups[nextMatchupIndex] = {
                ...nextMatchup,
                homeTeam: winner,
              };
            } else {
              // Odd positions go to away team
              state.currentBracket.matchups[nextMatchupIndex] = {
                ...nextMatchup,
                awayTeam: winner,
              };
            }
          }
        }
        
        // If this is the NBA Finals and we have a winner, update the champion
        if (matchup.round === Round.NBA_FINALS && winner) {
          state.currentBracket.champion = winner;
        }
      }
    },
    
    clearBracket: (state) => {
      state.currentBracket = null;
      state.error = null;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  createBracket,
  saveBracket,
  loadBracket,
  updateMatchup,
  clearBracket,
  setLoading,
  setError,
} = bracketSlice.actions;

export default bracketSlice.reducer;