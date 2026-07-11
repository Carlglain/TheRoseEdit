import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { getProductsByIds } from "@/lib/products";
import { createPayPalOrder } from "@/lib/paypal";
import { CART_COOKIE_NAME, parseCartCookie } from "@/lib/cart";

export const runtime = "nodejs";

const bodySchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  let email: string;
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Valid email address required." }, { status: 400 });
    }
    email = parsed.data.email;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const cookieStore = await cookies();
  const cartIds = parseCartCookie(cookieStore.get(CART_COOKIE_NAME)?.value);

  if (cartIds.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  // Never trust client for prices — re-fetch from Supabase server-side.
  let products;
  try {
    products = await getProductsByIds(cartIds);
  } catch {
    return NextResponse.json({ error: "Could not load cart products." }, { status: 500 });
  }

  const purchasable = products.filter((p) => p.isPublished && !p.isComingSoon);
  if (purchasable.length === 0) {
    return NextResponse.json({ error: "No purchasable items in cart." }, { status: 400 });
  }

  const currency = purchasable[0].currency;
  const amountMinor = purchasable.reduce((sum, p) => sum + p.priceMinor, 0);

  let paypalOrderId: string;
  try {
    paypalOrderId = await createPayPalOrder(purchasable, currency);
  } catch (err) {
    console.error("PayPal create order error:", err);
    return NextResponse.json({ error: "Could not create PayPal order." }, { status: 502 });
  }

  // Record a pending order immediately so the webhook can find it by provider_ref.
  try {
    const supabase = createServiceRoleClient();
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        email,
        status: "pending",
        payment_provider: "paypal",
        provider_ref: paypalOrderId,
        amount_minor: amountMinor,
        currency,
      })
      .select("id")
      .single();

    if (orderError) throw orderError;

    const { error: itemsError } = await supabase.from("order_items").insert(
      purchasable.map((p) => ({
        order_id: order.id,
        product_id: p.id,
        price_minor: p.priceMinor,
      }))
    );
    if (itemsError) throw itemsError;
  } catch (err) {
    console.error("PayPal order DB insert error:", err);
    return NextResponse.json({ error: "Could not record order." }, { status: 500 });
  }

  return NextResponse.json({ id: paypalOrderId });
}
