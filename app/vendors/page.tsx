import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageIntro } from "@/components/ui/PageIntro";
import { ProductCard } from "@/components/ui/ProductCard";
import { ComingSoonState } from "@/components/ui/ComingSoonState";
import { getProductsSafe } from "@/lib/products";

export default async function VendorsPage() {
  const products = await getProductsSafe("vendor_list");

  return (
    <main>
      <Section>
        <Container>
          <div className="mb-12">
            <PageIntro
              eyebrow="Vendor Lists"
              title="Vendor Lists"
              description="Curated, vetted vendor lists for sourcing and reselling."
            />
          </div>

          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <ComingSoonState
              title="Vendor Lists Are Coming Soon"
              description="We're curating vetted vendor lists for sourcing and reselling. Be the first to know when they launch."
              source="vendors-coming-soon"
            />
          )}
        </Container>
      </Section>
    </main>
  );
}
