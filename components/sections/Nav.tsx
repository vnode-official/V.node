"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

import { HangulMark } from "@/components/brand/HangulMark";
import { useStore } from "@/components/store/StoreProvider";
import { DROP } from "@/lib/products";

const LINKS = [
  { label: "Collection", href: "#collection" },
  { label: "Seal", href: "#seal" },
  { label: "Drop", href: "#drop" },
] as const;

export function Nav(): JSX.Element {
  const { openPreOrder } = useStore();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-editorial ${
        scrolled ? "border-b border-neutral-800 bg-obsidian/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-shell items-center justify-between px-6 sm:px-10">
        <a href="#top" className="flex items-center gap-4" aria-label="THE HIL — home">
          <HangulMark className="h-3.5 w-[42px] text-white" />
          <span className="hidden font-mono text-[10px] uppercase tracking-editorial text-white/70 sm:inline">
            The Hil
          </span>
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-editorial text-white/55 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <span className="hidden font-mono text-[10px] uppercase tracking-editorial text-white/40 lg:inline">
            {DROP.name} <span className="mx-2 text-crimson-soft">●</span> {DROP.window}
          </span>
          <button
            type="button"
            onClick={() => openPreOrder()}
            className="border border-neutral-800 px-4 py-2 font-mono text-[10px] uppercase tracking-editorial text-white transition-colors duration-300 hover:border-white"
          >
            Reserve
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
