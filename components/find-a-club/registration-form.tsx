"use client";

import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import {
  AGE_GROUPS,
  CLUBS,
  EXPERIENCES,
  INTERESTS,
  PROGRAMS,
  findClub,
} from "@/lib/clubs";
import { validateRegistration, type FieldErrors } from "@/lib/validation";

type Values = {
  name: string;
  email: string;
  phone: string;
  location: string;
  clubId: string;
  program: string;
  interest: string;
  ageGroup: string;
  experience: string;
  notes: string;
  marketingConsent: boolean;
  enquiryConsent: boolean;
};

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: Values = {
  name: "",
  email: "",
  phone: "",
  location: "",
  clubId: "",
  program: "",
  interest: "",
  ageGroup: "",
  experience: "",
  notes: "",
  marketingConsent: false,
  enquiryConsent: false,
};

const PREFILL_KEY = "lv-prefill-email";

const ERROR_MESSAGES: Record<string, string> = {
  not_configured:
    "Enquiry delivery is not configured yet. Please contact Lacrosse Victoria directly.",
  provider_error:
    "Something went wrong while sending your enquiry. Please try again.",
  rate_limited: "Too many attempts. Please wait a minute and try again.",
  payload_too_large: "Your message is too long. Please shorten the notes field.",
  invalid_json: "Something went wrong. Please refresh and try again.",
  validation_failed: "Please check the highlighted fields and try again.",
};

