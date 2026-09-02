import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";

// Poppins, self-hosted. No request to Google at build or run time.
const poppins = localFont({
  variable: "--font-poppins",
  display: "swap",
  src: [
    { path: "../fonts/poppins-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/poppins-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/poppins-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/poppins-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/poppins-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/poppins-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Calgary Security Guards & Mobile Patrol`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} | Calgary Security Guards & Mobile Patrol`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_CA",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SecurityService",
              name: site.legalName,
              url: site.url,
              telephone: site.contact.phone,
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
