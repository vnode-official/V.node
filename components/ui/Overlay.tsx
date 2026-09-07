"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Reference-counted so a drawer and a modal can overlap without fighting. */
let lockCount = 0;
let previousOverflow = "";
let previousPaddingRight = "";

function lockScroll(): () => void {
  if (typeof document === "undefined") return () => undefined;
  if (lockCount === 0) {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    previousOverflow = document.body.style.overflow;
    previousPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
  }
  lockCount += 1;
  return () => {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    }
  };
}

type OverlayProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Drawer slides in from the right; modal scales up from centre. */
  variant: "drawer" | "modal";
  labelledBy: string;
};

/**
 * Accessible overlay shell shared by the product drawer and the pre-order
 * modal: Escape to close, backdrop click to close, body scroll lock, focus
 * moved into the panel on open and restored on close.
 */
export function Overlay({ open, onClose, children, variant, labelledBy }: OverlayProps): JSX.Element {
  return (
    <AnimatePresence>
      {open ? (
        <OverlayPanel onClose={onClose} variant={variant} labelledBy={labelledBy}>
          {children}
        </OverlayPanel>
      ) : null}
    </AnimatePresence>
  );
}

function OverlayPanel({
  onClose,
  children,
  variant,
  labelledBy,
}: Omit<OverlayProps, "open">): JSX.Element {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  /* Runs exactly once per open so focus is not yanked on every re-render. */
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const unlock = lockScroll();
    panelRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlock();
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, []);

  const isDrawer = variant === "drawer";

  const panelMotion = isDrawer
    ? {
        initial: { x: reduceMotion ? 0 : "100%", opacity: reduceMotion ? 0 : 1 },
        animate: { x: 0, opacity: 1 },
        exit: { x: reduceMotion ? 0 : "100%", opacity: reduceMotion ? 0 : 1 },
      }
    : {
        initial: { opacity: 0, y: reduceMotion ? 0 : 24, scale: reduceMotion ? 1 : 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.985 },
      };

  return (
    <div
      className={`fixed inset-0 flex ${isDrawer ? "z-[80] justify-end" : "z-[90] items-end justify-center sm:items-center sm:p-6"}`}
    >
      <motion.button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={
          isDrawer
            ? "relative flex h-full w-full max-w-xl flex-col border-l border-neutral-800 bg-obsidian shadow-drawer outline-none"
            : "relative w-full max-w-lg border border-neutral-800 bg-obsidian shadow-modal outline-none"
        }
        transition={{ duration: 0.6, ease: EASE }}
        {...panelMotion}
      >
        {children}
      </motion.div>
    </div>
  );
}
