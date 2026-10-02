import fs from 'fs';

const content = fs.readFileSync('.output/public/assets/index-CBPty3ig.js', 'utf8');

// Check for known Supabase strings
const supabaseMarkers = [
  'createClient',
  '@supabase/supabase-js',
  'PostgrestClient',
  'RealtimeClient',
  'AuthClient',
  'StorageClient',
  'GoTrueClient',
  'auth-token',
  'sb-',
  'anonKey'
];

console.log('=== Supabase Markers in index-*.js ===');
supabaseMarkers.forEach(m => {
  console.log(m, content.includes(m));
});

// Also check TanStack Router / Query markers
console.log('\n=== Router / Query Markers ===');
console.log('RouterClient / createRouter:', content.includes('createRouter') || content.includes('Router'));
console.log('QueryClient / QueryCache:', content.includes('QueryClient') || content.includes('QueryCache'));
