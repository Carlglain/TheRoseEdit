"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRIMARY_NAV, SITE_NAME } from "@/lib/constants";
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
      <header className="sticky top-0 z-50 bg-ink text-white">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-10">
          <Link
            href="/"
            className="shrink-0 font-heading text-lg tracking-tight text-white transition-opacity hover:opacity-80 sm:text-xl"
          >
            {SITE_NAME}
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex xl:gap-2"
            aria-label="Primary"
          >
            {PRIMARY_NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-brand px-2.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors xl:px-3 ${
                    active ? "text-pink" : "text-white/85 hover:text-cyan"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/cart"
              aria-label={`View cart${count > 0 ? ` (${count} item${count === 1 ? "" : "s"})` : ""}`}
              className="relative rounded-brand p-2.5 text-white transition-colors hover:text-cyan"
            >
              <CartIcon />
              {count > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-hotpink px-1 text-[10px] font-semibold text-white">
                  {count}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
              className="rounded-brand p-2.5 text-white transition-colors hover:text-cyan lg:hidden"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[70] bg-ink transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <span className="font-heading text-lg text-white">{SITE_NAME}</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="p-2.5 text-white"
          >
            <CloseIcon />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-6 pt-8" aria-label="Mobile">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`border-b border-white/10 py-4 text-2xl font-semibold uppercase tracking-wide ${
                pathname === item.href ? "text-pink" : "text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
