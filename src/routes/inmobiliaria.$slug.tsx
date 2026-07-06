import { createFileRoute, Link } from "@tanstack/react-router";
import { properties } from "../data/properties";
import { motion } from "framer-motion";
import { ArrowLeft, Bath, Bed, Maximize, MapPin, Building2, Phone, MessageCircle } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { useEffect } from "react";

export const Route = createFileRoute("/inmobiliaria/$slug")({
  component: PropertyDetail,
});

function PropertyDetail() {
  const { slug } = Route.useParams();
  const property = properties.find((p) => p.slug === slug);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-onyx">
        <h1 className="text-4xl font-bold mb-4">Propiedad no encontrada</h1>
        <p className="mb-8 text-onyx/60">La propiedad que buscas no existe o ha sido retirada.</p>
        <Link to="/" className="bg-primary-blue text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-onyx transition-colors">
          Volver a inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-onyx font-sans min-h-screen">
      {/* SIMPLE HEADER */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between py-4 px-6 md:px-12 bg-white/95 backdrop-blur-md border-b border-black/[0.05]">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img src={logoImg} alt="Gesgrama" className="h-10 w-auto object-contain" />
        </Link>
        <Link to="/" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-onyx/60 hover:text-primary-blue transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Link>
      </nav>

      <main className="pt-24 pb-20">
        {/* HERO GALLERY */}
        <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px] md:h-[500px]">
            <div className="md:col-span-2 relative rounded-2xl overflow-hidden">
              <img src={property.gallery[0]} alt={property.name} className="w-full h-full object-cover" />
            </div>
            <div className="hidden md:grid grid-rows-2 gap-4 h-full">
              <div className="relative rounded-2xl overflow-hidden">
                <img src={property.gallery[1]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <img src={property.gallery[2]} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* DETAILS */}
        <section className="px-6 md:px-12 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <span className="bg-primary-blue/10 text-primary-blue text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4 inline-block">{property.type}</span>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-onyx mb-2">{property.name}</h1>
                <div className="flex items-center gap-2 text-onyx/50 font-medium">
                  <MapPin className="w-4 h-4" /> {property.location}
                </div>
              </div>
              <div className="text-4xl font-bold text-primary-blue">{property.priceFormatted}</div>
            </div>

            <div className="flex flex-wrap gap-6 py-6 border-y border-black/[0.05] mb-10">
              <div className="flex items-center gap-3">
                <Bed className="w-6 h-6 text-onyx/30" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-onyx/40 font-bold">Habitaciones</div>
                  <div className="font-semibold text-lg">{property.bedrooms}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bath className="w-6 h-6 text-onyx/30" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-onyx/40 font-bold">Baños</div>
                  <div className="font-semibold text-lg">{property.bathrooms}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Maximize className="w-6 h-6 text-onyx/30" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-onyx/40 font-bold">Superficie</div>
                  <div className="font-semibold text-lg">{property.surface} m²</div>
                </div>
              </div>
              {property.floor && (
                <div className="flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-onyx/30" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-onyx/40 font-bold">Planta</div>
                    <div className="font-semibold text-lg">{property.floor}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Descripción</h3>
              <p className="text-onyx/70 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Características principales</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-onyx/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-blue shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-[#F8FAFC] rounded-3xl p-8 border border-black/[0.05] sticky top-32">
              <h3 className="text-xl font-bold mb-6">¿Le interesa esta propiedad?</h3>
              <p className="text-onyx/60 text-sm mb-8 leading-relaxed">
                Póngase en contacto con nuestro equipo para agendar una visita o resolver cualquier duda sobre {property.name}.
              </p>
              
              <div className="space-y-4">
                <a href="https://wa.me/34600000000" className="w-full flex items-center justify-center gap-3 bg-primary-blue text-white py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-onyx transition-all duration-300 shadow-md">
                  <MessageCircle className="w-5 h-5" /> Contactar por WhatsApp
                </a>
                <a href="tel:+34900000000" className="w-full flex items-center justify-center gap-3 border border-black/10 text-onyx py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all duration-300">
                  <Phone className="w-5 h-5" /> Llamar ahora
                </a>
              </div>
              
              <p className="text-[10px] text-center text-onyx/40 mt-6 uppercase tracking-wider font-semibold">Ref: {property.id.toUpperCase()}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
