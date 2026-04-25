/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        emergency: { DEFAULT: '#dc2626', light: '#fca5a5', dark: '#991b1b' },
        safe: { DEFAULT: '#16a34a', light: '#86efac', dark: '#15803d' },
        warning: { DEFAULT: '#d97706', light: '#fcd34d', dark: '#b45309' },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}

