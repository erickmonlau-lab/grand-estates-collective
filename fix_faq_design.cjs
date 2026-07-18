const fs = require('fs');

let current = fs.readFileSync('src/routes/index.tsx', 'utf8');

const startFaq = current.indexOf('<section id="faq"');
const endFaq = current.indexOf('</section>', startFaq) + 10;

const newFaq = `<section id="faq" className="py-24 md:py-32 px-6 md:px-12 bg-[#f8fbff] relative overflow-hidden text-slate-800">
          {/* Subtle wavy background decorations (mimicking the screenshot) */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-100/40 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
            <Reveal>
              <div className="text-center mb-16">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#0055c3] font-bold mb-4">{t.faq.tag}</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-[1.2] text-slate-900 tracking-tight mb-5">
                  {t.faq.title.split(' ').slice(0, -1).join(' ')} <span className="text-[#0055c3]">{t.faq.title.split(' ').slice(-1)}</span>
                </h2>
                <p className="text-slate-500 text-[15px] max-w-[500px] mx-auto leading-relaxed">
                  {language === 'es' ? "Encuentre respuestas claras a las preguntas más comunes sobre nuestros servicios y procesos." :
                   language === 'ca' ? "Trobi respostes clares a les preguntes més comunes sobre els nostres serveis i processos." :
                   "Find clear answers to the most common questions about our services and processes."}
                </p>
              </div>
            </Reveal>

            <div className="w-full flex flex-col gap-4">
              {t.faq.items.map((item, i) => {
                const isActive = activeFaq === i;
                const faqIcons = [
                  <Building2 className="w-5 h-5 text-[#0055c3]" />,
                  <Shield className="w-5 h-5 text-[#0055c3]" />,
                  <Clock className="w-5 h-5 text-[#0055c3]" />,
                  <Scale className="w-5 h-5 text-[#0055c3]" />
                ];
                return (
                  <Reveal key={i} delay={i * 0.1}>
                    <div 
                      onClick={() => setActiveFaq(isActive ? null : i)}
                      className="cursor-pointer bg-white border border-slate-100 rounded-2xl p-5 md:px-8 md:py-6 transition-all duration-300 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-slate-200 group"
                    >
                      <div className="flex justify-between items-center gap-6">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#0055c3]/10">
                            {faqIcons[i % faqIcons.length]}
                          </div>
                          <h3 className="font-bold text-slate-800 text-[15px] md:text-[16px]">{item.q}</h3>
                        </div>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600 transition-colors">
                          <ChevronDown className={\`w-4 h-4 transition-transform duration-300 \${isActive ? 'rotate-180' : 'rotate-0'}\`} />
                        </div>
                      </div>
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden md:pl-[68px]"
                          >
                            <p className="pt-4 text-slate-500 leading-relaxed text-[14px]">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>`;

current = current.substring(0, startFaq) + newFaq + current.substring(endFaq);

fs.writeFileSync('src/routes/index.tsx', current);
console.log('FAQ section updated!');
