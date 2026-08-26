import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://goqgzuhffngtxoijoveb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcWd6dWhmZm5ndHhvaWpvdmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjE5MTQsImV4cCI6MjEwMzMzNzkxNH0.33sWLpPpzkxgkEceevYWrREpGtUJEn2fOwKnKevYXUs";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log("Connecting to Supabase...");
  const { data, error } = await supabase.from("properties").select("*");
  if (error) {
    console.error("Supabase query error:", error);
  } else {
    console.log("SUCCESS! Table 'properties' is online. Rows count:", data.length);
  }
}

testConnection();
