"use client";

import { useStore } from "@/components/store/StoreProvider";
import { MetallicButton } from "@/components/ui/MetallicButton";
import { Reveal } from "@/components/ui/Reveal";
import { DROP } from "@/lib/products";

const STEPS = [
  { index: "01", title: "Reserve", body: "Choose a piece, colour and size. No payment is taken." },
  { index: "02", title: "Confirm", body: "A 48-hour hold opens when the window starts. Pay then, or release." },
  { index: "03", title: "Receive", body: "Ships from Seoul in an unmarked obsidian box. Signature required." },
] as const;

export function Drop(): JSX.Element {
  const { openPreOrder } = useStore();

  return (
    <section id="drop" className="relative overflow-hidden border-t border-neutral-800 scroll-mt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh]"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(128,0,22,0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-shell px-6 py-24 sm:px-10 sm:py-32">
        <Reveal className="text-center">
          <p className="font-mono text-[10px] uppercase tracking-editorial text-white/50">
            {DROP.window} <span className="mx-3 text-white/20">/</span> {DROP.units}
          </p>
          <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-medium leading-[0.98] tracking-tightest text-white sm:text-6xl lg:text-7xl">
            Reserve before the window opens.
          </h2>
          <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-white/60">
            Reservations are ordered by time. When the drop opens, they are honoured in that order until each style
            is gone.
          </p>
          <div className="mt-12 flex justify-center">
            <MetallicButton size="lg" onClick={() => openPreOrder()}>
              Reserve Drop 01
            </MetallicButton>
          </div>
        </Reveal>

        <ol className="mt-24 grid gap-px border border-neutral-800 bg-neutral-800 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.index} className="bg-obsidian">
              <Reveal delay={index * 0.1} className="h-full p-8">
                <span className="font-mono text-[10px] text-crimson-soft">{step.index}</span>
                <h3 className="mt-6 text-lg font-medium text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
