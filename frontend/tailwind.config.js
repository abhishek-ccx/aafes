/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF0000",
        secondary: "#00FF00",
      },
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"],
      },
      backgroundImage: () => ({
        "custom-gradient":
          "linear-gradient(262deg, rgb(31, 38, 45), rgb(42, 47, 58) 55%, rgb(31, 38, 45))",
      }),
    },
  },
  plugins: [],
};
