const paths = [
  "./src/pages/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
  "./src/views/**/*.{js,ts,jsx,tsx}",
];

module.exports = {
  content: paths,
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
  theme: {
    extend: {},
  },
};
