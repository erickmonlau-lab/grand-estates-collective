import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Replace underline on "clientes" with a bold solid badge/highlight box (white text on solid blue/teal background pill inside title)
const oldTitle = '<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-[#0f172a] tracking-tight mb-4 font-sans">\n                Lo que dicen nuestros <span className="relative inline-block pb-2"><span className="relative z-10 text-[#2563eb]">clientes</span><span className="absolute bottom-0 left-0 right-0 h-[6px] bg-[#38bdf8] rounded-full" /></span>\n              </h2>';

const newTitle = `<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-[#0f172a] tracking-tight mb-4 font-sans flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                <span>Lo que dicen nuestros</span>
                <span className="inline-block bg-[#2563eb] text-white px-5 py-1.5 rounded-2xl shadow-md rotate-[-1.5deg] border border-blue-400/30">
                  clientes.
                </span>
              </h2>`;

c = c.replace(oldTitle, newTitle);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Title highlight pill badge updated perfectly!');
