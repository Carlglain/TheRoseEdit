import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageIntro } from "@/components/ui/PageIntro";
import { ProductCard } from "@/components/ui/ProductCard";
import { ComingSoonState } from "@/components/ui/ComingSoonState";
import { getProductsSafe } from "@/lib/products";

export default async function CoursesPage() {
  const products = await getProductsSafe("course");

  return (
    <main>
      <Section>
        <Container>
          <div className="mb-12">
            <PageIntro
              eyebrow="Courses"
              title="Courses"
              description="Structured courses on wealth architecture, cash flow systems, and building digital income."
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
              title="Courses Are Coming Soon"
              description="We're building structured courses on wealth architecture and cash flow systems. Be the first to know when they launch."
              source="courses-coming-soon"
            />
          )}
        </Container>
      </Section>
    </main>
  );
}
