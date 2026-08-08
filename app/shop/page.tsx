import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ProductCard } from "@/components/ui/ProductCard";
import { ComingSoonState } from "@/components/ui/ComingSoonState";
import type { Metadata } from "next";
import { getShopProductsSafe } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop — Digital Products",
  description:
    "Practical digital tools, resources, and vendor lists to help you build wealth. Instant digital delivery.",
  openGraph: {
    title: "Shop — RoseAudit Digital Products",
    description: "Practical digital tools and vendor lists for wealth architecture.",
  },
};

export default async function ShopPage() {
  const products = await getShopProductsSafe();

  return (
    <main>
      <Section>
        <Container>
          <div className="mb-10 max-w-xl">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-hotpink">
              Shop
            </span>
            <Heading level={1}>The Shop</Heading>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Digital tools and resources for building wealth.
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <ComingSoonState
              title="Shop Coming Soon"
              description="New digital tools and resources are on the way."
              source="shop-coming-soon"
            />
          )}

          {/* Vendors live under Shop — not a top-level tab */}
          <div className="mt-16 border-t border-line pt-12">
            <h2 className="text-thick-black text-3xl sm:text-4xl">Vendor Lists</h2>
            <p className="mt-3 max-w-lg text-muted">
              Curated vendor lists for building and scaling your business.
            </p>
            <Link
              href="/vendors"
              className="mt-6 inline-flex items-center justify-center rounded-brand border-2 border-ink px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Browse Vendor Lists →
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
