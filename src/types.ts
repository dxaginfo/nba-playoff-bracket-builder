// Team related types
export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  conference: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  record: string;
  seed?: number;
}

// Playoff rounds
export enum Round {
  FIRST_ROUND = 0,
  CONFERENCE_SEMIFINALS = 1,
  CONFERENCE_FINALS = 2,
  NBA_FINALS = 3,
}

// Information about each round
export interface RoundInfo {
  name: string;
  shortName: string;
  matchupCount: number;
  nextRound: Round | null;
}

// Round information lookup
export const ROUND_INFO: Record<Round, RoundInfo> = {
  [Round.FIRST_ROUND]: {
    name: 'First Round',
    shortName: '1st',
    matchupCount: 8,
    nextRound: Round.CONFERENCE_SEMIFINALS,
  },
  [Round.CONFERENCE_SEMIFINALS]: {
    name: 'Conference Semifinals',
    shortName: 'Semis',
    matchupCount: 4,
    nextRound: Round.CONFERENCE_FINALS,
  },
  [Round.CONFERENCE_FINALS]: {
    name: 'Conference Finals',
    shortName: 'Conf Finals',
    matchupCount: 2,
    nextRound: Round.NBA_FINALS,
  },
  [Round.NBA_FINALS]: {
    name: 'NBA Finals',
    shortName: 'Finals',
    matchupCount: 1,
    nextRound: null,
  },
};

// Matchup between two teams
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

// Entire playoff bracket
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