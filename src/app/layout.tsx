import type { Metadata } from "next";
import "./globals.css";
import {
  Great_Vibes,
  MonteCarlo,
  Cormorant_Garamond,
  Inter,
  Mrs_Saint_Delafield,
  Space_Mono,
  Noto_Serif_Bengali,
  Hind_Siliguri,
  Galada,
  Tiro_Devanagari_Sanskrit,
} from "next/font/google";

// Made for Sanskrit: correct joined letters. Used by the blessing section.
const sloka = Tiro_Devanagari_Sanskrit({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--nf-sloka",
});

// English fonts //
const hand = Mrs_Saint_Delafield({
  weight: "400",
  subsets: ["latin"],
  variable: "--nf-hand",
});
const mono = Space_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--nf-mono",
});

const fancy = MonteCarlo({
  weight: "400",
  subsets: ["latin"],
  variable: "--nf-fancy",
});

const script = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--nf-script",
});
const serif = Cormorant_Garamond({
  style: ["normal", "italic"],
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--nf-serif",
});
const sans = Inter({ subsets: ["latin"], variable: "--nf-sans" });

// Bengali fonts //
const bnSerif = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["500", "600"],
  variable: "--nf-bn-serif",
});
const bnSans = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500"],
  variable: "--nf-bn-sans",
});
// Calligraphic Bengali, replaces the script and handwriting fonts
const bnScript = Galada({
  subsets: ["bengali", "latin"],
  weight: "400",
  variable: "--nf-bn-script",
});

export const metadata: Metadata = {
  title: "Our Wedding",
  description:
    "Together with our families, we invite you to celebrate our wedding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sloka.variable} ${script.variable} ${serif.variable} ${sans.variable} ${hand.variable} ${mono.variable} ${bnSerif.variable} ${bnSans.variable} ${bnScript.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
