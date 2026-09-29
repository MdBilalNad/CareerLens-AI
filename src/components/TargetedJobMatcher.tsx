import React, { useState } from 'react';
import { ParsedResume, TargetedJobAnalysis } from '../types';
import { matchResumeToJobDescription } from '../services/jobMatcher';
import { Target, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

interface TargetedJobMatcherProps {
  parsedResume: ParsedResume;
}

export const TargetedJobMatcher: React.FC<TargetedJobMatcherProps> = ({ parsedResume }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [targetTitle, setTargetTitle] = useState('');
  const [analysis, setAnalysis] = useState<TargetedJobAnalysis | null>(null);

  const handleMatch = () => {
    if (!jobDescription.trim() || jobDescription.trim().length < 50) return;
    const result = matchResumeToJobDescription(parsedResume, jobDescription, targetTitle || undefined);
    setAnalysis(result);
  };

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-sm divide-y divide-neutral-200 dark:divide-neutral-800">
      {/* Header */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-50/60 dark:bg-neutral-900/60">
        <div>
          <div className="flex items-center gap-2">
            <Target size={16} className="text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Targeted Job Description Matcher
            </h3>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Compare your resume against a specific target job posting. Identify missing skills and honest section placements without keyword stuffing.
          </p>
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 sm:p-5 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Target Job Title (e.g. Junior ML Engineer, Backend Developer)"
            value={targetTitle}
            onChange={(e) => setTargetTitle(e.target.value)}
            className="w-full p-2.5 text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 rounded-xs text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:border-neutral-900"
          />
          <div className="text-[11px] text-neutral-500 flex items-center">
            Paste the requirements and responsibilities section of any job posting.
          </div>
        </div>

        <textarea
          rows={5}
          placeholder="Paste job description text here (e.g., We are seeking a Junior Machine Learning Engineer proficient in Python, PyTorch, Docker, and REST APIs)..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full p-3 font-mono text-xs border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 rounded-xs text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:border-neutral-900"
        />

        <div className="flex justify-between items-center">
          <span className="text-xs text-neutral-400 font-mono">
            {jobDescription.length} characters
          </span>
          <button
            onClick={handleMatch}
            disabled={jobDescription.length < 50}
            className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5 disabled:opacity-50"
          >
            <span>Analyze Tailoring Score</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Results view */}
      {analysis && (
        <div className="p-4 sm:p-5 space-y-6">
          {/* Tailoring Score Bar */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700/80 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                Tailoring Alignment
              </span>
              <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {analysis.jobTitle}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-32 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-xs overflow-hidden">
                <div
                  className="h-full bg-blue-600 dark:bg-blue-400"
                  style={{ width: `${analysis.tailoringScore}%` }}
                />
              </div>
              <span className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100 tabular-nums">
                {analysis.tailoringScore}%
              </span>
            </div>
          </div>

          {/* Matched Keywords */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 block">
              Matched Keywords in Your Resume ({analysis.matchedKeywords.length})
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {analysis.matchedKeywords.map((kw) => (
                <span
                  key={kw}
                  className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xs text-neutral-800 dark:text-neutral-200 flex items-center gap-1 font-medium"
                >
                  <CheckCircle2 size={12} className="text-neutral-900 dark:text-neutral-100" />
                  <span>{kw}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Missing Keywords with Honest Section Placements */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 block">
              Missing Job Keywords and Honest Placements ({analysis.missingKeywords.length})
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {analysis.missingKeywords.map((item) => (
                <div
                  key={item.keyword}
                  className="p-3 bg-neutral-50/70 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/80 rounded-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {item.keyword}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">
                      Recommended: {item.recommendedSection}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                    {item.contextTip}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Anti-Keyword Stuffing Warning */}
          {analysis.unsupportedKeywordsWarning.length > 0 && (
            <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-300 dark:border-neutral-700 rounded-xs text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-neutral-900 dark:text-neutral-100">
                <AlertTriangle size={14} className="text-neutral-600 dark:text-neutral-400" />
                <span>Anti-Keyword Stuffing Advisory</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-[11px]">
                The following skills appear in your skills list but are not mentioned inside any project or experience bullet point: <strong>{analysis.unsupportedKeywordsWarning.join(', ')}</strong>. Technical screeners flag skills listed without evidence. Add context describing how you used each tool on an actual project.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
