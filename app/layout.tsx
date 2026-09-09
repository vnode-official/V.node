import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

export const metadata: Metadata = {
  title: "THE HIL : SEOUL PASS — Seoul stories for ARMY",
  description:
    "A curated Seoul field guide with BTS history, K-culture stops, Naver Map links, and collectible digital K-SEAL badges.",
  openGraph: {
    title: "THE HIL : SEOUL PASS",
    description:
      "Explore BTS history and Seoul culture with local Naver Map links.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-obsidian font-sans">{children}</body>
    </html>
  );
}
