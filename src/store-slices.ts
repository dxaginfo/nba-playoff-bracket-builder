import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Bracket, Matchup, Round, Team } from '../types';

// UI SLICE
// --------

// Define notification types
export type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  message: string;
  type: NotificationType;
  visible: boolean;
}

interface UiState {
  darkMode: boolean;
  isMobile: boolean;
  editMode: boolean;
  notification: Notification;
}

const initialUiState: UiState = {
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  isMobile: window.innerWidth < 768,
  editMode: true,
  notification: {
    message: '',
    type: 'info',
    visible: false,
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUiState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    toggleEditMode: (state) => {
      state.editMode = !state.editMode;
    },
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;
    },
    showNotification: (
      state,
      action: PayloadAction<{ message: string; type?: NotificationType }>
    ) => {
      state.notification = {
        message: action.payload.message,
        type: action.payload.type || 'info',
        visible: true,
      };
    },
    hideNotification: (state) => {
      state.notification.visible = false;
    },
  },
});

// TEAMS SLICE
// -----------

interface TeamState {
  teams: Team[];
  loading: boolean;
  error: string | null;
  selectedYear: number;
}

const initialTeamState: TeamState = {
  teams: [],
  loading: false,
  error: null,
  selectedYear: new Date().getFullYear(),
};

// Fetch teams data
export const fetchTeams = createAsyncThunk(
  'teams/fetchTeams',
  async (year: number, { rejectWithValue }) => {
    try {
      // In a real app, we'd fetch from an API
      // For this demo, we'll use mock data
      const easternTeams: Team[] = [
        {
          id: 'e1',
          name: 'Miami Heat',
          abbreviation: 'MIA',
          conference: 'Eastern',
          logoUrl: 'https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg',
          primaryColor: '#98002E',
          secondaryColor: '#F9A01B',
          record: '46-36',
          seed: 1
        },
        {
          id: 'e2',
          name: 'Boston Celtics',
          abbreviation: 'BOS',
          conference: 'Eastern',
          logoUrl: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg',
          primaryColor: '#007A33',
          secondaryColor: '#FFFFFF',
          record: '44-38',
          seed: 2
        },
        {
          id: 'e3',
          name: 'Milwaukee Bucks',
          abbreviation: 'MIL',
          conference: 'Eastern',
          logoUrl: 'https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg',
          primaryColor: '#00471B',
          secondaryColor: '#EEE1C6',
          record: '43-39',
          seed: 3
        },
        {
          id: 'e4',
          name: 'Philadelphia 76ers',
          abbreviation: 'PHI',
          conference: 'Eastern',
          logoUrl: 'https://cdn.nba.com/logos/nba/1610612755/global/L/logo.svg',
          primaryColor: '#006BB6',
          secondaryColor: '#ED174C',
          record: '41-41',
          seed: 4
        },
        {
          id: 'e5',
          name: 'Toronto Raptors',
          abbreviation: 'TOR',
          conference: 'Eastern',
          logoUrl: 'https://cdn.nba.com/logos/nba/1610612761/global/L/logo.svg',
          primaryColor: '#CE1141',
          secondaryColor: '#000000',
          record: '40-42',
          seed: 5
        },
        {
          id: 'e6',
          name: 'Chicago Bulls',
          abbreviation: 'CHI',
          conference: 'Eastern',
          logoUrl: 'https://cdn.nba.com/logos/nba/1610612741/global/L/logo.svg',
          primaryColor: '#CE1141',
          secondaryColor: '#000000',
          record: '39-43',
          seed: 6
        },
        {
          id: 'e7',
          name: 'Brooklyn Nets',
          abbreviation: 'BKN',
          conference: 'Eastern',
          logoUrl: 'https://cdn.nba.com/logos/nba/1610612751/global/L/logo.svg',
          primaryColor: '#000000',
          secondaryColor: '#FFFFFF',
          record: '38-44',
          seed: 7
        },
        {
          id: 'e8',
          name: 'Atlanta Hawks',
          abbreviation: 'ATL',
          conference: 'Eastern',
          logoUrl: 'https://cdn.nba.com/logos/nba/1610612737/global/L/logo.svg',
          primaryColor: '#E03A3E',
          secondaryColor: '#26282A',
          record: '37-45',
          seed: 8
        }
      ];
      
      const westernTeams: Team[] = [
        {
          id: 'w1',
          name: 'Phoenix Suns',
          abbreviation: 'PHX',
          conference: 'Western',
          logoUrl: 'https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg',
          primaryColor: '#1D1160',
          secondaryColor: '#E56020',
          record: '48-34',
          seed: 1
        },
        {
          id: 'w2',
          name: 'Memphis Grizzlies',
          abbreviation: 'MEM',
          conference: 'Western',
          logoUrl: 'https://cdn.nba.com/logos/nba/1610612763/global/L/logo.svg',
          primaryColor: '#5D76A9',
          secondaryColor: '#12173F',
          record: '46-36',
          seed: 2
        },
        {
          id: 'w3',
          name: 'Golden State Warriors',
          abbreviation: 'GSW',
          conference: 'Western',
          logoUrl: 'https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg',
          primaryColor: '#1D428A',
          secondaryColor: '#FFC72C',
          record: '45-37',
          seed: 3
        },
        {
          id: 'w4',
          name: 'Dallas Mavericks',
          abbreviation: 'DAL',
          conference: 'Western',
          logoUrl: 'https://cdn.nba.com/logos/nba/1610612742/global/L/logo.svg',
          primaryColor: '#00538C',
          secondaryColor: '#002B5E',
          record: '44-38',
          seed: 4
        },
        {
          id: 'w5',
          name: 'Utah Jazz',
          abbreviation: 'UTA',
          conference: 'Western',
          logoUrl: 'https://cdn.nba.com/logos/nba/1610612762/global/L/logo.svg',
          primaryColor: '#002B5C',
          secondaryColor: '#00471B',
          record: '43-39',
          seed: 5
        },
        {
          id: 'w6',
          name: 'Denver Nuggets',
          abbreviation: 'DEN',
          conference: 'Western',
          logoUrl: 'https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg',
          primaryColor: '#0E2240',
          secondaryColor: '#FEC524',
          record: '42-40',
          seed: 6
        },
        {
          id: 'w7',
          name: 'Minnesota Timberwolves',
          abbreviation: 'MIN',
          conference: 'Western',
          logoUrl: 'https://cdn.nba.com/logos/nba/1610612750/global/L/logo.svg',
          primaryColor: '#0C2340',
          secondaryColor: '#78BE20',
          record: '40-42',
          seed: 7
        },
        {
          id: 'w8',
          name: 'New Orleans Pelicans',
          abbreviation: 'NOP',
          conference: 'Western',
          logoUrl: 'https://cdn.nba.com/logos/nba/1610612740/global/L/logo.svg',
          primaryColor: '#0C2340',
          secondaryColor: '#C8102E',
          record: '38-44',
          seed: 8
        }
      ];
      
      // Combine both conferences
      const teams = [...easternTeams, ...westernTeams];
      
      // Simulate a network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return teams;
    } catch (error) {
      return rejectWithValue('Failed to load teams data');
    }
  }
);

