import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

const target = `<div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-bold">
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
                        {t.valorador.sinCompromiso}
                      </span>
                      <span className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                        {t.valorador.resultadoInmediato}
                      </span>
                    </div>`;

const replacement = `<div className="flex flex-wrap items-center gap-6 text-slate-700 text-sm font-bold">
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                        {t.valorador.sinCompromiso}
                      </span>
                      <span className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        {t.valorador.resultadoInmediato}
                      </span>
                    </div>`;

c = c.replace(target, replacement);
fs.writeFileSync(filePath, c, 'utf8');
console.log('Valuator footer text contrast fixed!');
