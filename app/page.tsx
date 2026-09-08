"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Bot, ChevronDown, Globe2, Orbit, Store } from "lucide-react";

type Locale = "EN" | "KO" | "JA" | "ES";

const COPY: Record<Locale, { explore: string; book: string; hero: string; eyebrow: string }> = {
  EN: { explore: "Explore the Atrium", book: "Reserve a store", hero: "The next address for spatial commerce.", eyebrow: "Yeouido · Seoul · 37.5219° N" },
  KO: { explore: "아트리움 둘러보기", book: "스토어 예약", hero: "공간 커머스의 새로운 주소.", eyebrow: "여의도 · 서울 · 37.5219° N" },
  JA: { explore: "アトリウムを探索", book: "ストアを予約", hero: "空間コマースの次なるアドレス。", eyebrow: "汝矣島 · ソウル · 37.5219° N" },
  ES: { explore: "Explorar el atrio", book: "Reservar tienda", hero: "La próxima dirección del comercio espacial.", eyebrow: "Yeouido · Seúl · 37.5219° N" },
};

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }): JSX.Element {
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-90px" }} transition={{ duration: 0.8 }}>{children}</motion.div>;
}

function SectionHeading({ index, title, body }: { index: string; title: string; body: string }): JSX.Element {
  return <Reveal className="max-w-2xl"><p className="micro-label">{index}</p><h2 className="mt-5 text-4xl font-medium leading-[.98] tracking-[-.055em] text-white sm:text-6xl">{title}</h2><p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/50">{body}</p></Reveal>;
}

function GlobalNav({ locale, onLocale }: { locale: Locale; onLocale: (locale: Locale) => void }): JSX.Element {
  const [open, setOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-7">
    <nav className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-white/10 bg-black/40 px-5 py-3 backdrop-blur-2xl">
      <a href="#top" className="flex items-center gap-3"><span className="grid h-7 w-7 place-items-center rounded-full border border-white/30 text-[10px]">H</span><span className="text-sm font-medium tracking-[.18em]">THE HIL</span></a>
      <div className="hidden gap-7 text-[11px] uppercase tracking-[.16em] text-white/55 md:flex"><a href="#space">Spatial Mall</a><a href="#saas">SaaS Platform</a><a href="#docent">AI Docent</a></div>
      <a href="#saas" className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black">Enter THE HIL</a>
    </nav>
    <div className="fixed bottom-5 right-5 z-50">
      <button onClick={() => setOpen(!open)} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#101114]/90 text-white shadow-2xl backdrop-blur-xl" aria-label="Select language"><Globe2 className="h-5 w-5" /></button>
      {open && <div className="absolute bottom-14 right-0 overflow-hidden rounded-2xl border border-white/10 bg-[#15161a]/95 p-1 backdrop-blur-xl">{(["EN", "KO", "JA", "ES"] as Locale[]).map((item) => <button key={item} onClick={() => { onLocale(item); setOpen(false); }} className={`block w-16 rounded-xl px-3 py-2 text-left text-xs ${item === locale ? "bg-white text-black" : "text-white/60 hover:bg-white/10"}`}>{item}</button>)}</div>}
    </div>
  </header>;
}

function Scene(): JSX.Element {
  const mount = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    import("three").then((THREE) => {
      if (!mount.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const el = mount.current; const scene = new THREE.Scene(); const camera = new THREE.PerspectiveCamera(36, el.clientWidth / el.clientHeight, .1, 100);
      camera.position.set(0, 2.4, 10); const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5)); renderer.setSize(el.clientWidth, el.clientHeight); el.appendChild(renderer.domElement);
      const building = new THREE.Group(); scene.add(building);
      building.add(new THREE.Mesh(new THREE.BoxGeometry(7.6, 3.8, 1.4), new THREE.MeshPhysicalMaterial({ color: 0x10141a, metalness: .9, roughness: .22, transmission: .12 })));
      for (let x = -3.45; x < 3.5; x += .38) { const line = new THREE.Mesh(new THREE.BoxGeometry(.035, 3.55, 1.48), new THREE.MeshBasicMaterial({ color: 0x8295a9, transparent: true, opacity: .35 })); line.position.set(x, 0, .73); building.add(line); }
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 20), new THREE.MeshBasicMaterial({ color: 0x050608 })); floor.rotation.x = -Math.PI / 2; floor.position.y = -2; scene.add(floor);
      scene.add(new THREE.AmbientLight(0xadc8ff, 1.8)); const point = new THREE.PointLight(0xc8defd, 9, 20); point.position.set(0, 4, 4); scene.add(point);
      let frame = 0; const onResize = () => { camera.aspect = el.clientWidth / el.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(el.clientWidth, el.clientHeight); }; window.addEventListener("resize", onResize);
      const render = () => { building.rotation.y = Math.sin(Date.now() * .00025) * .15; building.position.y = Math.sin(Date.now() * .0005) * .15; renderer.render(scene, camera); frame = requestAnimationFrame(render); }; render();
      cleanup = () => { cancelAnimationFrame(frame); window.removeEventListener("resize", onResize); renderer.dispose(); el.replaceChildren(); };
    }); return () => cleanup?.();
  }, []);
  return <div ref={mount} className="absolute inset-0" aria-hidden="true" />;
}

