/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Geist",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: [
          "Geist Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      keyframes: {
        pulseKey: {
          "0%": { transform: "scale(1)", boxShadow: "0 0 0 0 var(--accent-soft)" },
          "70%": { transform: "scale(1.06)", boxShadow: "0 0 0 12px transparent" },
          "100%": { transform: "scale(1)", boxShadow: "0 0 0 0 transparent" },
        },
        recDot: {
          "0%, 100%": { boxShadow: "0 0 0 0 var(--accent-soft)" },
          "50%": { boxShadow: "0 0 0 6px transparent" },
        },
        fadein: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        pop: {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        pulseKey: "pulseKey 0.5s ease-out",
        recDot: "recDot 1.6s ease-in-out infinite",
        fadein: "fadein 0.18s ease",
        pop: "pop 0.18s ease",
      },
    },
  },
  plugins: [],
};
