import type { Config } from "tailwindcss";

/**
 * Professional light-green wellness UI
 * — page: soft mint, surfaces: white, text: deep forest-slate, CTAs: clinical green
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4faf7",
          100: "#eef7f1",
          200: "#d8ece0",
          300: "#b0d8c2",
          400: "#7fc49a",
          500: "#2f8f56",
          600: "#2a3d32",
          700: "#236b45",
          800: "#1e3229",
          900: "#121c17",
        },
        accent: {
          DEFAULT: "#1f7a4d",
          hover: "#196341",
          muted: "#e8f5ee",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
      },
      fontSize: {
        /* MindBridge / editorial wordmark — poster-scale Didone sizing */
        "display-sm": ["3.25rem", { lineHeight: "1.12", letterSpacing: "-0.03em" }],
        "display-md": ["4.25rem", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
      },
      boxShadow: {
        card: "none",
        nav: "none",
      },
      letterSpacing: {
        cocina: "0.18em",
        wide: "0.08em",
      },
    },
  },
  plugins: [],
};

export default config;
