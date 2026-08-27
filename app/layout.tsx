import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

export const metadata: Metadata = {
  title: "SOVEREIGN-X — Own Autonomous AI Nodes. Earn B2B Royalties.",
  description:
    "Acquire autonomous AI node assets that execute B2B contracts on your behalf and distribute a royalty share of net contract revenue to your wallet or bank.",
  openGraph: {
    title: "SOVEREIGN-X",
    description:
      "Autonomous AI node assets. Passive ownership, royalty distributions from net contract revenue.",
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
