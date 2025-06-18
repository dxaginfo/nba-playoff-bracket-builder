# NBA Playoff Bracket Builder

A modern, interactive web application that enables basketball fans, analysts, and enthusiasts to create, visualize, and share NBA playoff brackets with real-time updates and historical data integration.

## Overview

The NBA Playoff Bracket Builder offers an intuitive interface for users to:

- Create and customize playoff brackets for current or historical seasons
- Simulate playoff scenarios with drag-and-drop team selection
- Share brackets via unique URLs or social media
- Track real-time updates during active playoff seasons
- Compare predictions with actual results

## Features

### Core Functionality

- **Interactive Bracket Builder**: Drag-and-drop interface to create and edit playoff brackets
- **Team Data Integration**: Access to current and historical NBA team data
- **Customization Options**: Add team stats, player highlights, and personal notes
- **Responsive Design**: Optimized for both desktop and mobile experiences
- **Sharing Capabilities**: Generate unique URLs and social media sharing cards

### Technical Highlights

- Built with React and TypeScript for type safety and maintainability
- Utilizes modern React patterns including hooks and context API
- State management with Redux for predictable state updates
- Styled with Tailwind CSS for responsive, utility-first styling
- SVG-based bracket visualization for sharp, scalable graphics

## Architecture

The application follows a clean, component-based architecture:

```
src/
├── components/         # Reusable UI components
│   ├── Bracket/        # Bracket visualization components
│   ├── Teams/          # Team selection and display components
│   ├── Sharing/        # URL generation and social sharing
│   └── common/         # Buttons, inputs, and other UI elements
├── hooks/              # Custom React hooks
├── store/              # Redux store configuration
│   ├── slices/         # Feature-based Redux slices
│   └── selectors/      # Memoized selectors
├── services/           # API and external service integration
├── types/              # TypeScript type definitions
├── utils/              # Helper functions and utilities
└── pages/              # Page components for routing
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

### Phase 1: Core Functionality (Current)
- Implement basic bracket structure and visualization
- Create team selection and placement functionality
- Build bracket state management

### Phase 2: Enhancements
- Add historical data for past playoffs
- Implement sharing functionality
- Create user accounts for saving brackets

### Phase 3: Advanced Features
- Real-time updates during live playoffs
- Statistics integration
- Mobile app version

## License

MIT

## Contact

For questions or support, please open an issue on the GitHub repository.