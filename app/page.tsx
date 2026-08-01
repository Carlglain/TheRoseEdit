import Image from 'next/image';
import { TrendingUp, Building2, BookOpen, ShieldCheck, Award, Globe, CircleCheck, CircleX } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { NewsletterForm } from '@/components/layout/NewsletterForm';
import { IS_FOR_YOU, NOT_FOR_YOU, SITE_NAME } from '@/lib/constants';
import { PORTRAITS } from '@/lib/portraits';

const PILLARS = [
  {
    label: 'Personal Finance',
    description:
      'Master your money, build automated digital income, and become a wealth architect — moving from a payslip mindset to an asset-owner mindset.',
    Icon: TrendingUp,
  },
  {
    label: 'Increasing Cash Flow',
    description:
      'Clean corporate structures — holding companies, tax-efficient frameworks — and automated systems to scale digital products and multi-stream income.',
    Icon: Building2,
  },
  {
    label: 'Financial Literacy for the Next Generation',
    description:
      'Practical tools for parents to teach children asset management, investing, and healthy money habits from a young age.',
    Icon: BookOpen,
  },
];

const STATS = [
  { num: '12+', label: 'Years Experience' },
  { num: '3', label: 'Core Programmes' },
  { Icon: ShieldCheck, label: 'Master\'s · BI Norwegian Business School' },
  { Icon: Globe, label: 'Norway Based' },
];

