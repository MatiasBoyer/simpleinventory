import js from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      parserOptions: {
        sourceType: 'module',
      },
    },
    extends: [js.configs.recommended, prettierConfig],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'linebreak-style': ['error', 'windows'],
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
];
