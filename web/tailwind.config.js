/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode based on a class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Add Inter to sans-serif stack
      },
      colors: {
        primary: '#6366F1', // Indigo 500
        secondary: '#A855F7', // Purple 500
        accent1: '#06B6D4', // Cyan 500
        accent2: '#F43F5E', // Rose 500
        dark: {
          DEFAULT: '#1F2937', // Gray 800
          light: '#374151', // Gray 700
          lighter: '#4B5563', // Gray 600
        },
        light: {
          DEFAULT: '#F3F4F6', // Gray 100
          dark: '#E5E7EB', // Gray 200
          darker: '#D1D5DB', // Gray 300
        },
      },
    },
  },
  plugins: [],
}