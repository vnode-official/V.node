"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Boxes,
  Check,
  Cpu,
  Fingerprint,
  Globe2,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type NavLink = Readonly<{ label: string; href: string }>;

type TerminalMetric = Readonly<{
  label: string;
  value: string;
  caption: string;
  /** Emerald is reserved for revenue + live status only. */
  accent?: boolean;
}>;

type FeedRecord = Readonly<{
  node: string;
  contractValue: string;
  royalty: string;
  region: string;
}>;

type FeedLine = FeedRecord & Readonly<{ key: number }>;

type MechanismStep = Readonly<{
  step: string;
  title: string;
  body: string;
  icon: LucideIcon;
}>;

type AssetTier = Readonly<{
  id: string;
  name: string;
  price: string;
  positioning: string;
  nodes: string;
  features: readonly string[];
  cta: string;
  featured: boolean;
}>;

/* -------------------------------------------------------------------------- */
/*  Mock data                                                                 */
/* -------------------------------------------------------------------------- */

const NAV_LINKS: readonly NavLink[] = [
  { label: "Yield Terminal", href: "#terminal" },
  { label: "Mechanism", href: "#mechanism" },
  { label: "Asset Tiers", href: "#tiers" },
];

const TERMINAL_METRICS: readonly TerminalMetric[] = [
  { label: "Active Fleet", value: "3,402", caption: "Nodes deployed across 14 regions" },
  { label: "24h Royalty Distributed", value: "$214,500", caption: "Net of infrastructure cost", accent: true },
  { label: "Contracts Executed · 24h", value: "1,286", caption: "Autonomous, zero owner input" },
  { label: "Distribution Latency", value: "4.2s", caption: "Contract settled → owner wallet" },
];

/** Royalty is exactly 80% of contract value on every record. */
const FEED_RECORDS: readonly FeedRecord[] = [
  { node: "#892", contractValue: "$12,500", royalty: "$10,000", region: "SG-01" },
  { node: "#1174", contractValue: "$8,400", royalty: "$6,720", region: "FRA-02" },
  { node: "#2318", contractValue: "$21,000", royalty: "$16,800", region: "DXB-01" },
  { node: "#486", contractValue: "$5,750", royalty: "$4,600", region: "US-04" },
  { node: "#3050", contractValue: "$16,250", royalty: "$13,000", region: "ZRH-01" },
  { node: "#1622", contractValue: "$9,600", royalty: "$7,680", region: "TYO-03" },
];

const YIELD_SERIES: readonly number[] = [
  22, 28, 25, 37, 33, 45, 41, 56, 50, 64, 59, 73, 68, 84, 79, 96,
];

const MECHANISM_STEPS: readonly MechanismStep[] = [
  {
    step: "01",
    title: "Acquire & Hold",
    body: "Purchase a high-performance AI Node Asset. It is registered to your wallet as property you own outright — nothing to operate, nothing to staff, no filings on your side.",
    icon: Boxes,
  },
  {
    step: "02",
    title: "Autonomous Execution",
    body: "Platform infrastructure sources, negotiates and fulfils B2B contracts entirely in the background. Every node runs under SOVEREIGN-X operational control, not yours.",
    icon: Cpu,
  },
  {
    step: "03",
    title: "Earn Royalties",
    body: "80% of net contract revenue produced by your nodes is distributed automatically to your crypto wallet or bank. Distribution is continuous and requires no action from you.",
    icon: Wallet,
  },
];

const ASSET_TIERS: readonly AssetTier[] = [
  {
    id: "executive-fleet",
    name: "Executive Fleet",
    price: "$2,500",
    positioning: "Entry asset class for individuals who want exposure without operational involvement.",
    nodes: "3 AI Nodes",
    features: [
      "3 autonomous B2B nodes",
      "80% royalty on net contract revenue",
      "Owner dashboard & yield statements",
      "Wallet or bank distribution",
    ],
    cta: "Acquire Fleet",
    featured: false,
  },
  {
    id: "sovereign-engine",
    name: "Sovereign Engine",
    price: "$12,000",
    positioning: "Higher-density asset class with dedicated closing intelligence layered on the fleet.",
    nodes: "15 AI Nodes + Executive AI Closer",
    features: [
      "15 autonomous B2B nodes",
      "Executive AI Closer on high-value contracts",
      "Priority contract routing & region selection",
      "80% royalty on net contract revenue",
      "Dedicated asset manager",
    ],
    cta: "Acquire Engine",
    featured: true,
  },
  {
    id: "dubai-apex",
    name: "Dubai Apex",
    price: "$50,000",
    positioning: "Maximum-density fleet with private deployment infrastructure and on-chain settlement.",
    nodes: "50 VIP Nodes + Private Infrastructure",
    features: [
      "50 VIP nodes on isolated infrastructure",
      "Private deployment & confidential reporting",
      "On-chain payouts with signed settlement records",
      "80% royalty on net contract revenue",
      "Direct line to the operations desk",
    ],
    cta: "Request Apex Access",
    featured: false,
  },
];

