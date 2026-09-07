"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useRef, useState } from "react";

import { HangulMark } from "@/components/brand/HangulMark";
import { ProductVisual } from "@/components/product/ProductVisual";
import { useStore } from "@/components/store/StoreProvider";
import { MetallicButton } from "@/components/ui/MetallicButton";
import { Overlay } from "@/components/ui/Overlay";
import { getProduct, type Colorway, type Product } from "@/lib/products";

const EASE = [0.16, 1, 0.3, 1] as const;

type View = "look" | "seal" | "material";

const VIEWS: readonly { id: View; label: string }[] = [
  { id: "look", label: "Look" },
  { id: "seal", label: "Seal" },
  { id: "material", label: "Material" },
];

export function ProductDrawer(): JSX.Element {
  const { activeProductId, closeProduct } = useStore();
  const lastProduct = useRef<Product | null>(null);

  const current = activeProductId ? getProduct(activeProductId) : undefined;
  if (current) lastProduct.current = current;
  /* Keep rendering the last product while the drawer animates out. */
  const product = current ?? lastProduct.current;

  return (
    <Overlay open={Boolean(current)} onClose={closeProduct} variant="drawer" labelledBy="product-drawer-title">
      {product ? <DrawerContent key={product.id} product={product} onClose={closeProduct} /> : null}
    </Overlay>
  );
}

type DrawerContentProps = {
  product: Product;
  onClose: () => void;
};

