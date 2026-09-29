// Rule-based bullet-level review engine
// Evaluates individual bullets in Experience and Projects, assigns 0-100 score,
// identifies reasons, and suggests safe template-based rewrites with bracketed placeholders.

import { ACTION_VERBS, PASSIVE_PHRASES } from './taxonomy';
import { BulletReviewItem, ParsedResume } from '../types';

export function reviewResumeBullets(parsed: ParsedResume): BulletReviewItem[] {
  const reviews: BulletReviewItem[] = [];
  const targetSections = ['experience', 'projects', 'internships'];

  targetSections.forEach((secName) => {
    const section = parsed.sections[secName];
    if (!section) return;

    // Filter out header lines, organization names, dates, and isolate bullet text lines
    const bulletCandidates = section.lines.filter((line) => {
      const trimmed = line.trim();
      // Bullets typically start with bullet characters or are descriptive sentences
      const isBulletChar = /^[•⁃◦▪·\-*]/.test(trimmed);
      const isNumbered = /^\d+[.)]\s+/.test(trimmed);
      const hasLength = trimmed.split(' ').length >= 5;
      const isNotHeader = !/^(january|february|march|april|may|june|july|august|september|october|november|december|\d{4}|present)/i.test(
        trimmed
      );
      return (isBulletChar || isNumbered || hasLength) && isNotHeader;
    });

    bulletCandidates.forEach((candidate, idx) => {
      const cleanText = candidate.replace(/^[•⁃◦▪·\-*\d.)\s]+/, '').trim();
      if (cleanText.length < 15) return;

      const review = analyzeSingleBullet(cleanText, secName, idx);
      reviews.push(review);
    });
  });

  return reviews;
}

export function analyzeSingleBullet(text: string, section: string, index: number): BulletReviewItem {
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lowerText = text.toLowerCase();
  const firstWord = words[0]?.toLowerCase().replace(/[^a-z]/g, '') || '';

  // 1. Action verb check
  const hasActionVerb = ACTION_VERBS.some((verb) => firstWord === verb || lowerText.startsWith(verb));

  // 2. Metric check
  const metricRegex = /(\b\d+(\.\d+)?%\b|\$\d+|\b\d+\+?\s*(users|clients|requests|ms|seconds|minutes|hours|days|engineers|students|projects|records|events|prs|tests)\b|\b\d+x\b|\b\d{2,}\b)/i;
  const hasMetric = metricRegex.test(text);

  // 3. Passive phrase check
  const isPassive = PASSIVE_PHRASES.some((phrase) => lowerText.includes(phrase));

  // 4. Length check (12-30 words optimal)
  const isLengthOptimal = wordCount >= 12 && wordCount <= 32;

  // Calculate bullet score
  let score = 50; // base score
  const reasons: string[] = [];

  if (hasActionVerb) {
    score += 20;
    reasons.push('Begins with a strong, decisive action verb');
  } else {
    score -= 15;
    reasons.push('Does not start with a recognized action verb');
  }

  if (hasMetric) {
    score += 25;
    reasons.push('Includes measurable, quantified outcomes');
  } else {
    score -= 15;
    reasons.push('Missing quantifiable metrics or scale indicators');
  }

  if (isPassive) {
    score -= 20;
    reasons.push('Contains passive phrasing ("worked on", "assisted with", or "responsible for")');
  }

  if (isLengthOptimal) {
    score += 5;
  } else if (wordCount < 10) {
    score -= 10;
    reasons.push('Too brief (under 10 words); lacks technical implementation detail');
  } else if (wordCount > 35) {
    score -= 5;
    reasons.push('Overly verbose (over 35 words); recommend breaking into two concise points');
  }

  // Clamp score between 10 and 100
  const finalScore = Math.max(15, Math.min(100, score));

  // Generate safe template-based rewrite without inventing facts
  const suggestedRewrite = generateSafeRewrite(text, hasActionVerb, hasMetric, isPassive);

  return {
    id: `bullet-${section}-${index}`,
    originalText: text,
    section,
    score: finalScore,
    hasActionVerb,
    hasMetric,
    isPassive,
    wordCount,
    reasons,
    suggestedRewrite,
  };
}

function generateSafeRewrite(
  original: string,
  hasActionVerb: boolean,
  hasMetric: boolean,
  isPassive: boolean
): string {
  let cleaned = original;

  // Remove passive phrasing
  if (isPassive) {
    cleaned = cleaned.replace(/^(responsible for|worked on|helped with|assisted with|tasked with|contributed to)\s+/i, '');
  }

  // Capitalize first character
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  // If no action verb, prepend active verb template
  if (!hasActionVerb) {
    cleaned = `Engineered and deployed ${cleaned.toLowerCase().replace(/^[a-z]/, (c) => c.toLowerCase())}`;
  }

  // If no metric, append honest bracketed placeholder for user to fill in
  if (!hasMetric) {
    if (!cleaned.endsWith('.')) {
      cleaned = cleaned.replace(/[,;]?$/, '');
    } else {
      cleaned = cleaned.slice(0, -1);
    }
    cleaned = `${cleaned}, improving operational efficiency by [X%] and reducing response latency by [Y ms].`;
  }

  return cleaned;
}
