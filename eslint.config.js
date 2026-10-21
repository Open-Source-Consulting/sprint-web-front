import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'docs/legado-sprint3', '.impeccable']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.browser },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // Desligada porque buscamos os dados da API do jeito tradicional: useEffect que
      // coloca carregando = true e depois guarda a resposta no estado.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    files: ['scripts/**/*.{js,mjs}', 'vite.config.js', 'eslint.config.js'],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    files: ['**/*.test.{js,jsx}', 'src/testes/**'],
    languageOptions: { globals: { ...globals.node } },
  },
]);
