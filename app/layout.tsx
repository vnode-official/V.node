import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

export const metadata: Metadata = {
  title: "THE HIL — Drop 01",
  description:
    "THE HIL. K-Stealth luxury in matte obsidian and crisp white. Blouson, windbreaker, coat, caps, tees and goods marked with the ㅅㅇㄹ consonant seal. Reserve Drop 01.",
  openGraph: {
    title: "THE HIL — Drop 01",
    description: "K-Stealth luxury. Matte obsidian, crisp white, one crimson seal. Reserve Drop 01.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
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
