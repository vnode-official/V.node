# THE HIL — Drop 01

K-Stealth luxury e-commerce landing page. Matte obsidian, crisp white, and one Deep Crimson
ㅅㅇㄹ seal per piece.

## Stack

- **Next.js 14** (App Router) + **TypeScript** (strict)
- **Tailwind CSS** 3.4
- **Framer Motion** 11 for entrances, scroll reveals, drawer / modal transitions
- **Lucide React** for the few icons used
- **Geist Sans / Geist Mono**, self-hosted via the `geist` package (no build-time font fetch)

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build (fully static)
npm run start        # serve the production build
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
```

## Structure

```
app/
  layout.tsx                 Fonts, metadata, viewport
  page.tsx                   Composes the sections inside <StoreProvider>
  globals.css                Base layer, hairline / metallic utilities, reduced-motion guard
  icon.svg                   Favicon (ㅅㅇㄹ on obsidian)
components/
  brand/HangulMark.tsx       Geometric SVG of the ㅅㅇㄹ seal (solid + outline variants)
  product/ProductVisual.tsx  Vector product silhouettes with the seal placed per colourway
  sections/                  Nav, Hero, Manifesto, ProductGrid, Seal, Drop, Footer
  store/StoreProvider.tsx    Drawer / pre-order state; mounts both overlays once
  store/ProductDrawer.tsx    Side drawer: Look / Seal / Material views, colour + size, callouts
  store/PreOrderModal.tsx    Pre-order form with validation and a held-reservation state
  ui/Reveal.tsx              opacity 0 / y 30 -> opacity 1 / y 0 on enter, once
  ui/MetallicButton.tsx      RESERVE DROP 01: brushed-metal border, rising fill, glow
  ui/Overlay.tsx             Shared dialog shell: Escape, backdrop, scroll lock, focus
lib/
  products.ts                Catalogue, colourways, seal treatment and placement data
legacy/                      Unrelated earlier HTML prototypes, kept for reference
```

## Design system

| Token | Value | Usage |
| --- | --- | --- |
| `obsidian` | `#0B0B0C` | Page background, black garments |
| `obsidian-raised` | `#111113` | Product visual backplates |
| white | `#FFFFFF` | Type, white tee, tea box |
| `crimson` | `#800016` | **Only** the seal, index numerals and tiny brand tags |
| `navy` | `#0B132B` | **Only** the Navy blouson / windbreaker and the Deep Navy cap |
| `border-neutral-800` | | Every hairline |

### Seal treatments

All of these live in `lib/products.ts` and drive `ProductVisual`, the drawer callouts and the
pre-order thumbnail:

| Piece | Placement | Black | Navy / White |
| --- | --- | --- | --- |
| Blouson · Windbreaker · Coat | Outer back neck (목 뒤쪽 바깥쪽) | Deep Crimson embroidery | Deep Crimson embroidery |
| Consonant Cap | Front centre panel | Deep Crimson fill stitch | Midnight Blue outline (Deep Navy) |
| Seal Tee · Short / Long | Sleeve hem / cuff | White micro print | Deep Crimson micro print (White) |
| Monami 6-Pack · Black Steel | Barrel, below the clip | Deep Crimson laser etch | — |
| Premium Tea Bag Set | Lid, centre | Blind emboss + crimson tag | Blind emboss + crimson tag |

Motion uses a single `cubic-bezier(0.16, 1, 0.3, 1)` curve throughout and is reduced to fades
under `prefers-reduced-motion`.

## Notes

- The pre-order form has no backend yet: submission is simulated client-side and produces a
  reference of the form `HIL-01-XXXX`. Wire `PreOrderModal.onSubmit` to a real endpoint before
  launch.
- Prices and the drop window are placeholder copy in `lib/products.ts`.
