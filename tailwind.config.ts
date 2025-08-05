import { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        leftHex:
          "-8px -8px 10px -6px rgba(0,0,0,0.15), -8px 8px 10px -6px rgba(0,0,0,0.15)",
      },
      fontSize: {
        body: ["18px", { lineHeight: "100%" }],
        heading: ["20px", { lineHeight: "100%" }],
        label: ["14px", { lineHeight: "20px" }],
        large: ["30px", { lineHeight: "100%" }],
      },
      fontWeight: {
        light: "400",
        medium: "500",
        semibold: "800",
      },

      colors: {
        light: "#F8F8FB",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        lightblue: "#78B3F6",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#60a534",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#e7ecef",
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
          DEFAULT: "#516F91",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
