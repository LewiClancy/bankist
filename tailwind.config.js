module.exports = {
  purge: ['./src/app/**/*.{html,ts}', './src/app/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
