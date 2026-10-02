import { execSync } from 'child_process';
import fs from 'fs';

const runs = 10;
const results = [];

console.log('--- INICIANDO FASE 1: 10 MEDICIONES MÓVILES CONTROLADAS CON CAPTURA DE TRACE COMPLETO ---');

for (let i = 1; i <= runs; i++) {
  console.log(`\n========================================`);
  console.log(`Ejecutando Lighthouse Móvil Run ${i}/${runs}...`);
  console.log(`========================================`);
  const jsonPath = `lh-phase1-run-${i}.json`;
  // Capturamos json completo. Lighthouse guarda los traces en los artifacts si guardamos trace o auditamos lcp-breakdown.
  const cmd = `npx lighthouse https://gesgrama.com/ --only-categories=performance --output=json --output-path=${jsonPath} --chrome-flags="--headless=new --no-sandbox" --save-assets`;
  try {
    execSync(cmd, { stdio: 'ignore' });
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

    const classification = renderDelay > 1000 ? 'BAD RUN (>1000ms)' : (renderDelay < 500 ? 'GOOD RUN (<500ms)' : 'MEDIUM RUN');

    const res = { run: i, score, fcp, lcp, si, tbt, cls, ttfb, loadDelay, loadDuration, renderDelay, classification };
    results.push(res);
    console.log(`[Run ${i}] Score=${score} | LCP=${Math.round(lcp)}ms | RenderDelay=${Math.round(renderDelay)}ms (${classification}) | LoadDelay=${Math.round(loadDelay)}ms | LoadDur=${Math.round(loadDuration)}ms | FCP=${Math.round(fcp)}ms | TBT=${Math.round(tbt)}ms | CLS=${cls.toFixed(4)}`);
  } catch (err) {
    console.error(`Error en Run ${i}:`, err.message);
  }
}

fs.writeFileSync('lh-phase1-10runs-summary.json', JSON.stringify(results, null, 2));
console.log('\n--- 10 ejecuciones finalizadas con éxito ---');
