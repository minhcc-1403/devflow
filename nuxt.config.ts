// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: [
    "@nuxt/fonts",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxt/image",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./app/components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  ssr: false,
  runtimeConfig: {
    app: {},
    public: {
      apiBase: "",
      tinyEditorApiKey: "",
      firebaseConfig: JSON.stringify({
        apiKey: "AIzaSyBbLtFYvYm4Hsi5-Wm2HkO02dPkpywB0uo",
        authDomain: "neste-e98ac.firebaseapp.com",
        projectId: "neste-e98ac",
        storageBucket: "neste-e98ac.appspot.com",
        messagingSenderId: "666248768541",
        appId: "1:666248768541:web:14229321d69ad91c28aaf4",
        measurementId: "G-PHKNRTDMZ5",
      }),
    },
  },

  components: [
    // {
    //   path: "~/components/shared",
    //   extensions: [".vue"],
    //   pathPrefix: false,
    // },
    {
      path: "~/components",
      extensions: [".vue"],
      pathPrefix: false, // Tắt chế độ thêm tiền tố thư mục vào tên component
    },
  ],

  fonts: {
    families: [
      { name: "Plus Jakarta Sans", provider: "google" },
      { name: "Space Grotesk", provider: "google" },
    ],
    experimental: {
      processCSSVariables: true,
    },
  },
});
