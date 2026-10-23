/**
 * Navigation structure transcribed verbatim from the live site
 * (https://lacrossevictoria.com.au) on 22 Oct 2026.
 * Text, order and capitalisation match the reference DOM — do not "tidy" them.
 * See docs/reference-audit.md section 3.
 *
 * Only "Find a Club" has a real destination. Everything else is a visual
 * element (scope lock #4): it may open its dropdown but never navigates.
 */

export type NavChild = {
  label: string;
  href?: string;
  functional?: boolean;
};

export type NavGroup = {
  id: string;
  label: string;
  href: string;
  children: NavChild[];
};

export const FIND_A_CLUB_HREF = "/participate/find-a-club";

export const NAV: NavGroup[] = [
  {
    id: "participate",
    label: "Participate",
    href: "/participate",
    children: [
      { label: "Play", href: "/participate/play" },
      { label: "Find a Club", href: FIND_A_CLUB_HREF, functional: true },
      { label: "Schools", href: "/participate/schools" },
      { label: "Coaches", href: "/participate/coaches" },
      { label: "Officials", href: "/participate/officials" },
      { label: "Volunteers", href: "/participate/volunteers" },
      { label: "Diversity & Inclusion", href: "/participate/diversity-inclusion" },
      { label: "State & Rep teams", href: "/participate/state-rep-teams" },
      { label: "Rules of Lacrosse", href: "/participate/rules-of-lacrosse" },
    ],
  },
  {
    id: "news-events",
    label: "News & Events",
    href: "/news-events",
    children: [
      { label: "News", href: "/news-events/news" },
      { label: "Calendar", href: "/news-events/events" },
    ],
  },
  {
    id: "competition",
    label: "Competition Info",
    href: "/competition",
    children: [
      { label: "Senior Mens", href: "/competition/seniors" },
      { label: "Senior Womens", href: "/competition/senior-womens" },
      { label: "Juniors", href: "/competition/juniors" },
      { label: "U10 Lightning Carnival #2", href: "/competition/u10-lightning-carnival-2" },
      { label: "2026 Olympic Cup Sixes", href: "/competition/olympic-cup-sixes" },
      {
        label: "Tribunal & Investigation Results",
        href: "/competition/tribunal-investigation-results",
      },
    ],
  },
  {
    id: "club-resources",
    label: "Club Resources",
    href: "/club-information",
    children: [
      { label: "Grants", href: "/club-information/grants" },
      { label: "Club Forms", href: "/club-information/competition-permits-tribunal" },
      { label: "Club Management", href: "/club-information/club-management" },
      { label: "Live Scoring Information", href: "/club-information/gameday-information" },
      {
        label: "National Integrity Framework",
        href: "/club-information/national-integrity-framework",
      },
      {
        label: "Accidents, Injuries and Insurance",
        href: "/club-information/accident-injuries-and-insurance-forms",
      },
      { label: "Club Fines", href: "/club-information/club-fines" },
      { label: "Finals Outline", href: "/club-information/finals-outline" },
    ],
  },
  {
    id: "schools-resources",
    label: "Schools Resources",
    href: "/schools",
    children: [
      { label: "School Rules", href: "/schools/school-rules" },
      { label: "School Competitions", href: "/schools/school-competitions" },
      { label: "Professional Development", href: "/schools/professional-development" },
      { label: "School Clinics", href: "/schools/school-clinics" },
      { label: "Quick Stix Lacrosse", href: "/schools/quick-stix-lacrosse" },
      { label: "TriBall Lacrosse", href: "/schools/triball-lacrosse" },
    ],
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    children: [
      { label: "Lacrosse Victoria", href: "/about/lacrosse-victoria" },
      { label: "LV Merchandise", href: "/about/shop" },
      { label: "Board of Directors and Staff", href: "/about/board-of-directors-and-staff" },
      { label: "Governance", href: "/about/governance" },
      {
        label: "The Victorian Lacrosse Foundation",
        href: "/about/the-victorian-lacrosse-foundation",
      },
      { label: "The Game of Lacrosse", href: "/about/the-game-of-lacrosse" },
      { label: "Insurance Information", href: "/about/insurance-information" },
    ],
  },
];

export const FOOTER_LINKS = [
  "Contacts",
  "Terms Of Use",
  "Privacy Policy",
  "Support Lacrosse Victoria",
  "Lacrosse Australia",
];
