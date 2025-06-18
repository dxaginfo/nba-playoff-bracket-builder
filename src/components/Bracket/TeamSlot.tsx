import React, { useState } from 'react';
import { Team } from '../../types';
import { useAppSelector } from '../../store-index';
import TeamSelector from './TeamSelector';

interface TeamSlotProps {
  team: Team | null;
  score?: number;
  isWinner?: boolean;
  onTeamSelect: (team: Team) => void;
  onWinnerSelect: (team: Team) => void;
  editable: boolean;
  position: 'home' | 'away';
}

const TeamSlot: React.FC<TeamSlotProps> = ({
  team,
  score,
  isWinner,
  onTeamSelect,
  onWinnerSelect,
  editable,
  position,
}) => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const { teams } = useAppSelector((state) => state.teams);

  const handleClick = () => {
    if (!editable) return;

    if (!team) {
      setSelectorOpen(true);
    } else {
      onWinnerSelect(team);
    }
  };

  const handleTeamSelect = (selectedTeam: Team) => {
    onTeamSelect(selectedTeam);
    setSelectorOpen(false);
  };

  const handleSelectorClose = () => {
    setSelectorOpen(false);
  };

  const getTeamStyle = () => {
    if (!team) return {};
    
    return {
      borderLeft: `4px solid ${team.primaryColor}`,
      background: isWinner 
        ? `linear-gradient(to right, ${team.primaryColor}15, transparent)`
        : undefined
    };
  };

  return (
    <div className="relative">
      <div
        className={`team-slot flex items-center p-2 rounded-md transition cursor-pointer ${
          editable ? 'hover:bg-gray-50 dark:hover:bg-gray-700/50' : ''
        } ${isWinner ? 'font-medium' : ''}`}
        onClick={handleClick}
        style={getTeamStyle()}
      >
        {team ? (
          <>
            <div className="flex-shrink-0 w-8 h-8 mr-2">
              <img
                src={team.logoUrl}
                alt={`${team.name} logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm truncate">{team.name}</p>
                <div className="flex items-center">
                  {score !== undefined && score > 0 && (
                    <span className="text-sm font-semibold ml-1">{score}</span>
                  )}
                  {isWinner && (
                    <svg
                      className="w-4 h-4 text-green-500 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {team.seed && `#${team.seed} Seed`} • {team.record}
              </p>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between w-full text-gray-400 dark:text-gray-500">
            <span className="text-sm">{position === 'home' ? 'Home Team' : 'Away Team'}</span>
            {editable && (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            )}
          </div>
        )}
      </div>

      {selectorOpen && (
        <TeamSelector
          teams={teams.filter(t => 
            // Filter by conference based on position
            (position === 'home' && t.conference === 'Eastern') || 
            (position === 'away' && t.conference === 'Western')
          )}
          onSelect={handleTeamSelect}
          onClose={handleSelectorClose}
        />
      )}
    </div>
  );
};

export default TeamSlot;