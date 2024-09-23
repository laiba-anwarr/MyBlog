/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F1F1F1', // Custom primary color
        // secondary: '#ffed4a', // Custom secondary color
        // accent: '#38c172', // Custom accent color
      },
      fontFamily: {
       Neue: ['Neue', 'sans-serif'], 
       Founders:['Founders' , 'sans-serif'],
       // Add CustomFont
       lora:  ['Lora',' serif'],
       cinzel: ['Cinzel', 'serif']
      },
    },
  },
  plugins: [],
}

