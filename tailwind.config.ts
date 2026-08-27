import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#050505",
          raised: "#0A0A0B",
          line: "#141416",
        },
        yield: {
          DEFAULT: "#00FF66",
          dim: "#00B348",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        shell: "76rem",
      },
      boxShadow: {
        glass: "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 40px 120px -40px rgba(0,0,0,0.9)",
        lift: "0 40px 120px -32px rgba(0,0,0,0.85)",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.86)" },
        },
        "sweep": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        sweep: "sweep 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
