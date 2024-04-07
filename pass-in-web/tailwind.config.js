/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [
    // Para conseguir trabalhar com itens de formularios
    require('@tailwindcss/forms')
  ]
}
