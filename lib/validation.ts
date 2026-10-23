import {
  AGE_GROUPS,
  CLUB_IDS,
  EXPERIENCES,
  INTERESTS,
  PROGRAMS,
  type AgeGroup,
  type Experience,
  type Interest,
  type Program,
} from "./clubs";

export type RegistrationPayload = {
  name: string;
  email: string;
  phone: string;
  location: string;
  clubId: string;
  program: Program;
  interest: Interest;
  ageGroup: AgeGroup;
  experience: Experience;
  notes?: string;
  marketingConsent: boolean;
  enquiryConsent: boolean;
};

export type FieldErrors = Partial<Record<keyof RegistrationPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS_RE = /^[0-9+()\-.\s]+$/;

/**
 * Single source of truth for registration validation.
 * Used by both the client form (UX) and the route handler (authority).
 */
export function validateRegistration(input: unknown): {
  ok: boolean;
  data?: RegistrationPayload;
  fieldErrors: FieldErrors;
} {
  const fieldErrors: FieldErrors = {};
  const raw = (typeof input === "object" && input !== null ? input : {}) as Record<
    string,
    unknown
  >;

  const str = (key: string): string =>
    typeof raw[key] === "string" ? (raw[key] as string).trim() : "";
  const bool = (key: string): boolean => raw[key] === true;

  const name = str("name");
  const email = str("email").toLowerCase();
  const phone = str("phone");
  const location = str("location");
  const clubId = str("clubId");
  const program = str("program");
  const interest = str("interest");
  const ageGroup = str("ageGroup");
  const experience = str("experience");
  const notes = str("notes");
  const marketingConsent = bool("marketingConsent");
  const enquiryConsent = bool("enquiryConsent");

  if (name.length < 2) fieldErrors.name = "Please enter your full name.";
  else if (name.length > 100) fieldErrors.name = "Name must be 100 characters or fewer.";

  if (!email) fieldErrors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email)) fieldErrors.email = "Please enter a valid email address.";
  else if (email.length > 254) fieldErrors.email = "Email address is too long.";

  if (!phone) fieldErrors.phone = "Please enter a phone number.";
  else if (phone.length < 6 || phone.length > 20)
    fieldErrors.phone = "Please enter a valid phone number.";
  else if (!PHONE_CHARS_RE.test(phone))
    fieldErrors.phone = "Phone number can only contain digits, spaces and + ( ) - .";
  else if ((phone.match(/\d/g) ?? []).length < 6)
    fieldErrors.phone = "Please enter a valid phone number.";

  if (location.length < 2) fieldErrors.location = "Please enter your suburb or postcode.";
  else if (location.length > 60) fieldErrors.location = "Please keep this under 60 characters.";

  if (!clubId) fieldErrors.clubId = "Please select a club.";
  else if (!CLUB_IDS.includes(clubId)) fieldErrors.clubId = "Please select a club from the list.";

  if (!PROGRAMS.includes(program as Program))
    fieldErrors.program = "Please choose a program.";

  if (!INTERESTS.includes(interest as Interest))
    fieldErrors.interest = "Please tell us what you're interested in.";

  if (!AGE_GROUPS.includes(ageGroup as AgeGroup))
    fieldErrors.ageGroup = "Please choose an age group.";

  if (!EXPERIENCES.includes(experience as Experience))
    fieldErrors.experience = "Please choose your experience level.";

  if (notes.length > 1000) fieldErrors.notes = "Notes must be 1000 characters or fewer.";

  if (!enquiryConsent)
    fieldErrors.enquiryConsent =
      "Please agree to Lacrosse Victoria sharing your details with the selected club.";

  if (Object.keys(fieldErrors).length > 0) return { ok: false, fieldErrors };

  return {
    ok: true,
    fieldErrors,
    data: {
      name,
      email,
      phone,
      location,
      clubId,
      program: program as Program,
      interest: interest as Interest,
      ageGroup: ageGroup as AgeGroup,
      experience: experience as Experience,
      notes: notes || undefined,
      marketingConsent,
      enquiryConsent,
    },
  };
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
