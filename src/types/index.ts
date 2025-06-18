/**
 * Core types for the NBA Playoff Bracket Builder
 */

export type Conference = 'Eastern' | 'Western';

export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  conference: Conference;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  record?: string;
  seed?: number;
}

export interface Game {
  id: string;
  gameNumber: number;
  homeScore: number;
  awayScore: number;
  date: string;
  completed: boolean;
}

export interface Matchup {
  id: string;
  round: number;
  position: number;
  homeTeam: Team | null;
  awayTeam: Team | null;
  homeScore?: number;
  awayScore?: number;
  winner?: Team | null;
  games?: Game[];
  nextMatchupId?: string;
}

export interface Bracket {
  id: string;
  name: string;
  year: number;
  createdAt: string;
  updatedAt: string;
  ownerId?: string;
  isPublic: boolean;
  matchups: Matchup[];
  champion: Team | null;
}

export interface BracketTemplate {
  id: string;
  name: string;
  rounds: number;
  matchupsPerRound: number[];
}

export interface User {
  id: string;
  username: string;
  email?: string;
  avatarUrl?: string;
}

export enum Round {
  FIRST_ROUND = 1,
  CONFERENCE_SEMIFINALS = 2,
  CONFERENCE_FINALS = 3,
  NBA_FINALS = 4
}

export interface RoundInfo {
  id: Round;
  name: string;
  gamesRequired: number;
  matchupsCount: number;
}

export const ROUND_INFO: Record<Round, RoundInfo> = {
  [Round.FIRST_ROUND]: {
    id: Round.FIRST_ROUND,
    name: 'First Round',
    gamesRequired: 4,
    matchupsCount: 8
  },
  [Round.CONFERENCE_SEMIFINALS]: {
    id: Round.CONFERENCE_SEMIFINALS,
    name: 'Conference Semifinals',
    gamesRequired: 4,
    matchupsCount: 4
  },
  [Round.CONFERENCE_FINALS]: {
    id: Round.CONFERENCE_FINALS,
    name: 'Conference Finals',
    gamesRequired: 4,
    matchupsCount: 2
  },
  [Round.NBA_FINALS]: {
    id: Round.NBA_FINALS,
    name: 'NBA Finals',
    gamesRequired: 4,
    matchupsCount: 1
  }
};