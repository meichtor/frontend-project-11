import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  stylistic.configs.recommended,
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.browser },
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      '@stylistic/indent': ['error', 2],
    },
  },
  {
    ignores: ['dist/'],
  },
])
