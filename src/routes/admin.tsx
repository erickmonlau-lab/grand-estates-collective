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
  HelpCircle,
  CopyPlus,
  Globe,
  Archive,
  RefreshCw,
  Clock,
  Briefcase,
  Car
} from "lucide-react";
import {
  fetchProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  duplicateProperty,
  subscribeProperties,
  type ExtendedProperty,
  SUPABASE_SETUP_SQL
} from "@/lib/propertyStore";
import { isSupabaseConfigured } from "@/lib/supabase";
import { type PropertyType } from "@/data/properties";
import { autoTranslateText } from "@/lib/translateProperty";
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

const PROPERTY_TYPES: PropertyType[] = [
  "Piso",
  "Apartamento",
  "Ático",
  "Local comercial",
  "Oficina",
  "Chalet",
  "Garaje"
];

// Helper para optimizar imágenes en cliente a WebP compacto
async function processImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // Validar formato y tamaño antes de procesar
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!validTypes.includes(file.type)) {
      return reject(new Error("Formato de imagen no soportado. Usa JPEG, PNG o WebP."));
    }
    if (file.size > 15 * 1024 * 1024) {
      return reject(new Error("La imagen supera los 15MB. Selecciona un archivo menor."));
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const maxDimension = 1400;
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
          reject(new Error("No se pudo obtener el contexto 2D del lienzo"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Generar WebP a 82% de calidad (excelente fidelidad, ~80-150KB)
        const webpDataUrl = canvas.toDataURL("image/webp", 0.82);
        resolve(webpDataUrl);
      };
      img.onerror = () => reject(new Error("Error al cargar la imagen seleccionada"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Error al leer el archivo"));
    reader.readAsDataURL(file);
  });
}

function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("gesgrama_admin_auth") === "true";
    }
    return false;
  });

  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const [properties, setProperties] = useState<ExtendedProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<"todos" | "compra" | "alquilar">("todos");
  const [filterStatus, setFilterStatus] = useState<"todos" | "disponible" | "reservado" | "vendido" | "alquilado">("todos");
  const [filterType, setFilterType] = useState<string>("todos");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<ExtendedProperty | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<"basicos" | "adaptativo" | "multimedia" | "descripcion" | "seo">("basicos");
  const [showTranslations, setShowTranslations] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Unified Form State (Single source of truth)
  const [formData, setFormData] = useState({
    name: "",
    name_ca: "",
    name_en: "",
    ref: "",
    slug: "",
    type: "Piso" as PropertyType,
    location: "Centro",
    city: DEFAULT_MUNICIPALITY,
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
    status: "disponible" as "disponible" | "reservado" | "vendido" | "alquilado",
    metaTitle: "",
    metaDescription: "",
    // Campos adaptativos
    facadeMeters: 0,
    smokeVent: false,
    streetAccess: false,
    officeRooms: 0,
    garageSpaces: 0
  });

  // Location Autocomplete / Custom input state
  const [locationInput, setLocationInput] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const [newFeatureInput, setNewFeatureInput] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [duplicateConfirmId, setDuplicateConfirmId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [saveErrorMessage, setSaveErrorMessage] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState<string | null>(null);
  const [showSqlGuide, setShowSqlGuide] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Drag and drop for gallery reordering
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Cargar y suscribirse a propiedades
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

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    const data = await fetchProperties();
    setProperties(data);
    setTimeout(() => setIsRefreshing(false), 400);
  };

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

  // Abrir Modal de Creación
  const handleOpenCreateModal = () => {
    setEditingProperty(null);
    setSaveErrorMessage(null);
    setSaveSuccessMessage(null);
    setHasUnsavedChanges(false);
    const randomRef = `API A${Math.floor(10000 + Math.random() * 90000)}`;
    setFormData({
      name: "",
      name_ca: "",
      name_en: "",
      ref: randomRef,
      slug: "",
      type: "Piso",
      location: "Centre",
      city: DEFAULT_MUNICIPALITY,
      price: 185000,
      priceFormatted: "185.000 €",
      operation: "comprar",
      bedrooms: 3,
      bathrooms: 1,
      surface: 75,
      floor: "2ª planta con ascensor",
      description: "Excelente oportunidad en el corazón de la ciudad. Espacios luminosos, distribución funcional y magníficas comunicaciones.",
      description_ca: "",
      description_en: "",
      features: "Ascensor, Balcón exterior, Calefacción, Cerca de Metro",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80"
      ],
      videoUrl: "",
      status: "disponible",
      metaTitle: "",
      metaDescription: "",
      facadeMeters: 0,
      smokeVent: false,
      streetAccess: false,
      officeRooms: 0,
      garageSpaces: 0
    });
    setLocationInput("Centre");
    setActiveModalTab("basicos");
    setNewFeatureInput("");
    setShowTranslations(false);
    setIsModalOpen(true);
  };

  // Abrir Modal de Edición
  const handleOpenEditModal = (p: ExtendedProperty) => {
    setEditingProperty(p);
    setSaveErrorMessage(null);
    setSaveSuccessMessage(null);
    setHasUnsavedChanges(false);
    const loc = p.location || "Centre";
    const isCommercial = p.type === "Local comercial" || p.type === "Oficina" || p.type === "Garaje";
    setFormData({
      name: p.name || `${p.type} en ${loc}`,
      name_ca: p.name_ca || "",
      name_en: p.name_en || "",
      ref: p.ref || "API A10750",
      slug: p.slug || "",
      type: (p.type as PropertyType) || "Piso",
      location: loc,
      city: p.city || DEFAULT_MUNICIPALITY,
      price: p.price,
      priceFormatted: p.priceFormatted || (p.operation === "alquilar" ? `${p.price} €/mes` : `${p.price.toLocaleString("es-ES")} €`),
      operation: p.operation || "comprar",
      bedrooms: p.bedrooms ?? (isCommercial ? 0 : 2),
      bathrooms: p.bathrooms ?? 1,
      surface: p.surface ?? 50,
      floor: p.floor || "",
      description: p.description || "",
      description_ca: p.description_ca || "",
      description_en: p.description_en || "",
      features: (p.features || []).join(", "),
      image: p.image || "",
      gallery: Array.isArray(p.gallery) ? p.gallery : [p.image],
      videoUrl: p.videoUrl || "",
      status: p.status || "disponible",
      metaTitle: p.metaTitle || "",
      metaDescription: p.metaDescription || "",
      facadeMeters: p.facadeMeters || 0,
      smokeVent: p.smokeVent || false,
      streetAccess: p.streetAccess || false,
      officeRooms: p.officeRooms || 0,
      garageSpaces: p.garageSpaces || 0
    });
    setLocationInput(loc);
    setActiveModalTab("basicos");
    setNewFeatureInput("");
    setShowTranslations(Boolean(p.name_ca || p.description_ca));
    setIsModalOpen(true);
  };

  // Gestión de Fotos
  const handleMainFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingImage(true);
      setUploadProgressText("Optimizando y validando fotografía principal...");
      const webpData = await processImageFile(file);
      setFormData((prev) => ({ ...prev, image: webpData }));
      setHasUnsavedChanges(true);
    } catch (err: any) {
      alert(err.message || "Error al procesar la imagen");
    } finally {
      setIsUploadingImage(false);
      setUploadProgressText(null);
    }
  };

  const handleGalleryFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      setIsUploadingImage(true);
      setUploadProgressText(`Optimizando ${files.length} fotografías para la galería...`);
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const webpData = await processImageFile(files[i]);
        newImages.push(webpData);
      }
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...newImages]
      }));
      setHasUnsavedChanges(true);
    } catch (err: any) {
      alert(err.message || "Error al procesar las imágenes");
    } finally {
      setIsUploadingImage(false);
      setUploadProgressText(null);
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, idx) => idx !== indexToRemove)
    }));
    setHasUnsavedChanges(true);
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
    setHasUnsavedChanges(true);
  };

  // Reordenar galería mediante Drag and Drop
  const handleDragStart = (idx: number) => {
    setDraggedIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, targetIdx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx) return;
    const updated = [...formData.gallery];
    const item = updated.splice(draggedIdx, 1)[0];
    updated.splice(targetIdx, 0, item);
    setDraggedIdx(targetIdx);
    setFormData((prev) => ({ ...prev, gallery: updated }));
    setHasUnsavedChanges(true);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
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
    setHasUnsavedChanges(true);
  };

  const handleRemoveFeature = (featureToRemove: string) => {
    const existing = formData.features
      ? formData.features.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    const filtered = existing.filter((f) => f !== featureToRemove);
    setFormData((prev) => ({ ...prev, features: filtered.join(", ") }));
    setHasUnsavedChanges(true);
  };

  // Zonas dinámicas por municipio
  const currentCity = formData.city || DEFAULT_MUNICIPALITY;
  const existingLocationsInCity = properties
    .filter((p) => (p.city || DEFAULT_MUNICIPALITY) === currentCity)
    .map((p) => p.location);
  const availableZones = getAvailableZonesForMunicipality(currentCity, existingLocationsInCity);

  const filteredZones = availableZones.filter((z) =>
    z.toLowerCase().includes(locationInput.toLowerCase())
  );

  // Auto-traducción con feedback
  const handleAutoTranslate = () => {
    const finalLocation = locationInput.trim() || formData.location.trim() || "Centro";
    const finalName = formData.name.trim() || `${formData.type} en ${finalLocation}`;
    const trNameCa = autoTranslateText(finalName, "ca");
    const trNameEn = autoTranslateText(finalName, "en");
    const trDescCa = autoTranslateText(formData.description, "ca");
    const trDescEn = autoTranslateText(formData.description, "en");

    setFormData((prev) => ({
      ...prev,
      name_ca: trNameCa,
      name_en: trNameEn,
      description_ca: trDescCa,
      description_en: trDescEn
    }));
    setShowTranslations(true);
    setHasUnsavedChanges(true);
  };

  // Guardado real con validación y confirmación atómica
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

      // Generar specs adaptativas según tipo
      let specsString = "";
      if (formData.type === "Local comercial") {
        specsString = `${formData.surface} m² · ${formData.bathrooms || 1} aseo · A pie de calle`;
      } else if (formData.type === "Oficina") {
        specsString = `${formData.surface} m² · ${formData.officeRooms || 2} despachos · ${formData.bathrooms || 1} aseo`;
      } else if (formData.type === "Garaje") {
        specsString = `${formData.surface} m² · ${formData.garageSpaces || 1} plaza · Acceso fácil`;
      } else {
        specsString = `${formData.bedrooms} hab. · ${formData.bathrooms} ${formData.bathrooms === 1 ? "baño" : "baños"} · ${formData.surface} m²`;
      }

      // Traducciones automáticas de respaldo si el usuario las dejó vacías
      const finalNameCa = formData.name_ca.trim() || autoTranslateText(finalName, "ca");
      const finalNameEn = formData.name_en.trim() || autoTranslateText(finalName, "en");
      const finalDescCa = formData.description_ca.trim() || autoTranslateText(formData.description, "ca");
      const finalDescEn = formData.description_en.trim() || autoTranslateText(formData.description, "en");

      const propertyData = {
        name: finalName,
        name_ca: finalNameCa,
        name_en: finalNameEn,
        ref: formData.ref || "API A10750",
        slug: formData.slug.trim() || undefined,
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
        status: formData.status,
        metaTitle: formData.metaTitle.trim() || undefined,
        metaDescription: formData.metaDescription.trim() || undefined,
        facadeMeters: formData.facadeMeters || undefined,
        smokeVent: formData.smokeVent || undefined,
        streetAccess: formData.streetAccess || undefined,
        officeRooms: formData.officeRooms || undefined,
        garageSpaces: formData.garageSpaces || undefined
      };

      if (editingProperty) {
        await updateProperty(editingProperty.id, propertyData);
      } else {
        await createProperty(propertyData);
      }

      setSaveSuccessMessage("¡Inmueble guardado y sincronizado con éxito en Supabase!");
      setHasUnsavedChanges(false);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSaving(false);
      }, 700);
    } catch (err: any) {
      console.error("Save error:", err);
      setSaveErrorMessage(err.message || "Error al conectar con Supabase. Revisa los permisos.");
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProperty(id);
      setDeleteConfirmId(null);
    } catch (err: any) {
      alert("Error al eliminar: " + err.message);
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const duplicated = await duplicateProperty(id);
      setDuplicateConfirmId(null);
      // Abrir modal inmediatamente para revisar la copia
      handleOpenEditModal(duplicated);
    } catch (err: any) {
      alert("Error al duplicar inmueble: " + err.message);
    }
  };

  const handleQuickStatusChange = async (id: string, newStatus: "disponible" | "reservado" | "vendido" | "alquilado") => {
    try {
      await updateProperty(id, { status: newStatus });
    } catch (err: any) {
      alert("Error al cambiar estado: " + err.message);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // Filtrado de Inmuebles
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

    const matchesType =
      filterType === "todos" ||
      p.type === filterType;

    return matchesSearch && matchesMode && matchesStatus && matchesType;
  });

  // Métricas del Dashboard (KPIs 100% reales procedentes de Supabase)
  const totalCount = properties.length;
  const ventaCount = properties.filter((p) => (p.operation || "compra") === "comprar" || (p.operation as string) === "compra").length;
  const alquilerCount = properties.filter((p) => p.operation === "alquilar").length;
  const reservadoCount = properties.filter((p) => p.status === "reservado").length;
  const vendidoCount = properties.filter((p) => p.status === "vendido").length;
  const alquiladoCount = properties.filter((p) => p.status === "alquilado").length;
  const sinFotosCount = properties.filter((p) => !p.image || p.image.includes("unsplash")).length;

  // 1. PANTALLA DE ACCESO (LOGIN)
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

  // 2. DASHBOARD PROFESIONAL (INTERFAZ SÓLIDA NEO-BRUTALIST DE SOFTWARE)
  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#111111] flex flex-col justify-between font-sans">
      
      {/* Cabecera Superior Fija */}
      <header className="bg-[#111111] text-white sticky top-0 z-30 border-b-2 border-[#111111] shadow-[0_2px_0px_#2860F5]">
        <div className="max-w-[1560px] w-[95%] mx-auto h-18 flex items-center justify-between">
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
            <button
              type="button"
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-wider text-white bg-[#222222] hover:bg-[#333333] border border-white/20 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-xs disabled:opacity-50"
              title="Refrescar datos desde Supabase"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#2860F5]" : ""}`} />
              <span className="hidden sm:inline">Sincronizar</span>
            </button>

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

      {/* Contenido Principal */}
      <main className="max-w-[1560px] w-[95%] mx-auto pt-8 pb-16 flex-1">
        
        {/* Banner de Estado de Base de Datos */}
        <div className="bg-white border-2 border-[#111111] rounded-2xl p-5 mb-8 shadow-[3px_3px_0px_#111111] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl border-2 border-[#111111] flex items-center justify-center shrink-0 ${
              isSupabaseConfigured ? "bg-emerald-500 text-white shadow-[2px_2px_0px_#111111]" : "bg-amber-400 text-black shadow-[2px_2px_0px_#111111]"
            }`}>
              <Database className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-base sm:text-lg font-headline font-black text-[#111111]">
                  {isSupabaseConfigured ? "Conectado a Base de Datos Supabase (Tiempo Real)" : "Modo Almacenamiento Local Reactivo Activo"}
                </h2>
                <span className={`text-[11px] font-headline font-black uppercase px-2.5 py-0.5 rounded-md border border-[#111111] ${
                  isSupabaseConfigured ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"
                }`}>
                  {isSupabaseConfigured ? "Nube Supabase" : "Navegador"}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans font-medium text-slate-600 mt-0.5">
                {isSupabaseConfigured
                  ? "Cualquier inmueble añadido o editado aquí se publica instantáneamente en la web pública con integridad referencial."
                  : "Los cambios persisten en el almacenamiento del navegador de forma segura e inmediata."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSqlGuide(!showSqlGuide)}
              className="text-xs font-headline font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-[#111111] px-4 py-2.5 rounded-xl border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>{showSqlGuide ? "Ocultar Guía SQL" : "Estructura SQL Supabase"}</span>
            </button>
          </div>
        </div>

        {/* Guía SQL Desplegable */}
        {showSqlGuide && (
          <div className="bg-[#111111] text-white p-6 rounded-2xl mb-8 shadow-[4px_4px_0px_#2860F5] border-2 border-[#111111] animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-headline font-black text-amber-400 font-mono">Esquema Canónico para la tabla properties</h3>
                <p className="text-xs text-slate-300 mt-0.5">Estructura auditada: translations, features empacadas, municipalidades y tipos comerciales.</p>
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

        {/* Rejilla de Indicadores (Dashboard KPIs) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
          <div
            onClick={() => { setFilterStatus("todos"); setFilterMode("todos"); }}
            className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111] cursor-pointer hover:-translate-y-0.5 transition-transform"
          >
            <span className="text-[12px] font-headline font-bold uppercase text-[#111111] tracking-wider block truncate">Total Inmuebles</span>
            <div className="text-2xl sm:text-3xl font-data-mono font-black text-[#111111] mt-1">{totalCount}</div>
          </div>

          <div
            onClick={() => setFilterMode("compra")}
            className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#2860F5] cursor-pointer hover:-translate-y-0.5 transition-transform"
          >
            <span className="text-[12px] font-headline font-bold uppercase text-[#2860F5] tracking-wider block truncate">En Venta</span>
            <div className="text-2xl sm:text-3xl font-data-mono font-black text-[#2860F5] mt-1">{ventaCount}</div>
          </div>

          <div
            onClick={() => setFilterMode("alquilar")}
            className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111] cursor-pointer hover:-translate-y-0.5 transition-transform"
          >
            <span className="text-[12px] font-headline font-bold uppercase text-emerald-700 tracking-wider block truncate">En Alquiler</span>
            <div className="text-2xl sm:text-3xl font-data-mono font-black text-emerald-700 mt-1">{alquilerCount}</div>
          </div>

          <div
            onClick={() => setFilterStatus("reservado")}
            className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111] cursor-pointer hover:-translate-y-0.5 transition-transform"
          >
            <span className="text-[12px] font-headline font-bold uppercase text-amber-700 tracking-wider block truncate">Reservados</span>
            <div className="text-2xl sm:text-3xl font-data-mono font-black text-amber-600 mt-1">{reservadoCount}</div>
          </div>

          <div
            onClick={() => setFilterStatus("vendido")}
            className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111] cursor-pointer hover:-translate-y-0.5 transition-transform"
          >
            <span className="text-[12px] font-headline font-bold uppercase text-rose-700 tracking-wider block truncate">Vendidos</span>
            <div className="text-2xl sm:text-3xl font-data-mono font-black text-rose-600 mt-1">{vendidoCount}</div>
          </div>

          <div
            onClick={() => setFilterStatus("alquilado")}
            className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111] cursor-pointer hover:-translate-y-0.5 transition-transform"
          >
            <span className="text-[12px] font-headline font-bold uppercase text-indigo-700 tracking-wider block truncate">Alquilados</span>
            <div className="text-2xl sm:text-3xl font-data-mono font-black text-indigo-600 mt-1">{alquiladoCount}</div>
          </div>
        </div>

        {/* Barra de Filtros, Búsqueda y Creación */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111] mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Cuadro de Búsqueda */}
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

          {/* Selectores de Filtro */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Tipo de Inmueble */}
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="appearance-none bg-[#FAF9FC] border-2 border-[#111111] rounded-xl pl-4 pr-10 py-3 text-xs sm:text-sm font-headline font-bold text-[#111111] outline-none cursor-pointer hover:border-[#2860F5] transition-colors"
              >
                <option value="todos">Todos los Tipos</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#111111] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
            </div>

            {/* Operación */}
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

            {/* Estado */}
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

            {/* Botón Añadir Inmueble */}
            <button
              onClick={handleOpenCreateModal}
              className="bg-[#2860F5] hover:bg-[#111111] text-white font-headline font-black text-sm px-6 py-3 rounded-xl flex items-center gap-2 border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>Añadir Inmueble</span>
            </button>
          </div>
        </div>

        {/* Tarjetas de Inmuebles */}
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
              const isCommercial = type === "Local comercial" || type === "Oficina" || type === "Garaje";

              return (
                <div
                  key={p.id}
                  onClick={() => handleOpenEditModal(p)}
                  className="group bg-white rounded-2xl flex flex-col h-full border-2 border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#2860F5] hover:border-[#2860F5] transition-all duration-200 overflow-hidden cursor-pointer select-none"
                >
                  {/* Foto de Portada + Badges */}
                  <div className="relative h-[210px] sm:h-[230px] w-full overflow-hidden bg-slate-100 border-b-2 border-[#111111]">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Operación y Tipo */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 z-20">
                      <span className="inline-flex items-center gap-1.5 bg-[#111111] text-white text-[11px] font-headline font-black uppercase tracking-wider px-2.5 py-1 border border-white">
                        <span className={`w-2 h-2 ${isRent ? "bg-amber-400" : "bg-[#2860F5]"}`} />
                        <span>{isRent ? "Alquiler" : "Venta"}</span>
                      </span>
                      <span className="inline-flex items-center bg-[#2860F5] text-white text-[11px] font-headline font-black uppercase tracking-wider px-2.5 py-1 border border-white">
                        {type}
                      </span>
                    </div>

                    {/* Estado Comercial */}
                    {p.status && p.status !== "disponible" && (
                      <div className="absolute top-3 right-3 z-20">
                        <span className={`inline-flex items-center text-[11px] font-headline font-black uppercase tracking-wider px-2.5 py-1 border border-[#111111] shadow-[2px_2px_0px_#111111] ${
                          p.status === "reservado"
                            ? "bg-amber-400 text-black"
                            : p.status === "vendido"
                            ? "bg-rose-600 text-white"
                            : "bg-indigo-600 text-white"
                        }`}>
                          {p.status}
                        </span>
                      </div>
                    )}

                    {/* Referencia */}
                    <div className="absolute bottom-2.5 left-3 z-20">
                      <span className="inline-flex items-center text-[11px] font-data-mono font-black text-white bg-[#111111] px-2 py-0.5 border border-white">
                        Ref: {p.ref || "PJ2024"}
                      </span>
                    </div>
                  </div>

                  {/* Contenido de la Tarjeta */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Ubicación: Municipio y Barrio */}
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

                      {/* Título Principal */}
                      <h3 className="text-[17px] sm:text-[18px] font-headline font-extrabold text-[#111111] mb-3 leading-snug group-hover:text-[#2860F5] transition-colors line-clamp-1">
                        {p.name}
                      </h3>

                      {/* Micro-bloques adaptativos según tipo */}
                      <div className="grid grid-cols-3 gap-2 pt-1 pb-2">
                        {type === "Local comercial" ? (
                          <>
                            <div className="bg-white border-2 border-[#111111] rounded-xl p-2 text-center shadow-[1px_1px_0px_#111111]">
                              <span className="block text-[10px] font-headline font-bold text-slate-500 uppercase">SUPERFICIE</span>
                              <span className="block text-sm font-data-mono font-black text-[#111111]">{p.surface} m²</span>
                            </div>
                            <div className="bg-white border-2 border-[#111111] rounded-xl p-2 text-center shadow-[1px_1px_0px_#111111]">
                              <span className="block text-[10px] font-headline font-bold text-slate-500 uppercase">ASEOS</span>
                              <span className="block text-sm font-data-mono font-black text-[#111111]">{p.bathrooms || 1}</span>
                            </div>
                            <div className="bg-white border-2 border-[#111111] rounded-xl p-2 text-center shadow-[1px_1px_0px_#111111]">
                              <span className="block text-[10px] font-headline font-bold text-slate-500 uppercase">UBICACIÓN</span>
                              <span className="block text-sm font-headline font-black text-[#111111] truncate">Pie Calle</span>
                            </div>
                          </>
                        ) : type === "Oficina" ? (
                          <>
                            <div className="bg-white border-2 border-[#111111] rounded-xl p-2 text-center shadow-[1px_1px_0px_#111111]">
                              <span className="block text-[10px] font-headline font-bold text-slate-500 uppercase">SUPERFICIE</span>
                              <span className="block text-sm font-data-mono font-black text-[#111111]">{p.surface} m²</span>
                            </div>
                            <div className="bg-white border-2 border-[#111111] rounded-xl p-2 text-center shadow-[1px_1px_0px_#111111]">
                              <span className="block text-[10px] font-headline font-bold text-slate-500 uppercase">DESPACHOS</span>
                              <span className="block text-sm font-data-mono font-black text-[#111111]">{p.officeRooms || 2}</span>
                            </div>
                            <div className="bg-white border-2 border-[#111111] rounded-xl p-2 text-center shadow-[1px_1px_0px_#111111]">
                              <span className="block text-[10px] font-headline font-bold text-slate-500 uppercase">ASEOS</span>
                              <span className="block text-sm font-data-mono font-black text-[#111111]">{p.bathrooms || 1}</span>
                            </div>
                          </>
                        ) : type === "Garaje" ? (
                          <>
                            <div className="bg-white border-2 border-[#111111] rounded-xl p-2 text-center shadow-[1px_1px_0px_#111111]">
                              <span className="block text-[10px] font-headline font-bold text-slate-500 uppercase">SUPERFICIE</span>
                              <span className="block text-sm font-data-mono font-black text-[#111111]">{p.surface} m²</span>
                            </div>
                            <div className="bg-white border-2 border-[#111111] rounded-xl p-2 text-center shadow-[1px_1px_0px_#111111]">
                              <span className="block text-[10px] font-headline font-bold text-slate-500 uppercase">PLAZAS</span>
                              <span className="block text-sm font-data-mono font-black text-[#111111]">{p.garageSpaces || 1}</span>
                            </div>
                            <div className="bg-white border-2 border-[#111111] rounded-xl p-2 text-center shadow-[1px_1px_0px_#111111]">
                              <span className="block text-[10px] font-headline font-bold text-slate-500 uppercase">ACCESO</span>
                              <span className="block text-sm font-headline font-black text-[#111111] truncate">Automático</span>
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

                    {/* Fila de Precio y Acciones */}
                    <div>
                      <div className="pt-3 mt-2 border-t-2 border-[#111111] flex items-end justify-between gap-3">
                        <div className="flex flex-col min-w-0">
                          <span className="text-[11px] font-headline font-bold uppercase tracking-wider text-slate-600">
                            {isRent ? "PRECIO ALQUILER" : "PRECIO VENTA"}
                          </span>
                          <div className="flex items-baseline whitespace-nowrap">
                            <span className="text-xl sm:text-2xl font-data-mono font-black text-[#111111] leading-none">
                              {new Intl.NumberFormat("es-ES").format(p.price)}&nbsp;€
                            </span>
                            {isRent && (
                              <span className="text-[12px] font-bold text-slate-500 ml-1">/mes</span>
                            )}
                          </div>
                        </div>

                        {/* Botón Editar */}
                        <div className="shrink-0 inline-flex items-center gap-1.5 bg-[#2860F5] group-hover:bg-[#111111] text-white text-[12px] font-headline font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all shadow-[2px_2px_0px_#111111] border border-[#111111]">
                          <span>Editar</span>
                          <Edit className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Controles de Administración (Selector Rápido de Estado + Duplicar + Ver + Borrar) */}
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between gap-2"
                      >
                        {/* Selector de Estado Rápido */}
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
                          {/* Botón Duplicar Inmueble */}
                          <button
                            type="button"
                            onClick={() => setDuplicateConfirmId(p.id)}
                            className="p-1.5 text-slate-700 hover:text-[#2860F5] hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-300 cursor-pointer"
                            title="Duplicar inmueble (crear copia)"
                          >
                            <CopyPlus className="w-4 h-4 stroke-[2.5]" />
                          </button>

                          {/* Ver Ficha Pública */}
                          <Link
                            to="/inmobiliaria/$slug"
                            params={{ slug: p.slug }}
                            target="_blank"
                            className="p-1.5 text-slate-700 hover:text-[#2860F5] hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-300"
                            title="Ver ficha pública en nueva pestaña"
                          >
                            <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                          </Link>

                          {/* Eliminar Inmueble */}
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

      {/* Pie de Página Oficial del Panel */}
      <footer className="bg-[#111111] text-white border-t-2 border-[#111111] w-full">
        <div className="max-w-[1560px] w-[95%] mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold">Gesgrama Inmobiliaria & Fincas</span>
            <span>·</span>
            <span>Gestor Integral de Inmuebles</span>
          </div>
          <div>
            <span>© 2026 Gesgrama · Todos los derechos reservados</span>
          </div>
        </div>
      </footer>

      {/* MODAL DEFINITIVO DE EDICIÓN Y CREACIÓN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-5xl shadow-[6px_6px_0px_#111111] border-2 border-[#111111] overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]">
            
            {/* Cabecera del Modal Fija */}
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
                    Gestión centralizada: datos técnicos, multimedia, traducciones multi-idioma y SEO.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (hasUnsavedChanges) {
                    if (confirm("Hay cambios sin guardar. ¿Deseas salir igualmente?")) {
                      setIsModalOpen(false);
                    }
                  } else {
                    setIsModalOpen(false);
                  }
                }}
                className="text-white hover:bg-white/20 p-2 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-white/30"
              >
                <X className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            {/* Pestañas del Modal (5 Pestañas Especializadas) */}
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
                <span>1. Datos Principales</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab("adaptativo")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-headline font-bold uppercase tracking-wider transition-all border-t-2 border-x-2 cursor-pointer whitespace-nowrap ${
                  activeModalTab === "adaptativo"
                    ? "bg-white text-[#2860F5] border-[#111111] shadow-xs -mb-[2px] pb-[12px]"
                    : "text-slate-600 hover:text-[#111111] border-transparent hover:bg-slate-200"
                }`}
              >
                {formData.type === "Local comercial" ? (
                  <Store className="w-4 h-4 stroke-[2.5]" />
                ) : formData.type === "Oficina" ? (
                  <Briefcase className="w-4 h-4 stroke-[2.5]" />
                ) : formData.type === "Garaje" ? (
                  <Car className="w-4 h-4 stroke-[2.5]" />
                ) : (
                  <Home className="w-4 h-4 stroke-[2.5]" />
                )}
                <span>2. Ficha Técnica ({formData.type})</span>
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
                <span>3. Multimedia ({formData.gallery.length + (formData.image ? 1 : 0)})</span>
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
                <span>4. Textos y Traducciones</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab("seo")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-headline font-bold uppercase tracking-wider transition-all border-t-2 border-x-2 cursor-pointer whitespace-nowrap ${
                  activeModalTab === "seo"
                    ? "bg-white text-[#2860F5] border-[#111111] shadow-xs -mb-[2px] pb-[12px]"
                    : "text-slate-600 hover:text-[#111111] border-transparent hover:bg-slate-200"
                }`}
              >
                <Globe className="w-4 h-4 stroke-[2.5]" />
                <span>5. SEO y Enlace</span>
              </button>
            </div>

            {/* Formulario Principal con Scroll Único */}
            <form onSubmit={handleSaveProperty} className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1">
              
              {/* Mensajes de feedback */}
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

              {/* PESTAÑA 1: DATOS PRINCIPALES */}
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
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        setHasUnsavedChanges(true);
                      }}
                      placeholder={`ej: ${formData.type} en ${formData.location}`}
                      className="w-full bg-[#FAF9FC] border-2 border-[#111111] rounded-xl px-4 py-3 text-sm font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                    />
                  </div>

                  {/* Fila: Tipo, Operación, Referencia y Estado Comercial */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {/* Tipo de Inmueble */}
                    <div>
                      <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                        Tipo de Inmueble *
                      </label>
                      <div className="relative">
                        <select
                          value={formData.type}
                          onChange={(e: any) => {
                            const newType = e.target.value as PropertyType;
                            setFormData((prev) => ({
                              ...prev,
                              type: newType,
                              // Ajustar dormitorios a 0 si no es residencial
                              bedrooms: (newType === "Local comercial" || newType === "Oficina" || newType === "Garaje") ? 0 : (prev.bedrooms || 2)
                            }));
                            setHasUnsavedChanges(true);
                          }}
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
                          onChange={(e: any) => {
                            setFormData({ ...formData, operation: e.target.value });
                            setHasUnsavedChanges(true);
                          }}
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
                        onChange={(e) => {
                          setFormData({ ...formData, ref: e.target.value });
                          setHasUnsavedChanges(true);
                        }}
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
                          onChange={(e: any) => {
                            setFormData({ ...formData, status: e.target.value });
                            setHasUnsavedChanges(true);
                          }}
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

                  {/* Municipio y Barrio Independientes */}
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
                            setHasUnsavedChanges(true);
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
                        Cobertura Gesgrama: Santa Coloma, Barcelona, Badalona, etc.
                      </span>
                    </div>

                    {/* Campo 2: BARRIO / ZONA */}
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
                            setHasUnsavedChanges(true);
                          }}
                          onFocus={() => setShowLocationDropdown(true)}
                          placeholder="Escribe o selecciona un barrio..."
                          className="w-full bg-white border-2 border-[#111111] rounded-xl pl-3.5 pr-9 py-3 text-sm font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                        />
                        <MapPin className="w-4 h-4 text-[#2860F5] absolute right-3 top-1/2 -translate-y-1/2 stroke-[2.5]" />
                      </div>

                      {/* Dropdown de Zonas */}
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
                                setHasUnsavedChanges(true);
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

                          {locationInput.trim() && !availableZones.some(z => z.toLowerCase() === locationInput.trim().toLowerCase()) && (
                            <button
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, location: locationInput.trim() }));
                                setShowLocationDropdown(false);
                                setHasUnsavedChanges(true);
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
                        Permite registrar cualquier nueva zona permanentemente.
                      </span>
                    </div>

                  </div>

                  {/* Fila: Precio y Superficie */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
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
                          setHasUnsavedChanges(true);
                        }}
                        className="w-full bg-[#FAF9FC] border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-data-mono font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                        Superficie Total (m²) *
                      </label>
                      <input
                        type="number"
                        required
                        min={1}
                        value={formData.surface}
                        onChange={(e) => {
                          setFormData({ ...formData, surface: Number(e.target.value) });
                          setHasUnsavedChanges(true);
                        }}
                        className="w-full bg-[#FAF9FC] border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-data-mono font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                      />
                    </div>
                  </div>

                  {/* Botón Siguiente */}
                  <div className="flex justify-end pt-3">
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("adaptativo")}
                      className="bg-[#2860F5] hover:bg-[#111111] text-white px-6 py-3 rounded-xl text-xs font-headline font-bold uppercase tracking-wider flex items-center gap-2 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all cursor-pointer"
                    >
                      <span>Siguiente: Ficha Técnica ({formData.type})</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              )}

              {/* PESTAÑA 2: FICHA TÉCNICA ADAPTATIVA SEGÚN TIPO */}
              {activeModalTab === "adaptativo" && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  
                  {/* Selector y Resumen de Categoría */}
                  <div className="bg-[#FAF9FC] border-2 border-[#111111] rounded-2xl p-5 shadow-[2px_2px_0px_#111111]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#2860F5] text-white border border-[#111111] flex items-center justify-center shrink-0">
                        {formData.type === "Local comercial" ? <Store className="w-5 h-5 stroke-[2.5]" /> :
                         formData.type === "Oficina" ? <Briefcase className="w-5 h-5 stroke-[2.5]" /> :
                         formData.type === "Garaje" ? <Car className="w-5 h-5 stroke-[2.5]" /> :
                         <Home className="w-5 h-5 stroke-[2.5]" />}
                      </div>
                      <div>
                        <h4 className="text-base font-headline font-black text-[#111111]">
                          Formulario Adaptado a: {formData.type}
                        </h4>
                        <p className="text-xs text-slate-600 font-medium">
                          {formData.type === "Local comercial" && "Parámetros comerciales: escaparate, salida de humos, acceso y fachada."}
                          {formData.type === "Oficina" && "Configuración corporativa: despachos, aseos, planta y equipamiento profesional."}
                          {formData.type === "Garaje" && "Datos de acceso rodado, plazas de aparcamiento y maniobrabilidad."}
                          {(formData.type === "Piso" || formData.type === "Apartamento" || formData.type === "Ático" || formData.type === "Chalet") && "Parámetros residenciales: habitaciones, baños, planta y ascensor."}
                        </p>
                      </div>
                    </div>

                    {/* CAMPOS RESIDENCIALES: Pisos, Áticos, Chalets */}
                    {(formData.type === "Piso" || formData.type === "Apartamento" || formData.type === "Ático" || formData.type === "Chalet") && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                            Habitaciones *
                          </label>
                          <input
                            type="number"
                            min={1}
                            value={formData.bedrooms}
                            onChange={(e) => {
                              setFormData({ ...formData, bedrooms: Number(e.target.value) });
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full bg-white border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-data-mono font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                            Baños Completos *
                          </label>
                          <input
                            type="number"
                            min={1}
                            value={formData.bathrooms}
                            onChange={(e) => {
                              setFormData({ ...formData, bathrooms: Number(e.target.value) });
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full bg-white border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-data-mono font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                            Planta y Ascensor
                          </label>
                          <input
                            type="text"
                            value={formData.floor}
                            onChange={(e) => {
                              setFormData({ ...formData, floor: e.target.value });
                              setHasUnsavedChanges(true);
                            }}
                            placeholder="ej: 3ª con ascensor"
                            className="w-full bg-white border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                          />
                        </div>
                      </div>
                    )}

                    {/* CAMPOS COMERCIALES: Locales */}
                    {formData.type === "Local comercial" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                              Aseos / Baños *
                            </label>
                            <input
                              type="number"
                              min={1}
                              value={formData.bathrooms}
                              onChange={(e) => {
                                setFormData({ ...formData, bathrooms: Number(e.target.value) });
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full bg-white border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-data-mono font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                              Metros Lineales de Fachada
                            </label>
                            <input
                              type="number"
                              value={formData.facadeMeters || ""}
                              onChange={(e) => {
                                setFormData({ ...formData, facadeMeters: Number(e.target.value) });
                                setHasUnsavedChanges(true);
                              }}
                              placeholder="ej: 6 metros"
                              className="w-full bg-white border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-data-mono font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                              Ubicación / Nivel
                            </label>
                            <input
                              type="text"
                              value={formData.floor || "A pie de calle"}
                              onChange={(e) => {
                                setFormData({ ...formData, floor: e.target.value });
                                setHasUnsavedChanges(true);
                              }}
                              placeholder="A pie de calle"
                              className="w-full bg-white border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                            />
                          </div>
                        </div>

                        {/* Toggles Comerciales */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <label className="flex items-center gap-3 bg-white p-3.5 rounded-xl border-2 border-[#111111] cursor-pointer shadow-xs">
                            <input
                              type="checkbox"
                              checked={formData.smokeVent}
                              onChange={(e) => {
                                setFormData({ ...formData, smokeVent: e.target.checked });
                                setHasUnsavedChanges(true);
                              }}
                              className="w-5 h-5 text-[#2860F5] rounded border-2 border-[#111111]"
                            />
                            <div>
                              <span className="block text-xs font-headline font-bold text-[#111111] uppercase">Salida de Humos Certificada</span>
                              <span className="block text-[11px] text-slate-500 font-sans">Apto para restauración y hostelería</span>
                            </div>
                          </label>

                          <label className="flex items-center gap-3 bg-white p-3.5 rounded-xl border-2 border-[#111111] cursor-pointer shadow-xs">
                            <input
                              type="checkbox"
                              checked={formData.streetAccess}
                              onChange={(e) => {
                                setFormData({ ...formData, streetAccess: e.target.checked });
                                setHasUnsavedChanges(true);
                              }}
                              className="w-5 h-5 text-[#2860F5] rounded border-2 border-[#111111]"
                            />
                            <div>
                              <span className="block text-xs font-headline font-bold text-[#111111] uppercase">Acceso Adaptado (PMR)</span>
                              <span className="block text-[11px] text-slate-500 font-sans">Sin barreras arquitectónicas</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* CAMPOS CORPORATIVOS: Oficinas */}
                    {formData.type === "Oficina" && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                            Despachos / Salas
                          </label>
                          <input
                            type="number"
                            min={1}
                            value={formData.officeRooms || 2}
                            onChange={(e) => {
                              setFormData({ ...formData, officeRooms: Number(e.target.value) });
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full bg-white border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-data-mono font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                            Aseos
                          </label>
                          <input
                            type="number"
                            min={1}
                            value={formData.bathrooms}
                            onChange={(e) => {
                              setFormData({ ...formData, bathrooms: Number(e.target.value) });
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full bg-white border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-data-mono font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                            Planta en Edificio
                          </label>
                          <input
                            type="text"
                            value={formData.floor}
                            onChange={(e) => {
                              setFormData({ ...formData, floor: e.target.value });
                              setHasUnsavedChanges(true);
                            }}
                            placeholder="Planta 2ª con ascensor"
                            className="w-full bg-white border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                          />
                        </div>
                      </div>
                    )}

                    {/* CAMPOS GARAJES */}
                    {formData.type === "Garaje" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                            Número de Plazas
                          </label>
                          <input
                            type="number"
                            min={1}
                            value={formData.garageSpaces || 1}
                            onChange={(e) => {
                              setFormData({ ...formData, garageSpaces: Number(e.target.value) });
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full bg-white border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-data-mono font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                            Tipo de Acceso
                          </label>
                          <input
                            type="text"
                            value={formData.floor || "Rampa con puerta automática"}
                            onChange={(e) => {
                              setFormData({ ...formData, floor: e.target.value });
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full bg-white border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-bold text-[#111111] focus:border-[#2860F5] outline-none shadow-[2px_2px_0px_#111111]"
                          />
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Bloque de Equipamiento y Características */}
                  <div>
                    <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                      Equipamiento y Características Especiales
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
                        placeholder="Escribe y pulsa Enter (ej. Terraza, Escaparate, Calefacción...)"
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

                    {/* Chips de Características */}
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
                          No hay características añadidas aún. Usa las sugerencias de abajo o escribe arriba.
                        </p>
                      )}

                      {/* Sugerencias Rápidas según Tipo */}
                      <div className="mt-3 pt-2.5 border-t border-slate-200 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-1">Sugerencias:</span>
                        {(formData.type === "Local comercial"
                          ? ["Escaparate 6m", "Salida de humos", "Persiana motorizada", "A pie de calle", "Aseo adaptado", "Aire Acondicionado"]
                          : formData.type === "Oficina"
                          ? ["Despachos acristalados", "Cableado de red", "Climatización central", "Falso techo", "Conserjería"]
                          : ["Ascensor", "Terraza", "Balcón", "Parking", "Calefacción", "Exterior", "Vistas despejadas"]
                        ).map((sug) => {
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

                  {/* Navegación entre Pestañas */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("basicos")}
                      className="bg-slate-200 hover:bg-slate-300 text-[#111111] px-5 py-2.5 rounded-xl text-xs font-headline font-bold uppercase tracking-wider flex items-center gap-2 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                      <span>Volver a Principales</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("multimedia")}
                      className="bg-[#2860F5] hover:bg-[#111111] text-white px-6 py-2.5 rounded-xl text-xs font-headline font-bold uppercase tracking-wider flex items-center gap-2 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all cursor-pointer"
                    >
                      <span>Siguiente: Multimedia</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>

                </div>
              )}

              {/* PESTAÑA 3: MULTIMEDIA (FOTOS Y VÍDEO) */}
              {activeModalTab === "multimedia" && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="bg-[#FAF9FC] border-2 border-[#111111] rounded-2xl p-5 space-y-5 shadow-[2px_2px_0px_#111111]">
                    
                    {/* FOTO PRINCIPAL / PORTADA */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-headline font-black uppercase text-[#111111] tracking-wider">
                          Foto Principal (Portada del Inmueble) *
                        </label>
                        <span className="text-xs font-bold text-slate-500">Visible en catálogo y cabecera de ficha</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        {/* Vista previa de Portada */}
                        <div className="sm:col-span-4 aspect-[16/10] bg-white rounded-xl border-2 border-[#111111] overflow-hidden relative group flex items-center justify-center shadow-[2px_2px_0px_#111111]">
                          {formData.image ? (
                            <>
                              <img src={formData.image} alt="Portada" className="w-full h-full object-cover" />
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
                              <span className="text-xs font-bold block text-slate-600">Sin foto de portada</span>
                            </div>
                          )}
                        </div>

                        {/* Controles de Subida */}
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
                            <span className="text-[11px] font-bold uppercase text-slate-600 block mb-1">O pegar URL externa directa:</span>
                            <input
                              type="url"
                              value={formData.image}
                              onChange={(e) => {
                                setFormData({ ...formData, image: e.target.value });
                                setHasUnsavedChanges(true);
                              }}
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
                          Galería de Fotos Adicionales (Arrastrar para Reordenar)
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
                                  setHasUnsavedChanges(true);
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
                                setHasUnsavedChanges(true);
                              }
                            }}
                            className="bg-[#2860F5] hover:bg-[#111111] text-white text-xs font-headline font-bold uppercase tracking-wider px-4 py-2 rounded-xl cursor-pointer border-2 border-[#111111] shadow-[1px_1px_0px_#111111] transition-all"
                          >
                            Añadir URL
                          </button>
                        </div>
                      </div>

                      {uploadProgressText && (
                        <div className="text-xs font-bold text-[#2860F5] bg-blue-50 p-2.5 rounded-xl border border-blue-200 mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 animate-spin text-[#2860F5]" />
                          <span>{uploadProgressText}</span>
                        </div>
                      )}

                      {/* Miniaturas de la Galería con Drag & Drop */}
                      {formData.gallery.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 pt-2">
                          {formData.gallery.map((imgUrl, idx) => (
                            <div
                              key={idx}
                              draggable
                              onDragStart={() => handleDragStart(idx)}
                              onDragOver={(e) => handleDragOver(e, idx)}
                              onDragEnd={handleDragEnd}
                              className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#111111] bg-white group shadow-[2px_2px_0px_#111111] cursor-grab active:cursor-grabbing ${
                                draggedIdx === idx ? "opacity-40 border-dashed" : "opacity-100"
                              }`}
                              title="Arrastra para reordenar esta imagen"
                            >
                              <img src={imgUrl} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                              <div className="absolute top-1 left-1 bg-[#111111]/80 text-white text-[10px] font-data-mono font-bold px-1.5 py-0.5 rounded">
                                #{idx + 1}
                              </div>
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
                                  title="Convertir en foto de portada"
                                >
                                  Hacer Portada
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Vídeo Tour */}
                    <div className="pt-4 border-t-2 border-slate-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-headline font-black uppercase text-[#111111] tracking-wider">
                          Vídeo Tour / Recorrido Virtual (Opcional)
                        </label>
                        <span className="text-xs font-medium text-slate-500">YouTube, Vimeo o Matterport</span>
                      </div>
                      <input
                        type="url"
                        value={formData.videoUrl}
                        onChange={(e) => {
                          setFormData({ ...formData, videoUrl: e.target.value });
                          setHasUnsavedChanges(true);
                        }}
                        placeholder="https://www.youtube.com/watch?v=... o enlace de vídeo"
                        className="w-full bg-white border-2 border-[#111111] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#111111] outline-none focus:border-[#2860F5]"
                      />
                    </div>

                  </div>

                  {/* Botones de Navegación */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("adaptativo")}
                      className="bg-slate-200 hover:bg-slate-300 text-[#111111] px-5 py-2.5 rounded-xl text-xs font-headline font-bold uppercase tracking-wider flex items-center gap-2 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                      <span>Volver a Ficha Técnica</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("descripcion")}
                      className="bg-[#2860F5] hover:bg-[#111111] text-white px-6 py-2.5 rounded-xl text-xs font-headline font-bold uppercase tracking-wider flex items-center gap-2 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all cursor-pointer"
                    >
                      <span>Siguiente: Textos y Traducciones</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              )}

              {/* PESTAÑA 4: DESCRIPCIONES Y TRADUCCIONES */}
              {activeModalTab === "descripcion" && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  
                  {/* Descripción en Español */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-headline font-black uppercase text-[#111111] tracking-wider">
                        Descripción Principal del Inmueble (Español) *
                      </label>
                      <span className="text-xs font-medium text-slate-500">Texto base para las fichas</span>
                    </div>
                    <textarea
                      rows={5}
                      required
                      value={formData.description}
                      onChange={(e) => {
                        setFormData({ ...formData, description: e.target.value });
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="Detalla la distribución, calidades, orientación, comodidades de la zona, servicios cercanos..."
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
                            Traducciones Profesionales (Català & English)
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                          Gesgrama atiende a clientes internacionales y locales en tres idiomas. Puedes autotraducir con un clic y afinar manualmente cada versión.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 sm:self-center">
                        <button
                          type="button"
                          onClick={handleAutoTranslate}
                          className="bg-[#2860F5] hover:bg-[#111111] text-white text-xs font-headline font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-white" />
                          <span>Autotraducir Ahora</span>
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
                        {/* Català */}
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
                                onChange={(e) => {
                                  setFormData({ ...formData, name_ca: e.target.value });
                                  setHasUnsavedChanges(true);
                                }}
                                placeholder={autoTranslateText(formData.name || `${formData.type} en ${formData.location}`, "ca")}
                                className="w-full bg-[#FAF9FC] border border-[#111111] rounded-lg px-3 py-2 text-xs font-bold text-[#111111] outline-none focus:border-[#2860F5]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-headline font-bold text-[#111111] mb-1">Descripció en Català:</label>
                              <textarea
                                rows={3}
                                value={formData.description_ca}
                                onChange={(e) => {
                                  setFormData({ ...formData, description_ca: e.target.value });
                                  setHasUnsavedChanges(true);
                                }}
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
                                onChange={(e) => {
                                  setFormData({ ...formData, name_en: e.target.value });
                                  setHasUnsavedChanges(true);
                                }}
                                placeholder={autoTranslateText(formData.name || `${formData.type} en ${formData.location}`, "en")}
                                className="w-full bg-[#FAF9FC] border border-[#111111] rounded-lg px-3 py-2 text-xs font-bold text-[#111111] outline-none focus:border-[#2860F5]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-headline font-bold text-[#111111] mb-1">Description in English:</label>
                              <textarea
                                rows={3}
                                value={formData.description_en}
                                onChange={(e) => {
                                  setFormData({ ...formData, description_en: e.target.value });
                                  setHasUnsavedChanges(true);
                                }}
                                placeholder={autoTranslateText(formData.description, "en")}
                                className="w-full bg-[#FAF9FC] border border-[#111111] rounded-lg px-3 py-2 text-xs font-medium text-[#111111] outline-none resize-none focus:border-[#2860F5]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Navegación entre Pestañas */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("multimedia")}
                      className="bg-slate-200 hover:bg-slate-300 text-[#111111] px-5 py-2.5 rounded-xl text-xs font-headline font-bold uppercase tracking-wider flex items-center gap-2 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                      <span>Volver a Multimedia</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("seo")}
                      className="bg-[#2860F5] hover:bg-[#111111] text-white px-6 py-2.5 rounded-xl text-xs font-headline font-bold uppercase tracking-wider flex items-center gap-2 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all cursor-pointer"
                    >
                      <span>Siguiente: SEO y Enlaces</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              )}

              {/* PESTAÑA 5: SEO Y GESTIÓN DE ENLACES */}
              {activeModalTab === "seo" && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="bg-[#FAF9FC] border-2 border-[#111111] rounded-2xl p-5 space-y-5 shadow-[2px_2px_0px_#111111]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Globe className="w-4 h-4 text-[#2860F5]" />
                        <label className="block text-xs font-headline font-black uppercase text-[#111111] tracking-wider">
                          Slug de la Ficha Pública (URL Amigable)
                        </label>
                      </div>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => {
                          setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "") });
                          setHasUnsavedChanges(true);
                        }}
                        placeholder="ej: piso-luminoso-santa-rosa (dejar vacío para auto-generar)"
                        className="w-full bg-white border-2 border-[#111111] rounded-xl px-3.5 py-3 text-xs font-data-mono font-bold text-[#111111] outline-none focus:border-[#2860F5]"
                      />
                      <span className="text-[11px] font-sans font-medium text-slate-500 mt-1 block">
                        URL pública resultante: <strong>/inmobiliaria/{formData.slug || "slug-automatico"}</strong>
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                        Meta Title Personalizado (SEO)
                      </label>
                      <input
                        type="text"
                        value={formData.metaTitle}
                        onChange={(e) => {
                          setFormData({ ...formData, metaTitle: e.target.value });
                          setHasUnsavedChanges(true);
                        }}
                        placeholder={`ej: ${formData.name || "Inmueble"} | Gesgrama Inmobiliaria`}
                        className="w-full bg-white border-2 border-[#111111] rounded-xl px-3.5 py-3 text-sm font-bold text-[#111111] outline-none focus:border-[#2860F5]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-headline font-black uppercase text-[#111111] mb-1.5 tracking-wider">
                        Meta Description (Google Snippet)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.metaDescription}
                        onChange={(e) => {
                          setFormData({ ...formData, metaDescription: e.target.value });
                          setHasUnsavedChanges(true);
                        }}
                        placeholder="Descripción optimizada para motores de búsqueda (máx. 160 caracteres)..."
                        className="w-full bg-white border-2 border-[#111111] rounded-xl px-3.5 py-3 text-xs font-sans font-medium text-[#111111] outline-none resize-none focus:border-[#2860F5]"
                      />
                    </div>
                  </div>

                  {/* Navegación Back */}
                  <div className="flex items-center justify-start pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("descripcion")}
                      className="bg-slate-200 hover:bg-slate-300 text-[#111111] px-5 py-2.5 rounded-xl text-xs font-headline font-bold uppercase tracking-wider flex items-center gap-2 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                      <span>Volver a Descripciones</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Botonera Inferior Fija del Modal */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t-2 border-slate-200 shrink-0">
                <div className="text-xs font-sans font-bold text-slate-500">
                  {hasUnsavedChanges && (
                    <span className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      Hay cambios pendientes de guardar
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (hasUnsavedChanges) {
                        if (confirm("Hay cambios sin guardar. ¿Deseas descartar y salir?")) {
                          setIsModalOpen(false);
                        }
                      } else {
                        setIsModalOpen(false);
                      }
                    }}
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
                        <span>Sincronizando con Supabase...</span>
                      </>
                    ) : (
                      <span>{editingProperty ? "Guardar y Confirmar Cambios" : "Guardar y Publicar Inmueble"}</span>
                    )}
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN DE DUPLICACIÓN */}
      {duplicateConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-[6px_6px_0px_#111111] border-2 border-[#111111] text-center animate-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-xl bg-blue-50 border-2 border-[#2860F5] text-[#2860F5] flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_#111111]">
              <CopyPlus className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-headline font-black text-[#111111]">¿Duplicar este inmueble?</h3>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-2">
              Se creará una copia idéntica con nueva referencia y slug propio para editarla rápidamente sin sobreescribir el original.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setDuplicateConfirmId(null)}
                className="px-5 py-2.5 rounded-xl border-2 border-[#111111] text-xs font-headline font-bold text-[#111111] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDuplicate(duplicateConfirmId)}
                className="bg-[#2860F5] hover:bg-[#111111] text-white text-xs font-headline font-black px-6 py-2.5 rounded-xl uppercase tracking-wider transition-all border-2 border-[#111111] shadow-[2px_2px_0px_#111111] cursor-pointer"
              >
                Sí, Duplicar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-[6px_6px_0px_#111111] border-2 border-[#111111] text-center animate-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-xl bg-red-100 border-2 border-red-500 text-red-600 flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_#111111]">
              <Trash2 className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-headline font-black text-[#111111]">¿Eliminar este inmueble?</h3>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-2">
              Esta acción eliminará el inmueble de la base de datos de Supabase y desaparecerá del catálogo público inmediatamente.
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

