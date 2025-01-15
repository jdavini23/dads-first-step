// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';

export default tseslint.config(
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
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn', 
        { 
          allowExportNames: ['metadata', 'layout', 'page'] 
        }
      ],
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn', 
        { 
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  }
);
