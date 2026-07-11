import "server-only";
import Stripe from "stripe";

export function createStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing Stripe env var: STRIPE_SECRET_KEY must be set.");
  }

  return new Stripe(secretKey);
}
