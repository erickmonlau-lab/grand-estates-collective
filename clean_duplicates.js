import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Ensure toast import at top
if (!c.includes('import { toast }')) {
  c = 'import { toast } from "sonner";\n' + c;
}

// Clean duplicate toast lines
const dupLines = `                          toggleFavorite(property.id);
                          const added = !favorites.includes(property.id);
                          toast(added ? "Guardado en tus favoritos guardados localmente" : "Eliminado de tus favoritos", { icon: "❤️" });
                          const added = !favorites.includes(property.id);
                          toast(added ? "Guardado en tus favoritos guardados localmente" : "Eliminado de tus favoritos", { icon: "❤️" });`;

const cleanLines = `                          toggleFavorite(property.id);
                          const added = !favorites.includes(property.id);
                          toast(added ? "Guardado en tus favoritos" : "Eliminado de tus favoritos", { icon: "❤️" });`;

c = c.replace(dupLines, cleanLines);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Cleaned duplicate toast block and ensured import!');
