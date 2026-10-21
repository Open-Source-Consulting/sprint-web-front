import { describe, expect, it } from 'vitest';
import {
  RECEITA_VAZIA,
  montarPalavrasChave,
  normalizarReceita,
  prepararReceitaParaEnvio,
  receitaContemTermo,
  validarReceita,
} from './receita.js';

const valida = {
  ...RECEITA_VAZIA,
  titulo: 'Café da manhã',
  categoria: 'comida',
  nivel: 'facil',
  descricao: 'Mesa posta com luz da janela.',
  passosGuiado: ['Use a luz da janela.', 'Fotografe de cima.'],
  resumoAutomatico: 'A JOVI ativaria o modo Comida.',
};

describe('receita', () => {
  it('normaliza registros incompletos vindos da API', () => {
    const r = normalizarReceita({ id: 7, titulo: '', hdr: 'true', passosGuiado: 'não é lista' });
    expect(r.id).toBe('7');
    expect(r.titulo).toBe('Receita sem título');
    expect(r.hdr).toBe(true);
    expect(r.passosGuiado).toEqual([]);
    expect(r.origem).toBe('jovi');
    expect(r.favorita).toBe(false);
  });

  it('monta palavras-chave sem acento, com título e categoria', () => {
    expect(montarPalavrasChave({ titulo: 'Café da manhã', categoria: 'comida', palavrasChave: 'mesa pão' })).toBe(
      'mesa pao cafe da manha comida',
    );
  });

  it('aceita uma receita válida', () => {
    expect(validarReceita(valida)).toEqual({});
  });

  it('aponta os campos com problema', () => {
    const erros = validarReceita({ ...valida, titulo: 'ab', categoria: 'x', passosGuiado: ['só um', '  '] });
    expect(Object.keys(erros).sort()).toEqual(['categoria', 'passosGuiado', 'titulo']);
  });

  it('prepara o corpo do POST sem passos vazios', () => {
    const corpo = prepararReceitaParaEnvio({ ...valida, passosGuiado: ['  Primeiro  ', '', 'Segundo'] });
    expect(corpo.passosGuiado).toEqual(['Primeiro', 'Segundo']);
    expect(corpo.palavrasChave).toContain('cafe');
    expect(corpo).not.toHaveProperty('origem');
  });

  it('busca local ignora acentos', () => {
    const r = normalizarReceita({ titulo: 'Pôr do sol', passosGuiado: ['Toque no céu'] });
    expect(receitaContemTermo(r, 'por do')).toBe(true);
    expect(receitaContemTermo(r, 'ceu')).toBe(true);
    expect(receitaContemTermo(r, 'lua')).toBe(false);
  });
});
