// Data models and interface definitions

import { EvaluatedCheck } from '../services/checksRegistry';

export type CategoryName =
  | 'Parseability and format'
  | 'Section completeness'
  | 'Content quality and impact'
  | 'Keyword and skill coverage'
  | 'Language and readability'
  | 'Length and structure';

export interface ScoreCheckItem {
  id: string;
  label: string;
  passed: boolean;
  impactScore: number;
  details: string;
}

export interface ScoreDeduction {
  reason: string;
  pointsLost: number;
  recommendation: string;
}

export interface CategoryScore {
  name: CategoryName;
  displayName: string;
  weight: number; // percentage out of 100
  score: number; // 0 to 100
  weightedScore: number; // score * (weight / 100)
  checks: ScoreCheckItem[];
  deductions: ScoreDeduction[];
  summary: string;
}

export interface ResumeStrength {
  id: string;
  title: string;
  description: string;
  resumeQuote: string;
  section: string;
}

export interface ResumeWeakness {
  id: string;
  title: string;
  description: string;
  resumeQuote?: string;
  section: string;
  recommendedFix: string;
}

export interface MatchScoreInputs {
  skillOverlapScore: number; // 40% weight
  projectRelevanceScore: number; // 25% weight
  educationScore: number; // 15% weight
  experienceLevelScore: number; // 15% weight
  certificationScore: number; // 5% weight
}

export interface RoadmapProject {
  title: string;
  description: string;
  deliverable: string;
  targetSkills: string[];
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  timeEstimate: string;
  focus: string;
  skillsToLearn: string[];
  projectsToBuild: RoadmapProject[];
  milestones: string[];
}

export interface CareerRoadmap {
  roleId: string;
  roleTitle: string;
  totalEstimatedWeeks: number;
  phases: RoadmapPhase[];
}

export interface JobMatch {
  roleId: string;
  roleTitle: string;
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  scoreBreakdown: MatchScoreInputs;
  explanation: string; // Exactly two sentences
  roadmap: CareerRoadmap;
}

export interface ParsedResumeSection {
  title: string;
  content: string;
  lines: string[];
}

export interface ParsedResume {
  rawText: string;
  lines: string[];
  wordCount: number;
  characterCount: number;
  detectedName?: string;
  detectedEmail?: string;
  detectedPhone?: string;
  detectedLinks: string[];
  sections: Record<string, ParsedResumeSection>;
  extractedSkills: string[];
  quantifiedMetricsCount: number;
  hasTablesOrColumnsWarning: boolean;
  isScannedOrImageOnly: boolean;
  degreeMatch?: string;
  cgpaMatch?: string;
}

export interface BulletReviewItem {
  id: string;
  originalText: string;
  section: string;
  score: number;
  hasActionVerb: boolean;
  hasMetric: boolean;
  isPassive: boolean;
  wordCount: number;
  reasons: string[];
  suggestedRewrite: string;
}

export interface MissingKeywordItem {
  keyword: string;
  recommendedSection: string;
  contextTip: string;
}

export interface TargetedJobAnalysis {
  jobTitle: string;
  tailoringScore: number;
  matchedKeywords: string[];
  missingKeywords: MissingKeywordItem[];
  unsupportedKeywordsWarning: string[];
}

export interface ATSAnalysisResult {
  id: string;
  userId: string;
  fileName: string;
  fileType: 'pdf' | 'docx' | 'txt';
  fileSizeBytes: number;
  uploadedAt: string;
  scoringVersion: string;
  overallScore: number;
  categoryScores: CategoryScore[];
  evaluatedChecks: EvaluatedCheck[];
  bulletReviews: BulletReviewItem[];
  strengths: ResumeStrength[];
  weaknesses: ResumeWeakness[];
  topJobMatches: JobMatch[];
  extractedSkills: string[];
  wordCount: number;
  lineCount: number;
  rawText: string;
  parsedSummary: {
    name?: string;
    email?: string;
    phone?: string;
    links: string[];
    sectionsFound: string[];
    degree?: string;
    cgpa?: string;
  };
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
}

export interface AuthSession {
  user: User | null;
  token: string | null;
}
