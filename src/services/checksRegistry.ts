// Registry of named checks for ATS evaluation
// The number of checks and weights are read directly from this registry at build time.

export type CheckCategory =
  | 'parseability'
  | 'completeness'
  | 'content'
  | 'keywords'
  | 'language'
  | 'structure';

export type CheckSeverity = 'pass' | 'warn' | 'fail';

export interface NamedCheckDefinition {
  id: string;
  name: string;
  category: CheckCategory;
  categoryTitle: string;
  maxPoints: number;
  description: string;
  remedy: string;
}

export interface EvaluatedCheck extends NamedCheckDefinition {
  severity: CheckSeverity;
  pointsLost: number;
  pointsEarned: number;
  evidence: string;
}

export const CATEGORY_WEIGHTS: Record<CheckCategory, { title: string; weight: number }> = {
  parseability: { title: 'Parseability and format', weight: 20 },
  completeness: { title: 'Section completeness', weight: 15 },
  content: { title: 'Content quality and impact', weight: 25 },
  keywords: { title: 'Keyword and skill coverage', weight: 20 },
  language: { title: 'Language and readability', weight: 10 },
  structure: { title: 'Length and structure', weight: 10 },
};

// Total weight must equal exactly 100
export const TOTAL_MAX_POINTS = Object.values(CATEGORY_WEIGHTS).reduce((sum, c) => sum + c.weight, 0);

