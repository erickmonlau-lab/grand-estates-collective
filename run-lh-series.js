import { execSync } from 'child_process';
import fs from 'fs';

const runs = 5;
const results = [];

console.log('Starting 5 consecutive Lighthouse mobile audits on https://gesgrama.com/ ...');

for (let i = 1; i <= runs; i++) {
  console.log(`\n========================================`);
  console.log(`Running audit ${i}/${runs}...`);
  console.log(`========================================`);
  const jsonPath = `lh-run-${i}.json`;
  // Default in lighthouse is mobile formFactor when preset is omitted!
  const cmd = `npx lighthouse https://gesgrama.com/ --only-categories=performance --output=json --output-path=${jsonPath} --chrome-flags="--headless=new --no-sandbox"`;
  try {
    execSync(cmd, { stdio: 'inherit' });
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const audits = data.audits;
    const score = Math.round((data.categories.performance.score || 0) * 100);
    const fcp = audits['first-contentful-paint']?.numericValue || 0;
    const lcp = audits['largest-contentful-paint']?.numericValue || 0;
    const si = audits['speed-index']?.numericValue || 0;
    const tbt = audits['total-blocking-time']?.numericValue || 0;
    const cls = audits['cumulative-layout-shift']?.numericValue || 0;

    const breakdown = audits['lcp-breakdown']?.details?.items?.[0] || {};
    const ttfb = breakdown.ttfb || 0;
    const loadDelay = breakdown.loadDelay || 0;
    const loadDuration = breakdown.loadDuration || 0;
    const renderDelay = breakdown.renderDelay || 0;

    const res = { run: i, score, fcp, lcp, si, tbt, cls, ttfb, loadDelay, loadDuration, renderDelay };
    results.push(res);
    console.log(`>>> RESULT Run ${i}: Score=${score} | LCP=${Math.round(lcp)}ms (TTFB: ${Math.round(ttfb)}ms, LoadDelay: ${Math.round(loadDelay)}ms, LoadDur: ${Math.round(loadDuration)}ms, RenderDelay: ${Math.round(renderDelay)}ms) | FCP=${Math.round(fcp)}ms | SI=${Math.round(si)}ms | TBT=${Math.round(tbt)}ms | CLS=${cls.toFixed(3)}`);
  } catch (err) {
    console.error(`Error on run ${i}:`, err.message);
  }
}

fs.writeFileSync('lh-stability-results.json', JSON.stringify(results, null, 2));
console.log('\nAll 5 audits completed successfully!');
