import { NextResponse } from "next/server";
import { verifyPayPalWebhookSignature } from "@/lib/paypal";
import { findOrderByProviderRef } from "@/lib/orders";
import { fulfillOrder } from "@/lib/fulfillment";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) {
    console.error("PayPal webhook called without PAYPAL_WEBHOOK_ID set.");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }

  const rawBody = await request.text();

  const authAlgo = request.headers.get("paypal-auth-algo") ?? "";
  const certUrl = request.headers.get("paypal-cert-url") ?? "";
  const transmissionId = request.headers.get("paypal-transmission-id") ?? "";
  const transmissionSig = request.headers.get("paypal-transmission-sig") ?? "";
  const transmissionTime = request.headers.get("paypal-transmission-time") ?? "";

  try {
    const valid = await verifyPayPalWebhookSignature({
      authAlgo,
      certUrl,
      transmissionId,
      transmissionSig,
      transmissionTime,
      webhookId,
      rawBody,
    });

    if (!valid) {
      console.error("PayPal webhook signature verification returned FAILURE.");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } catch (err) {
    console.error("PayPal webhook signature verification error:", err);
    return NextResponse.json({ error: "Signature check failed" }, { status: 400 });
  }

  let event: { event_type: string; resource: Record<string, unknown> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (event.event_type !== "PAYMENT.CAPTURE.COMPLETED") {
    return NextResponse.json({ received: true });
  }

  try {
    await handleCaptureCompleted(event.resource);
  } catch (err) {
    console.error("Failed to process PayPal PAYMENT.CAPTURE.COMPLETED:", err);
    // Non-2xx tells PayPal to retry — safe, since fulfillOrder is idempotent.
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleCaptureCompleted(resource: Record<string, unknown>) {
  // PayPal's capture resource nests the checkout order ID under supplementary_data.
  const supplementaryData = resource.supplementary_data as
    | { related_ids?: { order_id?: string } }
    | undefined;
  const paypalOrderId = supplementaryData?.related_ids?.order_id;

  if (!paypalOrderId) {
    throw new Error("PayPal capture webhook missing supplementary_data.related_ids.order_id");
  }

  const order = await findOrderByProviderRef("paypal", paypalOrderId);
  if (!order) {
    throw new Error(`No order found for PayPal order ${paypalOrderId}`);
  }

  await fulfillOrder(order);
}
