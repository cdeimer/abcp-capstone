/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF6EE',
        'paper-dark': '#F0E9D8',
        ink: '#121212',
        housing: '#FF4D00',
        streets: '#00843D',
        culture: '#FF007A',
        highlight: '#FFE600',
        mint: '#00E599',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        zine: '4px 4px 0px #121212',
        'zine-lg': '6px 6px 0px #121212',
        'zine-sm': '2px 2px 0px #121212',
      },
    },
  },
  plugins: [],
};
