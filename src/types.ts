// Team model
export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  conference: 'Eastern' | 'Western';
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  record: string;
  seed?: number;
}

// Bracket round enumeration
export enum Round {
  FIRST_ROUND = 0,
  CONFERENCE_SEMIFINALS = 1,
  CONFERENCE_FINALS = 2,
  NBA_FINALS = 3,
}

// Information about each round
export interface RoundInfo {
  name: string;
  description: string;
  shortName?: string;
  matchupCount?: number;
  nextRound?: Round | null;
}

// Round information mapping
export const ROUND_INFO: Record<Round, RoundInfo> = {
  [Round.FIRST_ROUND]: {
    name: 'First Round',
    shortName: '1st',
    description: 'Best of 7 series',
    matchupCount: 8,
    nextRound: Round.CONFERENCE_SEMIFINALS,
  },
  [Round.CONFERENCE_SEMIFINALS]: {
    name: 'Conference Semifinals',
    shortName: 'Semis',
    description: 'Best of 7 series',
    matchupCount: 4,
    nextRound: Round.CONFERENCE_FINALS,
  },
  [Round.CONFERENCE_FINALS]: {
    name: 'Conference Finals',
    shortName: 'Conf Finals',
    description: 'Best of 7 series',
    matchupCount: 2,
    nextRound: Round.NBA_FINALS,
  },
  [Round.NBA_FINALS]: {
    name: 'NBA Finals',
    shortName: 'Finals',
    description: 'Championship series',
    matchupCount: 1,
    nextRound: null,
  },
};

// Matchup model
export interface Matchup {
  id: string;
  round: Round;
  position: number;
  homeTeam: Team | null;
  awayTeam: Team | null;
  homeScore?: number;
  awayScore?: number;
  winner?: Team | null;
  nextMatchupId?: string;
}

// Bracket model
export interface Bracket {
  id: string;
  name: string;
  year: number;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  matchups: Matchup[];
  champion: Team | null;
}

// User model
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  email?: string;
}

// Bracket Share model
export interface BracketShare {
  id: string;
  bracketId: string;
  shareUrl: string;
  createdAt: string;
  expiresAt?: string;
}

// Notification model (for UI)
export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  dismissable: boolean;
  timeout?: number;
}