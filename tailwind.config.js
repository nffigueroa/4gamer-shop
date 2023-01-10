/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        purple: {
          1000: '#170E2B'
        }
      },
      transitionProperty: {
        height: 'height',
        padding: 'padding'
      },
      fontFamily: {
        title: 'RobotoBold'
      },
      fontSize: {
        tl: '20px'
      },
      backgroundImage: {
        default: 'linear-gradient(180deg, #32124A 38.54%, #1A0A27 57.29%, #000000 83.85%)'
      },
    },
  },
  plugins: [],
}
