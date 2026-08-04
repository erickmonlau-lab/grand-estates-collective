import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Change badge background from navy solid bg-[#0b214a] to nav-gray bg-[#757989] and text color from text-white to text-onyx/text-[#0f172a]
const oldBadgeSpan = `className="inline-flex items-center gap-2 bg-[#0b214a] text-white text-xs sm:text-sm font-black tracking-widest uppercase px-6 py-2.5 rounded-2xl border border-white/20"`;

const newBadgeSpan = `className="inline-flex items-center gap-2 bg-[#757989] text-[#0f172a] text-xs sm:text-sm font-black tracking-widest uppercase px-6 py-2.5 rounded-2xl border border-slate-300/60"`;

c = c.replace(oldBadgeSpan, newBadgeSpan);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Badge background changed to nav-gray #757989 and text to black #0f172a!');
