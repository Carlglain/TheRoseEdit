import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Rose M. Apabeloi at RoseAudit. Questions about coaching, products, or a partnership — we read every message.",
  openGraph: {
    title: "Contact RoseAudit",
    description: "Get in touch via the contact form or WhatsApp. We respond within 24 hours.",
  },
};

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ContactPage() {
  const whatsappUrl = process.env.CONTACT_WHATSAPP ?? "";

  return (
    <main>
      <section className="bg-cream pb-12 pt-10 md:pb-16 md:pt-14">
        <Container>
          <Reveal>
            <div className="max-w-xl">
              <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-gold">
                Get in Touch
              </span>
              <Heading level={1}>We&apos;d Love to Hear from You</Heading>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Questions about a product, the coaching call, or a collaboration? Rose reads
                every message and responds within 24 hours.
              </p>
            </div>
          </Reveal>

          {whatsappUrl ? (
            <Reveal delay={100}>
              <div className="mt-10">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-4 rounded-brand border border-line bg-white px-6 py-4 transition-colors duration-200 hover:border-[#25D366]"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] transition-colors duration-200 group-hover:bg-[#25D366] group-hover:text-white">
                    <WhatsAppIcon />
                  </span>
                  <div>
                    <span className="block text-xs font-medium uppercase tracking-widest text-muted">
                      WhatsApp
                    </span>
                    <span className="mt-0.5 block text-sm font-medium text-ink">
                      Message directly
                    </span>
                  </div>
                </a>
              </div>
            </Reveal>
          ) : null}
        </Container>
      </section>

      <Section className="border-t border-line bg-white">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <Reveal>
              <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-gold">
                Send a Message
              </span>
              <Heading level={2}>Drop Us a Line</Heading>
              <p className="mt-4 text-muted">
                Tell us what you&apos;re working on and what you need. The more detail you share,
                the better Rose can help.
              </p>

              <div className="mt-10">
                <ContactForm />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="lg:pt-16">
                <div className="rounded-brand border border-line p-8">
                  <h3 className="font-heading text-lg text-ink">What to expect</h3>
                  <ul className="mt-5 space-y-4">
                    {[
                      { n: "1", text: "Rose personally reads every message — no outsourced inbox." },
                      { n: "2", text: "You will hear back within 24 hours, usually sooner." },
                      { n: "3", text: "If your question is complex, Rose may suggest a coaching call as the most efficient path forward." },
                    ].map((item) => (
                      <li key={item.n} className="flex gap-4">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald/10 text-xs font-semibold text-emerald">
                          {item.n}
                        </span>
                        <p className="text-sm leading-relaxed text-muted">{item.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 rounded-brand border border-line p-8">
                  <h3 className="font-heading text-lg text-ink">Looking for something specific?</h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted">
                    <li>
                      <span className="font-medium text-ink">Products & downloads</span>
                      {" — "}
                      <a href="/shop" className="text-emerald underline underline-offset-2 hover:opacity-80 transition-opacity">
                        browse the shop
                      </a>
                    </li>
                    <li>
                      <span className="font-medium text-ink">1:1 coaching</span>
                      {" — "}
                      <a href="/coaching" className="text-emerald underline underline-offset-2 hover:opacity-80 transition-opacity">
                        view the coaching page
                      </a>
                    </li>
                    <li>
                      <span className="font-medium text-ink">About Rose</span>
                      {" — "}
                      <a href="/about" className="text-emerald underline underline-offset-2 hover:opacity-80 transition-opacity">
                        read her story
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
