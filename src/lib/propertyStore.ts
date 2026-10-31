import { properties as defaultProperties, type Property } from "@/data/properties";

const STORAGE_KEY = "gesgrama_properties_db";

async function loadSupabase() {
  const { getSupabase, isSupabaseConfigured } = await import("./supabase");
  if (!isSupabaseConfigured) return null;
  return getSupabase();
}

export interface ExtendedProperty extends Property {
  status?: "disponible" | "reservado" | "vendido" | "alquilado";
  name_ca?: string;
  name_en?: string;
  description_ca?: string;
  description_en?: string;
  createdAt?: string;
  updatedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  // Campos adaptativos
  facadeMeters?: number;
  smokeVent?: boolean;
  streetAccess?: boolean;
  officeRooms?: number;
  garageSpaces?: number;
}

type Listener = (properties: ExtendedProperty[]) => void;
const listeners = new Set<Listener>();

function notify(props: ExtendedProperty[]) {
  listeners.forEach((fn) => fn(props));
}

// Empaquetar metadatos extendidos dentro del array de features para persistir 100% en Supabase sin errores de columna
export function packFeatures(
  rawFeatures: string[],
  meta: {
    floor?: string;
    videoUrl?: string;
    metaTitle?: string;
    metaDescription?: string;
    facadeMeters?: number;
    smokeVent?: boolean;
    streetAccess?: boolean;
    officeRooms?: number;
    garageSpaces?: number;
  }
): string[] {
  // Limpiar cualquier metadato previo del array de features
  const cleanFeatures = (rawFeatures || []).filter(
    (f) => typeof f === "string" && !f.startsWith("__META__:")
  );

  const cleanMeta: Record<string, any> = {};
  if (meta.floor) cleanMeta.floor = meta.floor.trim();
  if (meta.videoUrl) cleanMeta.videoUrl = meta.videoUrl.trim();
  if (meta.metaTitle) cleanMeta.metaTitle = meta.metaTitle.trim();
  if (meta.metaDescription) cleanMeta.metaDescription = meta.metaDescription.trim();
  if (meta.facadeMeters !== undefined && meta.facadeMeters > 0) cleanMeta.facadeMeters = meta.facadeMeters;
  if (meta.smokeVent !== undefined) cleanMeta.smokeVent = meta.smokeVent;
  if (meta.streetAccess !== undefined) cleanMeta.streetAccess = meta.streetAccess;
  if (meta.officeRooms !== undefined && meta.officeRooms > 0) cleanMeta.officeRooms = meta.officeRooms;
  if (meta.garageSpaces !== undefined && meta.garageSpaces > 0) cleanMeta.garageSpaces = meta.garageSpaces;

  if (Object.keys(cleanMeta).length > 0) {
    cleanFeatures.push(`__META__:${JSON.stringify(cleanMeta)}`);
  }

  return cleanFeatures;
}

// Desempaquetar metadatos extendidos desde el array de features al leer de DB
export function unpackFeatures(features: string[] = []): {
  cleanFeatures: string[];
  meta: {
    floor?: string;
    videoUrl?: string;
    metaTitle?: string;
    metaDescription?: string;
    facadeMeters?: number;
    smokeVent?: boolean;
    streetAccess?: boolean;
    officeRooms?: number;
    garageSpaces?: number;
  };
} {
  const cleanFeatures: string[] = [];
  let meta: any = {};

  (features || []).forEach((f) => {
    if (typeof f === "string" && f.startsWith("__META__:")) {
      try {
        const jsonStr = f.substring("__META__:".length);
        meta = { ...meta, ...JSON.parse(jsonStr) };
      } catch (e) {
        console.warn("Error parsing __META__:", e);
      }
    } else if (typeof f === "string" && f.trim()) {
      cleanFeatures.push(f.trim());
    }
  });

  return { cleanFeatures, meta };
}

// Read from LocalStorage or default
export function getLocalProperties(): ExtendedProperty[] {
  if (typeof window === "undefined") return defaultProperties as ExtendedProperty[];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProperties));
      return defaultProperties as ExtendedProperty[];
    }
    const parsed: ExtendedProperty[] = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return defaultProperties as ExtendedProperty[];
    }
    // Remote / updated items in parsed take precedence over defaults
    const defaultsNotOverridden = (defaultProperties as ExtendedProperty[]).filter(
      (dp) => !parsed.some((p) => p.id === dp.id || (p.slug && p.slug === dp.slug))
    );
    return [...parsed, ...defaultsNotOverridden];
  } catch {
    return defaultProperties as ExtendedProperty[];
  }
}

