import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageIntro } from "@/components/ui/PageIntro";
import { Button } from "@/components/ui/Button";

export default function AccountPage() {
  return (
    <main>
      <Section>
        <Container>
          <PageIntro
            eyebrow="Phase 2"
            title="My Library — Coming Soon"
            description="Accounts will let you re-download past purchases and access courses as they launch."
          >
            <div className="mt-8">
              <Button href="/shop" variant="secondary">
                Browse Products
              </Button>
            </div>
          </PageIntro>
        </Container>
      </Section>
    </main>
  );
}
