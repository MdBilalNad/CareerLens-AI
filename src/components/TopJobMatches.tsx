import React, { useState } from 'react';
import { JobMatch } from '../types';
import { ChevronRight, Info } from 'lucide-react';

interface TopJobMatchesProps {
  matches: JobMatch[];
  selectedRoleId: string;
  onSelectRole: (roleId: string) => void;
}

export const TopJobMatches: React.FC<TopJobMatchesProps> = ({
  matches,
  selectedRoleId,
  onSelectRole,
}) => {
  const [inspectingMatch, setInspectingMatch] = useState<string | null>(null);

  const toggleInputs = (roleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setInspectingMatch(inspectingMatch === roleId ? null : roleId);
  };

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-sm divide-y divide-neutral-200 dark:divide-neutral-800">
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-neutral-50/50 dark:bg-neutral-900/50">
        <div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Top 5 Role Matches
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Role profiles evaluated strictly against your skills, coursework, projects, and work history.
          </p>
        </div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          Ranked role archetypes, not active job openings
        </div>
      </div>

      <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {matches.map((match, index) => {
          const isSelected = match.roleId === selectedRoleId;
          const isInspecting = inspectingMatch === match.roleId;

          return (
            <div
              key={match.roleId}
              onClick={() => onSelectRole(match.roleId)}
              className={`p-4 sm:p-5 transition-colors cursor-pointer select-none ${
                isSelected
                  ? 'bg-blue-50/40 dark:bg-blue-950/20'
                  : 'hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3">
                  <span className="w-6 text-sm font-mono text-neutral-400 dark:text-neutral-500 tabular-nums shrink-0">
                    0{index + 1}.
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                        {match.roleTitle}
                      </span>
                      {isSelected && (
                        <span className="text-[11px] text-blue-700 dark:text-blue-400 font-medium">
                          Roadmap active
                        </span>
                      )}
                    </div>
                    {/* Two-sentence explanation */}
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                      {match.explanation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-9 sm:pl-0">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => toggleInputs(match.roleId, e)}
                      title="Inspect formula calculation inputs"
                      aria-label="Inspect formula calculation inputs"
                      className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                    >
                      <Info size={16} />
                    </button>
                    <div className="text-right">
                      <span className="text-lg font-bold tabular-nums text-neutral-900 dark:text-neutral-100">
                        {match.matchPercentage}%
                      </span>
                      <span className="block text-[10px] text-neutral-400 uppercase tracking-wider">
                        match
                      </span>
                    </div>
                  </div>

                  <div className="text-neutral-400">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </div>

              {/* Matched vs Missing Skills metadata */}
              <div className="mt-3 pl-9 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                <div>
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">Matched: </span>
                  {match.matchedSkills.length > 0
                    ? match.matchedSkills.slice(0, 5).join(', ')
                    : 'None yet'}
                </div>
                <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">|</span>
                <div>
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">Missing: </span>
                  {match.missingSkills.length > 0
                    ? match.missingSkills.slice(0, 4).join(', ')
                    : 'None, full coverage'}
                </div>
              </div>

              {/* Inspected formula inputs breakdown */}
              {isInspecting && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mt-4 ml-9 p-3 bg-neutral-100/70 dark:bg-neutral-800/80 rounded-xs border border-neutral-200 dark:border-neutral-700 text-xs space-y-2"
                >
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                    Deterministic Match Inputs for {match.roleTitle}:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    <div className="bg-white dark:bg-neutral-900 p-2 rounded-xs border border-neutral-200 dark:border-neutral-700">
                      <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">
                        Skill Overlap (40%)
                      </span>
                      <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100">
                        {match.scoreBreakdown.skillOverlapScore} / 100
                      </span>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 p-2 rounded-xs border border-neutral-200 dark:border-neutral-700">
                      <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">
                        Projects (25%)
                      </span>
                      <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100">
                        {match.scoreBreakdown.projectRelevanceScore} / 100
                      </span>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 p-2 rounded-xs border border-neutral-200 dark:border-neutral-700">
                      <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">
                        Education (15%)
                      </span>
                      <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100">
                        {match.scoreBreakdown.educationScore} / 100
                      </span>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 p-2 rounded-xs border border-neutral-200 dark:border-neutral-700">
                      <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">
                        Experience (15%)
                      </span>
                      <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100">
                        {match.scoreBreakdown.experienceLevelScore} / 100
                      </span>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 p-2 rounded-xs border border-neutral-200 dark:border-neutral-700">
                      <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">
                        Certifications (5%)
                      </span>
                      <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100">
                        {match.scoreBreakdown.certificationScore} / 100
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    Formula: (Skill x 0.40) + (Projects x 0.25) + (Education x 0.15) + (Experience x 0.15) + (Certifications x 0.05) = {match.matchPercentage}%.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
