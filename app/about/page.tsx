import type { Metadata } from "next";
import Image from "next/image";
import { CircleCheck, CircleX, GraduationCap, Briefcase, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { IS_FOR_YOU, NOT_FOR_YOU } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Rose M. Apabeloi",
  description:
    "Meet Rose M. Apabeloi — accountant, BI Norwegian Business School graduate, and founder of RoseAudit. 12+ years of corporate financial expertise, now available to you.",
  openGraph: {
    title: "About Rose M. Apabeloi — RoseAudit",
    description: "Accountant, BI Norwegian Business School graduate, founder of RoseAudit.",
    type: "profile",
  },
};

const CREDENTIALS = [
  {
    label: "Master's in Accounting & Auditing",
    note: "BI Norwegian Business School, 2022",
    Icon: GraduationCap,
  },
  {
    label: "12+ Years in Corporate Finance",
    note: "Accounting, taxation & entrepreneurship",
    Icon: Briefcase,
  },
  {
    label: "Founder of RoseAudit",
    note: "Wealth architecture for families & businesses",
    Icon: Sparkles,
  },
];

const TIMELINE = [
  {
    period: "12+ years",
    event: "Corporate accounting and strategic taxation",
    detail:
      "Built deep expertise across accounting, compliance, and financial strategy for businesses of all sizes.",
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
      <section
        className="relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-16"
        style={{
          background: "linear-gradient(165deg, #F3FAF5 0%, #E8F5EE 55%, #DCEFE4 100%)",
        }}
      >
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald">
                Meet Your Guide
              </p>
              <Heading level={1} className="mt-4">
                Architect True Financial Freedom
              </Heading>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
                Stop surviving the fragile grind. Rose M. Apabeloi founded RoseAudit to help
                you automate your budget, eliminate debt, and multiply cash flow — by managing
                wealth like a true steward.
              </p>

              <ul className="mt-8 space-y-4">
                {CREDENTIALS.map(({ label, note, Icon }) => (
                  <li key={label} className="flex gap-3">
                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                      <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{label}</p>
                      <p className="text-sm text-muted">{note}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button href="/coaching" variant="primary" size="lg">
                  Book a 1:1 Session
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div
                  className="absolute -inset-3 rounded-brand opacity-60"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(47,158,87,0.25), rgba(11,61,44,0.08))",
                  }}
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-brand shadow-[0_28px_60px_-24px_rgba(6,40,22,0.45)]">
                  {portraitUrl ? (
                    <Image
                      src={portraitUrl}
                      alt="Rose M. Apabeloi"
                      fill
                      className="object-cover object-top"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      priority
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-forest/10">
                      <p className="text-center text-sm text-muted">
                        Portrait
                        <br />
                        coming soon
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Story ── */}
      <Section className="border-t border-line bg-white">
        <Container>
          <div className="grid gap-16 md:grid-cols-2 md:gap-20">
            <Reveal>
              <span className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-emerald">
                The Story
              </span>
              <Heading level={2}>Built from the Inside Out</Heading>
              <p className="mt-5 leading-relaxed text-muted">
                Rose spent over a decade inside the numbers — tax strategy, compliance, and
                corporate financial structure. She watched businesses make and lose fortunes on
                decisions that hinged entirely on financial understanding. And she watched
                families with high incomes still live payslip to payslip, because no one had
                ever given them the framework.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                That gap — between complex financial systems and the people who should benefit
                from them — is why RoseAudit exists. Rose brings the same discipline and
                precision she applied in corporate accounting to personal finance, digital
                business, and wealth-building for the next generation.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <span className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-emerald">
                The Journey
              </span>
              <div className="space-y-0 rounded-brand border border-line bg-cream/60 p-6 md:p-8">
                {TIMELINE.map((item, i) => (
                  <div key={item.period} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald text-xs font-semibold text-white">
                        {i + 1}
                      </div>
                      {i < TIMELINE.length - 1 && (
                        <div className="my-1 h-full w-px bg-line" />
                      )}
                    </div>
                    <div className={i < TIMELINE.length - 1 ? "pb-8" : "pb-1"}>
                      <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                        {item.period}
                      </span>
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

      {/* ── Mission ── */}
      <section
        className="py-24 md:py-28"
        style={{
          background: "linear-gradient(155deg, #062816 0%, #0B3D2C 50%, #1A6B45 100%)",
        }}
      >
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="mb-6 block text-xs font-medium uppercase tracking-[0.2em] text-gold">
                The Mission
              </span>
              <blockquote className="font-heading text-2xl font-light leading-snug text-cream md:text-3xl">
                &ldquo;Bridge the gap between heavy active work and lifestyle freedom — protect
                time, maximise returns, and equip the next generation.&rdquo;
              </blockquote>
              <p className="mt-6 text-cream/55">— Rose M. Apabeloi, Founder of RoseAudit</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Is This for You ── */}
      <section
        className="relative overflow-hidden border-t border-line py-24 md:py-32"
        style={{
          background: "linear-gradient(165deg, #F3FAF5 0%, #E5F4EB 45%, #D7EFE0 100%)",
        }}
      >
        <Container className="relative z-10">
          <Reveal>
            <div className="mx-auto mb-14 max-w-lg text-center">
              <span className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-emerald">
                Find Your Fit
              </span>
              <Heading level={2}>Is This for You?</Heading>
              <p className="mt-4 text-muted">
                RoseAudit is built for people ready to steward wealth with intention — not
                chase shortcuts.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <Reveal>
              <div
                className="flex h-full flex-col rounded-brand border border-forest/10 p-8 md:p-10"
                style={{ background: "rgba(255,255,255,0.72)" }}
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
                  <CircleX size={20} strokeWidth={1.5} className="text-red-600" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-heading text-2xl font-light text-ink">
                  Not for you if&hellip;
                </h3>
                <ul className="mt-6 space-y-4">
                  {NOT_FOR_YOU.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <CircleX
                        size={18}
                        strokeWidth={1.5}
                        className="mt-0.5 flex-shrink-0 text-red-500/80"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div
                className="flex h-full flex-col rounded-brand border border-emerald/25 p-8 md:p-10"
                style={{
                  background: "linear-gradient(160deg, #0B3D2C 0%, #1A6B45 100%)",
                }}
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <CircleCheck size={20} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-heading text-2xl font-light text-white">
                  This is for you if&hellip;
                </h3>
                <ul className="mt-6 space-y-4">
                  {IS_FOR_YOU.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/70">
                      <CircleCheck
                        size={18}
                        strokeWidth={1.5}
                        className="mt-0.5 flex-shrink-0 text-gold"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <Section className="border-t border-line bg-white">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-lg text-center">
              <Heading level={2}>Work with Rose</Heading>
              <p className="mt-4 text-muted">
                Ready to take the first step? Start with a 1:1 coaching call — your wealth
                architecture starts today.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/coaching" variant="gold" size="lg">
                  Book a Coaching Call
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Get in Touch
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
