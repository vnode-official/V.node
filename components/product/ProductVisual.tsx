"use client";

import { useId } from "react";

import { HangulMarkPaths } from "@/components/brand/HangulMark";
import type { Colorway, ProductShape } from "@/lib/products";

export const VISUAL_WIDTH = 400;
export const VISUAL_HEIGHT = 500;

type ProductVisualProps = {
  shape: ProductShape;
  colorway: Colorway;
  className?: string;
};

function isLight(hex: string): boolean {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.6;
}

type Palette = Readonly<{
  fill: string;
  edge: string;
  seam: string;
  rib: string;
  emboss: string;
}>;

function paletteFor(hex: string): Palette {
  if (isLight(hex)) {
    return {
      fill: hex,
      edge: "rgba(0,0,0,0.16)",
      seam: "rgba(0,0,0,0.10)",
      rib: "rgba(0,0,0,0.06)",
      emboss: "rgba(0,0,0,0.14)",
    };
  }
  return {
    fill: hex,
    edge: "rgba(255,255,255,0.18)",
    seam: "rgba(255,255,255,0.09)",
    rib: "rgba(255,255,255,0.05)",
    emboss: "rgba(255,255,255,0.13)",
  };
}

type SealProps = {
  cx: number;
  cy: number;
  width: number;
  rotate?: number;
  colorway: Colorway;
  /** Override the stroke colour (used for blind embossing). */
  color?: string;
};

