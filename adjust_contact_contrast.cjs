const fs = require('fs');

let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startContact = current.indexOf('<section id="contacto"');
const endContact = current.indexOf('</section>', startContact) + 10;

let contactCode = current.substring(startContact, endContact);

// 1. Título negro y "tu comunidad?" azul
contactCode = contactCode.replace(
  'className="text-5xl md:text-6xl font-serif text-[#0042a5] leading-[1.1] mb-6"',
  'className="text-5xl md:text-6xl font-serif text-slate-900 leading-[1.1] mb-6"'
);
contactCode = contactCode.replace(
  '<span className="font-bold">{t.contact.titleAccent}</span>',
  '<span className="font-bold text-[#0055c3]">{t.contact.titleAccent}</span>'
);

// 2. Textos Teléfono, WhatsApp, Email más oscuros y grandes
contactCode = contactCode.split('className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1"').join('className="text-[11px] font-extrabold text-slate-700 uppercase tracking-widest mb-1"');

// 3. Reloj azul y más visual
contactCode = contactCode.replace(
  '<div className="flex items-center gap-3 text-slate-500 text-[13px]">',
  '<div className="flex items-center gap-3 text-slate-700 text-[13px] font-medium">'
);
contactCode = contactCode.replace(
  '<div className="w-6 h-6 rounded-full bg-slate-200/50 flex items-center justify-center shrink-0">',
  '<div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">'
);
contactCode = contactCode.replace(
  '<Info className="w-3.5 h-3.5 text-slate-500" />',
  '<Clock className="w-4 h-4 text-[#0055c3]" />'
);

// 4. Tus datos están protegidos más visual
contactCode = contactCode.replace(
  '<div className="flex items-center justify-center gap-2 mt-4 text-slate-400 text-[11px]">',
  '<div className="flex items-center justify-center gap-3 mt-6 text-slate-600 text-[12px] font-medium">'
);
contactCode = contactCode.replace(
  '<Lock className="w-3 h-3" />',
  '<Lock className="w-4 h-4 text-[#0055c3]" />'
);

current = current.substring(0, startContact) + contactCode + current.substring(endContact);

fs.writeFileSync('src/routes/index.tsx', current);
console.log('Styles adjusted!');
