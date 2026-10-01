import { useState } from "react";
import { Search, MapPin, Home, Euro, ChevronDown, Check, Users, ThumbsUp, Building2, Award } from "lucide-react";
import { translations } from "@/data/translations";

interface QuickSearchProps {
  language?: "es" | "en" | "ca";
  onPerformSearch?: (p: { mode: string; zona: string; tipo: string; precio: string }) => void;
}

const ZONAS = [
  "Cualquier zona",
  "Santa Rosa - Can Mariner",
  "Fondo",
  "Riu",
  "Centro",
  "El Raval",
  "Riera Alta - Llatí",
  "Singuerlín",
];

const TIPOS = [
  "Cualquier tipo",
  "Piso",
  "Apartamento",
  "Ático",
  "Chalet",
  "Local",
  "Oficina",
];

const PRECIOS_COMPRA = [
  "Cualquier precio",
  "Hasta 500.000 €",
  "Hasta 1.000.000 €",
  "Hasta 2.000.000 €",
];

const PRECIOS_ALQUILER = [
  "Cualquier precio",
  "Hasta 1.000 €",
  "Hasta 1.500 €",
  "Hasta 2.000 €",
];

export function QuickSearchSection({
  language = "es",
  onPerformSearch,
}: QuickSearchProps) {
  const t = translations[language];

  const [mode, setMode] = useState<"comprar" | "alquilar">("comprar");
  const [zona, setZona] = useState("Cualquier zona");
  const [tipo, setTipo] = useState("Cualquier tipo");
  const [precio, setPrecio] = useState("Cualquier precio");
  const [openDrop, setOpenDrop] = useState<"zona" | "tipo" | "precio" | null>(null);

  const precios = mode === "alquilar" ? PRECIOS_ALQUILER : PRECIOS_COMPRA;

  const handleModeChange = (newMode: "comprar" | "alquilar") => {
    setMode(newMode);
    setPrecio("Cualquier precio");
  };

  const handleSearch = () => {
    onPerformSearch?.({ mode, zona, tipo, precio });
    const el = document.getElementById("propiedades");
    if (el) {
      const navOffset = window.innerWidth < 768 ? 90 : 100;
      const pos = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
      window.history.replaceState(null, "", "#propiedades");
    }
  };

  const L = {
    tag: language === "ca" ? "BUSCADOR RÀPID" : language === "en" ? "QUICK SEARCH" : "BUSCADOR RÁPIDO",
    question: language === "ca" ? "Quin tipus de propietat cerques?" : language === "en" ? "What kind of property are you looking for?" : "¿Qué tipo de propiedad buscas?",
    buy: language === "ca" ? "Comprar" : language === "en" ? "Buy" : "Comprar",
    rent: language === "ca" ? "Llogar" : language === "en" ? "Rent" : "Alquilar",
    searchBy: language === "ca" ? "Cercar per:" : language === "en" ? "Search by:" : "Buscar por:",
    area: language === "ca" ? "Zona" : language === "en" ? "Area" : "Zona",
    type: language === "ca" ? "Tipus" : language === "en" ? "Type" : "Tipo",
    price: language === "ca" ? "Preu" : language === "en" ? "Price" : "Precio",
    search: language === "ca" ? "Cercar" : language === "en" ? "Search" : "Buscar",
    anyArea: language === "ca" ? "Qualsevol zona" : language === "en" ? "Any area" : "Cualquier zona",
    anyType: language === "ca" ? "Qualsevol tipus" : language === "en" ? "Any type" : "Cualquier tipo",
    anyPrice: language === "ca" ? "Qualsevol preu" : language === "en" ? "Any price" : "Cualquier precio",
  };

  const STATS = [
    { value: "4.500+", label: t.heroCarousel.stats.clientesLabel, icon: Users, dark: true },
    { value: "98%", label: t.heroCarousel.stats.satisfaccionLabel, icon: ThumbsUp, dark: false },
    { value: "+300", label: t.heroCarousel.stats.comunidadesLabel, icon: Building2, dark: true },
    { value: "15+", label: t.heroCarousel.stats.anosLabel, icon: Award, dark: false },
  ];

  return (
    <section 
      id="quick-search-section" 
      className="relative bg-[#F8FAFC] py-10 sm:py-14 md:py-16 border-b border-slate-200/80"
      onClick={() => setOpenDrop(null)}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 xl:px-12">
        
        {/* ── PANEL DE BÚSQUEDA RÁPIDA (Inspirado en la composición central de la referencia) ── */}
        <div 
          className="max-w-4xl mx-auto bg-white rounded-[28px] sm:rounded-[36px] border-2 border-slate-900/90 shadow-[0_20px_60px_rgba(15,23,42,0.12)] p-6 sm:p-8 md:p-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Fila Superior: Barra de Búsqueda estilo Pill Input */}
          <div className="relative mb-6">
            <div className="w-full flex items-center bg-slate-50 border-2 border-slate-200 focus-within:border-[#2563eb] rounded-full px-5 py-3.5 sm:py-4 transition-all shadow-inner">
              <Search className="w-5 h-5 text-red-500 shrink-0 mr-3 stroke-[2.5]" />
              <input
                type="text"
                readOnly
                onClick={handleSearch}
                placeholder={L.question}
                value={`${zona !== "Cualquier zona" ? zona + " · " : ""}${tipo !== "Cualquier tipo" ? tipo + " · " : ""}${mode === "comprar" ? L.buy : L.rent}`}
                className="w-full bg-transparent text-sm sm:text-base font-bold text-slate-800 placeholder:text-slate-400 outline-none cursor-pointer"
              />
              <span className="hidden sm:inline-flex items-center text-xs font-black uppercase tracking-wider text-slate-400 bg-white border border-slate-200 px-3 py-1 rounded-full shrink-0 shadow-2xs">
                {mode === "comprar" ? L.buy : L.rent}
              </span>
            </div>
          </div>

          {/* Fila de Filtros y Acción Rápida (Desktop) */}
          <div className="hidden sm:flex items-center justify-between gap-3 pt-1">
            {/* Indicador Buscar por */}
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest shrink-0 font-sans">
              {L.searchBy}
            </span>

            {/* Selector Comprar / Alquilar */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl gap-1 shrink-0">
              <button
                type="button"
                onClick={() => handleModeChange("comprar")}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer select-none flex items-center gap-1.5 ${
                  mode === "comprar"
                    ? "bg-[#2563eb] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>{L.buy}</span>
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("alquilar")}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer select-none flex items-center gap-1.5 ${
                  mode === "alquilar"
                    ? "bg-[#2563eb] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>{L.rent}</span>
              </button>
            </div>

            {/* Dropdown Zona */}
            <div className="relative flex-1 max-w-[200px]">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDrop(openDrop === "zona" ? null : "zona");
                }}
                className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 hover:border-[#2563eb] bg-white transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin className="w-4 h-4 text-[#2563eb] shrink-0" />
                  <span className="text-xs font-bold text-slate-800 truncate">
                    {zona === "Cualquier zona" ? L.area : zona}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${openDrop === "zona" ? "rotate-180 text-[#2563eb]" : ""}`} />
              </button>
              {openDrop === "zona" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border-2 border-slate-900 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.18)] z-50 p-2 max-h-60 overflow-y-auto">
                  {ZONAS.map((z) => (
                    <button
                      key={z}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setZona(z);
                        setOpenDrop(null);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                        zona === z ? "bg-[#2563eb] text-white" : "hover:bg-blue-50 text-slate-800"
                      }`}
                    >
                      {zona === z && <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
                      {z === "Cualquier zona" ? L.anyArea : z}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown Tipo */}
            <div className="relative flex-1 max-w-[180px]">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDrop(openDrop === "tipo" ? null : "tipo");
                }}
                className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 hover:border-[#2563eb] bg-white transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Building2 className="w-4 h-4 text-[#2563eb] shrink-0" />
                  <span className="text-xs font-bold text-slate-800 truncate">
                    {tipo === "Cualquier tipo" ? L.type : tipo}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${openDrop === "tipo" ? "rotate-180 text-[#2563eb]" : ""}`} />
              </button>
              {openDrop === "tipo" && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border-2 border-slate-900 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.18)] z-50 p-2">
                  {TIPOS.map((tp) => (
                    <button
                      key={tp}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTipo(tp);
                        setOpenDrop(null);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                        tipo === tp ? "bg-[#2563eb] text-white" : "hover:bg-blue-50 text-slate-800"
                      }`}
                    >
                      {tipo === tp && <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
                      {tp === "Cualquier tipo" ? L.anyType : tp}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown Precio */}
            <div className="relative flex-1 max-w-[180px]">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDrop(openDrop === "precio" ? null : "precio");
                }}
                className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 hover:border-[#2563eb] bg-white transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Euro className="w-4 h-4 text-[#2563eb] shrink-0" />
                  <span className="text-xs font-bold text-slate-800 truncate">
                    {precio === "Cualquier precio" ? L.price : precio}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${openDrop === "precio" ? "rotate-180 text-[#2563eb]" : ""}`} />
              </button>
              {openDrop === "precio" && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border-2 border-slate-900 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.18)] z-50 p-2">
                  {precios.map((pr) => (
                    <button
                      key={pr}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPrecio(pr);
                        setOpenDrop(null);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                        precio === pr ? "bg-[#2563eb] text-white" : "hover:bg-blue-50 text-slate-800"
                      }`}
                    >
                      {precio === pr && <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
                      {pr === "Cualquier precio" ? L.anyPrice : pr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Botón Buscar */}
            <button
              type="button"
              onClick={handleSearch}
              className="flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-lg shrink-0 select-none"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>{L.search}</span>
            </button>
          </div>

          {/* Formulario Mobile: Confortable y en flujo */}
          <div className="sm:hidden flex flex-col gap-3 pt-2">
            <div className="flex bg-slate-100 p-1 rounded-2xl gap-1">
              <button
                type="button"
                onClick={() => handleModeChange("comprar")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  mode === "comprar" ? "bg-[#2563eb] text-white shadow-sm" : "text-slate-600"
                }`}
              >
                {L.buy}
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("alquilar")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  mode === "alquilar" ? "bg-[#2563eb] text-white shadow-sm" : "text-slate-600"
                }`}
              >
                {L.rent}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2563eb] pointer-events-none" />
                <select
                  value={zona}
                  onChange={(e) => setZona(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border-2 border-slate-200 focus:border-[#2563eb] rounded-xl pl-10 pr-8 py-3 text-xs font-bold text-[#0f172a] outline-none"
                >
                  {ZONAS.map((z) => (
                    <option key={z} value={z}>{z === "Cualquier zona" ? L.anyArea : z}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2563eb] pointer-events-none" />
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border-2 border-slate-200 focus:border-[#2563eb] rounded-xl pl-10 pr-8 py-3 text-xs font-bold text-[#0f172a] outline-none"
                >
                  {TIPOS.map((tp) => (
                    <option key={tp} value={tp}>{tp === "Cualquier tipo" ? L.anyType : tp}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <Euro className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2563eb] pointer-events-none" />
                <select
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border-2 border-slate-200 focus:border-[#2563eb] rounded-xl pl-10 pr-8 py-3 text-xs font-bold text-[#0f172a] outline-none"
                >
                  {precios.map((pr) => (
                    <option key={pr} value={pr}>{pr === "Cualquier precio" ? L.anyPrice : pr}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="w-full flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md mt-1 cursor-pointer"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>{L.search}</span>
            </button>
          </div>
        </div>

        {/* ── FRANJA DE ESTADÍSTICAS / TRUST (Inspirada en el ritmo alterno de la referencia) ── */}
        <div className="max-w-4xl mx-auto mt-8 sm:mt-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div 
                  key={i} 
                  className={`rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all ${
                    s.dark 
                      ? "bg-[#0b1728] text-white shadow-md border border-slate-800" 
                      : "bg-white text-[#0f172a] shadow-sm border border-slate-200/90"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 ${
                    s.dark ? "bg-white/10 text-blue-400" : "bg-blue-50 text-[#2563eb]"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black tracking-tight leading-none font-sans mb-1">
                    {s.value}
                  </div>
                  <div className={`text-[10px] sm:text-xs font-bold leading-tight font-sans ${
                    s.dark ? "text-slate-300" : "text-slate-500"
                  }`}>
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

export default QuickSearchSection;
