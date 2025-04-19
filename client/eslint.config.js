import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default tseslint.config(
  { ignores: ['dist', 'build'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: 'tsconfig.app.json',
      },
      globals: globals.browser,
    },
    plugins: {
      import: importPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11yPlugin,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],
      'react/react-in-jsx-scope': 'off', // Needed only if not using Next.js or newer React
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/aria-role': 'warn',

      // General style rules (Airbnb-like)
      'no-console': 'warn',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'prettier/prettier': 'error',
    },
  }
)
