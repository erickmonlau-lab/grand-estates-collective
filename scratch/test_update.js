import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://goqgzuhffngtxoijoveb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcWd6dWhmZm5ndHhvaWpvdmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjE5MTQsImV4cCI6MjEwMzMzNzkxNH0.33sWLpPpzkxgkEceevYWrREpGtUJEn2fOwKnKevYXUs";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUpdate() {
  const { data, error } = await supabase
    .from("properties")
    .update({ name: "Piso reformado en Riera Alta - Llatí" })
    .eq("id", "prop-1")
    .select();

  if (error) console.error("Update error:", error);
  else console.log("Update SUCCESS:", data);
}

testUpdate();
