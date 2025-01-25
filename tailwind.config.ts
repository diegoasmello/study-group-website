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
      colors: {
        primary: {
          lighter: "#EEEFF5",
          light: "#525F9B",
          DEFAULT: "#273782",
          dark: "#1F2C68",
          darker: "#192353",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
