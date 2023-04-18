module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      'colors': {
        'primary': '#1D7874',
        'light-gray': '#F5F5F5',
      },
      screens: {
        '3xl': '1600px',
        '4xl': '1920px',
      },
    },
    fontFamily: {
      'Poppins': 'Poppins, sans-serif',
    },
  },
  plugins: [],
};
