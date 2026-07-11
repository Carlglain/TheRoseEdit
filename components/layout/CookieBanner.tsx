"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "roseaudit_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (private browsing, etc.) — don't show banner
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-cream/98 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm leading-relaxed text-muted">
          We use one essential cookie to remember your shopping cart.{" "}
          <Link href="/legal/privacy" className="text-emerald underline underline-offset-2 hover:opacity-80 transition-opacity">
            Privacy Policy
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="flex-shrink-0 rounded-brand bg-ink px-5 py-2.5 text-sm font-medium text-cream transition-colors duration-200 hover:bg-ink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
