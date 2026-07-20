/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { 
    extend: {
      colors: {
        primary: '#8B5CF6', // ضع هنا رمز اللون البنفسجي الدقيق الذي تريده
      }
    } 
  },
  plugins: [],
}