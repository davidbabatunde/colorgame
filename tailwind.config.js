/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        myRed: "#ef4444",
        myBlue: "#3b82f6",
        myPurple: "#a855f7",
        myOrange: "#f97316",
        myYellow: "#eab308",
        myGreen: "#22c55e",
      },
    },
  },
  plugins: [],
};
