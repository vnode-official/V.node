"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import { useState, type FormEvent } from "react";

import { HangulMark } from "@/components/brand/HangulMark";
import { ProductVisual } from "@/components/product/ProductVisual";
import { useStore, type PreOrderPrefill } from "@/components/store/StoreProvider";
import { MetallicButton } from "@/components/ui/MetallicButton";
import { Overlay } from "@/components/ui/Overlay";
import { DROP, PRODUCTS, getProduct, type Colorway, type ColorwayId, type Product } from "@/lib/products";

const EASE = [0.16, 1, 0.3, 1] as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function PreOrderModal(): JSX.Element {
  const { preOrderOpen, preOrderPrefill, closePreOrder } = useStore();

  return (
    <Overlay open={preOrderOpen} onClose={closePreOrder} variant="modal" labelledBy="preorder-title">
      <PreOrderForm prefill={preOrderPrefill} onClose={closePreOrder} />
    </Overlay>
  );
}

type Status = "idle" | "submitting" | "done";

type PreOrderFormProps = {
  prefill: PreOrderPrefill;
  onClose: () => void;
};

function resolveColorway(product: Product, id: ColorwayId | undefined): Colorway {
  return product.colorways.find((option) => option.id === id) ?? (product.colorways[0] as Colorway);
}

function PreOrderForm({ prefill, onClose }: PreOrderFormProps): JSX.Element {
  const initialProduct = (prefill.productId ? getProduct(prefill.productId) : undefined) ?? (PRODUCTS[0] as Product);

  const [product, setProduct] = useState<Product>(initialProduct);
  const [colorway, setColorway] = useState<Colorway>(resolveColorway(initialProduct, prefill.colorwayId));
  const [size, setSize] = useState<string>(initialProduct.sizes[0] ?? "");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");

  const selectProduct = (id: string) => {
    const next = getProduct(id);
    if (!next) return;
    setProduct(next);
    setColorway(resolveColorway(next, colorway.id));
    setSize(next.sizes[0] ?? "");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== "idle") return;
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Enter a valid email so we can confirm your reservation.");
      return;
    }
    setError(null);
    setStatus("submitting");
    /* No backend yet: simulate the round-trip so the state machine is exercised. */
    window.setTimeout(() => {
      const serial = Math.floor(1000 + Math.random() * 9000);
      setReference(`HIL-01-${serial}`);
      setStatus("done");
    }, 900);
  };

  const labelClass = "font-mono text-[10px] uppercase tracking-editorial text-white/50";
  const fieldClass =
    "mt-2 w-full appearance-none border border-neutral-800 bg-transparent px-4 py-3 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/30 focus:border-white";

  return (
    <div className="max-h-[92vh] overflow-y-auto scrollbar-none">
      <header className="flex items-center justify-between border-b border-neutral-800 px-6 py-4 sm:px-8">
        <div className="flex items-center gap-4">
          <HangulMark className="h-3 w-9 text-white" />
          <p className="font-mono text-[10px] uppercase tracking-editorial text-white/50">
            {DROP.name} <span className="mx-2 text-white/20">/</span> Pre-order
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close pre-order"
          className="-mr-2 flex h-9 w-9 items-center justify-center text-white/60 transition-colors duration-300 hover:text-white"
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </header>

      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="px-6 py-10 sm:px-8"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40">
              <Check className="h-4 w-4 text-white" strokeWidth={1.5} />
            </div>
            <h2 id="preorder-title" className="mt-8 text-2xl font-medium tracking-tightest text-white">
              Reservation held.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {product.name} in {colorway.label}, size {size}. A confirmation is on its way to{" "}
              <span className="text-white">{email.trim()}</span>. Nothing is charged until the drop opens on{" "}
              {DROP.window.split(" — ")[0]}.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-neutral-800 pt-6">
              <div>
                <dt className={labelClass}>Reference</dt>
                <dd className="mt-2 font-mono text-sm text-white">{reference}</dd>
              </div>
              <div>
                <dt className={labelClass}>Window</dt>
                <dd className="mt-2 font-mono text-sm text-white">{DROP.window}</dd>
              </div>
            </dl>
            <div className="mt-10 flex justify-end">
              <MetallicButton onClick={onClose}>Return</MetallicButton>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="grid sm:grid-cols-[9rem_1fr]"
          >
            <div className="hidden border-r border-neutral-800 bg-obsidian-raised sm:block">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${product.id}-${colorway.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="sticky top-0 p-4"
                >
                  <ProductVisual shape={product.shape} colorway={colorway} className="w-full" />
                  <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-editorial text-white/40">
                    {colorway.label}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-6 px-6 py-8 sm:px-8">
              <div>
                <h2 id="preorder-title" className="text-2xl font-medium tracking-tightest text-white">
                  Reserve {DROP.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {DROP.units}. Reservations are held for 48 hours once the window opens.
                </p>
              </div>

              <label className="block">
                <span className={labelClass}>Piece</span>
                <span className="relative block">
                  <select
                    value={product.id}
                    onChange={(event) => selectProduct(event.target.value)}
                    className={`${fieldClass} pr-10`}
                  >
                    {PRODUCTS.map((option) => (
                      <option key={option.id} value={option.id} className="bg-obsidian">
                        {option.name} — {option.price}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-white/40"
                    strokeWidth={1.5}
                  />
                </span>
              </label>

              <div className="grid gap-6 sm:grid-cols-2">
                <fieldset>
                  <legend className={labelClass}>Colour</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.colorways.map((option) => {
                      const selected = option.id === colorway.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setColorway(option)}
                          aria-pressed={selected}
                          className={`flex items-center gap-2 border px-3 py-2 transition-colors duration-300 ${
                            selected ? "border-white" : "border-neutral-800 hover:border-neutral-600"
                          }`}
                        >
                          <span className="h-3 w-3 rounded-full border border-white/20" style={{ backgroundColor: option.hex }} />
                          <span className="font-mono text-[10px] uppercase tracking-editorial text-white/80">
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className={labelClass}>Size</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.sizes.map((option) => {
                      const selected = option === size;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setSize(option)}
                          aria-pressed={selected}
                          className={`min-w-[2.75rem] border px-3 py-2 font-mono text-[10px] uppercase tracking-editorial transition-colors duration-300 ${
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
                </fieldset>
              </div>

              <label className="block">
                <span className={labelClass}>Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="you@domain.com"
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "preorder-email-error" : undefined}
                  className={`${fieldClass} ${error ? "border-crimson-soft" : ""}`}
                />
                <AnimatePresence>
                  {error ? (
                    <motion.span
                      id="preorder-email-error"
                      role="alert"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-2 block text-xs text-crimson-soft"
                    >
                      {error}
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </label>

              <div className="flex items-center justify-between gap-6 border-t border-neutral-800 pt-6">
                <p className="font-mono text-xs text-white/70">{product.price}</p>
                <MetallicButton type="submit" disabled={status === "submitting"} aria-busy={status === "submitting"}>
                  {status === "submitting" ? "Holding…" : "Reserve Drop 01"}
                </MetallicButton>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
