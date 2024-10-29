/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backdropBlur: {
        sm: '4px',
        DEFAULT: '10px',
        md: '20px',
        lg: '30px',
        xl: '40px',
        '2xl': '50px',
        '3xl': '60px',
      },
    },
  },
  variants: {
    extend: {
      backdropBlur: ['hover', 'focus'],
    },
  },
  plugins: [],
};
