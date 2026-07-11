import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { BookingWidget, type BookingMode } from "@/components/coaching/BookingWidget";

export const metadata: Metadata = {
  title: "1:1 Coaching Call",
  description:
    "Book a 45-minute 1:1 financial strategy session with Rose M. Apabeloi, State-Authorized Accountant. $120. Walk away with a personalised wealth architecture plan.",
  openGraph: {
    title: "1:1 Coaching Call with Rose M. Apabeloi — $120 / 45 min",
    description: "Personalised financial strategy session. Walk away with a clear, actionable wealth architecture plan.",
  },
};

const OUTCOMES = [
  "A clear map of your income structure and where wealth is leaking",
  "A personalised strategy for tax efficiency and corporate structuring",
  "Actionable next steps you can implement the same week",
  "Guidance on holding companies, multi-stream income, and long-term planning",
  "Honest answers to the financial questions you have been afraid to ask",
];

const STEPS = [
  {
    n: "01",
    title: "Book & Pay",
    body: "Complete the short form below and pay securely via Stripe. You will receive a confirmation email with next steps.",
  },
  {
    n: "02",
    title: "Prepare",
    body: "Rose will send a short prep question so she can tailor the session to your exact situation before you join.",
  },
  {
    n: "03",
    title: "Your Session",
    body: "45 minutes of undivided, expert-level attention. No generic advice — just a focused plan built around you.",
  },
];

const CREDENTIALS = [
  "State-Authorized Accountant (Norway)",
  "Master's in Accounting & Auditing — BI Norwegian Business School, 2022",
  "12+ years in corporate accounting, strategic taxation, and entrepreneurship",
  "Founder of RoseAudit",
];

const FAQ = [
  {
    q: "What happens after I pay?",
    a: "You will receive a receipt by email and a link to choose your session time via our scheduling tool. Sessions are booked within the next 14 days.",
  },
  {
    q: "What platform is the call on?",
    a: "We use video conferencing (link sent after booking). A stable internet connection is all you need.",
  },
  {
    q: "Can I reschedule?",
    a: "Yes — up to 24 hours before your session at no charge. Use the contact form to rearrange.",
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

  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-ink py-20 text-cream md:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <Badge variant="gold">1:1 Coaching Call</Badge>
              <Heading level={1} className="mt-6 text-cream">
                Wealth Architecture, Tailored to You
              </Heading>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-cream/70">
                One focused session. Rose reviews your exact situation and gives you a
                personalised financial roadmap — structured, actionable, and built to last.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <a
                  href="#book"
                  className="inline-flex items-center justify-center rounded-brand border border-gold bg-gold px-8 py-4 text-base font-medium tracking-wide text-ink transition-all duration-200 hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  Book Your Call — $120
                </a>
                <span className="text-sm text-cream/50">45 minutes · Secure checkout</span>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="flex aspect-[4/3] items-center justify-center rounded-brand border border-white/10 bg-white/5">
                <p className="text-center text-sm text-cream/30">
                  Portrait
                  <br />
                  coming soon
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Outcomes ── */}
      <Section className="border-t border-line">
        <Container>
          <Reveal>
            <div className="mx-auto mb-12 max-w-xl text-center">
              <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-gold">
                What You Get
              </span>
              <Heading level={2}>You Will Leave With Clarity</Heading>
              <p className="mt-4 text-muted">
                45 minutes of focused, expert-level financial strategy — not templates, not
                generic advice.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto max-w-2xl">
            <ul className="space-y-4">
              {OUTCOMES.map((outcome, i) => (
                <Reveal key={outcome} delay={i * 80}>
                  <li className="flex gap-4 rounded-brand border border-line bg-white p-5">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald/10 text-xs font-semibold text-emerald">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-ink">{outcome}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── How it works ── */}
      <Section className="border-t border-line bg-white">
        <Container>
          <Reveal>
            <div className="mx-auto mb-14 max-w-lg text-center">
              <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-gold">
                The Process
              </span>
              <Heading level={2}>How It Works</Heading>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 100}>
                <div className="h-full rounded-brand border border-line p-8">
                  <span className="font-heading text-3xl text-gold/40">{step.n}</span>
                  <h3 className="mt-4 font-heading text-xl text-ink">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Credentials ── */}
      <Section className="border-t border-line">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-gold">
                Your Guide
              </span>
              <Heading level={2}>Rose M. Apabeloi</Heading>
              <p className="mt-4 leading-relaxed text-muted">
                Rose is a State-Authorized Accountant who has spent 12+ years inside corporate
                accounting, strategic taxation, and entrepreneurship. She founded RoseAudit to
                close the gap between complex financial systems and the families and business
                owners who need them most.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                This is not generic financial coaching. Rose brings the rigour of a corporate
                accountant to your personal and business finances — and translates it into a
                language and plan you can actually use.
              </p>
              <ul className="mt-8 space-y-2">
                {CREDENTIALS.map((c) => (
                  <li key={c}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/8 px-3 py-1 text-xs font-medium text-ink">
                      <span className="h-1 w-1 rounded-full bg-gold" />
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={150}>
              <div className="flex aspect-square items-center justify-center rounded-brand border border-line bg-emerald/5">
                <p className="text-center text-sm text-muted">
                  Portrait
                  <br />
                  coming soon
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── FAQ ── */}
      <Section className="border-t border-line bg-white">
        <Container>
          <Reveal>
            <div className="mx-auto mb-12 max-w-lg text-center">
              <Heading level={2}>Questions</Heading>
            </div>
          </Reveal>

          <div className="mx-auto max-w-2xl divide-y divide-line">
            {FAQ.map((item, i) => (
              <Reveal key={item.q} delay={i * 80}>
                <div className="py-6">
                  <h3 className="font-heading text-lg text-ink">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Booking ── */}
      <Section id="book" className="border-t border-line">
        <Container>
          <Reveal>
            <div className="mx-auto mb-10 max-w-lg text-center">
              <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-gold">
                Reserve Your Spot
              </span>
              <Heading level={2}>Book Your 1:1 Session</Heading>
              <p className="mt-4 text-muted">
                Sessions fill quickly. Secure your 45 minutes with Rose below.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <BookingWidget mode={mode} bookingUrl={bookingUrl} />
          </Reveal>

          <Reveal delay={150}>
            <p className="mx-auto mt-8 max-w-sm text-center text-xs text-muted">
              Have a question before booking?{" "}
              <a
                href="/contact"
                className="text-emerald underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                Contact us
              </a>{" "}
              and we&apos;ll get back to you within 24 hours.
            </p>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
