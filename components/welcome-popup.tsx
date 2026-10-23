"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "lv-popup-dismissed";
const PREFILL_KEY = "lv-prefill-email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Welcome email popup.
 * Shows once per browser session (sessionStorage, not localStorage, so the
 * prototype still demonstrates the feature on a later visit).
 * It never sends anything — it only stores a prefill value for the
 * registration form. See docs/user-flow-and-form.md section 2.
 */
export function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORAGE_KEY) === "1") return;
    const timer = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    }
    setOpen(false);
    setError(null);
    restoreFocusRef.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const timer = setTimeout(() => inputRef.current?.focus(), 60);

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  function handleContinue() {
    const value = email.trim();
    if (value && !EMAIL_RE.test(value)) {
      setError("Please enter a valid email address, or skip this step.");
      return;
    }
    if (value && typeof window !== "undefined") {
      window.sessionStorage.setItem(PREFILL_KEY, value);
    }
    close();
  }

  if (!open) return null;

  return (
    <div
      className="lv-popup-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        className="lv-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lv-popup-title"
        ref={dialogRef}
      >
        <button
          type="button"
          className="lv-popup__close"
          aria-label="Close"
          onClick={close}
        >
          ×
        </button>

        <p className="lv-popup__eyebrow">Lacrosse Victoria</p>
        <h2 className="lv-popup__title" id="lv-popup-title">
          Find your club
        </h2>
        <p className="lv-popup__body">
          Enter your email and we&apos;ll carry it into your club enquiry form, so you
          only have to fill it in once.
        </p>

        <div className="lv-field" style={{ marginTop: 18 }}>
          <label className="lv-label" htmlFor="lv-popup-email">
            Email address
          </label>
          <input
            id="lv-popup-email"
            ref={inputRef}
            className="lv-input"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? "lv-popup-error" : undefined}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError(null);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleContinue();
              }
            }}
          />
          {error && (
            <p className="lv-error-text" id="lv-popup-error">
              {error}
            </p>
          )}
          <p className="lv-hint">
            We&apos;ll only use this to prefill your enquiry form.
          </p>
        </div>

        <div className="lv-popup__actions">
          <button type="button" className="lv-btn lv-btn--primary" onClick={handleContinue}>
            Continue
          </button>
          <button type="button" className="lv-btn lv-btn--outline" onClick={close}>
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
