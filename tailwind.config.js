module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'button-cancel': {
          DEFAULT: '#EF4444', // Красный цвет фона
          foreground: '#FFFFFF' // Белый цвет текста
        },
        'button-save': {
          DEFAULT: '#22C55E', // Зеленый цвет фона
          foreground: '#FFFFFF' // Белый цвет текста
        }
      }
    }
  },
  plugins: [
    require('tailwindcss-animate')
  ]
}