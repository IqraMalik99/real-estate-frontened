/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'baloo': ['Baloo Bhaijaan 2', 'sans-serif']
      },
      fontWeight: {
        // Add custom font weights if needed
        'custom': [400, 800] // Example: custom weight
      }
    },
  plugins: [],
}
}
