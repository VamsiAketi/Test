/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        clintrust: {
          900: "#1E3A8A",
          700: "#2563EB",
          400: "#60A5FA",
        },
      },
    },
  },
  plugins: [],
}

