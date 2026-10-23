#!/usr/bin/env node
/**
 * Email delivery checker for the Lacrosse Victoria prototype.
 *
 * Reads .env.local, then:
 *   1. reports which variables are present (never prints their values)
 *   2. asks Resend which sending domains are verified on the account
 *   3. optionally sends one real test email
 *
 * Usage:
 *   node scripts/check-email.mjs            # config + domain check only
 *   node scripts/check-email.mjs --send     # also send one test email
 *
 * Exit codes: 0 ok, 1 misconfigured, 2 provider error.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { Resend } from "resend";

const ROOT = resolve(import.meta.dirname, "..");
const ENV_PATH = resolve(ROOT, ".env.local");
const SEND = process.argv.includes("--send");

function loadEnv() {
  if (!existsSync(ENV_PATH)) return {};
  const out = {};
  for (const raw of readFileSync(ENV_PATH, "utf8").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

function mask(value) {
  if (!value) return "(empty)";
  if (value.length <= 8) return "*".repeat(value.length);
  return `${value.slice(0, 4)}…${value.slice(-4)} (${value.length} chars)`;
}

const env = { ...process.env, ...loadEnv() };
const apiKey = (env.RESEND_API_KEY ?? "").trim();
const from = (env.EMAIL_FROM ?? "").trim();
const to = (env.REGISTRATION_TO_EMAIL ?? "").trim() || "darapuspitanurani@gmail.com";

console.log("── Configuration ─────────────────────────────");
console.log(`  .env.local        ${existsSync(ENV_PATH) ? "found" : "MISSING"}`);
console.log(`  RESEND_API_KEY    ${mask(apiKey)}`);
console.log(`  EMAIL_FROM        ${from || "(empty)"}`);
console.log(`  TO                ${to}`);

const problems = [];
if (!apiKey) problems.push("RESEND_API_KEY is empty.");
else if (!apiKey.startsWith("re_")) problems.push("RESEND_API_KEY does not start with re_.");
if (!from) problems.push("EMAIL_FROM is empty.");
if (from && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(from.replace(/^.*<|>.*$/g, ""))) {
  problems.push("EMAIL_FROM is not a valid address (use `Name <addr@domain>` or `addr@domain`).");
}

if (problems.length) {
  console.log("\n── Problems ──────────────────────────────────");
  for (const p of problems) console.log(`  ✗ ${p}`);
  console.log("\nSee docs/email-delivery.md §3 for setup steps.");
  process.exit(1);
}

const resend = new Resend(apiKey);

console.log("\n── Verified sending domains ──────────────────");
let domainsChecked = true;
try {
  const { data, error } = await resend.domains.list();
  if (error) {
    if (error.name === "restricted_api_key") {
      // Sending-only keys cannot read /domains. That is a valid setup, so do
      // not treat it as a failure — the send test below is the real check.
      console.log("  (skipped) API key is sending-only; cannot list domains.");
      console.log("  This is fine: --send below is the real proof of delivery.");
      domainsChecked = false;
    } else {
      console.log(`  ✗ ${error.name}: ${error.message}`);
      process.exit(2);
    }
  }
  if (domainsChecked) {
    const list = data?.data ?? data ?? [];
    if (!list.length) {
      console.log("  (none) — you can only send to the Resend account owner's own address");
      console.log("  using from=onboarding@resend.dev");
    } else {
      for (const d of list) {
        console.log(`  • ${d.name}  status=${d.status}`);
      }
    }
  }
} catch (err) {
  console.log(`  ✗ ${err.message}`);
  process.exit(2);
}

const senderDomain = (from.match(/@([^>\s]+)/)?.[1] ?? "").toLowerCase();
const usingSandbox = senderDomain === "resend.dev";

console.log("\n── Sender analysis ───────────────────────────");
if (usingSandbox) {
  console.log("  from=resend.dev → SANDBOX MODE");
  console.log("  Resend only delivers to the email address that owns the API key.");
  console.log("  If the key belongs to a different address, expect HTTP 403.");
} else {
  console.log(`  from domain = ${senderDomain}`);
  console.log("  This domain must appear as verified above, otherwise Resend returns 403.");
}

if (!SEND) {
  console.log("\nDone (config only). Re-run with --send to send one test email.");
  process.exit(0);
}

console.log("\n── Sending test email ────────────────────────");
const subject = `Lacrosse Victoria prototype — email delivery test ${new Date().toISOString()}`;
const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;">
    <div style="background:#002854;color:#fff;padding:20px 24px;font-size:13px;letter-spacing:1.6px;font-weight:bold;">
      LACROSSE VICTORIA
    </div>
    <div style="height:4px;background:#4AB7F3;"></div>
    <div style="padding:24px;">
      <p style="font-size:16px;color:#171717;margin:0 0 12px;">Email delivery is working.</p>
      <p style="font-size:14px;color:#5b6570;line-height:21px;margin:0;">
        This is a test message from the Find a Club prototype.
        If you can read this in Gmail, the registration form can deliver enquiries.
      </p>
    </div>
  </div>`;

try {
  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    html,
    text: "Email delivery is working. This is a test message from the Find a Club prototype.",
  });

  if (error || !data?.id) {
    console.log(`  ✗ ${error?.name ?? "error"}: ${error?.message ?? "no id returned"}`);
    if (error?.statusCode === 403) {
      console.log("  → 403 means the `from` address is not allowed to send to this recipient.");
      console.log("    Verify a domain, or send to the Resend account owner's own address.");
    }
    process.exit(2);
  }

  console.log(`  ✓ accepted by Resend, provider id: ${data.id}`);
  console.log(`\nNow open ${to} (and the Spam folder) and confirm the message arrived.`);
  console.log("Record the result in docs/email-delivery.md §8.");
} catch (err) {
  console.log(`  ✗ ${err.message}`);
  process.exit(2);
}
