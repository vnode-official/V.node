"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type MetallicButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  size?: "md" | "lg";
};

/**
 * One-pixel brushed-metal border with a white fill that rises on hover and a
 * soft outer glow. Everything is CSS so it stays smooth under heavy scroll.
 */
export function MetallicButton({
  children,
  size = "md",
  className = "",
  ...rest
}: MetallicButtonProps): JSX.Element {
  const padding = size === "lg" ? "px-10 py-5 text-[13px]" : "px-7 py-3.5 text-[11px]";

  return (
    <button
      type="button"
      className={`metal-border group relative inline-flex p-px transition-[--metal-angle,box-shadow,transform] duration-700 ease-editorial hover:[--metal-angle:380deg] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0_48px_-8px_rgba(255,255,255,0.35)] active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...rest}
    >
      <span
        className={`relative isolate flex w-full items-center justify-center gap-3 overflow-hidden bg-obsidian font-mono uppercase tracking-editorial text-white transition-colors duration-500 ease-editorial group-hover:text-obsidian ${padding}`}
      >
        <span
          aria-hidden
          className="absolute inset-0 -z-10 translate-y-full bg-white transition-transform duration-500 ease-editorial group-hover:translate-y-0"
        />
        {children}
      </span>
    </button>
  );
}
