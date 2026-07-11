import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { ShieldCheck, Zap, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { BuyNowButton } from "@/components/cart/BuyNowButton";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { PRODUCT_TYPE_LABELS } from "@/lib/constants";

// Known products get a hand-written feature breakdown; others fall back to the plain
// description — PROJECT_CONTEXT.md §5 only spells out this detail for Product 1.
const PRODUCT_FEATURES: Record<string, string[]> = {
  "rebrand-to-resell": [
    "The Rebrand to Resell Master Guide — a step-by-step customization workflow, from file download to launch",
    "Plug-and-Play Rebranding Checklist — headers, footers, licensing, visuals, compliance",
    "High-Converting Product Description Templates — fill-in-the-blank premium sales copy",
  ],
};

const TRUST_SIGNALS = [
  { Icon: ShieldCheck, label: "Secure checkout", sub: "Stripe & PayPal" },
  { Icon: Zap, label: "Instant delivery", sub: "Digital download" },
  { Icon: Building2, label: "Norwegian business", sub: "Registered & compliant" },
];

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// A fetch failure (e.g. Supabase unreachable) is treated the same as "not found" — there's no
// meaningful product page to render either way. getProductBySlug is cache()-wrapped, so this
// only hits the database once per request even though both generateMetadata and the page call it.
async function loadProduct(slug: string) {
  try {
    return await getProductBySlug(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) return {};

  return {
    title: `${product.name} — RoseAudit`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      ...(product.coverImageUrl ? { images: [product.coverImageUrl] } : {}),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await loadProduct(slug);

  if (!product || !product.isPublished) {
    notFound();
  }

  const features = PRODUCT_FEATURES[product.slug];
  const priceLabel = formatPrice(product.priceMinor, product.currency);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    ...(product.coverImageUrl ? { image: product.coverImageUrl } : {}),
    offers: {
      "@type": "Offer",
      price: (product.priceMinor / 100).toFixed(2),
      priceCurrency: product.currency,
      availability: product.isComingSoon
        ? "https://schema.org/PreOrder"
        : "https://schema.org/InStock",
    },
  };

  return (
    <main>
      <Section>
        <Container>
          <script
            type="application/ld+json"
            // Escape "<" so a description containing "</script>" can't break out of this tag.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
          />

          <div className="grid gap-12 md:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-brand bg-line">
              {product.coverImageUrl ? (
                <Image
                  src={product.coverImageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-sm text-muted">Cover Image</span>
                </div>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="gold">{PRODUCT_TYPE_LABELS[product.type]}</Badge>
                {product.isComingSoon && <Badge variant="default">Coming Soon</Badge>}
              </div>

              <Heading level={1} className="mt-6">
                {product.name}
              </Heading>

              <p className="mt-4 text-2xl text-ink">{priceLabel}</p>

              {features ? (
                <ul className="mt-6 space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 leading-relaxed text-muted">{product.description}</p>
              )}

              {product.isComingSoon ? (
                <div className="mt-8 max-w-sm">
                  <NewsletterForm theme="light" source={`product-${product.slug}`} />
                  <p className="mt-3 text-xs text-muted">
                    Be the first to know when this is available.
                  </p>
                </div>
              ) : (
                <div className="mt-8 flex flex-wrap gap-4">
                  <BuyNowButton productId={product.id} />
                  <AddToCartButton productId={product.id} />
                </div>
              )}

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
                {TRUST_SIGNALS.map(({ Icon, label, sub }) => (
                  <div key={label} className="flex flex-col items-center gap-2 text-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald/10">
                      <Icon size={18} strokeWidth={1.5} className="text-emerald" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-ink">{label}</p>
                      <p className="text-xs text-muted">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
