import { createClient } from "@supabase/supabase-js";

// Gesgrama Supabase Cloud Database Credentials
const DEFAULT_SUPABASE_URL = "https://goqgzuhffngtxoijoveb.supabase.co";
const DEFAULT_SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcWd6dWhmZm5ndHhvaWpvdmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjE5MTQsImV4cCI6MjEwMzMzNzkxNH0.33sWLpPpzkxgkEceevYWrREpGtUJEn2fOwKnKevYXUs";

const supabaseUrl = (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY) || DEFAULT_SUPABASE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Supabase client instance with realtime enabled
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});
