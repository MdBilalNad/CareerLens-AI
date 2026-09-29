import React, { useState } from 'react';
import { ATSAnalysisResult } from '../types';
import { AnimatedScore } from '../components/AnimatedScore';
import { ScoreBreakdownTable } from '../components/ScoreBreakdownTable';
import { StrengthsAndWeaknesses } from '../components/StrengthsAndWeaknesses';
import { TopJobMatches } from '../components/TopJobMatches';
import { CareerRoadmapView } from '../components/CareerRoadmapView';
import { ExtractedResumeViewer } from '../components/ExtractedResumeViewer';
import { FileText, ArrowLeft, RefreshCw } from 'lucide-react';

interface AnalysisPageProps {
  analysis: ATSAnalysisResult | null;
  navigate: (path: string) => void;
}

export const AnalysisPage: React.FC<AnalysisPageProps> = ({ analysis, navigate }) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(
    analysis?.topJobMatches[0]?.roleId || 'frontend-engineer'
  );
  const [activeTab, setActiveTab] = useState<
    'all' | 'score' | 'evidence' | 'matches' | 'roadmap' | 'materials'
  >('all');

  if (!analysis) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          No analysis active
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Upload a resume or select one from your dashboard history to view scoring metrics and career roadmaps.
        </p>
        <button
          onClick={() => navigate('/upload')}
          className="btn-primary text-xs py-2 px-4"
        >
          Upload resume
        </button>
      </div>
    );
  }

  const selectedMatch =
    analysis.topJobMatches.find((m) => m.roleId === selectedRoleId) ||
    analysis.topJobMatches[0];

  return (
    <div className="py-8 sm:py-12 space-y-8">
      {/* Top Header and Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1.5 mb-2 transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-blue-600 dark:text-blue-500" />
            <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              {analysis.fileName}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            <span>Uploaded {new Date(analysis.uploadedAt).toLocaleDateString()}</span>
            <span aria-hidden="true">&middot;</span>
            <span className="tabular-nums font-mono">{analysis.wordCount} words</span>
            <span aria-hidden="true">&middot;</span>
            <span className="tabular-nums font-mono">{analysis.lineCount} lines</span>
            <span aria-hidden="true">&middot;</span>
            <span>Scoring Engine {analysis.scoringVersion}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/upload')}
            className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
          >
            <RefreshCw size={13} />
            <span>Re-upload to compare</span>
          </button>
        </div>
      </div>

      {/* Sticky Section Navigation */}
      <div className="sticky top-14 z-30 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md py-2 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xs transition-colors whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 font-semibold shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            Full Report
          </button>
          <button
            onClick={() => setActiveTab('score')}
            className={`px-3 py-1.5 rounded-xs transition-colors whitespace-nowrap ${
              activeTab === 'score'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 font-semibold shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            ATS Score & Breakdown
          </button>
          <button
            onClick={() => setActiveTab('evidence')}
            className={`px-3 py-1.5 rounded-xs transition-colors whitespace-nowrap ${
              activeTab === 'evidence'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 font-semibold shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            Strengths & Weaknesses
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`px-3 py-1.5 rounded-xs transition-colors whitespace-nowrap ${
              activeTab === 'matches'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 font-semibold shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            Role Matches
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-3 py-1.5 rounded-xs transition-colors whitespace-nowrap ${
              activeTab === 'roadmap'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 font-semibold shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            Career Roadmap
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-3 py-1.5 rounded-xs transition-colors whitespace-nowrap ${
              activeTab === 'materials'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 font-semibold shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            Parsed Materials Audit
          </button>
        </div>
      </div>

      {/* Report Sections in exact core flow order */}
      <div className="space-y-12">
        {/* Step 3: ATS Score and Category Breakdown */}
        {(activeTab === 'all' || activeTab === 'score') && (
          <section id="section-score" className="space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-xs text-neutral-400">Step 03</span>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                ATS Compatibility and Category Audit
              </h2>
            </div>

            <AnimatedScore
              score={analysis.overallScore}
              scoringVersion={analysis.scoringVersion}
            />

            <ScoreBreakdownTable categories={analysis.categoryScores} />
          </section>
        )}

        {/* Step 4: Strengths and Weaknesses */}
        {(activeTab === 'all' || activeTab === 'evidence') && (
          <section id="section-evidence" className="space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-xs text-neutral-400">Step 04</span>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                Concrete Line-by-Line Evidence
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Tied directly to lines or sections extracted from your submitted document.
              </p>
            </div>

            <StrengthsAndWeaknesses
              strengths={analysis.strengths}
              weaknesses={analysis.weaknesses}
            />
          </section>
        )}

        {/* Step 5: Top 5 Job Matches */}
        {(activeTab === 'all' || activeTab === 'matches') && (
          <section id="section-matches" className="space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-xs text-neutral-400">Step 05</span>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                Top 5 Role Matches and Skill Coverage
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Click any match to inspect calculation inputs and switch the preparation roadmap below.
              </p>
            </div>

            <TopJobMatches
              matches={analysis.topJobMatches}
              selectedRoleId={selectedRoleId}
              onSelectRole={(id) => setSelectedRoleId(id)}
            />
          </section>
        )}

        {/* Step 6: Animated Career Roadmap */}
        {(activeTab === 'all' || activeTab === 'roadmap') && selectedMatch && (
          <section id="section-roadmap" className="space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-xs text-neutral-400">Step 06</span>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                Animated Career Roadmap for {selectedMatch.roleTitle}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Phased preparation schedule personalized from your current missing skills and score gaps.
              </p>
            </div>

            <CareerRoadmapView roadmap={selectedMatch.roadmap} />
          </section>
        )}

        {/* Parsed Materials Audit Section */}
        {(activeTab === 'all' || activeTab === 'materials') && (
          <section id="section-materials" className="space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-xs text-neutral-400">Audit</span>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                Document Parsing Transparency
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Verify exactly what our parser extracted from your file, including sections, contacts, and technical skills.
              </p>
            </div>

            <ExtractedResumeViewer analysis={analysis} />
          </section>
        )}
      </div>
    </div>
  );
};
