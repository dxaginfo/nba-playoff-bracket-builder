# NBA Playoff Bracket Builder

A modern, interactive web application that enables basketball fans, analysts, and enthusiasts to create, visualize, and share NBA playoff brackets with real-time updates and historical data integration.

## Overview

The NBA Playoff Bracket Builder offers an intuitive interface for users to:

- Create and customize playoff brackets for current or historical seasons
- Simulate playoff scenarios with team selection and advancement
- Track series scores and game-by-game results
- Save multiple brackets and compare predictions
- Share brackets via unique URLs or social media
- Access historical playoff data and statistics

## Features

### Core Functionality

- **Interactive Bracket Builder**: Easy-to-use interface to create and edit playoff brackets
- **Team Selection**: Select teams by conference with current season records and seeding
- **Series Management**: Track series scores (best-of-7) with game-by-game results
- **Bracket Progression**: Advance winning teams through each round
- **Championship Prediction**: Select the ultimate NBA champion
- **Responsive Design**: Optimized for both desktop and mobile experiences
- **Dashboard View**: Manage and track all your brackets in one place

### Technical Highlights

- Built with React and TypeScript for type safety and maintainability
- State management with Redux Toolkit for predictable state updates
- Styled with Tailwind CSS for responsive, utility-first styling
- Dark mode support for comfortable viewing
- Clean component architecture with modular design

## Latest Updates (June 2025)

- Added Dashboard component for improved bracket management
- Implemented series score tracking with visual indicators
- Enhanced team selection interface with conference filtering
- Added dark mode support throughout the application
- Improved bracket visualization with consistent spacing between rounds
- Added responsive design optimizations for mobile devices

## Architecture

The application follows a clean, component-based architecture:

```
src/
├── components/       # Reusable UI components
│   ├── Bracket/      # Bracket visualization components
│   ├── Teams/        # Team selection and display components
│   └── common/       # Buttons, inputs, and other UI elements
├── hooks/            # Custom React hooks
├── store/            # Redux store configuration
│   ├── slices/       # Feature-based Redux slices
│   └── selectors/    # Memoized selectors
├── services/         # API and external service integration
├── types/            # TypeScript type definitions
├── utils/            # Helper functions and utilities
└── pages/            # Page components for routing
```

## Data Model

The application uses the following core data structures:

```typescript
// Core data structures
interface Team {
  id: string;
  name: string;
  abbreviation: string;
  conference: 'Eastern' | 'Western';
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  record?: string;
  seed?: number;
}

interface Matchup {
  id: string;
  round: number;
  position: number;
  homeTeam: Team | null;
  awayTeam: Team | null;
  homeScore?: number;
  awayScore?: number;
  winner?: Team | null;
  games?: Game[];
}

interface Bracket {
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
```

## Components

### Key Components

- **BracketBuilder**: Main component for creating and editing brackets
- **MatchupCard**: Displays and manages individual playoff matchups
- **TeamSelector**: Interface for selecting teams by conference
- **RoundColumn**: Organizes matchups by playoff round
- **Dashboard**: Overview of all brackets with creation and management tools
- **BracketList**: Searchable, sortable list of all brackets

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dxaginfo/nba-playoff-bracket-builder.git
   cd nba-playoff-bracket-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Development Roadmap

### Phase 1: Core Functionality (Completed)
- Implement basic bracket structure and visualization
- Create team selection and placement functionality
- Build bracket state management
- Add series score tracking

### Phase 2: Enhancements (Current)
- Dashboard for bracket management
- Add historical data for past playoffs
- Implement sharing functionality
- Support for different seasons

### Phase 3: Advanced Features (Planned)
- User accounts for saving brackets
- Real-time updates during live playoffs
- Statistics integration
- Mobile app version

## License

MIT

## Contact

For questions or support, please open an issue on the GitHub repository.