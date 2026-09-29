// High-accuracy resume parsing engine with hierarchical section parser
// Extracts clean text, identifies sections, skills, metrics, education, and bullet points

import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import { COMMON_SKILLS_LIST, SKILL_SYNONYMS } from './taxonomy';
import { ParsedResume, ParsedResumeSection } from '../types';

// Set up PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

// Comprehensive section header regex patterns with tolerance for markdown, numbering, and trailing punctuation
const SECTION_PATTERNS: { name: string; regex: RegExp }[] = [
  {
    name: 'education',
    regex: /^([#*\s\-_>0-9.]*)\b(education|academic background|academics|academic history|degrees?|qualifications|university|schooling|educational qualifications)\b[:\s\-]*$/i,
  },
  {
    name: 'experience',
    regex: /^([#*\s\-_>0-9.]*)\b(experience|work experience|employment|professional experience|work history|internships?|relevant experience|practical experience|industry experience|employment history)\b[:\s\-]*$/i,
  },
  {
    name: 'projects',
    regex: /^([#*\s\-_>0-9.]*)\b(projects?|personal projects|technical projects|academic projects|key projects|software projects|open source projects?|selected projects|capstone projects?)\b[:\s\-]*$/i,
  },
  {
    name: 'skills',
    regex: /^([#*\s\-_>0-9.]*)\b(skills?|technical skills|technologies|core competencies|tools & technologies|proficiencies|areas of expertise|programming skills|technical stack|technical competencies|skills & proficiencies)\b[:\s\-]*$/i,
  },
  {
    name: 'certifications',
    regex: /^([#*\s\-_>0-9.]*)\b(certifications?|licenses?|credentials?|certificates?|courses?|accreditations?|online courses?)\b[:\s\-]*$/i,
  },
  {
    name: 'summary',
    regex: /^([#*\s\-_>0-9.]*)\b(summary|professional summary|executive summary|about me|profile|objective|career objective|introduction)\b[:\s\-]*$/i,
  },
  {
    name: 'leadership',
    regex: /^([#*\s\-_>0-9.]*)\b(leadership|volunteer|extracurricular|involvement|activities|community service|leadership experience|positions of responsibility)\b[:\s\-]*$/i,
  },
  {
    name: 'awards',
    regex: /^([#*\s\-_>0-9.]*)\b(awards?|honors?|achievements?|scholarships?|recognitions?|hackathons?)\b[:\s\-]*$/i,
  },
];

export async function parseResumeFile(file: File): Promise<ParsedResume> {
  const fileType = file.name.split('.').pop()?.toLowerCase();
  let rawText = '';

  if (fileType === 'pdf') {
    rawText = await extractTextFromPdf(file);
  } else if (fileType === 'docx') {
    rawText = await extractTextFromDocx(file);
  } else {
    rawText = await file.text();
  }

  return parseResumeText(rawText);
}

export async function extractTextFromPdf(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
      useSystemFonts: true,
    });
    const pdf = await loadingTask.promise;
    const pageTexts: string[] = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const items = textContent.items as Array<{ str?: string; hasEOL?: boolean }>;

      let pageText = '';
      for (const item of items) {
        if (item.str) {
          pageText += item.str;
        }
        if (item.hasEOL) {
          pageText += '\n';
        } else {
          pageText += ' ';
        }
      }
      pageTexts.push(pageText);
    }

    const fullText = pageTexts.join('\n\n');
    return sanitizeText(fullText);
  } catch (error) {
    console.error('PDF parsing error:', error);
    return await fallbackBinaryPdfExtract(file);
  }
}

async function fallbackBinaryPdfExtract(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let text = '';
  let inStream = false;
  let streamData = '';

  for (let i = 0; i < bytes.length; i++) {
    const char = String.fromCharCode(bytes[i]);
    streamData += char;
    if (streamData.endsWith('stream')) {
      inStream = true;
      streamData = '';
    } else if (streamData.endsWith('endstream')) {
      inStream = false;
      streamData = '';
    } else if (inStream && bytes[i] >= 32 && bytes[i] <= 126) {
      text += char;
    }
  }

  return sanitizeText(text);
}

export async function extractTextFromDocx(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return sanitizeText(result.value);
  } catch (error) {
    console.error('DOCX parsing error:', error);
    throw new Error('Unable to parse DOCX file. Please verify the document is not corrupted or password-protected.');
  }
}

export function sanitizeText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();
}

/**
 * Structural Regex Fallback Parser:
 * Splits arbitrary resume text into hierarchical blocks using boundary regexes
 * even when layout contains multiple spaces or non-standard newlines.
 */
function parseHierarchicalSections(lines: string[]): Record<string, ParsedResumeSection> {
  const sections: Record<string, ParsedResumeSection> = {};
  let currentSectionName = 'header';
  let currentSectionLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let matchedSection = '';

    // Check candidate section header
    const stripped = line.replace(/^[#*\s\-_>0-9.]+\s*/, '').replace(/[:\s]+$/, '').trim();

    // Check short lines or uppercase headers
    if (stripped.length >= 3 && stripped.length <= 45) {
      for (const pattern of SECTION_PATTERNS) {
        if (pattern.regex.test(line) || pattern.regex.test(stripped)) {
          matchedSection = pattern.name;
          break;
        }
      }
    }

    if (matchedSection) {
      if (currentSectionLines.length > 0) {
        sections[currentSectionName] = {
          title: currentSectionName,
          content: currentSectionLines.join('\n'),
          lines: [...currentSectionLines],
        };
      }
      currentSectionName = matchedSection;
      currentSectionLines = [];
    } else {
      currentSectionLines.push(line);
    }
  }

  if (currentSectionLines.length > 0) {
    sections[currentSectionName] = {
      title: currentSectionName,
      content: currentSectionLines.join('\n'),
      lines: [...currentSectionLines],
    };
  }

  // Fallback: If 'skills' wasn't isolated cleanly, search body lines for skills keywords
  if (!sections['skills']) {
    const skillLines = lines.filter((l) =>
      /^(programming\s+languages?|languages?|frameworks?|libraries|developer\s+tools?|tools?|databases?|technologies)\s*[:\-]/i.test(l)
    );
    if (skillLines.length > 0) {
      sections['skills'] = {
        title: 'skills',
        content: skillLines.join('\n'),
        lines: skillLines,
      };
    }
  }

  return sections;
}

export function parseResumeText(rawText: string): ParsedResume {
  const sanitized = sanitizeText(rawText);
  const isScannedOrImageOnly = sanitized.trim().length < 40;

  // Split into clean lines while normalizing bullets
  const rawLines = sanitized.split('\n');
  const lines = rawLines
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const wordCount = sanitized
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter((w) => w.length > 0).length;

  const characterCount = sanitized.length;

  // Contact info extraction
  const emailMatch = sanitized.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  const detectedEmail = emailMatch ? emailMatch[1].trim() : undefined;

  // International and Indian mobile numbers (+91, +1, dashes, dots, spaces)
  const phoneMatch = sanitized.match(/(\+?\d{1,4}[-.\s]?)?\(?\d{2,5}\)?[-.\s]?\d{3,5}[-.\s]?\d{3,5}/);
  const detectedPhone = phoneMatch ? phoneMatch[0].trim() : undefined;

  // Online profiles
  const detectedLinks: string[] = [];
  const linkMatches = sanitized.match(
    /(linkedin\.com\/in\/[a-zA-Z0-9_-]+|github\.com\/[a-zA-Z0-9_-]+|gitlab\.com\/[a-zA-Z0-9_-]+|kaggle\.com\/[a-zA-Z0-9_-]+|leetcode\.com\/[a-zA-Z0-9_-]+|[a-zA-Z0-9_-]+\.(dev|io|me|app)|https?:\/\/[^\s]+)/gi
  );
  if (linkMatches) {
    linkMatches.forEach((l) => {
      const clean = l.replace(/[),;]+$/, '').toLowerCase();
      if (!detectedLinks.includes(clean) && !clean.includes('@')) {
        detectedLinks.push(clean);
      }
    });
  }

  // Candidate Name
  let detectedName: string | undefined;
  for (let i = 0; i < Math.min(lines.length, 5); i++) {
    const candidate = lines[i]
      .replace(/^[#*\s\-_>]+/, '')
      .replace(/[|•·].*$/, '')
      .trim();

    if (
      !candidate.includes('@') &&
      !candidate.includes('http') &&
      !candidate.includes('.com') &&
      !candidate.includes('.edu') &&
      !candidate.includes('Curriculum') &&
      !candidate.includes('Resume') &&
      candidate.split(' ').length >= 2 &&
      candidate.split(' ').length <= 4 &&
      candidate.length >= 3 &&
      candidate.length < 40
    ) {
      detectedName = candidate;
      break;
    }
  }

  // Hierarchical sectioning with fallback
  const sections = parseHierarchicalSections(lines);

  // High-accuracy AI/ML and general technical skills extraction
  const lowerText = sanitized.toLowerCase();
  const extractedSkills: string[] = [];

  // 1. Synonym-based canonical skill matches
  for (const [canonicalSkill, synonyms] of Object.entries(SKILL_SYNONYMS)) {
    const found = synonyms.some((synonym) => {
      const escaped = synonym.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Support word boundary or punctuation boundary (e.g. AI/ML, C++)
      const regex = new RegExp(`(^|[^a-zA-Z0-9_#+])${escaped}([^a-zA-Z0-9_#+]|$)`, 'i');
      return regex.test(lowerText);
    });

    if (found) {
      const proper = COMMON_SKILLS_LIST.find((s) => s.toLowerCase() === canonicalSkill) || canonicalSkill;
      if (!extractedSkills.includes(proper)) {
        extractedSkills.push(proper);
      }
    }
  }

  // 2. Direct COMMON_SKILLS_LIST matches
  COMMON_SKILLS_LIST.forEach((skill) => {
    const escaped = skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-zA-Z0-9_#+])${escaped}([^a-zA-Z0-9_#+]|$)`, 'i');
    if (regex.test(lowerText) && !extractedSkills.includes(skill)) {
      extractedSkills.push(skill);
    }
  });

  // Explicit AI/ML phrases check
  if (
    /ai[\s/_-]*ml|machine\s+learning|artificial\s+intelligence|deep\s+learning|neural\s+networks?|pytorch|tensorflow|scikit-learn|computer\s+vision|nlp/i.test(
      sanitized
    )
  ) {
    if (!extractedSkills.includes('Machine Learning')) {
      extractedSkills.push('Machine Learning');
    }
    if (!extractedSkills.includes('Artificial Intelligence')) {
      extractedSkills.push('Artificial Intelligence');
    }
  }

  // Quantified metrics count
  const metricRegex = /(\b\d+(\.\d+)?%\b|\$\d+([,\.]\d+)?\b|\b\d+\+?\s*(users|clients|requests|qps|ms|seconds|minutes|hours|days|weeks|engineers|students|projects|endpoints|records|events|commits|prs|tests)\b|\b\d+([kmgb])\+?\b|\b\d+x\b|\b\d{2,}\b)/gi;
  const metricsFound = sanitized.match(metricRegex);
  const quantifiedMetricsCount = metricsFound ? metricsFound.length : 0;

  // Indian campus and global degree match
  let degreeMatch: string | undefined;
  const degreeRegex = /\b(b\.?tech|b\.?e\.?|m\.?tech|m\.?e\.?|bca|mca|b\.?sc|m\.?sc|bachelor\s+of\s+technology|bachelor\s+of\s+engineering|master\s+of\s+technology|b\.?s\.?|m\.?s\.?|ph\.?d)\b/i;
  const degreeFound = sanitized.match(degreeRegex);
  if (degreeFound) {
    degreeMatch = degreeFound[0].toUpperCase();
  }

  // CGPA or percentage detection (e.g. 8.8/10, 8.8 CGPA, 85%)
  let cgpaMatch: string | undefined;
  const cgpaRegex = /\b(\d+(\.\d+)?\s*\/\s*10(\.0)?|\d+(\.\d+)?\s*cgpa|\d+(\.\d+)?\s*\/\s*4(\.0)?|\b(6[5-9]|[7-9]\d|100)%\b)/i;
  const cgpaFound = sanitized.match(cgpaRegex);
  if (cgpaFound) {
    cgpaMatch = cgpaFound[0];
  }

  // Layout structure check
  const hasMultipleTabs = rawLines.filter((l) => (l.match(/\t/g) || []).length >= 2).length > 2;
  const hasSpacedColumns = rawLines.filter((l) => (l.match(/ {4,}/g) || []).length >= 2).length > 3;
  const hasTablesOrColumnsWarning = hasMultipleTabs || hasSpacedColumns;

  return {
    rawText: sanitized,
    lines,
    wordCount,
    characterCount,
    detectedName,
    detectedEmail,
    detectedPhone,
    detectedLinks,
    sections,
    extractedSkills,
    quantifiedMetricsCount,
    hasTablesOrColumnsWarning,
    isScannedOrImageOnly,
    degreeMatch,
    cgpaMatch,
  };
}
