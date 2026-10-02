import { execSync } from 'child_process';
import fs from 'fs';

const runs = 10;
const results = [];

console.log('--- INICIANDO FASE 11: 10 MEDICIONES MÓVILES DE VERIFICACIÓN TRAS ELIMINAR CONTENCIÓN DE COMPOSITOR ---');

for (let i = 1; i <= runs; i++) {
  console.log(`\n========================================`);
  console.log(`Ejecutando Lighthouse Móvil Run ${i}/${runs}...`);
  console.log(`========================================`);
  const jsonPath = `lh-phase11-run-${i}.json`;
  const cmd = `npx lighthouse https://gesgrama.com/ --only-categories=performance --output=json --output-path=${jsonPath} --chrome-flags="--headless=new --no-sandbox"`;
  try {
    try {
      execSync(cmd, { stdio: 'ignore' });
    } catch (e) {
      // En Windows, Lighthouse a veces lanza EPERM al limpiar el directorio temporal después de haber escrito el JSON
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

    const classification = renderDelay > 1000 ? 'BAD RUN (>1000ms OUTLIER)' : (renderDelay < 500 ? 'EXCELLENT (<500ms)' : 'ACCEPTABLE (<1000ms)');

    const res = { run: i, score, fcp, lcp, si, tbt, cls, ttfb, loadDelay, loadDuration, renderDelay, classification };
    results.push(res);
    console.log(`[Run ${i}] Score=${score} | LCP=${Math.round(lcp)}ms | RenderDelay=${Math.round(renderDelay)}ms (${classification}) | LoadDelay=${Math.round(loadDelay)}ms | LoadDur=${Math.round(loadDuration)}ms | FCP=${Math.round(fcp)}ms | TBT=${Math.round(tbt)}ms | CLS=${cls.toFixed(4)}`);
  } catch (err) {
    console.error(`Error en Run ${i}:`, err.message);
  }
}

// Estadísticas agregadas
const renderDelays = results.map(r => r.renderDelay).sort((a,b) => a - b);
const scores = results.map(r => r.score).sort((a,b) => a - b);
const lcps = results.map(r => r.lcp).sort((a,b) => a - b);

const median = arr => arr[Math.floor(arr.length / 2)];
const mean = arr => Math.round(arr.reduce((acc, v) => acc + v, 0) / arr.length);
const p90 = arr => arr[Math.floor(arr.length * 0.9)];
const p95 = arr => arr[Math.floor(arr.length * 0.95)];

const summary = {
  totalRuns: results.length,
  elementRenderDelay: {
    min: Math.round(renderDelays[0]),
    max: Math.round(renderDelays[renderDelays.length - 1]),
    mean: mean(renderDelays),
    median: Math.round(median(renderDelays)),
    p90: Math.round(p90(renderDelays)),
    p95: Math.round(p95(renderDelays)),
    outliersAbove1000ms: renderDelays.filter(v => v > 1000).length
  },
  performanceScore: {
    min: scores[0],
    max: scores[scores.length - 1],
    mean: mean(scores),
    median: median(scores)
  },
  lcp: {
    min: Math.round(lcps[0]),
    max: Math.round(lcps[lcps.length - 1]),
    mean: mean(lcps),
    median: Math.round(median(lcps))
  },
  runs: results
};

fs.writeFileSync('lh-phase11-verification-summary.json', JSON.stringify(summary, null, 2));
console.log('\n========================================');
console.log('RESUMEN ESTADÍSTICO DE 10 RUNS:');
console.log('========================================');
console.log(JSON.stringify(summary, null, 2));
