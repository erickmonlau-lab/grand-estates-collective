import fs from 'fs';

const filePath = 'src/routes/index.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// 1. Add contactAsunto state and URL param reading effect in Index component
const stateTarget = 'const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);';
const stateReplacement = `const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);
  const [selectedAsunto, setSelectedAsunto] = useState<string>("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const asuntoParam = urlParams.get('asunto');
      if (asuntoParam) {
        setSelectedAsunto(asuntoParam);
      }
    }
  }, []);`;

c = c.replace(stateTarget, stateReplacement);

// 2. Service slug mapping for "Ver página completa →" link
const serviceSlugs = [
  "administracion-de-fincas",
  "gestion-inmobiliaria",
  "asesoria-juridica-fiscal",
  "obras-mantenimiento"
];

const serviceAsuntoOptions = [
  "Administración de Fincas",
  "Gestión Inmobiliaria",
  "Asesoría Jurídica",
  "Obras y Reformas"
];

// 3. Update Service Modal JSX
// Add "Ver página completa →" link before contactBtn, and connect "Solicitar este servicio" to contact form pre-selecting select option
const oldModalButtons = `<div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="#contacto"
                  onClick={() => setSelectedServiceIndex(null)}
                  className="w-full sm:flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm py-3.5 px-6 rounded-full text-center transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {t.serviceModal.contactBtn} <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setSelectedServiceIndex(null)}
                  className="w-full sm:w-auto bg-white border border-slate-200/80 hover:bg-slate-100 text-slate-700 font-bold font-bold text-sm py-3.5 px-6 rounded-full transition-all cursor-pointer"
                >
                  {t.serviceModal.closeBtn}
                </button>
              </div>`;

const serviceSlugsArrayJSON = JSON.stringify(serviceSlugs);
const serviceAsuntosArrayJSON = JSON.stringify(serviceAsuntoOptions);

const newModalContent = `
              {/* Enlace SEO a página dedicada completa */}
              <div className="mb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to="/servicios/$slug"
                  params={{ slug: ${serviceSlugsArrayJSON}[selectedServiceIndex] || "administracion-de-fincas" }}
                  onClick={() => setSelectedServiceIndex(null)}
                  className="inline-flex items-center gap-2 text-[#005c99] hover:text-[#0284c7] font-extrabold text-sm hover:gap-3 transition-all"
                >
                  <span>Ver página completa de este servicio</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="#contacto"
                  onClick={() => {
                    const asunto = ${serviceAsuntosArrayJSON}[selectedServiceIndex] || "";
                    if (asunto) setSelectedAsunto(asunto);
                    setSelectedServiceIndex(null);
                  }}
                  className="w-full sm:flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm py-3.5 px-6 rounded-full text-center transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {t.serviceModal.contactBtn} <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedServiceIndex(null)}
                  className="w-full sm:w-auto bg-white border border-slate-200/80 hover:bg-slate-100 text-slate-700 font-bold text-sm py-3.5 px-6 rounded-full transition-all cursor-pointer"
                >
                  {t.serviceModal.closeBtn}
                </button>
              </div>`;

c = c.replace(oldModalButtons, newModalContent);

// 4. Update contact form select input to use selectedAsunto controlled value
const oldSelect = `<select className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-3.5 sm:px-5 py-3.5 text-xs sm:text-sm font-medium text-[#0f172a] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition-colors appearance-none pr-9 cursor-pointer truncate font-sans">
                        {Object.values(t.contacto.form.asuntoOpciones).map(opt => <option key={opt as string} className="text-xs sm:text-sm">{opt as string}</option>)}
                      </select>`;

const newSelect = `<select 
                        value={selectedAsunto}
                        onChange={(e) => setSelectedAsunto(e.target.value)}
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-3.5 sm:px-5 py-3.5 text-xs sm:text-sm font-medium text-[#0f172a] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition-colors appearance-none pr-9 cursor-pointer truncate font-sans"
                      >
                        <option value="">{t.contacto.form.asuntoPlaceholder || "Selecciona un tipo de consulta"}</option>
                        {Object.values(t.contacto.form.asuntoOpciones).map(opt => <option key={opt as string} value={opt as string} className="text-xs sm:text-sm">{opt as string}</option>)}
                      </select>`;

c = c.replace(oldSelect, newSelect);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Service modal SEO link and contact form auto-selection connected!');
