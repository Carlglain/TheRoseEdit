function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface ContactNotificationParams {
  name: string;
  email: string;
  message: string;
}

interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

export function renderContactNotificationEmail({
  name,
  email,
  message,
}: ContactNotificationParams): RenderedEmail {
  const subject = `New enquiry from ${name} — RoseAudit`;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
  const timestamp = new Date().toLocaleString("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Oslo",
  });

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
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
                <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #B8924A; font-weight: bold;">New Enquiry</p>
                <p style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 24px; color: #14110F;">Message from ${safeName}</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 40px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #E4DDD0; border-radius: 8px; overflow: hidden;">
                  <tr>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #E4DDD0; background-color: #F7F3EC;">
                      <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #6B6358;">Name</p>
                      <p style="margin: 4px 0 0; font-size: 14px; color: #14110F; font-weight: bold;">${safeName}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #E4DDD0;">
                      <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #6B6358;">Email</p>
                      <p style="margin: 4px 0 0; font-size: 14px; color: #14110F;">
                        <a href="mailto:${safeEmail}" style="color: #1F4D3A;">${safeEmail}</a>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 16px;">
                      <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #6B6358;">Message</p>
                      <p style="margin: 4px 0 0; font-size: 14px; line-height: 1.7; color: #14110F;">${safeMessage}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 40px 24px;">
                <a href="mailto:${safeEmail}?subject=Re%3A%20Your%20RoseAudit%20enquiry" style="display: inline-block; padding: 12px 24px; background-color: #1F4D3A; color: #F7F3EC; text-decoration: none; font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: bold; border-radius: 8px;">
                  Reply to ${safeName}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 40px 40px; background-color: #14110F;">
                <p style="margin: 0; font-size: 12px; line-height: 1.6; color: rgba(247,243,236,0.6);">
                  Sent on ${timestamp} via the RoseAudit contact form.
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
    `New enquiry from ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
    "",
    `Sent: ${timestamp}`,
  ].join("\n");

  return { subject, html, text };
}