function DrawerContent({ product, onClose }: DrawerContentProps): JSX.Element {
  const { openPreOrder } = useStore();
  const [colorway, setColorway] = useState<Colorway>(product.colorways[0] as Colorway);
  const [size, setSize] = useState<string>(product.sizes[0] ?? "");
  const [view, setView] = useState<View>("look");
  const placement = product.placements[0];

  return (
    <>
      <header className="flex items-center justify-between border-b border-neutral-800 px-6 py-4 sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-editorial text-white/50">
          {product.category} <span className="mx-2 text-white/20">/</span> {product.sku}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="-mr-2 flex h-9 w-9 items-center justify-center text-white/60 transition-colors duration-300 hover:text-white"
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-none">
        <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-neutral-800 bg-obsidian-raised">
          <AnimatePresence mode="wait" initial={false}>
            {view === "material" ? (
              <motion.div
                key="material"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="absolute inset-0 flex flex-col justify-end p-8"
                style={{
                  background: `linear-gradient(145deg, ${colorway.hex} 0%, ${colorway.hex} 55%, rgba(0,0,0,0.35) 100%)`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-70"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 50% at 30% 20%, rgba(255,255,255,0.10), transparent 70%)",
                  }}
                />
                <p
                  className="relative font-mono text-[10px] uppercase tracking-editorial"
                  style={{ color: colorway.hex === "#FFFFFF" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)" }}
                >
                  Composition
                </p>
                <p
                  className="relative mt-3 max-w-sm text-sm leading-relaxed"
                  style={{ color: colorway.hex === "#FFFFFF" ? "#0B0B0C" : "#FFFFFF" }}
                >
                  {product.material}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={`${colorway.id}-${view}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="absolute inset-0"
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: view === "seal" ? 2.6 : 1 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  style={{
                    transformOrigin: placement ? `${placement.x}% ${placement.y}%` : "50% 50%",
                  }}
                >
                  <ProductVisual shape={product.shape} colorway={colorway} className="h-full w-full" />
                </motion.div>

                {view === "look" && placement ? (
                  /*
                   * Anchor sits exactly on the seal; the pin is lifted off it on a
                   * leader line so the mark itself stays visible. Plain wrapper owns
                   * the centring transform, motion owns the entrance.
                   */
                  <motion.div
                    className="absolute h-0 w-0"
                    style={{ left: `${placement.x}%`, top: `${placement.y}%` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.6, ease: EASE }}
                  >
                    <button
                      type="button"
                      onClick={() => setView("seal")}
                      className="group absolute bottom-0 left-0 flex w-6 -translate-x-1/2 flex-col items-center"
                      aria-label={`Zoom into ${placement.title}`}
                    >
                      <span className="relative flex h-6 w-6 items-center justify-center rounded-full border border-white/70 bg-obsidian/80 font-mono text-[9px] text-white backdrop-blur">
                        {placement.index}
                        <span className="absolute inset-0 -z-10 animate-ping rounded-full border border-white/40 [animation-duration:2.4s]" />
                        <span
                          className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-editorial text-white/70 transition-colors duration-300 group-hover:text-white ${
                            placement.x > 60 ? "right-full mr-3" : "left-full ml-3"
                          }`}
                        >
                          {placement.title}
                        </span>
                      </span>
                      <span aria-hidden className="h-8 w-px bg-white/40" />
                      <span aria-hidden className="h-[7px] w-[7px] -translate-y-[3.5px] rounded-full border border-white/80" />
                    </button>
                  </motion.div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>

          <p className="pointer-events-none absolute left-6 top-5 font-mono text-[9px] uppercase tracking-editorial text-white/40 sm:left-8">
            {colorway.label} <span className="mx-2 text-white/20">/</span> {colorway.markLabel}
          </p>
        </div>

        <div className="flex border-b border-neutral-800">
          {VIEWS.map((item) => {
            const selected = item.id === view;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                aria-pressed={selected}
                className={`relative flex-1 py-3.5 font-mono text-[10px] uppercase tracking-editorial transition-colors duration-300 ${
                  selected ? "text-white" : "text-white/40 hover:text-white/80"
                }`}
              >
                {item.label}
                {selected ? (
                  <motion.span layoutId="drawer-view-underline" className="absolute inset-x-0 bottom-0 h-px bg-white" />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="space-y-10 px-6 py-8 sm:px-8">
          <div>
            <div className="flex items-start justify-between gap-6">
              <h2 id="product-drawer-title" className="text-2xl font-medium tracking-tightest text-white sm:text-3xl">
                {product.name}
              </h2>
              <p className="pt-1 font-mono text-sm text-white/80">{product.price}</p>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">{product.description}</p>
          </div>

          <section aria-labelledby="drawer-colour">
            <div className="flex items-baseline justify-between">
              <h3 id="drawer-colour" className="font-mono text-[10px] uppercase tracking-editorial text-white/50">
                Colour
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-editorial text-white/80">{colorway.label}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {product.colorways.map((option) => {
                const selected = option.id === colorway.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setColorway(option);
                      if (view === "material") setView("look");
                    }}
                    aria-pressed={selected}
                    aria-label={`${option.label} colourway`}
                    className={`flex items-center gap-3 border px-3 py-2 transition-colors duration-300 ${
                      selected ? "border-white" : "border-neutral-800 hover:border-neutral-600"
                    }`}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-white/20"
                      style={{ backgroundColor: option.hex }}
                    />
                    <span className="font-mono text-[10px] uppercase tracking-editorial text-white/80">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="drawer-size">
            <h3 id="drawer-size" className="font-mono text-[10px] uppercase tracking-editorial text-white/50">
              Size
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.sizes.map((option) => {
                const selected = option === size;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSize(option)}
                    aria-pressed={selected}
                    className={`min-w-[3rem] border px-3 py-2 font-mono text-[10px] uppercase tracking-editorial transition-colors duration-300 ${
                      selected
                        ? "border-white text-white"
                        : "border-neutral-800 text-white/60 hover:border-neutral-600 hover:text-white"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="drawer-seal">
            <h3 id="drawer-seal" className="font-mono text-[10px] uppercase tracking-editorial text-white/50">
              Seal placement
            </h3>
            <ul className="mt-4 divide-y divide-neutral-800 border-y border-neutral-800">
              {product.placements.map((item) => (
                <li key={item.index} className="grid grid-cols-[2.5rem_1fr] gap-4 py-4">
                  <span className="font-mono text-[10px] text-crimson-soft">{item.index}</span>
                  <div>
                    <p className="text-sm text-white">
                      {item.title}
                      <span className="ml-3 font-mono text-[10px] text-white/40">{item.note}</span>
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/55">{item.detail}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <HangulMark
                        color={colorway.markHex}
                        variant={colorway.markStyle}
                        className="h-3 w-9"
                        title={`${colorway.markLabel} seal`}
                      />
                      <span className="font-mono text-[9px] uppercase tracking-editorial text-white/40">
                        {colorway.markLabel}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="drawer-material">
            <h3 id="drawer-material" className="font-mono text-[10px] uppercase tracking-editorial text-white/50">
              Material
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{product.material}</p>
          </section>
        </div>
      </div>

      <footer className="flex items-center justify-between gap-6 border-t border-neutral-800 px-6 py-5 sm:px-8">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-editorial text-white/40">Reservation</p>
          <p className="mt-1 font-mono text-xs text-white/80">
            {colorway.label} · {size}
          </p>
        </div>
        <MetallicButton onClick={() => openPreOrder({ productId: product.id, colorwayId: colorway.id })}>
          Reserve Drop 01
        </MetallicButton>
      </footer>
    </>
  );
}
