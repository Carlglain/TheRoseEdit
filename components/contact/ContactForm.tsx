"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = {};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  if (state.success) {
    return (
      <div className="rounded-brand border border-emerald/30 bg-emerald/5 p-6 text-center">
        <p className="font-heading text-lg text-ink">Message received.</p>
        <p className="mt-2 text-sm text-muted">
          Thank you for reaching out — Rose will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real users, traps bots. Obscure name avoids autofill. */}
      <div aria-hidden="true" tabIndex={-1} style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
        <label htmlFor="company_url_hp">Company URL</label>
        <input
          id="company_url_hp"
          name="company_url_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={`w-full rounded-brand border px-4 py-3 text-sm text-ink placeholder:text-muted transition-colors duration-200 focus:outline-none ${
              state.fieldErrors?.name
                ? "border-gold/60 bg-gold/5 focus:border-gold"
                : "border-line bg-white focus:border-emerald"
            }`}
          />
          {state.fieldErrors?.name && (
            <p className="mt-1.5 text-xs text-muted">{state.fieldErrors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="your@email.com"
            className={`w-full rounded-brand border px-4 py-3 text-sm text-ink placeholder:text-muted transition-colors duration-200 focus:outline-none ${
              state.fieldErrors?.email
                ? "border-gold/60 bg-gold/5 focus:border-gold"
                : "border-line bg-white focus:border-emerald"
            }`}
          />
          {state.fieldErrors?.email && (
            <p className="mt-1.5 text-xs text-muted">{state.fieldErrors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="What can Rose help you with?"
          className={`w-full resize-none rounded-brand border px-4 py-3 text-sm text-ink placeholder:text-muted transition-colors duration-200 focus:outline-none ${
            state.fieldErrors?.message
              ? "border-gold/60 bg-gold/5 focus:border-gold"
              : "border-line bg-white focus:border-emerald"
          }`}
        />
        {state.fieldErrors?.message && (
          <p className="mt-1.5 text-xs text-muted">{state.fieldErrors.message}</p>
        )}
      </div>

      {state.error && !state.fieldErrors && (
        <div className="rounded-brand border border-gold/40 bg-gold/5 p-3 text-sm text-ink">
          {state.error}
        </div>
      )}

      <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? "Sending…" : "Send Message"}
      </Button>

      <p className="text-xs text-muted">We typically respond within 24 hours.</p>
    </form>
  );
}
