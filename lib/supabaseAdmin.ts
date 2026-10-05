import "server-only";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const isSupabaseConfigured = (): boolean => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;
  return Boolean(
    supabaseUrl &&
      supabaseSecretKey &&
      !supabaseSecretKey.includes("paste_") &&
      !supabaseSecretKey.includes("your_actual_") &&
      supabaseSecretKey.length > 20
  );
};

export const getSupabaseAdmin = (): SupabaseClient | null => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;
  if (!isSupabaseConfigured()) return null;
  return createClient(supabaseUrl!, supabaseSecretKey!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
