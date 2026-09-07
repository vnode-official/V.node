/**
 * Catalogue for Drop 01. All visuals are rendered from this data, so the logo
 * treatment (colour, placement, technique) for every colourway lives here and
 * nowhere else.
 */

export type ColorwayId = "black" | "navy" | "white";

export type Colorway = Readonly<{
  id: ColorwayId;
  label: string;
  /** Garment / object body colour. */
  hex: string;
  /** Colour of the ㅅㅇㄹ mark on this colourway. */
  markHex: string;
  /** Outline-only marks (Deep Navy cap) render as a stroke without fill weight. */
  markStyle: "solid" | "outline";
  markLabel: string;
}>;

export type ProductCategory = "Outerwear" | "Headwear" | "Tees" | "Goods";

export type ProductShape =
  | "blouson"
  | "windbreaker"
  | "coat"
  | "cap"
  | "tee-short"
  | "tee-long"
  | "pens"
  | "tea";

export type LogoPlacement = Readonly<{
  /** Two-digit index printed on the callout pin. */
  index: string;
  title: string;
  /** Korean placement note, kept verbatim from the atelier spec. */
  note: string;
  detail: string;
  /** Callout pin position on the product visual as a percentage of the canvas. */
  x: number;
  y: number;
}>;

export type Product = Readonly<{
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  shape: ProductShape;
  price: string;
  description: string;
  material: string;
  colorways: readonly Colorway[];
  sizes: readonly string[];
  placements: readonly LogoPlacement[];
  /** Detail-shot labels shown as the thumbnail strip inside the drawer. */
  shots: readonly string[];
}>;

const OBSIDIAN = "#0B0B0C";
const WHITE = "#FFFFFF";
const CRIMSON = "#800016";
const NAVY = "#0B132B";
const NAVY_LINE = "#2A3A6B";

const BLACK_OUTERWEAR: Colorway = {
  id: "black",
  label: "Black",
  hex: OBSIDIAN,
  markHex: CRIMSON,
  markStyle: "solid",
  markLabel: "Deep Crimson embroidery",
};

const NAVY_OUTERWEAR: Colorway = {
  id: "navy",
  label: "Navy",
  hex: NAVY,
  markHex: CRIMSON,
  markStyle: "solid",
  markLabel: "Deep Crimson embroidery",
};

const BLACK_CAP: Colorway = {
  id: "black",
  label: "Black",
  hex: OBSIDIAN,
  markHex: CRIMSON,
  markStyle: "solid",
  markLabel: "Deep Crimson embroidery",
};

const NAVY_CAP: Colorway = {
  id: "navy",
  label: "Deep Navy",
  hex: NAVY,
  markHex: NAVY_LINE,
  markStyle: "outline",
  markLabel: "Midnight Blue outline stitch",
};

const BLACK_TEE: Colorway = {
  id: "black",
  label: "Black",
  hex: OBSIDIAN,
  markHex: WHITE,
  markStyle: "solid",
  markLabel: "White micro print",
};

const WHITE_TEE: Colorway = {
  id: "white",
  label: "White",
  hex: WHITE,
  markHex: CRIMSON,
  markStyle: "solid",
  markLabel: "Deep Crimson micro print",
};

/* Pin coordinates track the seal position inside ProductVisual (400 × 500 canvas). */
const backNeck = (y: number): LogoPlacement => ({
  index: "01",
  title: "Outer back neck",
  note: "목 뒤쪽 바깥쪽",
  detail: "12 mm ㅅㅇㄹ, single-needle embroidery in Deep Crimson. Invisible from the front.",
  x: 50,
  y,
});

const SLEEVE_HEM: LogoPlacement = {
  index: "01",
  title: "Sleeve hem",
  note: "소매 끝단",
  detail: "6 mm micro ㅅㅇㄹ, water-based print set 8 mm above the cuff seam.",
  x: 74.75,
  y: 45.2,
};

