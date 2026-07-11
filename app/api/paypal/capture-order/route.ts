import { NextResponse } from "next/server";
import { z } from "zod";
import { capturePayPalOrder } from "@/lib/paypal";

export const runtime = "nodejs";

const bodySchema = z.object({
  paypalOrderId: z.string().min(1),
});

export async function POST(request: Request) {
  let paypalOrderId: string;
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "paypalOrderId is required." }, { status: 400 });
    }
    paypalOrderId = parsed.data.paypalOrderId;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    const result = await capturePayPalOrder(paypalOrderId);
    // Fulfillment is done exclusively by the webhook — not here.
    // Return status so the client can redirect to the success page.
    return NextResponse.json({ status: result.status });
  } catch (err) {
    console.error("PayPal capture error:", err);
    return NextResponse.json({ error: "Could not capture PayPal order." }, { status: 502 });
  }
}
