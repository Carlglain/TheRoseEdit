import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageIntro } from "@/components/ui/PageIntro";
import { ProductCard } from "@/components/ui/ProductCard";
import { ComingSoonState } from "@/components/ui/ComingSoonState";
import { getProductsSafe } from "@/lib/products";

export default async function EbooksPage() {
  const products = await getProductsSafe("ebook");

  return (
    <main>
      <Section>
        <Container>
          <div className="mb-12">
            <PageIntro
              eyebrow="E-Books"
              title="E-Books"
              description="Practical, no-fluff guides for building and protecting wealth."
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
              title="E-Books Are Coming Soon"
              description="New guides are on the way. Be the first to know when they launch."
              source="ebooks-coming-soon"
            />
          )}
        </Container>
      </Section>
    </main>
  );
}
