"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  /** Stagger offset in seconds. */
  delay?: number;
  /** Vertical travel distance in pixels. */
  y?: number;
  once?: boolean;
};

/**
 * Scroll reveal: slides up and fades in the first time the element enters the
 * viewport. Collapses to a plain fade for users who prefer reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  once = true,
  ...rest
}: RevealProps): JSX.Element {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
