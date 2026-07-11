import { z } from "zod";

export const CART_COOKIE_NAME = "roseaudit_cart";

const cartSchema = z.array(z.string().uuid());

// Shared by the client (document.cookie) and server (cookies() in RSCs/actions) — the cookie
// only ever holds product IDs, never prices. Checkout always re-derives prices from Supabase.
export function parseCartCookie(value: string | undefined): string[] {
  if (!value) return [];
  try {
    return cartSchema.parse(JSON.parse(value));
  } catch {
    return [];
  }
}
