import { useState, useMemo, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Heart, MapPin } from "lucide-react";

type Lang = "es" | "ca" | "en";

export interface PropertyCardSpec {
  id: string;
  icon: any;
  label: string;
  value: string;
  isNumericOnly?: boolean;
}

interface PropertyCardProps {
  property: any;
  /** Datos traducidos (name, type, location) */
  name: string;
  type: string;
  barrioName: string;
  cityName: string;
  specs: PropertyCardSpec[];
  language: Lang;
  isRent: boolean;
  isFav: boolean;
  onToggleFavorite: (id: string) => void;
  detailsLabel: string;
}

const MAX_PHOTOS = 6;

/**
 * Tarjeta de inmueble compartida (home + páginas de ciudad), pensada para
 * rejillas de 4 columnas. Solo lee `image`, `gallery`, `status`, `ref` y
 * `price` del store que alimenta /admin: no cambia el modelo de datos.
 */
export function PropertyCard({
  property,
  name,
  type,
  barrioName,
  cityName,
  specs,
  language,
  isRent,
  isFav,
  onToggleFavorite,
  detailsLabel,
}: PropertyCardProps) {
  // Portada primero (la que el cliente elige en /admin), luego la galería sin duplicados.
  const photos = useMemo<string[]>(() => {
    const all = [property.image, ...(Array.isArray(property.gallery) ? property.gallery : [])]
      .filter((u): u is string => typeof u === "string" && u.trim().length > 0);
    return Array.from(new Set(all)).slice(0, MAX_PHOTOS);
  }, [property.image, property.gallery]);

  const [idx, setIdx] = useState(0);
  const safeIdx = Math.min(idx, Math.max(photos.length - 1, 0));
  const current = photos[safeIdx] || "";
  const hasMany = photos.length > 1;

  const go = (e: MouseEvent, dir: 1 | -1) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((i) => (i + dir + photos.length) % photos.length);
  };

  const operation = isRent
    ? language === "ca" ? "Lloguer" : language === "en" ? "Rent" : "Alquiler"
    : language === "ca" ? "Venda" : language === "en" ? "Sale" : "Venta";
  const reserved = property.status === "reservado";

  return (
    <div className="h-full">
      <Link to="/inmobiliaria/$slug" params={{ slug: property.slug }} className="block h-full">
        <article className="bg-white text-[#111111] border-2 border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#2860F5] hover:border-[#2860F5] hover:-translate-y-0.5 flex flex-col h-full overflow-hidden group transition-all duration-200">
          {/* FOTO */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 border-b-2 border-[#111111]">
            {current ? (
              <img
                key={current}
                src={current}
                alt={name}
                loading="lazy"
                decoding="async"
                width={480}
                height={360}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <MapPin className="w-8 h-8" />
              </div>
            )}

            {/* Chips sólidos */}
            <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1 z-20 max-w-[calc(100%-3.5rem)]">
              <span className="inline-flex items-center gap-1.5 bg-[#111111] text-white text-[12px] font-headline font-black uppercase tracking-wider px-2.5 py-1 border border-white">
                <span className={`w-2 h-2 ${isRent ? "bg-amber-400" : "bg-[#2860F5]"}`} />
                {operation}
              </span>
              <span className="inline-flex items-center bg-[#2860F5] text-white text-[12px] font-headline font-black uppercase tracking-wider px-2.5 py-1 border border-white">
                {type}
              </span>
              {reserved && (
                <span className="inline-flex items-center bg-amber-400 text-black text-[12px] font-headline font-black uppercase tracking-wider px-2.5 py-1 border border-black">
                  {language === "ca" ? "Reservat" : "Reservado"}
                </span>
              )}
            </div>

            {/* Favorito */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(property.id);
              }}
              aria-label={language === "ca" ? "Desar a preferits" : language === "en" ? "Save to favourites" : "Guardar en favoritos"}
              aria-pressed={isFav}
              className={`absolute top-2.5 right-2.5 z-20 w-9 h-9 border-2 border-[#111111] flex items-center justify-center transition-colors cursor-pointer shadow-[2px_2px_0px_#111111] ${
                isFav ? "bg-red-500 text-white" : "bg-white text-[#111111] hover:bg-slate-100"
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
            </button>

            {/* Galería */}
            {hasMany && (
              <>
                <button
                  type="button"
                  onClick={(e) => go(e, -1)}
                  aria-label="Anterior"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white text-[#111111] border-2 border-[#111111] flex items-center justify-center cursor-pointer opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={3} />
                </button>
                <button
                  type="button"
                  onClick={(e) => go(e, 1)}
                  aria-label="Siguiente"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white text-[#111111] border-2 border-[#111111] flex items-center justify-center cursor-pointer opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={3} />
                </button>
                <span className="absolute bottom-2.5 right-2.5 z-20 text-[12px] font-data-mono font-black text-white bg-[#111111] px-2 py-0.5 border border-white">
                  {safeIdx + 1}/{photos.length}
                </span>
              </>
            )}

            {/* Ref */}
            <span className="absolute bottom-2.5 left-2.5 z-20 text-[12px] font-data-mono font-black text-white bg-[#111111] px-2 py-0.5 border border-white">
              Ref: {property.ref || "—"}
            </span>
          </div>

          {/* INFO */}
          <div className="p-4 flex flex-col flex-1 gap-3">
            {/* Barrio protagonista, compacto */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-[10px] bg-[#2860F5] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="min-w-0 flex flex-col">
                <span className="text-[20px] font-headline font-extrabold uppercase leading-none tracking-tight truncate">
                  {barrioName}
                </span>
                <span className="text-[13px] font-semibold text-slate-600 truncate mt-0.5">{cityName}</span>
              </div>
            </div>

            <h3 className="text-[16px] font-headline font-bold leading-snug line-clamp-1 group-hover:text-[#2860F5] transition-colors">
              {name}
            </h3>

            {/* Specs en cajas compactas */}
            {specs.length > 0 && (
              <ul className={`grid gap-2 ${specs.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                {specs.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.id}
                      title={item.label}
                      className="min-w-0 bg-white border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] py-2 px-0.5 flex flex-col items-center text-center"
                    >
                      <span className="w-7 h-7 rounded-md bg-[#2860F5] border border-[#111111] flex items-center justify-center mb-1">
                        <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                      </span>
                      <span
                        className="text-[15px] font-data-mono font-black leading-none whitespace-nowrap"
                        dangerouslySetInnerHTML={{ __html: item.value }}
                      />
                      <span className="mt-1 text-[9.5px] font-headline font-bold uppercase tracking-normal text-slate-600 whitespace-nowrap">
                        {item.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Precio + CTA */}
            <div className="mt-auto pt-3 border-t-2 border-[#111111] flex items-center justify-between gap-2">
              <div className="flex items-baseline whitespace-nowrap min-w-0">
                <span className="text-[24px] font-data-mono font-extrabold leading-none tracking-tight">
                  {new Intl.NumberFormat("es-ES").format(property.price)}&nbsp;€
                </span>
                {isRent && <span className="text-[13px] font-data-mono font-bold ml-1">/mes</span>}
              </div>
              <span
                aria-label={detailsLabel}
                title={detailsLabel}
                className="w-11 h-11 shrink-0 bg-[#2860F5] group-hover:bg-[#111111] text-white border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] flex items-center justify-center transition-colors"
              >
                <ArrowRight className="w-5 h-5" strokeWidth={2.75} />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}

export default PropertyCard;
