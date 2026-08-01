import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageIntro } from "@/components/ui/PageIntro";
import { ComingSoonState } from "@/components/ui/ComingSoonState";

export default function VendorsPage() {
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

          <ComingSoonState
            title="Vendor Lists Are Coming Soon"
            description="We're curating vetted vendor lists for sourcing and reselling. Be the first to know when they launch."
            source="vendors-coming-soon"
          />
        </Container>
      </Section>
    </main>
  );
}
