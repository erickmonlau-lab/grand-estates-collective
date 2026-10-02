import { execSync } from 'child_process';
import fs from 'fs';

const runs = 10;
const results = [];

console.log('--- INICIANDO BENCHMARK DE VARIANTE B (CSS EXTERNO: inlineCss: false) ---');

for (let i = 1; i <= runs; i++) {
  console.log(`\n========================================`);
  console.log(`Ejecutando Lighthouse Móvil Variante B Run ${i}/${runs}...`);
  console.log(`========================================`);
  const jsonPath = `lh-variante-b-run-${i}.json`;
  const cmd = `npx lighthouse https://gesgrama.com/ --only-categories=performance --output=json --output-path=${jsonPath} --chrome-flags="--headless=new --no-sandbox"`;
  try {
    try {
      execSync(cmd, { stdio: 'ignore' });
    } catch (e) {
      if (!fs.existsSync(jsonPath)) {
        throw e;
      }
    }
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const audits = data.audits;
    const score = Math.round((data.categories?.performance?.score || 0) * 100);
    const fcp = audits['first-contentful-paint']?.numericValue || 0;
    const lcp = audits['largest-contentful-paint']?.numericValue || 0;
    const si = audits['speed-index']?.numericValue || 0;
    const tbt = audits['total-blocking-time']?.numericValue || 0;
    const cls = audits['cumulative-layout-shift']?.numericValue || 0;

    const items = audits['lcp-breakdown-insight']?.details?.items?.[0]?.items || [];
    const map = {};
    items.forEach(it => map[it.subpart] = it.duration);

    const ttfb = map.timeToFirstByte || 0;
    const loadDelay = map.resourceLoadDelay || 0;
    const loadDuration = map.resourceLoadDuration || 0;
    const renderDelay = map.elementRenderDelay || 0;

    const classification = renderDelay > 1000 ? 'OUTLIER (>1000ms)' : (renderDelay < 500 ? 'EXCELLENT (<500ms)' : 'ACCEPTABLE (<1000ms)');

    const res = { run: i, score, fcp, lcp, si, tbt, cls, ttfb, loadDelay, loadDuration, renderDelay, classification };
    results.push(res);
    console.log(`[Run ${i}] Score=${score} | LCP=${Math.round(lcp)}ms | FCP=${Math.round(fcp)}ms | RenderDelay=${Math.round(renderDelay)}ms | LoadDelay=${Math.round(loadDelay)}ms | LoadDur=${Math.round(loadDuration)}ms | TBT=${Math.round(tbt)}ms | CLS=${cls.toFixed(4)}`);
  } catch (err) {
    console.error(`Error en Run ${i}:`, err.message);
  }
}

// Estadísticas agregadas
const scores = results.map(r => r.score).sort((a,b) => a - b);
const lcps = results.map(r => r.lcp).sort((a,b) => a - b);
const fcps = results.map(r => r.fcp).sort((a,b) => a - b);
const renderDelays = results.map(r => r.renderDelay).sort((a,b) => a - b);
const loadDelays = results.map(r => r.loadDelay).sort((a,b) => a - b);
const loadDurs = results.map(r => r.loadDuration).sort((a,b) => a - b);

const median = arr => arr[Math.floor(arr.length / 2)];
const mean = arr => Math.round(arr.reduce((acc, v) => acc + v, 0) / arr.length);
const p90 = arr => arr[Math.floor(arr.length * 0.9)];

const summary = {
  totalRuns: results.length,
  scores: { min: scores[0], median: median(scores), mean: mean(scores), max: scores[scores.length-1] },
  fcp: { min: Math.round(fcps[0]), median: Math.round(median(fcps)), mean: mean(fcps), p90: Math.round(p90(fcps)), max: Math.round(fcps[fcps.length-1]) },
  lcp: { min: Math.round(lcps[0]), median: Math.round(median(lcps)), mean: mean(lcps), p90: Math.round(p90(lcps)), max: Math.round(lcps[lcps.length-1]) },
  renderDelay: { min: Math.round(renderDelays[0]), median: Math.round(median(renderDelays)), mean: mean(renderDelays), p90: Math.round(p90(renderDelays)), max: Math.round(renderDelays[renderDelays.length-1]) },
  loadDelay: { min: Math.round(loadDelays[0]), median: Math.round(median(loadDelays)), mean: mean(loadDelays), p90: Math.round(p90(loadDelays)), max: Math.round(loadDelays[loadDelays.length-1]) },
  loadDuration: { min: Math.round(loadDurs[0]), median: Math.round(median(loadDurs)), mean: mean(loadDurs), p90: Math.round(p90(loadDurs)), max: Math.round(loadDurs[loadDurs.length-1]) },
  runs: results
};

fs.writeFileSync('lh-variante-b-summary.json', JSON.stringify(summary, null, 2));

console.log('\n======================================================');
console.log('--- RESUMEN FINAL VARIANTE B (10 EJECUCIONES MÓVILES) ---');
console.log('======================================================');
console.log(`Scores: min=${summary.scores.min} | mediana=${summary.scores.median} | media=${summary.scores.mean} | max=${summary.scores.max}`);
console.log(`FCP: min=${summary.fcp.min}ms | mediana=${summary.fcp.median}ms | media=${summary.fcp.mean}ms | p90=${summary.fcp.p90}ms`);
console.log(`LCP: min=${summary.lcp.min}ms | mediana=${summary.lcp.median}ms | media=${summary.lcp.mean}ms | p90=${summary.lcp.p90}ms`);
console.log(`LCP Element Render Delay: min=${summary.renderDelay.min}ms | mediana=${summary.renderDelay.median}ms | media=${summary.renderDelay.mean}ms | p90=${summary.renderDelay.p90}ms`);
console.log(`LCP Resource Load Delay: min=${summary.loadDelay.min}ms | mediana=${summary.loadDelay.median}ms | media=${summary.loadDelay.mean}ms | p90=${summary.loadDelay.p90}ms`);
console.log(`LCP Resource Load Duration: min=${summary.loadDuration.min}ms | mediana=${summary.loadDuration.median}ms | media=${summary.loadDuration.mean}ms`);
console.log('======================================================');
