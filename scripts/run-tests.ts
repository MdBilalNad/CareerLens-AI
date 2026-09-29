import { runAllTests } from '../src/tests/scoringEngine.test';

console.log('Running CareerLens test suite...\n');
const summary = runAllTests();

summary.results.forEach((r, idx) => {
  const icon = r.success ? 'PASS' : 'FAIL';
  console.log(`[${icon}] Test ${idx + 1}: ${r.name}`);
  if (!r.success && r.details) {
    console.log(`       Details: ${r.details}`);
  }
});

console.log(`\nResults: ${summary.passed} passed, ${summary.failed} failed.`);

if (summary.failed > 0) {
  process.exit(1);
} else {
  console.log('All unit and integration tests passed successfully.');
}
