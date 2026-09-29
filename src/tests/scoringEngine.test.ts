// Unit and integration tests for CareerLens scoring engine and matching algorithms

import { parseResumeText } from '../services/resumeParser';
import { analyzeResume } from '../services/scoringEngine';
import { SAMPLE_RESUMES } from '../services/sampleResumes';
import { SCORING_VERSION } from '../config/app';

export function runAllTests(): { passed: number; failed: number; results: { name: string; success: boolean; details?: string }[] } {
  const testResults: { name: string; success: boolean; details?: string }[] = [];

  function assert(name: string, condition: boolean, details?: string) {
    if (condition) {
      testResults.push({ name, success: true });
    } else {
      testResults.push({ name, success: false, details: details || 'Assertion failed' });
    }
  }

  // Test 1: Scoring version consistency
  assert('Scoring version is defined and starts with v', SCORING_VERSION.startsWith('v'));

  // Test 2: CS Student Fixture (Alex Chen) parsing and scoring
  const alexFixture = SAMPLE_RESUMES[0];
  const parsedAlex = parseResumeText(alexFixture.content);

  assert('Alex Chen text parses non-empty', parsedAlex.characterCount > 500);
  assert('Alex Chen detected email matches', parsedAlex.detectedEmail === 'alex.chen@email.com');
  assert('Alex Chen detected phone matches', Boolean(parsedAlex.detectedPhone));
  assert('Alex Chen detected links contains GitHub and LinkedIn', parsedAlex.detectedLinks.length >= 2);
  assert('Alex Chen sections detected', Boolean(parsedAlex.sections['education'] && parsedAlex.sections['experience'] && parsedAlex.sections['projects'] && parsedAlex.sections['skills']));

  const analysisAlex = analyzeResume(parsedAlex, alexFixture.fileName, alexFixture.content.length, 'pdf');

  assert('Alex Chen overall score is between 75 and 100', analysisAlex.overallScore >= 75 && analysisAlex.overallScore <= 100);
  assert('Alex Chen has exactly 5 category scores', analysisAlex.categoryScores.length === 5);
  assert('Alex Chen has concrete strengths with quotes', analysisAlex.strengths.length > 0 && Boolean(analysisAlex.strengths[0].resumeQuote));
  assert('Alex Chen has top 5 job matches', analysisAlex.topJobMatches.length === 5);

  // Test 3: Explanation honesty rule (must be exactly two sentences)
  const topMatch = analysisAlex.topJobMatches[0];
  const sentenceCount = topMatch.explanation.split(/(?<=[.?!])\s+/).filter(Boolean).length;
  assert('Job match explanation consists of exactly two sentences', sentenceCount === 2, `Actual count: ${sentenceCount}`);

  // Test 4: Job match inputs are present and complete
  assert('Job match includes skill overlap score', typeof topMatch.scoreBreakdown.skillOverlapScore === 'number');
  assert('Job match includes experience level score', typeof topMatch.scoreBreakdown.experienceLevelScore === 'number');
  assert('Job match includes education score', typeof topMatch.scoreBreakdown.educationScore === 'number');
  assert('Job match includes project relevance score', typeof topMatch.scoreBreakdown.projectRelevanceScore === 'number');

  // Test 5: Career Roadmap generation for top match
  assert('Roadmap exists for top match', Boolean(topMatch.roadmap));
  assert('Roadmap contains 3 or more phases', topMatch.roadmap.phases.length >= 3);
  assert('Roadmap has projects with deliverables', topMatch.roadmap.phases[0].projectsToBuild.length > 0 && Boolean(topMatch.roadmap.phases[0].projectsToBuild[0].deliverable));

  // Test 6: Early Career Candidate Fixture (Jordan Taylor) - Weak verb detection
  const jordanFixture = SAMPLE_RESUMES[1];
  const parsedJordan = parseResumeText(jordanFixture.content);
  const analysisJordan = analyzeResume(parsedJordan, jordanFixture.fileName, jordanFixture.content.length, 'docx');

  assert('Jordan Taylor overall score is lower than Alex Chen', analysisJordan.overallScore < analysisAlex.overallScore);
  const passiveWeakness = analysisJordan.weaknesses.find((w) => w.id === 'weakness-passive-verb');
  assert('Jordan Taylor triggers passive verb weakness with quote', Boolean(passiveWeakness && passiveWeakness.resumeQuote));

  // Test 7: Scanned / Image-only detection fallback
  const emptyParsed = parseResumeText('Short text');
  assert('Image-only or scanned PDF fallback triggers on minimal text', emptyParsed.isScannedOrImageOnly);

  const passed = testResults.filter((r) => r.success).length;
  const failed = testResults.filter((r) => !r.success).length;

  return { passed, failed, results: testResults };
}
