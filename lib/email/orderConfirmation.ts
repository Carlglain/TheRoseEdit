import { formatPrice } from "@/lib/format";

interface OrderEmailItem {
  name: string;
  downloadUrl: string;
}

interface OrderConfirmationEmailParams {
  items: OrderEmailItem[];
  amountMinor: number;
  currency: string;
}

interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Inline styles + table layout throughout — most email clients strip <style> blocks and have
// poor flexbox/grid support, so this is the standard, safe approach for transactional email.
export function renderOrderConfirmationEmail({
  items,
  amountMinor,
  currency,
}: OrderConfirmationEmailParams): RenderedEmail {
  const subject = "Your RoseAudit order is ready";

  const itemRows = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 16px 0; border-bottom: 1px solid #E4DDD0;">
            <p style="margin: 0 0 10px; font-family: Georgia, 'Times New Roman', serif; font-size: 16px; color: #14110F;">${escapeHtml(item.name)}</p>
            <a href="${item.downloadUrl}" style="display: inline-block; padding: 10px 20px; background-color: #B8924A; color: #14110F; text-decoration: none; font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: bold; border-radius: 8px;">
              Download Now
            </a>
          </td>
        </tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${subject}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #F7F3EC; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F7F3EC; padding: 40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #FFFFFF; border-radius: 14px; overflow: hidden;">
            <tr>
              <td style="padding: 32px 40px 8px;">
                <p style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 22px; color: #14110F;">RoseAudit</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 40px 24px;">
                <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #B8924A; font-weight: bold;">Order Confirmed</p>
                <p style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 24px; color: #14110F;">Thank you for your order</p>
                <p style="margin: 12px 0 0; font-size: 14px; line-height: 1.6; color: #6B6358;">
                  Your payment has been received. Your download link${items.length > 1 ? "s are" : " is"} below — each link works up to 5 times and expires in 72 hours.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${itemRows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 16px 40px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size: 14px; color: #6B6358;">Total paid</td>
                    <td style="font-size: 14px; color: #14110F; text-align: right; font-weight: bold;">${formatPrice(amountMinor, currency)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 40px 40px; background-color: #14110F;">
                <p style="margin: 0; font-size: 12px; line-height: 1.6; color: rgba(247,243,236,0.6);">
                  Questions about your order? Reply to this email or reach us at
                  <a href="mailto:theroseaudit@gmail.com" style="color: #B8924A;">theroseaudit@gmail.com</a>.
                </p>
                <p style="margin: 12px 0 0; font-size: 11px; color: rgba(247,243,236,0.4);">
                  © ${new Date().getFullYear()} RoseAudit. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "Thank you for your order!",
    "",
    `Your payment has been received. Download link${items.length > 1 ? "s" : ""} (valid for 5 downloads, expires in 72 hours):`,
    "",
    ...items.map((item) => `${item.name}: ${item.downloadUrl}`),
    "",
    `Total paid: ${formatPrice(amountMinor, currency)}`,
    "",
    "Questions? Reply to this email or contact theroseaudit@gmail.com",
  ].join("\n");

  return { subject, html, text };
}
