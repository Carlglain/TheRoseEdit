import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { CartProvider } from "@/components/cart/CartContext";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RoseAudit — Wealth Architecture for Generational Legacy",
    template: "%s — RoseAudit",
  },
  description:
    "Premium financial coaching and digital products from Rose M. Apabeloi, State-Authorized Accountant. Corporate-grade financial strategy for homes, businesses, and the next generation.",
  keywords: ["financial coaching", "wealth architecture", "PLR products", "Norwegian accountant", "personal finance"],
  authors: [{ name: "Rose M. Apabeloi" }],
  creator: "Rose M. Apabeloi",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "RoseAudit",
    title: "RoseAudit — Wealth Architecture for Generational Legacy",
    description:
      "Premium financial coaching and digital products from Rose M. Apabeloi, State-Authorized Accountant.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoseAudit — Wealth Architecture for Generational Legacy",
    description:
      "Premium financial coaching and digital products from Rose M. Apabeloi, State-Authorized Accountant.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${sourceSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {/* Skip navigation — visible only on keyboard focus */}
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-brand focus-visible:bg-emerald focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-cream focus-visible:no-underline focus-visible:shadow-lg"
        >
          Skip to main content
        </a>

        <CartProvider>
          <Header />
          <div id="main-content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </div>
          <Footer />
        </CartProvider>

        <CookieBanner />
      </body>
    </html>
  );
}
