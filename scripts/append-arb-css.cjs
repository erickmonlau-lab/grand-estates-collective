const fs = require('fs');
const fullCss = fs.readFileSync('.output/public/assets/index-BqlXbb7P.css', 'utf8');

function toCssSelector(cls) {
  return cls
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/#/g, '\\#')
    .replace(/\//g, '\\/');
}

function extractRule(css, cls) {
  const sel = '.' + toCssSelector(cls);
  const idx = css.indexOf(sel + '{');
  if (idx < 0) return null;
  let depth = 0, end = idx;
  for (let i = idx; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  return css.slice(idx, end);
}

const arb = [
  'bg-[#F8FAFC]','bg-[#0f172a]','bg-[#2563eb]','bg-[#1d4ed8]',
  'h-[100svh]','min-h-[100svh]','h-[85px]',
  'from-[#F8FAFC]','from-[#0f172a]/95','from-[#0f172a]',
  'opacity-[0.15]','opacity-[0.12]','opacity-[0.08]',
  'w-[200px]','w-[140px]','h-[200px]',
  'blur-[80px]','blur-[60px]',
  'translate-y-[-50%]','translate-x-[-50%]',
  'min-h-[44px]',
  'max-w-[180px]','max-w-[140px]',
  'px-[18px]','py-[10px]',
];

const found = [];
const missing = [];
for (const cls of arb) {
  const rule = extractRule(fullCss, cls);
  if (rule) found.push(rule);
  else missing.push(cls);
}

console.log('Found:', found.length, 'Missing:', missing.join(', '));

// Read current critical-css.ts and append the extra rules
const current = fs.readFileSync('src/lib/critical-css.ts', 'utf8');
const exportLine = current.lastIndexOf('";');
if (exportLine < 0) { console.error('Cannot find end of CSS string'); process.exit(1); }

const extra = found.join('');
const updated = current.slice(0, exportLine) + extra + current.slice(exportLine);
fs.writeFileSync('src/lib/critical-css.ts', updated);
console.log('Updated critical-css.ts, added', extra.length, 'bytes');
