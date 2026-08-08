import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { BookingWidget, type BookingMode } from "@/components/coaching/BookingWidget";
import { PORTRAITS } from "@/lib/portraits";

export const metadata: Metadata = {
  title: "1:1 Coaching Call",
  description:
    "Book a 45-minute 1:1 financial strategy session with Rose M. Apabeloi. $120. Walk away with a personalised wealth architecture plan.",
  openGraph: {
    title: "1:1 Coaching Call with Rose M. Apabeloi — $120 / 45 min",
    description:
      "Personalised financial strategy session. Walk away with a clear, actionable wealth architecture plan.",
  },
};

const OUTCOMES = [
  "A clear map of your income structure",
  "A personalised tax & structure strategy",
  "Actionable next steps you can use this week",
  "Guidance on multi-stream income & planning",
];

const STEPS_PAY_FIRST = [
  {
    n: "01",
    title: "Book & Pay",
    body: "Pay securely, then pick a live slot. Rose is notified on Google Calendar instantly.",
  },
  {
    n: "02",
    title: "Prepare",
    body: "A short prep question so Rose can tailor the session to you.",
  },
  {
    n: "03",
    title: "Your Session",
    body: "45 minutes of focused strategy — a plan built around you.",
  },
];

const STEPS_EMBED = [
  {
    n: "01",
    title: "Pick a Slot",
    body: "Choose a live available time on the calendar. What you see is what’s open.",
  },
  {
    n: "02",
    title: "Prepare",
    body: "A short prep question so Rose can tailor the session to you.",
  },
  {
    n: "03",
    title: "Your Session",
    body: "45 minutes of focused strategy — a plan built around you.",
  },
];

const FAQ = [
  {
    q: "What happens after I book?",
    a: "You pick from Rose's real available times. The booking syncs to her Google Calendar and you'll get a confirmation with the video link.",
  },
  {
    q: "What platform is the call on?",
    a: "Video conferencing — link sent after booking. A stable internet connection is all you need.",
  },
  {
    q: "Can I reschedule?",
    a: "Yes — up to 24 hours before your session at no charge. Use the contact form or your booking confirmation.",
  },
];

function getWidgetConfig(): { mode: BookingMode; bookingUrl: string } {
  const bookingUrl = process.env.BOOKING_URL ?? "";
  const requiresPayment = process.env.BOOKING_REQUIRES_PAYMENT === "true";

  if (requiresPayment) return { mode: "pay-first", bookingUrl };
  if (bookingUrl) return { mode: "embed", bookingUrl };
  return { mode: "contact", bookingUrl };
}

export default function CoachingPage() {
  const { mode, bookingUrl } = getWidgetConfig();
  const steps = mode === "pay-first" ? STEPS_PAY_FIRST : STEPS_EMBED;

  return (
    <main>
      {/* ── 1. Hero ── */}
      <section className="overflow-hidden bg-ink text-white">
        <Container className="py-14 md:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
            <Reveal>
              <div className="hero-enter">
                <p className="inline-block rounded-full bg-gold px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-ink">
                  1:1 Coaching Call
                </p>

                <h1 className="mt-6 text-thick-white text-[clamp(2.75rem,8vw,5rem)] leading-[0.95]">
                  Ready to turn your
                  <br />
                  <span className="text-thick-pink">passion into profit?</span>
                </h1>

                <p className="font-script mt-3 text-[clamp(2rem,5vw,3.25rem)] text-cyan">
                  Book Today
                </p>

                <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
                  One focused session. A personalised financial roadmap — structured,
                  actionable, and built to last.
                </p>

                <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <a
                    href="#book"
                    className="gradient-pink-blue inline-flex items-center justify-center rounded-brand px-10 py-5 text-lg font-extrabold uppercase tracking-wide text-ink shadow-lg transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hotpink focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:px-12 sm:py-6 sm:text-xl"
                  >
                    Book Your Call — $120
                  </a>
                  <span className="text-sm font-semibold uppercase tracking-wider text-white/50">
                    45 minutes · Secure checkout
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="hero-portrait relative mx-auto aspect-[3/4] w-full max-w-lg overflow-hidden border-4 border-pink lg:max-w-none lg:min-h-[580px]">
                <Image
                  src={PORTRAITS.hero}
                  alt="Rose M. Apabeloi"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 50vw, 90vw"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4"
                  style={{
                    background: "linear-gradient(to top, #0A0A0A 0%, transparent 100%)",
                  }}
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── 2. Calendar / booking (directly after hero) ── */}
      <section id="book" className="border-b border-line bg-white py-16 md:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="text-thick-black text-[clamp(2rem,5vw,3.5rem)]">
                Book Your 1:1 Session
              </h2>
              <p className="mt-3 text-base font-semibold uppercase tracking-wide text-hotpink">
                Pick a time · Syncs to Rose&apos;s calendar
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <BookingWidget mode={mode} bookingUrl={bookingUrl} />
          </Reveal>

          <p className="mx-auto mt-8 max-w-sm text-center text-xs text-muted">
            Questions first?{" "}
            <a
              href="/contact"
              className="font-semibold text-hotpink underline underline-offset-2 hover:opacity-80"
            >
              Contact us
            </a>
          </p>
        </Container>
      </section>

      {/* ── Outcomes ── */}
      <Section className="border-t border-line">
        <Container>
          <Reveal>
            <div className="mx-auto mb-12 max-w-xl text-center">
              <h2 className="text-thick-pink text-[clamp(1.75rem,4vw,2.75rem)]">
                What You Get
              </h2>
            </div>
          </Reveal>

          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {OUTCOMES.map((outcome, i) => (
              <Reveal key={outcome} delay={i * 60}>
                <div className="flex gap-3 border-2 border-ink bg-white p-5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-sm font-bold uppercase tracking-wide text-ink">
                    {outcome}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── How it works ── */}
      <Section className="border-t border-line bg-white">
        <Container>
          <Reveal>
            <div className="mx-auto mb-12 max-w-lg text-center">
              <h2 className="text-thick-black text-[clamp(1.75rem,4vw,2.75rem)]">
                How It Works
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 80}>
                <div className="h-full border-2 border-ink p-7">
                  <span className="text-thick-sky text-3xl">{step.n}</span>
                  <h3 className="mt-3 text-xl font-extrabold uppercase tracking-wide text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── FAQ ── */}
      <Section className="border-t border-line">
        <Container>
          <Reveal>
            <div className="mx-auto mb-10 max-w-lg text-center">
              <Heading level={2}>Questions</Heading>
            </div>
          </Reveal>

          <div className="mx-auto max-w-2xl divide-y divide-line">
            {FAQ.map((item, i) => (
              <Reveal key={item.q} delay={i * 60}>
                <div className="py-6">
                  <h3 className="text-lg font-bold uppercase tracking-wide text-ink">
                    {item.q}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
