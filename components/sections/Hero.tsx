"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";

import { HangulMark } from "@/components/brand/HangulMark";
import { useStore } from "@/components/store/StoreProvider";
import { MetallicButton } from "@/components/ui/MetallicButton";
import { DROP } from "@/lib/products";

const EASE = [0.16, 1, 0.3, 1] as const;

const WORDS = ["THE", "HIL"] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.35 } },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 48, color: "#FFFFFF" },
  show: { opacity: 1, y: 0, color: "#FFFFFF", transition: { duration: 1.1, ease: EASE } },
};

export function Hero(): JSX.Element {
  const { openPreOrder } = useStore();
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <AmbientBackdrop />

      <div className="relative mx-auto w-full max-w-shell px-6 pb-12 pt-32 sm:px-10 sm:pb-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          className="font-mono text-[10px] uppercase tracking-editorial text-white/55"
        >
          K-Stealth Luxury <span className="mx-3 text-white/20">/</span>
          <span className="text-crimson-soft">{DROP.name}</span>
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-8 flex flex-wrap gap-x-[0.18em] text-[clamp(4.5rem,17vw,17rem)] font-medium leading-[0.86] tracking-tightest text-white"
          aria-label="THE HIL"
        >
          {WORDS.map((word) => (
            <span key={word} className="flex" aria-hidden>
              {Array.from(word).map((char, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  variants={letter}
                  whileHover={
                    reduceMotion
                      ? { color: "#A3142E" }
                      : { y: -14, color: "#A3142E", transition: { duration: 0.35, ease: EASE } }
                  }
                  className="inline-block cursor-default select-none"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <div className="mt-12 grid gap-10 border-t border-neutral-800 pt-8 md:grid-cols-12 md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            className="max-w-md text-base leading-relaxed text-white/60 md:col-span-6 lg:col-span-5"
          >
            Matte obsidian. Crisp white. One crimson seal, placed where only the people behind you will see it.
            Eight pieces, one window, no restock.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
            className="flex flex-wrap items-center gap-6 md:col-span-6 md:justify-end lg:col-span-7"
          >
            <a
              href="#collection"
              className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-editorial text-white/55 transition-colors duration-300 hover:text-white"
            >
              View collection
              <ArrowDown
                className="h-3.5 w-3.5 transition-transform duration-500 ease-editorial group-hover:translate-y-1"
                strokeWidth={1.5}
              />
            </a>
            <MetallicButton size="lg" onClick={() => openPreOrder()}>
              Reserve Drop 01
            </MetallicButton>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.2 }}
        className="pointer-events-none absolute right-6 top-28 hidden origin-top-right -rotate-90 items-center gap-4 sm:right-10 lg:flex"
      >
        <span className="font-mono text-[9px] uppercase tracking-editorial text-white/35">Seal ㅅㅇㄹ</span>
        <span className="h-px w-16 bg-white/15" />
        <HangulMark className="h-3 w-9 text-white/50" />
      </motion.div>
    </section>
  );
}

/**
 * Two slow-drifting radial glows over a flat obsidian field. Deliberately no
 * grid, grain or tile textures: the surface is meant to read as lacquer.
 */
function AmbientBackdrop(): JSX.Element {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="absolute inset-0">
      <div className="absolute inset-0 bg-obsidian" />
      <motion.div
        className="absolute -left-[20%] top-[-10%] h-[70vh] w-[70vw] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(closest-side, rgba(255,255,255,0.07), transparent 70%)",
        }}
        animate={reduceMotion ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] h-[70vh] w-[60vw] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(closest-side, rgba(128,0,22,0.22), transparent 70%)",
        }}
        animate={reduceMotion ? undefined : { x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] top-[10%] h-[50vh] w-[40vw] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(closest-side, rgba(11,19,43,0.9), transparent 70%)",
        }}
        animate={reduceMotion ? undefined : { x: [0, -30, 0], y: [0, 50, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian" />
    </div>
  );
}
