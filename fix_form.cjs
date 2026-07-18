const fs = require('fs');
let recovered = fs.readFileSync('src/routes/index.tsx.recovered', 'utf8');
let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startRec = recovered.indexOf('<section id="contacto"');
const endRec = recovered.indexOf('</section>', startRec) + 10;
let recoveredSection = recovered.substring(startRec, endRec);

// Apply gray led border and tight padding
recoveredSection = recoveredSection.replace(
  'className="bg-white border border-slate-100 p-8 md:p-12 rounded-xl shadow-md"',
  'className="bg-white border-2 border-slate-300 p-6 md:p-8 rounded-xl shadow-[0_0_20px_rgba(100,116,139,0.3)]"'
);

const startCur = current.indexOf('<section id="contacto"');
const endCur = current.indexOf('</section>', startCur) + 10;

current = current.substring(0, startCur) + recoveredSection + current.substring(endCur);

fs.writeFileSync('src/routes/index.tsx', current);
console.log('Done!');
