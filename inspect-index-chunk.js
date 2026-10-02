import fs from 'fs';

const content = fs.readFileSync('.output/public/assets/index-CBPty3ig.js', 'utf8');
console.log('Total characters in index-*.js:', content.length);

// Search for markers / module boundaries / strings / keywords
const patterns = [
  'tanstack',
  'router',
  'query',
  'supabase',
  'lucide',
  'motion',
  'framer',
  'zod',
  'radix',
  'embla',
  'gsap',
  'recharts',
  'date-fns',
  'hookform',
  'sonner',
  'vaul'
];

patterns.forEach(p => {
  const regex = new RegExp(p, 'gi');
  const count = (content.match(regex) || []).length;
  console.log(`Keyword "${p}": found ${count} times`);
});
