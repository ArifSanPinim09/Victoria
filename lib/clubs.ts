export type Program = "Junior" | "Senior Men" | "Senior Women";
export type Interest = "Trial / Come & Try" | "Membership";
export type Experience = "Never played" | "Beginner" | "Experienced";
export type AgeGroup =
  | "Under 10"
  | "Under 12"
  | "Under 14"
  | "Under 16"
  | "Under 18"
  | "18+";

export type Club = {
  id: string;
  name: string;
  displayName: string;
  address: string;
  suburb: string;
  postcode: string;
  lat: number;
  lng: number;
  logo: string;
  website: string;
  searchAliases: string[];
  secondaryVenue?: { label: string; address: string; suburb: string; postcode: string };
};

/**
 * Source: https://lacrossevictoria.com.au/participate/find-a-club
 * Audited 22 Oct 2026. Addresses are copied verbatim from the live page.
 * Coordinates come from OpenStreetMap Nominatim geocoding of those published
 * addresses — none are invented. See docs/reference-audit.md section 8.
 */
export const CLUBS: Club[] = [
  {
    id: "altona",
    name: "Altona Lacrosse Club",
    displayName: "Altona Lacrosse Club",
    address: "Paisley Park, Mason Street",
    suburb: "Altona",
    postcode: "3025",
    lat: -37.8401929,
    lng: 144.8576436,
    logo: "/images/clubs/altona.png",
    website: "https://www.altonalacrosse.com.au/",
    searchAliases: ["paisley park", "altona north", "hoppers"],
  },
  {
    id: "bendigo",
    name: "Bendigo Lacrosse Club",
    displayName: "Bendigo Lacrosse Club",
    address: "19 Lower Beckhams Rd",
    suburb: "Maiden Gully",
    postcode: "3551",
    lat: -36.7489038,
    lng: 144.2043318,
    logo: "/images/clubs/bendigo.png",
    website:
      "https://websites.mygameday.app/club_info.cgi?c=1-1064-18308-0-0&sID=349565",
    searchAliases: ["maiden gully", "bendigo"],
  },
  {
    id: "brunswick",
    name: "Brunswick Lacrosse Club",
    displayName: "Brunswick Lacrosse Club",
    address: "6 Cross St",
    suburb: "Brunswick East",
    postcode: "3057",
    lat: -37.7692981,
    lng: 144.974584,
    logo: "/images/clubs/brunswick.png",
    website: "http://brunswicklacrosse.com.au/",
    searchAliases: ["brunswick east", "cross street"],
  },
  {
    id: "camberwell",
    name: "Camberwell Lacrosse Club",
    displayName: "Camberwell Lacrosse Club",
    address: "Estella St",
    suburb: "Glen Iris",
    postcode: "3146",
    lat: -37.8623604,
    lng: 145.0634519,
    logo: "/images/clubs/camberwell.jpg",
    website: "https://www.clclax.org.au/",
    searchAliases: ["glen iris", "estella street", "clc"],
  },
  {
    id: "caulfield",
    name: "Caulfield Lacrosse Club",
    displayName: "Caulfield Lacrosse Club",
    address: "280 Balaclava Rd",
    suburb: "Caulfield North",
    postcode: "3161",
    lat: -37.8729676,
    lng: 145.0282577,
    logo: "/images/clubs/caulfield.png",
    website: "https://caulfieldlacrosse.com.au/",
    searchAliases: ["caulfield north", "balaclava road"],
  },
  {
    id: "chadstone",
    name: "Chadstone Lacrosse Club",
    displayName: "Chadstone Lacrosse Club",
    address: "32A Chadstone Rd",
    suburb: "Malvern East",
    postcode: "3145",
    lat: -37.8858131,
    lng: 145.0784828,
    logo: "/images/clubs/chadstone.jpg",
    website: "http://chadstonelacrosse.com.au/",
    searchAliases: ["malvern east", "chadstone road"],
  },
  {
    id: "eltham",
    name: "Eltham Lacrosse Club",
    displayName: "Eltham Lacrosse Club",
    address: "The Pavilion, Eltham Lower Park, 570 Main Rd",
    suburb: "Eltham",
    postcode: "3095",
    lat: -37.7340848,
    lng: 145.1415689,
    logo: "/images/clubs/eltham.jpg",
    website: "http://www.elthamlacrosseclub.com.au/",
    searchAliases: ["eltham lower park", "main road", "elc"],
  },
  {
    id: "footscray",
    name: "Footscray Lacrosse Club",
    displayName: "Footscray Lacrosse Club",
    address: "Corner of Francis & Roberts Street",
    suburb: "Yarraville",
    postcode: "3013",
    lat: -37.8120642,
    lng: 144.8694294,
    logo: "/images/clubs/footscray.png",
    website: "https://www.footscraylacrosse.com.au/",
    searchAliases: ["yarraville", "francis street", "roberts street"],
  },
  {
    id: "malvern",
    name: "Malvern Lacrosse Club",
    displayName: "Malvern Lacrosse Club",
    address: "1251 High St",
    suburb: "Malvern",
    postcode: "3144",
    lat: -37.8562867,
    lng: 145.0298052,
    logo: "/images/clubs/malvern.png",
    website: "https://malvernlacrosse.com/",
    searchAliases: ["high street", "malvern"],
  },
  {
    id: "mcc",
    name: "MCC Lacrosse Club",
    displayName: "MCC Lacrosse Club",
    address: "2 Roy St",
    suburb: "Melbourne",
    postcode: "3004",
    lat: -37.846257,
    lng: 144.977884,
    logo: "/images/clubs/mcc.jpg",
    website: "http://www.mcclacrosse.com/",
    searchAliases: ["melbourne cricket club", "roy street", "south melbourne"],
    secondaryVenue: {
      label: "Juniors Lacrosse",
      address: "Beaumaris Secondary College, 136 Reserve Road",
      suburb: "Beaumaris",
      postcode: "3193",
    },
  },
  {
    id: "melbourne-university",
    name: "Melbourne University Lacrosse Club",
    displayName: "Melbourne University Lacrosse Club",
    address: "Park St",
    suburb: "Parkville",
    postcode: "3052",
    lat: -37.7758457,
    lng: 144.941379,
    logo: "/images/clubs/melbourne-university.jpg",
    website: "https://websites.mygameday.app/club_info.cgi?c=1-1064-17854-0-0",
    searchAliases: ["university", "parkville", "park street", "mu", "melb uni"],
  },
  {
    id: "newport",
    name: "Newport Lacrosse Club",
    displayName: "Newport Lacrosse Club",
    address: "257 Mason St",
    suburb: "Altona North",
    postcode: "3025",
    lat: -37.8400874,
    lng: 144.8558591,
    logo: "/images/clubs/newport.png",
    website: "https://www.newportlacrosse.com.au/",
    searchAliases: ["altona north", "mason street"],
  },
  {
    id: "surrey-park",
    name: "Surrey Park Lacrosse Club",
    displayName: "Surrey Park Lacrosse Club",
    address: "Braemar St",
    suburb: "Mont Albert North",
    postcode: "3129",
    lat: -37.8110416,
    lng: 145.1090205,
    logo: "/images/clubs/surrey-park.png",
    website: "http://www.surreyparklacrosse.org.au/",
    searchAliases: ["mont albert north", "braemar street", "surrey park"],
  },
  {
    id: "williamstown",
    name: "Willamstown Lacrosse Club",
    displayName: "Willamstown Lacrosse Club",
    address: "Fearon Reserve, Garden Street, 27, Esplanade",
    suburb: "Williamstown",
    postcode: "3016",
    lat: -37.8669328,
    lng: 144.8952879,
    logo: "/images/clubs/williamstown.png",
    website: "https://www.williamstownlacrosse.com.au/",
    // "Willamstown" is the spelling published on the LV site — kept verbatim.
    searchAliases: ["williamstown", "fearon reserve", "esplanade", "wlc"],
  },
  {
    id: "williamstown-womens",
    name: "Williamstown Womens Lacrosse Club",
    displayName: "Williamstown Womens Lacrosse Club",
    address: "Fearon Reserve, 27 Esplanade",
    suburb: "Williamstown",
    postcode: "3016",
    lat: -37.8669328,
    lng: 144.8952879,
    logo: "/images/clubs/williamstown-womens.jpg",
    website: "https://www.williamstownwomenslacrosse.com.au/",
    searchAliases: ["williamstown women", "womens", "fearon reserve", "wwlc"],
  },
  {
    id: "wyndham",
    name: "Wyndham Lacrosse Club",
    displayName: "Wyndham Lacrosse Club",
    address: "257 McGrath Road",
    suburb: "Wyndham Vale",
    postcode: "3024",
    logo: "/images/clubs/wyndham.jpg",
    lat: -37.8969958,
    lng: 144.6284702,
    website: "https://www.facebook.com/HoppersLax/",
    searchAliases: ["wyndham vale", "mcgrath road", "hoppers"],
  },
];

export const CLUB_IDS = CLUBS.map((c) => c.id);

export const CLUB_BY_ID = new Map(CLUBS.map((c) => [c.id, c]));

export function findClub(id: string): Club | undefined {
  return CLUB_BY_ID.get(id);
}

export function searchClubs(query: string): Club[] {
  const q = query.trim().toLowerCase();
  if (!q) return CLUBS;
  return CLUBS.filter((club) => {
    const haystack = [
      club.name,
      club.displayName,
      club.suburb,
      club.postcode,
      club.address,
      ...club.searchAliases,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export const PROGRAMS: Program[] = ["Junior", "Senior Men", "Senior Women"];
export const INTERESTS: Interest[] = ["Trial / Come & Try", "Membership"];
export const EXPERIENCES: Experience[] = ["Never played", "Beginner", "Experienced"];
export const AGE_GROUPS: AgeGroup[] = [
  "Under 10",
  "Under 12",
  "Under 14",
  "Under 16",
  "Under 18",
  "18+",
];
