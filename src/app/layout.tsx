import type { Metadata } from "next";
import "./globals.css";

import { Great_Vibes, Cormorant_Garamond, Inter } from "next/font/google";

const script = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--nf-script",
});
const serif = Cormorant_Garamond({
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
        className={`${script.variable} ${serif.variable} ${sans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
