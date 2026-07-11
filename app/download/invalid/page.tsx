import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export default function InvalidDownloadPage() {
  return (
    <main>
      <Section>
        <Container>
          <div className="mx-auto max-w-md text-center">
            <Heading level={1}>Link Expired</Heading>
            <p className="mt-4 text-muted">
              This download link is no longer valid — it may have expired or reached its
              download limit. Contact us and we&apos;ll get you a new one.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="secondary">
                Contact Support
              </Button>
              <Button href="/">Back to Home</Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
