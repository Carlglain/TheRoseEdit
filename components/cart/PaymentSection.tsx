"use client";

import { useState } from "react";
import { StripeCheckoutButton } from "@/components/cart/StripeCheckoutButton";
import { PayPalCheckoutButtons } from "@/components/cart/PayPalCheckoutButtons";

export function PaymentSection() {
  const [email, setEmail] = useState("");
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="checkout-email" className="mb-2 block text-sm font-medium text-ink">
          Email address
        </label>
        <input
          id="checkout-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full rounded-brand border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted transition-colors duration-200 focus:border-emerald focus:outline-none"
        />
        <p className="mt-2 text-xs text-muted">
          Your receipt and download link will be sent here.
        </p>
      </div>

      <StripeCheckoutButton email={email} disabled={!emailValid} />

      {process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID && (
        <>
          <div className="relative flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-line" />
            <span className="text-xs text-muted">or pay with PayPal</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <PayPalCheckoutButtons email={email} disabled={!emailValid} />
        </>
      )}
    </div>
  );
}
