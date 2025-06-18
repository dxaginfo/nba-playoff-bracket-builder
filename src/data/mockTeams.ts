import { Team } from '../types';

/**
 * Mock NBA team data for development and testing
 */
export const mockTeams: Team[] = [
  // Eastern Conference
  {
    id: 'eastern-1',
    name: 'Boston Celtics',
    abbreviation: 'BOS',
    conference: 'Eastern',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg',
    primaryColor: '#007A33',
    secondaryColor: '#FFFFFF',
    record: '64-18',
    seed: 1
  },
  {
    id: 'eastern-2',
    name: 'New York Knicks',
    abbreviation: 'NYK',
    conference: 'Eastern',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612752/global/L/logo.svg',
    primaryColor: '#006BB6',
    secondaryColor: '#F58426',
    record: '50-32',
    seed: 2
  },
  {
    id: 'eastern-3',
    name: 'Milwaukee Bucks',
    abbreviation: 'MIL',
    conference: 'Eastern',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg',
    primaryColor: '#00471B',
    secondaryColor: '#EEE1C6',
    record: '49-33',
    seed: 3
  },
  {
    id: 'eastern-4',
    name: 'Cleveland Cavaliers',
    abbreviation: 'CLE',
    conference: 'Eastern',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612739/global/L/logo.svg',
    primaryColor: '#860038',
    secondaryColor: '#FDBB30',
    record: '48-34',
    seed: 4
  },
  {
    id: 'eastern-5',
    name: 'Orlando Magic',
    abbreviation: 'ORL',
    conference: 'Eastern',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612753/global/L/logo.svg',
    primaryColor: '#0077C0',
    secondaryColor: '#C4CED4',
    record: '47-35',
    seed: 5
  },
  {
    id: 'eastern-6',
    name: 'Indiana Pacers',
    abbreviation: 'IND',
    conference: 'Eastern',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612754/global/L/logo.svg',
    primaryColor: '#002D62',
    secondaryColor: '#FDBB30',
    record: '47-35',
    seed: 6
  },
  {
    id: 'eastern-7',
    name: 'Philadelphia 76ers',
    abbreviation: 'PHI',
    conference: 'Eastern',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612755/global/L/logo.svg',
    primaryColor: '#006BB6',
    secondaryColor: '#ED174C',
    record: '47-35',
    seed: 7
  },
  {
    id: 'eastern-8',
    name: 'Miami Heat',
    abbreviation: 'MIA',
    conference: 'Eastern',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg',
    primaryColor: '#98002E',
    secondaryColor: '#F9A01B',
    record: '46-36',
    seed: 8
  },
  
  // Western Conference
  {
    id: 'western-1',
    name: 'Oklahoma City Thunder',
    abbreviation: 'OKC',
    conference: 'Western',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg',
    primaryColor: '#007AC1',
    secondaryColor: '#EF3B24',
    record: '57-25',
    seed: 1
  },
  {
    id: 'western-2',
    name: 'Denver Nuggets',
    abbreviation: 'DEN',
    conference: 'Western',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg',
    primaryColor: '#0E2240',
    secondaryColor: '#FEC524',
    record: '57-25',
    seed: 2
  },
  {
    id: 'western-3',
    name: 'Minnesota Timberwolves',
    abbreviation: 'MIN',
    conference: 'Western',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612750/global/L/logo.svg',
    primaryColor: '#0C2340',
    secondaryColor: '#236192',
    record: '56-26',
    seed: 3
  },
  {
    id: 'western-4',
    name: 'Los Angeles Clippers',
    abbreviation: 'LAC',
    conference: 'Western',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612746/global/L/logo.svg',
    primaryColor: '#C8102E',
    secondaryColor: '#1D428A',
    record: '51-31',
    seed: 4
  },
  {
    id: 'western-5',
    name: 'Dallas Mavericks',
    abbreviation: 'DAL',
    conference: 'Western',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612742/global/L/logo.svg',
    primaryColor: '#00538C',
    secondaryColor: '#B8C4CA',
    record: '50-32',
    seed: 5
  },
  {
    id: 'western-6',
    name: 'Phoenix Suns',
    abbreviation: 'PHX',
    conference: 'Western',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg',
    primaryColor: '#1D1160',
    secondaryColor: '#E56020',
    record: '49-33',
    seed: 6
  },
  {
    id: 'western-7',
    name: 'New Orleans Pelicans',
    abbreviation: 'NOP',
    conference: 'Western',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612740/global/L/logo.svg',
    primaryColor: '#0C2340',
    secondaryColor: '#C8102E',
    record: '49-33',
    seed: 7
  },
  {
    id: 'western-8',
    name: 'Los Angeles Lakers',
    abbreviation: 'LAL',
    conference: 'Western',
    logoUrl: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg',
    primaryColor: '#552583',
    secondaryColor: '#FDB927',
    record: '47-35',
    seed: 8
  },
];