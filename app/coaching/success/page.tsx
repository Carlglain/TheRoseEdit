import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ClearCartOnMount } from "@/components/cart/ClearCartOnMount";
import { CalEmbed } from "@/components/coaching/CalEmbed";

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
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-emerald">
                Payment Confirmed
              </span>
              <Heading level={1}>You&apos;re In</Heading>
              <p className="mx-auto mt-4 max-w-lg leading-relaxed text-muted">
                Thank you for booking your 1:1 session with Rose. You&apos;ll receive a receipt by
                email shortly. Choose a time below — it syncs straight to Rose&apos;s calendar.
              </p>
            </div>

            <div className="mt-10">
              {bookingUrl ? (
                <CalEmbed bookingUrl={bookingUrl} compact />
              ) : (
                <div className="mx-auto max-w-md text-center">
                  <p className="mb-6 text-sm text-muted">
                    Reply to your receipt email or contact us and we&apos;ll send you available
                    slots within 24 hours.
                  </p>
                  <Button href="/contact" variant="gold" size="lg">
                    Contact Us to Schedule
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-10 border-t border-line pt-8 text-center">
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
