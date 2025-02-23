import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        grey: {
          900: "#252527",
          500: "#808080",
          200: "#F1F1F1",
          100: "#F3F3F3",
          50: "#FAFAFA",
        },
        red: "#FF3A51",
        green: "#008000",
      },
    },
  },
  plugins: [],
} satisfies Config;
