import { escapeHtml } from "./validation";
import type { Club } from "./clubs";
import type { RegistrationPayload } from "./validation";

const NAVY = "#002854";
const SKY = "#4AB7F3";
const INK = "#171717";
const MUTED = "#5b6570";
const PANEL = "#F8F9FA";
const BORDER = "#E4E7EA";

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:9px 0;border-bottom:1px solid ${BORDER};font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:${MUTED};width:190px;vertical-align:top;">${escapeHtml(
        label,
      )}</td>
      <td style="padding:9px 0;border-bottom:1px solid ${BORDER};font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;color:${INK};vertical-align:top;">${value}</td>
    </tr>`;
}

function consentLine(label: string, agreed: boolean): string {
  const mark = agreed ? "&#10003;" : "&#10007;";
  const color = agreed ? "#1F7A4D" : "#9FA5AB";
  const text = agreed ? "Agreed" : "Not agreed";
  return `
    <tr>
      <td style="padding:7px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:${MUTED};vertical-align:top;width:22px;color:${color};font-weight:bold;">${mark}</td>
      <td style="padding:7px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:${MUTED};vertical-align:top;">
        <span style="color:${INK};font-weight:bold;">${escapeHtml(text)}</span> &mdash; ${escapeHtml(label)}
      </td>
    </tr>`;
}

export function buildEnquirySubject(club: Club): string {
  // Built from the dataset, never from free-text input, so no header injection.
  return `New Lacrosse Victoria Club Enquiry — ${club.displayName}`;
}

export function buildEnquiryHtml(
  data: RegistrationPayload,
  club: Club,
  submittedAt: Date,
): string {
  const when = new Intl.DateTimeFormat("en-AU", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Australia/Melbourne",
  }).format(submittedAt);

  const notesBlock = data.notes
    ? `
    <tr>
      <td style="padding:0 32px 24px 32px;">
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:${MUTED};font-weight:bold;padding-bottom:8px;">Notes</div>
        <div style="background:${PANEL};border-left:3px solid ${SKY};padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:${INK};">${escapeHtml(
          data.notes,
        ).replace(/\n/g, "<br>")}</div>
      </td>
    </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>New club enquiry</title>
</head>
<body style="margin:0;padding:0;background:#eef1f4;">
<!-- Preheader -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">New enquiry for ${escapeHtml(
    club.displayName,
  )} from ${escapeHtml(data.name)}.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef1f4;padding:24px 12px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#ffffff;border:1px solid ${BORDER};">

        <!-- Header -->
        <tr>
          <td style="background:${NAVY};padding:22px 32px;">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;letter-spacing:2.4px;color:#ffffff;font-weight:bold;">LACROSSE VICTORIA</div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1.6px;color:${SKY};padding-top:5px;">FIND A CLUB</div>
          </td>
        </tr>
        <tr><td style="height:4px;background:${SKY};line-height:4px;font-size:0;">&nbsp;</td></tr>

        <!-- Title -->
        <tr>
          <td style="padding:30px 32px 6px 32px;">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:29px;color:${INK};font-weight:bold;">New club enquiry received</div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:${MUTED};padding-top:8px;">${escapeHtml(
              when,
            )} (Australia/Melbourne)</div>
          </td>
        </tr>

        <!-- Club block -->
        <tr>
          <td style="padding:22px 32px 8px 32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PANEL};border-left:3px solid ${NAVY};">
              <tr>
                <td style="padding:16px 18px;">
                  <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:${MUTED};font-weight:bold;padding-bottom:6px;">Selected club</div>
                  <div style="font-family:Arial,Helvetica,sans-serif;font-size:18px;line-height:24px;color:${NAVY};font-weight:bold;">${escapeHtml(
                    club.displayName,
                  )}</div>
                  <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:${MUTED};padding-top:6px;">${escapeHtml(
                    club.address,
                  )}<br>${escapeHtml(club.suburb)}, ${escapeHtml(club.postcode)}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Enquiry detail -->
        <tr>
          <td style="padding:20px 32px 0 32px;">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:${MUTED};font-weight:bold;padding-bottom:4px;">Enquiry details</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${row("Program", escapeHtml(data.program))}
              ${row("I'm interested in", escapeHtml(data.interest))}
              ${row("Player age / age group", escapeHtml(data.ageGroup))}
              ${row("Previous lacrosse experience", escapeHtml(data.experience))}
            </table>
          </td>
        </tr>

        <!-- Registrant -->
        <tr>
          <td style="padding:26px 32px 0 32px;">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:${MUTED};font-weight:bold;padding-bottom:4px;">Registrant</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${row("Name", escapeHtml(data.name))}
              ${row(
                "Email address",
                `<a href="mailto:${encodeURIComponent(data.email)}" style="color:${NAVY};text-decoration:underline;">${escapeHtml(
                  data.email,
                )}</a>`,
              )}
              ${row(
                "Phone number",
                `<a href="tel:${encodeURIComponent(data.phone.replace(/[^0-9+]/g, ""))}" style="color:${NAVY};text-decoration:underline;">${escapeHtml(
                  data.phone,
                )}</a>`,
              )}
              ${row("Suburb / postcode", escapeHtml(data.location))}
            </table>
          </td>
        </tr>

        ${notesBlock}

        <!-- Consent -->
        <tr>
          <td style="padding:6px 32px 8px 32px;">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:${MUTED};font-weight:bold;padding:18px 0 6px 0;">Consent</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${consentLine(
                "Receive promotional, event and activity communications from Lacrosse Victoria.",
                data.marketingConsent,
              )}
              ${consentLine(
                "Lacrosse Victoria collecting and sharing details with the selected club to respond to this enquiry.",
                data.enquiryConsent,
              )}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:22px 32px 26px 32px;border-top:1px solid ${BORDER};">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:17px;color:${MUTED};">
              Sent automatically from the Lacrosse Victoria <strong style="color:${INK};">Find a Club</strong> prototype.
              Reply directly to this email to contact the registrant.
            </div>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export function buildEnquiryText(
  data: RegistrationPayload,
  club: Club,
  submittedAt: Date,
): string {
  const when = new Intl.DateTimeFormat("en-AU", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Australia/Melbourne",
  }).format(submittedAt);

  const lines = [
    "LACROSSE VICTORIA — FIND A CLUB",
    "",
    "New club enquiry received",
    when + " (Australia/Melbourne)",
    "",
    "SELECTED CLUB",
    club.displayName,
    club.address,
    `${club.suburb}, ${club.postcode}`,
    "",
    "ENQUIRY DETAILS",
    `Program: ${data.program}`,
    `I'm interested in: ${data.interest}`,
    `Player age / age group: ${data.ageGroup}`,
    `Previous lacrosse experience: ${data.experience}`,
    "",
    "REGISTRANT",
    `Name: ${data.name}`,
    `Email address: ${data.email}`,
    `Phone number: ${data.phone}`,
    `Suburb / postcode: ${data.location}`,
  ];

  if (data.notes) lines.push("", "NOTES", data.notes);

  lines.push(
    "",
    "CONSENT",
    `[${data.marketingConsent ? "x" : " "}] Receive promotional, event and activity communications from Lacrosse Victoria.`,
    `[${data.enquiryConsent ? "x" : " "}] Lacrosse Victoria collecting and sharing details with the selected club to respond to this enquiry.`,
    "",
    "Sent automatically from the Lacrosse Victoria Find a Club prototype.",
  );

  return lines.join("\n");
}
