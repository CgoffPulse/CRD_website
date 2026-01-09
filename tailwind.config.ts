import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Southern Leather Brown Palette
        leather: {
          900: "#2C1810", // Deep chocolate brown
          800: "#3D2417",
          700: "#4E2F1E", // Rich leather brown
          600: "#6B3410", // Dark saddle
          500: "#8B4513", // Saddle brown (primary)
          400: "#A0522D", // Lighter saddle
          300: "#BC8F8F",
          200: "#D2B48C", // Tan
          100: "#E8D5C4", // Light tan
          50: "#F5E6D3", // Cream
        },
        cream: {
          50: "#FAF7F2", // Warm off-white
          100: "#F5F0E8",
          200: "#F1E9DC",
          300: "#E8DCC8",
          400: "#D9C9AD",
        },
        accent: {
          rust: "#A0522D", // Rust/terracotta accent
          gold: "#D4A574", // Warm gold
          sage: "#8B9E7D", // Muted sage green
        },
        navy: {
          900: "#1a2332", // Deep navy for nav bar
          800: "#243447",
          700: "#2d405c",
        },
        brand: {
          black: "#000000",
          red: {
            DEFAULT: "#DC2626", // Primary red accent from logo
            900: "#991B1B",
            800: "#B91C1C",
            700: "#DC2626",
            600: "#EF4444",
            500: "#F87171",
            400: "#FCA5A5",
            300: "#FECACA",
            200: "#FEE2E2",
            100: "#FEF2F2",
          },
          gray: {
            900: "#0a0a0a",
            800: "#1a1a1a",
            700: "#2a2a2a",
            600: "#3a3a3a",
            500: "#5a5a5a",
            400: "#7a7a7a",
            300: "#9a9a9a",
            200: "#bababa",
            100: "#dadada",
          },
        },
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"], // For vintage sign style headers
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.5rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      letterSpacing: {
        'wider-xl': '0.15em',
      },
    },
  },
  plugins: [],
};
export default config;

