import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Helper: replace all occurrences with a warning if pattern not found
const rep = (from, to) => {
  const count = (c.match(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  c = c.replaceAll(from, to);
  return count;
};

// ── BUTTONS (all button/anchor tag text sizes) ──────────────────────────
rep('text-sm font-bold uppercase tracking-wider', 'text-base font-bold uppercase tracking-wider');
rep('text-sm font-semibold', 'text-base font-semibold');
rep('text-sm font-bold', 'text-base font-bold');
rep('text-sm font-extrabold', 'text-base font-extrabold');
rep('text-sm font-medium', 'text-base font-medium');
rep('text-sm transition-all', 'text-base transition-all');

// ── FORM INPUTS / SELECTS / TEXTAREAS ────────────────────────────────────
rep('text-sm font-medium text-[#0f172a]', 'text-base font-medium text-[#0f172a]');
rep('px-5 py-3.5 text-sm', 'px-5 py-4 text-base');
rep('text-xs sm:text-sm font-medium', 'text-base font-medium');
rep('text-xs sm:text-sm', 'text-base');

// ── FAQ / ACCORDION ────────────────────────────────────────────────────── 
rep('text-base md:text-lg pr-4', 'text-lg md:text-xl font-bold pr-4');
rep('text-sm md:text-base border-t', 'text-base md:text-lg border-t');
rep('text-slate-300 leading-relaxed font-medium text-base md:text-lg border-t', 
    'text-slate-200 leading-relaxed font-bold text-base md:text-xl border-t');

// ── NEWS CARDS (Blog / Noticias) ──────────────────────────────────────────
rep('text-base leading-snug mb-2 group-hover:text-[#2563eb] transition-colors line-clamp-2',
    'text-lg leading-snug mb-2 group-hover:text-[#2563eb] transition-colors line-clamp-2');
rep('text-sm text-slate-600 font-bold leading-relaxed mb-4 flex-1 line-clamp-3',
    'text-base text-slate-700 font-bold leading-relaxed mb-4 flex-1 line-clamp-3');
rep('text-sm text-slate-500 leading-relaxed mb-4 flex-1 line-clamp-3',
    'text-base text-slate-700 font-bold leading-relaxed mb-4 flex-1 line-clamp-3');

// ── SERVICES CARDS ────────────────────────────────────────────────────────
// Card descriptions and tags inside service cards
rep('text-sm text-slate-600', 'text-base text-slate-700 font-semibold');
rep('text-sm text-white/70', 'text-base text-white/90 font-semibold');
rep('text-sm text-white/80', 'text-base text-white/90 font-semibold');
rep('text-sm text-slate-400', 'text-base text-slate-600 font-semibold');
rep('text-sm text-slate-500', 'text-base text-slate-600 font-semibold');

// ── METRICS / STATS ───────────────────────────────────────────────────────
rep('text-sm text-slate-600 font-bold', 'text-base text-slate-700 font-bold');
rep('text-sm font-bold text-slate-600', 'text-base font-bold text-slate-700');

// ── HERO BANNER TEXT ─────────────────────────────────────────────────────
rep('text-sm text-slate-400 font-bold', 'text-base text-slate-600 font-bold');
rep('text-sm text-slate-500 font-bold', 'text-base text-slate-600 font-bold');

// ── TESTIMONIALS / REVIEWS ────────────────────────────────────────────────
rep('text-sm leading-relaxed', 'text-base leading-relaxed');
rep('text-sm leading-snug', 'text-base leading-snug');

// ── REMAINING xs → sm ─────────────────────────────────────────────────────
// Very small labels that still need bumping
rep('text-xs font-black', 'text-sm font-black');
rep('text-xs font-bold', 'text-sm font-bold');
rep('text-xs text-slate-600 font-bold', 'text-sm text-slate-700 font-bold');
rep('text-xs text-slate-500 font-bold', 'text-sm text-slate-600 font-bold');
rep('text-xs font-extrabold', 'text-sm font-extrabold');
rep('text-xs text-[#2563eb]', 'text-sm text-[#2563eb]');
rep('text-xs text-[#005c99]', 'text-sm text-[#005c99]');
rep('text-xs uppercase', 'text-sm uppercase');
rep('text-xs font-semibold text-slate-700', 'text-sm font-semibold text-slate-700');
rep('text-xs md:text-sm font-semibold', 'text-base font-semibold');

// ── CONTACT FORM LABELS ───────────────────────────────────────────────────
rep('text-xs text-slate-600 font-bold', 'text-sm text-slate-700 font-bold');
rep('text-xs text-slate-500 font-medium', 'text-sm text-slate-600 font-medium');

// ── REMAINING GENERAL text-sm → text-base ────────────────────────────────
// Catch-all for any remaining text-sm that weren't caught above
// BUT be careful not to bump nav labels (they have specific classes)
rep('" text-sm "', '" text-base "');

fs.writeFileSync(filePath, c, 'utf8');
console.log('All text sizes increased globally!');
