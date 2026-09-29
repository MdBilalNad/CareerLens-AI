// Targeted Job Description matcher engine
// Compares candidate resume text against a target job description,
// extracts keywords, computes tailoring score, suggests honest placements,
// and issues warnings against keyword stuffing.

import { COMMON_SKILLS_LIST, SKILL_SYNONYMS } from './taxonomy';
import { MissingKeywordItem, ParsedResume, TargetedJobAnalysis } from '../types';

export function matchResumeToJobDescription(
  resume: ParsedResume,
  jobDescriptionText: string,
  targetJobTitle?: string
): TargetedJobAnalysis {
  const jdLower = jobDescriptionText.toLowerCase();
  const resumeLower = resume.rawText.toLowerCase();

  // Extract skills present in JD
  const jdKeywords: string[] = [];

  COMMON_SKILLS_LIST.forEach((skill) => {
    const escaped = skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-zA-Z0-9_#+])${escaped}([^a-zA-Z0-9_#+]|$)`, 'i');
    if (regex.test(jdLower) && !jdKeywords.includes(skill)) {
      jdKeywords.push(skill);
    }
  });

  for (const [canonicalSkill, synonyms] of Object.entries(SKILL_SYNONYMS)) {
    const found = synonyms.some((synonym) => {
      const escaped = synonym.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|[^a-zA-Z0-9_#+])${escaped}([^a-zA-Z0-9_#+]|$)`, 'i');
      return regex.test(jdLower);
    });

    if (found) {
      const proper = COMMON_SKILLS_LIST.find((s) => s.toLowerCase() === canonicalSkill) || canonicalSkill;
      if (!jdKeywords.includes(proper)) {
        jdKeywords.push(proper);
      }
    }
  }

  // Intersect with resume skills
  const matchedKeywords: string[] = [];
  const missingKeywords: MissingKeywordItem[] = [];

  jdKeywords.forEach((kw) => {
    const inResume = resume.extractedSkills.some((s) => s.toLowerCase() === kw.toLowerCase()) ||
      resumeLower.includes(kw.toLowerCase());

    if (inResume) {
      matchedKeywords.push(kw);
    } else {
      // Recommend honest section placement based on tool category
      let recommendedSection = 'Technical Skills';
      let contextTip = 'Mention this tool inside your technical skills inventory.';

      if (['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Git'].includes(kw)) {
        recommendedSection = 'Projects & Tools';
        contextTip = `Describe how you deployed or automated containerized workflows with ${kw} in a project.`;
      } else if (['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'SQL'].includes(kw)) {
        recommendedSection = 'Technical Skills (Languages)';
        contextTip = `List ${kw} under Languages and back it up with at least one project repository.`;
      } else if (['React', 'Node.js', 'FastAPI', 'Spring Boot', 'Next.js'].includes(kw)) {
        recommendedSection = 'Projects & Experience';
        contextTip = `Highlight where you built or consumed APIs using ${kw}.`;
      } else if (['Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Scikit-Learn'].includes(kw)) {
        recommendedSection = 'Technical Projects';
        contextTip = `Include a dedicated technical project with ${kw} demonstrating model evaluation metrics.`;
      }

      missingKeywords.push({
        keyword: kw,
        recommendedSection,
        contextTip,
      });
    }
  });

  // Tailoring score calculation
  const totalRelevant = jdKeywords.length || 1;
  const matchRatio = matchedKeywords.length / totalRelevant;
  const tailoringScore = Math.min(100, Math.max(20, Math.round(matchRatio * 100)));

  // Unsupported keywords warning (keywords that appear in resume skills section but have 0 mentions in projects or experience)
  const unsupportedKeywordsWarning: string[] = [];
  const projectAndExpText = (
    (resume.sections['projects']?.content || '') + ' ' + (resume.sections['experience']?.content || '')
  ).toLowerCase();

  resume.extractedSkills.forEach((skill) => {
    const escaped = skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const inBody = new RegExp(`(^|[^a-zA-Z0-9_#+])${escaped}([^a-zA-Z0-9_#+]|$)`, 'i').test(projectAndExpText);
    if (!inBody) {
      unsupportedKeywordsWarning.push(skill);
    }
  });

  return {
    jobTitle: targetJobTitle || 'Target Job Description Match',
    tailoringScore,
    matchedKeywords,
    missingKeywords,
    unsupportedKeywordsWarning: unsupportedKeywordsWarning.slice(0, 5),
  };
}
