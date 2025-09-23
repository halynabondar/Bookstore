/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.25rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.25rem' }],     // 12px / 20px
        sm: ['0.875rem', { lineHeight: '1.5rem' }],     // 14px / 24px
        base: ['1rem', { lineHeight: '1.75rem' }],      // 16px / 28px
        lg: ['1.125rem', { lineHeight: '1.9rem' }],     // 18px / ~30px
        xl: ['1.25rem', { lineHeight: '2rem' }],        // 20px / 32px
        '2xl': ['1.5rem', { lineHeight: '2.25rem' }],   // 24px / 36px
        '3xl': ['1.875rem', { lineHeight: '2.5rem' }],  // 30px / 40px
        '4xl': ['2.25rem', { lineHeight: '2.75rem' }],  // 36px / 44px
        '5xl': ['3rem', { lineHeight: '1.1' }],         // 48px / ~53px
        '6xl': ['3.75rem', { lineHeight: '1.1' }],      // 60px / ~66px
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#06a48c',
          light: '#06a48c',
          dark: '#07806c',
        },
        secondary: {
          light: '#FFECE3',
          dark: '#FF6320',
        },
        dark: {
          100: '#F9FCFB',
          200: '#F4F9F8',
          300: '#E4E9E8',
          400: '#CCCCCC',
          500: '#848786',
          600: '#383A3A',
          700: '#101313',
        },
        status: {
          error: { light: '#FFECEB', dark: '#FF4E3E' },
          success: { light: '#DFFEF5', dark: '#17BD8D' },
          warning: { light: '#FFF1DC', dark: '#FFA114' },
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F7F8F8',
          dark: '#0F1111',
        },
        textc: {
          DEFAULT: '#101313',
          muted: '#5B6160',
          onDark: '#F9FCFB',
        },
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        card: '0 6px 24px rgba(0,0,0,0.06)',
        pop: '0 12px 32px rgba(0,0,0,0.12)',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn .2s ease-out',
        slideUp: 'slideUp .25s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
