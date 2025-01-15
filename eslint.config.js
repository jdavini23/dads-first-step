// @ts-check
const eslint = require("eslint");
const tseslint = require("@typescript-eslint/eslint-plugin");
const nextPlugin = require("eslint-config-next");

module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      'plugin:@typescript-eslint/recommended',
      'next/core-web-vitals'
    ],
    plugins: ['@typescript-eslint'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/no-unescaped-entities': 'warn',
      'no-console': 'warn'
    }
  },
  {
    ignores: [
      '.next/',
      'node_modules/',
      'dist/',
      'build/',
      'coverage/'
    ]
  }
];
