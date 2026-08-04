import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

c = c.replaceAll('py-10 md:py-20', 'py-6 md:py-10');
c = c.replaceAll('py-10 md:py-32', 'py-8 md:py-14');
c = c.replaceAll('py-8 md:py-16', 'py-5 md:py-8');
c = c.replaceAll('py-6 md:py-14', 'py-4 md:py-8');

fs.writeFileSync(filePath, c, 'utf8');
console.log('Compact padding applied over redone section!');
