import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Fine-tuned compacting specifically for the valuator section internal paddings & gaps
const rep = (from, to) => {
  c = c.replaceAll(from, to);
};

// Outer section padding (from py-10 md:py-20 to clean py-6 md:py-10)
rep('py-10 md:py-20', 'py-6 md:py-10');

// Card outer padding (from p-6 sm:p-10 md:p-16 to p-6 sm:p-8 md:p-10)
rep('p-6 sm:p-10 md:p-16', 'p-6 sm:p-8 md:p-10');

// Vertical gaps between elements inside left column
rep('mb-6', 'mb-4');
rep('mb-10', 'mb-6');
rep('mb-5', 'mb-3.5');

// Form container internal padding
rep('p-6 md:p-8', 'p-4 md:p-6');

// Form button height & padding
rep('py-4 px-6', 'py-3.5 px-5');

// WhatsApp button height
rep('py-3.5 px-4', 'py-2.5 px-4');

// Badges margin top
rep('mt-6', 'mt-4');

// Right card placeholder padding & min-height
rep('min-h-[340px]', 'min-h-[280px]');
rep('p-10 flex', 'p-6 flex');
rep('gap-5 min-h', 'gap-3 min-h');

fs.writeFileSync(filePath, c, 'utf8');
console.log('Fine-tuned valuator compaction applied successfully!');
