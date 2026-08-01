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
    "Practical digital tools and resources to help you build, grow, and protect wealth. Instant digital delivery.",
  openGraph: {
    title: "Shop — RoseAudit Digital Products",
    description: "Practical digital tools for wealth architecture. Instant delivery.",
  },
};

export default async function ShopPage() {
  const products = await getShopProductsSafe();

  return (
    <main>
      <Section>
        <Container>
          <div className="mb-10 max-w-xl">
            <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-gold">
              Shop
            </span>
            <Heading level={1}>The Shop</Heading>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Digital tools and resources for building wealth. E-books, courses, and vendor
              lists live in their own sections.
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
              description="New digital tools and resources are on the way. Be the first to know when they launch."
              source="shop-coming-soon"
            />
          )}
        </Container>
      </Section>
    </main>
  );
}