export default function Home() {
  return (
    <main>
      {/* ── 1. Hero ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 gradient-forest" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 55% 65% at 78% 42%, rgba(47,158,87,0.28) 0%, transparent 70%)',
            }}
          />
          <div className="absolute inset-0 gradient-hero-bottom" />
        </div>

        <Container className="relative z-10 pb-24 pt-28 lg:pb-32 lg:pt-24">
          <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-20">
            <div className="hero-enter max-w-[640px]">
              <div className="promo-lockup mt-8">
                <h1 className="font-display text-[clamp(2.2rem,8vw,4.25rem)] text-white">
                  Real Coaching.
                  <br />
                  Resellable Products.
                </h1>
                <p className="promo-script font-script text-[clamp(2.25rem,6vw,3.75rem)] text-gold">
                  Start Selling Today
                </p>
              </div>

              <div className="mt-8 max-w-lg space-y-4 text-base leading-relaxed text-white/65 sm:text-lg">
                <p>
                  Stop surviving the fragile grind. It&apos;s time to architect true
                  financial freedom.
                </p>
                <p>
                  Discover the exact, simple frameworks to automate your budget,
                  eliminate your debt, and multiply your cash flow—not through
                  restriction, but by managing wealth like a true steward.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/coaching" size="lg">Book a Coaching Call</Button>
                <Button href="/shop" variant="ghost-dark" size="lg">Explore Products</Button>
              </div>
            </div>

            <div className="hero-enter hidden md:block">
              <div
                className="relative mx-auto w-full max-w-[22rem] lg:max-w-none"
                style={{ animationDelay: '0.3s' }}
              >
                <div
                  className="pointer-events-none absolute -inset-8 blur-3xl"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(47,158,87,0.35) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-4 -right-4 h-full w-full rounded-brand border border-gold/35"
                  aria-hidden="true"
                />

                <div className="relative aspect-[4/5] overflow-hidden rounded-brand border border-white/10 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.75)]">
                  <Image
                    src={PORTRAITS.hero}
                    alt="Rose M. Apabeloi"
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 24rem, 45vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(10,46,27,0.75) 0%, transparent 50%)',
                    }}
                  />
                </div>

                <div className="absolute -bottom-6 left-1/2 w-[88%] -translate-x-1/2 rounded-brand border border-white/15 bg-forest/90 px-5 py-3 text-center backdrop-blur-md">
                  <p className="font-heading text-sm text-white">Rose M. Apabeloi</p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-gold">
                    Founder · {SITE_NAME}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Trust strip ──────────────────────────────────────────── */}
      <div className="border-y border-white/10 bg-forest/95">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-y-3 divide-x divide-white/10 py-6">
            {STATS.map(({ num, Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 px-5 py-1 sm:px-8">
                {Icon && <Icon size={15} className="text-gold" strokeWidth={1.5} />}
                {num && <span className="font-heading text-xl text-white">{num}</span>}
                <span className="text-xs tracking-wide text-white/50">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ── 3. Three pillars — editorial ─────────────────────────────── */}
      <section className="gradient-forest py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="mx-auto mb-16 max-w-xl text-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-emerald">
                The Framework
              </p>
              <Heading level={2} className="text-white">What We Build Together</Heading>
              <p className="mt-4 text-white/50">
                Three pillars of wealth architecture — for you, your business,
                and the next generation.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.label} delay={i * 100}>
                <div className="coming-soon-card flex h-full flex-col p-8 md:p-9">
                  <div className="mb-6 text-white/90">
                    <pillar.Icon size={28} strokeWidth={1.25} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xl font-light text-white">{pillar.label}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">
                    {pillar.description}
                  </p>
                  <span className="mt-8 inline-flex w-full items-center justify-center rounded-brand bg-emerald px-5 py-3 text-sm font-semibold tracking-wide text-white">
                    Coming Soon
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <blockquote className="mx-auto mt-20 max-w-2xl border-l border-emerald/50 pl-6">
              <p className="font-heading text-lg font-light italic leading-relaxed text-white/70">
                &ldquo;Bridge the gap between heavy active work and lifestyle
                freedom — protect time, maximise returns, and equip the next
                generation.&rdquo;
              </p>
              <footer className="mt-3 text-xs tracking-wide text-emerald/80">
                — Rose M. Apabeloi, Founder
              </footer>
            </blockquote>
          </Reveal>
        </Container>
      </section>

      {/* ── About teaser ───────────────────────────────────────────── */}
      <section className="gradient-forest py-24 md:py-32">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
            <Reveal>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-emerald">
                Meet Your Guide
              </p>
              <Heading level={2} className="text-white">Rose M. Apabeloi</Heading>
              <p className="mt-5 leading-relaxed text-white/55">
                An accountant and wealth strategist with 12+ years bridging corporate
                accounting, strategic taxation, and entrepreneurship — Rose founded
                RoseAudit to bring corporate-grade financial strategy to homes,
                businesses, and the next generation.
              </p>

              <div className="mt-8 space-y-2">
                {[
                  { Icon: Award, text: "Master's in Accounting & Auditing · BI Norwegian Business School" },
                  { Icon: ShieldCheck, text: '12+ years in corporate finance' },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-sm text-white/45">
                    <Icon size={14} className="text-emerald" strokeWidth={1.5} />
                    {text}
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button href="/about" variant="ghost-dark">Read Her Story</Button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-brand border border-white/10">
                <Image
                  src={PORTRAITS.feature}
                  alt="Rose M. Apabeloi"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(10,46,27,0.55) 0%, transparent 45%)' }}
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── 6. Lead magnet ──────────────────────────────────────────── */}
      <section id="starter-kit" className="bg-cream py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-lg text-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-emerald">
                Free Resource
              </p>
              <Heading level={2}>Get a Free Sneak Peek</Heading>
              <p className="mt-4 text-muted">
                A practical starter kit for your own finances — no fluff,
                no gimmicks.
              </p>
              <div className="mx-auto mt-8 max-w-md">
                <NewsletterForm theme="light" source="home-starter-kit" />
              </div>
              <p className="mt-3 text-xs text-muted/70">No spam. Unsubscribe anytime.</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 7. Is this for you ──────────────────────────────────────── */}
      <section className="section-soft border-t border-line py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="mx-auto mb-14 max-w-lg text-center">
              <Heading level={2}>Is This for You?</Heading>
            </div>
          </Reveal>
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 md:divide-x md:divide-line">
            <Reveal>
              <div className="md:pr-8">
                <h3 className="font-heading text-xl font-light text-ink">Not for you if&hellip;</h3>
                <ul className="mt-6 space-y-4">
                  {NOT_FOR_YOU.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <CircleX
                        size={18}
                        strokeWidth={1.5}
                        className="mt-0.5 flex-shrink-0 text-red-600"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="md:pl-8">
                <h3 className="font-heading text-xl font-light text-ink">This is for you if&hellip;</h3>
                <ul className="mt-6 space-y-4">
                  {IS_FOR_YOU.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <CircleCheck
                        size={18}
                        strokeWidth={1.5}
                        className="mt-0.5 flex-shrink-0 text-emerald"
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

      {/* ── 8. Final CTA ────────────────────────────────────────────── */}
      <section className="gradient-forest py-28 md:py-36">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Heading level={2} className="text-white">
                Ready to Build Your Legacy?
              </Heading>
              <p className="mt-4 text-lg text-white/55">
                Book a 1:1 coaching call or start with a digital product —
                either way, your wealth architecture starts today.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button href="/coaching" variant="gold" size="lg">
                  Book a Coaching Call
                </Button>
                <Button href="/shop" variant="ghost-dark" size="lg">
                  Browse the Shop
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
