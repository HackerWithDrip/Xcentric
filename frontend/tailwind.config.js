/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#F3C740",
        yellowBrand: "#FFC400",
        purpleBrand: "#A64CE6",
        tealBrand: "#2AA39A",
        navy: "#0C1A2B",
        night: "#0a1220"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "Liberation Sans", "sans-serif"]
      },
      backgroundImage: {
        "gradient-xcentric": "linear-gradient(135deg, #0C1A2B 0%, #11263f 50%, #0a1220 100%)"
      }
    }
  },
  plugins: []
}


