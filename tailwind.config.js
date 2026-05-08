/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      keyframes: {
        pulseKey: {
          "0%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(99,102,241,0.6)" },
          "70%": { transform: "scale(1.06)", boxShadow: "0 0 0 12px rgba(99,102,241,0)" },
          "100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(99,102,241,0)" },
        },
      },
      animation: {
        pulseKey: "pulseKey 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
