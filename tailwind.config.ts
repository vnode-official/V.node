import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0B0B0C",
          raised: "#111113",
        },
        crimson: {
          DEFAULT: "#800016",
          soft: "#A3142E",
        },
        navy: {
          DEFAULT: "#0B132B",
          line: "#2A3A6B",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "ui-sans-serif",
          "system-ui",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Malgun Gothic",
          "sans-serif",
        ],
        mono: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.05em",
        editorial: "0.28em",
      },
      maxWidth: {
        shell: "88rem",
      },
      boxShadow: {
        drawer: "-40px 0 120px -40px rgba(0,0,0,0.9)",
        modal: "0 60px 160px -40px rgba(0,0,0,0.95)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
