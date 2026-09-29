# CareerLens

A resume analyzer and career prediction web application built for students and early-career job seekers.

## Overview
CareerLens provides an explainable, deterministic ATS compatibility score out of 100 with category audits, concrete evidence extracted from candidate resumes, top 5 role archetype matches, and an animated, phased career roadmap.

## Key Features
- **Continuous Core Flow:** Sign up / log in -> Upload resume (PDF or DOCX, max 5 MB) -> ATS Score & Breakdown -> Strengths & Weaknesses with line quotes -> Top 5 Job Matches with two-sentence explanations -> Animated SVG Career Roadmap -> Dashboard with score history tracking over time.
- **Explainable ATS Scoring:** 5 weighted categories totaling 100%:
  - Formatting and Parseability: 20%
  - Keyword Coverage: 25%
  - Section Completeness: 20%
  - Quantified Impact: 20%
  - Length and Structure: 15%
- **Mathematical Role Matching:** Match percentages calculated from Skill Overlap (45%), Experience Level (25%), Education (15%), and Project Relevance (15%).
- **Animated Career Roadmap:** Vertical SVG timeline where the path draws in once, phase nodes reveal sequentially, and each phase expands on click to reveal skills, projects, deliverables, and time estimates.
- **Privacy & Sovereignty:** Private processing, zero training on resumes, exportable data in JSON, and permanent one-click account and document deletion.
- **Editorial Design Discipline:** Restrained neutral palette, zero-pill metadata, rectangular 6px radius buttons, zero emojis, zero em dashes or en dashes.

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run unit and integration tests
npx tsx scripts/run-tests.ts

# Build for production
npm run build
```

## Configuration
Application name and scoring engine versions are centrally managed in `src/config/app.ts`:
- `APP_NAME`: Working brand name (default: `"CareerLens"`).
- `SCORING_VERSION`: Engine version (default: `"v1.2.0"`).
- Placeholders for legal entity, support email, and jurisdiction.
