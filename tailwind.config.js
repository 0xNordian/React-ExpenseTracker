// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
const { nextui } = require("@nextui-org/react");
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        secondary: '#283F3B',
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    withMT
    // require("daisyui"),
    // {
    //   daisyui: {
    //     // Disable DaisyUI's global styles
    //     styled: false,
    //   },
    // },
  ],
}