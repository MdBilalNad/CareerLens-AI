import React, { useState } from 'react';
import { CategoryScore } from '../types';
import { ChevronDown, ChevronUp, Check, AlertCircle } from 'lucide-react';

interface ScoreBreakdownTableProps {
  categories: CategoryScore[];
}

export const ScoreBreakdownTable: React.FC<ScoreBreakdownTableProps> = ({ categories }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (name: string) => {
    setExpandedCategory(expandedCategory === name ? null : name);
  };

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-sm divide-y divide-neutral-200 dark:divide-neutral-800">
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-neutral-50/50 dark:bg-neutral-900/50">
        <div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Category Breakdown and Scoring Audit
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Every category shows what was checked and why points were deducted.
          </p>
        </div>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {categories.length} weighted categories totaling 100%
        </span>
      </div>

      <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {categories.map((category) => {
          const isExpanded = expandedCategory === category.name;
          const scoreColor =
            category.score >= 80
              ? 'text-neutral-900 dark:text-neutral-100'
              : category.score >= 60
              ? 'text-neutral-800 dark:text-neutral-200'
              : 'text-neutral-700 dark:text-neutral-300';

          return (
            <div key={category.name} className="p-4 sm:p-5">
              <div
                onClick={() => toggleCategory(category.name)}
                className="flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm text-neutral-900 dark:text-neutral-100">
                      {category.displayName}
                    </span>
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">
                      Weight: {category.weight}%
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1">
                    {category.summary}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {/* Progress bar and numeric score */}
                  <div className="hidden sm:flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-xs overflow-hidden">
                      <div
                        className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-200"
                        style={{ width: `${category.score}%` }}
                      />
                    </div>
                    <span className={`text-sm font-semibold tabular-nums ${scoreColor}`}>
                      {category.score} / 100
                    </span>
                  </div>

                  <span className="sm:hidden text-sm font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">
                    {category.score}
                  </span>

                  <button
                    aria-label={`Toggle details for ${category.displayName}`}
                    className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-4 text-xs">
                  {/* Deductions section */}
                  {category.deductions.length > 0 ? (
                    <div>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200 block mb-2">
                        Why points were lost:
                      </span>
                      <ul className="space-y-2">
                        {category.deductions.map((deduction, idx) => (
                          <li
                            key={idx}
                            className="p-3 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 rounded-xs space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                                <AlertCircle size={14} className="text-neutral-500" />
                                {deduction.reason}
                              </span>
                              <span className="text-neutral-600 dark:text-neutral-400 font-mono tabular-nums">
                                -{deduction.pointsLost} pts
                              </span>
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 pl-5">
                              Recommendation: {deduction.recommendation}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 rounded-xs text-neutral-700 dark:text-neutral-300">
                      No points deducted in this category. All standard verification checks passed.
                    </div>
                  )}

                  {/* Audit checks list */}
                  <div>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200 block mb-2">
                      Verification checks performed:
                    </span>
                    <ul className="space-y-1.5 divide-y divide-neutral-100 dark:divide-neutral-800">
                      {category.checks.map((check) => (
                        <li
                          key={check.id}
                          className="pt-1.5 flex items-start gap-2 text-neutral-600 dark:text-neutral-400"
                        >
                          <span className="mt-0.5 shrink-0">
                            {check.passed ? (
                              <Check size={14} className="text-neutral-900 dark:text-neutral-100" />
                            ) : (
                              <span className="w-3.5 h-3.5 inline-flex items-center justify-center font-bold text-neutral-400">
                                x
                              </span>
                            )}
                          </span>
                          <div>
                            <span className="font-medium text-neutral-900 dark:text-neutral-200 mr-2">
                              {check.label}:
                            </span>
                            <span>{check.details}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
