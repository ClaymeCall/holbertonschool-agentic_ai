import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['dist', 'src/**/*.vue'],
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
])
