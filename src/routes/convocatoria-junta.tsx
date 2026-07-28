import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState } from "react";
import { Users, ArrowLeft, Calendar, FileText, Download, Search, CheckCircle2, Clock, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/convocatoria-junta")({
  component: ConvocatoriaJuntaComponent
});

interface Convocatoria {
  id: string;
  comunidad: string;
  direccion: string;
  tipo: "Ordinaria" | "Extraordinaria";
  fecha: string;
  hora: string;
  lugar: string;
  ordenDelDia: string[];
  pdfUrl?: string;
  estado: "Próxima" | "Realizada" | "En trámite";
}

const convocatoriasEjemplo: Convocatoria[] = [
  {
    id: "CJ-2026-01",
    comunidad: "Comunidad de Propietarios Av. dels Sants 49-51",
    direccion: "Av. dels Sants 49-51, Sta. Coloma de Gramenet",
    tipo: "Ordinaria",
    fecha: "15 de Agosto de 2026",
    hora: "19:00h en 1ª convocatoria / 19:30h en 2ª",
    lugar: "Salón de actos corporativo Gesgrama (Av. dels Sants 49)",
    ordenDelDia: [
      "Lectura y aprobación del acta de la junta anterior.",
      "Aprobación de cuentas anuales e informe de liquidación.",
      "Presupuesto de mantenimiento y revisión de contratos de limpieza y ascensor.",
      "Renovación de cargos de presidente y secretario-administrador.",
      "Ruegos y preguntas."
    ],
    estado: "Próxima"
  },
  {
    id: "CJ-2026-02",
    comunidad: "Residencial Singuerlín II",
    direccion: "Carrer de Singuerlín 84, Sta. Coloma de Gramenet",
    tipo: "Extraordinaria",
    fecha: "22 de Agosto de 2026",
    hora: "18:30h en 1ª convocatoria / 19:00h en 2ª",
    lugar: "Sala comunitaria del edificio",
    ordenDelDia: [
      "Votación para la instalación de placas solares fotovoltaicas y subvenciones NGEU.",
      "Aprobación del seguro de protección de pagos para pisos en alquiler.",
      "Aprobación de derrama extraordinaria para rehabilitación de cubierta."
    ],
    estado: "Próxima"
  },
  {
    id: "CJ-2026-03",
    comunidad: "Edificio Can Mariner",
    direccion: "Passeig de la Salseta 12, Sta. Coloma de Gramenet",
    tipo: "Ordinaria",
    fecha: "05 de Septiembre de 2026",
    hora: "20:00h",
    lugar: "Oficinas Gesgrama",
    ordenDelDia: [
      "Informe económico del ejercicio 2025-2026.",
      "Adaptación a normativa de eficiencia energética e ITE."
    ],
    estado: "Próxima"
  }
];

function ConvocatoriaJuntaComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [nombre, setNombre] = useState("");
  const [comunidad, setComunidad] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const convocatoriasFiltradas = convocatoriasEjemplo.filter(
    (c) =>
      c.comunidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.direccion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Solicitud enviada correctamente. Nuestro equipo de administración contactará en menos de 24h.");
    setNombre("");
    setComunidad("");
    setEmail("");
    setMensaje("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        {/* Header de la sección */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 p-8 rounded-3xl border border-blue-500/20 shadow-2xl mb-10 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-500/20">
              <Users className="w-4 h-4" />
              Administración de Fincas Gesgrama
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white mb-3">
              Convocatorias de Junta de Propietarios
            </h1>
            <p className="text-slate-300 max-w-2xl text-base sm:text-lg leading-relaxed">
              Consulta las fechas, órdenes del día y avisos oficiales de reunión para tu comunidad de propietarios en Santa Coloma de Gramenet y Barcelona.
            </p>
          </div>
        </div>

        {/* Buscador de comunidad */}
        <div className="mb-10">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por tu comunidad o calle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Lista de convocatorias */}
        <div className="space-y-6 mb-16">
          <h2 className="text-2xl font-bold font-serif text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-400" />
            Próximas Convocatorias Oficiales
          </h2>

          {convocatoriasFiltradas.length === 0 ? (
            <div className="p-8 bg-slate-900/50 rounded-2xl border border-slate-800 text-center text-slate-400">
              No se encontraron convocatorias para esa búsqueda. Contáctanos si necesitas información sobre tu finca.
            </div>
          ) : (
            convocatoriasFiltradas.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-6 sm:p-8 transition-all shadow-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-md border border-blue-500/20 mb-2">
                      Junta {item.tipo}
                    </span>
                    <h3 className="text-xl font-bold text-white">{item.comunidad}</h3>
                    <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-1">
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                      {item.direccion}
                    </p>
                  </div>
                  <div className="text-right sm:text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/20">
                      <Clock className="w-3.5 h-3.5" />
                      {item.estado}
                    </span>
                    <div className="text-sm text-slate-300 font-semibold mt-2">{item.fecha}</div>
                    <div className="text-xs text-slate-400">{item.hora}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <strong className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Lugar de celebración:
                    </strong>
                    <p className="text-sm text-slate-200">{item.lugar}</p>
                  </div>

                  <div>
                    <strong className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Puntos del Orden del Día:
                    </strong>
                    <ul className="space-y-2">
                      {item.ordenDelDia.map((punto, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <span>{punto}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <div className="text-xs text-slate-500">Ref: {item.id}</div>
                    <button
                      onClick={() => toast.info(`Descargando PDF oficial de la convocatoria ${item.id}...`)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Descargar Acta / Convocatoria PDF
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Formulario de solicitud para propietarios */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-serif text-white">¿Eres propietario y quieres proponer un punto?</h2>
              <p className="text-sm text-slate-400">Solicita información o propone temas a tratar en la próxima junta de tu comunidad.</p>
            </div>
          </div>

          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nombre y Apellidos</label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Comunidad / Dirección</label>
                <input
                  type="text"
                  required
                  value={comunidad}
                  onChange={(e) => setComunidad(e.target.value)}
                  placeholder="Ej. Av. dels Sants 49, 3º 2ª"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Correo Electrónico o Teléfono</label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@email.com o 600 000 000"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Propuesta / Consulta para la Junta</label>
              <textarea
                rows={3}
                required
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Detalla el punto que deseas incluir en el orden del día o tu consulta..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-blue-600/20"
            >
              <Send className="w-4 h-4" />
              Enviar Propuesta a Administración
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
