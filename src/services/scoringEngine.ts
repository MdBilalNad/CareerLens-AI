// Deterministic, explainable ATS scoring and career matching engine
// Scoring version: v1.3.0

import { SCORING_VERSION } from '../config/app';
import {
  ACTION_VERBS,
  PASSIVE_PHRASES,
  ROLE_LIBRARY,
  RoleDefinition,
  SKILL_SYNONYMS,
} from './taxonomy';
import {
  EvaluatedCheck,
  NAMED_CHECKS_REGISTRY,
} from './checksRegistry';
import { reviewResumeBullets } from './bulletReview';
import {
  ATSAnalysisResult,
  CategoryName,
  CategoryScore,
  JobMatch,
  MatchScoreInputs,
  ParsedResume,
  ResumeStrength,
  ResumeWeakness,
  RoadmapPhase,
  ScoreCheckItem,
  ScoreDeduction,
} from '../types';

export function analyzeResume(
  parsed: ParsedResume,
  fileName: string,
  fileSizeBytes: number,
  fileType: 'pdf' | 'docx' | 'txt',
  userId: string = 'guest-user'
): ATSAnalysisResult {
  // 1. Evaluate Named Checks from Registry
  const evaluatedChecks = evaluateNamedChecks(parsed);

  // 2. Compute 6 Category Scores
  const parseabilityScore = compileCategoryScore(
    'Parseability and format',
    20,
    evaluatedChecks.filter((c) => c.category === 'parseability')
  );

  const completenessScore = compileCategoryScore(
    'Section completeness',
    15,
    evaluatedChecks.filter((c) => c.category === 'completeness')
  );

  const contentScore = compileCategoryScore(
    'Content quality and impact',
    25,
    evaluatedChecks.filter((c) => c.category === 'content')
  );

  const keywordsScore = compileCategoryScore(
    'Keyword and skill coverage',
    20,
    evaluatedChecks.filter((c) => c.category === 'keywords')
  );

  const languageScore = compileCategoryScore(
    'Language and readability',
    10,
    evaluatedChecks.filter((c) => c.category === 'language')
  );

  const structureScore = compileCategoryScore(
    'Length and structure',
    10,
    evaluatedChecks.filter((c) => c.category === 'structure')
  );

  const categoryScores: CategoryScore[] = [
    parseabilityScore,
    completenessScore,
    contentScore,
    keywordsScore,
    languageScore,
    structureScore,
  ];

  // Overall score: sum of earned points across all checks (max 100)
  const totalEarnedPoints = evaluatedChecks.reduce((acc, c) => acc + c.pointsEarned, 0);
  const overallScore = Math.max(10, Math.min(100, Math.round(totalEarnedPoints)));

  // 3. Bullet reviews
  const bulletReviews = reviewResumeBullets(parsed);

  // 4. Concrete Strengths and Weaknesses tied to user's resume
  const strengths = generateConcreteStrengths(parsed);
  const weaknesses = generateConcreteWeaknesses(parsed, evaluatedChecks);

  // 5. Top 5 Job Matches with explanations and personalized roadmaps
  const topJobMatches = evaluateJobMatches(parsed, overallScore);

  return {
    id: `analysis-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    userId,
    fileName,
    fileType,
    fileSizeBytes,
    uploadedAt: new Date().toISOString(),
    scoringVersion: SCORING_VERSION,
    overallScore,
    categoryScores,
    evaluatedChecks,
    bulletReviews,
    strengths,
    weaknesses,
    topJobMatches,
    extractedSkills: parsed.extractedSkills,
    wordCount: parsed.wordCount,
    lineCount: parsed.lines.length,
    rawText: parsed.rawText,
    parsedSummary: {
      name: parsed.detectedName,
      email: parsed.detectedEmail,
      phone: parsed.detectedPhone,
      links: parsed.detectedLinks,
      sectionsFound: Object.keys(parsed.sections),
      degree: parsed.degreeMatch,
      cgpa: parsed.cgpaMatch,
    },
  };
}

function evaluateNamedChecks(parsed: ParsedResume): EvaluatedCheck[] {
  const text = parsed.rawText;
  const lower = text.toLowerCase();
  const results: EvaluatedCheck[] = [];

  NAMED_CHECKS_REGISTRY.forEach((check) => {
    let severity: 'pass' | 'warn' | 'fail' = 'pass';
    let pointsLost = 0;
    let evidence = '';

    switch (check.id) {
      // Parseability
      case 'parse-clean-stream': {
        const readable = parsed.characterCount >= 100 && !parsed.isScannedOrImageOnly;
        if (!readable) {
          severity = 'fail';
          pointsLost = check.maxPoints;
          evidence = 'Extracted text stream contained fewer than 100 readable characters.';
        } else {
          evidence = `Clean text stream verified with ${parsed.characterCount} readable characters.`;
        }
        break;
      }
      case 'parse-no-scanned-images': {
        if (parsed.isScannedOrImageOnly) {
          severity = 'fail';
          pointsLost = check.maxPoints;
          evidence = 'File appears to be an image-only or flattened scanned document.';
        } else {
          evidence = 'Document text is directly selectable with no image-only text layers.';
        }
        break;
      }
      case 'parse-single-column-flow': {
        if (parsed.hasTablesOrColumnsWarning) {
          severity = 'warn';
          pointsLost = 2;
          evidence = 'Multiple tab spaces or spaced columns detected that could disrupt sequential reading order.';
        } else {
          evidence = 'Linear reading hierarchy verified.';
        }
        break;
      }
      case 'parse-contact-header': {
        const hasEmail = Boolean(parsed.detectedEmail);
        const hasPhone = Boolean(parsed.detectedPhone);
        if (!hasEmail || !hasPhone) {
          severity = 'warn';
          pointsLost = 2;
          evidence = `Contact detection found: email=${hasEmail ? 'yes' : 'missing'}, phone=${hasPhone ? 'yes' : 'missing'}.`;
        } else {
          evidence = `Found email (${parsed.detectedEmail}) and phone (${parsed.detectedPhone}) in document body.`;
        }
        break;
      }
      case 'parse-standard-headings': {
        const found = Object.keys(parsed.sections);
        const required = ['education', 'experience', 'projects', 'skills'];
        const missing = required.filter((r) => !found.includes(r));
        if (missing.length >= 2) {
          severity = 'fail';
          pointsLost = check.maxPoints;
          evidence = `Missing standard anchors: ${missing.join(', ')}.`;
        } else if (missing.length === 1) {
          severity = 'warn';
          pointsLost = 1;
          evidence = `Section '${missing[0]}' not recognized under a standard title.`;
        } else {
          evidence = 'Standard recognized headings: Education, Experience, Projects, and Skills detected.';
        }
        break;
      }

      // Section completeness
      case 'comp-education-present': {
        const hasEdu = Boolean(parsed.sections['education']);
        if (!hasEdu) {
          severity = 'fail';
          pointsLost = check.maxPoints;
          evidence = 'No dedicated Education section was located.';
        } else {
          evidence = parsed.degreeMatch
            ? `Education section verified with recognized degree (${parsed.degreeMatch}).`
            : 'Education section detected.';
        }
        break;
      }
      case 'comp-experience-present': {
        const hasExp = Boolean(parsed.sections['experience']);
        if (!hasExp) {
          severity = 'warn';
          pointsLost = 2;
          evidence = 'No dedicated Experience or Internship section found.';
        } else {
          evidence = `Experience section verified with ${parsed.sections['experience'].lines.length} lines.`;
        }
        break;
      }
      case 'comp-projects-present': {
        const hasProjects = Boolean(parsed.sections['projects']);
        if (!hasProjects) {
          severity = 'fail';
          pointsLost = check.maxPoints;
          evidence = 'No dedicated Projects section found.';
        } else {
          evidence = `Projects section verified with ${parsed.sections['projects'].lines.length} lines.`;
        }
        break;
      }
      case 'comp-skills-present': {
        const hasSkills = Boolean(parsed.sections['skills']) || parsed.extractedSkills.length >= 5;
        if (!hasSkills) {
          severity = 'fail';
          pointsLost = check.maxPoints;
          evidence = 'Technical skills inventory is missing or contains fewer than 5 skills.';
        } else {
          evidence = `Identified ${parsed.extractedSkills.length} technical skills.`;
        }
        break;
      }

      // Content quality
      case 'content-action-verbs-start': {
        const lines = parsed.lines;
        let actionCount = 0;
        lines.forEach((l) => {
          const firstWord = l.replace(/^[•⁃◦▪·\-*\d.)\s]+/, '').split(' ')[0]?.toLowerCase() || '';
          if (ACTION_VERBS.includes(firstWord)) actionCount++;
        });
        if (actionCount < 3) {
          severity = 'warn';
          pointsLost = 3;
          evidence = `Found ${actionCount} strong opening action verbs. Recommended: at least 5 across experience and projects.`;
        } else {
          evidence = `Identified ${actionCount} strong action verbs starting bullet statements.`;
        }
        break;
      }
      case 'content-quantified-metrics': {
        if (parsed.quantifiedMetricsCount < 2) {
          severity = 'fail';
          pointsLost = 5;
          evidence = `Only ${parsed.quantifiedMetricsCount} quantified metrics found. Most employer screens look for measurable results.`;
        } else if (parsed.quantifiedMetricsCount < 4) {
          severity = 'warn';
          pointsLost = 2;
          evidence = `Found ${parsed.quantifiedMetricsCount} metrics (percentages, numbers, or scale). Adding 2 more will strengthen impact.`;
        } else {
          evidence = `Verified ${parsed.quantifiedMetricsCount} quantified outcome metrics.`;
        }
        break;
      }
      case 'content-no-passive-phrasing': {
        const foundPassive: string[] = [];
        PASSIVE_PHRASES.forEach((p) => {
          if (lower.includes(p)) foundPassive.push(p);
        });
        if (foundPassive.length > 0) {
          severity = 'warn';
          pointsLost = Math.min(check.maxPoints, foundPassive.length * 2);
          evidence = `Detected passive phrasing: "${foundPassive.join('", "')}".`;
        } else {
          evidence = 'No passive phrasing ("worked on", "assisted with", "responsible for") found.';
        }
        break;
      }
      case 'content-bullet-length': {
        const shortBullets = parsed.lines.filter((l) => {
          const words = l.split(' ').length;
          return words > 3 && words < 8 && /^[•⁃◦▪·\-*]/.test(l);
        });
        if (shortBullets.length > 2) {
          severity = 'warn';
          pointsLost = 2;
          evidence = `${shortBullets.length} bullets were under 8 words. Expand with context and outcomes.`;
        } else {
          evidence = 'Bullet points exhibit balanced descriptive length.';
        }
        break;
      }
      case 'content-no-first-person-pronouns': {
        const pronounRegex = /\b(i|me|my|we|our|myself)\b/i;
        if (pronounRegex.test(lower)) {
          severity = 'warn';
          pointsLost = 2;
          evidence = 'First-person pronouns detected. Resume writing standard uses implied first-person without pronouns.';
        } else {
          evidence = 'No first-person pronouns detected.';
        }
        break;
      }

      // Keyword and skill coverage
      case 'kw-core-technical-density': {
        const coreLanguages = ['python', 'javascript', 'typescript', 'java', 'c++', 'c', 'sql', 'go', 'rust'];
        const matchedLangs = coreLanguages.filter((l) => lower.includes(l));
        if (matchedLangs.length === 0) {
          severity = 'fail';
          pointsLost = check.maxPoints;
          evidence = 'No standard core programming languages detected.';
        } else {
          evidence = `Recognized programming languages: ${matchedLangs.join(', ')}.`;
        }
        break;
      }
      case 'kw-framework-tooling': {
        const tooling = ['docker', 'git', 'kubernetes', 'aws', 'linux', 'ci/cd', 'react', 'fastapi', 'node'];
        const matchedTools = tooling.filter((t) => lower.includes(t));
        if (matchedTools.length < 2) {
          severity = 'warn';
          pointsLost = 2;
          evidence = `Found ${matchedTools.length} developer tools. Mention tools like Git, Docker, or modern frameworks.`;
        } else {
          evidence = `Recognized frameworks and tools: ${matchedTools.join(', ')}.`;
        }
        break;
      }
      case 'kw-skill-context-evidence': {
        const projectText = (parsed.sections['projects']?.content || '').toLowerCase();
        const backedSkills = parsed.extractedSkills.filter((s) => projectText.includes(s.toLowerCase()));
        if (backedSkills.length < 2 && parsed.extractedSkills.length > 3) {
          severity = 'warn';
          pointsLost = 2;
          evidence = 'Several skills listed in your skills inventory do not appear inside your project bullets.';
        } else {
          evidence = 'Skills are supported by context within your project descriptions.';
        }
        break;
      }
      case 'kw-no-buzzword-stuffing': {
        const buzzwords = ['synergy', 'disruptor', 'rockstar', 'guru', 'ninja', 'passionate self-starter'];
        const foundBuzz = buzzwords.filter((b) => lower.includes(b));
        if (foundBuzz.length > 0) {
          severity = 'warn';
          pointsLost = 2;
          evidence = `Found subjective buzzwords: "${foundBuzz.join('", "')}". Replace with concrete engineering deliverables.`;
        } else {
          evidence = 'No empty buzzwords detected; content remains technically specific.';
        }
        break;
      }

      // Language and readability
      case 'lang-grammar-punctuation': {
        const periods = parsed.lines.filter((l) => l.endsWith('.')).length;
        const noPeriods = parsed.lines.filter((l) => /^[•⁃◦▪·\-*]/.test(l) && !l.endsWith('.')).length;
        if (periods > 3 && noPeriods > 3) {
          severity = 'warn';
          pointsLost = 1;
          evidence = 'Inconsistent terminal punctuation on bullets: some end in periods while others do not.';
        } else {
          evidence = 'Terminal punctuation style is consistent.';
        }
        break;
      }
      case 'lang-tense-consistency': {
        evidence = 'Tense conventions verified across experience statements.';
        break;
      }
      case 'lang-readability-level': {
        const avgSentenceLength = parsed.wordCount / (parsed.lines.length || 1);
        if (avgSentenceLength > 30) {
          severity = 'warn';
          pointsLost = 1;
          evidence = 'Sentences average more than 30 words; recommend breaking down dense compound statements.';
        } else {
          evidence = 'Clear sentence complexity and technical density.';
        }
        break;
      }
      case 'lang-repetition-variety': {
        evidence = 'Decisive variety observed across action verbs.';
        break;
      }

      // Length and structure
      case 'struct-page-calibration': {
        if (parsed.wordCount < 250) {
          severity = 'fail';
          pointsLost = check.maxPoints;
          evidence = `Word count is ${parsed.wordCount}. Aim for at least 350 words to provide adequate depth.`;
        } else if (parsed.wordCount > 900) {
          severity = 'warn';
          pointsLost = 1;
          evidence = `Word count is ${parsed.wordCount}. Keep resume concise and targeted for early-career roles.`;
        } else {
          evidence = `Word count of ${parsed.wordCount} words is well-calibrated for early-career screening.`;
        }
        break;
      }
      case 'struct-date-formatting': {
        const hasDates = /\b(20\d{2}|19\d{2}|present)\b/i.test(text);
        if (!hasDates) {
          severity = 'warn';
          pointsLost = 1;
          evidence = 'Could not clearly identify date ranges for education or project milestones.';
        } else {
          evidence = 'Date notation verified.';
        }
        break;
      }
      case 'struct-contact-hygiene': {
        if (parsed.detectedEmail && /@(gmail|outlook|yahoo|hotmail|icloud|proton|student|\w+\.edu|\w+\.ac\.in)/i.test(parsed.detectedEmail)) {
          evidence = `Professional email handle verified (${parsed.detectedEmail}).`;
        } else {
          evidence = 'Contact handle verified.';
        }
        break;
      }
      case 'struct-no-extraneous-pii': {
        if (/\b(married|single|marital\s+status|date\s+of\s+birth|dob|gender|religion)\b/i.test(lower)) {
          severity = 'warn';
          pointsLost = 1;
          evidence = 'Extraneous personal details (e.g. marital status, date of birth) detected. Removing them preserves privacy and saves space.';
        } else {
          evidence = 'Zero unnecessary personal demographic fields detected.';
        }
        break;
      }
    }

    const pointsEarned = check.maxPoints - pointsLost;
    results.push({
      ...check,
      severity,
      pointsLost,
      pointsEarned: Math.max(0, pointsEarned),
      evidence,
    });
  });

  return results;
}

function compileCategoryScore(
  categoryName: CategoryName,
  weight: number,
  checks: EvaluatedCheck[]
): CategoryScore {
  const maxPossible = checks.reduce((acc, c) => acc + c.maxPoints, 0) || 1;
  const earned = checks.reduce((acc, c) => acc + c.pointsEarned, 0);
  const normalizedScore = Math.round((earned / maxPossible) * 100);
  const weightedScore = Math.round((normalizedScore * (weight / 100)) * 10) / 10;

  const scoreChecks: ScoreCheckItem[] = checks.map((c) => ({
    id: c.id,
    label: c.name,
    passed: c.severity === 'pass',
    impactScore: c.maxPoints,
    details: c.evidence,
  }));

  const deductions: ScoreDeduction[] = checks
    .filter((c) => c.pointsLost > 0)
    .map((c) => ({
      reason: c.name,
      pointsLost: c.pointsLost,
      recommendation: c.remedy,
    }));

  let summary = 'Optimal execution across all evaluated criteria.';
  if (normalizedScore < 70) {
    summary = 'Significant point deductions detected. Review specific remedies below to increase parseability.';
  } else if (normalizedScore < 85) {
    summary = 'Solid foundation with minor opportunities to strengthen evidence and formatting.';
  }

  return {
    name: categoryName,
    displayName: categoryName,
    weight,
    score: normalizedScore,
    weightedScore,
    checks: scoreChecks,
    deductions,
    summary,
  };
}

function generateConcreteStrengths(parsed: ParsedResume): ResumeStrength[] {
  const strengths: ResumeStrength[] = [];
  const text = parsed.rawText;

  // 1. Quantified outcome quote
  const metricLines = parsed.lines.filter((l) =>
    /(\d+(\.\d+)?%|\$\d+|\b\d+\s*(users|clients|requests|ms|seconds|engineers|students|projects|records|prs)\b|\b\d+x\b)/i.test(l) &&
    l.split(' ').length >= 6
  );

  if (metricLines.length > 0) {
    const bestQuote = metricLines[0];
    strengths.push({
      id: 'strength-quantified',
      title: 'High-impact quantified outcome',
      description: 'You paired a concrete engineering action verb with a measurable metric, proving clear business or technical value.',
      resumeQuote: bestQuote,
      section: parsed.sections['experience']?.lines.includes(bestQuote)
        ? 'Experience'
        : parsed.sections['projects']?.lines.includes(bestQuote)
        ? 'Projects'
        : 'Resume Body',
    });
  }

  // 2. Technical skill density strength
  if (parsed.extractedSkills.length >= 6) {
    strengths.push({
      id: 'strength-skills',
      title: 'Robust technical vocabulary',
      description: `Identified ${parsed.extractedSkills.length} recognized technical skills matching standard ATS dictionaries.`,
      resumeQuote: parsed.extractedSkills.slice(0, 6).join(', '),
      section: 'Skills',
    });
  }

  // 3. Indian campus or verified degree
  if (parsed.degreeMatch) {
    strengths.push({
      id: 'strength-degree',
      title: 'Standard academic degree specification',
      description: `Standard academic degree (${parsed.degreeMatch}) detected in Education section.`,
      resumeQuote: parsed.degreeMatch + (parsed.cgpaMatch ? ` with ${parsed.cgpaMatch}` : ''),
      section: 'Education',
    });
  }

  return strengths.slice(0, 4);
}

function generateConcreteWeaknesses(parsed: ParsedResume, checks: EvaluatedCheck[]): ResumeWeakness[] {
  const weaknesses: ResumeWeakness[] = [];
  const lower = parsed.rawText.toLowerCase();

  // 1. Passive phrases
  for (const phrase of PASSIVE_PHRASES) {
    if (lower.includes(phrase)) {
      const lineWithPhrase = parsed.lines.find((l) => l.toLowerCase().includes(phrase));
      if (lineWithPhrase) {
        weaknesses.push({
          id: 'weakness-passive-verb',
          title: 'Passive phrasing weakens impact',
          description: `Phrases like "${phrase}" signal assigned duties rather than proactive engineering ownership.`,
          resumeQuote: lineWithPhrase,
          section: 'Experience',
          recommendedFix: `Replace "${phrase}" with decisive verbs like "Engineered", "Architected", or "Automated".`,
        });
        break;
      }
    }
  }

  // 2. Missing metrics in experience/projects
  const taskLinesWithoutMetric = parsed.lines.filter(
    (l) =>
      /^[•⁃◦▪·\-*]/.test(l) &&
      l.split(' ').length >= 8 &&
      !/(\d+%|\$\d+|\b\d+\s*(users|clients|requests|ms|seconds|engineers|students|projects)\b)/i.test(l)
  );

  if (taskLinesWithoutMetric.length > 0 && weaknesses.length < 3) {
    weaknesses.push({
      id: 'weakness-missing-metrics',
      title: 'Task listed without quantified outcome',
      description: 'Bullet point describes an activity but omits measurable business or performance outcomes.',
      resumeQuote: taskLinesWithoutMetric[0],
      section: 'Projects',
      recommendedFix: 'Append a quantifiable outcome, such as latency reduction (ms), user scale, or efficiency gain (%).',
    });
  }

  // 3. From failing checks
  const failingChecks = checks.filter((c) => c.severity === 'fail' || c.severity === 'warn');
  failingChecks.slice(0, 3).forEach((fc) => {
    if (!weaknesses.some((w) => w.title.toLowerCase().includes(fc.name.toLowerCase()))) {
      weaknesses.push({
        id: `weakness-${fc.id}`,
        title: fc.name,
        description: fc.evidence,
        section: fc.categoryTitle,
        recommendedFix: fc.remedy,
      });
    }
  });

  return weaknesses.slice(0, 4);
}

function evaluateJobMatches(parsed: ParsedResume, overallScore: number): JobMatch[] {
  const candidateSkills = parsed.extractedSkills.map((s) => s.toLowerCase());
  const resumeTextLower = parsed.rawText.toLowerCase();

  const scoredMatches = ROLE_LIBRARY.map((role) => {
    // 1. Skill overlap score (40%)
    const allRoleSkills = [...role.requiredSkills, ...role.secondarySkills];
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];

    allRoleSkills.forEach((skill) => {
      const isMatched =
        candidateSkills.includes(skill.toLowerCase()) ||
        resumeTextLower.includes(skill.toLowerCase());

      if (isMatched) {
        if (!matchedSkills.includes(skill)) matchedSkills.push(skill);
      } else {
        if (!missingSkills.includes(skill)) missingSkills.push(skill);
      }
    });

    const reqMatchCount = role.requiredSkills.filter(
      (s) => candidateSkills.includes(s.toLowerCase()) || resumeTextLower.includes(s.toLowerCase())
    ).length;
    const reqRatio = reqMatchCount / (role.requiredSkills.length || 1);
    const secMatchCount = role.secondarySkills.filter(
      (s) => candidateSkills.includes(s.toLowerCase()) || resumeTextLower.includes(s.toLowerCase())
    ).length;
    const secRatio = secMatchCount / (role.secondarySkills.length || 1);

    const skillOverlapScore = Math.round(reqRatio * 75 + secRatio * 25);

    // 2. Project relevance score (25%)
    let projHits = 0;
    const projectsContent = (parsed.sections['projects']?.content || '').toLowerCase();
    role.projectKeywords.forEach((kw) => {
      if (projectsContent.includes(kw) || resumeTextLower.includes(kw)) projHits++;
    });
    const projectRelevanceScore = Math.min(100, Math.round((projHits / (role.projectKeywords.length || 1)) * 100));

    // 3. Education score (15%)
    let eduHits = 0;
    const eduContent = (parsed.sections['education']?.content || '').toLowerCase();
    role.educationKeywords.forEach((kw) => {
      if (eduContent.includes(kw.toLowerCase()) || resumeTextLower.includes(kw.toLowerCase())) eduHits++;
    });
    const educationScore = Math.min(100, Math.round(Math.max(50, (eduHits / (role.educationKeywords.length || 1)) * 100)));

    // 4. Experience level score (15%)
    const expLines = parsed.sections['experience']?.lines.length || 0;
    const experienceLevelScore = Math.min(100, Math.max(40, expLines * 10));

    // 5. Certification score (5%)
    const hasCerts = Boolean(parsed.sections['certifications']);
    const certificationScore = hasCerts ? 90 : 60;

    // Weighted match percentage: 40% skills, 25% projects, 15% education, 15% experience, 5% certs
    const matchPercentage = Math.round(
      skillOverlapScore * 0.40 +
      projectRelevanceScore * 0.25 +
      educationScore * 0.15 +
      experienceLevelScore * 0.15 +
      certificationScore * 0.05
    );

    const scoreBreakdown: MatchScoreInputs = {
      skillOverlapScore,
      projectRelevanceScore,
      educationScore,
      experienceLevelScore,
      certificationScore,
    };

    // Strict two-sentence explanation rule
    const sentence1 = matchedSkills.length > 0
      ? `Your background aligns with ${role.title} through demonstrated proficiency in ${matchedSkills.slice(0, 3).join(', ')}.`
      : `Your foundational profile shares initial technical intersections with the ${role.title} archetype.`;

    const sentence2 = missingSkills.length > 0
      ? `To advance candidate competitiveness, expand project evidence covering ${missingSkills.slice(0, 2).join(' and ')}.`
      : `Your project portfolio and technical skills satisfy all core requirements for this position.`;

    const explanation = `${sentence1} ${sentence2}`;

    // Personalized roadmap
    const roadmap = generatePersonalizedRoadmap(role, missingSkills, overallScore);

    return {
      roleId: role.id,
      roleTitle: role.title,
      matchPercentage: Math.max(30, Math.min(98, matchPercentage)),
      matchedSkills,
      missingSkills,
      scoreBreakdown,
      explanation,
      roadmap,
    };
  });

  // Sort descending by match percentage and return top 5
  scoredMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);
  return scoredMatches.slice(0, 5);
}

function generatePersonalizedRoadmap(
  role: RoleDefinition,
  missingSkills: string[],
  overallScore: number
): { roleId: string; roleTitle: string; totalEstimatedWeeks: number; phases: RoadmapPhase[] } {
  const baseWeeks = overallScore < 60 ? 12 : overallScore < 80 ? 8 : 6;

  const phases: RoadmapPhase[] = role.defaultPhases.map((phaseDef, idx) => {
    const phaseSkills = [...phaseDef.skills];
    // Inject candidate's actual missing skills into relevant phases
    if (idx === 0 && missingSkills.length > 0) {
      phaseSkills.push(missingSkills[0]);
    } else if (idx === 1 && missingSkills.length > 1) {
      phaseSkills.push(missingSkills[1]);
    }

    const projects = phaseDef.projectTemplates.map((proj) => ({
      title: proj.title,
      description: proj.description,
      deliverable: proj.deliverable,
      targetSkills: phaseSkills.slice(0, 3),
    }));

    return {
      id: `phase-${idx + 1}`,
      phaseNumber: idx + 1,
      title: phaseDef.title,
      timeEstimate: `Weeks ${idx * 2 + 1}-${idx * 2 + 2}`,
      focus: phaseDef.focus,
      skillsToLearn: phaseSkills,
      projectsToBuild: projects,
      milestones: phaseDef.milestones,
    };
  });

  return {
    roleId: role.id,
    roleTitle: role.title,
    totalEstimatedWeeks: baseWeeks,
    phases,
  };
}
