import { properties as defaultProperties, type Property } from "@/data/properties";
import { supabase, isSupabaseConfigured } from "./supabase";

const STORAGE_KEY = "gesgrama_properties_db";

export interface ExtendedProperty extends Property {
  status?: "disponible" | "reservado" | "vendido" | "alquilado";
  name_ca?: string;
  name_en?: string;
  description_ca?: string;
  description_en?: string;
  createdAt?: string;
}

type Listener = (properties: ExtendedProperty[]) => void;
const listeners = new Set<Listener>();

function notify(props: ExtendedProperty[]) {
  listeners.forEach((fn) => fn(props));
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
    return JSON.parse(raw);
  } catch {
    return defaultProperties as ExtendedProperty[];
  }
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
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        // Map database fields to Property object
        const mapped: ExtendedProperty[] = data.map((d) => ({
          id: d.id,
          slug: d.slug || d.id,
          ref: d.ref || "API A10750",
          name: d.name,
          name_ca: d.name_ca,
          name_en: d.name_en,
          type: d.type,
          location: d.location,
          city: d.city || "Santa Coloma de Gramenet",
          price: Number(d.price),
          priceFormatted: d.price_formatted || `${Number(d.price).toLocaleString("es-ES")} €`,
          specs: d.specs || `${d.bedrooms || 2} hab. · ${d.bathrooms || 1} baños · ${d.surface} m²`,
          bedrooms: d.bedrooms || 0,
          bathrooms: d.bathrooms || 0,
          surface: d.surface || 0,
          description: d.description || "",
          description_ca: d.description_ca,
          description_en: d.description_en,
          features: d.features || [],
          image: d.image || "/images/modern_office_space.webp",
          gallery: d.gallery || [],
          operation: d.operation || "comprar",
          status: d.status || "disponible",
          createdAt: d.created_at
        }));
        saveLocalProperties(mapped);
        return mapped;
      }
    } catch (err) {
      console.warn("Supabase fetch failed, using local storage fallback:", err);
    }
  }
  return getLocalProperties();
}

// Create Property
export async function createProperty(property: Omit<ExtendedProperty, "id" | "slug"> & { id?: string; slug?: string }): Promise<ExtendedProperty> {
  const generatedId = property.id || `prop-${Date.now()}`;
  const generatedSlug = property.slug || property.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  
  const newProp: ExtendedProperty = {
    ...property,
    id: generatedId,
    slug: generatedSlug,
    status: property.status || "disponible",
    createdAt: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("properties").insert([{
        id: newProp.id,
        slug: newProp.slug,
        ref: newProp.ref,
        name: newProp.name,
        name_ca: newProp.name_ca,
        name_en: newProp.name_en,
        type: newProp.type,
        location: newProp.location,
        city: newProp.city,
        price: newProp.price,
        price_formatted: newProp.priceFormatted,
        specs: newProp.specs,
        bedrooms: newProp.bedrooms,
        bathrooms: newProp.bathrooms,
        surface: newProp.surface,
        description: newProp.description,
        description_ca: newProp.description_ca,
        description_en: newProp.description_en,
        features: newProp.features,
        image: newProp.image,
        gallery: newProp.gallery,
        operation: newProp.operation,
        status: newProp.status
      }]);
      if (error) console.error("Error creating in Supabase:", error);
    } catch (err) {
      console.error("Supabase insert error:", err);
    }
  }

  const current = getLocalProperties();
  const updated = [newProp, ...current];
  saveLocalProperties(updated);
  return newProp;
}

// Update Property
export async function updateProperty(id: string, updates: Partial<ExtendedProperty>): Promise<ExtendedProperty[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const dbUpdates: Record<string, any> = {};
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.name_ca !== undefined) dbUpdates.name_ca = updates.name_ca;
      if (updates.name_en !== undefined) dbUpdates.name_en = updates.name_en;
      if (updates.ref !== undefined) dbUpdates.ref = updates.ref;
      if (updates.type !== undefined) dbUpdates.type = updates.type;
      if (updates.location !== undefined) dbUpdates.location = updates.location;
      if (updates.city !== undefined) dbUpdates.city = updates.city;
      if (updates.price !== undefined) {
        dbUpdates.price = updates.price;
        dbUpdates.price_formatted = updates.priceFormatted || `${updates.price.toLocaleString("es-ES")} €`;
      }
      if (updates.bedrooms !== undefined) dbUpdates.bedrooms = updates.bedrooms;
      if (updates.bathrooms !== undefined) dbUpdates.bathrooms = updates.bathrooms;
      if (updates.surface !== undefined) dbUpdates.surface = updates.surface;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.description_ca !== undefined) dbUpdates.description_ca = updates.description_ca;
      if (updates.description_en !== undefined) dbUpdates.description_en = updates.description_en;
      if (updates.features !== undefined) dbUpdates.features = updates.features;
      if (updates.image !== undefined) dbUpdates.image = updates.image;
      if (updates.gallery !== undefined) dbUpdates.gallery = updates.gallery;
      if (updates.operation !== undefined) dbUpdates.operation = updates.operation;
      if (updates.status !== undefined) dbUpdates.status = updates.status;

      const { error } = await supabase.from("properties").update(dbUpdates).eq("id", id);
      if (error) console.error("Error updating in Supabase:", error);
    } catch (err) {
      console.error("Supabase update error:", err);
    }
  }

  const current = getLocalProperties();
  const updated = current.map((p) => (p.id === id ? { ...p, ...updates } : p));
  saveLocalProperties(updated);
  return updated;
}

// Delete Property
export async function deleteProperty(id: string): Promise<ExtendedProperty[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("properties").delete().eq("id", id);
      if (error) console.error("Error deleting in Supabase:", error);
    } catch (err) {
      console.error("Supabase delete error:", err);
    }
  }

  const current = getLocalProperties();
  const updated = current.filter((p) => p.id !== id);
  saveLocalProperties(updated);
  return updated;
}

// Subscribe to real-time local / remote changes
export function subscribeProperties(listener: Listener): () => void {
  listeners.add(listener);
  listener(getLocalProperties());
  return () => {
    listeners.delete(listener);
  };
}

// SQL Schema Generator for Supabase
export const SUPABASE_SETUP_SQL = `-- 1. TABLA DE PROPIEDADES INMOBILIARIAS DE GESGRAMA
create table if not exists public.properties (
  id text primary key,
  slug text not null unique,
  ref text default 'API A10750',
  name text not null,
  name_ca text,
  name_en text,
  type text not null, -- 'Piso', 'Ático', 'Local comercial', 'Chalet', 'Oficina'
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

-- 2. Habilitar seguridad por fila (RLS)
alter table public.properties enable row level security;

-- 3. Políticas de acceso (Lectura pública, Escritura autenticada o pública anónima)
create policy "Cualquiera puede ver las propiedades" 
  on public.properties for select using (true);

create policy "Permitir gestión de propiedades" 
  on public.properties for all using (true) with check (true);
`;
