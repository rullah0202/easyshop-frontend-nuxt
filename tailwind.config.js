/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    // screens : {
    //   sm : '576px',
    //   md : '768px',
    //   lg : '992px',
    //   xl : '1200px',
    // },
    // container : {
    //   center : true,
    //   padding : '1rem' // 16px
    // },
    extend: {
      // colors : {
      //   primary : '#FD3D57'
      // },
      fontFamily : {
        'poppins' : ['Poppins', 'sans-serif'],
        'roboto' : ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

