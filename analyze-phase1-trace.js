import fs from 'fs';

const trace = JSON.parse(fs.readFileSync('lh-fase1-baseline-0.trace.json', 'utf8'));
const events = trace.traceEvents || trace;

const navStart = events.find(e => e.name === 'navigationStart');
const navStartTime = navStart ? navStart.ts : null;

function rel(ts) {
  return navStartTime ? ((ts - navStartTime) / 1000).toFixed(2) + ' ms' : ts;
}

console.log('=== FASE 1: DESGLOSE DE TIMESTAMPS CRONOLÓGICOS (CHROME TRACE) ===');
console.log('navigationStart ts:', navStartTime);

// FCP and LCP markers
const fcp = events.find(e => e.name === 'firstContentfulPaint');
console.log('FCP event:', fcp ? rel(fcp.ts) : 'not found');

const lcpCandidates = events.filter(e => e.name === 'largestContentfulPaint::Candidate');
lcpCandidates.forEach((c, idx) => {
  console.log(`LCP Candidate ${idx+1}:`, rel(c.ts), 'size:', c.args?.data?.size, 'nodeId:', c.args?.data?.nodeId);
});

// Document Network requests
console.log('\n--- DOCUMENT NETWORK EVENTS ---');
const docReqs = events.filter(e => (e.name === 'ResourceSendRequest' || e.name === 'ResourceReceiveResponse' || e.name === 'ResourceReceivedData' || e.name === 'ResourceFinish') && e.args?.data?.url?.includes('gesgrama.com/'));
docReqs.forEach(r => {
  const url = r.args?.data?.url || '';
  if (!url.includes('.webp') && !url.includes('.js') && !url.includes('.css') && !url.includes('.woff')) {
    console.log(`${r.name} (${url}):`, rel(r.ts), r.args?.data?.encodedDataLength ? `bytes: ${r.args.data.encodedDataLength}` : '');
  }
});

// LCP Image Network events
console.log('\n--- LCP IMAGE NETWORK EVENTS ---');
const imgReqs = events.filter(e => (e.name === 'ResourceSendRequest' || e.name === 'ResourceReceiveResponse' || e.name === 'ResourceReceivedData' || e.name === 'ResourceFinish') && e.args?.data?.url?.includes('family_barcelona_mobile_lcp'));
imgReqs.forEach(r => {
  console.log(`${r.name}:`, rel(r.ts), r.args?.data?.encodedDataLength ? `bytes: ${r.args.data.encodedDataLength}` : '');
});

// ParseHTML
console.log('\n--- PARSE HTML EVENTS ---');
const parseHtml = events.filter(e => e.name === 'ParseHTML');
parseHtml.forEach(p => {
  console.log('ParseHTML start:', rel(p.ts), 'dur:', (p.dur/1000).toFixed(2), 'ms', 'startLine:', p.args?.beginData?.startLine);
});

// ParseAuthorStyleSheet (CSS Parsing)
console.log('\n--- PARSE AUTHOR STYLESHEET (CSS PARSING) ---');
const parseCss = events.filter(e => e.name === 'ParseAuthorStyleSheet');
let totalCssParseDur = 0;
parseCss.forEach((p, idx) => {
  const durMs = p.dur ? p.dur / 1000 : 0;
  totalCssParseDur += durMs;
  console.log(`ParseAuthorStyleSheet ${idx+1}: start ${rel(p.ts)}, dur: ${durMs.toFixed(2)} ms, styleSheetUrl: ${p.args?.data?.styleSheetUrl || 'inline'}`);
});
console.log(`Total CSS Parse Duration: ${totalCssParseDur.toFixed(2)} ms`);

// Style Recalculation (UpdateLayoutTree)
console.log('\n--- STYLE RECALCULATION (UpdateLayoutTree) ---');
const styleRecalcs = events.filter(e => e.name === 'UpdateLayoutTree');
let totalStyleRecalcDur = 0;
styleRecalcs.forEach((s, idx) => {
  const durMs = s.dur ? s.dur / 1000 : 0;
  totalStyleRecalcDur += durMs;
  if (idx < 5 || durMs > 5) {
    console.log(`UpdateLayoutTree ${idx+1}: start ${rel(s.ts)}, dur: ${durMs.toFixed(2)} ms, elementCount: ${s.args?.elementCount}`);
  }
});
console.log(`Total Style Recalculations: ${styleRecalcs.length}, Total Duration: ${totalStyleRecalcDur.toFixed(2)} ms`);

// Layout events
console.log('\n--- LAYOUT EVENTS ---');
const layouts = events.filter(e => e.name === 'Layout');
let totalLayoutDur = 0;
layouts.forEach((l, idx) => {
  const durMs = l.dur ? l.dur / 1000 : 0;
  totalLayoutDur += durMs;
  if (idx < 5 || durMs > 5) {
    console.log(`Layout ${idx+1}: start ${rel(l.ts)}, dur: ${durMs.toFixed(2)} ms`);
  }
});
console.log(`Total Layouts: ${layouts.length}, Total Duration: ${totalLayoutDur.toFixed(2)} ms`);

// Paint & Composite
console.log('\n--- PAINT & RASTER EVENTS ---');
const paints = events.filter(e => e.name === 'Paint' || e.name === 'RasterTask');
paints.slice(0, 10).forEach(p => {
  console.log(`${p.name}: start ${rel(p.ts)}, dur: ${p.dur ? (p.dur/1000).toFixed(2) + ' ms' : 'N/A'}`);
});
