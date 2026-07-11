import type { Metadata } from "next";
import { LegalPage, prose } from "@/components/legal/LegalPage";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Privacy Policy — ${SITE_NAME}`,
  description: "How RoseAudit collects, stores, and processes your personal data under GDPR.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="1 July 2026">

      <h2 className={prose.h2}>1. Data Controller</h2>
      <p className={prose.p}>
        <strong className={prose.strong}>{SITE_NAME}</strong> (trading name of Rose M. Apabeloi,
        org. no. <strong className={prose.strong}>[ORG NUMBER — to be confirmed]</strong>,
        Norway) is the data controller for personal data collected through this website.
      </p>
      <p className={prose.p}>
        Contact for data-related enquiries:{" "}
        <a href="/contact" className={prose.a}>our contact form</a>
      </p>

      <h2 className={prose.h2}>2. What Personal Data We Collect</h2>
      <h3 className={prose.h3}>2.1 When you purchase a product</h3>
      <ul className={prose.ul}>
        <li className={prose.li}>Email address — to deliver your purchase and send a receipt</li>
        <li className={prose.li}>Payment details — processed directly by Stripe or PayPal; we never see or store card numbers</li>
        <li className={prose.li}>IP address and browser metadata — captured by our payment processors for fraud prevention</li>
      </ul>
      <h3 className={prose.h3}>2.2 When you subscribe to the newsletter or submit a lead form</h3>
      <ul className={prose.ul}>
        <li className={prose.li}>Email address</li>
        <li className={prose.li}>The context you subscribed from (e.g. "footer", "product page")</li>
      </ul>
      <h3 className={prose.h3}>2.3 When you submit the contact form</h3>
      <ul className={prose.ul}>
        <li className={prose.li}>Name, email address, and the content of your message</li>
      </ul>
      <h3 className={prose.h3}>2.4 When you book a coaching call</h3>
      <ul className={prose.ul}>
        <li className={prose.li}>Email address, payment details (processed by Stripe)</li>
        <li className={prose.li}>Any information you share during the session is treated as confidential</li>
      </ul>

      <h2 className={prose.h2}>3. Why We Collect It — Purposes and Legal Basis</h2>
      <ul className={prose.ul}>
        <li className={prose.li}>
          <strong className={prose.strong}>Fulfilling your order</strong> — email + payment
          data are processed to deliver your digital product and issue receipts. Legal basis:
          performance of a contract (GDPR Art. 6(1)(b)).
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>Email marketing</strong> — newsletter subscribers
          receive updates, product launches, and educational content. Legal basis: consent
          (Art. 6(1)(a)). You may withdraw consent at any time by replying to any email with
          "unsubscribe".
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>Responding to enquiries</strong> — contact form
          messages are stored so we can respond. Legal basis: legitimate interests
          (Art. 6(1)(f)).
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>Legal obligations</strong> — transaction records
          may be retained to comply with Norwegian bookkeeping law (regnskapsloven). Legal
          basis: legal obligation (Art. 6(1)(c)).
        </li>
      </ul>

      <h2 className={prose.h2}>4. Data Processors</h2>
      <p className={prose.p}>
        We share personal data only with the following third-party processors under data
        processing agreements:
      </p>
      <ul className={prose.ul}>
        <li className={prose.li}>
          <strong className={prose.strong}>Supabase Inc.</strong> — database and file storage
          hosted in the EU (Frankfurt region). Stores email addresses, order records, and
          download grant tokens. Privacy:{" "}
          <a href="https://supabase.com/privacy" className={prose.a} target="_blank" rel="noopener noreferrer">
            supabase.com/privacy
          </a>
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>Stripe, Inc.</strong> — payment processing. Handles
          card data under PCI DSS compliance. Does not store card data on our servers.
          Privacy:{" "}
          <a href="https://stripe.com/privacy" className={prose.a} target="_blank" rel="noopener noreferrer">
            stripe.com/privacy
          </a>
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>PayPal Holdings, Inc.</strong> — alternative
          payment processing. Subject to PayPal's own privacy policy:{" "}
          <a href="https://www.paypal.com/webapps/mpp/ua/privacy-full" className={prose.a} target="_blank" rel="noopener noreferrer">
            paypal.com/privacy
          </a>
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>Resend (Y Combinator-backed)</strong> — transactional
          email delivery. Used to send order confirmations and contact form notifications.
          Privacy:{" "}
          <a href="https://resend.com/legal/privacy-policy" className={prose.a} target="_blank" rel="noopener noreferrer">
            resend.com/legal/privacy-policy
          </a>
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>Vercel Inc.</strong> — website hosting (EU region
          where selected). Processes IP addresses and request logs. Privacy:{" "}
          <a href="https://vercel.com/legal/privacy-policy" className={prose.a} target="_blank" rel="noopener noreferrer">
            vercel.com/legal/privacy-policy
          </a>
        </li>
      </ul>
      <p className={prose.p}>
        Data is not sold, rented, or disclosed to any other third party except as required by
        Norwegian or EU law.
      </p>

      <h2 className={prose.h2}>5. Retention</h2>
      <ul className={prose.ul}>
        <li className={prose.li}>
          <strong className={prose.strong}>Order records</strong> — retained for 5 years to
          comply with Norwegian bookkeeping law (regnskapsloven § 13).
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>Newsletter subscriptions</strong> — retained until
          you unsubscribe.
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>Contact form messages</strong> — retained for up to
          2 years unless you request deletion earlier.
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>Download links</strong> — expire automatically after
          72 hours.
        </li>
      </ul>

      <h2 className={prose.h2}>6. Your Rights Under GDPR</h2>
      <p className={prose.p}>
        As a data subject you have the following rights. To exercise any of them, contact us
        at{" "}
        <a href="/contact" className={prose.a}>our contact form</a>. We will
        respond within 30 days.
      </p>
      <ul className={prose.ul}>
        <li className={prose.li}>
          <strong className={prose.strong}>Right of access (Art. 15)</strong> — you may
          request a copy of the personal data we hold about you.
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>Right to rectification (Art. 16)</strong> — you may
          ask us to correct inaccurate data.
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>Right to erasure (Art. 17)</strong> — you may
          request deletion of your data, subject to retention obligations (e.g. bookkeeping
          law).
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>Right to data portability (Art. 20)</strong> — you
          may request your data in a structured, machine-readable format.
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>Right to restrict processing (Art. 18)</strong> —
          you may request that we limit how we use your data while a dispute is resolved.
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>Right to object (Art. 21)</strong> — you may object
          to processing based on legitimate interests.
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>Right to withdraw consent</strong> — where
          processing is based on consent, you may withdraw it at any time.
        </li>
      </ul>
      <p className={prose.p}>
        You also have the right to lodge a complaint with the Norwegian Data Protection
        Authority (Datatilsynet):{" "}
        <a href="https://www.datatilsynet.no" className={prose.a} target="_blank" rel="noopener noreferrer">
          datatilsynet.no
        </a>
      </p>

      <h2 className={prose.h2}>7. Cookies</h2>
      <p className={prose.p}>
        This website uses only one cookie set by us: a <strong className={prose.strong}>cart
        session cookie</strong> (<code>roseaudit_cart</code>) that stores the product IDs
        in your shopping basket. It contains no personal data and expires when you clear your
        browser data.
      </p>
      <p className={prose.p}>
        We do not use advertising, tracking, or analytics cookies. Third-party payment widgets
        (Stripe, PayPal) may set their own cookies when you interact with checkout; these are
        governed by those providers' policies listed in Section 4.
      </p>

      <h2 className={prose.h2}>8. International Transfers</h2>
      <p className={prose.p}>
        All primary data storage is within the EU (Supabase, Frankfurt region). Stripe and
        PayPal may transfer data outside the EEA under Standard Contractual Clauses as
        described in their respective data processing agreements.
      </p>

      <h2 className={prose.h2}>9. Changes to This Policy</h2>
      <p className={prose.p}>
        We may update this policy from time to time. Material changes will be notified by
        updating the "last updated" date above. Continued use of the site after a change
        constitutes acceptance of the revised policy.
      </p>

      <h2 className={prose.h2}>10. Contact</h2>
      <p className={prose.p}>
        For any privacy-related questions or to exercise your rights, contact Rose at{" "}
        <a href="/contact" className={prose.a}>our contact form</a>.
      </p>
    </LegalPage>
  );
}
