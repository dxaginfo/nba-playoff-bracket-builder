import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Team } from '../../types';
import { mockTeams } from '../../data/mockTeams';

interface TeamsState {
  teams: Team[];
  filteredTeams: Team[];
  selectedYear: number;
  loading: boolean;
  error: string | null;
}

const initialState: TeamsState = {
  teams: [],
  filteredTeams: [],
  selectedYear: new Date().getFullYear(),
  loading: false,
  error: null,
};

// Async thunk for loading teams (simulated API call)
export const fetchTeams = createAsyncThunk(
  'teams/fetchTeams',
  async (year: number) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll just return mock data with a delay
      return new Promise<Team[]>((resolve) => {
        setTimeout(() => {
          resolve(mockTeams);
        }, 500);
      });
    } catch (error) {
      throw new Error('Failed to fetch teams');
    }
  }
);

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setSelectedYear: (state, action: PayloadAction<number>) => {
      state.selectedYear = action.payload;
    },
    
    filterTeamsByConference: (state, action: PayloadAction<string | null>) => {
      const conference = action.payload;
      
      if (!conference) {
        state.filteredTeams = [...state.teams];
      } else {
        state.filteredTeams = state.teams.filter(
          (team) => team.conference === conference
        );
      }
    },
    
    sortTeamsBySeed: (state) => {
      state.filteredTeams = [...state.filteredTeams].sort((a, b) => {
        // Sort by seed (if available)
        if (a.seed && b.seed) {
          return a.seed - b.seed;
        }
        
        // Fall back to alphabetical if seeds are not available
        return a.name.localeCompare(b.name);
      });
    },
    
    updateTeam: (state, action: PayloadAction<Team>) => {
      const updatedTeam = action.payload;
      const index = state.teams.findIndex((team) => team.id === updatedTeam.id);
      
      if (index !== -1) {
        state.teams[index] = updatedTeam;
        
        // Also update the team in filteredTeams if it exists there
        const filteredIndex = state.filteredTeams.findIndex(
          (team) => team.id === updatedTeam.id
        );
        
        if (filteredIndex !== -1) {
          state.filteredTeams[filteredIndex] = updatedTeam;
        }
      }
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
        state.filteredTeams = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch teams';
      });
  },
});

export const {
  setSelectedYear,
  filterTeamsByConference,
  sortTeamsBySeed,
  updateTeam,
} = teamsSlice.actions;

export default teamsSlice.reducer;