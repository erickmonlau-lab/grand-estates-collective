const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf8');

// The old dark photo hero starts with this exact string right after the new hero's closing section
const oldStart = '\n\n        {/* FULL SCREEN BACKGROUND IMAGE */}';
const oldEnd = '\n      {/* Spacer to compensate the -mb-8 of the search bar */}\n      <div className="h-8 bg-white" />';
const afterOldEnd = '\n\n      {/* PROPERTIES SECTION */}';

const idx1 = code.indexOf(oldStart);
const idx2 = code.indexOf(afterOldEnd);

if (idx1 !== -1 && idx2 !== -1) {
  code = code.slice(0, idx1) + code.slice(idx2);
  fs.writeFileSync('src/routes/index.tsx', code);
  console.log('Cleaned. Removed', idx2 - idx1, 'chars of old hero code.');
} else {
  // Try alternate markers
  const a1 = code.indexOf('FULL SCREEN BACKGROUND IMAGE');
  const a2 = code.indexOf('PROPERTIES SECTION');
  console.log('Alt search: FULL SCREEN idx=' + a1 + '  PROPERTIES idx=' + a2);
}
