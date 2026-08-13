import js from '@eslint/js'
import globals from 'globals'
import svelte from 'eslint-plugin-svelte'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    files: ['**/*.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: { ...globals.browser },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
  ...svelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      globals: { ...globals.browser },
    },
    rules: {
      'svelte/no-unused-svelte-ignore': 'error',
      'svelte/sort-attributes': 'warn',
      'svelte/no-at-html-tags': 'warn',
    },
  },
])
