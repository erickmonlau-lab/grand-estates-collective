import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, ArrowLeft, Mail, Phone, MapPin, Globe, Building } from "lucide-react";

export const Route = createFileRoute("/aviso-legal")({
  component: AvisoLegalComponent
});

function AvisoLegalComponent() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la página principal
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white">Aviso Legal</h1>
            <p className="text-sm text-slate-400">Gesgrama · Gestiones inmobiliarias y administración de fincas</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-slate-300 leading-relaxed">
          <section className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-400" />
              1. Datos Identificativos de la Empresa
            </h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos identificativos:
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
              <div>
                <strong className="text-slate-200">Actividad principal:</strong>
                <p className="text-slate-400">Gestiones inmobiliarias · Asesoría jurídica · Administración de fincas y comunidades</p>
              </div>
              <div>
                <strong className="text-slate-200">Razón Comercial:</strong>
                <p className="text-slate-400">Gesgrama</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Dirección:</strong>
                  <p className="text-slate-400">Av. dels Sants nº 49-51 local, 08923 Sta. Coloma de Gramenet (Barcelona)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Teléfonos:</strong>
                  <p className="text-slate-400">93 468 56 56 (Oficina) · 604 259 424 (WhatsApp)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Correo Electrónico:</strong>
                  <p className="text-slate-400">info@gesgrama.com</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Sitio Web:</strong>
                  <p className="text-slate-400">www.gesgrama.com</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 italic">
              * Nota legal: Número de registro CIF/NIF disponible previa solicitud formal en nuestra oficina corporativa. Registro de Agentes Inmobiliarios de Catalunya (AICAT nº 5583).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Términos y Condiciones de Uso</h2>
            <p>
              El acceso y uso de este sitio web atribuyen la condición de usuario e implican la aceptación plena de las condiciones aquí expuestas. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios de este sitio web conforme a la legislación vigente y a la buena fe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Propiedad Intelectual e Industrial</h2>
            <p>
              Todos los elementos que forman el sitio web (diseños, textos, imágenes, logotipos, código fuente) son propiedad exclusiva de Gesgrama o de sus legítimos licenciantes, estando protegidos por la normativa de propiedad intelectual e industrial.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Limitación de Responsabilidad</h2>
            <p>
              Gesgrama no se hace responsable de los daños o perjuicios que pudieran derivarse de interferencias, omisiones, interrupciones, virus informáticos o desconexiones en el funcionamiento del sistema electrónico causados por motivos ajenos a la empresa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Acreditaciones Profesionales</h2>
            <p>
              Gesgrama cuenta con la adscripción y cumplimiento de las regulaciones sectoriales de:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-300">
              <li>Registre d'Agents Immobiliaris de Catalunya (AICAT) — Inscripción nº 5583.</li>
              <li>Colegio de Agentes de la Propiedad Inmobiliaria (API).</li>
              <li>Asociación de Administradores Judiciales de Fincas.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
