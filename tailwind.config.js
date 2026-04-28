/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lime: "#C3F74A",
        limeDark: "#A0D030",
        void: "#0E0E0E",
        surface: "#1C1C1C",
        surface2: "#111111",
        border: "#2A2A2A",
        muted: "#888888",
        red: "#FF4D4D",
        dataBlue: "#6A9BCC",
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        lime: "0 0 0 1px rgba(195, 247, 74, 0.2), 0 18px 60px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};
