/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        museum: {
          white: '#ffffff',
          surface: '#FAFAF8',
          text: '#111111',
          caption: '#6b6b6b',
          label: '#888888',
          accent: '#1a1a2e',
          'accent-hover': '#2d2d4a',
          warm: '#8b7355',
          'warm-hover': '#a08868',
          border: '#e5e5e3',
        },
      },
      fontFamily: {
        serif: ['"Elizeth"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['"Relative"', '"RelativeBook"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"RelativeMono"', '"Courier New"', 'Courier', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(3rem, 5vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '300' }],
        h1: ['clamp(2.25rem, 3.5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '300' }],
        h2: ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '300' }],
        h3: ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.25', letterSpacing: '-0.005em', fontWeight: '400' }],
        body: ['1rem', { lineHeight: '1.65', fontWeight: '400' }],
        caption: ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        small: ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        'section-sm': '48px',
        'section-md': '80px',
        'section-lg': '120px',
        'gutter-sm': '16px',
        'gutter-md': '24px',
        'gutter-lg': '32px',
      },
      letterSpacing: {
        museum: '0.15em',
        'wide-museum': '0.2em',
      },
      maxWidth: {
        container: '1280px',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
        page: '400ms',
      },
      transitionTimingFunction: {
        museum: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'museum-out': 'cubic-bezier(0, 0, 0.25, 1)',
      },
      gridTemplateColumns: {
        layout: 'repeat(12, minmax(0, 1fr))',
        'layout-md': 'repeat(6, minmax(0, 1fr))',
        'layout-sm': 'repeat(2, minmax(0, 1fr))',
      },
      opacity: {
        hover: '0.85',
      },
    },
  },
  plugins: [],
};
