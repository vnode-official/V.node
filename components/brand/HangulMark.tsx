import type { SVGProps } from "react";

export const MARK_VIEWBOX_WIDTH = 120;
export const MARK_VIEWBOX_HEIGHT = 40;

type MarkStyle = "solid" | "outline";

type HangulMarkPathsProps = {
  color?: string;
  weight?: number;
  variant?: MarkStyle;
};

/**
 * Bare strokes for the ㅅㅇㄹ seal in a 120 × 40 coordinate space, so the mark
 * can be dropped inside larger SVG scenes (product visuals) with a transform.
 */
export function HangulMarkPaths({
  color = "currentColor",
  weight,
  variant = "solid",
}: HangulMarkPathsProps): JSX.Element {
  const strokeWidth = weight ?? (variant === "outline" ? 2.2 : 3.4);

  return (
    <g fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter">
      {/* ㅅ */}
      <path d="M6 34 L20 6 L34 34" />
      {/* ㅇ */}
      <circle cx="60" cy="20" r="14" />
      {/* ㄹ */}
      <path d="M86 6 H114 V20 H86 V34 H114" />
    </g>
  );
}

type HangulMarkProps = Omit<SVGProps<SVGSVGElement>, "stroke" | "strokeWidth" | "color"> &
  HangulMarkPathsProps & {
    title?: string;
  };

/**
 * The ㅅㅇㄹ consonant seal, drawn geometrically so it renders identically on
 * every platform regardless of installed Hangul fonts.
 */
export function HangulMark({
  color,
  weight,
  variant,
  title = "ㅅㅇㄹ — THE HIL",
  ...rest
}: HangulMarkProps): JSX.Element {
  return (
    <svg
      viewBox={`0 0 ${MARK_VIEWBOX_WIDTH} ${MARK_VIEWBOX_HEIGHT}`}
      role="img"
      aria-label={title}
      {...rest}
    >
      <title>{title}</title>
      <HangulMarkPaths color={color} weight={weight} variant={variant} />
    </svg>
  );
}
