/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-main": "#050816",
        "bg-elevated": "#0b1020",
        "accent": "#4f46e5",
        "accent-soft": "#818cf8",
      },
      boxShadow: {
        "soft-glow": "0 10px 40px rgba(80, 99, 255, 0.35)",
      },
    },
  },
}
