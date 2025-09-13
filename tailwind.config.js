module.exports = {
  purge: false,
  content: ["./src/**/*.{js,jsx,ts,tsx}",
  "./public/index.html"],
  theme: {
    extend: {
      colors: {
        gray: {
          '75': '#f6f7f8', // custom gray between 50 and 100
        }
      }
    },
  },
  plugins: [],
};
