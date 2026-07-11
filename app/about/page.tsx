import type { Metadata } from "next";
import Image from "next/image";
import { TrendingUp, Building2, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { IS_FOR_YOU, NOT_FOR_YOU } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Rose M. Apabeloi",
  description:
    "Meet Rose M. Apabeloi — State-Authorized Accountant, BI Norwegian Business School graduate, and founder of RoseAudit. 12+ years of corporate financial expertise, now available to you.",
  openGraph: {
    title: "About Rose M. Apabeloi — RoseAudit",
    description: "State-Authorized Accountant, BI Norwegian Business School, founder of RoseAudit.",
    type: "profile",
  },
};

const CREDENTIALS = [
  { label: "State-Authorized Accountant", note: "Norway" },
  { label: "Master's in Accounting & Auditing", note: "BI Norwegian Business School, 2022" },
  { label: "12+ Years in Corporate Finance", note: "Accounting, taxation & entrepreneurship" },
  { label: "Founder", note: "RoseAudit" },
];

const PILLARS = [
  {
    label: "Personal Finance",
    description:
      "Master your money, build automated digital income, and become a wealth architect — moving from a payslip mindset to an asset-owner mindset.",
    Icon: TrendingUp,
  },
  {
    label: "Increasing Cash Flow",
    description:
      "Clean corporate structures — holding companies, tax-efficient frameworks — and automated systems to scale digital products and multi-stream income.",
    Icon: Building2,
  },
  {
    label: "Financial Literacy for the Next Generation",
    description:
      "Practical tools for parents to teach children asset management, investing, and healthy money habits from a young age.",
    Icon: BookOpen,
  },
];

const TIMELINE = [
  {
    period: "12+ years",
    event: "Corporate accounting and strategic taxation",
    detail:
      "Built deep expertise across audit, compliance, and financial strategy for businesses of all sizes.",
  },
  {
    period: "2022",
    event: "Master's in Accounting & Auditing",
    detail:
      "Graduated from BI Norwegian Business School — one of the most rigorous finance programmes in Scandinavia.",
  },
  {
    period: "Today",
    event: "RoseAudit",
    detail:
      "Bringing corporate-grade financial strategy out of the boardroom and into homes, families, and growing businesses.",
  },
];

const portraitUrl = process.env.PORTRAIT_URL ?? "";

export default function AboutPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-cream pb-16 pt-10 md:pb-24 md:pt-14">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <Badge variant="gold">Meet Your Guide</Badge>
              <Heading level={1} className="mt-6">
                From Corporate Books to Family Legacies
              </Heading>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
                Rose M. Apabeloi is a State-Authorized Accountant and the founder of RoseAudit —
                on a mission to bring the financial rigour of corporate accounting to the people
                who need it most.
              </p>

              <ul className="mt-8 flex flex-wrap gap-2">
                {CREDENTIALS.map((c) => (
                  <li key={c.label}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/8 px-3 py-1.5 text-xs font-medium text-ink">
                      <span className="h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                      {c.label}
                      <span className="text-muted">· {c.note}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button href="/coaching" variant="primary" size="lg">
                  Book a 1:1 Session
                </Button>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative aspect-square overflow-hidden rounded-brand border border-line bg-emerald/5">
                {portraitUrl ? (
                  <Image
                    src={portraitUrl}
                    alt="Rose M. Apabeloi"
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-center text-sm text-muted">
                      Portrait
                      <br />
                      coming soon
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Story ── */}
      <Section className="border-t border-line bg-white">
        <Container>
          <div className="grid gap-16 md:grid-cols-2 md:gap-24">
            <Reveal>
              <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-gold">
                The Story
              </span>
              <Heading level={2}>Built from the Inside Out</Heading>
              <p className="mt-5 leading-relaxed text-muted">
                Rose spent over a decade inside the numbers — audits, tax strategy, compliance,
                and corporate financial structure. She watched businesses make and lose fortunes
                on decisions that hinged entirely on financial understanding. And she watched
                families with high incomes still live payslip to payslip, because no one had ever
                given them the framework.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                That gap — between complex financial systems and the people who should benefit
                from them — is why RoseAudit exists. Rose brings the same discipline and
                precision she applied in corporate accounting to personal finance, digital
                business, and wealth-building for the next generation.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-gold">
                The Journey
              </span>
              <div className="space-y-8">
                {TIMELINE.map((item, i) => (
                  <div key={item.period} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-xs font-semibold text-ink">
                        {i + 1}
                      </div>
                      {i < TIMELINE.length - 1 && (
                        <div className="mt-2 h-full w-px bg-line" />
                      )}
                    </div>
                    <div className="pb-8 last:pb-0">
                      <span className="text-xs font-medium text-gold">{item.period}</span>
                      <p className="mt-1 font-heading text-base text-ink">{item.event}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Three Pillars ── */}
      <Section className="border-t border-line">
        <Container>
          <Reveal>
            <div className="mx-auto mb-14 max-w-lg text-center">
              <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-gold">
                The Framework
              </span>
              <Heading level={2}>What We Build Together</Heading>
              <p className="mt-4 text-muted">
                Three pillars of wealth architecture — for you, your business, and the next
                generation.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.label} delay={i * 100}>
                <div className="flex h-full flex-col rounded-brand border border-line bg-white p-8">
                  <div className="mb-6">
                    <pillar.Icon size={32} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xl text-ink">{pillar.label}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{pillar.description}</p>
                  <span className="mt-8 inline-flex w-full items-center justify-center rounded-brand bg-emerald px-5 py-3 text-sm font-semibold tracking-wide text-white">
                    Coming Soon
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Mission ── */}
      <Section className="bg-ink text-cream">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="mb-6 block text-xs font-medium uppercase tracking-widest text-gold">
                The Mission
              </span>
              <blockquote className="font-heading text-2xl leading-snug text-cream md:text-3xl">
                &ldquo;Bridge the gap between heavy active work and lifestyle freedom — protect
                time, maximise returns, and equip the next generation.&rdquo;
              </blockquote>
              <p className="mt-6 text-cream/60">— Rose M. Apabeloi, Founder of RoseAudit</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── Is This for You ── */}
      <Section className="border-t border-line bg-white">
        <Container>
          <Reveal>
            <div className="mx-auto mb-12 max-w-lg text-center">
              <Heading level={2}>Is This for You?</Heading>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-brand border border-line p-8">
                <h3 className="font-heading text-xl text-ink">This is for you if&hellip;</h3>
                <ul className="mt-5 space-y-3">
                  {IS_FOR_YOU.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="h-full rounded-brand border border-line p-8">
                <h3 className="font-heading text-xl text-ink">Not for you if&hellip;</h3>
                <ul className="mt-5 space-y-3">
                  {NOT_FOR_YOU.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section className="border-t border-line">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-lg text-center">
              <Heading level={2}>Work with Rose</Heading>
              <p className="mt-4 text-muted">
                Ready to take the first step? Start with a 1:1 coaching call or explore the
                digital products — either way, your wealth architecture starts today.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/coaching" variant="gold" size="lg">
                  Book a Coaching Call
                </Button>
                <Button href="/shop" variant="secondary" size="lg">
                  Browse the Shop
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
