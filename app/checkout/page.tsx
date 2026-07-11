import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";

export default function CheckoutPage() {
  return (
    <main>
      <Section>
        <Container>
          <div className="mx-auto max-w-md text-center">
            <Heading level={1}>Checkout</Heading>
            <p className="mt-4 text-muted">
              Stripe and PayPal checkout will be wired up here.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
