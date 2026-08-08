import Image from "next/image";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SITE_NAME } from "@/lib/constants";
import { PORTRAITS } from "@/lib/portraits";

const CATEGORIES = [
  { label: "Courses", href: "/courses" },
  { label: "E-Books", href: "/e-books" },
  { label: "Shop", href: "/shop" },
  { label: "Coaching", href: "/coaching" },
];

const HELP_POINTS = [
  "Build digital income streams",
  "Master money & cash flow",
  "Sell resellable products",
  "Architect lasting wealth",
];

export default function Home() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <div
          className="hero-wash pointer-events-none absolute inset-x-0 top-1/3 h-40"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(91,192,235,0.35), rgba(125,217,160,0.25), rgba(232,121,184,0.3), transparent)",
          }}
          aria-hidden="true"
        />

        <Container className="relative py-12 md:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
            <div className="hero-enter order-2 lg:order-1">
              <h1 className="text-thick-gradient text-[clamp(2.75rem,9vw,5.5rem)]">
                Work Less.
                <br />
                Earn Smarter.
                <br />
                Live Bigger.
              </h1>
              <p className="promo-script font-script mt-2 text-[clamp(2rem,5vw,3.25rem)] text-ink">
                Start Selling Today
              </p>
              <p className="mt-6 max-w-md text-base text-muted sm:text-lg">
                Digital income. Resellable products. Real coaching.
              </p>
              <div className="mt-8">
                <Button href="/coaching" variant="promo" size="lg" className="px-8 sm:px-12">
                  Yes, I Want Passive Income
                </Button>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="hero-portrait relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden lg:max-w-none lg:min-h-[560px]">
                <Image
                  src={PORTRAITS.hero}
                  alt="Rose M. Apabeloi"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 50vw, 90vw"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                  style={{
                    background: "linear-gradient(to top, #fff 0%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Bold statement band ── */}
      <section className="bg-ink py-14 md:py-20">
        <Container>
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <h2 className="text-thick-white text-[clamp(1.6rem,4.5vw,2.75rem)] leading-[1.15]">
                Resell done-for-you digital products, master money systems &amp; turn your
                content into cash
              </h2>
              <div className="float-soft relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-full border-4 border-pink lg:max-w-sm">
                <Image
                  src={PORTRAITS.headshot}
                  alt="Rose M. Apabeloi"
                  fill
                  className="object-cover object-top"
                  sizes="320px"
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Big number proof ── */}
      <section className="border-b border-line bg-white py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="text-thick-black text-[clamp(1.5rem,4vw,2.25rem)]">
                I&apos;ve helped families
              </p>
              <p className="text-thick-sky mt-2 text-[clamp(3.5rem,14vw,7.5rem)]">
                Build Wealth
              </p>
              <p className="text-thick-black mt-4 text-[clamp(1.25rem,3.5vw,2rem)]">
                With simple systems — now it&apos;s your turn.
              </p>
              <p className="mt-6 text-lg font-bold uppercase tracking-wide text-hotpink">
                Let me show you how to start
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden border-2 border-ink transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src={PORTRAITS.feature}
                  alt="Rose M. Apabeloi"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Pink pitch ── */}
      <section className="bg-white py-14 md:py-20">
        <Container>
          <Reveal>
            <h2 className="mx-auto max-w-4xl text-center text-thick-pink text-[clamp(1.75rem,5vw,3.25rem)] leading-[1.15]">
              Let me show you how to start, scale, and sell using a system that prints
              passive income 24/7
            </h2>
            <hr className="divider-gradient mx-auto mt-10 max-w-3xl" />
            <p className="mt-10 text-center text-lg font-semibold text-hotpink">
              Check out our digital products!
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="stagger-in mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
              {CATEGORIES.map((cat) => (
                <Link key={cat.href} href={cat.href} className="category-tile">
                  <span>{cat.label}</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── About strip ── */}
      <section className="border-y border-ink bg-white py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-12 border-2 border-ink p-6 md:grid-cols-2 md:p-10 lg:gap-16">
            <Reveal>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={PORTRAITS.hero}
                  alt="Rose M. Apabeloi"
                  fill
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  sizes="(min-width: 768px) 40vw, 90vw"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4"
                  style={{
                    background: "linear-gradient(to top, #fff, transparent)",
                  }}
                />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="text-right md:pl-4">
                <p className="text-thick-pink text-[clamp(2.5rem,6vw,4rem)]">About Me…</p>
                <p className="mt-6 text-sm font-bold uppercase leading-relaxed tracking-wide text-ink sm:text-base">
                  Accountant. Founder of {SITE_NAME}. 12+ years in corporate finance.
                </p>
                <p className="mt-4 text-base font-bold uppercase tracking-wide text-sky sm:text-lg">
                  I cracked the code on digital income.
                </p>
                <p className="mt-6 text-base font-bold uppercase tracking-wide text-hotpink">
                  Now I help people:
                </p>
                <ul className="mt-4 space-y-3 text-left">
                  {HELP_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky text-white">
                        <CircleCheck size={14} strokeWidth={2.5} aria-hidden="true" />
                      </span>
                      <span className="text-sm font-bold uppercase tracking-wide text-ink sm:text-base">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex justify-end">
                  <Button href="/about" variant="secondary" size="md">
                    My Story →
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Coaching CTA ── */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <Reveal>
            <div className="grid items-center gap-10 border-2 border-ink p-6 md:grid-cols-2 md:p-0 md:overflow-hidden">
              <div className="relative hidden aspect-square bg-pink/30 md:block md:aspect-auto md:min-h-[320px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="float-soft h-40 w-40 rounded-full border-8 border-ink bg-hotpink/40" />
                </div>
              </div>
              <div className="md:py-12 md:pr-10 md:text-right">
                <p className="text-thick-sky text-[clamp(1.75rem,4vw,2.75rem)]">
                  Ready to turn your
                  <br />
                  passion into profit?
                </p>
                <p className="text-thick-pink mt-3 text-[clamp(1.5rem,3.5vw,2.25rem)]">
                  1:1 Coaching Calls
                </p>
                <p className="font-script mt-2 text-4xl text-ink md:text-5xl">Book Today</p>
                <div className="mt-8 flex md:justify-end">
                  <Button href="/coaching" variant="promo" size="lg">
                    Book a Coaching Call
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-ink py-16 text-center md:py-20">
        <Container>
          <Reveal>
            <h2 className="text-thick-white mx-auto max-w-2xl text-[clamp(1.75rem,5vw,3rem)]">
              Are you ready to make passive income?
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href="/e-books" variant="promo" size="lg">
                Explore Products
              </Button>
              <Button href="/coaching" variant="ghost-dark" size="lg">
                Book Coaching
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
