"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import { useCart } from "@/components/cart/CartContext";
import { CartIcon, CloseIcon, MenuIcon } from "./icons";

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

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-heading text-xl tracking-tight text-ink">
            {SITE_NAME}
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm tracking-wide transition-colors duration-200 ${
                    active ? "font-medium text-emerald" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              aria-label={`View cart${count > 0 ? ` (${count} item${count === 1 ? "" : "s"})` : ""}`}
              className="relative rounded-brand p-2 text-ink transition-colors duration-200 hover:text-emerald"
            >
              <CartIcon />
              {count > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald text-[10px] font-medium text-cream">
                  {count}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="rounded-brand p-2 text-ink transition-colors duration-200 hover:text-emerald lg:hidden"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu — rendered outside <header> so it isn't trapped in its stacking context */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[9999] flex flex-col bg-ink transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Top bar */}
        <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-white/10 px-6">
          <span className="font-heading text-xl tracking-tight text-cream">{SITE_NAME}</span>
          <div className="flex items-center gap-1">
            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
              aria-label={`View cart${count > 0 ? ` (${count} item${count === 1 ? "" : "s"})` : ""}`}
              className="relative rounded-brand p-2 text-cream/70 transition-colors hover:text-gold"
            >
              <CartIcon />
              {count > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-medium text-ink">
                  {count}
                </span>
              )}
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="rounded-brand p-2 text-cream/70 transition-colors hover:text-gold"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Nav links — centred vertically in the remaining space */}
        <nav className="flex flex-1 flex-col justify-center px-8">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b border-white/10 py-5 font-heading text-2xl transition-colors duration-200 ${
                  active ? "text-gold" : "text-cream hover:text-gold"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom CTAs */}
        <div className="flex-shrink-0 space-y-3 px-8 pb-10 pt-6">
          <Link
            href="/coaching"
            onClick={() => setMenuOpen(false)}
            className="block w-full rounded-brand bg-gold py-3.5 text-center text-sm font-semibold text-ink transition-opacity hover:opacity-90"
          >
            Book a Coaching Call
          </Link>
          <Link
            href="/shop"
            onClick={() => setMenuOpen(false)}
            className="block w-full rounded-brand border border-white/20 py-3.5 text-center text-sm font-medium text-cream transition-colors hover:border-white/50 hover:text-gold"
          >
            Browse the Shop
          </Link>
        </div>
      </div>
    </>
  );
}
