import Link from "next/link";
import { LEGAL_LINKS, SITE_NAME } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
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
  return (
    <footer className="border-t border-line bg-white text-center">
      <Container className="py-14 md:py-16">
        <p className="text-base font-semibold text-hotpink sm:text-lg">
          <span className="italic">Let&apos;s get you started!</span>{" "}
          <Link href="/coaching" className="underline-offset-2 hover:underline">
            Book your 1:1 coaching call today.
          </Link>
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {PAYMENT_METHODS.map(({ name, Icon }) => (
            <span
              key={name}
              className="flex items-center gap-1.5 rounded border border-line px-2.5 py-1.5 text-xs text-muted"
            >
              <Icon />
              {name}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="mt-6 text-xs text-hotpink/80">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
