import { NextResponse } from "next/server";
import { Resend } from "resend";
import { findClub } from "@/lib/clubs";
import { validateRegistration } from "@/lib/validation";
import {
  buildEnquiryHtml,
  buildEnquirySubject,
  buildEnquiryText,
} from "@/lib/email-template";

// Next.js 16 with `cacheComponents` rejects segment config (`runtime`,
// `dynamic`). POST handlers are always dynamic, so no opt-out is needed.

/**
 * Recipient is resolved server-side only. There is no field in the request
 * contract that can change it — see docs/email-delivery.md section 7.
 */
const DEFAULT_TO_EMAIL = "darapuspitanurani@gmail.com";
const MAX_BODY_BYTES = 32 * 1024;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const key = clientKey(request);
  if (rateLimited(key)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "payload_too_large" },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const { ok, data, fieldErrors } = validateRegistration(body);
  if (!ok || !data) {
    return NextResponse.json(
      { ok: false, error: "validation_failed", fieldErrors },
      { status: 400 },
    );
  }

  const club = findClub(data.clubId);
  if (!club) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation_failed",
        fieldErrors: { clubId: "Please select a club from the list." },
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  const to = process.env.REGISTRATION_TO_EMAIL?.trim() || DEFAULT_TO_EMAIL;

  if (!apiKey || !from) {
    // Honest failure: never return ok:true when delivery cannot be attempted.
    console.error(
      "[registrations] Email delivery is not configured (RESEND_API_KEY / EMAIL_FROM missing).",
    );
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 },
    );
  }

  const submittedAt = new Date();
  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: buildEnquirySubject(club),
      html: buildEnquiryHtml(data, club, submittedAt),
      text: buildEnquiryText(data, club, submittedAt),
    });

    if (result.error || !result.data?.id) {
      console.error("[registrations] Resend rejected the send:", {
        name: result.error?.name,
        message: result.error?.message,
      });
      return NextResponse.json(
        { ok: false, error: "provider_error" },
        { status: 502 },
      );
    }

    // Only reachable when the provider accepted the send and returned an id.
    return NextResponse.json({ ok: true, providerId: result.data.id });
  } catch (error) {
    console.error("[registrations] Unexpected send failure:", error);
    return NextResponse.json(
      { ok: false, error: "provider_error" },
      { status: 502 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "method_not_allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}
