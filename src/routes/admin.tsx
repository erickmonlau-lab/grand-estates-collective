import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
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
  KeyRound,
  Upload,
  Camera,
  Info,
  Layers,
  Sparkles,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  FileText,
  Film,
  Languages
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
import { autoTranslateText } from "@/lib/translateProperty";
import { FooterMascot } from "@/components/FooterMascot";
import { AccreditationBadges } from "@/components/AccreditationBadges";
import { translations } from "@/data/translations";

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

// Client-side image compression helper (optimizes photos from iPhone/Camera to ~150KB web quality)
async function processImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const maxDimension = 1400; // Optimal 1400px width for retina screens
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.85));
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

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
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    name_ca: "",
    name_en: "",
    ref: "API A10750",
    type: "Piso" as PropertyType,
    location: "Centro",
    city: "Santa Coloma de Gramenet",
    price: 180000,
    priceFormatted: "180.000 €",
    operation: "comprar" as "comprar" | "alquilar",
    bedrooms: 3,
    bathrooms: 1,
    surface: 75,
    floor: "Planta 3ª",
    description: "",
    description_ca: "",
    description_en: "",
    features: "Ascensor, Terraza, Calefacción, Exterior",
    image: "",
    gallery: [] as string[],
    videoUrl: "",
    status: "disponible" as "disponible" | "reservado" | "vendido" | "alquilado"
  });

  const [showTranslations, setShowTranslations] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<"basicos" | "multimedia" | "descripcion">("basicos");
  const [newFeatureInput, setNewFeatureInput] = useState<string>("");
  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Check auth session
  useEffect(() => {
    const session = sessionStorage.getItem("gesgrama_admin_auth");
    if (session === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Sync / Subscribe properties
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    async function load() {
      const data = await fetchProperties();
      setProperties(data);
      unsubscribe = subscribeProperties((updated) => {
        setProperties(updated);
      });
    }
    load();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_ADMIN_PIN) {
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
      name: "Piso en Centro",
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
      floor: "Planta 3ª",
      description: "Magnífica vivienda luminosa y totalmente equipada en excelente ubicación.",
      description_ca: "",
      description_en: "",
      features: "Ascensor, Balcón, Calefacción, Cerca de Metro",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80"
      ],
      videoUrl: "",
      status: "disponible"
    });
    setActiveModalTab("basicos");
    setNewFeatureInput("");
    setShowTranslations(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: ExtendedProperty) => {
    setEditingProperty(p);
    setFormData({
      name: p.name || `${p.type} en ${p.location}`,
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
      floor: p.floor || "",
      description: p.description || "",
      description_ca: p.description_ca || "",
      description_en: p.description_en || "",
      features: (p.features || []).join(", "),
      image: p.image,
      gallery: p.gallery || [],
      videoUrl: p.videoUrl || "",
      status: p.status || "disponible"
    });
    setActiveModalTab("basicos");
    setNewFeatureInput("");
    setShowTranslations(false);
    setIsModalOpen(true);
  };

  // Image Upload Handlers
  const handleMainFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingImage(true);
      const dataUrl = await processImageFile(file);
      setFormData((prev) => ({ ...prev, image: dataUrl }));
    } catch (err) {
      console.error("Error cargando imagen:", err);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleGalleryFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    try {
      setIsUploadingImage(true);
      const processed = await Promise.all(files.map((f) => processImageFile(f)));
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...processed]
      }));
    } catch (err) {
      console.error("Error cargando fotos de galería:", err);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleSetAsCover = (index: number) => {
    setFormData((prev) => {
      const selectedImg = prev.gallery[index];
      if (!selectedImg) return prev;
      const currentCover = prev.image;
      const newGallery = [...prev.gallery];
      // Swap or replace
      newGallery[index] = currentCover;
      return {
        ...prev,
        image: selectedImg,
        gallery: newGallery.filter(Boolean)
      };
    });
  };

  const handleAddFeature = (featToAdd?: string) => {
    const text = (featToAdd !== undefined ? featToAdd : newFeatureInput).trim();
    if (!text) return;
    
    // Split by comma if user pasted comma-separated list
    const incoming = text.split(",").map((s) => s.trim()).filter(Boolean);
    const existing = formData.features
      ? formData.features.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    
    // Add unique ones
    const merged = [...existing];
    for (const item of incoming) {
      if (!merged.some((m) => m.toLowerCase() === item.toLowerCase())) {
        merged.push(item);
      }
    }
    
    setFormData((prev) => ({ ...prev, features: merged.join(", ") }));
    setNewFeatureInput("");
  };

  const handleRemoveFeature = (featureToRemove: string) => {
    const existing = formData.features
      ? formData.features.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    const filtered = existing.filter((f) => f !== featureToRemove);
    setFormData((prev) => ({ ...prev, features: filtered.join(", ") }));
  };

  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = formData.name.trim() || `${formData.type} en ${formData.location}`;
    const formattedPrice = formData.operation === "alquilar" 
      ? `${formData.price.toLocaleString("es-ES")} €/mes`
      : `${formData.price.toLocaleString("es-ES")} €`;

    const featuresList = formData.features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    const specsString = `${formData.bedrooms} hab. · ${formData.bathrooms} ${formData.bathrooms === 1 ? 'baño' : 'baños'} · ${formData.surface} m²`;

    // High quality auto-translations for Catalan & English
    const finalNameCa = formData.name_ca.trim() || autoTranslateText(finalName, "ca");
    const finalNameEn = formData.name_en.trim() || autoTranslateText(finalName, "en");
    const finalDescCa = formData.description_ca.trim() || autoTranslateText(formData.description, "ca");
    const finalDescEn = formData.description_en.trim() || autoTranslateText(formData.description, "en");

    if (editingProperty) {
      // Update
      await updateProperty(editingProperty.id, {
        name: finalName,
        name_ca: finalNameCa,
        name_en: finalNameEn,
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
        floor: formData.floor.trim() || undefined,
        description: formData.description,
        description_ca: finalDescCa,
        description_en: finalDescEn,
        features: featuresList,
        image: formData.image || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
        gallery: formData.gallery.length > 0 ? formData.gallery : [formData.image],
        videoUrl: formData.videoUrl.trim() || undefined,
        status: formData.status
      });
    } else {
      // Create
      await createProperty({
        name: finalName,
        name_ca: finalNameCa,
        name_en: finalNameEn,
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
        floor: formData.floor.trim() || undefined,
        description: formData.description,
        description_ca: finalDescCa,
        description_en: finalDescEn,
        features: featuresList,
        image: formData.image || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
        gallery: formData.gallery.length > 0 ? formData.gallery : [formData.image],
        videoUrl: formData.videoUrl.trim() || undefined,
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
  const vendidoCount = properties.filter((p) => p.status === "vendido").length;
  const alquiladoCount = properties.filter((p) => p.status === "alquilado").length;

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
    <div className="min-h-screen bg-slate-100 text-[#0f172a] font-sans flex flex-col justify-between">
      
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
              className="hidden md:flex items-center gap-1.5 text-xs font-black text-white bg-slate-700 hover:bg-slate-600 px-3.5 py-2 rounded-xl transition-colors shadow-sm"
            >
              <span>Ver Web</span>
              <ExternalLink className="w-3.5 h-3.5 text-white" />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-black text-white bg-rose-600 hover:bg-rose-700 px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-sm"
            >
              <LogOut className="w-4 h-4 text-white" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-8 pb-16 flex-1 w-full">
        
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-300 shadow-sm">
            <span className="text-[11px] sm:text-xs font-black uppercase text-[#000000] tracking-wider block truncate">Total Inmuebles</span>
            <div className="text-2xl sm:text-3xl font-black text-[#000000] mt-1 font-sans">{totalCount}</div>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-blue-200 shadow-sm">
            <span className="text-[11px] sm:text-xs font-black uppercase text-blue-700 tracking-wider block truncate">En Venta</span>
            <div className="text-2xl sm:text-3xl font-black text-[#2563eb] mt-1 font-sans">{ventaCount}</div>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-emerald-200 shadow-sm">
            <span className="text-[11px] sm:text-xs font-black uppercase text-emerald-800 tracking-wider block truncate">En Alquiler</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1 font-sans">{alquilerCount}</div>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-amber-200 shadow-sm">
            <span className="text-[11px] sm:text-xs font-black uppercase text-amber-800 tracking-wider block truncate">Reservados</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1 font-sans">{reservadoCount}</div>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-rose-200 shadow-sm">
            <span className="text-[11px] sm:text-xs font-black uppercase text-rose-800 tracking-wider block truncate">Vendidos</span>
            <div className="text-2xl sm:text-3xl font-black text-rose-600 mt-1 font-sans">{vendidoCount}</div>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-indigo-200 shadow-sm">
            <span className="text-[11px] sm:text-xs font-black uppercase text-indigo-800 tracking-wider block truncate">Alquilados</span>
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 mt-1 font-sans">{alquiladoCount}</div>
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="bg-white p-5 rounded-2xl border-2 border-slate-300 shadow-sm mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-[#2563eb] absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.5]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, referencia (ej: A10750), barrio..."
              className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl pl-11 pr-4 py-3 text-sm font-black text-[#000000] placeholder:text-slate-500 focus:border-[#2563eb] outline-none transition-colors"
            />
          </div>

          {/* Filters & New Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                value={filterMode}
                onChange={(e: any) => setFilterMode(e.target.value)}
                className="appearance-none bg-slate-50 border-2 border-slate-300 rounded-xl pl-4 pr-10 py-3 text-xs sm:text-sm font-black text-[#000000] outline-none cursor-pointer hover:border-slate-400 transition-colors"
              >
                <option value="todos">Todas las Operaciones</option>
                <option value="compra">Solo Venta</option>
                <option value="alquilar">Solo Alquiler</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#000000] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
            </div>

            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e: any) => setFilterStatus(e.target.value)}
                className="appearance-none bg-slate-50 border-2 border-slate-300 rounded-xl pl-4 pr-10 py-3 text-xs sm:text-sm font-black text-[#000000] outline-none cursor-pointer hover:border-slate-400 transition-colors"
              >
                <option value="todos">Todos los Estados</option>
                <option value="disponible">Disponibles</option>
                <option value="reservado">Reservados</option>
                <option value="vendido">Vendidos</option>
                <option value="alquilado">Alquilados</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#000000] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
            </div>

            <button
              onClick={handleOpenCreateModal}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-sm px-5 py-3 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>Añadir Inmueble</span>
            </button>
          </div>
        </div>

        {/* Properties List Table / Cards */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-black text-[#000000]">No se encontraron propiedades</h3>
            <p className="text-sm font-bold text-slate-600 mt-1">Prueba a cambiar los filtros o añade un nuevo inmueble.</p>
            <button
              onClick={handleOpenCreateModal}
              className="mt-4 bg-[#2563eb] text-white text-xs font-black px-4 py-2.5 rounded-xl inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" /> Añadir Inmueble
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((p) => {
              const isRent = (p.operation || "").toLowerCase() === "alquilar" || p.price < 5000;
              const type = p.type || "Piso";

              return (
                <div
                  key={p.id}
                  onClick={() => handleOpenEditModal(p)}
                  className="group bg-white rounded-[26px] sm:rounded-[28px] flex flex-col h-full border-2 border-slate-900/80 hover:border-[#2563eb] shadow-[0_6px_24px_rgba(15,23,42,0.12)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.18)] transition-all duration-300 overflow-hidden cursor-pointer select-none"
                >
                  {/* Card Image + Status Badges */}
                  <div className="relative h-[200px] sm:h-[225px] md:h-[235px] w-full overflow-hidden bg-slate-100">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 pointer-events-none" />

                    {/* Floating Operation & Type Pills */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-20">
                      <span className="inline-flex items-center gap-1.5 bg-[#0b214a]/95 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-md border border-white/10 font-sans">
                        <span className={`w-1.5 h-1.5 rounded-full ${isRent ? 'bg-amber-400' : 'bg-[#60a5fa]'} animate-pulse shrink-0`} />
                        <span>{isRent ? "Alquiler" : "Venta"}</span>
                      </span>
                      <span className="inline-flex items-center bg-[#2563eb] text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-xl shadow-md font-sans">
                        {type}
                      </span>
                    </div>

                    {/* Top-right Status Pill if reserved/sold */}
                    {p.status && p.status !== "disponible" && (
                      <div className="absolute top-3.5 right-3.5 z-20">
                        <span className={`inline-flex items-center text-xs font-black uppercase tracking-wider px-3 py-1 rounded-xl shadow-md font-sans ${
                          p.status === "reservado"
                            ? "bg-amber-500 text-white"
                            : p.status === "vendido" || p.status === "alquilado"
                            ? "bg-slate-800 text-white border border-slate-700"
                            : "bg-[#2563eb] text-white"
                        }`}>
                          {p.status}
                        </span>
                      </div>
                    )}

                    {/* Bottom-left Ref Badge directly over the image */}
                    <div className="absolute bottom-3 left-3.5 z-20">
                      <span className="inline-flex items-center text-[11px] font-mono font-black text-white/90 bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-white/15">
                        Ref: {p.ref || "PJ2024"}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Location with Pin - Solid White Pill (No Transparency) */}
                      <div className="mb-2.5">
                        <span className="inline-flex items-center gap-1.5 bg-white text-[#0b214a] border border-slate-300 px-3 py-1 rounded-full text-xs sm:text-[13px] font-extrabold tracking-tight shadow-2xs">
                          <MapPin className="w-3.5 h-3.5 text-[#2563eb] shrink-0 stroke-[2.5]" />
                          <span className="truncate">{p.location}, Santa Coloma</span>
                        </span>
                      </div>

                      {/* Main Title */}
                      <h3 className="text-lg sm:text-[19px] font-black text-[#0f172a] mb-3 leading-snug group-hover:text-[#2563eb] transition-colors font-sans line-clamp-1">
                        {p.name}
                      </h3>

                      {/* Features Micro-Boxes (Identical to Home Page) */}
                      <div className="grid grid-cols-3 gap-2 pt-1 pb-2">
                        <div className="bg-[#2563eb] text-white rounded-xl py-2 px-1 flex items-center justify-center gap-1.5 font-black text-xs sm:text-sm shadow-xs">
                          <Home className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                          <span>{p.bedrooms > 0 ? p.bedrooms : "0"} hab</span>
                        </div>
                        <div className="bg-[#2563eb] text-white rounded-xl py-2 px-1 flex items-center justify-center gap-1.5 font-black text-xs sm:text-sm shadow-xs">
                          <Bath className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                          <span>{p.bathrooms > 0 ? p.bathrooms : "1"} {p.bathrooms === 1 ? 'baño' : 'baños'}</span>
                        </div>
                        <div className="bg-[#2563eb] text-white rounded-xl py-2 px-1 flex items-center justify-center gap-1.5 font-black text-xs sm:text-sm shadow-xs">
                          <Maximize2 className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                          <span>{p.surface} m²</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Action Row */}
                    <div>
                      <div className="pt-4 mt-3 border-t border-slate-100 flex items-end justify-between gap-3">
                        <div className="flex flex-col min-w-0">
                          {/* Blue Pill Badge for "VENTA" / "ALQUILER" */}
                          <span className="inline-flex items-center self-start bg-[#2563eb] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs mb-1.5 font-sans">
                            {isRent ? "ALQUILER" : "VENTA"}
                          </span>
                          <div className="flex items-baseline whitespace-nowrap">
                            <span className="text-xl sm:text-2xl font-black text-[#0f172a] leading-none font-sans tracking-tight">
                              {new Intl.NumberFormat('es-ES').format(p.price)}<span className="text-[#2563eb] ml-0.5 font-black">€</span>
                            </span>
                            {isRent && (
                              <span className="text-[11px] font-black text-slate-500 font-sans ml-1">/mes</span>
                            )}
                          </div>
                        </div>

                        {/* Direct Click to Edit Pill Badge */}
                        <div className="shrink-0 inline-flex items-center gap-1.5 bg-[#0b214a] group-hover:bg-[#2563eb] text-white text-[11.5px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all duration-300 shadow-sm group-hover:shadow-md border border-slate-800 group-hover:border-[#2563eb]">
                          <span>Editar</span>
                          <Edit className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Admin Controls Footer (Status quick change + External link + Delete) */}
                      <div 
                        onClick={(e) => e.stopPropagation()} 
                        className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2"
                      >
                        {/* Status Dropdown Quick Changer */}
                        <div className="relative">
                          <select
                            value={p.status || "disponible"}
                            onChange={(e) => handleQuickStatusChange(p.id, e.target.value as any)}
                            className="appearance-none text-xs font-black bg-slate-100 border border-slate-300 rounded-lg pl-3 pr-7 py-1.5 text-[#000000] outline-none cursor-pointer hover:bg-slate-200 transition-colors"
                          >
                            <option value="disponible">🟢 Disponible</option>
                            <option value="reservado">🟡 Reservado</option>
                            <option value="vendido">🔴 Vendido</option>
                            <option value="alquilado">🔵 Alquilado</option>
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 text-[#000000] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                        </div>

                        <div className="flex items-center gap-1">
                          <Link
                            to="/inmobiliaria/$slug"
                            params={{ slug: p.slug }}
                            target="_blank"
                            className="p-1.5 text-slate-700 hover:text-[#2563eb] hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver en web"
                          >
                            <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(p.id)}
                            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Eliminar inmueble"
                          >
                            <Trash2 className="w-4 h-4 stroke-[2.5]" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* FOOTER OFICIAL GESGRAMA */}
      <footer className="bg-[#0b1221] text-white relative z-20 border-t border-white/10 w-full" style={{ backgroundColor: '#0b1221' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-12 flex flex-col gap-10 relative">
          
          {/* Top Section: 4 Columns + Mascot */}
          <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-8 lg:gap-12">
            {/* Text Columns (Left Block) */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12 pb-4">
              {/* Logo + tagline */}
              <div className="lg:col-span-1">
                <div className="inline-block mb-4">
                  <img src="/images/logo-gesgrama-text-horizontal.webp" alt="Gesgrama - Inmobiliaria y Administración de Fincas" width={212} height={52} className="h-10 sm:h-12 w-auto object-contain brightness-0 invert" />
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-medium max-w-[260px]">
                  {translations.es.footer.descripcion}
                </p>
              </div>

              {/* Navegación rápida */}
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">{translations.es.footer.quickLinks}</h3>
                <ul className="space-y-3.5">
                  {[
                    { label: translations.es.nav.propiedades, href: "/#propiedades" },
                    { label: translations.es.nav.servicios, href: "/#servicios" },
                    { label: translations.es.nav.nosotros, href: "/#nosotros" },
                    { label: translations.es.nav.contacto, href: "/#contacto" },
                  ].map(link => (
                    <li key={link.href}>
                      <a href={link.href} className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                        <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contacto */}
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">{translations.es.footer.contactInfo}</h3>
                <ul className="space-y-4 text-base text-slate-300 font-bold">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#2563eb] shrink-0 mt-1" />
                    <span className="text-slate-300">Av. dels Banús, 49<br />08923 Sta. Coloma de Gramenet (Barcelona)</span>
                  </li>
                  <li>
                    <a href="tel:+34934685656" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors font-bold whitespace-nowrap">
                      <Phone className="w-5 h-5 text-[#2563eb] shrink-0" />
                      Oficina: 93 468 56 56
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/34601259424" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-emerald-400 hover:text-emerald-300 font-bold transition-colors whitespace-nowrap">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-emerald-400 shrink-0">
                        <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
                      </svg>
                      WhatsApp: 601 25 94 24
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@gesgrama.com" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors font-bold">
                      <Mail className="w-5 h-5 text-[#2563eb] shrink-0" />
                      info@gesgrama.com
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">{translations.es.footer.legal}</h3>
                <ul className="space-y-3.5">
                  <li>
                    <Link to="/aviso-legal" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      Aviso Legal
                    </Link>
                  </li>
                  <li>
                    <Link to="/politica-privacidad" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      Política de Privacidad
                    </Link>
                  </li>
                  <li>
                    <Link to="/politica-cookies" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      Política de Cookies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mascot on Mobile (<768px): Placed discreetly at the end of content */}
            <div className="w-full md:hidden flex justify-center items-center pt-2 pb-2">
              <FooterMascot className="w-24 sm:w-28 h-auto object-contain drop-shadow-md opacity-90" />
            </div>

            {/* Right Block: Mascot Illustration (Desktop / Tablet >= 768px) */}
            <div className="hidden md:flex w-full md:w-[245px] lg:w-[275px] xl:w-[305px] items-center justify-center self-center shrink-0">
              <FooterMascot className="w-full max-h-[225px] lg:max-h-[250px] object-contain drop-shadow-lg" />
            </div>
          </div>

          {/* Cobertura en Santa Coloma de Gramenet */}
          <div className="border-t border-white/10 pt-8 pb-2">
            <h3 className="text-sm sm:text-base font-black text-[#38bdf8] uppercase tracking-wider mb-4 font-sans text-center md:text-left">
              COBERTURA EN SANTA COLOMA DE GRAMENET
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2 sm:gap-2.5">
              {[
                { name: "Centre", slug: "centre" },
                { name: "Santa Rosa", slug: "santa-rosa" },
                { name: "Can Mariner", slug: "can-mariner" },
                { name: "Fondo", slug: "fondo" },
                { name: "Singuerlín", slug: "singuerlin" },
                { name: "Riera Alta", slug: "riera-alta" },
                { name: "Llatí", slug: "llati" },
                { name: "El Raval", slug: "el-raval" },
                { name: "Riu Nord", slug: "riu-nord" },
                { name: "Riu Sud", slug: "riu-sud" },
                { name: "Can Franquesa", slug: "can-franquesa" },
                { name: "Les Oliveres", slug: "les-oliveres" },
                { name: "La Guinardera", slug: "la-guinardera" },
                { name: "Cementiri Vell", slug: "cementiri-vell" }
              ].map(zone => (
                <Link
                  key={zone.slug}
                  to="/administrador-fincas/$city"
                  params={{ city: zone.slug }}
                  className="px-2.5 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-slate-900 hover:text-[#2563eb] text-xs sm:text-xs xl:text-sm font-extrabold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5 text-center whitespace-nowrap"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] shrink-0" />
                  <span className="truncate">{zone.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Horizontal Block: Acreditaciones Profesionales */}
          <div className="border-t border-white/10 pt-8">
            <h3 className="text-base sm:text-lg font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans text-center md:text-left">
              ACREDITACIONES PROFESIONALES
            </h3>
            <AccreditationBadges language="es" />
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 bg-[#060c18]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row justify-between items-center text-center gap-4">
            <p className="text-sm sm:text-base text-white font-extrabold">© 2026 Gesgrama. {translations.es.footer.rights} · <span className="inline-block whitespace-nowrap">Desarrollado por <a href="https://kovia.es" target="_blank" rel="noopener" className="underline hover:text-blue-300">Kovia</a></span></p>
            <div className="flex gap-4 text-sm sm:text-base text-white font-extrabold">
              <Link to="/aviso-legal" className="hover:text-blue-200">Aviso Legal</Link>
              <span>·</span>
              <Link to="/politica-privacidad" className="hover:text-blue-200">Privacidad</Link>
              <span>·</span>
              <Link to="/politica-cookies" className="hover:text-blue-200">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>

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
                    Rellena los datos y adjunta las fotos para publicar el piso en Gesgrama.
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

            {/* Modal Tabs Header */}
            <div className="bg-slate-100 border-b border-slate-200 px-6 pt-3 flex items-center gap-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveModalTab("basicos")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                  activeModalTab === "basicos"
                    ? "bg-white text-[#2563eb] border-[#2563eb] shadow-xs"
                    : "text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/60"
                }`}
              >
                <FileText className="w-4 h-4 stroke-[2.5]" />
                <span>1. Datos Básicos</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab("multimedia")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                  activeModalTab === "multimedia"
                    ? "bg-white text-[#2563eb] border-[#2563eb] shadow-xs"
                    : "text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/60"
                }`}
              >
                <Film className="w-4 h-4 stroke-[2.5]" />
                <span>2. Fotos y Vídeo ({formData.gallery.length + (formData.image ? 1 : 0)})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab("descripcion")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                  activeModalTab === "descripcion"
                    ? "bg-white text-[#2563eb] border-[#2563eb] shadow-xs"
                    : "text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/60"
                }`}
              >
                <Languages className="w-4 h-4 stroke-[2.5]" />
                <span>3. Descripción y Traducciones</span>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProperty} className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              
              {/* TAB 1: DATOS BÁSICOS */}
              {activeModalTab === "basicos" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Row 1: Nombre / Título Universal */}
                  <div>
                    <label className="block text-xs font-black uppercase text-[#000000] mb-1.5">
                      Título del Inmueble *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={`ej: ${formData.type} en ${formData.location}`}
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-sm font-black text-[#000000] focus:border-[#2563eb] outline-none"
                    />
                  </div>

                  {/* Row 2: Tipo, Operación, Referencia y Zona */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase text-[#000000] mb-1.5">
                        Tipo de Inmueble
                      </label>
                      <div className="relative">
                        <select
                          value={formData.type}
                          onChange={(e: any) => setFormData({ ...formData, type: e.target.value })}
                          className="appearance-none w-full bg-slate-50 border-2 border-slate-300 rounded-xl pl-3.5 pr-9 py-3 text-sm font-black text-[#000000] outline-none cursor-pointer focus:border-[#2563eb]"
                        >
                          <option value="Piso">Piso</option>
                          <option value="Ático">Ático</option>
                          <option value="Apartamento">Apartamento</option>
                          <option value="Local comercial">Local comercial</option>
                          <option value="Chalet">Chalet</option>
                          <option value="Oficina">Oficina</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#000000] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-[#000000] mb-1.5">
                        Operación
                      </label>
                      <div className="relative">
                        <select
                          value={formData.operation}
                          onChange={(e: any) => setFormData({ ...formData, operation: e.target.value })}
                          className="appearance-none w-full bg-slate-50 border-2 border-slate-300 rounded-xl pl-3.5 pr-9 py-3 text-sm font-black text-[#000000] outline-none cursor-pointer focus:border-[#2563eb]"
                        >
                          <option value="comprar">Venta</option>
                          <option value="alquilar">Alquiler</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#000000] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-[#000000] mb-1.5">
                        Referencia
                      </label>
                      <input
                        type="text"
                        value={formData.ref}
                        onChange={(e) => setFormData({ ...formData, ref: e.target.value })}
                        placeholder="API A10750"
                        className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-black text-[#000000] outline-none focus:border-[#2563eb]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-[#000000] mb-1.5">
                        Barrio / Zona
                      </label>
                      <div className="relative">
                        <select
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="appearance-none w-full bg-slate-50 border-2 border-slate-300 rounded-xl pl-3.5 pr-9 py-3 text-sm font-black text-[#000000] outline-none cursor-pointer focus:border-[#2563eb]"
                        >
                          {SANTA_COLOMA_ZONES.map((zone) => (
                            <option key={zone} value={zone}>{zone}</option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#000000] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Precio, Habitaciones, Baños, Superficie, Planta/Tipo */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
                    <div>
                      <label className="block text-xs font-black uppercase text-[#000000] mb-1.5">
                        Precio (€) *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-black text-[#2563eb] outline-none focus:border-[#2563eb]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-[#000000] mb-1.5">
                        Habitaciones
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                        className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-black text-[#000000] outline-none focus:border-[#2563eb]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-[#000000] mb-1.5">
                        Baños
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                        className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-black text-[#000000] outline-none focus:border-[#2563eb]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-[#000000] mb-1.5">
                        Superficie (m²)
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={formData.surface}
                        onChange={(e) => setFormData({ ...formData, surface: Number(e.target.value) })}
                        className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-black text-[#000000] outline-none focus:border-[#2563eb]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-[#000000] mb-1.5">
                        Planta / Altura
                      </label>
                      <input
                        type="text"
                        value={formData.floor}
                        onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                        placeholder="ej: Planta 3ª, Bajos"
                        className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-black text-[#000000] outline-none focus:border-[#2563eb]"
                      />
                    </div>
                  </div>

                  {/* Row 4: Estado y Componente Interactivo de Características (Chips/Tags) */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-black uppercase text-[#000000] mb-1.5">
                          Estado Actual
                        </label>
                        <div className="relative">
                          <select
                            value={formData.status}
                            onChange={(e: any) => setFormData({ ...formData, status: e.target.value })}
                            className="appearance-none w-full bg-slate-50 border-2 border-slate-300 rounded-xl pl-3.5 pr-9 py-3 text-sm font-black text-[#000000] outline-none cursor-pointer focus:border-[#2563eb]"
                          >
                            <option value="disponible">🟢 Disponible</option>
                            <option value="reservado">🟡 Reservado</option>
                            <option value="vendido">🔴 Vendido</option>
                            <option value="alquilado">🔵 Alquilado</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Add new tag / chip input */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-black uppercase text-[#000000] mb-1.5">
                          Añadir Característica / Equipamiento
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newFeatureInput}
                            onChange={(e) => setNewFeatureInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddFeature();
                              }
                            }}
                            placeholder="Escribe una comodidad (ej. Ascensor, Terraza...) y pulsa Enter"
                            className="flex-1 bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-3 text-sm font-black text-[#000000] outline-none focus:border-[#2563eb]"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddFeature()}
                            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs shrink-0"
                          >
                            <Plus className="w-4 h-4 stroke-[2.5]" />
                            <span>Añadir</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Chips Display Area - Styled exactly like the public listing features */}
                    <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black uppercase tracking-wider text-[#0f172a]">
                          Características del Inmueble (Chips visuales activos)
                        </span>
                        <span className="text-xs font-bold text-slate-700">
                          {formData.features ? formData.features.split(",").filter((s) => s.trim()).length : 0} seleccionadas
                        </span>
                      </div>

                      {/* Tag list */}
                      {formData.features && formData.features.split(",").filter((s) => s.trim()).length > 0 ? (
                        <div className="flex flex-wrap gap-2.5">
                          {formData.features
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                            .map((feat) => (
                              <div
                                key={feat}
                                className="inline-flex items-center gap-2 bg-blue-50/80 border-2 border-blue-300 px-3.5 py-2 rounded-xl text-xs font-black text-[#0f172a] shadow-xs hover:border-[#2563eb] transition-all group"
                              >
                                <div className="w-5 h-5 rounded-md bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-xs">
                                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                                </div>
                                <span className="font-sans">{feat}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFeature(feat)}
                                  className="ml-1 text-slate-400 hover:text-red-600 hover:bg-red-50 p-1 rounded-md transition-colors cursor-pointer"
                                  title={`Eliminar "${feat}"`}
                                >
                                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                                </button>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <p className="text-xs font-bold text-slate-600 italic py-2">
                          No hay características añadidas aún. Escribe arriba o haz clic en las sugerencias rápidas:
                        </p>
                      )}

                      {/* Quick Suggestions Pills */}
                      <div className="mt-3.5 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-black uppercase text-slate-700 mr-1">Sugerencias rápidas:</span>
                        {["Ascensor", "Terraza", "Balcón", "Parking", "Calefacción", "Aire Acondicionado", "Exterior", "Cerca de Metro", "Reformado"].map((sug) => {
                          const isAlreadyAdded = formData.features
                            ? formData.features.split(",").map((s) => s.trim().toLowerCase()).includes(sug.toLowerCase())
                            : false;
                          if (isAlreadyAdded) return null;
                          return (
                            <button
                              key={sug}
                              type="button"
                              onClick={() => handleAddFeature(sug)}
                              className="text-[11px] font-extrabold bg-white border border-slate-300 hover:border-[#2563eb] text-slate-800 hover:text-[#2563eb] px-2.5 py-1 rounded-lg transition-colors cursor-pointer shadow-2xs"
                            >
                              + {sug}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Next Step Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("multimedia")}
                      className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                    >
                      <span>Siguiente: Fotos y Vídeo</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: FOTOS Y VÍDEO */}
              {activeModalTab === "multimedia" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="bg-slate-50 border-2 border-slate-300 rounded-2xl p-5 space-y-4">
                    
                    {/* Guidelines Box */}
                    <div className="bg-blue-50 border border-blue-300 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs">
                      <Info className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5" />
                      <div className="text-xs text-slate-800 leading-relaxed">
                        <strong className="text-[#0f172a] block font-black mb-0.5">Especificaciones recomendadas para las imágenes:</strong>
                        <span className="font-bold text-slate-700">
                          • Formato: <strong className="text-[#0f172a]">JPG, PNG o WEBP</strong><br />
                          • Orientación: <strong className="text-[#0f172a]">Horizontal (16:9 o 4:3)</strong><br />
                          • Resolución recomendada: <strong className="text-[#0f172a]">1200 x 800 px</strong> (Mínimo: 800 x 600 px)<br />
                          • Peso máximo recomendado: <strong className="text-[#0f172a]">Hasta 5 MB</strong> (la web optimiza la compresión automáticamente).
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-black uppercase text-[#0f172a]">
                          Foto Principal (Portada del Inmueble) *
                        </label>
                        <span className="text-xs font-black text-slate-700">Visible en catálogo y ficha pública</span>
                      </div>

                      {/* Upload button or Image Preview */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        
                        {/* Image Preview Box */}
                        <div className="sm:col-span-4 aspect-[16/10] bg-white rounded-xl border-2 border-slate-300 overflow-hidden relative group flex items-center justify-center shadow-xs">
                          {formData.image ? (
                            <>
                              <img src={formData.image} alt="Vista previa" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => mainFileInputRef.current?.click()}
                                  className="bg-white/90 hover:bg-white text-[#0f172a] text-xs font-black px-2.5 py-1.5 rounded-lg shadow-md cursor-pointer"
                                >
                                  Cambiar
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className="text-center p-3 text-slate-400">
                              <Camera className="w-8 h-8 mx-auto mb-1 opacity-50" />
                              <span className="text-xs font-bold block text-slate-600">Sin imagen</span>
                            </div>
                          )}
                        </div>

                        {/* File Attachment & URL Input */}
                        <div className="sm:col-span-8 space-y-2.5">
                          <input
                            type="file"
                            ref={mainFileInputRef}
                            onChange={handleMainFileChange}
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                          />

                          <button
                            type="button"
                            onClick={() => mainFileInputRef.current?.click()}
                            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                          >
                            <Upload className="w-4 h-4" />
                            <span>Adjuntar Foto desde el Ordenador o Móvil</span>
                          </button>

                          <div className="relative">
                            <span className="text-[11px] font-black uppercase text-slate-700 block mb-1">O pegar enlace de foto (URL externa):</span>
                            <input
                              type="url"
                              value={formData.image}
                              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                              placeholder="https://images.unsplash.com/photo-..."
                              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-[#0f172a] outline-none focus:border-[#2563eb]"
                            />
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* GALERÍA DE FOTOS ADICIONALES */}
                    <div className="pt-4 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-black uppercase text-[#0f172a]">
                          Galería de Fotos Adicionales (Interiores, Plano, Terraza...)
                        </label>
                        <span className="text-xs font-black text-[#2563eb] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                          {formData.gallery.length} foto(s) en galería
                        </span>
                      </div>

                      <input
                        type="file"
                        ref={galleryFileInputRef}
                        onChange={handleGalleryFilesChange}
                        accept="image/jpeg,image/png,image/webp"
                        multiple
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => galleryFileInputRef.current?.click()}
                        className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer mb-2.5"
                      >
                        <Layers className="w-4 h-4" />
                        <span>+ Añadir Más Fotos a la Galería (Sin límite, selecciona tantas como desees)</span>
                      </button>

                      <div className="flex gap-2 items-center mb-3">
                        <input
                          type="url"
                          placeholder="O pegar URL de imagen para la galería (https://...)"
                          id="newGalleryUrlInput"
                          className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-[#0f172a] outline-none focus:border-[#2563eb]"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const val = (e.currentTarget.value || "").trim();
                              if (val) {
                                setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, val] }));
                                e.currentTarget.value = "";
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById("newGalleryUrlInput") as HTMLInputElement | null;
                            if (input && input.value.trim()) {
                              setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, input.value.trim()] }));
                              input.value = "";
                            }
                          }}
                          className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-black px-4 py-2 rounded-xl cursor-pointer shadow-xs"
                        >
                          Añadir URL
                        </button>
                      </div>

                      {/* Gallery Thumbnails Grid */}
                      {formData.gallery.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 pt-1">
                          {formData.gallery.map((imgUrl, idx) => (
                            <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-slate-300 bg-white group shadow-xs">
                              <img src={imgUrl} alt={`Galería ${idx + 1}`} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                                <div className="flex justify-end">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveGalleryImage(idx)}
                                    className="bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow-md transition-colors cursor-pointer"
                                    title="Quitar foto de la galería"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleSetAsCover(idx)}
                                  className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[10px] font-black uppercase tracking-wider py-1 px-1 rounded-md shadow-md transition-colors cursor-pointer text-center"
                                  title="Convertir en foto principal de portada"
                                >
                                  Hacer Portada
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* TOUR VIRTUAL / VÍDEO (OPCIONAL) */}
                    <div className="pt-4 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-black uppercase text-[#0f172a]">
                          Vídeo Tour / Recorrido Virtual (Opcional)
                        </label>
                        <span className="text-xs font-black text-slate-700">Solo si existe vídeo real</span>
                      </div>
                      <input
                        type="url"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        placeholder="https://www.youtube.com/embed/... o enlace de YouTube / Vimeo"
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0f172a] outline-none focus:border-[#2563eb]"
                      />
                      <p className="text-xs text-slate-700 mt-1 font-bold">
                        Si se deja vacío, la sección de vídeo no se mostrará en la ficha del inmueble para mantener el diseño impecable.
                      </p>
                    </div>

                  </div>

                  {/* Navigation Buttons between tabs */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("basicos")}
                      className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                    >
                      <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                      <span>Volver a Datos Básicos</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("descripcion")}
                      className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                    >
                      <span>Siguiente: Descripción y Traducciones</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: DESCRIPCIÓN Y TRADUCCIONES */}
              {activeModalTab === "descripcion" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Row 6: Descripción */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-black uppercase text-[#000000]">
                        Descripción Detallada (Español) *
                      </label>
                      <span className="text-xs font-bold text-slate-700">Texto principal de la ficha</span>
                    </div>
                    <textarea
                      rows={5}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Escribe los detalles de la vivienda, distribución, estado, orientación, calidades..."
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-sm font-bold text-[#000000] placeholder:text-slate-500 outline-none resize-none focus:border-[#2563eb]"
                    />
                  </div>

                  {/* Row 7: TRADUCCIONES AUTOMÁTICAS (CATALÁN / INGLÉS) */}
                  <div className="bg-slate-50 border-2 border-slate-300 rounded-2xl p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#2563eb]" />
                          <span className="text-xs font-black uppercase tracking-wider text-[#0f172a]">
                            Traducciones Automáticas (Catalán e Inglés)
                          </span>
                        </div>
                        {/* High Contrast Clarified Text & Clean Alignment */}
                        <p className="text-xs text-slate-900 font-bold mt-1.5 leading-relaxed">
                          Al guardar, el sistema traduce automáticamente en segundo plano. Puedes desplegar para revisar o personalizar los textos si lo deseas.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 sm:self-center">
                        <button
                          type="button"
                          onClick={() => {
                            const finalName = formData.name.trim() || `${formData.type} en ${formData.location}`;
                            setFormData({
                              ...formData,
                              name_ca: autoTranslateText(finalName, "ca"),
                              name_en: autoTranslateText(finalName, "en"),
                              description_ca: autoTranslateText(formData.description, "ca"),
                              description_en: autoTranslateText(formData.description, "en")
                            });
                            setShowTranslations(true);
                          }}
                          className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-white" />
                          <span>Auto-traducir ahora</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowTranslations(!showTranslations)}
                          className="text-xs font-black text-slate-800 hover:text-[#2563eb] bg-white border border-slate-300 hover:border-[#2563eb] px-3.5 py-2.5 rounded-xl cursor-pointer shadow-2xs transition-colors"
                        >
                          {showTranslations ? "Ocultar ▲" : "Ver / Editar ▼"}
                        </button>
                      </div>
                    </div>

                    {showTranslations && (
                      <div className="pt-4 border-t border-slate-200 space-y-4 animate-in fade-in duration-200">
                        {/* Catalan translation */}
                        <div className="bg-white border-2 border-slate-300 rounded-xl p-4 shadow-xs">
                          <div className="flex items-center justify-between mb-2.5">
                            <span className="inline-block px-2.5 py-1 rounded-md bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider">
                              Català (Traducció)
                            </span>
                            <span className="text-[11px] font-bold text-slate-600">Opcional: puedes afinarla manualmente</span>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-black text-slate-800 mb-1">Títol en Català:</label>
                              <input
                                type="text"
                                value={formData.name_ca}
                                onChange={(e) => setFormData({ ...formData, name_ca: e.target.value })}
                                placeholder={autoTranslateText(formData.name || `${formData.type} en ${formData.location}`, "ca")}
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-[#0f172a] outline-none focus:border-[#2563eb]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-black text-slate-800 mb-1">Descripció en Català:</label>
                              <textarea
                                rows={3}
                                value={formData.description_ca}
                                onChange={(e) => setFormData({ ...formData, description_ca: e.target.value })}
                                placeholder={autoTranslateText(formData.description, "ca")}
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-[#0f172a] outline-none resize-none focus:border-[#2563eb]"
                              />
                            </div>
                          </div>
                        </div>

                        {/* English translation */}
                        <div className="bg-white border-2 border-slate-300 rounded-xl p-4 shadow-xs">
                          <div className="flex items-center justify-between mb-2.5">
                            <span className="inline-block px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-wider">
                              English (Translation)
                            </span>
                            <span className="text-[11px] font-bold text-slate-600">Optional: you can refine it manually</span>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-black text-slate-800 mb-1">Title in English:</label>
                              <input
                                type="text"
                                value={formData.name_en}
                                onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                                placeholder={autoTranslateText(formData.name || `${formData.type} en ${formData.location}`, "en")}
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-[#0f172a] outline-none focus:border-[#2563eb]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-black text-slate-800 mb-1">Description in English:</label>
                              <textarea
                                rows={3}
                                value={formData.description_en}
                                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                                placeholder={autoTranslateText(formData.description, "en")}
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-[#0f172a] outline-none resize-none focus:border-[#2563eb]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-start pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("multimedia")}
                      className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                    >
                      <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                      <span>Volver a Fotos y Vídeo</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons (Always Visible at bottom of modal) */}
              <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-xl border-2 border-slate-300 text-sm font-black text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isUploadingImage}
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {isUploadingImage && <Sparkles className="w-4 h-4 animate-spin" />}
                  <span>{editingProperty ? "Guardar Cambios" : "Publicar Inmueble"}</span>
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
