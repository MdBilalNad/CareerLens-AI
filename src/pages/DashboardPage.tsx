import React, { useEffect, useState } from 'react';
import { ATSAnalysisResult } from '../types';
import { deleteAnalysis, getAnalyses } from '../services/storage';
import { useAuth } from '../context/AuthContext';
import { FileText, ArrowRight, Trash2, TrendingUp, Plus } from 'lucide-react';

interface DashboardPageProps {
  onSelectAnalysis: (analysis: ATSAnalysisResult) => void;
  navigate: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onSelectAnalysis,
  navigate,
}) => {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState<ATSAnalysisResult[]>([]);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = () => {
    const list = getAnalyses(user?.id);
    setAnalyses(list);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteAnalysis(id);
    loadData();
  };

  const handleOpen = (item: ATSAnalysisResult) => {
    onSelectAnalysis(item);
    navigate('/analysis');
  };

  return (
    <div className="py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Analysis Dashboard
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Review past resume evaluations, track score changes across edits, and manage stored documents.
          </p>
        </div>

        <button
          onClick={() => navigate('/upload')}
          className="btn-primary text-xs py-2 px-3 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Upload resume</span>
        </button>
      </div>

      {analyses.length === 0 ? (
        /* Honest empty state */
        <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-12 text-center rounded-sm space-y-3">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            No analyses yet. Upload a resume to get started.
          </p>
          <button
            onClick={() => navigate('/upload')}
            className="btn-primary text-xs py-2 px-4"
          >
            Upload your first resume
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Score progression summary across uploads */}
          {analyses.length > 1 && (
            <div className="border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 p-4 sm:p-5 rounded-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                <TrendingUp size={15} />
                <span>Score Progression Over Time</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-neutral-500 block text-[11px]">Latest Score</span>
                  <span className="text-lg font-bold tabular-nums text-neutral-900 dark:text-neutral-100">
                    {analyses[0].overallScore} / 100
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px]">First Upload Score</span>
                  <span className="text-lg font-bold tabular-nums text-neutral-900 dark:text-neutral-100">
                    {analyses[analyses.length - 1].overallScore} / 100
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px]">Net Change</span>
                  <span className="text-lg font-bold tabular-nums text-neutral-900 dark:text-neutral-100">
                    {analyses[0].overallScore - analyses[analyses.length - 1].overallScore >= 0 ? '+' : ''}
                    {analyses[0].overallScore - analyses[analyses.length - 1].overallScore} pts
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px]">Total Versions Audited</span>
                  <span className="text-lg font-bold tabular-nums text-neutral-900 dark:text-neutral-100">
                    {analyses.length}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Past analyses list */}
          <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-sm divide-y divide-neutral-200 dark:divide-neutral-800">
            <div className="p-4 bg-neutral-50/50 dark:bg-neutral-900/50 text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Saved Resume Analyses ({analyses.length})
            </div>

            <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {analyses.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpen(item)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <FileText size={18} className="text-neutral-400 mt-0.5 sm:mt-0 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                          {item.fileName}
                        </span>
                        <span className="text-[11px] text-neutral-400">
                          Engine {item.scoringVersion}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                        <span aria-hidden="true">&middot;</span>
                        <span>Top Match: {item.topJobMatches[0]?.roleTitle} ({item.topJobMatches[0]?.matchPercentage}%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-lg font-bold tabular-nums text-neutral-900 dark:text-neutral-100">
                        {item.overallScore}
                      </span>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                        score
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      aria-label={`Delete ${item.fileName}`}
                      className="p-1.5 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
                      title="Permanently delete this resume analysis"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="text-neutral-400 hidden sm:block">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
