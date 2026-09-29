import React from 'react';
import { UploadSection } from '../components/UploadSection';
import { ATSAnalysisResult } from '../types';

interface UploadPageProps {
  onAnalysisComplete: (result: ATSAnalysisResult) => void;
  navigate: (path: string) => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({ onAnalysisComplete, navigate }) => {
  const handleComplete = (result: ATSAnalysisResult) => {
    onAnalysisComplete(result);
    navigate('/analysis');
  };

  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 space-y-8">
      <div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mb-1">
          Step 01 &middot; Document Ingestion
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Upload your resume
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          PDF or Word document format. Parsing runs locally to extract text, identify sections, and evaluate ATS compatibility.
        </p>
      </div>

      <UploadSection onAnalysisComplete={handleComplete} />

      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 text-xs text-neutral-500 dark:text-neutral-400 space-y-2">
        <span className="font-semibold text-neutral-800 dark:text-neutral-200 block">
          Document guidelines for accurate ATS parsing:
        </span>
        <ul className="list-disc pl-5 space-y-1">
          <li>Use standard text-based files rather than scanned images or graphic designer templates.</li>
          <li>Maintain a clean single-column structure to prevent reading order scrambling.</li>
          <li>Ensure contact email and telephone number are in plain text in the header.</li>
        </ul>
      </div>
    </div>
  );
};
