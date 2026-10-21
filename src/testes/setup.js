// Configuração dos testes: adiciona o toBeInTheDocument() e limpa a tela e o localStorage depois de cada teste.
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  localStorage.clear();
});
