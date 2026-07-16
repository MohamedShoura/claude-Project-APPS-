import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Premium Gulf e-commerce palette
        ink: {
          DEFAULT: '#0f1b2d', // dark navy text
          soft: '#334155',
          muted: '#64748b',
        },
        hot: {
          DEFAULT: '#e6392b', // bright red for hot deals
          dark: '#c22a1e',
          soft: '#fff1f0',
        },
        flame: '#f97316', // orange accent
        verified: {
          DEFAULT: '#16a34a', // green for verified savings
          soft: '#ecfdf5',
        },
        gold: {
          DEFAULT: '#c9a227', // premium gold accent
          soft: '#fbf6e6',
        },
        surface: {
          DEFAULT: '#ffffff',
          soft: '#f7f8fa',
          border: '#e5e8ec',
        },
      },
      fontFamily: {
        sans: ['var(--font-latin)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.9rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,27,45,0.04), 0 6px 20px rgba(15,27,45,0.06)',
        pop: '0 12px 40px rgba(15,27,45,0.12)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.3s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
