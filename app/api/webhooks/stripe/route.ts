import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { createStripeClient } from "@/lib/stripe";
import { findOrderByProviderRef } from "@/lib/orders";
import { fulfillOrder } from "@/lib/fulfillment";

// Stripe's signature check needs the *raw* request bytes — App Router route handlers don't
// auto-parse the body the way the old Pages API routes did, so request.text() already gives us
// the untouched payload. The only rule is: never call request.json() here, only .text().
export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error("Stripe webhook called without a signature header or STRIPE_WEBHOOK_SECRET set.");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    const stripe = createStripeClient();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
    }
  } catch (err) {
    console.error(`Failed to process Stripe event ${event.id} (${event.type}):`, err);
    // Non-2xx tells Stripe to retry — safe, since fulfillOrder is idempotent.
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  // checkout.session.completed can fire with payment_status "unpaid" for delayed payment
  // methods still awaiting confirmation (e.g. some bank debits) — only fulfill on confirmed
  // payment. Stripe sends a separate async_payment_succeeded event once those settle, which
  // isn't handled yet (out of scope for now — flagged for whoever wires up the next provider).
  if (session.payment_status !== "paid") {
    return;
  }

  const order = await findOrderByProviderRef("stripe", session.id);
  if (!order) {
    throw new Error(`No order found for Stripe session ${session.id}`);
  }

  await fulfillOrder(order);
}
