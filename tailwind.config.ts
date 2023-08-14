import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'workout-card-pattern':
          "linear-gradient(225deg, rgba(231, 229, 228, 0.00) 0%, rgba(28, 25, 20, 0.20) 23.44%, rgba(28, 25, 23, 0.75) 43.23%, rgba(28, 25, 23, 0.95) 67.50%), url('/workout-1.webp')",
      },
      fontFamily: {
        header: ['var(--font-bebas-neue)'],
      },
    },
  },
  plugins: [],
};
export default config;