function Hero({ copy }: { copy: (typeof COPY)[Locale] }): JSX.Element {
  return <section id="top" className="relative min-h-[900px] overflow-hidden px-6 pt-44 lg:px-10">
    <Scene /><div className="skyline" /><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#07080a_78%)]" />
    <div className="relative mx-auto max-w-[1400px]"><motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-4xl"><p className="micro-label">{copy.eyebrow}</p><h1 className="mt-7 text-[clamp(3.7rem,10vw,9.5rem)] font-medium leading-[.82] tracking-[-.075em] text-white">THE HIL<br /><span className="text-white/45">YEOUIDO</span></h1><div className="mt-10 flex max-w-xl flex-col gap-6 sm:flex-row sm:items-end"><p className="text-lg leading-relaxed text-white/65">{copy.hero}<br />The Next-Gen 3D Spatial Commerce Platform & AI Sales Engine.</p><a href="#space" className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm backdrop-blur-md">{copy.explore}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a></div></motion.div></div>
    <div className="absolute bottom-10 left-6 right-6 flex items-center justify-between border-t border-white/15 pt-4 text-[10px] uppercase tracking-[.22em] text-white/45 lg:left-10 lg:right-10"><span>Scroll to enter</span><ChevronDown className="h-4 w-4 animate-bounce" /><span>01 / 04</span></div>
  </section>;
}

function SpatialMall(): JSX.Element {
  return <section id="space" className="relative overflow-hidden px-6 py-28 lg:px-10"><div className="mx-auto max-w-[1400px]"><SectionHeading index="01 — VIRTUAL ATRIUM" title="A mall designed for the spatial internet." body="Step beyond the storefront. THE HIL turns browsing into an atmosphere: programmable architecture, shoppable worlds, and branded moments that persist." /><Reveal className="mt-16"><div className="atrium-grid rounded-[2rem] border border-white/10 p-5 sm:p-10"><div className="flex items-start justify-between"><span className="micro-label">LEVEL 12 / LIVE SPACES</span><Orbit className="h-5 w-5 text-white/50" /></div><div className="mt-28 grid gap-5 md:grid-cols-3">{["MUSINSA EDITIONS", "GENTLE MONSTER", "AURA LABS"].map((brand, index) => <motion.div whileHover={{ y: -8 }} key={brand} className="glass-card min-h-48 p-5"><span className="text-[10px] text-white/40">0{index + 1} — FLAGSHIP</span><h3 className="mt-24 text-xl tracking-[-.04em]">{brand}</h3><ArrowUpRight className="mt-3 h-4 w-4 text-white/60" /></motion.div>)}</div></div></Reveal></div></section>;
}

