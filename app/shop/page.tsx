import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductTypeFilter } from "@/components/ui/ProductTypeFilter";
import { ComingSoonState } from "@/components/ui/ComingSoonState";
import type { Metadata } from "next";
import { getProductsSafe } from "@/lib/products";
import type { ProductType } from "@/types";

export const metadata: Metadata = {
  title: "Shop — Digital Products",
  description:
    "E-books, courses, and curated vendor lists to help you build, grow, and protect wealth. Instant digital delivery.",
  openGraph: {
    title: "Shop — RoseAudit Digital Products",
    description: "E-books, courses, and curated tools for wealth architecture. Instant delivery.",
  },
};

const VALID_TYPES: ProductType[] = ["ebook", "course", "vendor_list"];

interface ShopPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { type } = await searchParams;
  const activeType = VALID_TYPES.includes(type as ProductType) ? (type as ProductType) : undefined;
  const products = await getProductsSafe(activeType);

  return (
    <main>
      <Section>
        <Container>
          <div className="mb-10 max-w-xl">
            <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-gold">
              All Products
            </span>
            <Heading level={1}>The Shop</Heading>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Digital products and tools to help you build, grow, and protect wealth.
            </p>
          </div>

          <div className="mb-10">
            <ProductTypeFilter active={activeType ?? "all"} />
          </div>

          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <ComingSoonState
              title="Nothing Here Yet"
              description="We couldn't find any products matching this filter — check back soon, or browse another category."
              source="shop-empty"
            />
          )}
        </Container>
      </Section>
    </main>
  );
}