export const teamsSlice = createSlice({
  name: 'teams',
  initialState: initialTeamState,
  reducers: {
    setSelectedYear: (state, action: PayloadAction<number>) => {
      state.selectedYear = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.teams = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// BRACKET SLICE
// -------------

interface BracketState {
  currentBracket: Bracket | null;
  savedBrackets: Bracket[];
  loading: boolean;
  error: string | null;
}

const initialBracketState: BracketState = {
  currentBracket: null,
  savedBrackets: [],
  loading: false,
  error: null,
};

// Create initial matchups for a new bracket
const createInitialMatchups = (year: number): Matchup[] => {
  const matchups: Matchup[] = [];
  
  // First Round - 8 matchups (4 per conference)
  for (let i = 0; i < 8; i++) {
    const isEastern = i < 4;
    const conference = isEastern ? 'Eastern' : 'Western';
    const positionInConference = isEastern ? i : i - 4;
    
    matchups.push({
      id: uuidv4(),
      round: Round.FIRST_ROUND,
      position: i,
      homeTeam: null, // Will be filled with 1-4 seeds
      awayTeam: null, // Will be filled with 5-8 seeds
    });
  }
  
  // Conference Semifinals - 4 matchups (2 per conference)
  for (let i = 0; i < 4; i++) {
    matchups.push({
      id: uuidv4(),
      round: Round.CONFERENCE_SEMIFINALS,
      position: i,
      homeTeam: null,
      awayTeam: null,
    });
  }
  
  // Conference Finals - 2 matchups (1 per conference)
  for (let i = 0; i < 2; i++) {
    matchups.push({
      id: uuidv4(),
      round: Round.CONFERENCE_FINALS,
      position: i,
      homeTeam: null,
      awayTeam: null,
    });
  }
  
  // NBA Finals - 1 matchup
  matchups.push({
    id: uuidv4(),
    round: Round.NBA_FINALS,
    position: 0,
    homeTeam: null,
    awayTeam: null,
  });
  
  return matchups;
};

// Create a new bracket
export const createBracket = createAsyncThunk(
  'bracket/createBracket',
  async ({ year, name }: { year: number; name: string }, { rejectWithValue }) => {
    try {
      // In a real app, we'd interact with a backend API
      // For this demo, we'll create a local bracket object
      
      const bracket: Bracket = {
        id: uuidv4(),
        name,
        year,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPublic: false,
        matchups: createInitialMatchups(year),
        champion: null,
      };
      
      // Simulate a network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return bracket;
    } catch (error) {
      return rejectWithValue('Failed to create new bracket');
    }
  }
);

// Load an existing bracket
export const loadBracket = createAsyncThunk(
  'bracket/loadBracket',
  async (bracketId: string, { rejectWithValue, getState }) => {
    try {
      // In a real app, we'd fetch from an API
      // For this demo, we'll pull from the savedBrackets array
      const state = getState() as { bracket: BracketState };
      const bracket = state.bracket.savedBrackets.find(b => b.id === bracketId);
      
      if (!bracket) {
        return rejectWithValue('Bracket not found');
      }
      
      // Simulate a network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return bracket;
    } catch (error) {
      return rejectWithValue('Failed to load bracket');
    }
  }
);

// Save current bracket
export const saveBracket = createAsyncThunk(
  'bracket/saveBracket',
  async (_, { rejectWithValue, getState }) => {
    try {
      // In a real app, we'd save to a backend API
      // For this demo, we'll just update the savedBrackets array
      const state = getState() as { bracket: BracketState };
      const { currentBracket } = state.bracket;
      
      if (!currentBracket) {
        return rejectWithValue('No current bracket to save');
      }
      
      const updatedBracket: Bracket = {
        ...currentBracket,
        updatedAt: new Date().toISOString(),
      };
      
      // Simulate a network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return updatedBracket;
    } catch (error) {
      return rejectWithValue('Failed to save bracket');
    }
  }
);

export const bracketSlice = createSlice({
  name: 'bracket',
  initialState: initialBracketState,
  reducers: {
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
      
      if (matchupIndex !== -1) {
        const matchup = state.currentBracket.matchups[matchupIndex];
        
        // Update the matchup
        state.currentBracket.matchups[matchupIndex] = {
          ...matchup,
          homeTeam: homeTeam !== undefined ? homeTeam : matchup.homeTeam,
          awayTeam: awayTeam !== undefined ? awayTeam : matchup.awayTeam,
          homeScore: homeScore !== undefined ? homeScore : matchup.homeScore,
          awayScore: awayScore !== undefined ? awayScore : matchup.awayScore,
          winner: winner !== undefined ? winner : matchup.winner,
        };
        
        // If this is the final matchup, update the champion
        if (matchup.round === Round.NBA_FINALS && winner) {
          state.currentBracket.champion = winner;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Bracket
      .addCase(createBracket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBracket.fulfilled, (state, action) => {
        state.currentBracket = action.payload;
        state.loading = false;
      })
      .addCase(createBracket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Load Bracket
      .addCase(loadBracket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBracket.fulfilled, (state, action) => {
        state.currentBracket = action.payload;
        state.loading = false;
      })
      .addCase(loadBracket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Save Bracket
      .addCase(saveBracket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveBracket.fulfilled, (state, action) => {
        const updatedBracket = action.payload;
        state.currentBracket = updatedBracket;
        
        // Update or add to savedBrackets
        const existingIndex = state.savedBrackets.findIndex(
          (b) => b.id === updatedBracket.id
        );
        
        if (existingIndex !== -1) {
          state.savedBrackets[existingIndex] = updatedBracket;
        } else {
          state.savedBrackets.push(updatedBracket);
        }
        
        state.loading = false;
      })
      .addCase(saveBracket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducers
export const { toggleDarkMode, setIsMobile, toggleEditMode, setEditMode, showNotification, hideNotification } = uiSlice.actions;
export const { setSelectedYear } = teamsSlice.actions;
export const { updateMatchup } = bracketSlice.actions;

export const uiReducer = uiSlice.reducer;
export const teamsReducer = teamsSlice.reducer;
export const bracketReducer = bracketSlice.reducer;