// Find property by slug, id, or reference
export function findPropertyBySlugOrId(slugOrId: string): ExtendedProperty | undefined {
  if (!slugOrId) return undefined;
  
  let raw = slugOrId.trim();
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    // ignore malformed uri component
  }

  const strip = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const normRaw = strip(raw);
  const normDecoded = strip(decoded);

  const list = getLocalProperties();
  const allCandidates = [...list, ...(defaultProperties as ExtendedProperty[])];

  // Alias map for legacy URLs
  const SLUG_ALIASES: Record<string, string> = {
    "casa-unifamiliar-singuerlin": "apartamento-exterior-singuerlin",
    "atico-con-terraza-centre-santa-coloma": "atico-duplex-centro-santa-coloma",
    "atico-con-terraza-centro-santa-coloma": "atico-duplex-centro-santa-coloma",
    "atico-terraza-centre-santa-coloma": "atico-duplex-centro-santa-coloma",
    "atico-terraza-centro-santa-coloma": "atico-duplex-centro-santa-coloma",
  };
  if (SLUG_ALIASES[normRaw] || SLUG_ALIASES[normDecoded]) {
    const targetSlug = SLUG_ALIASES[normRaw] || SLUG_ALIASES[normDecoded];
    const match = allCandidates.find((p) => p.slug === targetSlug);
    if (match) return match;
  }

  // 1. Direct exact matches
  for (const p of allCandidates) {
    if (p.slug === raw || p.slug === decoded) return p;
    if (p.id === raw || p.id === decoded) return p;
  }

  // 2. Normalized slug or ID matches (accents / case insensitive)
  for (const p of allCandidates) {
    const pSlug = strip(p.slug || "");
    const pId = strip(p.id || "");
    if (pSlug && (pSlug === normRaw || pSlug === normDecoded)) return p;
    if (pId && (pId === normRaw || pId === normDecoded)) return p;
  }

  // 3. Match reference code (e.g. "API A10750")
  for (const p of allCandidates) {
    if (p.ref) {
      const pRef = strip(p.ref);
      if (pRef === normRaw || pRef === normDecoded) return p;
    }
  }

  // 4. Loose slug match (hyphen-separated words match)
  for (const p of allCandidates) {
    const pSlug = strip(p.slug || "");
    if (pSlug && (normDecoded.includes(pSlug) || pSlug.includes(normDecoded))) {
      return p;
    }
  }

  return undefined;
}

// Save to LocalStorage
export function saveLocalProperties(props: ExtendedProperty[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(props));
    } catch (e) {
      console.error("Error saving properties locally:", e);
    }
  }
  notify(props);
}

// Fetch all properties (from Supabase if configured, otherwise from local)
export async function fetchProperties(): Promise<ExtendedProperty[]> {
  try {
    const supabase = await loadSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        // Map database fields to Property object
        const mapped: ExtendedProperty[] = (data as any[]).map((d: any) => {
          const { cleanFeatures, meta } = unpackFeatures(d.features);
          return {
            id: d.id,
            slug: d.slug || d.id,
            ref: d.ref || "API A10750",
            name: d.name,
            name_ca: d.name_ca || undefined,
            name_en: d.name_en || undefined,
            type: d.type,
            location: d.location,
            city: d.city || "Santa Coloma de Gramenet",
            price: Number(d.price),
            priceFormatted: d.price_formatted || `${Number(d.price).toLocaleString("es-ES")} €`,
            specs: d.specs || `${d.bedrooms || 0} hab. · ${d.bathrooms || 1} baños · ${d.surface} m²`,
            bedrooms: d.bedrooms || 0,
            bathrooms: d.bathrooms || 0,
            surface: d.surface || 0,
            floor: meta.floor || d.floor || undefined,
            description: d.description || "",
            description_ca: d.description_ca || undefined,
            description_en: d.description_en || undefined,
            features: cleanFeatures,
            image: d.image || "/images/modern_office_space_opt.webp",
            gallery: Array.isArray(d.gallery) && d.gallery.length > 0 ? d.gallery : [d.image],
            operation: d.operation || "comprar",
            status: d.status || "disponible",
            videoUrl: meta.videoUrl || undefined,
            metaTitle: meta.metaTitle || undefined,
            metaDescription: meta.metaDescription || undefined,
            facadeMeters: meta.facadeMeters || undefined,
            smokeVent: meta.smokeVent ?? undefined,
            streetAccess: meta.streetAccess ?? undefined,
            officeRooms: meta.officeRooms || undefined,
            garageSpaces: meta.garageSpaces || undefined,
            createdAt: d.created_at
          };
        });
        saveLocalProperties(mapped);
        return mapped;
      }
    }
  } catch (err) {
    console.warn("Supabase fetch failed, using local storage fallback:", err);
  }
  return getLocalProperties();
}

