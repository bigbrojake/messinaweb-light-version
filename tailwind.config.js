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
        dark: '#050d1a',
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
      boxShadow: {
        'brand':      '0 2px 20px rgba(10,52,138,0.10), 0 0 10px rgba(30,196,247,0.08), 0 0 0 1px rgba(10,52,138,0.05)',
        'brand-md':   '0 6px 32px rgba(10,52,138,0.14), 0 2px 14px rgba(30,196,247,0.15), 0 0 0 1px rgba(10,52,138,0.06)',
        'brand-lg':   '0 12px 56px rgba(10,52,138,0.18), 0 4px 22px rgba(30,196,247,0.22), 0 0 48px rgba(30,196,247,0.10), 0 0 0 1px rgba(10,52,138,0.08)',
        'brand-glow': '0 0 0 1px rgba(30,196,247,0.28), 0 8px 48px rgba(10,52,138,0.22), 0 0 44px rgba(30,196,247,0.32), 0 0 88px rgba(30,196,247,0.12)',
      },
    },
  },
  plugins: [],
}
