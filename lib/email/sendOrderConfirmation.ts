import "server-only";
import { createResendClient } from "@/lib/resend";
import { renderOrderConfirmationEmail } from "./orderConfirmation";

interface SendOrderConfirmationParams {
  to: string;
  items: { name: string; downloadUrl: string }[];
  amountMinor: number;
  currency: string;
}

// resend.dev's shared test sender — works with no domain verification, fine for development.
// Swap to a verified RoseAudit domain address before launch.
const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL ?? "RoseAudit <onboarding@resend.dev>";

export async function sendOrderConfirmationEmail({
  to,
  items,
  amountMinor,
  currency,
}: SendOrderConfirmationParams): Promise<void> {
  const { subject, html, text } = renderOrderConfirmationEmail({ items, amountMinor, currency });
  const resend = createResendClient();

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject,
    html,
    text,
  });

  if (error) {
    throw new Error(`Resend failed to send order confirmation: ${error.message}`);
  }
}
