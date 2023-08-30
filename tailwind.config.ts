import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Inter"],
        secondary: ["Archivo Black"],
      },
      colors: {
        "light-1": {
          primary: "#007BA7",
          background: "#F5FCFF",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
