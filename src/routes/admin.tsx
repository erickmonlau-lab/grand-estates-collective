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
  Languages,
  Store,
  Flame,
  Accessibility,
  CheckCircle,
  HelpCircle
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
import { type PropertyType } from "@/data/properties";
import { autoTranslateText } from "@/lib/translateProperty";
import { FooterMascot } from "@/components/FooterMascot";
import { AccreditationBadges } from "@/components/AccreditationBadges";
import { translations } from "@/data/translations";
import { MUNICIPALITIES, DEFAULT_MUNICIPALITY, getAvailableZonesForMunicipality } from "@/data/municipalities";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel de Gestión Inmobiliaria | Gesgrama Admin" },
      { name: "robots", content: "noindex, nofollow" }
    ]
  }),
  component: AdminDashboard
});

const DEFAULT_ADMIN_PIN = "gesgrama2013";

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
        if (!ctx) {
          reject(new Error("No se pudo obtener el contexto 2D"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Export as WebP with 0.82 quality
        const webpData = canvas.toDataURL("image/webp", 0.82);
        resolve(webpData);
      };
      img.onerror = () => reject(new Error("Error al procesar la imagen"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Error al leer el archivo"));
    reader.readAsDataURL(file);
  });
}

const PROPERTY_TYPES: PropertyType[] = [
  "Piso",
  "Apartamento",
  "Ático",
  "Local comercial",
  "Chalet",
  "Oficina"
];

function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("gesgrama_admin_auth") === "true";
    }
    return false;
  });

  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // Properties State
  const [properties, setProperties] = useState<ExtendedProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<"todos" | "compra" | "alquilar">("todos");
  const [filterStatus, setFilterStatus] = useState<"todos" | "disponible" | "reservado" | "vendido" | "alquilado">("todos");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<ExtendedProperty | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<"basicos" | "multimedia" | "descripcion">("basicos");
  const [showTranslations, setShowTranslations] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    name_ca: "",
    name_en: "",
    ref: "",
    type: "Piso" as PropertyType,
    location: "Centro",
    city: "Santa Coloma de Gramenet",
    price: 180000,
    priceFormatted: "",
    operation: "comprar" as "comprar" | "alquilar",
    bedrooms: 3,
    bathrooms: 1,
    surface: 75,
    floor: "",
    description: "",
    description_ca: "",
    description_en: "",
    features: "",
    image: "",
    gallery: [] as string[],
    videoUrl: "",
    status: "disponible" as "disponible" | "reservado" | "vendido" | "alquilado"
  });

  // Location Autocomplete / Custom input state
  const [locationInput, setLocationInput] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const [newFeatureInput, setNewFeatureInput] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [saveErrorMessage, setSaveErrorMessage] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showSqlGuide, setShowSqlGuide] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Load and Subscribe to Properties
  useEffect(() => {
    let unsubscribe: () => void = () => {};

    async function init() {
      setIsLoading(true);
      const data = await fetchProperties();
      setProperties(data);
      setIsLoading(false);

      unsubscribe = subscribeProperties((updated) => {
        setProperties(updated);
      });
    }

    if (isAuthenticated) {
      init();
    }

    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem("gesgrama_admin_auth", "true");
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("gesgrama_admin_auth");
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingProperty(null);
    setSaveErrorMessage(null);
    setSaveSuccessMessage(null);
    setFormData({
      name: "Piso en Centro",
      name_ca: "",
      name_en: "",
      ref: `API A${Math.floor(10000 + Math.random() * 90000)}`,
      type: "Piso",
      location: "Centro",
      city: DEFAULT_MUNICIPALITY,
      price: 180000,
      priceFormatted: "180.000 €",
      operation: "comprar",
      bedrooms: 3,
      bathrooms: 1,
      surface: 75,
      floor: "3ª planta con ascensor",
      description: "Magnífica vivienda luminosa y totalmente equipada en excelente ubicación.",
      description_ca: "",
      description_en: "",
      features: "Ascensor, Balcón exterior, Calefacción, Cerca de Metro",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80"
      ],
      videoUrl: "",
      status: "disponible"
    });
    setLocationInput("Centro");
    setActiveModalTab("basicos");
    setNewFeatureInput("");
    setShowTranslations(false);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (p: ExtendedProperty) => {
    setEditingProperty(p);
    setSaveErrorMessage(null);
    setSaveSuccessMessage(null);
    const loc = p.location || "Centro";
    setFormData({
      name: p.name || `${p.type} en ${loc}`,
      name_ca: p.name_ca || "",
      name_en: p.name_en || "",
      ref: p.ref || "API A10750",
      type: (p.type as PropertyType) || "Piso",
      location: loc,
      city: p.city || DEFAULT_MUNICIPALITY,
      price: p.price,
      priceFormatted: p.priceFormatted || (p.operation === "alquilar" ? `${p.price} €/mes` : `${p.price.toLocaleString("es-ES")} €`),
      operation: p.operation || "comprar",
      bedrooms: p.bedrooms ?? 0,
      bathrooms: p.bathrooms ?? 1,
      surface: p.surface ?? 50,
      floor: p.floor || "",
      description: p.description || "",
      description_ca: p.description_ca || "",
      description_en: p.description_en || "",
      features: (p.features || []).join(", "),
      image: p.image || "",
      gallery: p.gallery || [],
      videoUrl: p.videoUrl || "",
      status: p.status || "disponible"
    });
    setLocationInput(loc);
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
      const webpData = await processImageFile(file);
      setFormData((prev) => ({ ...prev, image: webpData }));
    } catch (err) {
      console.error(err);
      alert("Error al procesar la imagen");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleGalleryFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      setIsUploadingImage(true);
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const webpData = await processImageFile(files[i]);
        newImages.push(webpData);
      }
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...newImages]
      }));
    } catch (err) {
      console.error(err);
      alert("Error al procesar una o más imágenes");
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
    const targetImage = formData.gallery[index];
    if (!targetImage) return;
    const oldCover = formData.image;
    setFormData((prev) => ({
      ...prev,
      image: targetImage,
      gallery: [oldCover, ...prev.gallery.filter((_, idx) => idx !== index)].filter(Boolean)
    }));
  };

  const handleAddFeature = (featToAdd?: string) => {
    const text = (featToAdd !== undefined ? featToAdd : newFeatureInput).trim();
    if (!text) return;

    const incoming = text.split(",").map((s) => s.trim()).filter(Boolean);
    const existing = formData.features
      ? formData.features.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

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

  // Get dynamic zones for selected municipality
  const currentCity = formData.city || DEFAULT_MUNICIPALITY;
  const existingLocationsInCity = properties
    .filter((p) => (p.city || DEFAULT_MUNICIPALITY) === currentCity)
    .map((p) => p.location);
  const availableZones = getAvailableZonesForMunicipality(currentCity, existingLocationsInCity);

  const filteredZones = availableZones.filter((z) =>
    z.toLowerCase().includes(locationInput.toLowerCase())
  );

  // Real Save with Error Handling & Verification
  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveErrorMessage(null);
    setSaveSuccessMessage(null);

    try {
      const finalLocation = locationInput.trim() || formData.location.trim() || "Centro";
      const finalName = formData.name.trim() || `${formData.type} en ${finalLocation}`;
      const formattedPrice = formData.operation === "alquilar"
        ? `${Number(formData.price).toLocaleString("es-ES")} €/mes`
        : `${Number(formData.price).toLocaleString("es-ES")} €`;

      const featuresList = formData.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);

      const specsString = `${formData.bedrooms} hab. · ${formData.bathrooms} ${formData.bathrooms === 1 ? 'baño' : 'baños'} · ${formData.surface} m²`;

      // Auto translations if empty
      const finalNameCa = formData.name_ca.trim() || autoTranslateText(finalName, "ca");
      const finalNameEn = formData.name_en.trim() || autoTranslateText(finalName, "en");
      const finalDescCa = formData.description_ca.trim() || autoTranslateText(formData.description, "ca");
      const finalDescEn = formData.description_en.trim() || autoTranslateText(formData.description, "en");

      const propertyData = {
        name: finalName,
        name_ca: finalNameCa,
        name_en: finalNameEn,
        ref: formData.ref || "API A10750",
        type: formData.type,
        location: finalLocation,
        city: formData.city || DEFAULT_MUNICIPALITY,
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
      };

      if (editingProperty) {
        await updateProperty(editingProperty.id, propertyData);
      } else {
        await createProperty(propertyData);
      }

      setSaveSuccessMessage("¡Inmueble guardado y sincronizado con éxito!");
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSaving(false);
      }, 700);
    } catch (err: any) {
      console.error("Save error:", err);
      setSaveErrorMessage(err.message || "Error al conectar con la base de datos.");
      setIsSaving(false);
    }
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
      (p.city && p.city.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesMode =
      filterMode === "todos" ||
      (filterMode === "compra" && (p.operation === "comprar" || (p.operation as string) === "compra")) ||
      (filterMode === "alquilar" && p.operation === "alquilar");

    const matchesStatus =
      filterStatus === "todos" ||
      (p.status || "disponible") === filterStatus;

    return matchesSearch && matchesMode && matchesStatus;
  });

  // KPI Metrics
  const totalCount = properties.length;
  const ventaCount = properties.filter((p) => (p.operation || "compra") === "comprar" || (p.operation as string) === "compra").length;
  const alquilerCount = properties.filter((p) => p.operation === "alquilar").length;
  const reservadoCount = properties.filter((p) => p.status === "reservado").length;
  const vendidoCount = properties.filter((p) => p.status === "vendido").length;
  const alquiladoCount = properties.filter((p) => p.status === "alquilado").length;

  // 1. LOGIN SCREEN (AUTHENTICATION REQUIRED)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4F4F6] flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 sm:p-10 shadow-[4px_4px_0px_#111111] border-2 border-[#111111]">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-xl bg-[#2860F5] text-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111] mb-4">
              <ShieldCheck className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-headline font-black text-[#111111]">Panel de Gestión</h1>
            <p className="text-sm font-bold text-slate-600 mt-1 uppercase tracking-wider">Gesgrama Inmobiliaria & Fincas</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-2 tracking-wider">
                Contraseña de Acceso
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Introduce tu clave de administrador"
                  className="w-full bg-white border-2 border-[#111111] rounded-xl px-4 py-3.5 pl-11 text-base font-bold text-[#111111] focus:border-[#2860F5] shadow-[2px_2px_0px_#111111] outline-none transition-all placeholder:text-slate-400"
                  autoFocus
                />
                <Lock className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {pinError && (
                <div className="flex items-center gap-1.5 text-red-600 text-xs font-bold mt-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Contraseña incorrecta. Consulta al responsable de oficina.</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#2860F5] hover:bg-[#111111] text-white py-4 rounded-xl font-headline font-black text-sm uppercase tracking-wider transition-all border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-8 pt-6 border-t-2 border-slate-200 text-center">
            <Link to="/" className="text-xs font-bold text-slate-500 hover:text-[#2860F5] underline transition-colors">
              Volver a la web pública
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED ADMIN DASHBOARD (SOLID NEO-BRUTALIST SOFTWARE INTERFACE)
  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#111111] flex flex-col justify-between font-sans">
      
      {/* Top Navbar: Clean Neo-Brutalist Header */}
      <header className="bg-[#111111] text-white sticky top-0 z-30 border-b-2 border-[#111111] shadow-[0_2px_0px_#2860F5]">
        <div className="max-w-[1520px] w-[95%] mx-auto h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src="/images/logo-gesgrama-text-horizontal.webp"
                alt="Gesgrama"
                className="h-8 sm:h-9 w-auto brightness-0 invert object-contain"
              />
            </Link>
            <span className="hidden sm:inline-block bg-[#2860F5] text-white text-[12px] font-headline font-black uppercase tracking-widest px-3 py-1 rounded-lg border border-white">
              ADMINISTRADOR
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden md:flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-wider text-white bg-[#222222] hover:bg-[#333333] border border-white/20 px-4 py-2 rounded-xl transition-all shadow-xs"
            >
              <span>Ver Web</span>
              <ExternalLink className="w-3.5 h-3.5 text-white" />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 border border-white/20 px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
            >
              <LogOut className="w-4 h-4 text-white" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1520px] w-[95%] mx-auto pt-8 pb-16 flex-1">
        
        {/* Supabase Status Banner: Solid Professional Bar */}
        <div className="bg-white border-2 border-[#111111] rounded-2xl p-5 mb-8 shadow-[3px_3px_0px_#111111] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl border-2 border-[#111111] flex items-center justify-center shrink-0 ${
              isSupabaseConfigured ? 'bg-emerald-500 text-white shadow-[2px_2px_0px_#111111]' : 'bg-amber-400 text-black shadow-[2px_2px_0px_#111111]'
            }`}>
              <Database className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-base sm:text-lg font-headline font-black text-[#111111]">
                  {isSupabaseConfigured ? "Conectado a Base de Datos Supabase (Tiempo Real)" : "Modo Almacenamiento Local Reactivo Activo"}
                </h2>
                <span className={`text-[11px] font-headline font-black uppercase px-2.5 py-0.5 rounded-md border border-[#111111] ${
                  isSupabaseConfigured ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                }`}>
                  {isSupabaseConfigured ? "En la Nube" : "Navegador"}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans font-medium text-slate-600 mt-0.5">
                {isSupabaseConfigured
                  ? "Cualquier inmueble añadido o editado aquí se publica instantáneamente para todos los visitantes."
                  : "Los cambios persisten en el almacenamiento del navegador de forma segura e inmediata."}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowSqlGuide(!showSqlGuide)}
            className="text-xs font-headline font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-[#111111] px-4 py-2.5 rounded-xl border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>{showSqlGuide ? "Ocultar Guía SQL" : "Ver Estructura SQL Supabase"}</span>
          </button>
        </div>

        {/* Collapsible Supabase SQL Script Card */}
        {showSqlGuide && (
          <div className="bg-[#111111] text-white p-6 rounded-2xl mb-8 shadow-[4px_4px_0px_#2860F5] border-2 border-[#111111] animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-headline font-black text-amber-400 font-mono">1. Esquema SQL para la tabla properties</h3>
                <p className="text-xs text-slate-300 mt-0.5">Incluye todas las columnas auditadas: floor, video_url, city, translations y features.</p>
              </div>
              <button
                onClick={handleCopySql}
                className="bg-[#2860F5] hover:bg-[#1a4ed8] text-white text-xs font-headline font-bold uppercase tracking-wider px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer border border-white/20"
              >
                {copiedSql ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSql ? "¡Copiado!" : "Copiar SQL"}</span>
              </button>
            </div>
            <pre className="bg-[#050505] p-4 rounded-xl text-xs font-data-mono text-emerald-400 overflow-x-auto border border-slate-800 max-h-60">
              {SUPABASE_SETUP_SQL}
            </pre>
          </div>
        )}

        {/* Metrics Grid: Solid White Neo-Brutalist Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111]">
            <span className="text-[12px] font-headline font-bold uppercase text-[#111111] tracking-wider block truncate">Total Inmuebles</span>
            <div className="text-2xl sm:text-3xl font-data-mono font-black text-[#111111] mt-1">{totalCount}</div>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#2860F5]">
            <span className="text-[12px] font-headline font-bold uppercase text-[#2860F5] tracking-wider block truncate">En Venta</span>
            <div className="text-2xl sm:text-3xl font-data-mono font-black text-[#2860F5] mt-1">{ventaCount}</div>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111]">
            <span className="text-[12px] font-headline font-bold uppercase text-emerald-700 tracking-wider block truncate">En Alquiler</span>
            <div className="text-2xl sm:text-3xl font-data-mono font-black text-emerald-700 mt-1">{alquilerCount}</div>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111]">
            <span className="text-[12px] font-headline font-bold uppercase text-amber-700 tracking-wider block truncate">Reservados</span>
            <div className="text-2xl sm:text-3xl font-data-mono font-black text-amber-600 mt-1">{reservadoCount}</div>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111]">
            <span className="text-[12px] font-headline font-bold uppercase text-rose-700 tracking-wider block truncate">Vendidos</span>
            <div className="text-2xl sm:text-3xl font-data-mono font-black text-rose-600 mt-1">{vendidoCount}</div>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111]">
            <span className="text-[12px] font-headline font-bold uppercase text-indigo-700 tracking-wider block truncate">Alquilados</span>
            <div className="text-2xl sm:text-3xl font-data-mono font-black text-indigo-600 mt-1">{alquiladoCount}</div>
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111] mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-[#2860F5] absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.5]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, referencia (ej: PJ2024), barrio o municipio..."
              className="w-full bg-[#FAF9FC] border-2 border-[#111111] rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-[#111111] placeholder:text-slate-400 focus:border-[#2860F5] outline-none transition-colors"
            />
          </div>

          {/* Filters & New Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                value={filterMode}
                onChange={(e: any) => setFilterMode(e.target.value)}
                className="appearance-none bg-[#FAF9FC] border-2 border-[#111111] rounded-xl pl-4 pr-10 py-3 text-xs sm:text-sm font-headline font-bold text-[#111111] outline-none cursor-pointer hover:border-[#2860F5] transition-colors"
              >
                <option value="todos">Todas las Operaciones</option>
                <option value="compra">Solo Venta</option>
                <option value="alquilar">Solo Alquiler</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#111111] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
            </div>

            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e: any) => setFilterStatus(e.target.value)}
                className="appearance-none bg-[#FAF9FC] border-2 border-[#111111] rounded-xl pl-4 pr-10 py-3 text-xs sm:text-sm font-headline font-bold text-[#111111] outline-none cursor-pointer hover:border-[#2860F5] transition-colors"
              >
                <option value="todos">Todos los Estados</option>
                <option value="disponible">🟢 Disponibles</option>
                <option value="reservado">🟡 Reservados</option>
                <option value="vendido">🔴 Vendidos</option>
                <option value="alquilado">🔵 Alquilados</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#111111] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
            </div>

            <button
              onClick={handleOpenCreateModal}
              className="bg-[#2860F5] hover:bg-[#111111] text-white font-headline font-black text-sm px-6 py-3 rounded-xl flex items-center gap-2 border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>Añadir Inmueble</span>
            </button>
          </div>
        </div>

        {/* Properties Cards Grid */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-[#111111] p-12 text-center shadow-[3px_3px_0px_#111111]">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-headline font-black text-[#111111]">No se encontraron propiedades</h3>
            <p className="text-sm font-medium text-slate-600 mt-1">Prueba a cambiar los filtros o añade un nuevo inmueble.</p>
            <button
              onClick={handleOpenCreateModal}
              className="mt-4 bg-[#2860F5] hover:bg-[#111111] text-white text-xs font-headline font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl border-2 border-[#111111] shadow-[2px_2px_0px_#111111] inline-flex items-center gap-2 cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" /> Añadir Inmueble
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((p) => {
              const isRent = (p.operation || "").toLowerCase() === "alquilar" || p.price < 5000;
              const type = p.type || "Piso";
              const isCommercial = type === "Local comercial" || type === "Oficina";

              return (
                <div
                  key={p.id}
                  onClick={() => handleOpenEditModal(p)}
                  className="group bg-white rounded-2xl flex flex-col h-full border-2 border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#2860F5] hover:border-[#2860F5] transition-all duration-200 overflow-hidden cursor-pointer select-none"
                >
                  {/* Card Image + Badges */}
                  <div className="relative h-[210px] sm:h-[230px] w-full overflow-hidden bg-slate-100 border-b-2 border-[#111111]">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Operation & Type Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 z-20">
                      <span className="inline-flex items-center gap-1.5 bg-[#111111] text-white text-[11px] font-headline font-black uppercase tracking-wider px-2.5 py-1 border border-white">
                        <span className={`w-2 h-2 ${isRent ? 'bg-amber-400' : 'bg-[#2860F5]'}`} />
                        <span>{isRent ? "Alquiler" : "Venta"}</span>
                      </span>
                      <span className="inline-flex items-center bg-[#2860F5] text-white text-[11px] font-headline font-black uppercase tracking-wider px-2.5 py-1 border border-white">
                        {type}
                      </span>
                    </div>

                    {/* Status Badge */}
                    {p.status && p.status !== "disponible" && (
                      <div className="absolute top-3 right-3 z-20">
                        <span className={`inline-flex items-center text-[11px] font-headline font-black uppercase tracking-wider px-2.5 py-1 border border-[#111111] shadow-[2px_2px_0px_#111111] ${
                          p.status === "reservado"
                            ? "bg-amber-400 text-black"
                            : "bg-red-500 text-white"
                        }`}>
                          {p.status}
                        </span>
                      </div>
                    )}

                    {/* Ref Badge */}
                    <div className="absolute bottom-2.5 left-3 z-20">
                      <span className="inline-flex items-center text-[11px] font-data-mono font-black text-white bg-[#111111] px-2 py-0.5 border border-white">
                        Ref: {p.ref || "PJ2024"}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Location: Protagonist Pin + Neighborhood */}
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#2860F5] border border-[#111111] flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4 text-white stroke-[2.5]" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[15px] font-headline font-extrabold text-[#111111] leading-none uppercase truncate">
                            {p.location}
                          </span>
                          <span className="block text-[11px] font-sans font-semibold text-slate-500 truncate mt-0.5">
                            {p.city || "Santa Coloma de Gramenet"}
                          </span>
                        </div>
                      </div>

                      {/* Main Title */}
                      <h3 className="text-[17px] sm:text-[18px] font-headline font-extrabold text-[#111111] mb-3 leading-snug group-hover:text-[#2860F5] transition-colors line-clamp-1">
                        {p.name}
                      </h3>

                      {/* Dynamic Features Micro-Blocks */}
                      <div className="grid grid-cols-3 gap-2 pt-1 pb-2">
                        {isCommercial ? (
                          <>
                            <div className="bg-white border-2 border-[#111111] rounded-xl p-2 text-center shadow-[1px_1px_0px_#111111]">
                              <span className="block text-[10px] font-headline font-bold text-slate-500 uppercase">SUPERFICIE</span>
                              <span className="block text-sm font-data-mono font-black text-[#111111]">{p.surface} m²</span>
                            </div>
                            <div className="bg-white border-2 border-[#111111] rounded-xl p-2 text-center shadow-[1px_1px_0px_#111111]">
                              <span className="block text-[10px] font-headline font-bold text-slate-500 uppercase">BAÑOS</span>
                              <span className="block text-sm font-data-mono font-black text-[#111111]">{p.bathrooms || 1}</span>
                            </div>
                            <div className="bg-white border-2 border-[#111111] rounded-xl p-2 text-center shadow-[1px_1px_0px_#111111]">
                              <span className="block text-[10px] font-headline font-bold text-slate-500 uppercase">PLANTA</span>
                              <span className="block text-sm font-data-mono font-black text-[#111111] truncate">{p.floor ? p.floor.slice(0, 6) : "Baja"}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="bg-white border-2 border-[#111111] rounded-xl p-2 text-center shadow-[1px_1px_0px_#111111]">
                              <span className="block text-[10px] font-headline font-bold text-slate-500 uppercase">HAB.</span>
                              <span className="block text-sm font-data-mono font-black text-[#111111]">{p.bedrooms}</span>
                            </div>
                            <div className="bg-white border-2 border-[#111111] rounded-xl p-2 text-center shadow-[1px_1px_0px_#111111]">
                              <span className="block text-[10px] font-headline font-bold text-slate-500 uppercase">BAÑOS</span>
                              <span className="block text-sm font-data-mono font-black text-[#111111]">{p.bathrooms || 1}</span>
                            </div>
                            <div className="bg-white border-2 border-[#111111] rounded-xl p-2 text-center shadow-[1px_1px_0px_#111111]">
                              <span className="block text-[10px] font-headline font-bold text-slate-500 uppercase">SUPERFICIE</span>
                              <span className="block text-sm font-data-mono font-black text-[#111111]">{p.surface} m²</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Price & Action Row */}
                    <div>
                      <div className="pt-3 mt-2 border-t-2 border-[#111111] flex items-end justify-between gap-3">
                        <div className="flex flex-col min-w-0">
                          <span className="text-[11px] font-headline font-bold uppercase tracking-wider text-slate-600">
                            {isRent ? "PRECIO ALQUILER" : "PRECIO VENTA"}
                          </span>
                          <div className="flex items-baseline whitespace-nowrap">
                            <span className="text-xl sm:text-2xl font-data-mono font-black text-[#111111] leading-none">
                              {new Intl.NumberFormat('es-ES').format(p.price)}&nbsp;€
                            </span>
                            {isRent && (
                              <span className="text-[12px] font-bold text-slate-500 ml-1">/mes</span>
                            )}
                          </div>
                        </div>

                        {/* Edit Button */}
                        <div className="shrink-0 inline-flex items-center gap-1.5 bg-[#2860F5] group-hover:bg-[#111111] text-white text-[12px] font-headline font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all shadow-[2px_2px_0px_#111111] border border-[#111111]">
                          <span>Editar</span>
                          <Edit className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Admin Controls Footer (Quick Status + View + Delete) */}
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between gap-2"
                      >
                        {/* Status Quick Select */}
                        <div className="relative">
                          <select
                            value={p.status || "disponible"}
                            onChange={(e) => handleQuickStatusChange(p.id, e.target.value as any)}
                            className="appearance-none text-xs font-bold bg-[#FAF9FC] border border-[#111111] rounded-lg pl-2.5 pr-6 py-1 text-[#111111] outline-none cursor-pointer hover:bg-slate-200 transition-colors"
                          >
                            <option value="disponible">🟢 Disponible</option>
                            <option value="reservado">🟡 Reservado</option>
                            <option value="vendido">🔴 Vendido</option>
                            <option value="alquilado">🔵 Alquilado</option>
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 text-[#111111] absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Link
                            to="/inmobiliaria/$slug"
                            params={{ slug: p.slug }}
                            target="_blank"
                            className="p-1.5 text-slate-700 hover:text-[#2860F5] hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-300"
                            title="Ver ficha pública"
                          >
                            <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(p.id)}
                            className="p-1.5 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-[#111111]"
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
      <footer className="bg-[#111111] text-white border-t-2 border-[#111111] w-full">
        <div className="max-w-[1520px] w-[95%] mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold">Gesgrama Inmobiliaria & Fincas</span>
            <span>·</span>
            <span>Gestor de Contenidos Interno</span>
          </div>
          <div>
            <span>© 2026 Gesgrama · Todos los derechos reservados</span>
          </div>
        </div>
      </footer>

      {/* CREATE / EDIT PROPERTY MODAL (FULL SOLID WHITE NEO-BRUTALIST SOFTWARE DIALOG) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-[6px_6px_0px_#111111] border-2 border-[#111111] overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-[#111111] text-white p-5 sm:p-6 flex items-center justify-between border-b-2 border-[#111111] shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#2860F5] text-white border border-white flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-headline font-black text-white">
                    {editingProperty ? "Editar Inmueble" : "Añadir Nuevo Inmueble"}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5 font-sans font-medium">
                    Gestión centralizada de ficha pública, fotografías, traducciones y características.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-white/30"
              >
                <X className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            {/* Modal Tabs Header */}
            <div className="bg-[#FAF9FC] border-b-2 border-[#111111] px-4 sm:px-6 pt-3 flex items-center gap-2 overflow-x-auto shrink-0">
              <button
                type="button"
                onClick={() => setActiveModalTab("basicos")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-headline font-bold uppercase tracking-wider transition-all border-t-2 border-x-2 cursor-pointer whitespace-nowrap ${
                  activeModalTab === "basicos"
                    ? "bg-white text-[#2860F5] border-[#111111] shadow-xs -mb-[2px] pb-[12px]"
                    : "text-slate-600 hover:text-[#111111] border-transparent hover:bg-slate-200"
                }`}
              >
                <FileText className="w-4 h-4 stroke-[2.5]" />
                <span>1. Datos Básicos y Zonas</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab("multimedia")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-headline font-bold uppercase tracking-wider transition-all border-t-2 border-x-2 cursor-pointer whitespace-nowrap ${
                  activeModalTab === "multimedia"
                    ? "bg-white text-[#2860F5] border-[#111111] shadow-xs -mb-[2px] pb-[12px]"
                    : "text-slate-600 hover:text-[#111111] border-transparent hover:bg-slate-200"
                }`}
              >
                <Film className="w-4 h-4 stroke-[2.5]" />
                <span>2. Fotos y Vídeo ({formData.gallery.length + (formData.image ? 1 : 0)})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab("descripcion")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-headline font-bold uppercase tracking-wider transition-all border-t-2 border-x-2 cursor-pointer whitespace-nowrap ${
                  activeModalTab === "descripcion"
                    ? "bg-white text-[#2860F5] border-[#111111] shadow-xs -mb-[2px] pb-[12px]"
                    : "text-slate-600 hover:text-[#111111] border-transparent hover:bg-slate-200"
                }`}
              >
                <Languages className="w-4 h-4 stroke-[2.5]" />
                <span>3. Descripción y Traducciones</span>
              </button>
            </div>

            {/* Modal Form Scrollable Body */}
            <form onSubmit={handleSaveProperty} className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1">
              
              {/* Feedback messages */}
              {saveSuccessMessage && (
                <div className="bg-emerald-50 border-2 border-emerald-600 rounded-xl p-4 text-emerald-800 text-sm font-bold flex items-center gap-2.5 animate-in fade-in">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>{saveSuccessMessage}</span>
                </div>
              )}

              {saveErrorMessage && (
                <div className="bg-red-50 border-2 border-red-600 rounded-xl p-4 text-red-800 text-sm font-bold flex items-center gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 stroke-[2.5]" />
                  <span>{saveErrorMessage}</span>
                </div>
              )}

              {/* TAB 1: DATOS BÁSICOS Y ZONAS */}
              {activeModalTab === "basicos" && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  
                  {/* Título de la Ficha */}
                  <div>
                    <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                      Título Público del Inmueble *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={`ej: ${formData.type} en ${formData.location}`}
                      className="w-full bg-[#FAF9FC] border-2 border-[#111111] rounded-xl px-4 py-3 text-sm font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                    />
                  </div>

                  {/* Row: Tipo, Operación, Referencia y Estado Comercial */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {/* Tipo de Inmueble (Audited: Piso, Apartamento, Ático, Local comercial, Chalet, Oficina) */}
                    <div>
                      <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                        Tipo de Inmueble *
                      </label>
                      <div className="relative">
                        <select
                          value={formData.type}
                          onChange={(e: any) => setFormData({ ...formData, type: e.target.value })}
                          className="appearance-none w-full bg-[#FAF9FC] border-2 border-[#111111] rounded-xl pl-3.5 pr-9 py-3 text-sm font-bold text-[#111111] outline-none cursor-pointer focus:border-[#2860F5] shadow-[2px_2px_0px_#111111]"
                        >
                          {PROPERTY_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#111111] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                      </div>
                    </div>

                    {/* Operación */}
                    <div>
                      <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                        Operación *
                      </label>
                      <div className="relative">
                        <select
                          value={formData.operation}
                          onChange={(e: any) => setFormData({ ...formData, operation: e.target.value })}
                          className="appearance-none w-full bg-[#FAF9FC] border-2 border-[#111111] rounded-xl pl-3.5 pr-9 py-3 text-sm font-bold text-[#111111] outline-none cursor-pointer focus:border-[#2860F5] shadow-[2px_2px_0px_#111111]"
                        >
                          <option value="comprar">Venta</option>
                          <option value="alquilar">Alquiler</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#111111] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                      </div>
                    </div>

                    {/* Referencia */}
                    <div>
                      <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                        Referencia *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.ref}
                        onChange={(e) => setFormData({ ...formData, ref: e.target.value })}
                        placeholder="API A10750"
                        className="w-full bg-[#FAF9FC] border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-data-mono font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                      />
                    </div>

                    {/* Estado Comercial */}
                    <div>
                      <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                        Estado Comercial *
                      </label>
                      <div className="relative">
                        <select
                          value={formData.status || "disponible"}
                          onChange={(e: any) => setFormData({ ...formData, status: e.target.value })}
                          className="appearance-none w-full bg-[#FAF9FC] border-2 border-[#111111] rounded-xl pl-3.5 pr-9 py-3 text-sm font-bold text-[#111111] outline-none cursor-pointer focus:border-[#2860F5] shadow-[2px_2px_0px_#111111]"
                        >
                          <option value="disponible">🟢 Disponible</option>
                          <option value="reservado">🟡 Reservado</option>
                          <option value="vendido">🔴 Vendido</option>
                          <option value="alquilado">🔵 Alquilado</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#111111] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                      </div>
                    </div>
                  </div>

                  {/* Row: MUNICIPIO Y ZONA/BARRIO (CAMPOS INDEPENDIENTES CON AUTOCOMPLETADO Y ZONA NUEVA LIBRE) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#FAF9FC] border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111]">
                    
                    {/* Campo 1: MUNICIPIO */}
                    <div>
                      <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                        Municipio *
                      </label>
                      <div className="relative">
                        <select
                          value={formData.city}
                          onChange={(e) => {
                            const newCity = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              city: newCity
                            }));
                          }}
                          className="appearance-none w-full bg-white border-2 border-[#111111] rounded-xl pl-3.5 pr-9 py-3 text-sm font-bold text-[#111111] outline-none cursor-pointer focus:border-[#2860F5] shadow-[2px_2px_0px_#111111]"
                        >
                          {Object.keys(MUNICIPALITIES).map((mKey) => (
                            <option key={mKey} value={mKey}>{mKey}</option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#111111] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                      </div>
                      <span className="text-[11px] font-sans font-medium text-slate-500 mt-1 block">
                        Cobertura real: Santa Coloma, Barcelona, Badalona, etc.
                      </span>
                    </div>

                    {/* Campo 2: BARRIO / ZONA (BÚSQUEDA, AUTOCOMPLETADO Y ALTA DE NUEVA ZONA) */}
                    <div className="relative">
                      <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                        Barrio / Zona *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={locationInput}
                          onChange={(e) => {
                            setLocationInput(e.target.value);
                            setFormData((prev) => ({ ...prev, location: e.target.value }));
                            setShowLocationDropdown(true);
                          }}
                          onFocus={() => setShowLocationDropdown(true)}
                          placeholder="Escribe o selecciona un barrio..."
                          className="w-full bg-white border-2 border-[#111111] rounded-xl pl-3.5 pr-9 py-3 text-sm font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                        />
                        <MapPin className="w-4 h-4 text-[#2860F5] absolute right-3 top-1/2 -translate-y-1/2 stroke-[2.5]" />
                      </div>

                      {/* Dropdown de sugerencias de barrio con opción de registrar nueva zona */}
                      {showLocationDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border-2 border-[#111111] rounded-xl shadow-[4px_4px_0px_#111111] z-50 max-h-48 overflow-y-auto p-1.5 space-y-1">
                          {filteredZones.map((z) => (
                            <button
                              key={z}
                              type="button"
                              onClick={() => {
                                setLocationInput(z);
                                setFormData((prev) => ({ ...prev, location: z }));
                                setShowLocationDropdown(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-headline font-bold flex items-center justify-between transition-colors cursor-pointer ${
                                locationInput.toLowerCase() === z.toLowerCase()
                                  ? "bg-[#2860F5] text-white"
                                  : "text-[#111111] hover:bg-slate-100"
                              }`}
                            >
                              <span>{z}</span>
                              {locationInput.toLowerCase() === z.toLowerCase() && (
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              )}
                            </button>
                          ))}

                          {/* Botón para registrar zona personalizada nueva */}
                          {locationInput.trim() && !availableZones.some(z => z.toLowerCase() === locationInput.trim().toLowerCase()) && (
                            <button
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, location: locationInput.trim() }));
                                setShowLocationDropdown(false);
                              }}
                              className="w-full text-left px-3 py-2 rounded-lg text-xs font-headline font-bold text-[#2860F5] bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                              <Plus className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Registrar y utilizar nueva zona: "{locationInput.trim()}"</span>
                            </button>
                          )}
                        </div>
                      )}

                      <span className="text-[11px] font-sans font-medium text-slate-500 mt-1 block">
                        Permite escribir cualquier barrio nuevo sin restricción.
                      </span>
                    </div>

                  </div>

                  {/* Row: Métricas (Precio, Habitaciones, Baños, Superficie, Planta) */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                        Precio (€) *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setFormData({
                            ...formData,
                            price: val,
                            priceFormatted: formData.operation === "alquilar" ? `${val} €/mes` : `${val.toLocaleString("es-ES")} €`
                          });
                        }}
                        className="w-full bg-[#FAF9FC] border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-data-mono font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                        Habitaciones
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                        className="w-full bg-[#FAF9FC] border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-data-mono font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                        Baños
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                        className="w-full bg-[#FAF9FC] border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-data-mono font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                        Superficie (m²) *
                      </label>
                      <input
                        type="number"
                        required
                        min={1}
                        value={formData.surface}
                        onChange={(e) => setFormData({ ...formData, surface: Number(e.target.value) })}
                        className="w-full bg-[#FAF9FC] border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-data-mono font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                        Planta / Altura
                      </label>
                      <input
                        type="text"
                        value={formData.floor}
                        onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                        placeholder="3ª con ascensor"
                        className="w-full bg-[#FAF9FC] border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                      />
                    </div>
                  </div>

                  {/* Características y Equipamiento */}
                  <div>
                    <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
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
                        placeholder="Escribe una característica (ej. Ascensor, Terraza, Escaparate...) y pulsa Enter"
                        className="flex-1 bg-[#FAF9FC] border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-bold text-[#111111] outline-none focus:border-[#2860F5] shadow-[2px_2px_0px_#111111]"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddFeature()}
                        className="bg-[#2860F5] hover:bg-[#111111] text-white px-5 py-3 rounded-xl font-headline font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border-2 border-[#111111] shadow-[2px_2px_0px_#111111] shrink-0"
                      >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        <span>Añadir</span>
                      </button>
                    </div>

                    {/* Chips Display Area */}
                    <div className="mt-3 bg-[#FAF9FC] border-2 border-[#111111] rounded-xl p-3.5 shadow-[2px_2px_0px_#111111]">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[11px] font-headline font-black uppercase tracking-wider text-[#111111]">
                          Características Activas ({formData.features ? formData.features.split(",").filter((s) => s.trim()).length : 0})
                        </span>
                      </div>

                      {formData.features && formData.features.split(",").filter((s) => s.trim()).length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {formData.features
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                            .map((feat) => (
                              <div
                                key={feat}
                                className="inline-flex items-center gap-1.5 bg-white border-2 border-[#111111] px-3 py-1.5 rounded-lg text-xs font-bold text-[#111111] shadow-[1px_1px_0px_#111111]"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2860F5] stroke-[2.5]" />
                                <span>{feat}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFeature(feat)}
                                  className="ml-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                                  title={`Eliminar "${feat}"`}
                                >
                                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                                </button>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <p className="text-xs font-medium text-slate-500 italic py-1">
                          No hay características añadidas aún. Usa las sugerencias rápidas o escribe arriba.
                        </p>
                      )}

                      {/* Quick Suggestions */}
                      <div className="mt-3 pt-2.5 border-t border-slate-200 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-1">Sugerencias:</span>
                        {["Ascensor", "Terraza", "Balcón", "Parking", "Calefacción", "Aire Acondicionado", "Exterior", "Escaparate", "Salida de humos", "PMR"].map((sug) => {
                          const isAlreadyAdded = formData.features
                            ? formData.features.split(",").map((s) => s.trim().toLowerCase()).includes(sug.toLowerCase())
                            : false;
                          if (isAlreadyAdded) return null;
                          return (
                            <button
                              key={sug}
                              type="button"
                              onClick={() => handleAddFeature(sug)}
                              className="text-xs font-bold bg-white border border-[#111111] hover:border-[#2860F5] hover:text-[#2860F5] text-[#111111] px-2.5 py-1 rounded-md transition-colors cursor-pointer shadow-xs"
                            >
                              + {sug}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Step Navigation Button */}
                  <div className="flex justify-end pt-3">
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("multimedia")}
                      className="bg-[#2860F5] hover:bg-[#111111] text-white px-6 py-3 rounded-xl text-xs font-headline font-bold uppercase tracking-wider flex items-center gap-2 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all cursor-pointer"
                    >
                      <span>Siguiente: Fotos y Vídeo</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: FOTOS Y VÍDEO */}
              {activeModalTab === "multimedia" && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="bg-[#FAF9FC] border-2 border-[#111111] rounded-2xl p-5 space-y-5 shadow-[2px_2px_0px_#111111]">
                    
                    {/* FOTO PRINCIPAL / PORTADA */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-headline font-black uppercase text-[#111111] tracking-wider">
                          Foto Principal (Portada del Inmueble) *
                        </label>
                        <span className="text-xs font-bold text-slate-500">Visible en catálogo y ficha pública</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        {/* Preview Box */}
                        <div className="sm:col-span-4 aspect-[16/10] bg-white rounded-xl border-2 border-[#111111] overflow-hidden relative group flex items-center justify-center shadow-[2px_2px_0px_#111111]">
                          {formData.image ? (
                            <>
                              <img src={formData.image} alt="Vista previa" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => mainFileInputRef.current?.click()}
                                  className="bg-white text-[#111111] text-xs font-headline font-black px-3 py-1.5 rounded-lg border border-[#111111] shadow-sm cursor-pointer"
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

                        {/* File Upload Controls */}
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
                            className="w-full bg-[#2860F5] hover:bg-[#111111] text-white py-3 px-4 rounded-xl text-xs font-headline font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border-2 border-[#111111] shadow-[2px_2px_0px_#111111] cursor-pointer"
                          >
                            <Upload className="w-4 h-4 stroke-[2.5]" />
                            <span>Adjuntar Foto Principal desde Ordenador / Móvil</span>
                          </button>

                          <div>
                            <span className="text-[11px] font-bold uppercase text-slate-600 block mb-1">O pegar URL externa:</span>
                            <input
                              type="url"
                              value={formData.image}
                              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                              placeholder="https://..."
                              className="w-full bg-white border-2 border-[#111111] rounded-xl px-3 py-2 text-xs font-bold text-[#111111] outline-none focus:border-[#2860F5]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* GALERÍA DE FOTOS ADICIONALES */}
                    <div className="pt-4 border-t-2 border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-headline font-black uppercase text-[#111111] tracking-wider">
                          Galería de Fotos Adicionales (Interiores, Plano, Terraza...)
                        </label>
                        <span className="text-xs font-bold text-[#2860F5] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 font-data-mono">
                          {formData.gallery.length} fotos en galería
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

                      <div className="flex flex-col sm:flex-row gap-2 mb-3">
                        <button
                          type="button"
                          onClick={() => galleryFileInputRef.current?.click()}
                          className="bg-[#111111] hover:bg-[#2860F5] text-white py-2.5 px-4 rounded-xl text-xs font-headline font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border-2 border-[#111111] shadow-[2px_2px_0px_#111111] cursor-pointer"
                        >
                          <Upload className="w-4 h-4 stroke-[2.5]" />
                          <span>Adjuntar Varias Fotos</span>
                        </button>

                        <div className="flex-1 flex gap-2">
                          <input
                            type="url"
                            id="newGalleryUrlInput"
                            placeholder="Pegar URL y pulsar Añadir..."
                            className="flex-1 bg-white border-2 border-[#111111] rounded-xl px-3 py-2 text-xs font-bold text-[#111111] outline-none focus:border-[#2860F5]"
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
                            className="bg-[#2860F5] hover:bg-[#111111] text-white text-xs font-headline font-bold uppercase tracking-wider px-4 py-2 rounded-xl cursor-pointer border-2 border-[#111111] shadow-[1px_1px_0px_#111111] transition-all"
                          >
                            Añadir URL
                          </button>
                        </div>
                      </div>

                      {/* Gallery Thumbnails Grid */}
                      {formData.gallery.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 pt-2">
                          {formData.gallery.map((imgUrl, idx) => (
                            <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#111111] bg-white group shadow-[2px_2px_0px_#111111]">
                              <img src={imgUrl} alt={`Galería ${idx + 1}`} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                                <div className="flex justify-end">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveGalleryImage(idx)}
                                    className="bg-red-600 hover:bg-red-700 text-white rounded-md p-1 shadow-sm transition-colors cursor-pointer"
                                    title="Quitar foto"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleSetAsCover(idx)}
                                  className="w-full bg-[#2860F5] hover:bg-white hover:text-[#111111] text-white text-[10px] font-headline font-bold uppercase py-1 px-1 rounded-md transition-colors cursor-pointer text-center"
                                  title="Convertir en foto principal"
                                >
                                  Portada
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* VÍDEO TOUR (OPCIONAL) */}
                    <div className="pt-4 border-t-2 border-slate-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-headline font-black uppercase text-[#111111] tracking-wider">
                          Vídeo Tour / Recorrido Virtual (Opcional)
                        </label>
                        <span className="text-xs font-medium text-slate-500">Solo si existe vídeo real</span>
                      </div>
                      <input
                        type="url"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        placeholder="https://www.youtube.com/embed/... o enlace de YouTube"
                        className="w-full bg-white border-2 border-[#111111] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#111111] outline-none focus:border-[#2860F5]"
                      />
                    </div>

                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("basicos")}
                      className="bg-slate-200 hover:bg-slate-300 text-[#111111] px-5 py-2.5 rounded-xl text-xs font-headline font-bold uppercase tracking-wider flex items-center gap-2 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                      <span>Volver a Básicos</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("descripcion")}
                      className="bg-[#2860F5] hover:bg-[#111111] text-white px-6 py-2.5 rounded-xl text-xs font-headline font-bold uppercase tracking-wider flex items-center gap-2 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all cursor-pointer"
                    >
                      <span>Siguiente: Descripción y Traducciones</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: DESCRIPCIÓN Y TRADUCCIONES */}
              {activeModalTab === "descripcion" && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Descripción en Español */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-headline font-black uppercase text-[#111111] tracking-wider">
                        Descripción Detallada (Español) *
                      </label>
                      <span className="text-xs font-medium text-slate-500">Texto principal de la ficha</span>
                    </div>
                    <textarea
                      rows={5}
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Escribe los detalles de la vivienda, distribución, acabados, orientación, vistas..."
                      className="w-full bg-[#FAF9FC] border-2 border-[#111111] rounded-xl px-4 py-3 text-sm font-sans font-medium text-[#111111] outline-none resize-none focus:border-[#2860F5] shadow-[2px_2px_0px_#111111]"
                    />
                  </div>

                  {/* Traducciones Catalán e Inglés */}
                  <div className="bg-[#FAF9FC] border-2 border-[#111111] rounded-2xl p-4 sm:p-5 shadow-[2px_2px_0px_#111111]">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#2860F5]" />
                          <span className="text-xs font-headline font-black uppercase tracking-wider text-[#111111]">
                            Traducciones Automáticas (Catalán e Inglés)
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                          Al guardar, el sistema traduce automáticamente en segundo plano. Puedes desplegar para afinar los textos si lo deseas.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 sm:self-center">
                        <button
                          type="button"
                          onClick={() => {
                            const finalLocation = locationInput.trim() || formData.location.trim() || "Centro";
                            const finalName = formData.name.trim() || `${formData.type} en ${finalLocation}`;
                            setFormData({
                              ...formData,
                              name_ca: autoTranslateText(finalName, "ca"),
                              name_en: autoTranslateText(finalName, "en"),
                              description_ca: autoTranslateText(formData.description, "ca"),
                              description_en: autoTranslateText(formData.description, "en")
                            });
                            setShowTranslations(true);
                          }}
                          className="bg-[#2860F5] hover:bg-[#111111] text-white text-xs font-headline font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-white" />
                          <span>Auto-traducir ahora</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowTranslations(!showTranslations)}
                          className="text-xs font-headline font-bold text-[#111111] hover:text-[#2860F5] bg-white border-2 border-[#111111] px-3.5 py-2.5 rounded-xl cursor-pointer shadow-[2px_2px_0px_#111111] transition-all"
                        >
                          {showTranslations ? "Ocultar ▲" : "Ver / Editar ▼"}
                        </button>
                      </div>
                    </div>

                    {showTranslations && (
                      <div className="pt-4 border-t-2 border-slate-200 space-y-4 animate-in fade-in duration-150">
                        {/* Catalan */}
                        <div className="bg-white border-2 border-[#111111] rounded-xl p-4 shadow-[2px_2px_0px_#111111]">
                          <span className="inline-block px-2.5 py-1 rounded-md bg-amber-100 text-black text-xs font-headline font-black uppercase tracking-wider mb-3 border border-amber-300">
                            Català (Traducció)
                          </span>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-headline font-bold text-[#111111] mb-1">Títol en Català:</label>
                              <input
                                type="text"
                                value={formData.name_ca}
                                onChange={(e) => setFormData({ ...formData, name_ca: e.target.value })}
                                placeholder={autoTranslateText(formData.name || `${formData.type} en ${formData.location}`, "ca")}
                                className="w-full bg-[#FAF9FC] border border-[#111111] rounded-lg px-3 py-2 text-xs font-bold text-[#111111] outline-none focus:border-[#2860F5]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-headline font-bold text-[#111111] mb-1">Descripció en Català:</label>
                              <textarea
                                rows={3}
                                value={formData.description_ca}
                                onChange={(e) => setFormData({ ...formData, description_ca: e.target.value })}
                                placeholder={autoTranslateText(formData.description, "ca")}
                                className="w-full bg-[#FAF9FC] border border-[#111111] rounded-lg px-3 py-2 text-xs font-medium text-[#111111] outline-none resize-none focus:border-[#2860F5]"
                              />
                            </div>
                          </div>
                        </div>

                        {/* English */}
                        <div className="bg-white border-2 border-[#111111] rounded-xl p-4 shadow-[2px_2px_0px_#111111]">
                          <span className="inline-block px-2.5 py-1 rounded-md bg-blue-100 text-blue-900 text-xs font-headline font-black uppercase tracking-wider mb-3 border border-blue-300">
                            English (Translation)
                          </span>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-headline font-bold text-[#111111] mb-1">Title in English:</label>
                              <input
                                type="text"
                                value={formData.name_en}
                                onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                                placeholder={autoTranslateText(formData.name || `${formData.type} en ${formData.location}`, "en")}
                                className="w-full bg-[#FAF9FC] border border-[#111111] rounded-lg px-3 py-2 text-xs font-bold text-[#111111] outline-none focus:border-[#2860F5]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-headline font-bold text-[#111111] mb-1">Description in English:</label>
                              <textarea
                                rows={3}
                                value={formData.description_en}
                                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                                placeholder={autoTranslateText(formData.description, "en")}
                                className="w-full bg-[#FAF9FC] border border-[#111111] rounded-lg px-3 py-2 text-xs font-medium text-[#111111] outline-none resize-none focus:border-[#2860F5]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Navigation Back */}
                  <div className="flex items-center justify-start pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("multimedia")}
                      className="bg-slate-200 hover:bg-slate-300 text-[#111111] px-5 py-2.5 rounded-xl text-xs font-headline font-bold uppercase tracking-wider flex items-center gap-2 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                      <span>Volver a Fotos y Vídeo</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons (Sticky Footer inside Modal) */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-slate-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-xl border-2 border-[#111111] text-xs font-headline font-bold uppercase tracking-wider text-[#111111] hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isUploadingImage}
                  className="bg-[#2860F5] hover:bg-[#111111] text-white px-8 py-3.5 rounded-xl text-xs sm:text-sm font-headline font-black uppercase tracking-wider transition-all border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Guardando y Sincronizando...</span>
                    </>
                  ) : (
                    <span>{editingProperty ? "Guardar y Confirmar Cambios" : "Guardar y Publicar Inmueble"}</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-[6px_6px_0px_#111111] border-2 border-[#111111] text-center animate-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-xl bg-red-100 border-2 border-red-500 text-red-600 flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_#111111]">
              <Trash2 className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-headline font-black text-[#111111]">¿Eliminar este inmueble?</h3>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-2">
              Esta acción eliminará el inmueble de la base de datos y desaparecerá del catálogo público inmediatamente.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-5 py-2.5 rounded-xl border-2 border-[#111111] text-xs font-headline font-bold text-[#111111] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-headline font-black px-6 py-2.5 rounded-xl uppercase tracking-wider transition-all border-2 border-[#111111] shadow-[2px_2px_0px_#111111] cursor-pointer"
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

