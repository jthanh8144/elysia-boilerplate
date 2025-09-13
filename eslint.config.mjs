import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import pluginImport from 'eslint-plugin-import'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {
      js,
      'simple-import-sort': pluginSimpleImportSort,
      import: pluginImport,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: { project: true, tsconfigRootDir: import.meta.dirname },
      globals: globals.node,
    },
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'import/newline-after-import': 'error',
      'no-console': 'warn',
      '@typescript-eslint/no-deprecated': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off'
    },
    ignores: ['node_modules/*', 'dist/*', 'coverage/*', 'scripts/*', 'eslint.config.mjs'],
  },
])
