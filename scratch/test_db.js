import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://goqgzuhffngtxoijoveb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcWd6dWhmZm5ndHhvaWpvdmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjE5MTQsImV4cCI6MjEwMzMzNzkxNH0.33sWLpPpzkxgkEceevYWrREpGtUJEn2fOwKnKevYXUs";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspect() {
  const { data, error } = await supabase.from("properties").select("id, name, operation, image, price");
  if (error) console.error("Error:", error);
  else {
    console.log("Supabase Properties:", JSON.stringify(data, null, 2));
  }
}

inspect();