/** Drops the ㅅㅇㄹ seal into the scene centred at (cx, cy). */
function Seal({ cx, cy, width, rotate = 0, colorway, color }: SealProps): JSX.Element {
  const scale = width / 120;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${scale}) translate(-60 -20)`}>
      <HangulMarkPaths
        color={color ?? colorway.markHex}
        variant={colorway.markStyle}
        weight={colorway.markStyle === "outline" ? 3 : 4.2}
      />
    </g>
  );
}

type Scene = Readonly<{
  /** Filled garment / object panels; rendered with body colour then a sheen. */
  panels: readonly string[];
  /** Stitch lines and rib zones drawn on top of the panels. */
  seams?: readonly string[];
  ribs?: readonly string[];
  seal: (colorway: Colorway, palette: Palette) => JSX.Element;
}>;

function backNeckSeal(cy: number): Scene["seal"] {
  return function BackNeckSeal(colorway) {
    return <Seal cx={200} cy={cy} width={26} colorway={colorway} />;
  };
}

const SCENES: Record<ProductShape, Scene> = {
  blouson: {
    panels: [
      /* torso */
      "M122 132 H278 Q292 132 293 146 L300 372 Q300 386 286 386 H114 Q100 386 100 372 L107 146 Q108 132 122 132 Z",
      /* sleeves */
      "M120 134 L58 156 L38 320 Q36 330 46 332 L92 340 L108 205 Z",
      "M280 134 L342 156 L362 320 Q364 330 354 332 L308 340 L292 205 Z",
      /* collar */
      "M160 112 H240 Q248 112 248 120 V132 H152 V120 Q152 112 160 112 Z",
    ],
    ribs: [
      "M100 372 L300 372 L300 386 L100 386 Z",
      "M38 322 L92 332 L92 340 L46 332 Z",
      "M362 322 L308 332 L308 340 L354 332 Z",
    ],
    seams: ["M152 132 H248", "M108 205 L280 205", "M200 132 V372"],
    seal: backNeckSeal(152),
  },
  windbreaker: {
    panels: [
      "M118 138 H282 Q296 138 297 152 L304 396 Q304 410 290 410 H110 Q96 410 96 396 L103 152 Q104 138 118 138 Z",
      "M116 140 L54 164 L34 336 Q32 346 42 348 L90 356 L104 214 Z",
      "M284 140 L346 164 L366 336 Q368 346 358 348 L310 356 L296 214 Z",
      /* hood */
      "M148 140 Q152 66 200 60 Q248 66 252 140 Z",
    ],
    seams: ["M148 140 H252", "M200 66 V138", "M104 214 L296 214", "M96 388 H304"],
    seal: backNeckSeal(158),
  },
  coat: {
    panels: [
      "M118 124 H282 Q296 124 297 138 L312 462 Q312 476 298 476 H102 Q88 476 88 462 L103 138 Q104 124 118 124 Z",
      "M116 126 L56 150 L44 380 Q44 390 54 390 L94 390 L104 190 Z",
      "M284 126 L344 150 L356 380 Q356 390 346 390 L306 390 L296 190 Z",
      /* collar */
      "M150 100 H250 Q258 100 258 108 V124 L246 130 H154 L142 124 V108 Q142 100 150 100 Z",
    ],
    seams: ["M200 130 V476", "M104 190 L296 190", "M142 124 H258"],
    seal: backNeckSeal(146),
  },
  cap: {
    panels: [
      /* crown */
      "M82 262 Q82 122 200 118 Q318 122 318 262 Z",
      /* visor */
      "M62 262 Q200 330 338 262 Q200 250 62 262 Z",
    ],
    seams: [
      "M200 118 V262",
      "M200 118 Q118 160 100 262",
      "M200 118 Q282 160 300 262",
      "M82 262 H318",
      "M76 268 Q200 322 324 268",
    ],
    ribs: ["M194 118 Q200 112 206 118 Q200 124 194 118 Z"],
    seal: (colorway) => <Seal cx={200} cy={205} width={64} colorway={colorway} />,
  },
  "tee-short": {
    panels: [
      "M122 150 H278 L290 424 Q290 430 284 430 H116 Q110 430 110 424 Z",
      "M122 150 L70 176 L86 240 Q88 246 94 244 L120 236 Z",
      "M278 150 L330 176 L314 240 Q312 246 306 244 L280 236 Z",
      /* neck */
      "M166 150 Q200 180 234 150 Q200 166 166 150 Z",
    ],
    seams: ["M120 236 L280 236", "M166 150 Q200 176 234 150", "M110 416 H290"],
    seal: (colorway) => <Seal cx={299} cy={226} width={16} rotate={-20} colorway={colorway} />,
  },
  "tee-long": {
    panels: [
      "M122 150 H278 L290 424 Q290 430 284 430 H116 Q110 430 110 424 Z",
      "M122 150 L66 176 L52 374 Q52 384 62 384 L100 386 L112 232 Z",
      "M278 150 L334 176 L348 374 Q348 384 338 384 L300 386 L288 232 Z",
      "M166 150 Q200 180 234 150 Q200 166 166 150 Z",
    ],
    ribs: ["M52 368 L100 372 L100 386 L62 384 Z", "M348 368 L300 372 L300 386 L338 384 Z"],
    seams: ["M112 232 L288 232", "M166 150 Q200 176 234 150", "M110 416 H290"],
    seal: (colorway) => <Seal cx={324} cy={352} width={16} rotate={-6} colorway={colorway} />,
  },
  pens: {
    panels: [
      /* tray */
      "M72 82 H328 Q334 82 334 88 V412 Q334 418 328 418 H72 Q66 418 66 412 V88 Q66 82 72 82 Z",
      ...Array.from({ length: 6 }, (_, i) => {
        const x = 95 + i * 42;
        return `M${x} 112 H${x + 18} V380 L${x + 9} 402 L${x} 380 Z`;
      }),
    ],
    seams: [
      ...Array.from({ length: 6 }, (_, i) => `M${95 + i * 42 + 13} 118 V170`),
      ...Array.from({ length: 6 }, (_, i) => `M${95 + i * 42} 380 H${95 + i * 42 + 18}`),
    ],
    seal: (colorway) => (
      <>
        {Array.from({ length: 6 }, (_, i) => (
          <Seal key={i} cx={95 + i * 42 + 9} cy={196} width={12} colorway={colorway} />
        ))}
      </>
    ),
  },
  tea: {
    panels: [
      /* lid */
      "M84 124 H316 Q322 124 322 130 V370 Q322 376 316 376 H84 Q78 376 78 370 V130 Q78 124 84 124 Z",
    ],
    seams: ["M96 142 H304 V358 H96 Z"],
    seal: (colorway, palette) => (
      <>
        <Seal cx={200} cy={250} width={90} colorway={colorway} color={palette.emboss} />
        <rect x={310} y={238} width={5} height={24} fill={colorway.markHex} />
      </>
    ),
  },
};

/**
 * Vector product visual. Everything (silhouette, seams, seal placement, seal
 * colour and technique) is derived from the product data so the card, the
 * drawer and the pre-order confirmation always agree.
 */
export function ProductVisual({ shape, colorway, className = "" }: ProductVisualProps): JSX.Element {
  const uid = useId();
  const sheenId = `${uid}-sheen`;
  const scene = SCENES[shape];
  const palette = paletteFor(colorway.hex);

  return (
    <svg
      viewBox={`0 0 ${VISUAL_WIDTH} ${VISUAL_HEIGHT}`}
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={sheenId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity={isLight(colorway.hex) ? 0 : 0.1} />
          <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity={isLight(colorway.hex) ? 0.08 : 0.28} />
        </linearGradient>
      </defs>

      <g fill={palette.fill} stroke={palette.edge} strokeWidth="1">
        {scene.panels.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill={`url(#${sheenId})`} stroke="none">
        {scene.panels.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {scene.ribs ? (
        <g fill={palette.rib} stroke="none">
          {scene.ribs.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      ) : null}
      {scene.seams ? (
        <g fill="none" stroke={palette.seam} strokeWidth="1" strokeDasharray="0">
          {scene.seams.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      ) : null}
      {scene.seal(colorway, palette)}
    </svg>
  );
}
