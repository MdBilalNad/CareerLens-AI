import React, { useState } from 'react';
import { ATSAnalysisResult } from '../types';
import { CheckCircle2, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

interface ExtractedResumeViewerProps {
  analysis: ATSAnalysisResult;
}

export const ExtractedResumeViewer: React.FC<ExtractedResumeViewerProps> = ({ analysis }) => {
  const [copied, setCopied] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [showRaw, setShowRaw] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis.rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sectionsList = analysis.parsedSummary.sectionsFound || [];

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-sm divide-y divide-neutral-200 dark:divide-neutral-800">
      {/* Header */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-50/70 dark:bg-neutral-900/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Parsed Materials Audit
            </h3>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Inspect the exact text streams, contact fields, and technical vocabulary parsed from your document.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
            title="Copy extracted plain text"
          >
            {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>
        </div>
      </div>

      {/* Extracted Metadata Grid */}
      <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/80 rounded-xs space-y-1">
          <span className="text-neutral-400 dark:text-neutral-500 font-mono text-[10px] uppercase tracking-wider block">
            Candidate Name
          </span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-100 block truncate">
            {analysis.parsedSummary.name || 'Detected from header'}
          </span>
        </div>

        <div className="p-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/80 rounded-xs space-y-1">
          <span className="text-neutral-400 dark:text-neutral-500 font-mono text-[10px] uppercase tracking-wider block">
            Email Address
          </span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-100 block truncate">
            {analysis.parsedSummary.email || 'None detected'}
          </span>
        </div>

        <div className="p-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/80 rounded-xs space-y-1">
          <span className="text-neutral-400 dark:text-neutral-500 font-mono text-[10px] uppercase tracking-wider block">
            Telephone
          </span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-100 block truncate">
            {analysis.parsedSummary.phone || 'None detected'}
          </span>
        </div>

        <div className="p-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/80 rounded-xs space-y-1">
          <span className="text-neutral-400 dark:text-neutral-500 font-mono text-[10px] uppercase tracking-wider block">
            Online Profiles
          </span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-100 block truncate">
            {analysis.parsedSummary.links.length > 0
              ? `${analysis.parsedSummary.links.length} link(s) found`
              : 'None detected'}
          </span>
        </div>
      </div>

      {/* Identified Skills Inventory */}
      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
            Recognized Technical Vocabulary ({analysis.extractedSkills.length} skills)
          </span>
          <span className="text-[11px] text-neutral-400">
            Validated against taxonomy dictionary
          </span>
        </div>

        {analysis.extractedSkills.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {analysis.extractedSkills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-neutral-500">
            No standard technical skills matched. Check spelling or add a dedicated Skills section.
          </p>
        )}
      </div>

      {/* Detected Sections Checklist */}
      <div className="p-4 sm:p-5 space-y-3">
        <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 block">
          Recognized Section Anchors ({sectionsList.length})
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {['education', 'experience', 'projects', 'skills'].map((sec) => {
            const isFound = sectionsList.includes(sec);
            return (
              <div
                key={sec}
                className={`p-2.5 rounded-xs border flex items-center justify-between ${
                  isFound
                    ? 'border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/30 text-neutral-900 dark:text-neutral-100'
                    : 'border-neutral-200 dark:border-neutral-800 text-neutral-400'
                }`}
              >
                <span className="capitalize font-medium">{sec}</span>
                {isFound ? (
                  <CheckCircle2 size={14} className="text-neutral-900 dark:text-neutral-100" />
                ) : (
                  <span className="text-[10px] text-neutral-400 uppercase">Missing</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Raw Extracted Text Viewer Toggle */}
      <div className="p-4 sm:p-5">
        <button
          onClick={() => setShowRaw(!showRaw)}
          className="w-full flex items-center justify-between text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-50"
        >
          <span>
            {showRaw ? 'Hide full document stream' : 'View full extracted document text stream'}
          </span>
          {showRaw ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showRaw && (
          <div className="mt-3 p-3 bg-neutral-950 text-neutral-200 font-mono text-[11px] leading-relaxed rounded-xs max-h-80 overflow-y-auto border border-neutral-800 whitespace-pre-wrap select-all">
            {analysis.rawText}
          </div>
        )}
      </div>
    </div>
  );
};
