// @ts-check
import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: [
      '**/node_modules/**', 
      '.next/**', 
      'out/**',
      'scripts/**', 
      '**/*.config.js', 
      '**/*.config.ts',
      '**/*.generated.js',
      '**/*.generated.ts',
      '**/_buildManifest.js',
      '**/_ssgManifest.js',
      '**/webpack-*.js',
      '**/server-reference-manifest.js',
      '**/next-font-manifest.js'
    ]
  },
  eslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint,
      '@next/next': nextPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: true,
        JSX: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn', 
        { 
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@next/next/no-img-element': 'warn',
      'react/no-unescaped-entities': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn', 
        { 
          allowExportNames: ['metadata', 'layout', 'page'] 
        }
      ],
      'no-console': 'warn',
    },
  },
];
