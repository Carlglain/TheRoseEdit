"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { createStripeClient } from "@/lib/stripe";
import { getProductsByIds } from "@/lib/products";
import { CART_COOKIE_NAME, parseCartCookie } from "@/lib/cart";

const checkoutSchema = z.object({
  email: z.string().email(),
});

export interface CheckoutState {
  error?: string;
}

export async function createCheckoutSession(
  _prevState: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const parsed = checkoutSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { error: "Please enter a valid email address." };
  }

  const cookieStore = await cookies();
  const cartIds = parseCartCookie(cookieStore.get(CART_COOKIE_NAME)?.value);

  if (cartIds.length === 0) {
    return { error: "Your cart is empty." };
  }

  // Never trust the cart cookie for price — it's only a list of product IDs. Every price and
  // stripe_price_id used below is re-fetched from Supabase, the authoritative source.
  let products;
  try {
    products = await getProductsByIds(cartIds);
  } catch {
    return { error: "Something went wrong loading your cart. Please try again." };
  }

  const purchasable = products.filter((p) => p.isPublished && !p.isComingSoon);

  if (purchasable.length === 0) {
    return { error: "None of the items in your cart are available for purchase." };
  }

  const missingPriceId = purchasable.find((p) => !p.stripePriceId);
  if (missingPriceId) {
    return {
      error: `"${missingPriceId.name}" isn't ready for checkout yet. Please remove it and try again.`,
    };
  }

  const amountMinor = purchasable.reduce((sum, p) => sum + p.priceMinor, 0);
  const currency = purchasable[0].currency;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  let sessionId: string;
  let sessionUrl: string;
  try {
    const stripe = createStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: parsed.data.email,
      automatic_tax: { enabled: true },
      line_items: purchasable.map((p) => ({
        price: p.stripePriceId as string,
        quantity: 1,
      })),
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`,
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    sessionId = session.id;
    sessionUrl = session.url;
  } catch {
    return { error: "Something went wrong starting checkout. Please try again." };
  }

  // Record the order as 'pending' before sending the customer to pay. The webhook (not yet
  // built — fulfillment is a separate step) is the only thing allowed to mark it 'paid' and
  // grant downloads; this insert just keeps provider_ref around so that webhook can find it.
  try {
    const supabase = createServiceRoleClient();
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        email: parsed.data.email,
        status: "pending",
        payment_provider: "stripe",
        provider_ref: sessionId,
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
  } catch {
    return { error: "Something went wrong recording your order. Please try again." };
  }

  redirect(sessionUrl);
}
