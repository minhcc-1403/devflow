// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
  {
    ignores: ["./.nuxt/**/*", "app/components/ui/**", "tailwind.config.js"],
  },
  {
    files: ["**/*.ts", "**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
      "no-console": "error",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "vue/prop-name-casing": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^_$" },
      ],
    },
  },
]);
