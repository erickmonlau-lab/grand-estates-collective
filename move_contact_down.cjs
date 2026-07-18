const fs = require('fs');

let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startContact = current.indexOf('<section id="contacto"');
const endContact = current.indexOf('</section>', startContact) + 10;
const contactCode = current.substring(startContact, endContact);

// Remove the contact code from its current position
current = current.substring(0, startContact) + current.substring(endContact);

// Find the end of the FAQ section
const startFaq = current.indexOf('<section id="faq"');
const endFaq = current.indexOf('</section>', startFaq) + 10;

// Insert the contact code after the FAQ section
let newHtml = current.substring(0, endFaq) + '\\n\\n' + contactCode + current.substring(endFaq);

fs.writeFileSync('src/routes/index.tsx', newHtml);
console.log('Moved contact section to the bottom');
