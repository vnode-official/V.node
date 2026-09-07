"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { ProductVisual } from "@/components/product/ProductVisual";
import { useStore } from "@/components/store/StoreProvider";
import { Reveal } from "@/components/ui/Reveal";
import { DROP, PRODUCTS, type Colorway, type Product } from "@/lib/products";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProductGrid(): JSX.Element {
  const { openProduct } = useStore();

  return (
    <section id="collection" className="relative border-t border-neutral-800 scroll-mt-16">
      <div className="mx-auto max-w-shell px-6 pt-24 sm:px-10 sm:pt-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 pb-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-editorial text-white/50">
              Collection <span className="mx-2 text-white/20">/</span> {DROP.name}
            </p>
            <h2 className="mt-5 text-3xl font-medium tracking-tightest text-white sm:text-5xl">Eight pieces.</h2>
          </div>
          <p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-editorial text-white/40">
            Select a piece to open its sheet: detail views, colourways and seal placement.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto max-w-shell px-6 pb-24 sm:px-10 sm:pb-32">
        <ul className="grid grid-cols-2 border-l border-t border-neutral-800 lg:grid-cols-4">
          {PRODUCTS.map((product, index) => (
            <li key={product.id} className="border-b border-r border-neutral-800">
              <Reveal delay={(index % 4) * 0.08} className="h-full">
                <ProductCard product={product} onOpen={() => openProduct(product.id)} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type ProductCardProps = {
  product: Product;
  onOpen: () => void;
};

function ProductCard({ product, onOpen }: ProductCardProps): JSX.Element {
  const [hovered, setHovered] = useState(false);
  const primary = product.colorways[0] as Colorway;
  const alternate = product.colorways[1];
  /* Hovering previews the second colourway when there is one. */
  const shown = hovered && alternate ? alternate : primary;
  const placement = product.placements[0];

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={`Open ${product.name}`}
      className="group flex h-full w-full flex-col text-left outline-none focus-visible:bg-white/[0.03]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-obsidian-raised">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={shown.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <ProductVisual shape={product.shape} colorway={shown} className="h-full w-full" />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {placement ? (
          <span
            aria-hidden
            className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ left: `${placement.x}%`, top: `${placement.y}%` }}
          />
        ) : null}

        <span className="absolute left-4 top-4 font-mono text-[9px] uppercase tracking-editorial text-white/40">
          {String(PRODUCTS.indexOf(product) + 1).padStart(2, "0")}
        </span>

        <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center border border-neutral-800 bg-obsidian/70 text-white opacity-0 transition-all duration-500 ease-editorial group-hover:opacity-100">
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-5 p-4 sm:p-5">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-editorial text-white/40">{product.category}</p>
          <h3 className="mt-2 text-sm font-medium tracking-tight text-white sm:text-base">{product.name}</h3>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            {product.colorways.map((colorway) => (
              <span
                key={colorway.id}
                title={colorway.label}
                className={`h-3 w-3 shrink-0 rounded-full border transition-colors duration-300 ${
                  colorway.id === shown.id ? "border-white" : "border-white/25"
                }`}
                style={{ backgroundColor: colorway.hex }}
              />
            ))}
            {placement ? (
              <span className="ml-2 hidden min-w-0 truncate font-mono text-[9px] uppercase tracking-editorial text-crimson-soft sm:inline">
                ㅅㅇㄹ · {placement.title}
              </span>
            ) : null}
          </div>
          <p className="shrink-0 whitespace-nowrap font-mono text-xs text-white/70">{product.price}</p>
        </div>
      </div>
    </button>
  );
}
