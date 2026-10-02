import fs from 'fs';

const caContent = fs.readFileSync('.output/public/assets/translations-ca-DYlRtuYp.js', 'utf8');
const enContent = fs.readFileSync('.output/public/assets/translations-en-BbV5FR4s.js', 'utf8');
const mainContent = fs.readFileSync('.output/public/assets/translations-Cqj6XFj6.js', 'utf8');

console.log('Main contains ES:', mainContent.includes('Administración de Fincas'));
console.log('Main contains CA:', mainContent.includes('Administració de Finques'));
console.log('Main contains EN:', mainContent.includes('Property Management'));

console.log('CA chunk contains CA:', caContent.includes('Administració de Finques'));
console.log('EN chunk contains EN:', enContent.includes('Property Management'));
