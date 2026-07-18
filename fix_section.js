const fs = require('fs');
let content = fs.readFileSync('src/routes/index.tsx', 'utf8');

const regex = /<section id="contacto".*?<\/section>/s;

const newSection = \        <section id="contacto" className="py-28 md:py-36 px-6 md:px-12 bg-slate-50 text-slate-900 relative">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start relative">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <Reveal delay={0}>
                <div className="inline-block bg-[#0082c8] text-white text-[10px] uppercase font-bold tracking-widest px-4 py-2 rounded-full mb-6">
                  {language === 'es' ? "Presupuesto gratuito" : "Pressupost gratuït"}
                </div>
                <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter leading-[1.05] text-[#0f172a]">
                  {language === 'es' ? (
                    <>Solicita tu<br />presupuesto <span className="text-[#00a2ff]">sin<br />compromiso</span></>
                  ) : (
                    <>Sol·licita el teu<br />pressupost <span className="text-[#00a2ff]">sense<br />compromís</span></>
                  )}
                </h2>
                <p className="text-lg text-slate-600 mb-12 max-w-[400px] leading-relaxed">
                  {language === 'es' ? "Respondemos en menos de 24 horas. Sin compromiso. Visita técnica gratuita." : "Responem en menys de 24 hores. Sense compromís. Visita tècnica gratuïta."}
                </p>

                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#0082c8]/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0082c8] group-hover:text-white transition-all duration-300">
                      <Phone className="w-5 h-5 text-[#0082c8] group-hover:text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">{language === 'es' ? "Llamar ahora" : "Trucar ara"}</div>
                      <div className="font-black text-[17px] text-slate-900">934 685 656</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                      <MessageSquare className="w-5 h-5 text-emerald-500 group-hover:text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">WhatsApp</div>
                      <div className="font-black text-[17px] text-slate-900">+34 600 000 000</div>
                    </div>
                  </div>
                  <a href="mailto:info@gesgrama.com" className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-[#0082c8]/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0082c8] group-hover:text-white transition-all duration-300">
                      <Mail className="w-5 h-5 text-[#0082c8] group-hover:text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Email</div>
                      <div className="font-black text-[17px] text-slate-900">info@gesgrama.com</div>
                    </div>
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={0.1}>
                <div className="bg-white border border-slate-200 p-6 md:p-10 rounded-[2.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] relative z-10">
                  <h3 className="font-black text-xl md:text-2xl text-slate-900 mb-2 leading-tight">
                    {language === 'es' ? "Solicita tu presupuesto sin compromiso" : "Sol·licita el teu pressupost sense compromís"}
                  </h3>
                  <p className="text-sm text-slate-500 mb-6 font-medium">
                    {language === 'es' ? "Respondemos en menos de 24 horas. Sin compromiso. Visita técnica gratuita." : "Responem en menys de 24 hores. Sense compromís. Visita tècnica gratuïta."}
                  </p>

                  <form key={language} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField label={language === 'es' ? "Nombre" : "Nom"} placeholder={language === 'es' ? "Tu nombre y apellidos..." : "Nom"} />
                      <FormField label={language === 'es' ? "Teléfono" : "Telèfon"} placeholder={language === 'es' ? "Ej: 600 000 000" : "Telèfon"} />
                    </div>
                    <FormField label="Email" type="email" placeholder={language === 'es' ? "tu-correo@ejemplo.com" : "email@example.com"} />
                    <div>
                      <label className="text-slate-700 font-bold uppercase tracking-wider block mb-2 text-[10px]">
                        {language === 'es' ? "Servicio de interés" : "Servei d'interès"} *
                      </label>
                      <div className="relative">
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-[14px] font-medium text-slate-900 focus:border-[#0082c8] focus:ring-1 focus:ring-[#0082c8] outline-none transition-colors appearance-none">
                          <option>{language === 'es' ? "Administración de Fincas" : "Administració de Finques"}</option>
                          <option>{language === 'es' ? "Inmobiliaria (Venta / Alquiler)" : "Immobiliària (Venda / Lloguer)"}</option>
                          <option>{language === 'es' ? "Asesoría Jurídica" : "Assessoria Jurídica"}</option>
                          <option>{language === 'es' ? "Gestión de Patrimonios" : "Gestió de Patrimonis"}</option>
                          <option>{language === 'es' ? "Otro servicio" : "Altre servei"}</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center px-2 text-slate-500">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                    </div>
                    <FormField label={language === 'es' ? "Mensaje" : "Missatge"} placeholder={language === 'es' ? "Cuéntanos qué necesita tu finca o qué problemas queréis solucionar..." : "Descriviu el vostre projecte o necessitat..."} textarea />
                    
                    <button
                      type="button"
                      className="w-full bg-[#0f172a] text-white py-3.5 mt-6 rounded-full text-[15px] font-bold transition-all duration-300 hover:bg-[#1e293b] hover:shadow-lg hover:-translate-y-0.5"
                    >
                      {language === 'es' ? "Solicitar Presupuesto Gratuito" : "Sol·licitar Pressupost Gratuït"}
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </section>\;

content = content.replace(regex, newSection);

// Fix FormField
const formFieldOld = /function FormField.*?<\/div>\\s*\\);\\s*}/s;
const formFieldNew = \unction FormField({ label, placeholder, type = "text", textarea }: { label: string; placeholder: string; type?: string; textarea?: boolean }) {
  return (
    <div>
      <label className="text-slate-700 font-bold uppercase tracking-wider block mb-2 text-[10px]">{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          placeholder={placeholder}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-[14px] font-medium text-slate-900 focus:border-[#0082c8] focus:ring-1 focus:ring-[#0082c8] outline-none transition-colors resize-none placeholder:text-slate-400"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-[14px] font-medium text-slate-900 focus:border-[#0082c8] focus:ring-1 focus:ring-[#0082c8] outline-none transition-colors placeholder:text-slate-400"
        />
      )}
    </div>
  );
}\;
content = content.replace(formFieldOld, formFieldNew);

fs.writeFileSync('src/routes/index.tsx', content, 'utf8');
console.log('Fixed syntax and form!');
