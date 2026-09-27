import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Soehne Schmal Halbfett — condensed display / heading font
 */
const soehne = localFont({
  src: "../fonts/soehne-schmal-halbfett.woff2",
  variable: "--font-soehne",
  weight: "600",
  style: "normal",
  display: "swap",
});

/**
 * Neue Montreal — body / UI text font
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
        <Footer />
      </body>
    </html>
  );
}
