import { describe, expect, it } from 'vitest';
import { normalizarBusca, semAcentos, tokenizar } from './texto.js';

describe('texto', () => {
  it('remove acentos', () => {
    expect(semAcentos('Pôr do sol à noite')).toBe('Por do sol a noite');
  });

  it('normaliza o termo de busca para o MockAPI', () => {
    expect(normalizarBusca('  Pôr   do SOL! ')).toBe('por do sol');
    expect(normalizarBusca('')).toBe('');
    expect(normalizarBusca(undefined)).toBe('');
  });

  it('separa o texto em palavras', () => {
    expect(tokenizar('Cachorro, correndo no parque!')).toEqual(['cachorro', 'correndo', 'no', 'parque']);
  });
});
