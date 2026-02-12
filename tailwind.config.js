module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        accentRed: "#9C2B2E"
      },
      spacing: {
        125: "31.25rem",
        90: "22.5rem"
      }
    }
  },
  plugins: []
}