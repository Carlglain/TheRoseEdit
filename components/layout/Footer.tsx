import Link from "next/link";
import { LEGAL_LINKS, NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "./NewsletterForm";
import {
  VisaIcon,
  MastercardIcon,
  VippsIcon,
  ApplePayIcon,
  PayPalIcon,
} from "@/components/ui/PaymentIcons";

const PAYMENT_METHODS = [
  { name: "Visa", Icon: VisaIcon },
  { name: "Mastercard", Icon: MastercardIcon },
  { name: "Vipps", Icon: VippsIcon },
  { name: "Apple Pay", Icon: ApplePayIcon },
  { name: "PayPal", Icon: PayPalIcon },
];

export function Footer() {
  const whatsappUrl = process.env.CONTACT_WHATSAPP ?? "";

  return (
    <footer className="bg-ink text-cream">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div>
            <span className="font-heading text-xl tracking-tight">{SITE_NAME}</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">
              Corporate-grade financial strategy for homes, businesses, and the next generation.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm">
              <Link
                href="/contact"
                className="text-cream/70 transition-colors duration-200 hover:text-gold"
              >
                Contact us
              </Link>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/70 transition-colors duration-200 hover:text-gold"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-cream/50">
              Navigate
            </span>
            <ul className="mt-4 grid grid-cols-2 gap-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/70 transition-colors duration-200 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-cream/50">
              Stay Connected
            </span>
            <p className="mt-4 text-sm leading-relaxed text-cream/60">
              Join the community of wealth architects. No spam, ever.
            </p>
            <div className="mt-4">
              <NewsletterForm source="footer" />
            </div>
          </div>
        </div>

        <div className="my-10 h-px bg-white/10" />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {PAYMENT_METHODS.map(({ name, Icon }) => (
              <span
                key={name}
                className="flex items-center gap-1.5 rounded-brand border border-white/10 px-2 py-1 text-xs text-cream/60"
              >
                <Icon />
                {name}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-cream/60">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-cream/50">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
