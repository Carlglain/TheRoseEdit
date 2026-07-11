import { Container } from "@/components/ui/Container";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <main id="main-content">
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 rounded-brand border border-gold/40 bg-gold/5 px-4 py-3 text-sm">
              <strong className="font-medium text-ink">Client notice:</strong>
              <span className="ml-2 text-muted">
                This is structured placeholder text. Have it reviewed and approved by a
                qualified Norwegian lawyer before the site goes live.
              </span>
            </div>

            <span className="text-xs font-medium uppercase tracking-widest text-gold">Legal</span>
            <h1 className="mt-4 font-heading text-4xl text-ink md:text-5xl">{title}</h1>
            <p className="mt-3 text-sm text-muted">Last updated: {lastUpdated}</p>

            <div className="mt-10 border-t border-line pt-10">
              {children}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

/* Shared prose element styles — import and use directly in legal page files. */
export const prose = {
  h2: "mt-10 mb-4 font-heading text-2xl text-ink first:mt-0",
  h3: "mt-6 mb-3 font-medium text-base text-ink",
  p: "mb-4 text-sm leading-relaxed text-muted",
  ul: "mb-4 ml-5 list-disc space-y-1.5",
  li: "text-sm leading-relaxed text-muted",
  strong: "font-medium text-ink",
  a: "text-emerald underline underline-offset-2 hover:opacity-80 transition-opacity",
};
