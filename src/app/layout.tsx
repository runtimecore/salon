import type { Metadata } from "next";
import { Archivo, Instrument_Sans, Martian_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteBackground from "@/components/SiteBackground";
import { site } from "@/lib/site";

/**
 * Three widths of one idea. Archivo carries the `wdth` axis so headlines can
 * be extended (see `.display` in globals.css) — that's why the axis is
 * requested explicitly; by default next/font ships weight only.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const martianMono = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "medical spa",
    "med spa",
    "botox",
    "injectables",
    "laser hair removal",
    "hydrafacial",
    "IV therapy",
    site.name,
    site.city,
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: "website",
    url: site.url,
    siteName: site.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrumentSans.variable} ${martianMono.variable} h-full antialiased`}
    >
      {/* bg-clinic is the ground the shader draws over, and the flat fallback
          whenever SiteBackground bows out (reduced motion, no WebGL). */}
      <body className="min-h-full flex flex-col bg-clinic text-ink">
        <SiteBackground />
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-clinic"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
