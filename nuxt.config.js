export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: "static",
  head: {
    title: "Dorellia Resturant",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&family=Rochester&family=Vibur&display=swap",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/scss/main.scss",
    "~/node_modules/bootstrap-icons/font/bootstrap-icons.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/style-resources"],
  styleResources: {
    // your settings here
    sass: [],
    scss: ["~/assets/scss/main.scss"],

    hoistUseStatements: true, // Hoists the "@use" imports. Applies only to "sass", "scss" and "less". Default: false.
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "@nuxtjs/axios",
  ],
  axios: {
    baseURL: process.env.STRAPI_URL || "http://localhost:1337/api",
  },
  /*axios: {
    baseURL: 'https://api-dev.shipcash.net/api'
  },
  env: {
    baseUrl:
    process.env.NODE_ENV !== 'production'
        ? 'sk_test_51IXEvJHIHNy1at3SPIR8zJdgrX2W1OtyL1Kb7GTH3LOQa1wPbmFuhWBjgZPvgZlOnqyRhsRdKNhOfUL4ySuPcXG100nALYRbXU'
        : 'sk_test_51IXEvJHIHNy1at3SPIR8zJdgrX2W1OtyL1Kb7GTH3LOQa1wPbmFuhWBjgZPvgZlOnqyRhsRdKNhOfUL4ySuPcXG100nALYRbXU'
  },*/

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
