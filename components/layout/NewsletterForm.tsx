"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { subscribeLead } from "@/lib/actions/leads";

interface NewsletterFormProps {
  theme?: "dark" | "light";
  source?: string;
}

export function NewsletterForm({ theme = "dark", source = "newsletter" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await subscribeLead({ email, source });
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error ?? "Something went wrong.");
      }
    });
  }

  if (status === "success") {
    return (
      <p className={`text-sm ${theme === "dark" ? "text-cream/70" : "text-muted"}`}>
        Thank you — check your inbox soon.
      </p>
    );
  }

  const inputClasses =
    theme === "dark"
      ? "border-white/15 bg-white/5 text-cream placeholder:text-cream/40 focus:border-gold/60"
      : "border-line bg-white text-ink placeholder:text-muted focus:border-emerald";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="flex-1">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="Email address"
          disabled={isPending}
          className={`w-full rounded-brand border px-4 py-2.5 text-sm transition-colors duration-200 focus:outline-none disabled:opacity-60 ${inputClasses}`}
        />
        {status === "error" && (
          <p className={`mt-2 text-xs ${theme === "dark" ? "text-cream/60" : "text-muted"}`}>{errorMessage}</p>
        )}
      </div>
      <Button
        type="submit"
        variant={theme === "dark" ? "gold" : "primary"}
        size="sm"
        disabled={isPending}
        className="whitespace-nowrap"
      >
        {isPending ? "Submitting…" : "Subscribe"}
      </Button>
    </form>
  );
}
