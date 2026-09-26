import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";

/**
 * Soehne Schmal Halbfett — condensed display / heading font
 * Source: Webflow CDN (ref_css2.txt). Replace src path with a local .woff2 file
 * once you have the font licensed. Until then the CSS variable will fall back
 * to 'Arial Narrow, sans-serif' defined in globals.css.
 */
const soehne = localFont({
  src: "../fonts/soehne-schmal-halbfett.woff2",
  variable: "--font-soehne",
  weight: "600",
  style: "normal",
  display: "swap",
  // Silence the missing-file error during dev if font file isn't downloaded yet:
  // Remove the try/catch pattern and add the actual file to src/fonts/
});

/**
 * Neue Montreal — body / UI text font
 * Source: Webflow CDN (ref_css2.txt). Add actual .woff2 files to src/fonts/.
 */
const montreal = localFont({
  src: [
    {
      path: "../fonts/PPNeueMontreal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/PPNeueMontreal-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-montreal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PlayOn",
  description: "PlayOn — built with care.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${soehne.variable} ${montreal.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
