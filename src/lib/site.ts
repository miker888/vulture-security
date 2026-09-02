// Single source of truth for site content that changes rarely.
// Edit here rather than hunting through components.

export const site = {
  name: "Vulture Security Services",
  legalName: "Vulture Security Services Ltd.",
  url: "https://vulturesecurity.ca",
  tagline: "Watching for Threats. Protecting Your Assets.",
  subline: "Expert security services for businesses and individuals.",
  description:
    "Vulture Security Services provides static security, loss prevention, event security and VIP escort across Calgary and Alberta. Licensed, trained and available around the clock.",
  contact: {
    addressLines: ["1707 - 555 4 Ave SW", "Calgary, AB, T2P 3E7"],
    phone: "+1 (587) 205 8148",
    phoneHref: "tel:+15872058148",
    email: "info@vulturesecurity.ca",
  },
  nav: [
    { label: "Home", href: "/#top" },
    { label: "About", href: "/#about" },
    { label: "Our Services", href: "/#services" },
    { label: "Contact Us", href: "/#contact" },
    { label: "News & Updates", href: "/blog" },
  ],
} as const;

export const services = [
  {
    title: "Static Security",
    blurb:
      "Uniformed guards posted on site to control access, deter incidents and represent your organization professionally at every point of contact.",
    image: "/images/service-static.jpg",
  },
  {
    title: "Loss Prevention",
    blurb:
      "Retail and warehouse coverage focused on shrink: floor presence, surveillance support, incident documentation and coordination with police when required.",
    image: "/images/service-loss-prevention.jpg",
  },
  {
    title: "Event Security",
    blurb:
      "Crowd management, entry screening and emergency response for venues, conferences and private events of any size.",
    image: "/images/service-event.jpg",
  },
  {
    title: "VIP Escort",
    blurb:
      "Discreet close protection and secure transport for executives, visiting principals and high-profile guests.",
    image: "/images/service-vip.jpg",
  },
] as const;

export const about = {
  heading: "About Us",
  paragraphs: [
    "Every client has a unique environment to protect. At Vulture Security Services, we deliver reliable security solutions designed to safeguard your people, assets, and operations.",
    "We believe security goes beyond enforcement. Our personnel serve as front-line representatives of the organizations we protect, combining vigilance, professionalism, and respectful, customer-focused service in every interaction.",
    "Through strong training and modern security practices, we provide dependable protection day and night, whether through on-site guards, mobile patrols, property watch, or tailored security solutions.",
  ],
  image: "/images/about-guard.jpg",
} as const;

// Community partner logos. Drop files in /public/images/partners and list them here.
export type Partner = { name: string; logo: string };

export const partners: Partner[] = [
  { name: "Minto", logo: "/images/partners/minto.png" },
];
