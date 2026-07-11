import "server-only";
import { z } from "zod";
import { createServiceRoleClient } from "@/lib/supabase/server";
import type { Order } from "@/types";

const orderRowSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  status: z.enum(["pending", "paid", "failed", "refunded"]),
  payment_provider: z.enum(["stripe", "paypal"]),
  provider_ref: z.string().nullable(),
  amount_minor: z.number().int().nonnegative(),
  currency: z.string(),
  email_sent_at: z.string().nullable(),
  created_at: z.string(),
});

function toOrder(row: z.infer<typeof orderRowSchema>): Order {
  return {
    id: row.id,
    email: row.email,
    status: row.status,
    paymentProvider: row.payment_provider,
    providerRef: row.provider_ref,
    amountMinor: row.amount_minor,
    currency: row.currency,
    emailSentAt: row.email_sent_at,
    createdAt: row.created_at,
  };
}

export async function findOrderByProviderRef(
  provider: "stripe" | "paypal",
  ref: string
): Promise<Order | null> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_provider", provider)
    .eq("provider_ref", ref)
    .maybeSingle();

  if (error) throw error;
  return data ? toOrder(orderRowSchema.parse(data)) : null;
}

export async function getOrderItemProductIds(orderId: string): Promise<string[]> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("order_items")
    .select("product_id")
    .eq("order_id", orderId);

  if (error) throw error;
  return z.array(z.object({ product_id: z.string().uuid() })).parse(data).map((row) => row.product_id);
}

export async function markOrderPaid(orderId: string): Promise<void> {
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("orders").update({ status: "paid" }).eq("id", orderId);
  if (error) throw error;
}

export async function markOrderEmailSent(orderId: string): Promise<void> {
  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("orders")
    .update({ email_sent_at: new Date().toISOString() })
    .eq("id", orderId);
  if (error) throw error;
}
