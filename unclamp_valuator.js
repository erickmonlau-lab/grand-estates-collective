import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Unclamp section and internal card paddings to let everything breathe elegantly
const rep = (from, to) => {
  c = c.replaceAll(from, to);
};

// Outer section padding (give vertical breathing space)
rep('py-2 md:py-5', 'py-6 md:py-10');

// Card container padding
rep('p-5 sm:p-6 md:p-8', 'p-6 sm:p-8 md:p-12');

// Element spacing & margins inside left column
rep('mb-2.5', 'mb-4');
rep('mb-3.5', 'mb-6');
rep('mb-3', 'mb-5');
rep('mt-3', 'mt-5');

// Form container internal padding
rep('p-3 md:p-4', 'p-5 md:p-6');

// Inputs & buttons padding
rep('px-4 py-2.5', 'px-5 py-3.5');
rep('py-2.5 px-4', 'py-3.5 px-5');

// Placeholder right card height & padding
rep('min-h-[220px]', 'min-h-[300px]');
rep('p-4 flex flex-col items-center justify-center text-center gap-3', 'p-8 flex flex-col items-center justify-center text-center gap-5');

fs.writeFileSync(filePath, c, 'utf8');
console.log('Unclamped Valuator padding to give air and breathing room!');
