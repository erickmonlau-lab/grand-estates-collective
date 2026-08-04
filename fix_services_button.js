import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// 1. Title & Subtitle size and padding adjustments for Services section
c = c.replace(
  'h2 key={language} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-3 tracking-tight font-sans"',
  'h2 key={language} className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-2 tracking-tight font-sans"'
);

c = c.replace(
  'p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed"',
  'p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed"'
);

// 2. Container inner padding
c = c.replace(
  'div className="bg-[#0f172a] rounded-[28px] md:rounded-[36px] shadow-xl border border-sky-500/20 p-4 sm:p-4 md:p-5 mx-4 md:mx-auto max-w-[1300px] relative z-10 overflow-hidden text-white"',
  'div className="bg-[#0f172a] rounded-[28px] md:rounded-[36px] shadow-xl border border-sky-500/20 p-5 sm:p-7 md:p-10 mx-4 md:mx-auto max-w-[1300px] relative z-10 overflow-hidden text-white"'
);

// 3. Grid cards padding & layout
c = c.replace(
  'className="group bg-white text-[#0f172a] rounded-3xl p-6 border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-6 h-full"',
  'className="group bg-white text-[#0f172a] rounded-2xl md:rounded-3xl p-5 md:p-6 border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-5 h-full"'
);

// 4. Change "Saber más" link to a prominent button with pill design
const saberMasOld = `<button 
                          onClick={() => setSelectedServiceIndex(i)}
                          className="text-[#0284c7] hover:text-[#0369a1] text-xs sm:text-sm font-bold flex items-center gap-1.5 group-hover:gap-2.5 transition-all cursor-pointer border-0 bg-transparent p-0"
                        >
                          {t.servicios.saberMas} <ArrowRight className="w-4 h-4 text-[#0284c7]" />
                        </button>`;

const saberMasNew = `<button 
                          onClick={() => setSelectedServiceIndex(i)}
                          className="mt-1 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm py-2.5 px-5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2 group/btn"
                        >
                          <span>{t.servicios.saberMas}</span>
                          <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
                        </button>`;

c = c.replace(saberMasOld, saberMasNew);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Services section adjusted and Saber más styled as a button!');
