"use client";

import { useActionState } from "react";
import { createCheckoutSession, type CheckoutState } from "@/lib/actions/checkout";
import { Button } from "@/components/ui/Button";

const initialState: CheckoutState = {};

interface StripeCheckoutButtonProps {
  email: string;
  disabled?: boolean;
}

export function StripeCheckoutButton({ email, disabled }: StripeCheckoutButtonProps) {
  const [state, formAction, isPending] = useActionState(createCheckoutSession, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="email" value={email} />
      {state.error && (
        <div className="mb-3 rounded-brand border border-gold/40 bg-gold/5 p-3 text-sm text-ink">
          {state.error}
        </div>
      )}
      <Button
        type="submit"
        size="lg"
        disabled={disabled || isPending}
        className="w-full"
      >
        {isPending ? "Redirecting…" : "Pay with Card or Vipps"}
      </Button>
    </form>
  );
}
