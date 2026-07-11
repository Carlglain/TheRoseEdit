import "server-only";
import type { Product } from "@/types";

const PAYPAL_BASE_URL =
  process.env.PAYPAL_ENVIRONMENT === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

function getCredentials() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Missing PayPal env vars: PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET must be set.");
  }
  return { clientId, clientSecret };
}

export async function getPayPalAccessToken(): Promise<string> {
  const { clientId, clientSecret } = getCredentials();
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal OAuth failed (${res.status}): ${text}`);
  }

  const json = (await res.json()) as { access_token: string };
  return json.access_token;
}

export async function createPayPalOrder(
  products: Pick<Product, "name" | "priceMinor" | "currency">[],
  currency: string
): Promise<string> {
  const accessToken = await getPayPalAccessToken();

  const itemTotal = products.reduce((sum, p) => sum + p.priceMinor, 0);
  const itemTotalDecimal = (itemTotal / 100).toFixed(2);

  const items = products.map((p) => ({
    name: p.name,
    unit_amount: { currency_code: currency, value: (p.priceMinor / 100).toFixed(2) },
    quantity: "1",
  }));

  const body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: itemTotalDecimal,
          breakdown: {
            item_total: { currency_code: currency, value: itemTotalDecimal },
          },
        },
        items,
      },
    ],
  };

  const res = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal create order failed (${res.status}): ${text}`);
  }

  const json = (await res.json()) as { id: string };
  return json.id;
}

export async function capturePayPalOrder(paypalOrderId: string): Promise<{ status: string }> {
  const accessToken = await getPayPalAccessToken();

  const res = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal capture failed (${res.status}): ${text}`);
  }

  const json = (await res.json()) as { status: string };
  return { status: json.status };
}

export async function verifyPayPalWebhookSignature(params: {
  authAlgo: string;
  certUrl: string;
  transmissionId: string;
  transmissionSig: string;
  transmissionTime: string;
  webhookId: string;
  rawBody: string;
}): Promise<boolean> {
  const accessToken = await getPayPalAccessToken();

  const body = {
    auth_algo: params.authAlgo,
    cert_url: params.certUrl,
    transmission_id: params.transmissionId,
    transmission_sig: params.transmissionSig,
    transmission_time: params.transmissionTime,
    webhook_id: params.webhookId,
    webhook_event: JSON.parse(params.rawBody),
  };

  const res = await fetch(
    `${PAYPAL_BASE_URL}/v1/notifications/verify-webhook-signature`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal webhook verification request failed (${res.status}): ${text}`);
  }

  const json = (await res.json()) as { verification_status: string };
  return json.verification_status === "SUCCESS";
}
