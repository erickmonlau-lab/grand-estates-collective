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
 * Tarjeta de inmueble compartida (home + páginas de ciudad).
 * Solo lee `image`, `gallery`, `status`, `ref`, `price` del store que
 * alimenta /admin: no cambia el modelo de datos.
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
  const current = photos[Math.min(idx, Math.max(photos.length - 1, 0))] || "";
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
  const priceLabel = isRent
    ? language === "ca" ? "Preu de lloguer" : language === "en" ? "Rental price" : "Precio de alquiler"
    : language === "ca" ? "Preu de venda" : language === "en" ? "Sale price" : "Precio de venta";

  return (
    <div className="h-full">
      <Link to="/inmobiliaria/$slug" params={{ slug: property.slug }} className="block h-full">
        <article className="bg-white text-[#111111] border-[1.5px] border-[#111111] rounded-2xl flex flex-col h-full overflow-hidden group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#2860F5]">
          {/* Foto */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
            {current ? (
              <img
                key={current}
                src={current}
                alt={name}
                loading="lazy"
                decoding="async"
                width={640}
                height={480}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <MapPin className="w-8 h-8" />
              </div>
            )}

            {/* Chips */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 z-20">
              <span className="inline-flex items-center gap-1.5 bg-[#111111]/90 backdrop-blur-sm text-white text-[11px] font-headline font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                <span className={`w-1.5 h-1.5 rounded-full ${isRent ? "bg-amber-400" : "bg-[#2860F5]"}`} />
                {operation}
              </span>
              {reserved && (
                <span className="inline-flex items-center bg-amber-400 text-black text-[11px] font-headline font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
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
              className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer shadow-sm ${
                isFav ? "bg-red-500 text-white" : "bg-white/95 text-[#111111] hover:bg-white"
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
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 text-[#111111] flex items-center justify-center shadow-sm cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => go(e, 1)}
                  aria-label="Siguiente"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 text-[#111111] flex items-center justify-center shadow-sm cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="absolute bottom-3 right-3 z-20 text-[11px] font-data-mono font-bold text-white bg-[#111111]/80 px-2 py-0.5 rounded-full">
                  {Math.min(idx, photos.length - 1) + 1}/{photos.length}
                </span>
              </>
            )}
          </div>

          {/* Info */}
          <div className="p-5 flex flex-col flex-1 gap-3">
            <div className="flex items-baseline justify-between gap-3">
              <div className="flex items-baseline whitespace-nowrap" title={priceLabel}>
                <span className="text-[26px] sm:text-[28px] font-data-mono font-extrabold leading-none tracking-tight">
                  {new Intl.NumberFormat("es-ES").format(property.price)}&nbsp;€
                </span>
                {isRent && <span className="text-[14px] font-data-mono font-bold ml-1.5">/mes</span>}
              </div>
              <span className="text-[11px] font-headline font-bold uppercase tracking-wider text-[#2860F5] truncate">
                {type}
              </span>
            </div>

            <div className="min-w-0">
              <h3 className="text-[17px] font-headline font-bold leading-snug line-clamp-1 group-hover:text-[#2860F5] transition-colors">
                {name}
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-[13px] font-semibold text-slate-600 min-w-0">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-[#2860F5]" />
                <span className="truncate">
                  <span className="uppercase font-headline font-extrabold text-[#111111]">{barrioName}</span>
                  {cityName ? ` · ${cityName}` : ""}
                </span>
              </p>
            </div>

            {/* Specs compactas */}
            {specs.length > 0 && (
              <ul className="flex items-stretch border-y border-slate-200 py-3 mt-auto">
                {specs.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.id}
                      className={`flex-1 min-w-0 flex flex-col items-center text-center px-1 ${i > 0 ? "border-l border-slate-200" : ""}`}
                    >
                      <Icon className="w-4 h-4 text-[#2860F5] mb-1" strokeWidth={2.25} />
                      <span
                        className="text-[14px] font-data-mono font-extrabold leading-tight whitespace-nowrap"
                        dangerouslySetInnerHTML={{ __html: item.value }}
                      />
                      <span className="text-[10px] font-headline font-semibold uppercase tracking-wider text-slate-500 truncate w-full">
                        {item.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="flex items-center justify-between text-[12px]">
              <span className="font-data-mono font-bold text-slate-500">Ref: {property.ref || "—"}</span>
              <span className="inline-flex items-center gap-1.5 font-headline font-black uppercase tracking-wider text-[13px] text-[#2860F5] group-hover:text-[#111111] transition-colors">
                {detailsLabel}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}

export default PropertyCard;
