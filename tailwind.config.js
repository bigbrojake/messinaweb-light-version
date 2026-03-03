/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A348A',
        accent: '#1EC4F7',
        background: '#FFFFFF',
        surface: '#F8FAFC',
        textDark: '#18181B',
      },
      fontFamily: {
        heading: ['"Inter"', 'sans-serif'],
        body: ['"Open Sans"', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '3rem': '3rem',
      },
      transitionTimingFunction: {
        'magnetic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
