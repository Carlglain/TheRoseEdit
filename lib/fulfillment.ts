import "server-only";
import { getGrantsForOrder, createGrantsForOrder } from "@/lib/downloadGrants";
import { getOrderItemProductIds, markOrderPaid, markOrderEmailSent } from "@/lib/orders";
import { getProductsByIds } from "@/lib/products";
import { sendOrderConfirmationEmail } from "@/lib/email/sendOrderConfirmation";
import type { Order } from "@/types";

/**
 * Shared fulfillment logic — called by both the Stripe and PayPal webhook handlers.
 * Idempotent: safe to call multiple times for the same order.
 *   - download_grants unique(order_id, product_id) constraint is the atomic gate for grant creation
 *   - email_sent_at tracks email delivery separately; retries after email failures still deliver
 */
export async function fulfillOrder(order: Order): Promise<void> {
  if (order.status === "paid" && order.emailSentAt) {
    return; // Already fully processed — duplicate event delivery.
  }

  let grants = await getGrantsForOrder(order.id);

  if (grants.length === 0) {
    const productIds = await getOrderItemProductIds(order.id);
    if (productIds.length === 0) {
      throw new Error(`Order ${order.id} has no order_items — cannot resolve what to fulfill`);
    }
    grants = await createGrantsForOrder(order.id, productIds);
  }

  await markOrderPaid(order.id);

  if (!order.emailSentAt) {
    const products = await getProductsByIds(grants.map((g) => g.productId));
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const items = grants.map((grant) => ({
      name: products.find((p) => p.id === grant.productId)?.name ?? "Your purchase",
      downloadUrl: `${siteUrl}/download/${grant.token}`,
    }));

    await sendOrderConfirmationEmail({
      to: order.email,
      items,
      amountMinor: order.amountMinor,
      currency: order.currency,
    });

    await markOrderEmailSent(order.id);
  }
}
