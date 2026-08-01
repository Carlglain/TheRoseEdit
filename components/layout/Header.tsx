"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRIMARY_NAV, SIDEBAR_NAV, SITE_NAME } from "@/lib/constants";
import { useCart } from "@/components/cart/CartContext";
import { CartIcon, CloseIcon, MenuIcon } from "./icons";

const SIDEBAR_BG =
  "linear-gradient(165deg, #062816 0%, #0B3D2C 45%, #1A6B45 100%)";

function SidebarNav({
  pathname,
  onNavigate,
  compact = false,
}: {
  pathname: string;
  onNavigate?: () => void;
  compact?: boolean;
}) {
  return (
    <>
      <p
        className={`mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald ${
          compact ? "px-1" : ""
        }`}
      >
        Explore
      </p>
      <nav className="relative flex flex-col gap-0.5" aria-label="Sidebar">
        {SIDEBAR_NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`rounded-brand px-3 py-3 font-heading transition-all duration-200 ${
                compact ? "text-lg" : "text-xl px-4 py-3.5"
              } ${
                active
                  ? "bg-white/10 text-gold"
                  : "text-cream/90 hover:bg-white/5 hover:text-gold"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

function SidebarCtas({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="mt-auto space-y-3 pt-8">
      <Link
        href="/coaching"
        onClick={onNavigate}
        className="block w-full rounded-brand bg-gold px-5 py-4 text-center text-sm font-semibold leading-snug text-ink transition-opacity hover:opacity-90"
      >
        Book a Coaching Call
      </Link>
      <Link
        href="/shop"
        onClick={onNavigate}
        className="block w-full rounded-brand border border-white/20 px-5 py-4 text-center text-sm font-medium text-cream transition-colors hover:border-gold/50 hover:text-gold"
      >
        Browse the Shop
      </Link>
    </div>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();

  const [menuPathname, setMenuPathname] = useState(pathname);
  if (pathname !== menuPathname) {
    setMenuPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      {/* ── Permanent left sidebar (lg+) ───────────────────────────── */}
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-[var(--sidebar-w)] flex-col border-r border-white/10 lg:flex"
        style={{ background: SIDEBAR_BG }}
        aria-label="Main navigation"
      >
        <div className="flex h-[4.25rem] flex-shrink-0 items-center border-b border-white/10 px-5">
          <Link
            href="/"
            className="font-heading text-lg tracking-tight text-cream transition-colors hover:text-gold"
          >
            {SITE_NAME}
          </Link>
        </div>

        <div className="relative flex flex-1 flex-col overflow-y-auto px-4 py-6">
          <div
            className="pointer-events-none absolute -left-10 top-24 h-40 w-40 rounded-full opacity-25"
            style={{
              background: "radial-gradient(circle, rgba(47,158,87,0.55) 0%, transparent 70%)",
            }}
          />
          <SidebarNav pathname={pathname} compact />
          <SidebarCtas />
        </div>
      </aside>

      {/* ── Top bar ────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-line/80 bg-cream/90 backdrop-blur-md lg:ml-[var(--sidebar-w)]">
        <div className="flex h-[4.25rem] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="font-heading text-[1.35rem] tracking-tight text-ink transition-colors hover:text-emerald sm:text-xl"
          >
            {SITE_NAME}
          </Link>

          <div className="ml-auto flex items-center gap-1 sm:gap-2 md:gap-5">
            <nav className="flex items-center gap-1 sm:gap-2 md:gap-6" aria-label="Primary">
              {PRIMARY_NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-brand px-3 py-2 text-sm tracking-wide transition-colors duration-200 ${
                      active
                        ? "font-semibold text-emerald"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mx-1 hidden h-5 w-px bg-line sm:block" aria-hidden="true" />

            <Link
              href="/cart"
              aria-label={`View cart${count > 0 ? ` (${count} item${count === 1 ? "" : "s"})` : ""}`}
              className="relative rounded-brand p-2.5 text-ink transition-colors duration-200 hover:bg-line/50 hover:text-emerald"
            >
              <CartIcon />
              {count > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald px-1 text-[10px] font-semibold text-white">
                  {count}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-sidebar"
              onClick={() => setMenuOpen((o) => !o)}
              className="rounded-brand p-2.5 text-ink transition-colors duration-200 hover:bg-line/50 hover:text-emerald lg:hidden"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer (small screens only) ─────────────────────── */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[60] bg-forest/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        id="mobile-sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-y-0 left-0 z-[70] flex w-[min(100%,20rem)] flex-col border-r border-white/10 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: SIDEBAR_BG }}
      >
        <div className="flex h-[4.25rem] flex-shrink-0 items-center justify-between border-b border-white/10 px-5">
          <span className="font-heading text-lg tracking-tight text-cream">{SITE_NAME}</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="rounded-brand p-2 text-cream/70 transition-colors hover:bg-white/10 hover:text-cream"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="relative flex flex-1 flex-col overflow-y-auto px-5 py-6">
          <SidebarNav pathname={pathname} onNavigate={() => setMenuOpen(false)} />
          <SidebarCtas onNavigate={() => setMenuOpen(false)} />
        </div>
      </aside>
    </>
  );
}
