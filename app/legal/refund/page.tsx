import type { Metadata } from "next";
import { LegalPage, prose } from "@/components/legal/LegalPage";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Refund Policy — ${SITE_NAME}`,
  description: "RoseAudit's refund and cancellation policy for digital products and coaching.",
  robots: { index: true, follow: true },
};

export default function RefundPage() {
  return (
    <LegalPage title="Refund Policy" lastUpdated="1 July 2026">

      <h2 className={prose.h2}>1. Summary</h2>
      <p className={prose.p}>
        Digital products that have been delivered are non-refundable. Coaching calls may be
        cancelled up to 24 hours in advance for a full refund. If there is ever a genuine
        problem — wrong product, technical failure, or a product that is materially
        misdescribed — contact us and we will make it right.
      </p>

      <h2 className={prose.h2}>2. Digital Products (E-Books, Courses, Vendor Lists)</h2>
      <h3 className={prose.h3}>2.1 After delivery</h3>
      <p className={prose.p}>
        Under EU consumer law (Consumer Rights Directive, Art. 16(m)), the 14-day right of
        withdrawal does not apply to digital content delivered electronically once the consumer
        has expressly consented to immediate delivery and acknowledged the loss of the right of
        withdrawal.
      </p>
      <p className={prose.p}>
        By completing your purchase and initiating the download, you confirm that you have
        given express consent to immediate delivery and acknowledge that you will not have a
        right of withdrawal once the download has begun.
      </p>
      <div className="mb-4 rounded-brand border border-gold/40 bg-gold/5 px-4 py-3 text-sm">
        <strong className="font-medium text-ink">Important — client action required:</strong>
        <span className="ml-2 text-muted">
          EU law requires the consumer to actively tick a checkbox confirming consent to
          immediate delivery and loss of withdrawal right at the point of purchase. This
          checkbox is not yet implemented in the checkout flow. Add it before launch or risk
          being unable to enforce this clause.
        </span>
      </div>
      <h3 className={prose.h3}>2.2 Before download</h3>
      <p className={prose.p}>
        If you have purchased a digital product but have not yet clicked the download link, you
        may request a refund within 14 days of purchase by emailing{" "}
        <a href="/contact" className={prose.a}>our contact form</a>. Refunds
        will be processed to the original payment method within 5–10 business days.
      </p>
      <h3 className={prose.h3}>2.3 Exceptions</h3>
      <p className={prose.p}>
        A full refund will be issued regardless of download status if:
      </p>
      <ul className={prose.ul}>
        <li className={prose.li}>The product was materially misdescribed on the sales page</li>
        <li className={prose.li}>The download link was technically broken and we were unable to provide a working replacement</li>
        <li className={prose.li}>You were charged for a product you did not intend to purchase due to a site error</li>
      </ul>

      <h2 className={prose.h2}>3. Coaching Calls</h2>
      <ul className={prose.ul}>
        <li className={prose.li}>
          <strong className={prose.strong}>Cancellation 24+ hours before the session:</strong>{" "}
          Full refund, no questions asked. Contact us at{" "}
          <a href="/contact" className={prose.a}>our contact form</a>.
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>Cancellation less than 24 hours before:</strong>{" "}
          No refund, but we will offer one reschedule within 30 days.
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>No-show without notice:</strong>{" "}
          No refund and no reschedule.
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>Cancellation by Rose:</strong>{" "}
          Full refund and/or a reschedule offered.
        </li>
      </ul>

      <h2 className={prose.h2}>4. How to Request a Refund</h2>
      <p className={prose.p}>
        Use <a href="/contact" className={prose.a}>our contact form</a>{" "}
        with the subject line{" "}
        <strong className={prose.strong}>"Refund Request"</strong> and include:
      </p>
      <ul className={prose.ul}>
        <li className={prose.li}>Your name and the email address used at checkout</li>
        <li className={prose.li}>The product or session you are requesting a refund for</li>
        <li className={prose.li}>The reason for your request</li>
      </ul>
      <p className={prose.p}>
        We aim to respond within 2 business days and process approved refunds within 5–10
        business days via the original payment method.
      </p>

      <h2 className={prose.h2}>5. Consumer Rights</h2>
      <p className={prose.p}>
        Nothing in this policy affects your statutory rights as a consumer under Norwegian law
        (forbrukerkjøpsloven) or applicable EU consumer protection legislation. If you believe
        your statutory rights have been violated, you may contact the Norwegian Consumer
        Authority (Forbrukertilsynet) at{" "}
        <a href="https://www.forbrukertilsynet.no" className={prose.a} target="_blank" rel="noopener noreferrer">
          forbrukertilsynet.no
        </a>
        {" "}or the EU Online Dispute Resolution platform at{" "}
        <a href="https://ec.europa.eu/consumers/odr" className={prose.a} target="_blank" rel="noopener noreferrer">
          ec.europa.eu/consumers/odr
        </a>.
      </p>

      <h2 className={prose.h2}>6. Contact</h2>
      <p className={prose.p}>
        Refund questions?{" "}
        <a href="/contact" className={prose.a}>our contact form</a> — we
        respond within 2 business days.
      </p>
    </LegalPage>
  );
}
