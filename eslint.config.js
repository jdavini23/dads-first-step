// @ts-check
const eslint = require("eslint");
const tseslint = require("typescript-eslint");
const nextPlugin = require("@next/eslint-plugin-next");

module.exports = tseslint.config(
  {
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
      "next/core-web-vitals"
    ],
    plugins: ["@typescript-eslint"],
    rules: {
      // Customize rules here
      "@typescript-eslint/no-unused-vars": "warn",
      "react/no-unescaped-entities": "warn",
      "no-console": "warn"
    },
    ignores: [
      ".next/",
      "node_modules/",
      "dist/",
      "build/",
      "coverage/"
    ]
  }
);
