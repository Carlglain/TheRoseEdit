import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ClearCartOnMount } from "@/components/cart/ClearCartOnMount";

interface CoachingSuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function CoachingSuccessPage({ searchParams }: CoachingSuccessPageProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/coaching");
  }

  const bookingUrl = process.env.BOOKING_URL ?? "";

  return (
    <main>
      <Section>
        <Container>
          <ClearCartOnMount />
          <div className="mx-auto max-w-lg text-center">
            <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-emerald">
              Payment Confirmed
            </span>
            <Heading level={1}>You&apos;re In</Heading>
            <p className="mt-4 leading-relaxed text-muted">
              Thank you for booking your 1:1 session with Rose. You&apos;ll receive a receipt by
              email shortly. Now choose a time that works for you.
            </p>

            <div className="mt-10">
              {bookingUrl ? (
                <>
                  <Button href={bookingUrl} variant="gold" size="lg">
                    Choose Your Session Time →
                  </Button>
                  <p className="mt-4 text-xs text-muted">
                    You will be taken to the scheduling page to pick a date and time.
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-6 text-sm text-muted">
                    Reply to your receipt email or contact us directly and we&apos;ll send you
                    available slots within 24 hours.
                  </p>
                  <Button
                    href="/contact"
                    variant="gold"
                    size="lg"
                  >
                    Contact Us to Schedule
                  </Button>
                </>
              )}
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <Button href="/" variant="ghost">
                Back to Home
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
