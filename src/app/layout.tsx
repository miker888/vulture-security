import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";
import { siteUrl } from "@/lib/url";

// Barlow and Barlow Condensed, self-hosted. No request to Google at build or run time.
const barlow = localFont({
  variable: "--font-barlow",
  display: "swap",
  src: [
    { path: "../fonts/barlow-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/barlow-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/barlow-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
});

const barlowCondensed = localFont({
  variable: "--font-barlow-condensed",
  display: "swap",
  src: [
    { path: "../fonts/barlow-condensed-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/barlow-condensed-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/barlow-condensed-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
});

export const metadata: Metadata = {
  // Trailing slash so relative URLs below keep the GitHub Pages base path.
  metadataBase: new URL(`${siteUrl}/`),
  title: {
    default: `${site.name} | Calgary Security Officers & Mobile Patrol`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} | Calgary Security Officers & Mobile Patrol`,
    description: site.description,
    siteName: site.name,
    locale: "en_CA",
    type: "website",
    // Relative to metadataBase, which already includes the base path.
    images: [{ url: "og.jpg", width: 1152, height: 576, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <body className={`${barlow.variable} ${barlowCondensed.variable} antialiased`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SecurityService",
              name: site.legalName,
              url: site.url,
              telephone: site.contact.phoneLong,
              email: site.contact.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: site.contact.addressLines[0],
                addressLocality: "Calgary",
                addressRegion: "AB",
                postalCode: "T2P 3E7",
                addressCountry: "CA",
              },
              areaServed: "Calgary, Alberta",
            }),
          }}
        />
      </body>
    </html>
  );
}
