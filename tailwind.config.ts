import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      fontSize: {
        "h1-display": [
          "3.5rem",
          {
            lineHeight: "4rem",
            letterSpacing: "-1.2%",
            fontWeight: "600",
          },
        ],
        h1: [
          "3rem",
          {
            lineHeight: "3.5rem",
            letterSpacing: "-1.2%",
            fontWeight: "600",
          },
        ],
        h2: [
          "2.5rem",
          {
            lineHeight: "3rem",
            letterSpacing: "-2%",
            fontWeight: "600",
          },
        ],
        h3: [
          "2rem",
          {
            lineHeight: "2.5rem",
            letterSpacing: "-1.4%",
            fontWeight: "500",
          },
        ],
        h4: [
          "1.5rem",
          {
            lineHeight: "2rem",
            letterSpacing: "-1.4%",
            fontWeight: "500",
          },
        ],
        h5: [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        "lead-1": "1.25rem",
      },
      colors: {
        primary: {
          lighter: "#EEEFF5",
          light: "#525F9B",
          DEFAULT: "#273782",
          dark: "#1F2C68",
          darker: "#192353",
          100: "#EEEFF5",
          200: "#DCDFEB",
          300: "#B9BFD7",
          400: "#989FC3",
          500: "#7680AF",
          600: "#53609B",
          700: "#273782",
          800: "#1F2C68",
          900: "#1F2C68",
        },
        success: {
          lighter: "#E1F6DF",
          light: "#40A42B",
          DEFAULT: "#217B00",
          dark: "#166000",
          darker: "#0E4700",
        },
        danger: {
          lighter: "#FEECED",
          light: "#F75B60",
          DEFAULT: "#D01E29",
          dark: "#A4151E",
          darker: "#790C14",
        },
      },
      boxShadow: {
        focus: `0 0 0 1px white, 0 0 0 3px #273782`,
        "custom-1": "0px 8px 40px 0px rgba(0, 0, 0, 4%)",
        "custom-2": "0px 8px 24px 0px rgba(0, 0, 0, 16%)",
      },
      backgroundImage: {
        page: "linear-gradient(rgba(217, 217, 217, 0%) 0%, rgba(217, 217, 217, 14%) 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
