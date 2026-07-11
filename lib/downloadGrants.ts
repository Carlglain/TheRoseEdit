import "server-only";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { createServiceRoleClient } from "@/lib/supabase/server";
import type { DownloadGrant } from "@/types";

const GRANT_LIFETIME_MS = 72 * 60 * 60 * 1000; // 72 hours
const MAX_DOWNLOADS = 5;
const UNIQUE_VIOLATION = "23505";

const grantRowSchema = z.object({
  id: z.string().uuid(),
  order_id: z.string().uuid(),
  product_id: z.string().uuid(),
  token: z.string(),
  expires_at: z.string(),
  max_downloads: z.number().int().positive(),
  download_count: z.number().int().nonnegative(),
});

function toGrant(row: z.infer<typeof grantRowSchema>): DownloadGrant {
  return {
    id: row.id,
    orderId: row.order_id,
    productId: row.product_id,
    token: row.token,
    expiresAt: row.expires_at,
    maxDownloads: row.max_downloads,
    downloadCount: row.download_count,
  };
}

export async function getGrantsForOrder(orderId: string): Promise<DownloadGrant[]> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("download_grants")
    .select("*")
    .eq("order_id", orderId);

  if (error) throw error;
  return z.array(grantRowSchema).parse(data).map(toGrant);
}

// Idempotent: relies on the unique(order_id, product_id) constraint (see
// supabase/migrations/20260630000003_fulfillment.sql) rather than a check-then-insert race.
// If two webhook deliveries for the same event call this concurrently, exactly one INSERT
// wins; the other hits a unique violation and falls back to reading what the winner created.
export async function createGrantsForOrder(
  orderId: string,
  productIds: string[]
): Promise<DownloadGrant[]> {
  const supabase = createServiceRoleClient();
  const expiresAt = new Date(Date.now() + GRANT_LIFETIME_MS).toISOString();

  const newGrants = productIds.map((productId) => ({
    order_id: orderId,
    product_id: productId,
    token: randomUUID().replace(/-/g, ""),
    expires_at: expiresAt,
    max_downloads: MAX_DOWNLOADS,
    download_count: 0,
  }));

  const { data, error } = await supabase.from("download_grants").insert(newGrants).select("*");

  if (error) {
    if (error.code === UNIQUE_VIOLATION) {
      return getGrantsForOrder(orderId);
    }
    throw error;
  }

  return z.array(grantRowSchema).parse(data).map(toGrant);
}

export async function getGrantByToken(token: string): Promise<DownloadGrant | null> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("download_grants")
    .select("*")
    .eq("token", token)
    .maybeSingle();

  if (error) throw error;
  return data ? toGrant(grantRowSchema.parse(data)) : null;
}

// Best-effort increment, not perfectly race-safe under truly simultaneous requests for the
// same token (would need a Postgres RPC for an atomic "+1 WHERE count < max" to close that
// gap). Acceptable here: worst case is one extra download out of a 5-download allowance.
export async function incrementGrantDownloadCount(grant: DownloadGrant): Promise<void> {
  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("download_grants")
    .update({ download_count: grant.downloadCount + 1 })
    .eq("id", grant.id);

  if (error) throw error;
}
