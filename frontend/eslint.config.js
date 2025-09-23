import js from '@eslint/js'
import globals from 'globals'

import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import testingLibrary from 'eslint-plugin-testing-library'
import jestDom from 'eslint-plugin-jest-dom'
import prettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'
import tailwind from 'eslint-plugin-tailwindcss'

import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'build', 'node_modules', 'coverage']),
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: {
      prettier,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      tailwind,
    },
    extends: [
      js.configs.recommended,
      eslintConfigPrettier,
      'plugin:tailwindcss/recommended',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        node: { extensions: ['.js', '.jsx'] },
        alias: { map: [['@', './src']], extensions: ['.js', '.jsx'] },
      },
      tailwindcss: {
        callees: ['classnames', 'clsx', 'ctl'], // якщо користуєшся ними
        config: 'tailwind.config.js',
      },
    },
    rules: {
      ...(importPlugin.configs.recommended?.rules ?? {}),
      ...(react.configs.recommended?.rules ?? {}),
      ...(reactHooks.configs['recommended-latest']?.rules ?? {}),
      ...(jsxA11y.configs.recommended?.rules ?? {}),

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'import/order': [
        'warn',
        { 'newlines-between': 'always', alphabetize: { order: 'asc' } },
      ],
      'import/no-unresolved': 'error',
      'prettier/prettier': 'warn',

      // Tailwind конкретні
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'warn',
    },
  },
  {
    files: ['src/**/*.{test,spec}.jsx', 'src/setupTests.js'],
    plugins: {
      'testing-library': testingLibrary,
      'jest-dom': jestDom,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: {
      ...(testingLibrary.configs.react?.rules ?? {}),
      ...(jestDom.configs.recommended?.rules ?? {}),
    },
  },
  {
    files: [
      '*.config.js',
      'vite.config.js',
      'tailwind.config.js',
      'postcss.config.js',
      'eslint.config.js',
    ],
    languageOptions: { globals: globals.node },
    rules: {
      'import/no-unresolved': 'off',
    },
  },
])