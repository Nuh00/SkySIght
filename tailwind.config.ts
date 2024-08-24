import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./components/ui/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        accentmain: {
          DEFAULT: "rgba(30,0,255)",
          teal: "rgba(255,72,173)",
          purple: "rgba(140,0,215)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "darkest-purple": "#3D46F2",
        " purple": "#636AF2",
        "light-purple": "#8D92F2",
        "lightest-purple": "#DSD7F2",
        mustard: "#F2AE30",
        black: "#000000",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        one: {
          "0%": { left: "0px", top: "0px" },
          "25%": { left: "-100px", top: "70px" },
          "50%": { left: "20px", top: "150px" },
          "75%": { left: "50px", top: "100px" },
          "100%": { left: "0px", top: "0px" },
        },
        two: {
          "0%": { left: "0px", top: "0px" },
          "25%": { left: "50px", top: "10px" },
          "50%": { left: "10px", top: "150px" },
          "75%": { left: "50px", top: "100px" },
          "100%": { left: "0px", top: "0px" },
        },
        three: {
          "0%": { left: "0px", top: "0px" },
          "25%": { left: "250px", top: "-60px" },
          "50%": { left: "0px", top: "150px" },
          "75%": { left: "50px", top: "100px" },
          "100%": { left: "0px", top: "0px" },

        },
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
        one: "one 10s infinite",
        two: "two 10s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
