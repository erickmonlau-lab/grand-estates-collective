import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, ArrowLeft, ShieldCheck, Mail } from "lucide-react";

export const Route = createFileRoute("/politica-privacidad")({
  component: PoliticaPrivacidadComponent
});

function PoliticaPrivacidadComponent() {
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
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white">Política de Privacidad</h1>
            <p className="text-sm text-slate-400">Protección de Datos conforme al RGPD y LOPDGDD</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-slate-300 leading-relaxed">
          <section className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              1. Responsable del Tratamiento
            </h2>
            <p>
              El responsable del tratamiento de los datos personales recabados a través de esta web es:
            </p>
            <div className="mt-3 p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 text-sm space-y-1 text-slate-300">
              <p><strong>Entidad:</strong> Gesgrama (Gestiones inmobiliarias · Asesoría jurídica · Administración de fincas)</p>
              <p><strong>Dirección:</strong> Av. dels Sants nº 49-51 local, 08923 Sta. Coloma de Gramenet (Barcelona)</p>
              <p><strong>Contacto Protección de Datos:</strong> info@gesgrama.com · Tel: 93 468 56 56</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Finalidad del Tratamiento</h2>
            <p>Sus datos personales se recopilan y tratan para las siguientes finalidades específicas:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300 mt-2">
              <li>Atender y gestionar las solicitudes de información sobre alquiler, compraventa o administración de fincas.</li>
              <li>Gestionar el envío de convocatorias de juntas de propietarios a los miembros acreditados.</li>
              <li>Envío de presupuestos de valoración de inmuebles o servicios de seguros de protección de pagos.</li>
              <li>Cumplimiento de las obligaciones legales aplicables en materia inmobiliaria y civil.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Legitimación del Tratamiento</h2>
            <p>
              La base legal para el tratamiento de sus datos es el consentimiento explícito prestado al completar nuestros formularios de contacto, así como la ejecución de contratos de gestión de fincas o el interés legítimo en responder a sus consultas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Derechos ARCO / RGPD</h2>
            <p>Tiene derecho a acceder, rectificar, suprimir, limitar u oponerse al tratamiento de sus datos personales. Para ejercitar estos derechos puede enviar una comunicación formal acompañada de copia de su documento de identidad a:</p>
            <div className="mt-3 flex items-center gap-3 p-4 bg-slate-900 rounded-xl border border-slate-800">
              <Mail className="w-5 h-5 text-blue-400 shrink-0" />
              <span className="text-sm text-slate-200">Email de protección de datos: <strong>info@gesgrama.com</strong></span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
