"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, FIND_A_CLUB_HREF } from "./nav-data";

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 3h3l1.5 3.8-2 1.4a12 12 0 0 0 5.7 5.7l1.4-2L20 13.4v3c0 1.5-1.2 2.7-2.7 2.6C10.6 18.6 5.4 13.4 5 6.7 4.9 5.2 5.1 3 6.6 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <g fill="currentColor">
        <path d="M4 8h16v2H4zM4 14h16v2H4z" />
      </g>
    </svg>
  );
}

function PlusMinus({ open }: { open: boolean }) {
  return open ? (
    <svg className="lv-nav__toggle" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 11h14v2H5z" fill="currentColor" />
    </svg>
  ) : (
    <svg className="lv-nav__toggle" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11 5h2v14h-2zM5 11h14v2H5z" fill="currentColor" />
    </svg>
  );
}

export function SiteHeader({
  variant = "overlay",
}: {
  variant?: "overlay" | "solid";
}) {
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>("participate");
  const navRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menus when the route changes. Adjusting state during render (rather
  // than in an effect) is the pattern React recommends for derived resets and
  // avoids a cascading render (react-hooks/set-state-in-effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenId(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenId(null);
        setMobileOpen(false);
      }
    }
    function onClick(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenId(null);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenId(null), 120);
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  return (
    <>
      <header
        className={`lv-header${variant === "solid" ? " lv-header--solid" : ""}`}
      >
        <div className="lv-header__inner">
          <button
            type="button"
            className="lv-burger"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <BurgerIcon />
          </button>

          <Link href="/" className="lv-brand" aria-label="Lacrosse Victoria home">
            {/* Two crests, one per breakpoint. team-primary is white and reads
                on the transparent/navy header; team-secondary is navy and reads
                on the white mobile header. CSS shows exactly one of them. */}
            <Image
              src="/images/brand/team-primary.svg"
              alt="Lacrosse Victoria"
              width={90}
              height={90}
              priority
              className="lv-brand__full"
            />
            <Image
              src="/images/brand/team-secondary.svg"
              alt="Lacrosse Victoria"
              width={49}
              height={62}
              priority
              className="lv-brand__simple"
            />
          </Link>

          <nav className="lv-nav" aria-label="Main navigation" ref={navRef}>
            <ul className="lv-nav__list">
              {NAV.map((group) => {
                const isActive =
                  group.id === "participate" &&
                  pathname.startsWith("/participate");
                return (
                  <li
                    key={group.id}
                    className="lv-nav__item"
                    data-open={openId === group.id}
                    onMouseEnter={() => {
                      cancelClose();
                      setOpenId(group.id);
                    }}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      className={`lv-nav__link${isActive ? " lv-nav__link--active" : ""}`}
                      aria-expanded={openId === group.id}
                      aria-haspopup="true"
                      onClick={() =>
                        setOpenId((current) => (current === group.id ? null : group.id))
                      }
                    >
                      {group.label}
                      <PlusMinus open={openId === group.id} />
                    </button>

                    {openId === group.id && (
                      <div className="lv-dropdown">
                        <ul
                          className="lv-dropdown__panel"
                          aria-label={`${group.label} submenu`}
                        >
                          {group.children.map((child) =>
                            child.functional && child.href ? (
                              <li key={child.label}>
                                <Link href={child.href} className="lv-dropdown__item">
                                  {child.label}
                                </Link>
                              </li>
                            ) : (
                              <li key={child.label}>
                                <span
                                  className="lv-dropdown__item"
                                  aria-disabled="true"
                                  title="Not available in this prototype"
                                >
                                  {child.label}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="lv-header__utils" aria-hidden="true">
            <span className="lv-icon-btn">
              <PhoneIcon />
            </span>
            <span className="lv-icon-btn">
              <SearchIcon />
            </span>
          </div>

          <span className="lv-header__spacer" aria-hidden="true" />
        </div>
      </header>

      {mobileOpen && (
        <div className="lv-mobile-panel" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="lv-mobile-panel__head">
            <Image
              src="/images/brand/team-secondary.svg"
              alt="Lacrosse Victoria"
              width={49}
              height={62}
            />
            <button
              type="button"
              className="lv-mobile-panel__close"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              ×
            </button>
          </div>
          <ul className="lv-mobile-nav">
            {NAV.map((group) => {
              const isOpen = mobileGroup === group.id;
              return (
                <li key={group.id}>
                  <button
                    type="button"
                    className="lv-mobile-nav__parent"
                    aria-expanded={isOpen}
                    onClick={() => setMobileGroup(isOpen ? null : group.id)}
                  >
                    {group.label}
                    <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <ul className="lv-mobile-nav__children">
                      {group.children.map((child) =>
                        child.functional && child.href ? (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="lv-mobile-nav__child lv-mobile-nav__child--active"
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ) : (
                          <li key={child.label}>
                            <span
                              className="lv-mobile-nav__child"
                              aria-disabled="true"
                            >
                              {child.label}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export { FIND_A_CLUB_HREF };
