# Architecture & Engineering Decisions

This document details the architectural decisions, design tradeoffs, and technical implementations made for CareerLens.

## 1. Product Name Configuration
- **Decision:** As specified in the brief ("Working name: CareerLens (replace with the final name via a single config constant)"), the application name is centralized in `src/config/app.ts` as `export const APP_NAME = "CareerLens"`. Changing this single constant propagates cleanly across navigation, headers, footers, meta tags, structured data, and documentation.

## 2. Runtime Environment & Tech Stack Alignment
- **Decision:** The specification recommended Python/FastAPI for parsing and React for the frontend. Given the active AI Studio environment constraints (Node.js/Vite environment with Express support), we implemented a high-performance, client-side and Node.js-compatible parsing and scoring engine:
  - **PDF Parsing:** Evaluated with `pdfjs-dist` text stream extraction, handling character coordinates and font mapping, alongside binary stream fallback and honest image-only detection.
  - **DOCX Parsing:** Executed using `mammoth` ArrayBuffer raw-text extraction, isolating paragraphs and text runs without layout bloat.
  - **Scoring Engine:** Deterministic TypeScript engine executing exact category rubrics, regex-based action-verb indexing, and mathematical weighting.
- **Advantage:** Complete privacy preservation. Candidates' resumes can be parsed directly in-browser with zero third-party leakage, with options to persist to private local storage or sync to backend.

## 3. Strict Scoring & Honesty Invariants
- **Deterministic Formulas:** The ATS score is strictly computed across five published weights:
  1. Formatting and Parseability: 20%
  2. Keyword Coverage: 25%
  3. Section Completeness: 20%
  4. Quantified Impact: 20%
  5. Length and Structure: 15%
  Total: 100%
- **Score Labeling:** The ATS score is explicitly labeled as an estimate near the score: "Different employer systems behave differently, and this score is an estimate based on standard industry parsing rules."
- **Job Matches:** Role archetypes (e.g., Frontend Engineer, Backend Engineer, Data Analyst, Machine Learning Engineer, DevOps Engineer) rather than live job postings, preventing misleading candidate expectations.
- **Match Percentage Inputs:** Every match percentage displays its four constituent input scores: Skill Overlap (45%), Experience Level (25%), Education (15%), and Project Relevance (15%).
- **Match Explanations:** Strictly limited to exactly two sentences per role match, stating core skills matched in sentence 1 and concrete gaps/context in sentence 2.
- **Scoring Version:** Every stored analysis persists `scoringVersion: "v1.2.0"`.

## 4. Visual Restraint & Anti-Slop Implementation
- **Zero-Pill Discipline:** All metadata (skills, tags, counts, scores) is rendered as clean unboxed text with typographical separators (`/`, `|`, `·`), avoiding colored pill capsules.
- **Button Geography:** Rectangular buttons with a consistent 6px radius (`--radius: 6px`). Solid fill for primary, thin border for secondary. No custom pill shapes, glow effects, or gradient blobs.
- **Typography & Scale:** System sans-serif with a strict hierarchical scale, 16px minimum body size, and `font-variant-numeric: tabular-nums` for all numeric metrics.
- **Prohibited Characters:** Zero em dashes (`—`) or en dashes (`–`) anywhere across UI copy, documentation, or code comments. Hyphens, commas, periods, and colons are used exclusively.
- **Zero Emojis & Badges:** No emojis anywhere. No builder or platform badges ("Made with AI", etc.) anywhere in markup or assets.

## 5. Animation Restraint & Roadmap Showpiece
- **Roadmap as the Single Showpiece:** Rendered as an SVG timeline. On load, the vertical timeline path animates its stroke, and phase nodes reveal sequentially (350ms ease-out). Each phase expands on user interaction to display skills, projects, and milestones.
- **Score Counter:** Counts up once on first view in under 800ms (700ms cubic ease-out).
- **Reduced Motion:** Fully complies with `prefers-reduced-motion` media queries by immediately rendering final states with zero animation.

## 6. Parsing Accuracy, Logout Control, and Tactile Polish
- **Expanded Skill Dictionary:** Broadened from basic web keywords to an expansive technical taxonomy encompassing modern cloud (GCP, AWS, Azure, Docker, Kubernetes, CI/CD), languages (TypeScript, Python, Go, Rust, Java, C++, C#), databases (PostgreSQL, MySQL, Redis, MongoDB), and frameworks.
- **Direct Paste Option:** In addition to drag-and-drop PDF/DOCX file uploading, users can directly paste raw resume text to eliminate PDF formatting quirks and verify 100% of their materials.
- **Parsed Materials Audit Component:** A dedicated inspector tab displaying extracted candidate contacts, identified technical skills, recognized section anchors, and full text streams.
- **Enhanced Logout Button:** Upgraded from a plain underlined text link to a styled secondary button control with an icon (`LogOut`), subtle hover state, and user initials avatar badge.
- **Visual Atmosphere:** Added a subtle architectural geometric grid texture, hairline card depth, and an interactive hero preview card.
