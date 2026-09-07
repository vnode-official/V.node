import { Reveal } from "@/components/ui/Reveal";

const PRINCIPLES = [
  {
    index: "01",
    title: "Nothing on the front",
    body: "No wordmark, no chest print, no hardware branding. The silhouette and the fabric carry the piece.",
  },
  {
    index: "02",
    title: "One seal, placed with intent",
    body: "ㅅㅇㄹ appears exactly once per piece, small, where it is found rather than shown.",
  },
  {
    index: "03",
    title: "Two colours, one accent",
    body: "Matte obsidian and crisp white. Deep crimson is spent only on the seal and a handful of tags.",
  },
] as const;

export function Manifesto(): JSX.Element {
  return (
    <section className="relative border-t border-neutral-800">
      <div className="mx-auto max-w-shell px-6 py-24 sm:px-10 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-editorial text-white/50">Stance</p>
            <h2 className="mt-6 text-3xl font-medium leading-[1.05] tracking-tightest text-white sm:text-5xl">
              Luxury that does not announce itself.
            </h2>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-white/65 sm:text-xl">
                THE HIL is built for people who are done being a billboard. Every piece in Drop 01 is
                finished to be read from the back of the room, by the one person who knows what they are
                looking at.
              </p>
            </Reveal>

            <ul className="mt-14 divide-y divide-neutral-800 border-y border-neutral-800">
              {PRINCIPLES.map((principle, index) => (
                <li key={principle.index}>
                  <Reveal
                    delay={0.08 * index}
                    y={24}
                    className="grid grid-cols-[3rem_1fr] gap-6 py-7 sm:grid-cols-[4rem_1fr]"
                  >
                    <span className="pt-1 font-mono text-[10px] text-crimson-soft">{principle.index}</span>
                    <div>
                      <h3 className="text-base font-medium text-white sm:text-lg">{principle.title}</h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">{principle.body}</p>
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
