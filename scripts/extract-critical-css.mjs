/**
 * Extract critical CSS for server-side HTML transformation.
 * Includes ALL Tailwind v4 @layer blocks (properties, theme, base)
 * + @font-face + @keyframes + specific utility classes for hero/navbar.
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const assetsDir = join(process.cwd(), '.output/public/assets');
const cssFile = readdirSync(assetsDir).find(f => f.endsWith('.css'));
if (!cssFile) { console.error('No CSS file'); process.exit(1); }

const fullCss = readFileSync(join(assetsDir, cssFile), 'utf8');
console.log('CSS file:', cssFile, '/', Math.round(fullCss.length / 1024), 'KB');

// Helper: extract a complete block { ... } starting at idx
function extractBlock(css, idx) {
  let depth = 0;
  for (let i = idx; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') { depth--; if (depth === 0) return css.slice(idx, i + 1); }
  }
  return '';
}

const chunks = [];

// 1. Full @layer blocks (properties, theme, base) — these are essential for CSS variables
for (const layer of ['@layer properties', '@layer theme', '@layer base']) {
  const idx = fullCss.indexOf(layer);
  if (idx >= 0) { chunks.push(extractBlock(fullCss, idx)); console.log('✅', layer); }
}

// 2. All @font-face
const ffRe = /@font-face\s*\{/g;
let m;
while ((m = ffRe.exec(fullCss)) !== null) chunks.push(extractBlock(fullCss, m.index));
console.log('✅ @font-face');

// 3. All @keyframes
const kfRe = /@keyframes\s+[\w-]+\s*\{/g;
while ((m = kfRe.exec(fullCss)) !== null) chunks.push(extractBlock(fullCss, m.index));
console.log('✅ @keyframes');

// 4. Critical utility classes — convert class name to CSS escaped selector and extract rule
function toCssSelector(cls) {
  return cls.replace(/\[/g, '\\[').replace(/\]/g, '\\]')
    .replace(/#/g, '\\#').replace(/\//g, '\\/').replace(/\./g, '\\.');
}
function extractRule(cls) {
  const sel = '.' + toCssSelector(cls) + '{';
  const idx = fullCss.indexOf(sel);
  if (idx < 0) return null;
  return extractBlock(fullCss, idx);
}

// Classes used in hero-carousel.tsx and Navbar.tsx — gathered by reading source
const heroNavbarClasses = [
  // Layout fundamentals
  'flex','flex-col','flex-1','flex-row','flex-wrap','flex-shrink-0','shrink','shrink-0',
  'grid','grid-cols-2','items-center','items-stretch','justify-center','justify-between','justify-end',
  'relative','absolute','fixed','sticky','inset-0','inset-x-0','inset-y-0',
  'top-0','bottom-0','left-0','right-0','left-28','-bottom-1',
  // Display
  'block','inline-flex','inline-block','hidden','contents',
  // Sizing — regular
  'w-full','h-full','w-auto','w-fit','max-w-full',
  'w-4','h-4','w-5','h-5','w-6','h-6','w-7','h-7','w-8','h-8','w-10','h-10','w-12','h-12',
  'w-28','h-28','w-px','h-1',
  'min-w-0',
  // Sizing — arbitrary (CRITICAL for hero)
  'h-[100svh]','min-h-[100svh]','h-[85px]','h-[48px]','h-[200px]','h-[36px]',
  'w-[200px]','w-[140px]','w-[120px]',
  'max-w-[180px]','max-w-[140px]','max-w-[200px]',
  'min-h-[44px]',
  // Overflow / pointer
  'overflow-hidden','overflow-x-hidden','overflow-y-auto','pointer-events-none','cursor-pointer',
  // Z-index
  'z-0','z-10','z-20','z-30','z-40','z-50',
  // Backgrounds
  'bg-white','bg-[#F8FAFC]','bg-[#0f172a]','bg-[#2563eb]','bg-[#1d4ed8]',
  'bg-slate-800','bg-slate-600','bg-slate-400','bg-transparent',
  'bg-gradient-to-r','bg-gradient-to-l','bg-gradient-to-b','bg-gradient-to-t',
  // Gradient stops
  'from-transparent','to-transparent','from-[#F8FAFC]',
  'from-[#0f172a]','to-[#0f172a]',
  // Text colors
  'text-white','text-slate-900','text-slate-800','text-slate-700',
  'text-slate-200','text-slate-100','text-slate-950',
  // Text sizes
  'text-xs','text-sm','text-base','text-lg','text-xl','text-2xl','text-3xl',
  // Font
  'font-sans','font-body','font-bold','font-black','font-extrabold','font-medium','font-semibold','font-normal','font-mono',
  // Text utils
  'text-left','text-center','uppercase','tracking-wide','tracking-wider','tracking-widest','tracking-tight',
  'leading-tight','leading-snug','leading-none','whitespace-nowrap','line-clamp-1',
  // Spacing
  'mx-auto','-mx-4',
  'mt-2','-mt-10','mb-1','mb-2','mb-3',
  'pt-1','pb-2','py-1','py-2','py-3','px-2','px-3','px-4','px-6',
  'pr-2','pr-7',
  'gap-2','gap-3','gap-7',
  // Border
  'border','border-2','rounded-full','rounded-xl','rounded-2xl','rounded-lg',
  'border-white','border-slate-300','border-slate-200','border-slate-700',
  'border-r','divide-y',
  'ring-1',
  // Shadow
  'shadow-sm','shadow-md',
  // Object fit
  'object-cover','object-contain',
  // Effects
  'backdrop-blur-md',
  'brightness-0','invert','opacity-0','opacity-100',
  'blur-[80px]','blur-[60px]',
  'transition-all','transition-opacity','transition-transform',
  'duration-200','duration-300',
  // Filters / transforms
  'drop-shadow-md','drop-shadow-lg',
  // Misc
  'animate-pulse','animate-marquee',
  'fill-white',
  'btn-lift',
];

let extracted = 0, missing = [];
const utilityChunks = [];
for (const cls of heroNavbarClasses) {
  const rule = extractRule(cls);
  if (rule) { utilityChunks.push(rule); extracted++; }
  else missing.push(cls);
}
console.log(`✅ Extracted ${extracted} utility rules, missing: ${missing.join(', ')}`);

// 5. Assemble + minify
const all = [...chunks, ...utilityChunks].join('\n');
const minified = all
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*\{\s*/g, '{')
  .replace(/\s*\}\s*/g, '}')
  .replace(/\s*;\s*/g, ';')
  .replace(/\s*,\s*/g, ',')
  .trim();

console.log('Total:', Math.round(all.length / 1024), 'KB →', Math.round(minified.length / 1024), 'KB minified');

writeFileSync(
  join(process.cwd(), 'src/lib/critical-css.ts'),
  `// AUTO-GENERATED — do not edit manually. Run: node scripts/extract-critical-css.mjs\nexport const criticalCss = ${JSON.stringify(minified)};\n`
);
console.log('✅ Written to src/lib/critical-css.ts');
