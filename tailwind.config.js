module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'button-cancel': {
          DEFAULT: 'hsl(0 84.2% 60.2%)', // Красный цвет фона
          foreground: 'hsl(0 0% 100%)', // Белый цвет текста
        },
        'button-save': {
          DEFAULT: 'hsl(120 84.2% 40.2%)', // Зеленый цвет фона
          foreground: 'hsl(0 0% 100%)', // Белый цвет текста
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
