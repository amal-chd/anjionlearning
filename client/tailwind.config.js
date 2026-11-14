/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        anjion: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#146fe6', // Primary Brand Blue
          700: '#0f52ba',
          800: '#1e3a8a',
          900: '#0b1a30', // Deep Navy
          950: '#07101e',
        },
        ink: {
          DEFAULT: '#0f172a',
          muted: '#475569',
          light: '#64748b',
          border: '#e2e8f0',
          paper: '#f8fafc',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        'xl': '14px',
        '2xl': '20px',
        '3xl': '28px',
      },
      boxShadow: {
        'card': '0 10px 30px -5px rgba(11, 26, 48, 0.06), 0 4px 10px -2px rgba(11, 26, 48, 0.03)',
        'card-hover': '0 20px 40px -10px rgba(20, 111, 230, 0.12), 0 8px 16px -4px rgba(11, 26, 48, 0.05)',
        'pass': '0 25px 60px -15px rgba(15, 82, 186, 0.25), 0 10px 25px -5px rgba(11, 26, 48, 0.1)',
        'btn': '0 4px 14px 0 rgba(20, 111, 230, 0.35)',
      }
    },
  },
  plugins: [],
}
