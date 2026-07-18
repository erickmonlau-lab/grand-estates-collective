const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf8');

// Fix the import for FooterAnimationGSAP
code = code.replace(
  'import FooterAnimationGSAP from "@/components/FooterAnimationGSAP";',
  'import { FooterAnimationGSAP } from "@/components/FooterAnimationGSAP";'
);

// Fix the 'never' type inference issue in the filter chain
code = code.replace(
  '.filter(p => searchParams.zona === \\'Cualquier zona\\' ? true : p.location.includes(searchParams.zona))',
  '.filter((p: any) => searchParams.zona === \\'Cualquier zona\\' ? true : p.location.includes(searchParams.zona))'
);
code = code.replace(
  '.filter(p => searchParams.tipo === \\'Cualquier tipo\\' ? true : p.type === searchParams.tipo)',
  '.filter((p: any) => searchParams.tipo === \\'Cualquier tipo\\' ? true : p.type === searchParams.tipo)'
);
code = code.replace(
  '.filter(p => p.operation === searchParams.mode)',
  '.filter((p: any) => p.operation === searchParams.mode)'
);
code = code.replace(
  '.filter(p => {',
  '.filter((p: any) => {'
);

fs.writeFileSync('src/routes/index.tsx', code);
console.log('Final TS fixes applied!');
