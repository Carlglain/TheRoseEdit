import "server-only";
import { cache } from "react";
import { z } from "zod";
import { createServiceRoleClient } from "@/lib/supabase/server";
import type { Product, ProductType } from "@/types";

const productRowSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  type: z.enum(["ebook", "course", "vendor_list", "resource"]),
  description: z.string(),
  price_minor: z.number().int().nonnegative(),
  currency: z.string(),
  is_published: z.boolean(),
  is_coming_soon: z.boolean(),
  cover_image_url: z.string().nullable(),
  storage_path: z.string().nullable(),
  stripe_price_id: z.string().nullable(),
  created_at: z.string(),
});

function toProduct(row: z.infer<typeof productRowSchema>): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    type: row.type,
    description: row.description,
    priceMinor: row.price_minor,
    currency: row.currency,
    isPublished: row.is_published,
    isComingSoon: row.is_coming_soon,
    coverImageUrl: row.cover_image_url,
    storagePath: row.storage_path,
    stripePriceId: row.stripe_price_id,
    createdAt: row.created_at,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return z.array(productRowSchema).parse(data).map(toProduct);
}

export async function getPublishedProducts(): Promise<Product[]> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return z.array(productRowSchema).parse(data).map(toProduct);
}

export async function getProductsByType(type: ProductType): Promise<Product[]> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("type", type)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return z.array(productRowSchema).parse(data).map(toProduct);
}

/** Shop-only catalogue — excludes e-books, courses, and vendor lists. */
export async function getShopProducts(): Promise<Product[]> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("type", "resource")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return z.array(productRowSchema).parse(data).map(toProduct);
}

// Used by the cart/checkout flow — looks up by primary key, ignoring is_published, so a
// product that goes unpublished mid-checkout still resolves (callers decide what to do with it).
export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return [];

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.from("products").select("*").in("id", ids);

  if (error) throw error;
  return z.array(productRowSchema).parse(data).map(toProduct);
}

// Cached per-request: generateMetadata and the page component both need the same product.
export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? toProduct(productRowSchema.parse(data)) : null;
});

// Listing pages render fine with an empty grid (graceful empty/coming-soon state) — they
// shouldn't 500 just because Supabase isn't configured yet or is briefly unreachable.
export async function getProductsSafe(type?: ProductType): Promise<Product[]> {
  try {
    return type ? await getProductsByType(type) : await getPublishedProducts();
  } catch {
    return [];
  }
}

export async function getShopProductsSafe(): Promise<Product[]> {
  try {
    return await getShopProducts();
  } catch {
    return [];
  }
}
