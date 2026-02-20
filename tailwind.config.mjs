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
        white: '#FFFFFF',
        text: '#1A1A1A',
        secondary: '#666666',
        border: '#E5E5E5',
        hover: '#333333',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
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
      maxWidth: {
        container: '1280px',
      },
      transitionDuration: {
        entry: '700ms',
        hover: '300ms',
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      gridTemplateColumns: {
        layout: 'repeat(12, minmax(0, 1fr))',
        'layout-md': 'repeat(6, minmax(0, 1fr))',
        'layout-sm': 'repeat(2, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
