"use server";

import { z } from "zod";
import { createServiceRoleClient } from "@/lib/supabase/server";

const leadSchema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
});

interface SubscribeResult {
  success: boolean;
  error?: string;
}

export async function subscribeLead(input: { email: string; source?: string }): Promise<SubscribeResult> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    const supabase = createServiceRoleClient();
    const { error } = await supabase
      .from("leads")
      .insert({ email: parsed.data.email, source: parsed.data.source ?? null });

    if (error) throw error;
    return { success: true };
  } catch {
    // Covers both missing Supabase env vars (createServiceRoleClient throws) and insert failures.
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
