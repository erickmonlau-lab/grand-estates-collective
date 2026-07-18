const fs = require('fs');

let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

// The string we want to inject
const injection = `
  const filteredProperties = properties
    .filter(p => searchParams.zona === 'Cualquier zona' ? true : p.location.includes(searchParams.zona))
    .filter(p => searchParams.tipo === 'Cualquier tipo' ? true : p.type === searchParams.tipo)
    .filter(p => p.operation === searchParams.mode)
    .filter(p => {
      if (searchParams.precio === "Cualquier precio") return true;
      const priceNum = parseInt(p.price.replace(/[^0-9]/g, ''));
      const limitStr = searchParams.precio.replace(/[^0-9]/g, '');
      if (!limitStr) return true;
      const limit = parseInt(limitStr);
      return priceNum <= limit;
    });

  return (`;

// We find the main return statement of the Index component.
// It comes right after "const tipos = ["Piso", ...];"
const anchor = 'const tipos = ["Piso", "Ático", "Chalet", "Local comercial", "Oficina"];';

const anchorIdx = current.indexOf(anchor);

if (anchorIdx !== -1) {
  const returnIdx = current.indexOf('return (', anchorIdx);
  if (returnIdx !== -1) {
    // Replace "return (" with our injection
    let newHtml = current.substring(0, returnIdx) + injection + current.substring(returnIdx + 8);
    fs.writeFileSync('src/routes/index.tsx', newHtml);
    console.log("Injected filteredProperties successfully!");
  } else {
    console.log("Could not find 'return (' after anchor.");
  }
} else {
  console.log("Could not find anchor.");
}