// Create Property
export async function createProperty(property: Omit<ExtendedProperty, "id" | "slug"> & { id?: string; slug?: string }): Promise<ExtendedProperty> {
  const timestamp = Date.now();
  const generatedId = property.id || `prop-${timestamp}`;
  const baseSlug = property.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "inmueble";
  const generatedSlug = property.slug || `${baseSlug}-${timestamp.toString().slice(-4)}`;
  
  const packedFeatures = packFeatures(property.features || [], {
    floor: property.floor,
    videoUrl: property.videoUrl,
    metaTitle: property.metaTitle,
    metaDescription: property.metaDescription,
    facadeMeters: property.facadeMeters,
    smokeVent: property.smokeVent,
    streetAccess: property.streetAccess,
    officeRooms: property.officeRooms,
    garageSpaces: property.garageSpaces
  });

  const newProp: ExtendedProperty = {
    ...property,
    id: generatedId,
    slug: generatedSlug,
    status: property.status || "disponible",
    videoUrl: property.videoUrl?.trim() || undefined,
    createdAt: new Date().toISOString()
  };

  try {
    const supabase = await loadSupabase();
    if (supabase) {
      const payload: Record<string, any> = {
        id: newProp.id,
        slug: newProp.slug,
        ref: newProp.ref,
        name: newProp.name,
        name_ca: newProp.name_ca || null,
        name_en: newProp.name_en || null,
        type: newProp.type,
        location: newProp.location,
        city: newProp.city || "Santa Coloma de Gramenet",
        price: newProp.price,
        price_formatted: newProp.priceFormatted,
        specs: newProp.specs,
        bedrooms: newProp.bedrooms,
        bathrooms: newProp.bathrooms,
        surface: newProp.surface,
        description: newProp.description,
        description_ca: newProp.description_ca || null,
        description_en: newProp.description_en || null,
        features: packedFeatures,
        image: newProp.image,
        gallery: newProp.gallery,
        operation: newProp.operation,
        status: newProp.status
      };
      
      const { error } = await supabase.from("properties").insert([payload]);
      if (error) {
        console.error("Error creating in Supabase:", error);
        throw new Error(error.message || "Error al guardar en Supabase");
      }
    }
  } catch (err: any) {
    console.error("Supabase insert error:", err);
    throw err;
  }

  const current = getLocalProperties();
  const updated = [newProp, ...current];
  saveLocalProperties(updated);
  return newProp;
}

// Update Property
export async function updateProperty(id: string, updates: Partial<ExtendedProperty>): Promise<ExtendedProperty[]> {
  try {
    const supabase = await loadSupabase();
    if (supabase) {
      const dbUpdates: Record<string, any> = {};
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.name_ca !== undefined) dbUpdates.name_ca = updates.name_ca || null;
      if (updates.name_en !== undefined) dbUpdates.name_en = updates.name_en || null;
      if (updates.ref !== undefined) dbUpdates.ref = updates.ref;
      if (updates.type !== undefined) dbUpdates.type = updates.type;
      if (updates.location !== undefined) dbUpdates.location = updates.location;
      if (updates.city !== undefined) dbUpdates.city = updates.city;
      if (updates.price !== undefined) {
        dbUpdates.price = updates.price;
        dbUpdates.price_formatted = updates.priceFormatted || `${updates.price.toLocaleString("es-ES")} €`;
      }
      if (updates.specs !== undefined) dbUpdates.specs = updates.specs;
      if (updates.bedrooms !== undefined) dbUpdates.bedrooms = updates.bedrooms;
      if (updates.bathrooms !== undefined) dbUpdates.bathrooms = updates.bathrooms;
      if (updates.surface !== undefined) dbUpdates.surface = updates.surface;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.description_ca !== undefined) dbUpdates.description_ca = updates.description_ca || null;
      if (updates.description_en !== undefined) dbUpdates.description_en = updates.description_en || null;
      if (updates.image !== undefined) dbUpdates.image = updates.image;
      if (updates.gallery !== undefined) dbUpdates.gallery = updates.gallery;
      if (updates.operation !== undefined) dbUpdates.operation = updates.operation;
      if (updates.status !== undefined) dbUpdates.status = updates.status;

      // Pack features with metadata if features or any meta field changed
      if (
        updates.features !== undefined ||
        updates.floor !== undefined ||
        updates.videoUrl !== undefined ||
        updates.metaTitle !== undefined ||
        updates.metaDescription !== undefined ||
        updates.facadeMeters !== undefined ||
        updates.smokeVent !== undefined ||
        updates.streetAccess !== undefined ||
        updates.officeRooms !== undefined ||
        updates.garageSpaces !== undefined
      ) {
        const currentProp = getLocalProperties().find(p => p.id === id);
        const baseFeatures = updates.features !== undefined ? updates.features : (currentProp?.features || []);
        dbUpdates.features = packFeatures(baseFeatures, {
          floor: updates.floor !== undefined ? updates.floor : currentProp?.floor,
          videoUrl: updates.videoUrl !== undefined ? updates.videoUrl : currentProp?.videoUrl,
          metaTitle: updates.metaTitle !== undefined ? updates.metaTitle : currentProp?.metaTitle,
          metaDescription: updates.metaDescription !== undefined ? updates.metaDescription : currentProp?.metaDescription,
          facadeMeters: updates.facadeMeters !== undefined ? updates.facadeMeters : currentProp?.facadeMeters,
          smokeVent: updates.smokeVent !== undefined ? updates.smokeVent : currentProp?.smokeVent,
          streetAccess: updates.streetAccess !== undefined ? updates.streetAccess : currentProp?.streetAccess,
          officeRooms: updates.officeRooms !== undefined ? updates.officeRooms : currentProp?.officeRooms,
          garageSpaces: updates.garageSpaces !== undefined ? updates.garageSpaces : currentProp?.garageSpaces,
        });
      }

      const { error } = await supabase.from("properties").update(dbUpdates).eq("id", id);
      if (error) {
        console.error("Error updating in Supabase:", error);
        throw new Error(error.message || "Error al actualizar en Supabase");
      }
    }
  } catch (err: any) {
    console.error("Supabase update error:", err);
    throw err;
  }

  const current = getLocalProperties();
  const updated = current.map((p) => (p.id === id ? { ...p, ...updates } : p));
  saveLocalProperties(updated);
  return updated;
}

