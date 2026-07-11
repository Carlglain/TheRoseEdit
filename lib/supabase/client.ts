import { createClient } from "@supabase/supabase-js";

// RLS denies all table access to the anon role — this client is for Phase 2 Supabase Auth only.
// Validated lazily (inside the function, not at module load) — see lib/supabase/server.ts.
export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase browser env vars: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set."
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}
