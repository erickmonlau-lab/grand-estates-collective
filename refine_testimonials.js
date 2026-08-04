import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// 1. Remove rotation from badge "HISTORIAS REALES" (make it completely straight/horizontal)
c = c.replace(
  'style={{ transform: "rotate(-3deg)", boxShadow: "0 8px 22px rgba(11,33,74,0.3)" }}',
  'style={{ boxShadow: "0 4px 14px rgba(11,33,74,0.2)" }}'
);

// 2. Refine SVG wave path to a clean, smooth, uniform single wave (thickness 3.5px)
const oldSvgPath = `<path 
                      d="M2 14 C 20 4, 35 18, 55 8 C 75 2, 88 16, 98 10" 
                      stroke="currentColor" 
                      strokeWidth="5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />`;

const newSvgPath = `<path 
                      d="M 2 10 Q 25 4, 50 10 T 98 10" 
                      stroke="currentColor" 
                      strokeWidth="3.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />`;

c = c.replace(oldSvgPath, newSvgPath);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Badge rotation removed & wave path refined to smooth single wave!');
