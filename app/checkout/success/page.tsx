import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ClearCartOnMount } from "@/components/cart/ClearCartOnMount";
import type { Metadata } from "next";
import { findOrderByProviderRef } from "@/lib/orders";

export const metadata: Metadata = { robots: { index: false, follow: false } };

interface CheckoutSuccessPageProps {
  searchParams: Promise<{ session_id?: string; paypal_order_id?: string }>;
}

// Read-only display — looks up the order from our own DB to show the buyer's email.
// This page NEVER marks orders paid or grants downloads; that is exclusively the webhook's job.
async function loadOrder(searchParams: Awaited<CheckoutSuccessPageProps["searchParams"]>) {
  try {
    if (searchParams.session_id) {
      return await findOrderByProviderRef("stripe", searchParams.session_id);
    }
    if (searchParams.paypal_order_id) {
      return await findOrderByProviderRef("paypal", searchParams.paypal_order_id);
    }
  } catch {
    // Non-critical display lookup — don't crash the page if the DB is unavailable.
  }
  return null;
}

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const params = await searchParams;

  if (!params.session_id && !params.paypal_order_id) {
    redirect("/");
  }

  const order = await loadOrder(params);
  const email = order?.email;

  return (
    <main>
      <Section>
        <Container>
          <ClearCartOnMount />
          <div className="mx-auto max-w-md text-center">
            <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-emerald">
              Order Submitted
            </span>
            <Heading level={1}>Check Your Email</Heading>
            <p className="mt-4 text-muted">
              {email
                ? `We're confirming your payment and will send your receipt and secure download link to ${email} shortly.`
                : "We're confirming your payment and will send your receipt and secure download link by email shortly."}
            </p>
            <p className="mt-4 text-xs text-muted">
              Fulfillment is handled automatically once payment is confirmed — this can take a
              few minutes. No download is granted on this page.
            </p>
            <div className="mt-8">
              <Button href="/">Back to Home</Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
