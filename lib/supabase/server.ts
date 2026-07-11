import "server-only";
import { createClient } from "@supabase/supabase-js";

// Service-role key bypasses RLS — only call this from server actions, route handlers, or RSCs.
// Validated lazily (inside the function, not at module load) so callers can catch a missing
// Supabase project instead of the whole module import blowing up page generation.
export function createServiceRoleClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase server env vars: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set."
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
