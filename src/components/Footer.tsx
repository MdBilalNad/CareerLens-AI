import React from 'react';
import { APP_CONFIG, APP_NAME } from '../config/app';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 py-10 mt-20">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
          <div className="md:col-span-2">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {APP_NAME}
            </span>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-2 max-w-sm">
              Deterministic resume parsing, applicant tracking system scoring, and phased career roadmaps for students and early-career candidates.
            </p>
            <p className="text-neutral-400 dark:text-neutral-500 text-xs mt-2">
              Scoring engine version {APP_CONFIG.version}. Resumes are analyzed locally and can be deleted at any time.
            </p>
          </div>

          <div>
            <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider block mb-3">
              Application
            </span>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li>
                <button
                  onClick={() => navigate('/upload')}
                  className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  Upload Resume
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  Analysis Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/how-it-works')}
                  className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  How Scoring Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/settings')}
                  className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  Account and Data Settings
                </button>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider block mb-3">
              Legal and Privacy
            </span>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li>
                <button
                  onClick={() => navigate('/privacy')}
                  className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  Terms and Conditions
                </button>
              </li>
              <li>
                <span className="text-neutral-400 dark:text-neutral-500">
                  Contact: {APP_CONFIG.supportEmailPlaceholder}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 gap-2">
          <p>
            &copy; 2026 {APP_CONFIG.legalEntityPlaceholder}. All rights reserved.
          </p>
          <p>
            Scores are deterministic estimates and do not guarantee interview callbacks.
          </p>
        </div>
      </div>
    </footer>
  );
};
