import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ComingSoonState } from "@/components/ui/ComingSoonState";
import { formatPrice } from "@/lib/format";
import { getProductsSafe } from "@/lib/products";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "E-Books",
  description: "Practical, no-fluff guides for building and protecting wealth from RoseAudit.",
};

function FeaturedEbook({ product }: { product: Product }) {
  const available = !product.isComingSoon;

  return (
    <Reveal>
      <article className="overflow-hidden rounded-brand border border-line bg-white shadow-[0_18px_50px_-28px_rgba(11,61,44,0.35)]">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[4/3] bg-line md:aspect-auto md:min-h-[360px]">
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
              <div className="flex h-full min-h-[280px] items-center justify-center">
                <BookOpen className="text-muted/40" size={48} strokeWidth={1.25} />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Featured Guide
            </p>
            <h2 className="mt-3 font-heading text-3xl font-light leading-tight text-ink md:text-4xl">
              {product.name}
            </h2>
            {product.description ? (
              <p className="mt-4 line-clamp-4 text-base leading-relaxed text-muted">
                {product.description}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="font-heading text-2xl text-ink">
                {formatPrice(product.priceMinor, product.currency)}
              </span>
              {available ? (
                <Button href={`/products/${product.slug}`} size="lg">
                  View Guide
                </Button>
              ) : (
                <span className="text-sm text-muted">Coming Soon</span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function EbookCard({ product }: { product: Product }) {
  const available = !product.isComingSoon;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-brand border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald/40 hover:shadow-[0_20px_40px_-24px_rgba(11,61,44,0.4)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-line">
        {!available && (
          <span className="absolute right-3 top-3 z-10 bg-cream/95 px-2.5 py-1 text-[11px] font-medium tracking-wide text-muted">
            Coming Soon
          </span>
        )}
        {product.coverImageUrl ? (
          <Image
            src={product.coverImageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen className="text-muted/35" size={36} strokeWidth={1.25} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">E-Book</p>
        <h3 className="mt-2 font-heading text-xl font-light leading-snug text-ink">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="text-sm font-semibold text-ink">
            {formatPrice(product.priceMinor, product.currency)}
          </span>
          <span className="text-sm font-medium text-emerald transition-colors group-hover:text-forest">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function EbooksPage() {
  const products = await getProductsSafe("ebook");
  const [featured, ...rest] = products;

  return (
    <main>
      <section
        className="relative overflow-hidden py-16 md:py-20"
        style={{
          background: "linear-gradient(155deg, #062816 0%, #0B3D2C 50%, #1A6B45 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(47,158,87,0.35), transparent 60%)",
          }}
        />
        <Container className="relative z-10">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Digital Guides
            </p>
            <Heading level={1} className="mt-4 text-white">
              E-Books
            </Heading>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/65">
              Practical, no-fluff guides for building and protecting wealth — written to be
              used, not just read.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="section-soft py-16 md:py-24">
        <Container>
          {products.length === 0 ? (
            <ComingSoonState
              title="E-Books Are Coming Soon"
              description="New guides are on the way. Be the first to know when they launch."
              source="ebooks-coming-soon"
            />
          ) : products.length === 1 && featured ? (
            <FeaturedEbook product={featured} />
          ) : (
            <div className="space-y-10">
              {featured ? <FeaturedEbook product={featured} /> : null}
              {rest.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((product, i) => (
                    <Reveal key={product.id} delay={i * 80}>
                      <EbookCard product={product} />
                    </Reveal>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
