import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Add toast import from sonner if not present
if (!c.includes('import { toast }')) {
  c = 'import { toast } from "sonner";\n' + c;
}

fs.writeFileSync(filePath, c, 'utf8');
console.log('Toast import added successfully!');
