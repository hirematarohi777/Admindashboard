/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#3B82F6',
          light: '#60A5FA',
        },
        secondary: {
          DEFAULT: '#16A34A',
          dark: '#22C55E',
          light: '#4ADE80',
        },
        danger: {
          DEFAULT: '#DC2626',
          dark: '#EF4444',
          light: '#F87171',
        },
        warning: {
          DEFAULT: '#F59E0B',
          dark: '#FBBF24',
          light: '#FDE047',
        },
        govdark: {
          bg: '#020617',
          card: '#0F172A',
          border: '#1E293B',
          text: '#F8FAFC',
          muted: '#94A3B8',
        },
        govlight: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          text: '#0F172A',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-primary': '0 0 15px rgba(37, 99, 235, 0.5)',
        'glow-danger': '0 0 15px rgba(220, 38, 38, 0.5)',
        'glow-secondary': '0 0 15px rgba(22, 163, 74, 0.5)',
      }
    },
  },
  plugins: [],
}
