/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {

  //         "primary": "#0000ff",

  //         "secondary": "#ff4a00",

  //         "accent": "#94ad00",

  //         "neutral": "#07090d",

  //         "base-100": "#112636",

  //         "info": "#00d0ff",

  //         "success": "#24ce6d",

  //         "warning": "#a08100",

  //         "error": "#ff1151",
  //       },
  //     },
  //   ],
  // },
  plugins: [require('daisyui')],
}