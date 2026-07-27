import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        burgundy: {
          DEFAULT: "#6A0F24",
          50: "#FBF0F2",
          100: "#F5D9DE",
          200: "#E7A9B4",
          300: "#D6788A",
          400: "#B84158",
          500: "#8E1B34",
          600: "#6A0F24",
          700: "#560B1D",
          800: "#420814",
          900: "#2C050D",
        },
        gold: {
          DEFAULT: "#C9A25D",
          50: "#FBF7EF",
          100: "#F4E9D2",
          200: "#E8D3A7",
          300: "#DBBC7C",
          400: "#C9A25D",
          500: "#B98A3E",
          600: "#9A7132",
          700: "#785827",
          800: "#57401C",
          900: "#3A2B13",
        },
        charcoal: {
          DEFAULT: "#1A1A1D",
          50: "#F5F5F6",
          100: "#E6E6E8",
          200: "#C4C4C8",
          300: "#9B9BA1",
          400: "#6E6E75",
          500: "#4A4A50",
          600: "#33333A",
          700: "#26262B",
          800: "#1A1A1D",
          900: "#0E0E10",
        },
        neutralbg: "#F8F6F2",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        arabic: ["var(--font-cairo)", "Tahoma", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(26, 26, 29, 0.15)",
        card: "0 4px 24px -8px rgba(26, 26, 29, 0.12)",
        gold: "0 12px 40px -12px rgba(201, 162, 93, 0.35)",
      },
      backgroundImage: {
        "gradient-burgundy":
          "linear-gradient(135deg, #6A0F24 0%, #420814 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #DBBC7C 0%, #C9A25D 50%, #B98A3E 100%)",
        "hero-radial":
          "radial-gradient(120% 120% at 80% 0%, rgba(201,162,93,0.18) 0%, rgba(106,15,36,0) 45%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        marquee: "marquee 32s linear infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
