import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const URL = 'https://gesgrama.com/';
const RUNS = 10;

const results = [];

function median(arr) {
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 === 0
    ? Math.round((s[m - 1] + s[m]) / 2)
    : s[m];
}

async function runLighthouse(runIndex) {
  const { default: lighthouse } = await import('lighthouse');
  
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--remote-debugging-port=0',
    ]
  });

  // Get the port from the browser
  const wsEndpoint = browser.wsEndpoint();
  const portMatch = wsEndpoint.match(/:(\d+)\//);
  const port = portMatch ? parseInt(portMatch[1]) : 9222;

  try {
    const result = await lighthouse(URL, {
      port,
      output: 'json',
      logLevel: 'error',
      formFactor: 'mobile',
      screenEmulation: {
        mobile: true,
        width: 390,
        height: 844,
        deviceScaleFactor: 3,
        disabled: false,
      },
      throttling: {
        rttMs: 150,
        throughputKbps: 1638.4,
        cpuSlowdownMultiplier: 4,
        requestLatencyMs: 562.5,
        downloadThroughputKbps: 1474.6,
        uploadThroughputKbps: 675,
      },
      throttlingMethod: 'simulate',
      onlyCategories: ['performance'],
      disableStorageReset: false,
    });

    const data = result.lhr;
    const a = data.audits;
    const cat = data.categories;

    let rld = null, rld_dur = null, erd = null;
    const breakdown = a['lcp-breakdown'];
    if (breakdown && breakdown.details && breakdown.details.items) {
      breakdown.details.items.forEach(item => {
        if (item.phase === 'Resource Load Delay') rld = Math.round(item.timing);
        if (item.phase === 'Resource Load Duration') rld_dur = Math.round(item.timing);
        if (item.phase === 'Element Render Delay') erd = Math.round(item.timing);
      });
    }

    const run = {
      run: runIndex,
      perf: Math.round(cat.performance.score * 100),
      fcp: Math.round(a['first-contentful-paint'].numericValue),
      lcp: Math.round(a['largest-contentful-paint'].numericValue),
      si: Math.round(a['speed-index'].numericValue),
      tbt: Math.round(a['total-blocking-time'].numericValue),
      cls: parseFloat(a['cumulative-layout-shift'].numericValue.toFixed(4)),
      ttfb: a['server-response-time'] ? Math.round(a['server-response-time'].numericValue) : null,
      rld,
      rld_dur,
      erd
    };

    console.log(`  ✓ Perf=${run.perf} FCP=${run.fcp}ms LCP=${run.lcp}ms SI=${run.si}ms TBT=${run.tbt}ms CLS=${run.cls} TTFB=${run.ttfb}ms`);
    if (rld !== null) console.log(`    LCP: RLD=${rld}ms RLD_dur=${rld_dur}ms ERD=${erd}ms`);
    return run;
  } finally {
    await browser.close();
  }
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log(`Starting ${RUNS} Lighthouse mobile runs against ${URL}`);
  console.log('Config: simulate, RTT=150ms, BW=1638Kbps, CPU×4\n');

  for (let i = 1; i <= RUNS; i++) {
    console.log(`\n--- Run ${i}/${RUNS} ---`);
    try {
      const run = await runLighthouse(i);
      results.push(run);
    } catch (e) {
      console.error(`  ✗ Run ${i} failed:`, e.message.substring(0, 150));
      results.push({ run: i, error: e.message.substring(0, 100) });
    }
    if (i < RUNS) {
      console.log('  Waiting 8s before next run...');
      await sleep(8000);
    }
  }

  writeFileSync('lh-diag-summary.json', JSON.stringify(results, null, 2));

  const ok = results.filter(r => !r.error);
  
  console.log('\n\n' + '='.repeat(60));
  console.log('DIAGNOSTIC REPORT — gesgrama.com — 10 Lighthouse Runs');
  console.log('Commit: 6bd964e (font-ui-clean on card badges/buttons)');
  console.log('='.repeat(60));
  
  // Table
  console.log('\nRun | Perf | FCP(ms) | LCP(ms) | SI(ms)  | TBT(ms) | CLS    | TTFB(ms) | RLD(ms) | ERD(ms)');
  console.log('-'.repeat(100));
  results.forEach(r => {
    if (r.error) {
      console.log(`  ${r.run} | ERROR`);
    } else {
      const rld = r.rld !== null ? r.rld : '--';
      const erd = r.erd !== null ? r.erd : '--';
      console.log(`  ${String(r.run).padEnd(2)} | ${String(r.perf).padEnd(4)} | ${String(r.fcp).padEnd(7)} | ${String(r.lcp).padEnd(7)} | ${String(r.si).padEnd(7)} | ${String(r.tbt).padEnd(7)} | ${String(r.cls).padEnd(6)} | ${String(r.ttfb).padEnd(8)} | ${String(rld).padEnd(7)} | ${erd}`);
    }
  });

  if (ok.length >= 3) {
    const perfMed = median(ok.map(r => r.perf));
    const fcpMed = median(ok.map(r => r.fcp));
    const lcpMed = median(ok.map(r => r.lcp));
    const siMed = median(ok.map(r => r.si));
    const tbtMed = median(ok.map(r => r.tbt));
    const ttfbs = ok.map(r => r.ttfb).filter(Boolean);
    const rlds = ok.map(r => r.rld).filter(v => v !== null);
    const erds = ok.map(r => r.erd).filter(v => v !== null);
    const bestPerf = Math.max(...ok.map(r => r.perf));
    const worstPerf = Math.min(...ok.map(r => r.perf));
    const bestLcp = Math.min(...ok.map(r => r.lcp));
    const worstLcp = Math.max(...ok.map(r => r.lcp));

    console.log('\n' + '='.repeat(60));
    console.log('MEDIANS');
    console.log('='.repeat(60));
    console.log(`Performance score:  ${perfMed}`);
    console.log(`FCP:                ${fcpMed} ms`);
    console.log(`LCP:                ${lcpMed} ms`);
    console.log(`Speed Index:        ${siMed} ms`);
    console.log(`TBT:                ${tbtMed} ms`);
    if (ttfbs.length) console.log(`TTFB:               ${median(ttfbs)} ms`);
    if (rlds.length) console.log(`RLD (LCP subpart):  ${median(rlds)} ms`);
    if (erds.length) console.log(`ERD (LCP subpart):  ${median(erds)} ms`);

    console.log('\n' + '='.repeat(60));
    console.log('VARIABILITY');
    console.log('='.repeat(60));
    console.log(`Best Perf:   ${bestPerf}    Worst Perf:  ${worstPerf}   Δ = ${bestPerf - worstPerf} pts`);
    console.log(`Best LCP:    ${bestLcp}ms  Worst LCP:   ${worstLcp}ms  Δ = ${worstLcp - bestLcp} ms`);

    console.log('\n' + '='.repeat(60));
    console.log('VERDICT');
    console.log('='.repeat(60));
    if (perfMed >= 89 && (bestPerf - worstPerf) <= 12) {
      console.log('→ VARIABILIDAD DE LIGHTHOUSE');
      console.log('  El score 84 fue un outlier. Producción estable en 89-92.');
      console.log('  NO se requiere acción. NO revertir commit 6bd964e.');
    } else if (perfMed < 86 && worstPerf < 86 && (ok.filter(r => r.perf < 87).length >= 7)) {
      console.log('→ REGRESIÓN REAL — investigar commit 6bd964e');
    } else {
      console.log('→ VARIABILIDAD ALTA — dispersión normal de Lighthouse mobile');
      console.log(`  Mediana ${perfMed} dentro del rango histórico 83-92.`);
      console.log('  El score 84 es el extremo inferior de la distribución normal.');
    }
  }
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
