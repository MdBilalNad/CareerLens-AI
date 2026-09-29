import React from 'react';
import { ResumeStrength, ResumeWeakness } from '../types';

interface StrengthsAndWeaknessesProps {
  strengths: ResumeStrength[];
  weaknesses: ResumeWeakness[];
}

export const StrengthsAndWeaknesses: React.FC<StrengthsAndWeaknessesProps> = ({
  strengths,
  weaknesses,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Strengths column */}
      <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-sm p-5">
        <div className="mb-4 pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Validated Strengths
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Concrete evidence from your resume that matches recruiter criteria.
          </p>
        </div>

        {strengths.length > 0 ? (
          <div className="space-y-4">
            {strengths.map((item) => (
              <div
                key={item.id}
                className="border-l-2 border-neutral-800 dark:border-neutral-200 pl-3 py-1 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {item.title}
                  </span>
                  <span className="text-neutral-400 dark:text-neutral-500">
                    Section: {item.section}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  {item.description}
                </p>
                {item.resumeQuote && (
                  <div className="bg-neutral-50 dark:bg-neutral-800/60 p-2.5 rounded-xs border border-neutral-200 dark:border-neutral-800 font-mono text-[11px] text-neutral-800 dark:text-neutral-300">
                    &quot;{item.resumeQuote}&quot;
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-neutral-500 py-4">
            No distinctive structural strengths identified. Review the recommendations below to build competitive resume lines.
          </p>
        )}
      </div>

      {/* Weaknesses column */}
      <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-sm p-5">
        <div className="mb-4 pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Identified Gaps and Weaknesses
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Lines or sections that trigger ATS penalties or weaken screening odds.
          </p>
        </div>

        {weaknesses.length > 0 ? (
          <div className="space-y-4">
            {weaknesses.map((item) => (
              <div
                key={item.id}
                className="border-l-2 border-neutral-400 dark:border-neutral-600 pl-3 py-1 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {item.title}
                  </span>
                  <span className="text-neutral-400 dark:text-neutral-500">
                    Section: {item.section}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  {item.description}
                </p>
                {item.resumeQuote && (
                  <div className="bg-neutral-50 dark:bg-neutral-800/60 p-2.5 rounded-xs border border-neutral-200 dark:border-neutral-800 font-mono text-[11px] text-neutral-800 dark:text-neutral-300">
                    Current text: &quot;{item.resumeQuote}&quot;
                  </div>
                )}
                <div className="text-xs bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 p-2.5 rounded-xs text-neutral-800 dark:text-neutral-200">
                  <span className="font-medium text-blue-900 dark:text-blue-300 block mb-0.5">
                    Recommended fix:
                  </span>
                  {item.recommendedFix}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-neutral-500 py-4">
            No critical structural flaws detected. Your document maintains clean ATS compliance.
          </p>
        )}
      </div>
    </div>
  );
};