/* -------------------------------------------------------------------------- */
/*  Motion primitives                                                        */
/* -------------------------------------------------------------------------- */

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}): JSX.Element {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? undefined : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}

function Stagger({ children, className }: { children: ReactNode; className?: string }): JSX.Element {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? undefined : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerParent}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className }: { children: ReactNode; className?: string }): JSX.Element {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shared atoms                                                             */
/* -------------------------------------------------------------------------- */

function StatusDot({ className }: { className?: string }): JSX.Element {
  return (
    <span className={`relative flex h-1.5 w-1.5 ${className ?? ""}`} aria-hidden="true">
      <span className="absolute inset-0 rounded-full bg-yield/40 blur-[3px]" />
      <span className="relative h-1.5 w-1.5 animate-pulse-dot rounded-full bg-yield" />
    </span>
  );
}

function Eyebrow({ children }: { children: ReactNode }): JSX.Element {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">{children}</span>
  );
}

/**
 * `title` and `titleTail` are rendered on separate lines so headings break at a
 * sentence boundary instead of wherever the measured line happens to balance.
 */
function SectionHeading({
  eyebrow,
  title,
  titleTail,
  lede,
}: {
  eyebrow: string;
  title: string;
  titleTail?: string;
  lede?: string;
}): JSX.Element {
  return (
    <Reveal className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-4xl font-medium leading-[1.06] tracking-tightest text-gradient-silver sm:text-5xl">
        {title}
        {titleTail ? (
          <>
            <br className="hidden sm:inline" /> {titleTail}
          </>
        ) : null}
      </h2>
      {lede ? <p className="mt-6 text-base leading-relaxed text-white/45">{lede}</p> : null}
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/*  1 · Global navigation                                                    */
/* -------------------------------------------------------------------------- */

function GlobalNav(): JSX.Element {
  const [condensed, setCondensed] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          condensed
            ? "border-b border-white/[0.06] bg-obsidian/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[68px] max-w-shell items-center justify-between px-6 lg:px-10">
          <a
            href="#top"
            className="font-mono text-[13px] font-medium tracking-[0.22em] text-white transition-opacity hover:opacity-70"
          >
            SOVEREIGN<span className="text-white/40">-X</span>
          </a>

          <div className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] text-white/50 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <span className="hidden items-center gap-2 sm:flex">
              <StatusDot />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                Network Active
              </span>
            </span>

            <a
              href="#tiers"
              className="group relative overflow-hidden rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-white/90 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
            >
              <span className="relative z-10">Acquire Node</span>
              <span className="pointer-events-none absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  2 · Hero                                                                 */
/* -------------------------------------------------------------------------- */

function Hero(): JSX.Element {
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-28 pt-[168px] sm:pb-36 lg:px-10 lg:pt-[212px]">
      {/* Ambient depth: grid, halo, horizon */}
      <div className="pointer-events-none absolute inset-0 grid-mask" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-white/[0.055] blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px rule-x opacity-60"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-shell">
        <Stagger className="flex flex-col items-center text-center">
          <StaggerItem>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md">
              <Fingerprint className="h-3 w-3 text-white/45" strokeWidth={1.5} aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
                Autonomous Digital Asset Infrastructure
              </span>
            </span>
          </StaggerItem>

          <StaggerItem>
            <h1 className="mt-9 text-[clamp(2.6rem,8.2vw,6.25rem)] font-medium leading-[0.94] tracking-tightest">
              <span className="text-gradient-silver">Own Autonomous AI Nodes.</span>
              <br />
              <span className="text-white/35">Earn B2B Royalties.</span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mx-auto mt-9 max-w-2xl text-pretty text-[15px] leading-relaxed text-white/50 sm:text-base">
              Acquire sovereign AI assets that autonomously execute global B2B contracts. Ownership is
              entirely passive — the infrastructure sources and fulfils every contract, while you hold
              the asset and receive a royalty share of net revenue.
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-11 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href="#tiers"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold text-obsidian transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_50px_-12px_rgba(255,255,255,0.5)]"
              >
                Explore Node Assets
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>

              <a
                href="#terminal"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.02] px-6 py-3.5 text-[14px] font-medium text-white/80 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
              >
                View Live Yields
              </a>
            </div>
          </StaggerItem>

          <StaggerItem>
            <p className="mx-auto mt-8 max-w-xl text-[11px] leading-relaxed text-white/40">
              Royalty share is a contractual term, not a guaranteed return. Distributions vary with node
              performance. Review your own employment agreement and local regulations before acquiring an
              asset.
            </p>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  3 · Yield terminal                                                       */
/* -------------------------------------------------------------------------- */

function buildSeriesPaths(
  series: readonly number[],
  width: number,
  height: number,
): Readonly<{ line: string; area: string }> {
  const max = Math.max(...series, 1);
  const points = series.map((value, index) => ({
    x: (index / Math.max(series.length - 1, 1)) * width,
    y: height - (value / max) * (height - 12) - 6,
  }));

  const [first, ...rest] = points;
  if (!first) return { line: "", area: "" };

  let line = `M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`;
  let previous = first;

  for (const point of rest) {
    const midX = (previous.x + point.x) / 2;
    line += ` C ${midX.toFixed(2)} ${previous.y.toFixed(2)}, ${midX.toFixed(2)} ${point.y.toFixed(
      2,
    )}, ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    previous = point;
  }

  return { line, area: `${line} L ${width} ${height} L 0 ${height} Z` };
}

const CHART_WIDTH = 640;
const CHART_HEIGHT = 148;
const CHART_PATHS = buildSeriesPaths(YIELD_SERIES, CHART_WIDTH, CHART_HEIGHT);

function YieldChart(): JSX.Element {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="h-32 w-full sm:h-36"
      preserveAspectRatio="none"
      role="img"
      aria-label="Illustrative 30-day royalty distribution trend"
    >
      <defs>
        <linearGradient id="yieldArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00FF66" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#00FF66" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75].map((ratio) => (
        <line
          key={ratio}
          x1="0"
          x2={CHART_WIDTH}
          y1={CHART_HEIGHT * ratio}
          y2={CHART_HEIGHT * ratio}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />
      ))}

      <motion.path
        d={CHART_PATHS.area}
        fill="url(#yieldArea)"
        initial={reduced ? undefined : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
      />

      <motion.path
        d={CHART_PATHS.line}
        fill="none"
        stroke="#00FF66"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={reduced ? undefined : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: EASE_OUT_EXPO }}
      />
    </svg>
  );
}

const INITIAL_FEED: readonly FeedLine[] = FEED_RECORDS.slice(0, 4).map((record, index) => ({
  ...record,
  key: index,
}));

function StreamingFeed(): JSX.Element {
  const [lines, setLines] = useState<readonly FeedLine[]>(INITIAL_FEED);
  const cursor = useRef<number>(INITIAL_FEED.length);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const next = FEED_RECORDS[cursor.current % FEED_RECORDS.length];
      if (!next) return;

      const line: FeedLine = { ...next, key: cursor.current };
      cursor.current += 1;
      setLines((current) => [line, ...current].slice(0, 4));
    }, 2800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-black/50 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
          Distribution Stream
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
          Auto-refresh
        </span>
      </div>

      <div className="min-h-[7rem] space-y-2.5" aria-live="off">
        <AnimatePresence initial={false} mode="popLayout">
          {lines.map((line, index) => (
            <motion.p
              key={line.key}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: index === 0 ? 1 : 0.62 - (index - 1) * 0.14, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
              className="flex flex-wrap items-baseline gap-x-1.5 font-mono text-[11px] leading-relaxed text-white/70 sm:text-[12px]"
            >
              <span className="text-white/30">[demo]</span>
              <span className="text-white/45">{line.region}</span>
              <span className="text-white">Node {line.node}</span>
              <span className="text-white/45">secured</span>
              <span className="tabular-nums text-white">{line.contractValue}</span>
              <span className="text-white/45">B2B contract · royalty of</span>
              <span className="tabular-nums text-yield">{line.royalty}</span>
              <span className="text-white/45">distributed to Owner Wallet.</span>
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function YieldTerminal(): JSX.Element {
  return (
    <section id="terminal" className="relative px-6 py-28 sm:py-36 lg:px-10">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[26rem] w-[70rem] -translate-x-1/2 rounded-full bg-yield/[0.035] blur-[160px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-shell">
        <SectionHeading
          eyebrow="Yield Terminal"
          title="Fleet performance,"
          titleTail="rendered in real time."
          lede="Every contract your nodes close is settled, audited and distributed on-chain. The terminal below shows how fleet activity and royalty flow are reported to owners."
        />

        <Reveal delay={0.1} className="mt-14">
          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.02] p-1.5 shadow-lift backdrop-blur-2xl">
            <div className="relative overflow-hidden rounded-[20px] border border-white/[0.05] bg-gradient-to-b from-white/[0.035] to-transparent p-5 sm:p-8">
              <div
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
                aria-hidden="true"
              />

              {/* Terminal chrome */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <StatusDot />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
                    Fleet Telemetry
                  </span>
                </div>
                <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
                  Simulated preview · illustrative figures
                </span>
              </div>

              {/* Metrics */}
              <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
                {TERMINAL_METRICS.map((metric) => (
                  <div key={metric.label} className="bg-obsidian-raised/80 p-5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                      {metric.label}
                    </dt>
                    <dd
                      className={`mt-3 font-mono text-[26px] tabular-nums tracking-tight sm:text-[28px] ${
                        metric.accent ? "text-yield" : "text-white"
                      }`}
                    >
                      {metric.value}
                    </dd>
                    <p className="mt-2 text-[11px] leading-snug text-white/30">{metric.caption}</p>
                  </div>
                ))}
              </dl>

              {/* Trend */}
              <div className="mt-8">
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                    Royalty Distribution · 30d
                  </span>
                  <span className="font-mono text-[11px] tabular-nums text-yield">+34.2%</span>
                </div>
                <YieldChart />
              </div>

              <div className="mt-8">
                <StreamingFeed />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  4 · Mechanism                                                            */
/* -------------------------------------------------------------------------- */

function MechanismCard({ item }: { item: MechanismStep }): JSX.Element {
  const Icon = item.icon;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7 backdrop-blur-xl transition-all duration-500 hover:border-white/[0.16] hover:bg-white/[0.035] sm:p-8">
      <div
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="flex items-center justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
          <Icon className="h-[18px] w-[18px] text-white/70" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span className="font-mono text-[11px] tracking-[0.2em] text-white/20">{item.step}</span>
      </div>

      <h3 className="mt-7 text-xl font-medium tracking-tight text-white">{item.title}</h3>
      <p className="mt-3.5 text-[14px] leading-relaxed text-white/45">{item.body}</p>
    </div>
  );
}

function Mechanism(): JSX.Element {
  return (
    <section id="mechanism" className="relative px-6 py-28 sm:py-36 lg:px-10">
      <div className="mx-auto max-w-shell">
        <SectionHeading
          eyebrow="The Mechanism"
          title="You own the asset."
          titleTail="The network does the work."
          lede="SOVEREIGN-X separates ownership from operation. Owners hold node assets and receive royalties; the platform retains full operational responsibility for every contract executed."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {MECHANISM_STEPS.map((item) => (
            <StaggerItem key={item.step} className="h-full">
              <MechanismCard item={item} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15} className="mt-8">
          <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5 sm:flex-row sm:items-center sm:gap-5">
            <Globe2 className="h-4 w-4 shrink-0 text-white/35" strokeWidth={1.5} aria-hidden="true" />
            <p className="text-[12px] leading-relaxed text-white/35">
              Node assets are software property, not equity, and ownership does not create a partnership
              or employment relationship with SOVEREIGN-X. Whether holding a passive asset is permitted
              under your employment agreement, and how yield is taxed, depends on your jurisdiction and
              contract — confirm both with your own advisors before acquiring.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  5 · Asset tiers                                                          */
/* -------------------------------------------------------------------------- */

function TierCard({ tier }: { tier: AssetTier }): JSX.Element {
  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 backdrop-blur-xl transition-all duration-500 sm:p-8 ${
        tier.featured
          ? "border border-white/[0.18] bg-white/[0.045] shadow-lift"
          : "border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.03]"
      }`}
    >
      {tier.featured ? (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-white/[0.07] blur-3xl"
            aria-hidden="true"
          />
        </>
      ) : null}

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[15px] font-medium tracking-tight text-white">{tier.name}</h3>
          {/* Fixed height keeps price + feature rows aligned across all three cards. */}
          <p className="mt-1 font-mono text-[10px] uppercase leading-[1.5] tracking-[0.16em] text-white/35 lg:min-h-[2.25rem]">
            {tier.nodes}
          </p>
        </div>

        {tier.featured ? (
          <span className="shrink-0 rounded-full border border-white/20 bg-white/[0.08] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/80">
            Most Acquired
          </span>
        ) : null}
      </div>

      <div className="relative mt-7 flex items-baseline gap-2">
        <span className="font-mono text-[40px] leading-none tracking-tight text-white">{tier.price}</span>
        <span className="text-[11px] text-white/30">one-time acquisition</span>
      </div>

      <p className="relative mt-5 text-[13px] leading-relaxed text-white/40 lg:min-h-[3.75rem]">
        {tier.positioning}
      </p>

      <div className="relative my-7 h-px w-full rule-x" aria-hidden="true" />

      {/* flex-1 absorbs the slack from uneven feature counts so every CTA sits on the card floor. */}
      <ul className="relative flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/40" strokeWidth={2} aria-hidden="true" />
            <span className="text-[13px] leading-snug text-white/65">{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href="#top"
        className={`relative mt-9 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[13px] font-semibold transition-all duration-300 ${
          tier.featured
            ? "bg-white text-obsidian hover:bg-white/90 hover:shadow-[0_0_44px_-14px_rgba(255,255,255,0.55)]"
            : "border border-white/[0.12] bg-white/[0.03] text-white/85 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
        }`}
      >
        {tier.cta}
        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
      </a>
    </div>
  );
}

function AssetTiers(): JSX.Element {
  return (
    <section id="tiers" className="relative px-6 py-28 sm:py-36 lg:px-10">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-white/[0.028] blur-[150px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-shell">
        <SectionHeading
          eyebrow="Asset Tiers"
          title="Select your fleet density."
          lede="Each tier is a one-time asset acquisition. Node count determines contract throughput; the 80% royalty share on net contract revenue is identical across every tier."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
          {ASSET_TIERS.map((tier) => (
            <StaggerItem key={tier.id} className="h-full">
              <TierCard tier={tier} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-[11px] leading-relaxed text-white/40">
            Figures shown are illustrative and are not a forecast. Node performance varies by region,
            contract flow and market conditions; royalty distributions are not guaranteed.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  6 · Footer                                                               */
/* -------------------------------------------------------------------------- */

function Footer(): JSX.Element {
  return (
    <footer className="relative px-6 pb-14 pt-20 lg:px-10">
      <div className="mx-auto max-w-shell">
        <div className="h-px w-full rule-x" aria-hidden="true" />

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="font-mono text-[13px] font-medium tracking-[0.22em] text-white">
              SOVEREIGN<span className="text-white/40">-X</span>
            </span>
            <div className="mt-3 flex items-center gap-2">
              <StatusDot />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                Network Active
              </span>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[12px] text-white/40 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <p className="mt-12 max-w-3xl text-[11px] leading-relaxed text-white/40">
          SOVEREIGN-X provides digital software assets and royalty distributions. We do not provide
          business registration services. Consult your tax advisor regarding asset yield. Royalty
          distributions depend on node performance and are not guaranteed; nothing on this page is
          investment, legal or tax advice, or an offer of securities.
        </p>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-white/20">
          © {new Date().getFullYear()} SOVEREIGN-X · All rights reserved
        </p>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                     */
/* -------------------------------------------------------------------------- */

export default function Page(): JSX.Element {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-obsidian">
      {/* Film-grain overlay keeps large dark fields from banding. */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035] grain mix-blend-soft-light"
        aria-hidden="true"
      />

      <GlobalNav />

      <div className="relative z-[2]">
        <Hero />
        <YieldTerminal />
        <Mechanism />
        <AssetTiers />
        <Footer />
      </div>
    </main>
  );
}