export function RegistrationForm({
  clubId,
  onClubChange,
  onReset,
}: {
  clubId: string | null;
  onClubChange: (id: string) => void;
  onReset: () => void;
}) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [providerId, setProviderId] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const submittingRef = useRef(false);

  // Prefill email captured by the welcome popup.
  // Wrapped in startTransition so the update is not a synchronous cascading
  // render inside the effect body (react-hooks/set-state-in-effect).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.sessionStorage.getItem(PREFILL_KEY);
    if (!stored) return;
    startTransition(() => {
      setValues((current) =>
        current.email ? current : { ...current, email: stored },
      );
    });
  }, []);

  // Keep the Club field in sync with the map/list selection.
  useEffect(() => {
    if (!clubId) return;
    startTransition(() => {
      setValues((current) =>
        current.clubId === clubId ? current : { ...current, clubId },
      );
    });
  }, [clubId]);

  const selectedClub = useMemo(
    () => (values.clubId ? findClub(values.clubId) : undefined),
    [values.clubId],
  );

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
    if (status === "error") {
      setStatus("idle");
      setServerError(null);
    }
  }

  function handleClubChange(id: string) {
    set("clubId", id);
    onClubChange(id);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    const result = validateRegistration({
      ...values,
      notes: values.notes,
    });

    if (!result.ok) {
      setErrors(result.fieldErrors);
      setStatus("idle");
      setServerError(null);
      setTouched(
        Object.fromEntries(Object.keys(result.fieldErrors).map((key) => [key, true])),
      );
      const firstKey = Object.keys(result.fieldErrors)[0];
      if (firstKey) {
        document
          .querySelector<HTMLElement>(`[data-field="${firstKey}"]`)
          ?.focus?.();
      }
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");
    setServerError(null);

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload: unknown = await response.json().catch(() => null);
      const body = (payload ?? {}) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: FieldErrors;
        providerId?: string;
      };

      if (!response.ok || !body.ok || !body.providerId) {
        if (body.fieldErrors) setErrors(body.fieldErrors);
        setStatus("error");
        setServerError(
          ERROR_MESSAGES[body.error ?? ""] ?? ERROR_MESSAGES.provider_error,
        );
        return;
      }

      // Success is only reachable with ok:true AND a provider id.
      setProviderId(body.providerId);
      setStatus("success");
    } catch {
      setStatus("error");
      setServerError(
        "We couldn't reach the server. Check your connection and try again.",
      );
    } finally {
      submittingRef.current = false;
    }
  }

  if (status === "success" && selectedClub) {
    return (
      <section className="lv-form-card" aria-labelledby="form-heading">
        <div className="lv-success" role="status">
          <h2 className="lv-success__title" id="form-heading">
            Enquiry sent
          </h2>
          <p className="lv-success__body">
            Thanks, {values.name.split(" ")[0] || "there"}. Your enquiry for{" "}
            <strong>{selectedClub.displayName}</strong> has been sent to Lacrosse
            Victoria. The club will be in touch to follow up.
          </p>
          <p className="lv-success__meta">Reference: {providerId}</p>
          <div className="lv-success__actions">
            <button
              type="button"
              className="lv-btn lv-btn--outline"
              onClick={() => {
                setValues(EMPTY);
                setProviderId(null);
                setStatus("idle");
                onReset();
              }}
            >
              Find another club
            </button>
          </div>
        </div>
      </section>
    );
  }

  const busy = status === "submitting";

  return (
    <section className="lv-form-card" aria-labelledby="form-heading">
      <div className="lv-form-card__head">
        <p className="lv-eyebrow">Step 2</p>
        <h2 className="lv-h2" id="form-heading">
          Register your interest
        </h2>
        <p className="lv-form-card__sub">
          {selectedClub
            ? `Your enquiry will be sent to ${selectedClub.displayName}.`
            : "Choose a club above, then tell us a little about you."}
        </p>
      </div>

      {status === "error" && serverError && (
        <div className="lv-alert lv-alert--error" role="alert">
          <p className="lv-alert__title">We couldn&apos;t send your enquiry</p>
          <p className="lv-alert__body">{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="lv-form-grid">
          <Field
            id="name"
            label="Name"
            required
            error={touched.name ? errors.name : undefined}
          >
            <input
              id="name"
              data-field="name"
              className="lv-input"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={values.name}
              onChange={(event) => set("name", event.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              aria-invalid={errors.name ? "true" : undefined}
              aria-describedby={errors.name ? "name-error" : undefined}
              aria-required="true"
            />
          </Field>

          <Field
            id="email"
            label="Email address"
            required
            error={touched.email ? errors.email : undefined}
          >
            <input
              id="email"
              data-field="email"
              className="lv-input"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={(event) => set("email", event.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-required="true"
            />
          </Field>

          <Field
            id="phone"
            label="Phone number"
            required
            error={touched.phone ? errors.phone : undefined}
          >
            <input
              id="phone"
              data-field="phone"
              className="lv-input"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="e.g. 04xx xxx xxx"
              value={values.phone}
              onChange={(event) => set("phone", event.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              aria-invalid={errors.phone ? "true" : undefined}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              aria-required="true"
            />
          </Field>

          <Field
            id="location"
            label="Suburb / postcode"
            required
            error={touched.location ? errors.location : undefined}
          >
            <input
              id="location"
              data-field="location"
              className="lv-input"
              type="text"
              autoComplete="address-level2"
              placeholder="e.g. Brunswick 3057"
              value={values.location}
              onChange={(event) => set("location", event.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, location: true }))}
              aria-invalid={errors.location ? "true" : undefined}
              aria-describedby={errors.location ? "location-error" : undefined}
              aria-required="true"
            />
          </Field>

          <Field
            id="clubId"
            label="Club"
            required
            full
            error={touched.clubId ? errors.clubId : undefined}
          >
            <select
              id="clubId"
              data-field="clubId"
              className="lv-select"
              value={values.clubId}
              onChange={(event) => handleClubChange(event.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, clubId: true }))}
              aria-invalid={errors.clubId ? "true" : undefined}
              aria-describedby={errors.clubId ? "clubId-error" : undefined}
              aria-required="true"
            >
              <option value="">Select a club</option>
              {CLUBS.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.displayName} — {club.suburb}
                </option>
              ))}
            </select>
          </Field>

          <Field
            id="program"
            label="Program"
            required
            error={touched.program ? errors.program : undefined}
          >
            <select
              id="program"
              data-field="program"
              className="lv-select"
              value={values.program}
              onChange={(event) => set("program", event.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, program: true }))}
              aria-invalid={errors.program ? "true" : undefined}
              aria-describedby={errors.program ? "program-error" : undefined}
              aria-required="true"
            >
              <option value="">Select a program</option>
              {PROGRAMS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field
            id="interest"
            label="I'm interested in"
            required
            error={touched.interest ? errors.interest : undefined}
          >
            <select
              id="interest"
              data-field="interest"
              className="lv-select"
              value={values.interest}
              onChange={(event) => set("interest", event.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, interest: true }))}
              aria-invalid={errors.interest ? "true" : undefined}
              aria-describedby={errors.interest ? "interest-error" : undefined}
              aria-required="true"
            >
              <option value="">Select an option</option>
              {INTERESTS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field
            id="ageGroup"
            label="Player age / age group"
            required
            error={touched.ageGroup ? errors.ageGroup : undefined}
          >
            <select
              id="ageGroup"
              data-field="ageGroup"
              className="lv-select"
              value={values.ageGroup}
              onChange={(event) => set("ageGroup", event.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, ageGroup: true }))}
              aria-invalid={errors.ageGroup ? "true" : undefined}
              aria-describedby={errors.ageGroup ? "ageGroup-error" : undefined}
              aria-required="true"
            >
              <option value="">Select an age group</option>
              {AGE_GROUPS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field
            id="experience"
            label="Previous lacrosse experience"
            required
            error={touched.experience ? errors.experience : undefined}
          >
            <select
              id="experience"
              data-field="experience"
              className="lv-select"
              value={values.experience}
              onChange={(event) => set("experience", event.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, experience: true }))}
              aria-invalid={errors.experience ? "true" : undefined}
              aria-describedby={errors.experience ? "experience-error" : undefined}
              aria-required="true"
            >
              <option value="">Select an option</option>
              {EXPERIENCES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field
            id="notes"
            label="Notes (optional)"
            error={touched.notes ? errors.notes : undefined}
            full
            hint="Anything we should know? This goes straight to the club."
          >
            <textarea
              id="notes"
              data-field="notes"
              className="lv-textarea"
              rows={4}
              placeholder="Anything we should know?"
              value={values.notes}
              onChange={(event) => set("notes", event.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, notes: true }))}
              aria-invalid={errors.notes ? "true" : undefined}
              aria-describedby={errors.notes ? "notes-error" : undefined}
              maxLength={1000}
            />
          </Field>
        </div>

        <fieldset className="lv-consent">
          <legend className="lv-consent__legend">Consent</legend>

          <label className="lv-check">
            <input
              type="checkbox"
              checked={values.marketingConsent}
              onChange={(event) => set("marketingConsent", event.target.checked)}
            />
            <span>
              I agree to receive promotional, event and activity communications from
              Lacrosse Victoria.{" "}
              <span className="lv-check__optional">(optional)</span>
            </span>
          </label>

          <label
            className={`lv-check${errors.enquiryConsent ? " lv-check--error" : ""}`}
          >
            <input
              type="checkbox"
              data-field="enquiryConsent"
              checked={values.enquiryConsent}
              onChange={(event) => set("enquiryConsent", event.target.checked)}
              aria-invalid={errors.enquiryConsent ? "true" : undefined}
              aria-describedby={
                errors.enquiryConsent ? "enquiryConsent-error" : undefined
              }
              aria-required="true"
            />
            <span>
              I agree to Lacrosse Victoria collecting and sharing my details with the
              selected club for the purpose of responding to my enquiry.
              <span className="lv-label__req" aria-hidden="true">
                *
              </span>
              <span className="sr-only">(required)</span>
            </span>
          </label>
          {errors.enquiryConsent && (
            <p className="lv-error-text" id="enquiryConsent-error">
              {errors.enquiryConsent}
            </p>
          )}
        </fieldset>

        <div className="lv-form-actions">
          <button
            type="submit"
            className="lv-btn lv-btn--primary"
            disabled={busy}
            aria-busy={busy}
          >
            {busy ? (
              <>
                <span className="lv-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              "Submit enquiry"
            )}
          </button>
          <p className="lv-form-actions__note">
            Required fields are marked with <span aria-hidden="true">*</span>
            <span className="sr-only">an asterisk</span>.
          </p>
        </div>
      </form>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  full,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`lv-field${full ? " lv-field--full" : ""}`}>
      <label className="lv-label" htmlFor={id}>
        {label}
        {required && (
          <span className="lv-label__req" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p className="lv-error-text" id={`${id}-error`}>
          {error}
        </p>
      ) : hint ? (
        <p className="lv-hint">{hint}</p>
      ) : null}
    </div>
  );
}
