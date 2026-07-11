"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createStripeClient } from "@/lib/stripe";

const schema = z.object({ email: z.string().email() });

export interface CoachingCheckoutState {
  error?: string;
}

export async function createCoachingCheckoutSession(
  _prev: CoachingCheckoutState,
  formData: FormData
): Promise<CoachingCheckoutState> {
  const parsed = schema.safeParse({ email: formData.get("email") });
  if (!parsed.success) return { error: "Please enter a valid email address." };

  const priceId = process.env.COACHING_STRIPE_PRICE_ID;
  if (!priceId) {
    return {
      error: "Booking is not available right now. Please use the contact form and we'll help you book.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  let sessionUrl: string;
  try {
    const stripe = createStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: parsed.data.email,
      automatic_tax: { enabled: true },
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/coaching/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/coaching#book`,
    });
    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    sessionUrl = session.url;
  } catch {
    return { error: "Something went wrong starting checkout. Please try again." };
  }

  redirect(sessionUrl);
}
