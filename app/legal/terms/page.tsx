import type { Metadata } from "next";
import { LegalPage, prose } from "@/components/legal/LegalPage";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Terms of Service — ${SITE_NAME}`,
  description: "Terms and conditions for using RoseAudit and purchasing digital products.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="1 July 2026">

      <h2 className={prose.h2}>1. Agreement</h2>
      <p className={prose.p}>
        By accessing{" "}
        <a href="/" className={prose.a}>roseaudit.com</a> or purchasing any product or
        service, you agree to these Terms of Service. If you do not agree, do not use the
        site. These terms are governed by Norwegian law and the applicable EU consumer
        protection framework.
      </p>
      <p className={prose.p}>
        The site is operated by Rose M. Apabeloi, trading as{" "}
        <strong className={prose.strong}>{SITE_NAME}</strong>, org. no.{" "}
        <strong className={prose.strong}>[ORG NUMBER — to be confirmed]</strong>, Norway.
      </p>

      <h2 className={prose.h2}>2. Products & Services</h2>
      <p className={prose.p}>
        {SITE_NAME} offers:
      </p>
      <ul className={prose.ul}>
        <li className={prose.li}>
          <strong className={prose.strong}>Digital products</strong> — e-books, courses, and
          curated resource lists. Delivered electronically via a secure time-limited download
          link sent to the email address provided at checkout.
        </li>
        <li className={prose.li}>
          <strong className={prose.strong}>1:1 Coaching</strong> — individual financial
          strategy sessions conducted online via video call.
        </li>
      </ul>
      <p className={prose.p}>
        Product descriptions are provided in good faith. We reserve the right to withdraw or
        update products at any time before purchase. Prices are shown inclusive of any
        applicable VAT where required by law.
      </p>

      <h2 className={prose.h2}>3. Orders and Payment</h2>
      <p className={prose.p}>
        An order is placed when you click "Pay" and complete payment through Stripe or PayPal.
        A binding contract is formed at that point. We will send you an order confirmation
        email. If we cannot fulfil your order for any reason, we will notify you and issue a
        full refund.
      </p>
      <p className={prose.p}>
        All payments are processed by our third-party providers (Stripe or PayPal). We do not
        store card data. Prices are displayed in{" "}
        <strong className={prose.strong}>[USD / NOK — confirm before launch]</strong>. Stripe
        Tax may add VAT depending on your location.
      </p>

      <h2 className={prose.h2}>4. Digital Delivery</h2>
      <p className={prose.p}>
        Digital products are delivered within minutes of confirmed payment via a secure
        download link sent to your email. The link is valid for 72 hours and a maximum of 5
        downloads. If you experience technical difficulties, contact us at{" "}
        <a href="/contact" className={prose.a}>our contact form</a> and we
        will assist.
      </p>
      <p className={prose.p}>
        You are responsible for ensuring the email address provided at checkout is correct. We
        are not liable for non-delivery caused by an incorrect email address.
      </p>

      <h2 className={prose.h2}>5. Intellectual Property</h2>
      <p className={prose.p}>
        All content on this website — including text, design, and original educational
        materials — is the intellectual property of Rose M. Apabeloi / {SITE_NAME} unless
        otherwise stated.
      </p>
      <p className={prose.p}>
        <strong className={prose.strong}>PLR (Private Label Rights) products:</strong> Where a
        product is based on PLR material, the specific licence terms governing resale,
        modification, and distribution are included in the product. Purchasing a PLR product
        grants you the rights stated in that licence, not broader rights.
      </p>
      <p className={prose.p}>
        You may not reproduce, redistribute, or resell any product beyond the rights explicitly
        granted in its accompanying licence.
      </p>

      <h2 className={prose.h2}>6. User Conduct</h2>
      <p className={prose.p}>
        You agree not to use this site or its products to:
      </p>
      <ul className={prose.ul}>
        <li className={prose.li}>Violate any applicable law or regulation</li>
        <li className={prose.li}>Infringe third-party intellectual property rights</li>
        <li className={prose.li}>Distribute, resell, or share digital products beyond the terms of their licence</li>
        <li className={prose.li}>Engage in fraudulent transactions or chargebacks in bad faith</li>
      </ul>

      <h2 className={prose.h2}>7. Disclaimer</h2>
      <p className={prose.p}>
        Educational content on this site is for informational purposes only and does not
        constitute professional financial, tax, or legal advice. Rose M. Apabeloi is an
        accountant with a Master&apos;s in Accounting &amp; Auditing; the products and coaching
        offered through {SITE_NAME} are general educational resources, not regulated financial
        advisory services. Always consult a qualified professional for your specific situation.
      </p>
      <p className={prose.p}>
        We make reasonable efforts to ensure accuracy but do not warrant that the site is
        error-free or uninterrupted.
      </p>

      <h2 className={prose.h2}>8. Limitation of Liability</h2>
      <p className={prose.p}>
        To the maximum extent permitted by Norwegian law, {SITE_NAME}&apos;s liability for
        any claim arising from the use of this site or its products is limited to the amount
        you paid for the product in question. We are not liable for indirect, consequential,
        or loss-of-profit claims.
      </p>
      <p className={prose.p}>
        Nothing in these terms limits liability for personal injury, fraud, or any other
        matter that cannot be excluded under Norwegian consumer law.
      </p>

      <h2 className={prose.h2}>9. Governing Law</h2>
      <p className={prose.p}>
        These terms are governed by the laws of Norway. For EU/EEA consumers, mandatory
        consumer protection rights in your country of residence are not affected. Disputes
        that cannot be resolved amicably may be referred to the Norwegian Consumer Authority
        (Forbrukertilsynet) or the relevant court in Norway.
      </p>

      <h2 className={prose.h2}>10. Changes to These Terms</h2>
      <p className={prose.p}>
        We may update these terms from time to time. The version in force at the time of your
        purchase applies to that transaction. We will notify you of material changes by
        updating the date above.
      </p>

      <h2 className={prose.h2}>11. Contact</h2>
      <p className={prose.p}>
        Questions about these terms?{" "}
        <a href="/contact" className={prose.a}>our contact form</a>
      </p>
    </LegalPage>
  );
}
