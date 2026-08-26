import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Building2,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Database,
  Lock,
  LogOut,
  X,
  Home,
  Tag,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Euro,
  Image as ImageIcon,
  Copy,
  Check,
  KeyRound
} from "lucide-react";
import {
  fetchProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  subscribeProperties,
  type ExtendedProperty,
  SUPABASE_SETUP_SQL
} from "@/lib/propertyStore";
import { isSupabaseConfigured } from "@/lib/supabase";
import { SANTA_COLOMA_ZONES, type PropertyType } from "@/data/properties";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel de Gestión Inmobiliaria | Gesgrama Admin" },
      { name: "robots", content: "noindex, nofollow" }
    ]
  }),
  component: AdminDashboard
});

const DEFAULT_ADMIN_PIN = "gesgrama2026";

function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const [properties, setProperties] = useState<ExtendedProperty[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterMode, setFilterMode] = useState<"todos" | "compra" | "alquilar">("todos");
  const [filterStatus, setFilterStatus] = useState<"todos" | "disponible" | "reservado" | "vendido" | "alquilado">("todos");

  // Modal State (Create or Edit)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProperty, setEditingProperty] = useState<ExtendedProperty | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);
  const [showSqlGuide, setShowSqlGuide] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    name_ca: "",
    name_en: "",
    ref: "API A10750",
    type: "Piso" as PropertyType,
    location: "Centro",
    city: "Santa Coloma de Gramenet",
    price: 150000,
    priceFormatted: "150.000 €",
    operation: "comprar" as "comprar" | "alquilar",
    bedrooms: 3,
    bathrooms: 1,
    surface: 80,
    description: "",
    description_ca: "",
    description_en: "",
    features: "Ascensor, Terraza, Calefacción, Exterior",
    image: "",
    gallery: "",
    status: "disponible" as "disponible" | "reservado" | "vendido" | "alquilado"
  });

  // Check auth session
  useEffect(() => {
    const session = sessionStorage.getItem("gesgrama_admin_auth");
    if (session === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Subscribe to real-time property updates
  useEffect(() => {
    if (!isAuthenticated) return;
    const unsub = subscribeProperties((list) => {
      setProperties(list);
    });
    fetchProperties().then((data) => {
      if (data) setProperties(data);
    });
    return () => unsub();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_ADMIN_PIN || pinInput.trim() === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("gesgrama_admin_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Clave incorrecta. Introduce la clave de acceso de Gesgrama.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("gesgrama_admin_auth");
  };

  const handleOpenCreateModal = () => {
    setEditingProperty(null);
    setFormData({
      name: "",
      name_ca: "",
      name_en: "",
      ref: "API A10750",
      type: "Piso",
      location: "Centro",
      city: "Santa Coloma de Gramenet",
      price: 180000,
      priceFormatted: "180.000 €",
      operation: "comprar",
      bedrooms: 3,
      bathrooms: 1,
      surface: 75,
      description: "Magnífica vivienda luminosa y totalmente equipada en excelente ubicación.",
      description_ca: "Magnífic habitatge lluminós i totalment equipat en excel·lent ubicació.",
      description_en: "Superb bright and fully equipped home in an excellent location.",
      features: "Ascensor, Balcón, Calefacción, Cerca de Metro",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      gallery: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80, https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80",
      status: "disponible"
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: ExtendedProperty) => {
    setEditingProperty(p);
    setFormData({
      name: p.name,
      name_ca: p.name_ca || "",
      name_en: p.name_en || "",
      ref: p.ref || "API A10750",
      type: p.type,
      location: p.location,
      city: p.city || "Santa Coloma de Gramenet",
      price: p.price,
      priceFormatted: p.priceFormatted || (p.operation === "alquilar" ? `${p.price} €/mes` : `${p.price.toLocaleString("es-ES")} €`),
      operation: p.operation || "comprar",
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      surface: p.surface,
      description: p.description,
      description_ca: p.description_ca || "",
      description_en: p.description_en || "",
      features: (p.features || []).join(", "),
      image: p.image,
      gallery: (p.gallery || []).join(", "),
      status: p.status || "disponible"
    });
    setIsModalOpen(true);
  };

  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedPrice = formData.operation === "alquilar" 
      ? `${formData.price.toLocaleString("es-ES")} €/mes`
      : `${formData.price.toLocaleString("es-ES")} €`;

    const featuresList = formData.features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    const galleryList = formData.gallery
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);

    const specsString = `${formData.bedrooms} hab. · ${formData.bathrooms} ${formData.bathrooms === 1 ? 'baño' : 'baños'} · ${formData.surface} m²`;

    if (editingProperty) {
      // Update
      await updateProperty(editingProperty.id, {
        name: formData.name,
        name_ca: formData.name_ca || formData.name,
        name_en: formData.name_en || formData.name,
        ref: formData.ref,
        type: formData.type,
        location: formData.location,
        city: formData.city,
        price: Number(formData.price),
        priceFormatted: formattedPrice,
        specs: specsString,
        operation: formData.operation,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        surface: Number(formData.surface),
        description: formData.description,
        description_ca: formData.description_ca || formData.description,
        description_en: formData.description_en || formData.description,
        features: featuresList,
        image: formData.image || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
        gallery: galleryList.length > 0 ? galleryList : [formData.image],
        status: formData.status
      });
    } else {
      // Create
      await createProperty({
        name: formData.name,
        name_ca: formData.name_ca || formData.name,
        name_en: formData.name_en || formData.name,
        ref: formData.ref || "API A10750",
        type: formData.type,
        location: formData.location,
        city: formData.city,
        price: Number(formData.price),
        priceFormatted: formattedPrice,
        specs: specsString,
        operation: formData.operation,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        surface: Number(formData.surface),
        description: formData.description,
        description_ca: formData.description_ca || formData.description,
        description_en: formData.description_en || formData.description,
        features: featuresList,
        image: formData.image || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
        gallery: galleryList.length > 0 ? galleryList : [formData.image],
        status: formData.status
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteProperty(id);
    setDeleteConfirmId(null);
  };

  const handleQuickStatusChange = async (id: string, newStatus: "disponible" | "reservado" | "vendido" | "alquilado") => {
    await updateProperty(id, { status: newStatus });
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // Filtered list
  const filteredProperties = properties.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.ref && p.ref.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.location && p.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMode = filterMode === "todos" || (p.operation || "compra") === filterMode;
    const matchesStatus = filterStatus === "todos" || (p.status || "disponible") === filterStatus;

    return matchesSearch && matchesMode && matchesStatus;
  });

  // Metrics
  const totalCount = properties.length;
  const ventaCount = properties.filter((p) => (p.operation || "compra") === "comprar" || (p.operation || "compra") === "compra").length;
  const alquilerCount = properties.filter((p) => p.operation === "alquilar").length;
  const reservadoCount = properties.filter((p) => p.status === "reservado").length;

  // 1. LOGIN SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b1221] flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border-2 border-slate-700">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-[#2563eb]/10 text-[#2563eb] mb-4">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] font-sans">Panel de Gestión</h1>
            <p className="text-sm font-bold text-slate-500 mt-1">Gesgrama Inmobiliaria & Fincas</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase text-slate-700 mb-2 tracking-wider">
                Contraseña de Acceso
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Introduce tu clave (ej: gesgrama2026)"
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3.5 pl-11 text-base font-bold text-[#0f172a] focus:border-[#2563eb] outline-none transition-colors"
                  autoFocus
                />
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {authError && (
                <p className="text-xs font-bold text-red-600 mt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black py-4 rounded-xl text-base tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-5 h-5" />
              <span>Entrar al Panel</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <Link to="/" className="text-xs font-black text-[#2563eb] hover:underline flex items-center justify-center gap-1.5">
              <Home className="w-4 h-4" /> Volver a la web pública
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-slate-100 text-[#0f172a] font-sans pb-16">
      
      {/* Top Navbar */}
      <header className="bg-[#0b1221] text-white sticky top-0 z-30 shadow-md border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src="/images/logo-gesgrama-text-horizontal.png"
                alt="Gesgrama"
                className="h-8 sm:h-9 w-auto brightness-0 invert object-contain"
              />
            </Link>
            <span className="hidden sm:inline-block bg-[#2563eb] text-white text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
              ADMIN GESTOR
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden md:flex items-center gap-1.5 text-xs font-extrabold text-slate-300 hover:text-white bg-white/10 px-3 py-2 rounded-xl transition-colors"
            >
              <span>Ver Web</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-black text-red-300 hover:text-red-200 bg-red-950/40 border border-red-500/30 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-8">
        
        {/* Supabase Status & Setup Helper Banner */}
        <div className="bg-white border-2 border-slate-300 rounded-2xl p-5 mb-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`p-3 rounded-xl ${isSupabaseConfigured ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'}`}>
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-[#0f172a]">
                  {isSupabaseConfigured ? "Conectado a Base de Datos Supabase (Tiempo Real)" : "Modo Local / Almacenamiento Reactivo Activo"}
                </h2>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${isSupabaseConfigured ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'}`}>
                  {isSupabaseConfigured ? "En la Nube" : "Listo para Conectar"}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-500 mt-0.5">
                {isSupabaseConfigured 
                  ? "Cualquier inmueble añadido o editado aquí se publica al segundo para todos los clientes." 
                  : "Los cambios se guardan en el navegador. Puedes conectar tu proyecto gratuito de Supabase en 1 minuto."}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowSqlGuide(!showSqlGuide)}
            className="text-xs font-black bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-xl border border-slate-300 transition-colors flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>{showSqlGuide ? "Ocultar Guía SQL" : "Ver Código SQL para Supabase"}</span>
          </button>
        </div>

        {/* Collapsible Supabase SQL Script Card */}
        {showSqlGuide && (
          <div className="bg-[#0b1221] text-white p-6 rounded-2xl mb-8 shadow-xl border-2 border-slate-700 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-black text-amber-400 font-mono">1. Copiar y Ejecutar en Supabase (SQL Editor)</h3>
                <p className="text-xs text-slate-300 mt-0.5">Pega este script en tu panel de Supabase &gt; SQL Editor y presiona "Run".</p>
              </div>
              <button
                onClick={handleCopySql}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
              >
                {copiedSql ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSql ? "¡Copiado!" : "Copiar SQL"}</span>
              </button>
            </div>
            <pre className="bg-[#060c18] p-4 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto border border-slate-800 max-h-60">
              {SUPABASE_SETUP_SQL}
            </pre>
            <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
              <strong className="text-white">2. Variables de Entorno en Vercel/.env:</strong><br />
              <code className="text-blue-300 font-mono">VITE_SUPABASE_URL=https://tu-proyecto.supabase.co</code><br />
              <code className="text-blue-300 font-mono">VITE_SUPABASE_ANON_KEY=tu-clave-anonima-publica</code>
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-300 shadow-xs">
            <span className="text-xs font-black uppercase text-slate-500">Total Inmuebles</span>
            <div className="text-3xl font-black text-[#0f172a] mt-1">{totalCount}</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-300 shadow-xs">
            <span className="text-xs font-black uppercase text-blue-600">En Venta</span>
            <div className="text-3xl font-black text-blue-600 mt-1">{ventaCount}</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-300 shadow-xs">
            <span className="text-xs font-black uppercase text-emerald-600">En Alquiler</span>
            <div className="text-3xl font-black text-emerald-600 mt-1">{alquilerCount}</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-300 shadow-xs">
            <span className="text-xs font-black uppercase text-amber-600">Reservados</span>
            <div className="text-3xl font-black text-amber-600 mt-1">{reservadoCount}</div>
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="bg-white p-5 rounded-2xl border-2 border-slate-300 shadow-sm mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, referencia (ej: A10750), barrio..."
              className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-[#0f172a] focus:border-[#2563eb] outline-none transition-colors"
            />
          </div>

          {/* Filters & New Button */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={filterMode}
              onChange={(e: any) => setFilterMode(e.target.value)}
              className="bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-black text-[#0f172a] outline-none cursor-pointer"
            >
              <option value="todos">Todas las Operaciones</option>
              <option value="compra">Solo Venta</option>
              <option value="alquilar">Solo Alquiler</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e: any) => setFilterStatus(e.target.value)}
              className="bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-black text-[#0f172a] outline-none cursor-pointer"
            >
              <option value="todos">Todos los Estados</option>
              <option value="disponible">Disponibles</option>
              <option value="reservado">Reservados</option>
              <option value="vendido">Vendidos</option>
              <option value="alquilado">Alquilados</option>
            </select>

            <button
              onClick={handleOpenCreateModal}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-sm px-5 py-3 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span>Añadir Inmueble</span>
            </button>
          </div>
        </div>

        {/* Properties List Table / Cards */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-black text-[#0f172a]">No se encontraron propiedades</h3>
            <p className="text-sm font-bold text-slate-500 mt-1">Prueba a cambiar los filtros o añade un nuevo inmueble.</p>
            <button
              onClick={handleOpenCreateModal}
              className="mt-4 bg-[#2563eb] text-white text-xs font-black px-4 py-2.5 rounded-xl inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Añadir Inmueble
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border-2 border-slate-300 shadow-sm overflow-hidden flex flex-col group hover:border-[#2563eb] transition-colors"
              >
                {/* Card Image + Status Badges */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-[#0b1221]/90 backdrop-blur-xs text-white text-xs font-black uppercase px-3 py-1 rounded-lg">
                      {p.type}
                    </span>
                    <span className={`text-xs font-black uppercase px-3 py-1 rounded-lg ${
                      p.operation === "alquilar" ? "bg-emerald-600 text-white" : "bg-[#2563eb] text-white"
                    }`}>
                      {p.operation === "alquilar" ? "Alquiler" : "Venta"}
                    </span>
                  </div>

                  {/* Ref Badge */}
                  <div className="absolute top-3 right-3 bg-white text-[#0f172a] text-xs font-mono font-black px-2.5 py-1 rounded-md border border-slate-300 shadow-xs">
                    Ref: {p.ref || "API A10750"}
                  </div>

                  {/* Status Overlay Badge */}
                  {p.status && p.status !== "disponible" && (
                    <div className="absolute bottom-3 left-3 bg-amber-500 text-white text-xs font-black uppercase px-3 py-1 rounded-md shadow-md">
                      {p.status.toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black text-[#0f172a] line-clamp-1 mb-1 font-sans">{p.name}</h3>
                    <p className="text-xs font-bold text-slate-500 flex items-center gap-1 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
                      <span>{p.location}, {p.city || "Santa Coloma"}</span>
                    </p>

                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 py-2.5 border-y border-slate-100 mb-3">
                      <span className="flex items-center gap-1">
                        <Bed className="w-4 h-4 text-[#2563eb]" /> {p.bedrooms} hab.
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-4 h-4 text-[#2563eb]" /> {p.bathrooms} {p.bathrooms === 1 ? 'baño' : 'baños'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize2 className="w-4 h-4 text-[#2563eb]" /> {p.surface} m²
                      </span>
                    </div>

                    <div className="text-2xl font-black text-[#2563eb] font-sans">
                      {p.priceFormatted || `${p.price.toLocaleString("es-ES")} €`}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between gap-2">
                    
                    {/* Status Dropdown Quick Changer */}
                    <select
                      value={p.status || "disponible"}
                      onChange={(e) => handleQuickStatusChange(p.id, e.target.value as any)}
                      className="text-xs font-black bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-2 text-[#0f172a] outline-none cursor-pointer"
                    >
                      <option value="disponible">🟢 Disponible</option>
                      <option value="reservado">🟡 Reservado</option>
                      <option value="vendido">🔴 Vendido</option>
                      <option value="alquilado">🔵 Alquilado</option>
                    </select>

                    <div className="flex items-center gap-1.5">
                      <Link
                        to="/inmobiliaria/$slug"
                        params={{ slug: p.slug }}
                        target="_blank"
                        className="p-2 text-slate-600 hover:text-[#2563eb] hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver en web"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="p-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Editar inmueble"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(p.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar inmueble"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* CREATE / EDIT PROPERTY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl border-2 border-slate-300 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-[#0b1221] text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#2563eb] text-white">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black font-sans">
                    {editingProperty ? "Editar Inmueble" : "Añadir Nuevo Inmueble"}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Rellena los datos para publicar o actualizar el piso en Gesgrama.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProperty} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Row 1: Nombre en Español, Catalán e Inglés */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-black uppercase text-[#0f172a] mb-1.5">
                    Título del Inmueble (Español) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ej: Ático reformado con gran terraza en Santa Rosa"
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-sm font-bold text-[#0f172a] focus:border-[#2563eb] outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-black uppercase text-slate-600 mb-1">
                      Título (Català)
                    </label>
                    <input
                      type="text"
                      value={formData.name_ca}
                      onChange={(e) => setFormData({ ...formData, name_ca: e.target.value })}
                      placeholder="ej: Àtic reformat amb terrassa a Santa Rosa"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-[#0f172a] focus:border-[#2563eb] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase text-slate-600 mb-1">
                      Título (English)
                    </label>
                    <input
                      type="text"
                      value={formData.name_en}
                      onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                      placeholder="ej: Renovated penthouse with terrace in Santa Rosa"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-[#0f172a] focus:border-[#2563eb] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Tipo, Operación, Referencia y Zona */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-[#0f172a] mb-1.5">
                    Tipo de Inmueble
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e: any) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-bold text-[#0f172a] outline-none"
                  >
                    <option value="Piso">Piso</option>
                    <option value="Ático">Ático</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Local comercial">Local comercial</option>
                    <option value="Chalet">Chalet</option>
                    <option value="Oficina">Oficina</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#0f172a] mb-1.5">
                    Operación
                  </label>
                  <select
                    value={formData.operation}
                    onChange={(e: any) => setFormData({ ...formData, operation: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-bold text-[#0f172a] outline-none"
                  >
                    <option value="comprar">Venta</option>
                    <option value="alquilar">Alquiler</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#0f172a] mb-1.5">
                    Referencia
                  </label>
                  <input
                    type="text"
                    value={formData.ref}
                    onChange={(e) => setFormData({ ...formData, ref: e.target.value })}
                    placeholder="API A10750"
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-bold text-[#0f172a] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#0f172a] mb-1.5">
                    Barrio / Zona
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-bold text-[#0f172a] outline-none"
                  >
                    {SANTA_COLOMA_ZONES.map((zone) => (
                      <option key={zone} value={zone}>{zone}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Precio, Habitaciones, Baños, Superficie */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-[#0f172a] mb-1.5">
                    Precio (€) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-black text-[#2563eb] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#0f172a] mb-1.5">
                    Habitaciones
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-bold text-[#0f172a] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#0f172a] mb-1.5">
                    Baños
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-bold text-[#0f172a] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#0f172a] mb-1.5">
                    Superficie (m²)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.surface}
                    onChange={(e) => setFormData({ ...formData, surface: Number(e.target.value) })}
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-bold text-[#0f172a] outline-none"
                  />
                </div>
              </div>

              {/* Row 4: Estado y Características */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-[#0f172a] mb-1.5">
                    Estado Actual
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e: any) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-black text-[#0f172a] outline-none"
                  >
                    <option value="disponible">🟢 Disponible</option>
                    <option value="reservado">🟡 Reservado</option>
                    <option value="vendido">🔴 Vendido</option>
                    <option value="alquilado">🔵 Alquilado</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-black uppercase text-[#0f172a] mb-1.5">
                    Características (separadas por comas)
                  </label>
                  <input
                    type="text"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="Ascensor, Balcón, Parking, Aire Acondicionado..."
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-bold text-[#0f172a] outline-none"
                  />
                </div>
              </div>

              {/* Row 5: URL Imagen Principal y Galería */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-black uppercase text-[#0f172a] mb-1.5">
                    URL de la Imagen Principal *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-bold text-[#0f172a] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                    Galería de Fotos Adicionales (URLs separadas por comas)
                  </label>
                  <input
                    type="text"
                    value={formData.gallery}
                    onChange={(e) => setFormData({ ...formData, gallery: e.target.value })}
                    placeholder="https://foto1.jpg, https://foto2.jpg..."
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-bold text-[#0f172a] outline-none"
                  />
                </div>
              </div>

              {/* Row 6: Descripción */}
              <div>
                <label className="block text-xs font-black uppercase text-[#0f172a] mb-1.5">
                  Descripción Detallada
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Escribe los detalles de la vivienda, distribución, estado, orientación..."
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-sm font-bold text-[#0f172a] outline-none resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-xl border-2 border-slate-300 text-sm font-black text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  {editingProperty ? "Guardar Cambios" : "Publicar Inmueble"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-red-200 text-center animate-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-[#0f172a]">¿Eliminar este inmueble?</h3>
            <p className="text-sm font-bold text-slate-500 mt-2">
              Esta acción no se puede deshacer. El inmueble desaparecerá del catálogo público inmediatamente.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-5 py-3 rounded-xl border border-slate-300 text-xs font-black text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-black px-6 py-3 rounded-xl uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
