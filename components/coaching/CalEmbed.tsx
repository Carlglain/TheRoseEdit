"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { getBookingHref, getCalLink } from "@/lib/booking";

interface CalEmbedProps {
  bookingUrl: string;
  /** Taller layout after payment so the calendar is the main focus */
  compact?: boolean;
}

export function CalEmbed({ bookingUrl, compact = false }: CalEmbedProps) {
  const calLink = getCalLink(bookingUrl);
  const href = getBookingHref(bookingUrl);

  useEffect(() => {
    if (!calLink) return;
    (async () => {
      const cal = await getCalApi({ namespace: "roseaudit" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#1B9451" },
          dark: { "cal-brand": "#1B9451" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [calLink]);

  if (!bookingUrl) {
    return (
      <p className="text-center text-sm text-muted">
        Scheduling is not configured yet. Please use the{" "}
        <a href="/contact" className="text-emerald underline underline-offset-2">
          contact form
        </a>
        .
      </p>
    );
  }

  if (calLink) {
    return (
      <div>
        <div
          className="overflow-hidden rounded-brand border border-line bg-white"
          style={{ minHeight: compact ? 560 : 680 }}
        >
          <Cal
            namespace="roseaudit"
            calLink={calLink}
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", theme: "light" }}
          />
        </div>
        <p className="mt-3 text-center text-xs text-muted">
          Calendar not loading?{" "}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            Open in a new tab →
          </a>
        </p>
      </div>
    );
  }

  // Non-Cal.com schedulers: iframe fallback
  return (
    <div>
      <iframe
        src={href}
        className="w-full rounded-brand border border-line bg-white"
        style={{ minHeight: compact ? 560 : 680 }}
        title="Book your 1:1 coaching call"
        loading="lazy"
        allow="camera; microphone; fullscreen"
      />
      <p className="mt-3 text-center text-xs text-muted">
        Calendar not loading?{" "}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald underline underline-offset-2 transition-opacity hover:opacity-80"
        >
          Open in a new tab →
        </a>
      </p>
    </div>
  );
}
