import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
