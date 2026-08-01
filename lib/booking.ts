/**
 * Booking helpers for Cal.com (and generic scheduler URLs).
 *
 * BOOKING_URL may be:
 * - Full Cal.com URL: https://cal.com/username/45min
 * - Cal link path:     username/45min
 * - Other scheduler:   https://calendly.com/... (iframe fallback)
 */

export function getCalLink(bookingUrl: string): string | null {
  const raw = bookingUrl.trim();
  if (!raw) return null;

  // Already a cal link path (username/event-slug)
  if (/^[\w.-]+\/[\w.-]+(?:\/[\w.-]+)?$/.test(raw) && !raw.includes("://")) {
    return raw;
  }

  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./, "");
    const isCal =
      host === "cal.com" ||
      host === "app.cal.com" ||
      host.endsWith(".cal.com") ||
      host === "cal.dev" ||
      host.endsWith(".cal.dev");

    if (!isCal) return null;

    const path = url.pathname.replace(/^\/+|\/+$/g, "");
    return path || null;
  } catch {
    return null;
  }
}

export function getBookingHref(bookingUrl: string): string {
  const raw = bookingUrl.trim();
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  const calLink = getCalLink(raw);
  return calLink ? `https://cal.com/${calLink}` : raw;
}
