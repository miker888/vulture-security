// Single source of truth for site content that changes rarely.
// Edit here rather than hunting through components.
//
// Images are imported (not referenced by /path) so they work under the
// GitHub Pages base path as well as on the custom domain.
import type { StaticImageData } from "next/image";
import protectEvents from "@/assets/protect-events.jpg";
import protectNight from "@/assets/protect-night.jpg";
import protectRetail from "@/assets/protect-retail.jpg";
import partnerMinto from "@/assets/partner-minto.png";

export const site = {
  name: "Vulture Security Services",
  legalName: "Vulture Security Services Ltd.",
  url: "https://vulturesecurity.ca",
  tagline: "Professional security you can rely on.",
  description:
    "Licensed security officers, mobile patrol, loss prevention and event security for Calgary businesses, properties and events. Book a free risk assessment.",
  // Shown in the footer. Fill in once confirmed.
  licence: "[Licence no.]",
  contact: {
    addressLines: ["1707 - 555 4 Ave SW", "Calgary, AB T2P 3E7"],
    phone: "587-205-8148",
    phoneLong: "+1 (587) 205-8148",
    phoneHref: "tel:+15872058148",
    email: "info@vulturesecurity.ca",
  },
  // "News" is added automatically once at least one post is published.
  nav: [
    { label: "Services", href: "/#services" },
    { label: "Industries", href: "/#industries" },
    { label: "Our Standard", href: "/#standard" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export type NavItem = { label: string; href: string };

export function navItems(showNews: boolean): NavItem[] {
  const items: NavItem[] = [...site.nav];
  if (showNews) items.splice(4, 0, { label: "News", href: "/blog/" });
  return items;
}

export type Service = { title: string; blurb: string; tags: string[] };

export const services: Service[] = [
  {
    title: "Static Security",
    blurb:
      "Uniformed officers on post to manage access, watch your property and respond when it matters. A strong, visible deterrent for offices, towers and commercial sites.",
    tags: ["Access control", "Active monitoring", "Incident response"],
  },
  {
    title: "Mobile Patrol",
    blurb:
      "Scheduled and random patrol visits for properties that don't need a full-time officer. Lock-ups, property checks and alarm response, with every visit logged and reported.",
    tags: ["Alarm response", "Lock and unlock", "Property checks"],
  },
  {
    title: "Loss Prevention",
    blurb:
      "Discreet officers who spot risk early, deter theft and help reduce shrinkage and operational loss in retail, grocery and commercial spaces.",
    tags: ["Retail and grocery", "Uniformed or plain-clothes", "Shrink reduction"],
  },
  {
    title: "Event Security",
    blurb:
      "Entry control, crowd management and staff support for concerts, corporate events and private functions, planned with your team before doors open.",
    tags: ["Entry control", "Crowd management", "Staff support"],
  },
  {
    title: "Fire Watch",
    blurb:
      "Officers who patrol and log your building when fire systems are down or during hot work, so the site stays covered until systems are back online.",
    tags: ["System outages", "Hot work", "Logged patrols"],
  },
  {
    title: "VIP Escort",
    blurb:
      "Discreet escort for executives, guests and staff moving between buildings, events and vehicles.",
    tags: ["Executives", "Guests", "After-hours staff"],
  },
];

export const protectPhotos: {
  src: StaticImageData;
  alt: string;
  title: string;
  caption: string;
  position: string;
}[] = [
  {
    src: protectRetail,
    alt: "Security officer watching the floor of a retail clothing store",
    title: "Retail floors",
    caption: "Loss prevention for retail and grocery",
    position: "center 30%",
  },
  {
    src: protectEvents,
    alt: "Security officer facing a concert crowd and stage lights",
    title: "Events and venues",
    caption: "Entry, crowds and staff support",
    position: "center 30%",
  },
  {
    src: protectNight,
    alt: "Vulture security officer looking out at the Calgary skyline and Calgary Tower at night",
    title: "After dark",
    caption: "Patrols and overnight coverage",
    position: "center 20%",
  },
];

export const sectors = [
  { label: "Commercial and office", icon: "building" },
  { label: "Residential and condo", icon: "home" },
  { label: "Retail and grocery", icon: "bag" },
  { label: "Construction and vacant sites", icon: "cone" },
  { label: "Events and venues", icon: "ticket" },
  { label: "Non-profit and community", icon: "heart" },
] as const;

export const represent = [
  { title: "Protect", body: "We secure your property, staff and guests.", icon: "shield" },
  { title: "Serve", body: "Respectful, helpful and professional with everyone on site.", icon: "users" },
  { title: "Represent", body: "We follow your standards and protect your reputation.", icon: "star" },
] as const;

export const standards = [
  {
    title: "Site-specific post orders",
    body: "Before the first shift, officers are oriented on your layout, access points, emergency procedures and expectations, then work from written post orders.",
    icon: "clipboard",
  },
  {
    title: "Hands-off, de-escalation first",
    body: "Calm communication, safe distance and early escalation. Physical force is limited to immediate self-defence, and any contact is reported.",
    icon: "chat",
  },
  {
    title: "Factual incident reports",
    body: "Who, what, when, where, actions taken and who was notified. Written to stand up to review by you, your insurer or the police.",
    icon: "file",
  },
  {
    title: "Supervisor backup",
    body: "Officers escalate to a supervisor whenever a situation is unclear or unsafe, and supervisors review every report for accuracy.",
    icon: "userCheck",
  },
] as const;

// Community partner logos. Drop files in src/assets, import them above and list them here.
export type Partner = { name: string; logo: StaticImageData };

export const partners: Partner[] = [{ name: "Minto", logo: partnerMinto }];

// Options for the risk assessment form. The labels are stored as-is in Supabase.
export const assessmentOptions = {
  propertyTypes: [
    "Commercial or office",
    "Retail or grocery",
    "Residential or condo",
    "Construction or vacant site",
    "Event or venue",
    "Non-profit or community",
    "Other",
  ],
  services: [
    "Static security",
    "Mobile patrol",
    "Loss prevention",
    "Event security",
    "Fire watch",
    "VIP escort",
    "Not sure yet",
  ],
  coverageHours: ["Daytime", "Overnight", "24/7", "Event dates only"],
  startTimeline: ["As soon as possible", "Within a month", "Planning ahead"],
  contactMethods: ["Phone", "Email"],
} as const;
