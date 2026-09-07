import { HangulMark } from "@/components/brand/HangulMark";

const COLUMNS = [
  {
    title: "House",
    links: ["Stance", "Atelier", "Stockists", "Press"],
  },
  {
    title: "Client",
    links: ["Reservations", "Shipping", "Returns", "Care"],
  },
  {
    title: "Follow",
    links: ["Instagram", "Threads", "Newsletter"],
  },
] as const;

export function Footer(): JSX.Element {
  return (
    <footer className="border-t border-neutral-800">
      <div className="mx-auto max-w-shell px-6 py-16 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <HangulMark className="h-4 w-12 text-white" />
            <p className="mt-6 text-2xl font-medium tracking-tightest text-white">THE HIL</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
              K-Stealth luxury from Seoul. Obsidian, white, and one crimson seal.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <p className="font-mono text-[10px] uppercase tracking-editorial text-white/40">{column.title}</p>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="text-sm text-white/65 transition-colors duration-300 hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-neutral-800 pt-6 font-mono text-[10px] uppercase tracking-editorial text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 THE HIL. All rights reserved.</p>
          <p>
            Seoul <span className="mx-3 text-white/15">/</span> 서울{" "}
            <span className="mx-3 text-white/15">/</span>
            <span className="text-crimson-soft">ㅅㅇㄹ</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
