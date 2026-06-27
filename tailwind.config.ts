import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07111f",
        cream: "#fff7ed",
        ember: "#ff6b35",
        gold: "#f5c542",
        sage: "#d9f99d",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(255, 107, 53, 0.18)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
