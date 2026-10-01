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
    title: language === "ca" ? "CERCA RÀPIDA D'HABITATGE" : language === "en" ? "QUICK PROPERTY SEARCH" : "BUSCADOR RÁPIDO DE VIVIENDA",
    buy: language === "ca" ? "Comprar" : language === "en" ? "Buy" : "Comprar",
    rent: language === "ca" ? "Llogar" : language === "en" ? "Rent" : "Alquilar",
    area: language === "ca" ? "Zona" : language === "en" ? "Area" : "Zona",
    type: language === "ca" ? "Tipus" : language === "en" ? "Type" : "Tipo",
    price: language === "ca" ? "Preu" : language === "en" ? "Price" : "Precio",
    search: language === "ca" ? "Cercar" : language === "en" ? "Search" : "Buscar",
    anyArea: language === "ca" ? "Qualsevol zona" : language === "en" ? "Any area" : "Cualquier zona",
    anyType: language === "ca" ? "Qualsevol tipus" : language === "en" ? "Any type" : "Cualquier tipo",
    anyPrice: language === "ca" ? "Qualsevol preu" : language === "en" ? "Any price" : "Cualquier precio",
  };

  const STATS = [
    { value: "4.500+", label: t.heroCarousel.stats.clientesLabel, icon: Users },
    { value: "98%", label: t.heroCarousel.stats.satisfaccionLabel, icon: ThumbsUp },
    { value: "+300", label: t.heroCarousel.stats.comunidadesLabel, icon: Building2 },
    { value: "15+", label: t.heroCarousel.stats.anosLabel, icon: Award },
  ];

  return (
    <section 
      id="quick-search-section" 
      className="relative bg-[#F8FAFC] py-10 sm:py-12 md:py-14 border-b border-slate-200/80"
      onClick={() => setOpenDrop(null)}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 xl:px-12">
        
        {/* Panel de Búsqueda Rápida Independiente y Centrado */}
        <div 
          className="max-w-4xl mx-auto bg-white rounded-[24px] sm:rounded-[32px] border-2 border-slate-900 shadow-[0_18px_50px_rgba(15,23,42,0.12)] p-5 sm:p-7 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cabecera del Panel: Título + Selector Comprar / Alquilar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.14em] text-slate-500 font-sans block">
                  {L.title}
                </span>
              </div>
            </div>

            {/* Tabs Comprar / Alquilar */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleModeChange("comprar")}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer select-none ${
                  mode === "comprar"
                    ? "bg-[#2563eb] text-white shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                }`}
              >
                {L.buy}
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("alquilar")}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer select-none ${
                  mode === "alquilar"
                    ? "bg-[#2563eb] text-white shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                }`}
              >
                {L.rent}
              </button>
            </div>
          </div>

          {/* Formulario Desktop: 3 Dropdowns con separadores + Botón Buscar */}
          <div className="hidden sm:flex items-stretch gap-2.5 pt-5">
            {/* Zona */}
            <div className="relative flex-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDrop(openDrop === "zona" ? null : "zona");
                }}
                className="w-full h-full flex items-start gap-2.5 px-4 py-3 rounded-2xl border-2 border-slate-200 hover:border-[#2563eb] hover:bg-blue-50/20 transition-all cursor-pointer text-left group"
              >
                <MapPin className="w-4 h-4 text-[#2563eb] mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{L.area}</div>
                  <div className="text-sm font-extrabold text-[#0f172a] leading-tight truncate">
                    {zona === "Cualquier zona" ? L.anyArea : zona}
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 mt-1 shrink-0 transition-transform ${openDrop === "zona" ? "rotate-180 text-[#2563eb]" : ""}`} />
              </button>
              {openDrop === "zona" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border-2 border-slate-900 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.18)] z-50 p-2 max-h-64 overflow-y-auto">
                  {ZONAS.map((z) => (
                    <button
                      key={z}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setZona(z);
                        setOpenDrop(null);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
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

            {/* Tipo */}
            <div className="relative flex-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDrop(openDrop === "tipo" ? null : "tipo");
                }}
                className="w-full h-full flex items-start gap-2.5 px-4 py-3 rounded-2xl border-2 border-slate-200 hover:border-[#2563eb] hover:bg-blue-50/20 transition-all cursor-pointer text-left group"
              >
                <Home className="w-4 h-4 text-[#2563eb] mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{L.type}</div>
                  <div className="text-sm font-extrabold text-[#0f172a] leading-tight truncate">
                    {tipo === "Cualquier tipo" ? L.anyType : tipo}
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 mt-1 shrink-0 transition-transform ${openDrop === "tipo" ? "rotate-180 text-[#2563eb]" : ""}`} />
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
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
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

            {/* Precio */}
            <div className="relative flex-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDrop(openDrop === "precio" ? null : "precio");
                }}
                className="w-full h-full flex items-start gap-2.5 px-4 py-3 rounded-2xl border-2 border-slate-200 hover:border-[#2563eb] hover:bg-blue-50/20 transition-all cursor-pointer text-left group"
              >
                <Euro className="w-4 h-4 text-[#2563eb] mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{L.price}</div>
                  <div className="text-sm font-extrabold text-[#0f172a] leading-tight truncate">
                    {precio === "Cualquier precio" ? L.anyPrice : precio}
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 mt-1 shrink-0 transition-transform ${openDrop === "precio" ? "rotate-180 text-[#2563eb]" : ""}`} />
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
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
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
              className="flex items-center gap-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white px-7 py-3 rounded-2xl font-black text-sm uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-lg shrink-0 select-none"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>{L.search}</span>
            </button>
          </div>

          {/* Formulario Mobile: Selects nativos amplios + Botón full width */}
          <div className="sm:hidden flex flex-col gap-3 pt-4">
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
              <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2563eb] pointer-events-none" />
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

        {/* ── FRANJA COMPACTA DE CONFIANZA / STATS (Directamente debajo del buscador) ── */}
        <div className="max-w-4xl mx-auto mt-6 sm:mt-8">
          {/* Desktop Horizontal */}
          <div className="hidden sm:flex items-center justify-between bg-white border border-slate-200/90 rounded-2xl px-6 py-3.5 shadow-xs">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex items-center">
                  <div className="flex items-center gap-2.5 px-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-lg xl:text-xl font-black text-[#0f172a] leading-none font-sans">{s.value}</div>
                      <div className="text-[10px] font-bold text-slate-500 mt-0.5 leading-tight font-sans">{s.label}</div>
                    </div>
                  </div>
                  {i < STATS.length - 1 && <div className="w-px h-8 bg-slate-200 mx-2 shrink-0" />}
                </div>
              );
            })}
          </div>

          {/* Mobile 2x2 Grid */}
          <div className="sm:hidden grid grid-cols-2 gap-2.5">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-base font-black text-[#0f172a] leading-none font-sans">{s.value}</div>
                    <div className="text-[9px] font-bold text-slate-500 mt-0.5 leading-tight font-sans">{s.label}</div>
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