// Delete Property
export async function deleteProperty(id: string): Promise<ExtendedProperty[]> {
  try {
    const supabase = await loadSupabase();
    if (supabase) {
      const { error } = await supabase.from("properties").delete().eq("id", id);
      if (error) {
        console.error("Error deleting in Supabase:", error);
        throw new Error(error.message || "Error al eliminar en Supabase");
      }
    }
  } catch (err: any) {
    console.error("Supabase delete error:", err);
    throw err;
  }

  const current = getLocalProperties();
  const updated = current.filter((p) => p.id !== id);
  saveLocalProperties(updated);
  return updated;
}

// Duplicate Property (Clone)
export async function duplicateProperty(sourceId: string): Promise<ExtendedProperty> {
  const current = getLocalProperties();
  const source = current.find((p) => p.id === sourceId);
  if (!source) throw new Error("Inmueble original no encontrado");

  const timestamp = Date.now();
  const newRef = `API A${Math.floor(10000 + Math.random() * 90000)}`;
  const cloned = await createProperty({
    ...source,
    id: `prop-${timestamp}`,
    slug: `${source.slug || "inmueble"}-copia-${timestamp.toString().slice(-4)}`,
    ref: newRef,
    name: `${source.name} (Copia)`,
    name_ca: source.name_ca ? `${source.name_ca} (Còpia)` : undefined,
    name_en: source.name_en ? `${source.name_en} (Copy)` : undefined,
    status: "disponible",
  });
  return cloned;
}

// Subscribe to real-time local / remote changes
export function subscribeProperties(listener: Listener): () => void {
  listeners.add(listener);
  listener(getLocalProperties());
  return () => {
    listeners.delete(listener);
  };
}

// SQL Schema Reference for Supabase
export const SUPABASE_SETUP_SQL = `-- TABLA DE PROPIEDADES INMOBILIARIAS DE GESGRAMA (POSTGRESQL / SUPABASE)
create table if not exists public.properties (
  id text primary key,
  slug text not null unique,
  ref text default 'API A10750',
  name text not null,
  name_ca text,
  name_en text,
  type text not null, -- 'Piso', 'Ático', 'Local comercial', 'Chalet', 'Oficina', 'Garaje'
  location text not null,
  city text default 'Santa Coloma de Gramenet',
  price numeric not null,
  price_formatted text,
  specs text,
  bedrooms integer default 2,
  bathrooms integer default 1,
  surface integer not null,
  description text,
  description_ca text,
  description_en text,
  features text[] default '{}',
  image text not null,
  gallery text[] default '{}',
  operation text default 'comprar', -- 'comprar' | 'alquilar'
  status text default 'disponible', -- 'disponible' | 'reservado' | 'vendido' | 'alquilado'
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Habilitar seguridad por fila (RLS)
alter table public.properties enable row level security;

-- Políticas de acceso
create policy "Cualquiera puede ver las propiedades" 
  on public.properties for select using (true);

create policy "Permitir gestión de propiedades" 
  on public.properties for all using (true) with check (true);
`;
