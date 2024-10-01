import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    colors:{
      DarkPurple:"#1C0430",
      LightPurple:"rgba(28, 4, 48, 0.4)",
      Purple50:"#faf5ff",
      Purple100:"#f3e8ff",
      Purple200:"#e9d5ff",
      Purple300:"#d8b4fe",
      Purple600:"#9333ea",
      Purple700:"#7e22ce",
      Red700:"#b91c1c",
      Gray400:"#9ca3af",
      Dark:"#030712",
      white:"rgb(255,255,255)",
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },    
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography"), require('daisyui'),],
} satisfies Config

export default config