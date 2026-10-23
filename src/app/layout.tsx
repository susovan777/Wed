import type { Metadata } from "next";
import "./globals.css";
import {
  Great_Vibes,
  MonteCarlo,
  Cormorant_Garamond,
  Inter,
} from "next/font/google";
import { Mrs_Saint_Delafield, Space_Mono } from "next/font/google";

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
        className={`${script.variable} ${serif.variable} ${sans.variable} ${hand.variable} ${mono.variable} ${fancy.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
