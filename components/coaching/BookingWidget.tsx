"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { CalEmbed } from "@/components/coaching/CalEmbed";
import {
  createCoachingCheckoutSession,
  type CoachingCheckoutState,
} from "@/lib/actions/coachingCheckout";

export type BookingMode = "embed" | "pay-first" | "contact";

interface BookingWidgetProps {
  mode: BookingMode;
  bookingUrl?: string;
}

const initialState: CoachingCheckoutState = {};

export function BookingWidget({ mode, bookingUrl }: BookingWidgetProps) {
  if (mode === "embed") {
    return <CalEmbed bookingUrl={bookingUrl ?? ""} />;
  }
  if (mode === "pay-first") {
    return <PayFirstWidget />;
  }
  return <ContactWidget />;
}

function PayFirstWidget() {
  const [state, formAction, isPending] = useActionState(
    createCoachingCheckoutSession,
    initialState
  );

  return (
    <form action={formAction} className="mx-auto max-w-sm space-y-4">
      <div>
        <label htmlFor="coaching-email" className="mb-2 block text-sm font-medium text-ink">
          Your email address
        </label>
        <input
          id="coaching-email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          className="w-full rounded-brand border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted transition-colors duration-200 focus:border-emerald focus:outline-none"
        />
        <p className="mt-2 text-xs text-muted">
          Your receipt and session details will be sent here.
        </p>
      </div>

      {state.error && (
        <div className="rounded-brand border border-gold/40 bg-gold/5 p-3 text-sm text-ink">
          {state.error}
        </div>
      )}

      <Button type="submit" size="lg" variant="gold" disabled={isPending} className="w-full">
        {isPending ? "Redirecting…" : "Book & Pay — $120"}
      </Button>

      <p className="text-center text-xs text-muted">
        Secure checkout via Stripe. After payment you will pick your session time on the calendar.
      </p>
    </form>
  );
}

function ContactWidget() {
  return (
    <div className="mx-auto max-w-sm text-center">
      <p className="text-muted">
        Ready to book? Reach out through the contact form with the subject{" "}
        <strong className="font-medium text-ink">&ldquo;Coaching Call&rdquo;</strong> and we will
        send you available slots within 24 hours.
      </p>
      <div className="mt-6">
        <Button href="/contact" variant="gold" size="lg">
          Contact to Book
        </Button>
      </div>
    </div>
  );
}
