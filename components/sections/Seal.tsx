import { HangulMark } from "@/components/brand/HangulMark";
import { Reveal } from "@/components/ui/Reveal";

type Treatment = Readonly<{
  id: string;
  category: string;
  pieces: string;
  placement: string;
  note: string;
  technique: string;
  /** Swatch background. */
  base: string;
  /** Seal colour on that base. */
  mark: string;
  variant: "solid" | "outline";
  /** Border for white swatches so they sit on obsidian cleanly. */
  light?: boolean;
}>;

const TREATMENTS: readonly Treatment[] = [
  {
    id: "outerwear",
    category: "Outerwear",
    pieces: "Blouson · Windbreaker · Coat",
    placement: "Outer back neck",
    note: "목 뒤쪽 바깥쪽",
    technique: "Deep Crimson single-needle embroidery, 12 mm",
    base: "#0B0B0C",
    mark: "#800016",
    variant: "solid",
  },
  {
    id: "cap-black",
    category: "Headwear",
    pieces: "Consonant Cap · Black",
    placement: "Front centre panel",
    note: "앞면 중앙",
    technique: "Deep Crimson fill stitch, 18 mm",
    base: "#0B0B0C",
    mark: "#800016",
    variant: "solid",
  },
  {
    id: "cap-navy",
    category: "Headwear",
    pieces: "Consonant Cap · Deep Navy",
    placement: "Front centre panel",
    note: "앞면 중앙",
    technique: "Midnight Blue outline stitch, tone on tone",
    base: "#0B132B",
    mark: "#2A3A6B",
    variant: "outline",
  },
  {
    id: "tee-black",
    category: "Tees",
    pieces: "Seal Tee · Black",
    placement: "Sleeve hem / cuff",
    note: "소매 끝단",
    technique: "White micro print, 6 mm",
    base: "#0B0B0C",
    mark: "#FFFFFF",
    variant: "solid",
  },
  {
    id: "tee-white",
    category: "Tees",
    pieces: "Seal Tee · White",
    placement: "Sleeve hem / cuff",
    note: "소매 끝단",
    technique: "Deep Crimson micro print, 6 mm",
    base: "#FFFFFF",
    mark: "#800016",
    variant: "solid",
    light: true,
  },
  {
    id: "goods",
    category: "Goods",
    pieces: "Monami 6-Pack · Tea Bag Set",
    placement: "Barrel etch · Lid emboss",
    note: "각인 · 엠보싱",
    technique: "Laser etch filled Deep Crimson · blind emboss with crimson tag",
    base: "#151517",
    mark: "#800016",
    variant: "solid",
  },
];

export function Seal(): JSX.Element {
  return (
    <section id="seal" className="relative border-t border-neutral-800 scroll-mt-16">
      <div className="mx-auto max-w-shell px-6 py-24 sm:px-10 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-editorial text-white/50">The seal</p>
            <h2 className="mt-6 text-3xl font-medium leading-[1.05] tracking-tightest text-white sm:text-5xl">
              Three consonants. One placement per piece.
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/55">
              ㅅ, ㅇ and ㄹ, reduced to strokes and a circle. It is stitched, printed or etched at a size
              that disappears at arm&apos;s length and resolves up close.
            </p>
            <div className="mt-12 border border-neutral-800 p-10">
              <HangulMark className="h-12 w-full text-white" />
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <ul className="grid gap-px border border-neutral-800 bg-neutral-800 sm:grid-cols-2 lg:grid-cols-3">
              {TREATMENTS.map((treatment, index) => (
                <li key={treatment.id} className="bg-obsidian">
                  <Reveal delay={(index % 3) * 0.08} className="flex h-full flex-col">
                    <div
                      className={`flex aspect-[4/3] items-center justify-center ${treatment.light ? "border-b border-neutral-800" : ""}`}
                      style={{ backgroundColor: treatment.base }}
                    >
                      <HangulMark
                        color={treatment.mark}
                        variant={treatment.variant}
                        className="h-5 w-16"
                        title={`${treatment.pieces} seal`}
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-5">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-editorial text-white/40">
                          {treatment.category}
                        </p>
                        <p className="mt-1.5 text-sm text-white">{treatment.pieces}</p>
                      </div>
                      <dl className="mt-auto space-y-2 border-t border-neutral-800 pt-4">
                        <div className="flex items-baseline justify-between gap-4">
                          <dt className="font-mono text-[9px] uppercase tracking-editorial text-white/40">Placement</dt>
                          <dd className="text-right text-xs text-white/80">
                            <span className="block">{treatment.placement}</span>
                            <span className="block whitespace-nowrap font-mono text-[9px] text-crimson-soft">
                              {treatment.note}
                            </span>
                          </dd>
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                          <dt className="font-mono text-[9px] uppercase tracking-editorial text-white/40">Technique</dt>
                          <dd className="text-right text-xs text-white/60">{treatment.technique}</dd>
                        </div>
                      </dl>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
