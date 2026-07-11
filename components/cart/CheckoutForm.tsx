"use client";

import { useActionState } from "react";
import { createCheckoutSession, type CheckoutState } from "@/lib/actions/checkout";
import { Button } from "@/components/ui/Button";

const initialState: CheckoutState = {};

export function CheckoutForm() {
  const [state, formAction, isPending] = useActionState(createCheckoutSession, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          className="w-full rounded-brand border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted transition-colors duration-200 focus:border-emerald focus:outline-none"
        />
        <p className="mt-2 text-xs text-muted">
          Your receipt and download link will be sent here.
        </p>
      </div>

      {state.error && (
        <div className="rounded-brand border border-gold/40 bg-gold/5 p-3 text-sm text-ink">
          {state.error}
        </div>
      )}

      <Button type="submit" size="lg" disabled={isPending} className="w-full">
        {isPending ? "Redirecting…" : "Proceed to Checkout"}
      </Button>
    </form>
  );
}
