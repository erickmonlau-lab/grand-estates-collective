import { createClient } from "@supabase/supabase-js";
import { properties } from "../src/data/properties.js";

const supabaseUrl = "https://goqgzuhffngtxoijoveb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcWd6dWhmZm5ndHhvaWpvdmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjE5MTQsImV4cCI6MjEwMzMzNzkxNH0.33sWLpPpzkxgkEceevYWrREpGtUJEn2fOwKnKevYXUs";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAndSeed() {
  console.log("Testing Supabase connection...");
  const { data, error } = await supabase.from("properties").select("*");
  if (error) {
    console.error("Supabase query error:", error);
    return;
  }
  console.log(`Connected! Current properties count in Supabase: ${data.length}`);

  if (data.length === 0) {
    console.log("Seeding initial properties to Supabase...");
    for (const p of properties) {
      const { error: insertErr } = await supabase.from("properties").insert([{
        id: p.id,
        slug: p.slug,
        ref: p.ref || "API A10750",
        name: p.name,
        name_ca: p.name,
        name_en: p.name,
        type: p.type,
        location: p.location,
        city: p.city || "Santa Coloma de Gramenet",
        price: p.price,
        price_formatted: p.priceFormatted,
        specs: p.specs,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        surface: p.surface,
        description: p.description,
        features: p.features || [],
        image: p.image,
        gallery: p.gallery || [],
        operation: p.operation || "comprar",
        status: "disponible"
      }]);
      if (insertErr) {
        console.error(`Error inserting ${p.id}:`, insertErr);
      } else {
        console.log(`Inserted: ${p.name}`);
      }
    }
    console.log("Seeding complete!");
  }
}

testAndSeed();
