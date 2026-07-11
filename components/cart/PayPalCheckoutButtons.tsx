"use client";

import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalCheckoutButtonsProps {
  email: string;
  disabled?: boolean;
}

export function PayPalCheckoutButtons({ email, disabled }: PayPalCheckoutButtonsProps) {
  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) return null;

  return (
    <PayPalScriptProvider options={{ clientId, currency: "USD" }}>
      <div style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? "none" : "auto" }}>
        <PayPalButtons
          style={{ layout: "vertical", shape: "rect", label: "pay", height: 48 }}
          createOrder={async () => {
            const res = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            });
            if (!res.ok) {
              const err = (await res.json()) as { error?: string };
              throw new Error(err.error ?? "Could not create order.");
            }
            const data = (await res.json()) as { id: string };
            return data.id;
          }}
          onApprove={async (data) => {
            await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paypalOrderId: data.orderID }),
            });
            // Redirect to success page — fulfillment happens via webhook, not here.
            router.push(`/checkout/success?paypal_order_id=${data.orderID}`);
          }}
          onError={(err) => {
            console.error("PayPal Buttons error:", err);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}