export const PRODUCTS: readonly Product[] = [
  {
    id: "blouson",
    sku: "HIL-01-OW-001",
    name: "Stealth Blouson",
    category: "Outerwear",
    shape: "blouson",
    price: "₩ 690,000",
    description:
      "A cropped, matte-shell blouson cut with a dropped shoulder and hidden two-way zip. The only mark is on the back of the neck.",
    material: "Bonded matte nylon · Japanese YKK Excella zip · Rib-knit collar",
    colorways: [BLACK_OUTERWEAR, NAVY_OUTERWEAR],
    sizes: ["1", "2", "3", "4"],
    placements: [backNeck(30.4)],
    shots: ["Back neck", "Zip garage", "Cuff rib", "Interior tag"],
  },
  {
    id: "windbreaker",
    sku: "HIL-01-OW-002",
    name: "Zero Windbreaker",
    category: "Outerwear",
    shape: "windbreaker",
    price: "₩ 540,000",
    description:
      "Featherweight, fully seam-sealed and packable into its own hood. Silent fabric, no exterior branding except the seal at the neck.",
    material: "3-layer ripstop · Laminated seams · Magnetic storm flap",
    colorways: [BLACK_OUTERWEAR, NAVY_OUTERWEAR],
    sizes: ["1", "2", "3", "4"],
    placements: [backNeck(31.6)],
    shots: ["Back neck", "Hood profile", "Seam tape", "Pack pocket"],
  },
  {
    id: "coat",
    sku: "HIL-01-OW-003",
    name: "Obsidian Coat",
    category: "Outerwear",
    shape: "coat",
    price: "₩ 1,280,000",
    description:
      "A straight, knee-length coat in double-faced wool. Hidden placket, no visible buttons, one crimson seal where the collar meets the spine.",
    material: "Double-faced Italian wool · Bemberg cupro lining · Horn buttons",
    colorways: [BLACK_OUTERWEAR],
    sizes: ["1", "2", "3", "4"],
    placements: [backNeck(29.2)],
    shots: ["Back neck", "Hidden placket", "Shoulder line", "Hem finish"],
  },
  {
    id: "cap",
    sku: "HIL-01-HW-001",
    name: "Consonant Cap",
    category: "Headwear",
    shape: "cap",
    price: "₩ 180,000",
    description:
      "Six-panel, unstructured, with a matte brass slider. Black carries the Deep Crimson seal; Deep Navy carries a tonal outline in Midnight Blue.",
    material: "Brushed cotton twill · Matte brass hardware · Unstructured crown",
    colorways: [BLACK_CAP, NAVY_CAP],
    sizes: ["One size"],
    placements: [
      {
        index: "01",
        title: "Front centre panel",
        note: "앞면 중앙",
        detail:
          "18 mm ㅅㅇㄹ. Black: Deep Crimson fill stitch. Deep Navy: Midnight Blue outline stitch, tone on tone.",
        x: 50,
        y: 44.4,
      },
    ],
    shots: ["Front panel", "Crown seam", "Brass slider", "Sweatband"],
  },
  {
    id: "tee-short",
    sku: "HIL-01-TE-001",
    name: "Seal Tee · Short Sleeve",
    category: "Tees",
    shape: "tee-short",
    price: "₩ 120,000",
    description:
      "A heavyweight, boxy tee with a clean chest. The micro seal sits on the sleeve hem: white on Black, Deep Crimson on White.",
    material: "300 gsm combed cotton · Garment-dyed · Bound neck",
    colorways: [BLACK_TEE, WHITE_TEE],
    sizes: ["1", "2", "3", "4"],
    placements: [SLEEVE_HEM],
    shots: ["Sleeve hem", "Neck binding", "Side seam", "Fabric hand"],
  },
  {
    id: "tee-long",
    sku: "HIL-01-TE-002",
    name: "Seal Tee · Long Sleeve",
    category: "Tees",
    shape: "tee-long",
    price: "₩ 150,000",
    description:
      "The long-sleeve counterpart with a ribbed cuff. The micro seal is placed just above the cuff so it shows when the sleeve is pushed.",
    material: "300 gsm combed cotton · Ribbed cuff · Garment-dyed",
    colorways: [BLACK_TEE, WHITE_TEE],
    sizes: ["1", "2", "3", "4"],
    placements: [
      {
        index: "01",
        title: "Cuff",
        note: "소매 커프",
        detail: "6 mm micro ㅅㅇㄹ, printed 10 mm above the rib. White on Black, Deep Crimson on White.",
        x: 81,
        y: 70.4,
      },
    ],
    shots: ["Cuff", "Neck binding", "Sleeve length", "Fabric hand"],
  },
  {
    id: "monami",
    sku: "HIL-01-GD-001",
    name: "Monami 6-Pack · Black Steel Edition",
    category: "Goods",
    shape: "pens",
    price: "₩ 96,000",
    description:
      "Six Monami 153 ballpoints re-bodied in blackened steel, laser-etched with the seal, boxed in a matte obsidian tray.",
    material: "Blackened stainless steel · Black ink 0.7 mm · Matte board tray",
    colorways: [
      {
        id: "black",
        label: "Black Steel",
        hex: "#151517",
        markHex: CRIMSON,
        markStyle: "solid",
        markLabel: "Deep Crimson laser etch",
      },
    ],
    sizes: ["Set of 6"],
    placements: [
      {
        index: "01",
        title: "Barrel, below the clip",
        note: "클립 하단",
        detail: "4 mm ㅅㅇㄹ laser-etched then filled Deep Crimson. One pen per tray slot.",
        x: 47,
        y: 39.2,
      },
    ],
    shots: ["Barrel etch", "Tray", "Clip", "Ink cartridge"],
  },
  {
    id: "tea",
    sku: "HIL-01-GD-002",
    name: "Premium Tea Bag Set",
    category: "Goods",
    shape: "tea",
    price: "₩ 68,000",
    description:
      "Twelve hand-tied silk sachets, three Korean teas, in a lidded white box. The seal is blind-embossed on the lid with a single crimson tag.",
    material: "Jeju green · Roasted barley · Persimmon leaf · Silk sachets",
    colorways: [
      {
        id: "white",
        label: "White",
        hex: WHITE,
        markHex: CRIMSON,
        markStyle: "solid",
        markLabel: "Blind emboss + crimson tag",
      },
      {
        id: "black",
        label: "Black",
        hex: OBSIDIAN,
        markHex: CRIMSON,
        markStyle: "solid",
        markLabel: "Blind deboss + crimson tag",
      },
    ],
    sizes: ["Box of 12"],
    placements: [
      {
        index: "01",
        title: "Lid, centre",
        note: "상단 뚜껑 중앙",
        detail: "24 mm ㅅㅇㄹ blind-embossed. A 3 mm Deep Crimson thread tag marks the pull side.",
        x: 50,
        y: 50,
      },
    ],
    shots: ["Lid emboss", "Sachet", "Crimson tag", "Interior divider"],
  },
];

export const DROP = {
  name: "DROP 01",
  window: "10.24 — 11.07",
  units: "Limited to 300 units per style",
} as const;

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}
