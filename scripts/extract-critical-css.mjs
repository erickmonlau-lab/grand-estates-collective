/**
 * Extract critical CSS for above-the-fold content (hero + navbar).
 * Properly handles Tailwind v4 @layer structure.
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const assetsDir = join(process.cwd(), '.output/public/assets');
const cssFile = readdirSync(assetsDir).find(f => f.endsWith('.css'));
if (!cssFile) { console.error('No CSS file found'); process.exit(1); }

const fullCss = readFileSync(join(assetsDir, cssFile), 'utf8');
console.log('Full CSS:', Math.round(fullCss.length / 1024), 'KB');

// ─── Helper: extract a complete @block including nested braces ──────────────
function extractBlock(css, startIdx) {
  let depth = 0;
  for (let i = startIdx; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') {
      depth--;
      if (depth === 0) return css.slice(startIdx, i + 1);
    }
  }
  return '';
}

// ─── 1. Always-critical @layer blocks ──────────────────────────────────────
const criticalBlocks = [];

// Extract @layer properties (CSS variable initializations for Tailwind v4)
const propIdx = fullCss.indexOf('@layer properties');
if (propIdx >= 0) {
  criticalBlocks.push(extractBlock(fullCss, propIdx));
  console.log('✅ @layer properties captured');
}

// Extract @layer theme (:root with --color-*, --spacing, etc.)
const themeIdx = fullCss.indexOf('@layer theme');
if (themeIdx >= 0) {
  criticalBlocks.push(extractBlock(fullCss, themeIdx));
  console.log('✅ @layer theme captured');
}

// Extract @layer base (reset styles)
const baseIdx = fullCss.indexOf('@layer base');
if (baseIdx >= 0) {
  criticalBlocks.push(extractBlock(fullCss, baseIdx));
  console.log('✅ @layer base captured');
}

// Extract all @font-face rules
let ffMatch;
const ffRe = /@font-face\s*\{/g;
while ((ffMatch = ffRe.exec(fullCss)) !== null) {
  criticalBlocks.push(extractBlock(fullCss, ffMatch.index));
}
console.log('✅ @font-face rules captured');

// Extract keyframes used in hero/navbar
const keyframesToInclude = ['pulse', 'marquee', 'float', 'blob', 'btn-lift', 'whatsapp-pulse', 'spin'];
const kfRe = /@keyframes\s+([\w-]+)\s*\{/g;
let kfMatch;
while ((kfMatch = kfRe.exec(fullCss)) !== null) {
  if (keyframesToInclude.includes(kfMatch[1])) {
    criticalBlocks.push(extractBlock(fullCss, kfMatch.index));
  }
}
console.log('✅ Critical @keyframes captured');

// ─── 2. Collect ALL class names from critical files ─────────────────────────
const criticalFiles = [
  'src/hero-carousel.tsx',
  'src/components/Navbar.tsx',
  'src/components/MarqueeRibbon.tsx',
];

const classNames = new Set();
for (const file of criticalFiles) {
  try {
    const src = readFileSync(join(process.cwd(), file), 'utf8');

    // Extract everything that looks like a Tailwind class:
    // - Regular: flex, text-white, bg-blue-500
    // - Arbitrary values: bg-[#F8FAFC], min-h-[100svh], text-[1.1rem]
    // - With modifiers: sm:text-xl, hover:opacity-90, md:h-38
    // - With opacity: bg-white/80, text-slate-900/50

    // Match any sequence that could be a Tailwind class
    const classRe = /(?:^|[\s"'`{(,])(-?[a-z][\w]*(?:-[\w[\]#%().,/\\!?*@:^]+)*(?:\/[\d.]+)?)/g;
    let m;
    while ((m = classRe.exec(src)) !== null) {
      const cls = m[1].trim();
      if (cls.length >= 2 && cls.length <= 80) classNames.add(cls);
    }

    // Also explicitly match arbitrary value patterns
    const arbRe = /([a-z][\w-]*-\[[^\]]{1,60}\](?:\/[\d]+)?)/g;
    while ((m = arbRe.exec(src)) !== null) classNames.add(m[1]);

  } catch (e) {
    console.warn('Could not read', file);
  }
}

console.log('Critical class names found:', classNames.size);

// ─── 3. Extract matching CSS utility rules ──────────────────────────────────
function escapeForRegex(str) {
  return str.replace(/[-[\]{}()*+?.,\\^$|#%/]/g, '\\$&');
}

const matchedRules = new Set();

for (const cls of classNames) {
  const escaped = escapeForRegex(cls);

  // Try to find this class as a CSS selector (with optional pseudo/responsive prefix)
  // Pattern: .classname or .\:classname or .sm\:classname etc.
  const selectorRe = new RegExp(`\\.(?:[a-z]+\\\\:)?${escaped}(?:\\\\[^\\\\]]*\\\\])?(?:[\\s,{:>+~\\[]|$)`, 'g');

  let match;
  while ((match = selectorRe.exec(fullCss)) !== null) {
    const start = match.index;
    let depth = 0;
    let end = start;

    // Find opening brace
    let braceStart = fullCss.indexOf('{', start);
    if (braceStart < 0 || braceStart - start > 200) continue;

    for (let i = braceStart; i < fullCss.length; i++) {
      if (fullCss[i] === '{') depth++;
      else if (fullCss[i] === '}') {
        depth--;
        if (depth === 0) { end = i + 1; break; }
      }
    }
    if (end > start) {
      matchedRules.add(fullCss.slice(start, end));
    }
  }
}

// Also extract sm: and md: responsive versions of matched classes
const responsivePrefixes = ['sm', 'md'];
const extraRules = new Set();
for (const cls of classNames) {
  for (const prefix of responsivePrefixes) {
    const escaped = escapeForRegex(`${prefix}\\:${cls}`);
    const re = new RegExp(`\\.${escaped}[\\s,{:>+~\\[]`, 'g');
    let m;
    while ((m = re.exec(fullCss)) !== null) {
      const start = m.index;
      let depth = 0, end = start;
      const brace = fullCss.indexOf('{', start);
      if (brace < 0 || brace - start > 200) continue;
      for (let i = brace; i < fullCss.length; i++) {
        if (fullCss[i] === '{') depth++;
        else if (fullCss[i] === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
      }
      if (end > start) extraRules.add(fullCss.slice(start, end));
    }
  }
}

console.log('Matched CSS rules:', matchedRules.size + extraRules.size);

// ─── 4. Assemble and minify ─────────────────────────────────────────────────
const criticalCss = [
  ...criticalBlocks,
  ...Array.from(matchedRules),
  ...Array.from(extraRules),
].join('\n');

console.log('Critical CSS size:', Math.round(criticalCss.length / 1024), 'KB');

const minified = criticalCss
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*\{\s*/g, '{')
  .replace(/\s*\}\s*/g, '}')
  .replace(/\s*;\s*/g, ';')
  .replace(/\s*,\s*/g, ',')
  .trim();

console.log('Minified:', Math.round(minified.length / 1024), 'KB');

writeFileSync(
  join(process.cwd(), 'src/lib/critical-css.ts'),
  `// AUTO-GENERATED by scripts/extract-critical-css.mjs — do not edit\nexport const criticalCss = ${JSON.stringify(minified)};\n`
);
console.log('✅ Written to src/lib/critical-css.ts');
