"use client";

import { useEffect, useState } from "react";
import { Check, Copy, MapPinned, Sparkles, X } from "lucide-react";

type Spot = Readonly<{
  id: string;
  name: string;
  tag: string;
  description: string;
  naverLink: string;
  badge: string;
  accent: string;
}>;

const SPOTS: readonly Spot[] = [
  {
    id: "yujeong",
    name: "Yujeong Sikdang",
    tag: "BTS Trainee Holy Land",
    description:
      "The iconic restaurant where the seven members ate during their trainee days. Try the Bangtan Black Pork Stone Pot Bibimbap.",
    naverLink: "https://map.naver.com/v5/search/Yujeong%20Sikdang",
    badge: "K-SEAL #01: NOVICE PASS",
    accent: "from-rose-400 to-amber-200",
  },
  {
    id: "hakdong",
    name: "Hakdong Park",
    tag: "Late-Night Lyric Sanctuary",
    description:
      "A quiet park where the members gathered late at night, talked about uncertain futures, and wrote early lyrics.",
    naverLink: "https://map.naver.com/v5/search/Hakdong%20Park",
    badge: "K-SEAL #02: LYRICIST PASS",
    accent: "from-violet-500 to-fuchsia-300",
  },
  {
    id: "gyeongbokgung",
    name: "Gyeongbokgung Palace",
    tag: "K-Culture & History Spot",
    description:
      "The grand royal palace that hosted the group’s celebrated IDOL and Mikrokosmos performances under a moonlit sky.",
    naverLink: "https://map.naver.com/v5/search/Gyeongbokgung%20Palace",
    badge: "K-SEAL #03: ROYAL PASS",
    accent: "from-amber-300 to-orange-500",
  },
  {
    id: "hangang",
    name: "Yeouido Hangang Park",
    tag: "K-Lifestyle & Ramen Zone",
    description:
      "Experience river culture in Seoul: instant ramen machines, picnic mats, convenience-store snacks, and Han River wind.",
    naverLink: "https://map.naver.com/v5/search/Yeouido%20Hangang%20Park",
    badge: "K-SEAL #04: RIVER PASS",
    accent: "from-cyan-400 to-indigo-500",
  },
];

function BadgeDialog({
  badge,
  onClose,
}: {
  badge: Spot;
  onClose: () => void;
}): JSX.Element {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const copyBadge = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(badge.badge);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#07080d]/85 p-5 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="badge-title"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <div className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-violet-300/25 bg-[#161821] p-8 text-center shadow-[0_28px_90px_rgba(0,0,0,0.6)]">
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${badge.accent}`} />
        <button
          type="button"
          aria-label="Close badge dialog"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-white/45 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
        <div className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-tr ${badge.accent} text-4xl shadow-lg`}>
          <Sparkles className="h-10 w-10 text-white drop-shadow" aria-hidden="true" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-200">Digital identity badge</p>
        <h2 id="badge-title" className="mt-2 text-lg font-bold tracking-tight text-white">
          {badge.badge}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/55">
          Your Seoul trail is ready to share. Save this K-SEAL for your travel diary or social bio.
        </p>
        <button
          type="button"
          onClick={copyBadge}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Badge copied" : "Copy K-SEAL"}
        </button>
      </div>
    </div>
  );
}

export default function Page(): JSX.Element {
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0d0e12] text-white selection:bg-violet-600 selection:text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0d0e12]/80 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="#top" className="text-sm font-extrabold tracking-[0.18em] text-transparent bg-gradient-to-r from-violet-300 to-amber-100 bg-clip-text sm:text-base">
            THE HIL : SEOUL PASS
          </a>
          <a
            href="#spots"
            className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-xs font-semibold shadow-lg shadow-violet-500/20 transition hover:from-violet-500 hover:to-indigo-500 sm:px-5 sm:text-sm"
          >
            Explore the pass
          </a>
        </div>
      </nav>

      <section id="top" className="relative isolate px-6 pb-20 pt-24 text-center sm:pb-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(ellipse_at_top,rgba(109,40,217,0.27),transparent_62%)]" />
        <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-300/10 blur-[100px]" />
        <div className="mx-auto max-w-4xl">
          <p className="inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-violet-200 sm:text-xs">
            A Seoul field guide for ARMY &amp; K-culture lovers
          </p>
          <h1 className="mt-7 text-4xl font-black leading-[1.04] tracking-tight sm:text-6xl">
            Seoul, beyond the
            <span className="block bg-gradient-to-r from-amber-200 via-violet-300 to-indigo-400 bg-clip-text text-transparent">
              usual itinerary.
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            Follow stories that shaped BTS, find an authentic side of the city, and open each stop straight in Naver Map.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#spots" className="rounded-xl bg-white px-7 py-3.5 font-bold text-[#12131a] transition hover:bg-amber-50">
              Start the Seoul trail
            </a>
            <a href="#how-it-works" className="rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 font-medium text-white transition hover:bg-white/10">
              How it works
            </a>
          </div>
        </div>
      </section>

      <section id="spots" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="mb-9 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">Four essential stops</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Curated Seoul holy lands</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/50">Each route opens in Naver Map, Korea’s local map service.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {SPOTS.map((spot, index) => (
            <article key={spot.id} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 transition hover:-translate-y-1 hover:border-violet-400/45 hover:bg-white/[0.07] sm:p-7">
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${spot.accent} opacity-70`} />
              <span className="text-xs font-bold uppercase tracking-[0.13em] text-violet-300">0{index + 1} · {spot.tag}</span>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">
                {spot.name} <span className="text-base font-medium text-white/45">{["유정식당", "학동공원", "경복궁", "여의도 한강공원"][index]}</span>
              </h3>
              <p className="mt-4 min-h-[4.5rem] text-sm leading-relaxed text-white/62">{spot.description}</p>
              <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row">
                <a href={spot.naverLink} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-400/35 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20">
                  <MapPinned className="h-4 w-4" /> Open Naver Map
                </a>
                <button type="button" onClick={() => setSelectedSpot(spot)} className="rounded-xl border border-violet-400/35 bg-violet-500/10 px-4 py-3 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/20">
                  View K-SEAL
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-y border-white/10 bg-white/[0.025] px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">Designed for the city</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Navigate with confidence.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              ["01", "Choose a story", "Browse BTS history and Seoul culture stops."],
              ["02", "Open the route", "Jump from the guide directly to local map search."],
              ["03", "Collect your seal", "Keep a digital memento for every place you visit."],
            ].map(([number, title, body]) => (
              <div key={number} className="border-l border-violet-400/40 pl-4">
                <p className="text-xs font-bold text-violet-300">{number}</p>
                <h3 className="mt-2 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 py-12 text-center text-xs text-white/40">
        <p className="font-semibold tracking-[0.14em] text-white/65">THE HIL : SEOUL PASS</p>
        <p className="mt-3">© 2026 THE HIL Inc. All rights reserved.</p>
      </footer>

      {selectedSpot ? <BadgeDialog badge={selectedSpot} onClose={() => setSelectedSpot(null)} /> : null}
    </main>
  );
}
