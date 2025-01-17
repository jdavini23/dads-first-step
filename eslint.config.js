// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      '@next/next': nextPlugin
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true 
      }],
      '@typescript-eslint/ban-ts-comment': 'off',
      'react/prop-types': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      '.next/',
      'node_modules/',
      'dist/',
      'out/',
      'scripts/',
      '**/*.config.js',
      '**/*.config.ts',
      '**/*.generated.js',
      '**/*.generated.ts',
      '**/_buildManifest.js',
      '**/_ssgManifest.js',
      '**/webpack-*.js',
      '**/server-reference-manifest.js',
      '**/next-font-manifest.js',
      '**/polyfills.js',
      '**/development/**',
      '**/static/**'
    ]
  }
];
