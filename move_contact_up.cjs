const fs = require('fs');

let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startContact = current.indexOf('<section id="contacto"');
const endContact = current.indexOf('</section>', startContact) + 10;
const contactCode = current.substring(startContact, endContact);

current = current.substring(0, startContact) + current.substring(endContact);

const startBlog = current.indexOf('<section id="blog"');

let newHtml = current.substring(0, startBlog) + contactCode + '\n\n        ' + current.substring(startBlog);

fs.writeFileSync('src/routes/index.tsx', newHtml);
console.log('Moved!');