export const NAMED_CHECKS_REGISTRY: NamedCheckDefinition[] = [
  // 1. Parseability and format (Total: 20 points)
  {
    id: 'parse-clean-stream',
    name: 'Text stream readability',
    category: 'parseability',
    categoryTitle: 'Parseability and format',
    maxPoints: 5,
    description: 'Validates that document contains readable text without font encoding or OCR corruption.',
    remedy: 'Export your resume directly from your word processor as a clean text-based PDF or DOCX file.',
  },
  {
    id: 'parse-no-scanned-images',
    name: 'No image-only text',
    category: 'parseability',
    categoryTitle: 'Parseability and format',
    maxPoints: 5,
    description: 'Ensures resume content is not trapped inside flattened images or canvas layers.',
    remedy: 'Avoid flattening text into image files. Keep all text selectable in your PDF reader.',
  },
  {
    id: 'parse-single-column-flow',
    name: 'Single-column reading flow',
    category: 'parseability',
    categoryTitle: 'Parseability and format',
    maxPoints: 4,
    description: 'Checks for multi-column or complex sidebar structures that scramble automated reading order.',
    remedy: 'Use a linear single-column layout so ATS software reads your experiences chronologically.',
  },
  {
    id: 'parse-contact-header',
    name: 'Body-embedded contact details',
    category: 'parseability',
    categoryTitle: 'Parseability and format',
    maxPoints: 3,
    description: 'Verifies that phone number, email, and profiles are inside the document body, not hidden in header/footer fields.',
    remedy: 'Move your email address, phone number, and LinkedIn/GitHub profiles into the main document body.',
  },
  {
    id: 'parse-standard-headings',
    name: 'Standard section anchors',
    category: 'parseability',
    categoryTitle: 'Parseability and format',
    maxPoints: 3,
    description: 'Ensures standard heading titles like Education, Experience, Projects, and Skills are present.',
    remedy: 'Use standard, widely recognized heading titles rather than creative labels.',
  },

  // 2. Section completeness (Total: 15 points)
  {
    id: 'comp-education-present',
    name: 'Education section present',
    category: 'completeness',
    categoryTitle: 'Section completeness',
    maxPoints: 4,
    description: 'Verifies degree, institution, and graduation or expected graduation year are specified.',
    remedy: 'Include an Education section stating degree, major, institution name, and year of completion.',
  },
  {
    id: 'comp-experience-present',
    name: 'Experience or internship section',
    category: 'completeness',
    categoryTitle: 'Section completeness',
    maxPoints: 4,
    description: 'Checks for work history, internship experience, or practical training roles.',
    remedy: 'Add an Experience or Internships section with organization names, titles, and dates.',
  },
  {
    id: 'comp-projects-present',
    name: 'Technical projects section',
    category: 'completeness',
    categoryTitle: 'Section completeness',
    maxPoints: 4,
    description: 'Checks for technical or academic projects showing hands-on implementation skills.',
    remedy: 'Add 2 to 3 technical projects highlighting problem, tools used, and deliverables.',
  },
  {
    id: 'comp-skills-present',
    name: 'Technical skills inventory',
    category: 'completeness',
    categoryTitle: 'Section completeness',
    maxPoints: 3,
    description: 'Validates presence of a dedicated technical skills section grouped by category.',
    remedy: 'Group your proficiencies under clear subheadings such as Languages, Frameworks, and Tools.',
  },

  // 3. Content quality and impact (Total: 25 points)
  {
    id: 'content-action-verbs-start',
    name: 'Strong action verbs on bullets',
    category: 'content',
    categoryTitle: 'Content quality and impact',
    maxPoints: 6,
    description: 'Checks that each bullet begins with a decisive action verb (Engineered, Developed, Deployed).',
    remedy: 'Start every bullet point with a strong, active past-tense or present-tense action verb.',
  },
  {
    id: 'content-quantified-metrics',
    name: 'Quantified impact and metrics',
    category: 'content',
    categoryTitle: 'Content quality and impact',
    maxPoints: 6,
    description: 'Identifies numerical metrics (percentages, throughput, latency, user counts, efficiency).',
    remedy: 'Quantify your achievements with numbers, percentages, time saved, or user scale.',
  },
  {
    id: 'content-no-passive-phrasing',
    name: 'No passive responsibility phrases',
    category: 'content',
    categoryTitle: 'Content quality and impact',
    maxPoints: 5,
    description: 'Detects weak phrasing such as "responsible for", "worked on", "assisted with", or "helped".',
    remedy: 'Replace passive phrases with direct ownership verbs specifying your exact contribution.',
  },
  {
    id: 'content-bullet-length',
    name: 'Bullet length discipline',
    category: 'content',
    categoryTitle: 'Content quality and impact',
    maxPoints: 4,
    description: 'Ensures bullet points contain between 12 and 30 words for optimal density and scannability.',
    remedy: 'Keep bullet points concise: between 12 and 30 words, stating context, action, and outcome.',
  },
  {
    id: 'content-no-first-person-pronouns',
    name: 'No first-person pronouns',
    category: 'content',
    categoryTitle: 'Content quality and impact',
    maxPoints: 4,
    description: 'Detects personal pronouns such as "I", "me", "my", "we", or "our".',
    remedy: 'Write in concise resume style without personal pronouns.',
  },

  // 4. Keyword and skill coverage (Total: 20 points)
  {
    id: 'kw-core-technical-density',
    name: 'Core programming language density',
    category: 'keywords',
    categoryTitle: 'Keyword and skill coverage',
    maxPoints: 6,
    description: 'Validates presence of recognized industry programming languages (Python, Java, C++, TypeScript, SQL).',
    remedy: 'Explicitly specify the core programming languages you know and utilize.',
  },
  {
    id: 'kw-framework-tooling',
    name: 'Modern frameworks and developer tooling',
    category: 'keywords',
    categoryTitle: 'Keyword and skill coverage',
    maxPoints: 5,
    description: 'Checks for developer tooling, frameworks, version control, or containerization technologies.',
    remedy: 'Mention relevant libraries, databases, and development tools you used on your projects.',
  },
  {
    id: 'kw-skill-context-evidence',
    name: 'Skills backed by project evidence',
    category: 'keywords',
    categoryTitle: 'Keyword and skill coverage',
    maxPoints: 5,
    description: 'Ensures skills listed in the inventory appear naturally in project descriptions or experience bullets.',
    remedy: 'Provide context for your skills by mentioning them directly inside your project bullet points.',
  },
  {
    id: 'kw-no-buzzword-stuffing',
    name: 'No keyword stuffing or buzzword overload',
    category: 'keywords',
    categoryTitle: 'Keyword and skill coverage',
    maxPoints: 4,
    description: 'Monitors keyword density to ensure tools are presented in authentic, natural context.',
    remedy: 'Avoid pasting isolated lists of keywords. Describe how you applied them in actual work.',
  },

  // 5. Language and readability (Total: 10 points)
  {
    id: 'lang-grammar-punctuation',
    name: 'Punctuation and terminal period consistency',
    category: 'language',
    categoryTitle: 'Language and readability',
    maxPoints: 3,
    description: 'Verifies uniform punctuation conventions across bullet points and section headers.',
    remedy: 'Maintain consistent punctuation throughout: either end all bullets with a period or none.',
  },
  {
    id: 'lang-tense-consistency',
    name: 'Grammatical tense consistency',
    category: 'language',
    categoryTitle: 'Language and readability',
    maxPoints: 3,
    description: 'Verifies past-tense usage for completed roles and present-tense for ongoing positions.',
    remedy: 'Use past tense for completed experiences and present tense for your current role.',
  },
  {
    id: 'lang-readability-level',
    name: 'Clear reading grade level',
    category: 'language',
    categoryTitle: 'Language and readability',
    maxPoints: 2,
    description: 'Evaluates sentence length and complexity for clear technical communication.',
    remedy: 'Avoid overly nested clauses. Keep sentences crisp, technical, and direct.',
  },
  {
    id: 'lang-repetition-variety',
    name: 'Action verb vocabulary variety',
    category: 'language',
    categoryTitle: 'Language and readability',
    maxPoints: 2,
    description: 'Detects repetitive opening verbs across consecutive bullet points.',
    remedy: 'Vary your action verbs. Avoid starting multiple consecutive bullets with the same word.',
  },

  // 6. Length and structure (Total: 10 points)
  {
    id: 'struct-page-calibration',
    name: 'Word count calibrated for career level',
    category: 'structure',
    categoryTitle: 'Length and structure',
    maxPoints: 3,
    description: 'Checks that resume length falls between 350 and 800 words for student and early-career seekers.',
    remedy: 'Target a concise single page between 350 and 800 words with balanced spacing.',
  },
  {
    id: 'struct-date-formatting',
    name: 'Consistent date formatting',
    category: 'structure',
    categoryTitle: 'Length and structure',
    maxPoints: 3,
    description: 'Validates chronological order and standard month/year date notation.',
    remedy: 'Use consistent date formats such as "Month Year - Month Year" or "Year - Present".',
  },
  {
    id: 'struct-contact-hygiene',
    name: 'Professional email address format',
    category: 'structure',
    categoryTitle: 'Length and structure',
    maxPoints: 2,
    description: 'Checks for professional email handle using candidate name rather than slang.',
    remedy: 'Use a clean email address incorporating your first and last name.',
  },
  {
    id: 'struct-no-extraneous-pii',
    name: 'No unnecessary personal details',
    category: 'structure',
    categoryTitle: 'Length and structure',
    maxPoints: 2,
    description: 'Flags unnecessary details such as marital status, religion, photo, or full street address.',
    remedy: 'Remove personal details like marital status or photos to prevent bias and save space.',
  },
];

export const TOTAL_CHECKS_COUNT = NAMED_CHECKS_REGISTRY.length;
