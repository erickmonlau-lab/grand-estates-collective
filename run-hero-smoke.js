import { execSync } from 'child_process';
import fs from 'fs';

const runs = 5;
const results = [];

console.log('=== SMOKE BENCHMARK LIGHTHOUSE MÓVIL (PROD: HERO 480x738 +3.4KB) ===');

for (let i = 1; i <= runs; i++) {
  const jsonPath = `lh-hero-smoke-${i}.json`;
  const cmd = `npx lighthouse https://gesgrama.com/ --only-categories=performance --output=json --output-path=${jsonPath} --chrome-flags="--headless=new --no-sandbox"`;
  try {
    try {
      execSync(cmd, { stdio: 'ignore' });
    } catch (e) {
      if (!fs.existsSync(jsonPath)) throw e;
    }
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const audits = data.audits;
    const score = Math.round((data.categories?.performance?.score || 0) * 100);
    const fcp = Math.round(audits['first-contentful-paint']?.numericValue || 0);
    const lcp = Math.round(audits['largest-contentful-paint']?.numericValue || 0);
    const si = Math.round(audits['speed-index']?.numericValue || 0);
    const tbt = Math.round(audits['total-blocking-time']?.numericValue || 0);
    const cls = audits['cumulative-layout-shift']?.numericValue || 0;
    const ttfb = Math.round(audits['server-response-time']?.numericValue || 0);

    const items = audits['lcp-breakdown-insight']?.details?.items?.[0]?.items || [];
    const map = {};
    items.forEach(it => map[it.subpart] = it.duration);

    const loadDelay = Math.round(map.resourceLoadDelay || 0);
    const loadDuration = Math.round(map.resourceLoadDuration || 0);
    const renderDelay = Math.round(map.elementRenderDelay || 0);

    const res = { run: i, score, fcp, lcp, si, tbt, cls: Number(cls.toFixed(4)), ttfb, loadDelay, loadDuration, renderDelay };
    results.push(res);
    console.log(`[Run ${i}] Score=${score} | FCP=${fcp}ms | LCP=${lcp}ms | SI=${si}ms | TBT=${tbt}ms | CLS=${res.cls} | TTFB=${ttfb}ms | LoadDelay=${loadDelay}ms | RenderDelay=${renderDelay}ms`);
  } catch (err) {
    console.error(`Error en Run ${i}:`, err.message);
  }
}

const median = arr => {
  const sorted = [...arr].sort((a,b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
};

if (results.length > 0) {
  console.log('\n========================================');
  console.log('RESUMEN SMOKE TEST HERO MEJORADO');
  console.log('========================================');
  console.log(`Mediana Performance: ${median(results.map(r => r.score))}`);
  console.log(`Mediana FCP:         ${median(results.map(r => r.fcp))} ms`);
  console.log(`Mediana LCP:         ${median(results.map(r => r.lcp))} ms`);
  console.log(`Mediana Speed Index: ${median(results.map(r => r.si))} ms`);
  console.log(`Mediana TBT:         ${median(results.map(r => r.tbt))} ms`);
  console.log(`Mediana CLS:         ${median(results.map(r => r.cls))}`);
  console.log(`Mediana TTFB:        ${median(results.map(r => r.ttfb))} ms`);
  console.log(`Mediana Load Delay:  ${median(results.map(r => r.loadDelay))} ms`);
  console.log(`Mediana RenderDelay: ${median(results.map(r => r.renderDelay))} ms`);
}
