import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  stylistic.configs.recommended,
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, stylistic },
    extends: ['js/recommended'],
    rules: {
      '@stylistic/indent': ['error', 2],
    },
  },
  { files: ['**/*.js'], languageOptions: { globals: globals.browser } },
])
