/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070b14",
        panel: "#0f1726",
        border: "#1f2a3d",
        brand: "#7c9cff",
        accent: "#3dd9b7",
        paper: "#f6f8fc"
      },
      boxShadow: {
        glow: "0 20px 50px rgba(124, 156, 255, 0.18)",
        soft: "0 16px 40px rgba(15, 23, 38, 0.08)"
      },
      fontFamily: {
        display: ["Sora", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "grid-light": "linear-gradient(rgba(15,23,38,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,38,0.05) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
