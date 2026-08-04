import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Balanced compacting of sections so layout proportion remains clean
c = c.replaceAll('py-8 md:py-16', 'py-6 md:py-10');
c = c.replaceAll('py-10 md:py-20', 'py-8 md:py-12');
c = c.replaceAll('py-10 md:py-32', 'py-8 md:py-14');
c = c.replaceAll('py-6 md:py-14', 'py-5 md:py-8');
c = c.replaceAll('p-6 sm:p-10 md:p-14', 'p-6 sm:p-8 md:p-10');
c = c.replaceAll('p-6 sm:p-10 md:p-16', 'p-6 sm:p-8 md:p-10');

fs.writeFileSync(filePath, c, 'utf8');
console.log('Balanced section compaction applied!');
