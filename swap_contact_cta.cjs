const fs = require('fs');

let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startContact = current.indexOf('<section id="contacto"');
const endContact = current.indexOf('</section>', startContact) + 10;
const premiumContactCode = current.substring(startContact, endContact);

// Find the dark CTA banner section using the class name we identified earlier
const ctaMarker = current.indexOf('{/* Tratamiento del Fondo: Imagen residencial');
const startCta = current.lastIndexOf('<section', ctaMarker);
const endCta = current.indexOf('</section>', startCta) + 10;

if (startCta !== -1 && startContact !== -1) {
  // 1. Remove the CTA banner entirely
  let tempHtml = current.substring(0, startCta) + current.substring(endCta);
  
  // 2. We need to move the premium contact code from the bottom to where CTA was.
  // Actually, since we removed the CTA banner, the indices for startContact/endContact shifted.
  // Let's just do it sequentially.
  
  // Find startCta comment
  const ctaCommentStart = current.lastIndexOf('{/*', startCta);
  const ctaCommentEnd = current.indexOf('*/}', ctaCommentStart) + 3;
  
  let newHtml = current.substring(0, ctaCommentStart);
  newHtml += premiumContactCode + "\n";
  newHtml += current.substring(endCta, startContact);
  newHtml += current.substring(endContact);
  
  fs.writeFileSync('src/routes/index.tsx', newHtml);
  console.log("Swapped successfully");
} else {
  console.log("Could not find sections");
}