function SaaS(): JSX.Element {
  const [slot, setSlot] = useState("A-12");
  return <section id="saas" className="px-6 py-28 lg:px-10"><div className="mx-auto max-w-[1400px]"><SectionHeading index="02 — STORE SLOT SAAS" title="Your flagship, rendered without limits." body="Launch a virtual showroom from $149/mo. Select a position inside THE HIL and transform your commerce into an immersive destination." /><div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_.7fr]"><div className="floor-plan"><div className="flex justify-between"><span className="micro-label">THE HIL / FLOOR MAP</span><span className="text-xs text-white/45">Selected: {slot}</span></div><div className="slot-map mt-12">{["A-12", "A-14", "B-03", "B-05", "C-01", "C-04", "D-12", "D-13"].map((item) => <button key={item} onClick={() => setSlot(item)} className={`slot ${slot === item ? "selected" : ""}`}>{item}</button>)}</div></div><div className="glass-card p-7"><Store className="h-5 w-5 text-white/70" /><p className="micro-label mt-8">SPATIAL LEASE</p><h3 className="mt-3 text-3xl tracking-[-.05em]">From $149<span className="text-base text-white/45">/mo</span></h3><p className="mt-4 text-sm leading-relaxed text-white/50">White-glove spatial setup, storefront CMS, and live experience analytics.</p><button className="mt-10 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-black">Claim {slot}</button></div></div></div></section>;
}

function Intelligence(): JSX.Element {
  return <section id="docent" className="px-6 py-28 lg:px-10"><div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-2 lg:items-end"><SectionHeading index="03 — AI SALES DOCENT" title="A considered conversation at every threshold." body="The HIL's AI Docent knows your brand world and meets every visitor with a personal, conversion-ready experience." /><Reveal className="docent p-7"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-white text-black"><Bot className="h-5 w-5" /></div><div><p className="text-sm">HIL Concierge</p><p className="text-xs text-[#bcd3ff]">● Online now</p></div></div><div className="mt-10 rounded-2xl bg-white/10 p-4 text-sm leading-relaxed text-white/85">“I see you lingered in the Atelier. Shall I bring the limited Seoul edit closer?”</div><div className="mt-3 ml-auto w-fit rounded-2xl bg-white p-4 text-sm text-black">Show me the Seoul edit.</div><div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5"><span className="micro-label">CONVERSION LIFT</span><strong className="text-3xl tracking-[-.06em]">+30%</strong></div></Reveal></div></section>;
}

function Engine(): JSX.Element {
  return <section className="px-6 py-28 lg:px-10"><div className="mx-auto max-w-[1400px]"><SectionHeading index="04 — COMMERCE ENGINE" title="Make scarcity feel physical." body="Limited drops move at the pace of culture. THE HIL's transaction layer pairs event-scale launches with precise GMV intelligence." /><div className="mt-14 grid gap-5 md:grid-cols-3">{[["$4.8M", "GMV / 30 DAYS"], ["97.2%", "DROP SELL-THROUGH"], ["08:43", "AVERAGE DWELL TIME"]].map(([value, label]) => <Reveal key={label} className="glass-card p-7"><p className="micro-label">{label}</p><p className="mt-12 text-5xl tracking-[-.07em]">{value}</p><div className="mt-5 h-px bg-gradient-to-r from-[#aac3ff] to-transparent" /></Reveal>)}</div></div></section>;
}

function Footer(): JSX.Element { return <footer className="px-6 pb-12 pt-16 lg:px-10"><div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-10 border-t border-white/15 pt-8 sm:flex-row"><div><p className="text-xl tracking-[.16em]">THE HIL</p><p className="mt-2 text-xs text-white/45">A future address in Yeouido, Seoul.</p></div><p className="micro-label">© 2026 THE HIL / YEOUIDO SEOUL</p></div></footer>; }

export default function Page(): JSX.Element {
  const [locale, setLocale] = useState<Locale>("EN");
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, .16], [1, .2]);
  return <main className="relative min-h-screen overflow-x-hidden bg-[#07080a] text-white"><div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.045] grain mix-blend-soft-light" /><GlobalNav locale={locale} onLocale={setLocale} /><motion.div style={{ opacity }}><Hero copy={COPY[locale]} /></motion.div><div className="relative z-[2]"><SpatialMall /><SaaS /><Intelligence /><Engine /><Footer /></div></main>;
}
