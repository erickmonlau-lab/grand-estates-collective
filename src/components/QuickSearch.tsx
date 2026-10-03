import React, { useState } from 'react';
import { Search, MapPin, Building2, Euro, ChevronDown, Check } from "lucide-react";

interface QuickSearchProps {
  onPerformSearch?: (p: { mode: string; zona: string; tipo: string; precio: string }) => void;
  language?: "es" | "en" | "ca";
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

export default function QuickSearch({ onPerformSearch, language = "es" }: QuickSearchProps) {
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
    const el = document.getElementById("properties-results") || document.getElementById("propiedades");
    if (el) {
      const navOffset = window.innerWidth < 768 ? 75 : 85;
      const pos = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
      window.history.replaceState(null, "", "#properties-results");
    }
  };

  const L = {
    title: language === "ca" ? "Cercar habitatge" : language === "en" ? "Search property" : "Buscar vivienda",
    buy: language === "ca" ? "Comprar" : language === "en" ? "Buy" : "Comprar",
    rent: language === "ca" ? "Llogar" : language === "en" ? "Rent" : "Alquilar",
    area: language === "ca" ? "Zona" : language === "en" ? "Area" : "Zona",
    type: language === "ca" ? "Tipus" : language === "en" ? "Type" : "Tipo",
    price: language === "ca" ? "Preu" : language === "en" ? "Price" : "Precio",
    search: language === "ca" ? "Cercar" : language === "en" ? "Search" : "Buscar",
    anyArea: language === "ca" ? "Qualsevol zona" : language === "en" ? "Any area" : "Cualquier zona",
    anyType: language === "ca" ? "Qualsevol" : language === "en" ? "Any" : "Cualquiera",
    anyPrice: language === "ca" ? "Qualsevol preu" : language === "en" ? "Any price" : "Cualquier precio",
  };

  return (
    <section 
      id="quick-search" 
      className="bg-white py-8 sm:py-10 md:py-12 border-b border-slate-200/80 relative"
      onClick={() => setOpenDrop(null)}
    >
      <div className="max-w-[1150px] mx-auto px-4 sm:px-6 md:px-8">
        <div 
          className="bg-white rounded-3xl border-2 border-slate-900 shadow-[0_16px_45px_rgba(15,23,42,0.10)] p-5 sm:p-7 md:p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del buscador: Título "BUSCAR VIVIENDA" + Toggle [COMPRAR] [ALQUILAR] */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0 border border-blue-100 shadow-xs">
                <Search className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-[#0b214a] uppercase tracking-wider font-heading">
                  {L.title}
                </h2>
                <p className="text-xs font-semibold text-slate-500">
                  {language === "ca"
                    ? "Filtra les millors oportunitats a Santa Coloma i rodalies"
                    : language === "en"
                    ? "Filter the best opportunities in Santa Coloma and surroundings"
                    : "Filtra las mejores oportunidades en Santa Coloma y alrededores"}
                </p>
              </div>
            </div>

            {/* Toggle Comprar / Alquilar */}
            <div className="flex bg-slate-100/90 p-1 rounded-2xl border border-slate-200 w-full sm:w-auto shadow-inner">
              <button
                type="button"
                onClick={() => handleModeChange("comprar")}
                className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer select-none ${
                  mode === "comprar"
                    ? "bg-[#2563eb] text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {L.buy}
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("alquilar")}
                className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer select-none ${
                  mode === "alquilar"
                    ? "bg-[#2563eb] text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {L.rent}
              </button>
            </div>
          </div>

          {/* Formulario Desktop (3 Selects/Dropdowns + Botón BUSCAR en fila horizontal) */}
          <div className="hidden sm:grid sm:grid-cols-12 gap-3 items-center">
            {/* Dropdown Zona */}
            <div className="sm:col-span-3 relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDrop(openDrop === "zona" ? null : "zona");
                }}
                className="w-full bg-slate-50 hover:bg-slate-100/80 border-2 border-slate-200 hover:border-[#2563eb] rounded-2xl px-4 py-3 flex items-center justify-between text-left transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1">
                  <MapPin className="w-4 h-4 text-[#2563eb] shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none mb-1">
                      {L.area}
                    </span>
                    <span className="block text-xs font-bold text-[#0f172a] truncate">
                      {zona === "Cualquier zona" ? L.anyArea : zona}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openDrop === "zona" ? "rotate-180 text-[#2563eb]" : ""}`} />
              </button>
              {openDrop === "zona" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border-2 border-slate-900 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.18)] z-50 p-2 max-h-72 overflow-y-auto">
                  {ZONAS.map((z) => (
                    <button
                      key={z}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setZona(z);
                        setOpenDrop(null);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
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
            <div className="sm:col-span-3 relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDrop(openDrop === "tipo" ? null : "tipo");
                }}
                className="w-full bg-slate-50 hover:bg-slate-100/80 border-2 border-slate-200 hover:border-[#2563eb] rounded-2xl px-4 py-3 flex items-center justify-between text-left transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1">
                  <Building2 className="w-4 h-4 text-[#2563eb] shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none mb-1">
                      {L.type}
                    </span>
                    <span className="block text-xs font-bold text-[#0f172a] truncate">
                      {tipo === "Cualquier tipo" ? L.anyType : tipo}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openDrop === "tipo" ? "rotate-180 text-[#2563eb]" : ""}`} />
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
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
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
            <div className="sm:col-span-3 relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDrop(openDrop === "precio" ? null : "precio");
                }}
                className="w-full bg-slate-50 hover:bg-slate-100/80 border-2 border-slate-200 hover:border-[#2563eb] rounded-2xl px-4 py-3 flex items-center justify-between text-left transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1">
                  <Euro className="w-4 h-4 text-[#2563eb] shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none mb-1">
                      {L.price}
                    </span>
                    <span className="block text-xs font-bold text-[#0f172a] truncate">
                      {precio === "Cualquier precio" ? L.anyPrice : precio}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openDrop === "precio" ? "rotate-180 text-[#2563eb]" : ""}`} />
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
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
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
            <div className="sm:col-span-3">
              <button
                type="button"
                onClick={handleSearch}
                className="btn-lift w-full bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white py-3.5 px-6 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_6px_20px_rgba(37,99,235,0.35)] transition-all cursor-pointer select-none"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>{L.search}</span>
              </button>
            </div>
          </div>

          {/* Formulario Mobile (Vertical, táctil y accesible) */}
          <div className="sm:hidden flex flex-col gap-3">
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2563eb] pointer-events-none" />
              <select
                value={zona}
                onChange={(e) => setZona(e.target.value)}
                className="w-full appearance-none bg-slate-50 border-2 border-slate-200 focus:border-[#2563eb] rounded-2xl pl-10 pr-9 py-3 text-xs font-bold text-[#0f172a] outline-none shadow-xs"
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
                className="w-full appearance-none bg-slate-50 border-2 border-slate-200 focus:border-[#2563eb] rounded-2xl pl-10 pr-9 py-3 text-xs font-bold text-[#0f172a] outline-none shadow-xs"
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
                className="w-full appearance-none bg-slate-50 border-2 border-slate-200 focus:border-[#2563eb] rounded-2xl pl-10 pr-9 py-3 text-xs font-bold text-[#0f172a] outline-none shadow-xs"
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
              className="w-full flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-md mt-1 cursor-pointer"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>{L.search}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
