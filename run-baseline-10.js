import fs from 'fs';
import { execSync } from 'child_process';

const runs = [];
console.log('Iniciando 10 ejecuciones móviles controladas de Lighthouse sobre https://gesgrama.com/ ...');

for (let i = 1; i <= 10; i++) {
  const jsonPath = `./lh-forensic2-baseline-${i}.json`;
  try {
    execSync(
      `npx lighthouse https://gesgrama.com/ --output=json --output-path=${jsonPath} --only-categories=performance --chrome-flags="--headless --no-sandbox" --preset=experimental`,
      { stdio: 'pipe' }
    );
  } catch (e) {
    // Ignore taskkill / temp folder cleanup errors from chrome launcher on windows
  }
  
  if (fs.existsSync(jsonPath)) {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const p = data.categories.performance;
    const item = {
      run: i,
      score: Math.round(p.score * 100),
      fcp: data.audits['first-contentful-paint']?.numericValue || 0,
      fcpDisplay: data.audits['first-contentful-paint']?.displayValue || '',
      lcp: data.audits['largest-contentful-paint']?.numericValue || 0,
      lcpDisplay: data.audits['largest-contentful-paint']?.displayValue || '',
      tbt: data.audits['total-blocking-time']?.numericValue || 0,
      tbtDisplay: data.audits['total-blocking-time']?.displayValue || '',
      cls: data.audits['cumulative-layout-shift']?.numericValue || 0,
      si: data.audits['speed-index']?.numericValue || 0,
      siDisplay: data.audits['speed-index']?.displayValue || '',
      mainThread: data.audits['mainthread-work-breakdown']?.numericValue || 0,
      mainThreadDisplay: data.audits['mainthread-work-breakdown']?.displayValue || '',
      bootup: data.audits['bootup-time']?.numericValue || 0,
      unusedJs: data.audits['unused-javascript']?.details?.overallSavingsBytes || 0,
      totalBytes: data.audits['total-byte-weight']?.numericValue || 0
    };
    runs.push(item);
    console.log(`Run ${i}: Score ${item.score} | LCP: ${item.lcpDisplay} | FCP: ${item.fcpDisplay} | TBT: ${item.tbtDisplay} | MainThread: ${item.mainThreadDisplay}`);
  } else {
    console.log(`Run ${i} falló al generar archivo`);
  }
}

fs.writeFileSync('./lh-forensic2-baseline-summary.json', JSON.stringify(runs, null, 2));
console.log('10 runs finalizados y guardados en lh-forensic2-baseline-summary.json');
