import React, { useState } from 'react';
import { ArrowRight, Check, FileText, ChevronRight } from 'lucide-react';
import { APP_CONFIG, APP_NAME } from '../config/app';

interface LandingPageProps {
  navigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ navigate }) => {
  const [activeDemoCategory, setActiveDemoCategory] = useState<number>(0);

  const demoCategories = [
    {
      name: 'Quantified Impact',
      score: 92,
      quote: 'Reduced initial page bundle size by 34% by refactoring monolithic imports',
      insight: 'Paired action verb with measured latency and size delta.',
    },
    {
      name: 'Keyword Coverage',
      score: 88,
      quote: 'TypeScript, React, Node.js, PostgreSQL, Docker, REST APIs, Git',
      insight: 'Matches 7 of 7 required tools for junior full-stack roles.',
    },
    {
      name: 'Formatting Flow',
      score: 95,
      quote: 'Linear single-column reading order with verified phone & email',
      insight: 'Standard ATS parser extraction verified with zero corrupted glyphs.',
    },
  ];

  return (
    <div className="space-y-24 py-10 sm:py-16">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/80 px-2.5 py-1 rounded-xs border border-neutral-200 dark:border-neutral-700/80">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span>Deterministic Scoring Engine {APP_CONFIG.version}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.12]">
            Upload your resume. See your ATS score, your gaps, and the roles you fit.
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
            A deterministic resume analyzer for students and early-career job seekers. Receive an explainable score out of 100, verified strengths and weaknesses tied to your actual resume lines, and an animated step-by-step preparation roadmap.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => navigate('/upload')}
              className="btn-primary py-2.5 px-5 text-sm flex items-center gap-2"
            >
              <span>Analyze your resume</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/how-it-works')}
              className="btn-secondary py-2.5 px-5 text-sm"
            >
              How scoring works
            </button>
          </div>

          <div className="pt-2 text-xs text-neutral-500 dark:text-neutral-400 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Private local parsing</span>
            <span aria-hidden="true">&middot;</span>
            <span>PDF and DOCX formats</span>
            <span aria-hidden="true">&middot;</span>
            <span>No account required to test</span>
          </div>
        </div>

        {/* Live Interactive Preview Card */}
        <div className="lg:col-span-5">
          <div className="surface-card p-5 sm:p-6 space-y-5 relative">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 text-xs">
              <div className="flex items-center gap-2">
                <FileText size={15} className="text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Alex_Chen_Resume.pdf
                </span>
              </div>
              <span className="font-mono text-neutral-400 text-[11px]">88 / 100 ATS</span>
            </div>

            {/* Mini Score Gauge & Snapshot */}
            <div className="flex items-center gap-4 bg-neutral-50 dark:bg-neutral-800/40 p-3 rounded-xs border border-neutral-200/80 dark:border-neutral-700/80">
              <div className="w-14 h-14 rounded-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 flex flex-col items-center justify-center font-mono">
                <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tabular-nums">
                  88
                </span>
                <span className="text-[8px] text-neutral-400 uppercase">Score</span>
              </div>
              <div className="text-xs">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 block">
                  Top Match: Software Engineer (Junior)
                </span>
                <span className="text-neutral-500 dark:text-neutral-400 text-[11px] block mt-0.5">
                  84% match &middot; 3 missing skills &middot; 8-week roadmap
                </span>
              </div>
            </div>

            {/* Interactive demo tabs */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                Sample Audit Highlights:
              </span>
              <div className="grid grid-cols-3 gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xs text-[11px]">
                {demoCategories.map((cat, idx) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveDemoCategory(idx)}
                    className={`py-1 px-1.5 text-center truncate rounded-xs transition-colors ${
                      activeDemoCategory === idx
                        ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-semibold shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className="p-3 bg-neutral-50/80 dark:bg-neutral-800/50 rounded-xs border border-neutral-200/60 dark:border-neutral-700/60 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {demoCategories[activeDemoCategory].name}
                  </span>
                  <span className="font-mono text-neutral-500 tabular-nums font-semibold">
                    {demoCategories[activeDemoCategory].score}%
                  </span>
                </div>
                <div className="font-mono text-[10px] text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 p-2 rounded-xs border border-neutral-200 dark:border-neutral-800">
                  &quot;{demoCategories[activeDemoCategory].quote}&quot;
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  {demoCategories[activeDemoCategory].insight}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/upload')}
              className="w-full btn-secondary text-xs py-2 flex items-center justify-center gap-1.5 font-medium"
            >
              <span>Audit your own resume</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* How it works: 4 steps */}
      <section className="space-y-8 border-t border-neutral-200 dark:border-neutral-800 pt-16">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            How it works in four steps
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Deterministic analysis without opaque black-box scoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="surface-card p-5 space-y-3">
            <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 block">
              01. Upload
            </span>
            <h3 className="font-semibold text-base text-neutral-900 dark:text-neutral-100">
              Document Parsing
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Upload your PDF or DOCX resume. The parser extracts text streams, detects sections, and validates contact information.
            </p>
          </div>

          <div className="surface-card p-5 space-y-3">
            <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 block">
              02. Audit
            </span>
            <h3 className="font-semibold text-base text-neutral-900 dark:text-neutral-100">
              ATS Score & Breakdown
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Review your overall score out of 100 with an itemized point audit across formatting, keywords, sections, and quantified impact.
            </p>
          </div>

          <div className="surface-card p-5 space-y-3">
            <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 block">
              03. Line Evidence
            </span>
            <h3 className="font-semibold text-base text-neutral-900 dark:text-neutral-100">
              Strengths & Weaknesses
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Inspect concrete findings tied directly to lines in your resume, including passive phrasing alerts and specific recommended rewrites.
            </p>
          </div>

          <div className="surface-card p-5 space-y-3">
            <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 block">
              04. Prepare
            </span>
            <h3 className="font-semibold text-base text-neutral-900 dark:text-neutral-100">
              Roadmap & Role Matches
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              See your top 5 matching role archetypes and follow an animated, phased preparation plan tailored to your exact missing skills.
            </p>
          </div>
        </div>
      </section>

      {/* What the score is based on */}
      <section className="space-y-6 border-t border-neutral-200 dark:border-neutral-800 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              What the ATS score is based on
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Five weighted categories modeled after standard applicant tracking systems.
            </p>
          </div>
          <button
            onClick={() => navigate('/how-it-works')}
            className="text-xs text-neutral-700 dark:text-neutral-300 underline underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-100 font-medium"
          >
            Read the full scoring specification
          </button>
        </div>

        <div className="surface-card divide-y divide-neutral-200 dark:divide-neutral-800">
          <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                  Formatting and Parseability
                </span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500">20% weight</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                Linear single-column reading flow, contact parsing (email, phone, links), and clean text stream extraction.
              </p>
            </div>
            <span className="font-mono text-xs text-neutral-500 shrink-0 font-semibold">20 pts</span>
          </div>

          <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                  Keyword Coverage
                </span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500">25% weight</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                Verified industry skills, framework mentions, developer tooling, and decisive action verb frequency.
              </p>
            </div>
            <span className="font-mono text-xs text-neutral-500 shrink-0 font-semibold">25 pts</span>
          </div>

          <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                  Section Completeness
                </span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500">20% weight</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                Presence of standard recognized section headings: Education, Experience, Projects, and Skills.
              </p>
            </div>
            <span className="font-mono text-xs text-neutral-500 shrink-0 font-semibold">20 pts</span>
          </div>

          <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                  Quantified Impact
                </span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500">20% weight</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                Numerical metrics in bullet points: percentages, performance increases, latency reductions, and user scale.
              </p>
            </div>
            <span className="font-mono text-xs text-neutral-500 shrink-0 font-semibold">20 pts</span>
          </div>

          <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                  Length and Structure
                </span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500">15% weight</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                Calibrated word count (350 to 750 words for early career), bullet length discipline, and vertical line pacing.
              </p>
            </div>
            <span className="font-mono text-xs text-neutral-500 shrink-0 font-semibold">15 pts</span>
          </div>
        </div>
      </section>

      {/* Honest Commitment */}
      <section className="surface-card p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Our standards of honesty
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-600 dark:text-neutral-400">
          <div className="space-y-1.5">
            <span className="font-medium text-neutral-900 dark:text-neutral-200 block flex items-center gap-1.5">
              <Check size={14} className="text-blue-600 dark:text-blue-400" />
              Role archetypes, not fake jobs
            </span>
            <p>
              We evaluate matches against concrete industry role profiles. We never display fake job openings or invent hiring metrics.
            </p>
          </div>
          <div className="space-y-1.5">
            <span className="font-medium text-neutral-900 dark:text-neutral-200 block flex items-center gap-1.5">
              <Check size={14} className="text-blue-600 dark:text-blue-400" />
              Transparent mathematical formulas
            </span>
            <p>
              Match percentages and ATS scores are computed through published formulas with explicit point deductions shown in full.
            </p>
          </div>
          <div className="space-y-1.5">
            <span className="font-medium text-neutral-900 dark:text-neutral-200 block flex items-center gap-1.5">
              <Check size={14} className="text-blue-600 dark:text-blue-400" />
              Complete data sovereignty
            </span>
            <p>
              Your resume is parsed locally. You can export your data or delete all documents and account records in a single click.
            </p>
          </div>
        </div>

        <div className="pt-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/upload')}
            className="btn-primary text-xs py-2 px-4"
          >
            Start analysis
          </button>
        </div>
      </section>
    </div>
  );
};
