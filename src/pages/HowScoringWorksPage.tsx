import React from 'react';
import { APP_CONFIG, APP_NAME } from '../config/app';

interface HowScoringWorksPageProps {
  navigate: (path: string) => void;
}

export const HowScoringWorksPage: React.FC<HowScoringWorksPageProps> = ({ navigate }) => {
  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-14 space-y-12">
      <div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mb-1">
          Documentation &middot; Scoring Engine {APP_CONFIG.version}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          How scoring works
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
          {APP_NAME} evaluates candidate resumes using deterministic algorithms modeled on modern applicant tracking systems and recruiter screening rubrics. Every point gained or lost is tied to a specific rule.
        </p>
      </div>

      {/* Honest ATS Estimate Disclaimer */}
      <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-sm text-xs text-neutral-700 dark:text-neutral-300 space-y-1">
        <span className="font-semibold block text-neutral-900 dark:text-neutral-100">
          Industry reality notice:
        </span>
        <p>
          Different employer systems behave differently, and this score is an estimate based on standard industry parsing rules. Taleo, Greenhouse, Workday, and Lever each parse documents with slight variations. Our engine tests against the core parsing rules shared by all modern systems.
        </p>
      </div>

      {/* Five weighted categories */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          The Five ATS Categories and Weights
        </h2>

        <div className="space-y-4 text-xs">
          <div className="border border-neutral-200 dark:border-neutral-800 p-4 rounded-sm space-y-2 bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                1. Formatting and Parseability
              </span>
              <span className="font-mono text-neutral-500">20% of total score</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Evaluates whether automated parsers can extract plain text in sequential reading order. Checks include single-column structure, clean text encoding without unmapped character glyphs, valid email address detection, phone number extraction, and verifiable links to GitHub, LinkedIn, or personal portfolio.
            </p>
          </div>

          <div className="border border-neutral-200 dark:border-neutral-800 p-4 rounded-sm space-y-2 bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                2. Keyword Coverage
              </span>
              <span className="font-mono text-neutral-500">25% of total score</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Evaluates the depth and breadth of recognized technical skills, programming languages, databases, and developer tools against an industry taxonomy. Also measures the frequency of decisive action verbs and checks for passive phrases like &quot;worked on&quot; or &quot;assisted with&quot;.
            </p>
          </div>

          <div className="border border-neutral-200 dark:border-neutral-800 p-4 rounded-sm space-y-2 bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                3. Section Completeness
              </span>
              <span className="font-mono text-neutral-500">20% of total score</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Checks for standard recognized section headers: Education, Experience (or Work History), Projects, and Skills. Missing headers or non-standard naming (such as &quot;Things I Do&quot;) are penalized because automated parsers rely on canonical header anchors to populate recruiter applicant profiles.
            </p>
          </div>

          <div className="border border-neutral-200 dark:border-neutral-800 p-4 rounded-sm space-y-2 bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                4. Quantified Impact
              </span>
              <span className="font-mono text-neutral-500">20% of total score</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Measures the presence of empirical metrics in bullet points: percentages, performance changes, latency improvements, user counts, and dataset scale. Bullet points that articulate business or technical outcomes score significantly higher than lists of routine responsibilities.
            </p>
          </div>

          <div className="border border-neutral-200 dark:border-neutral-800 p-4 rounded-sm space-y-2 bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                5. Length and Structure
              </span>
              <span className="font-mono text-neutral-500">15% of total score</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Assesses document density for early-career job seekers. The target range is 350 to 750 words, representing a focused single page. Penalties apply to documents that are excessively brief (under 250 words) or excessively verbose (over 850 words).
            </p>
          </div>
        </div>
      </section>

      {/* Role Matching Formula */}
      <section className="space-y-4 border-t border-neutral-200 dark:border-neutral-800 pt-8">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Job Match Calculation Formula
        </h2>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Matches represent entry-level role types, not live job postings. The match percentage is computed strictly from four input dimensions:
        </p>

        <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-xs font-mono text-xs text-neutral-800 dark:text-neutral-200">
          Match % = (Skill Overlap &times; 0.45) + (Experience Level &times; 0.25) + (Education &times; 0.15) + (Project Relevance &times; 0.15)
        </div>

        <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-2 list-disc pl-5">
          <li>
            <strong className="text-neutral-900 dark:text-neutral-100">Skill Overlap (45%):</strong> Ratio of required and secondary skills extracted from your resume against the role definition.
          </li>
          <li>
            <strong className="text-neutral-900 dark:text-neutral-100">Experience Level (25%):</strong> Presence of relevant internship, part-time, or contract technical responsibilities.
          </li>
          <li>
            <strong className="text-neutral-900 dark:text-neutral-100">Education (15%):</strong> Alignment between degree coursework (Computer Science, Data Science, Information Systems) and role requirements.
          </li>
          <li>
            <strong className="text-neutral-900 dark:text-neutral-100">Project Relevance (15%):</strong> Degree to which portfolio projects utilize the core architecture demanded by the role.
          </li>
        </ul>
      </section>

      {/* Scoring Engine Versioning */}
      <section className="space-y-3 border-t border-neutral-200 dark:border-neutral-800 pt-8">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Version Control and Reproducibility
        </h2>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Every analysis saves its scoring engine version (currently {APP_CONFIG.version}) alongside the raw result. When scoring algorithms or keyword dictionaries update, past analyses maintain their historical scores and remains directly interpretable over time.
        </p>

        <div className="pt-4">
          <button
            onClick={() => navigate('/upload')}
            className="btn-primary text-xs py-2 px-4"
          >
            Audit your resume now
          </button>
        </div>
      </section>
    </div>
  );
};
