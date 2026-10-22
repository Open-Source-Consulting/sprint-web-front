import { describe, expect, it } from 'vitest';
import { extrairTermos, pontuarReceita, sugerirReceitas } from './sugestao.js';

const receitas = [
  { id: '1', titulo: 'Pet em movimento', categoria: 'movimento', palavrasChave: 'pet cachorro gato correndo correr parque' },
  { id: '2', titulo: 'Retrato à noite', categoria: 'retrato', palavrasChave: 'retrato noite pessoa rosto festa' },
  { id: '3', titulo: 'Pôr do sol', categoria: 'contraluz', palavrasChave: 'por do sol ceu laranja praia' },
];

describe('sugestão por palavras-chave', () => {
  it('ignora palavras vazias e acentos', () => {
    expect(extrairTermos('Quero fotografar meu cachorro no parque')).toEqual(['cachorro', 'parque']);
    expect(extrairTermos('pôr do sol')).toEqual(['sol']);
  });

  it('palavra igual vale 2 pontos e parecida vale 1', () => {
    expect(pontuarReceita(receitas[0], ['cachorro'])).toEqual({ pontos: 2, combinados: ['cachorro'] });
    // "corria" não está nas palavras-chave, mas começa como "correr"/"correndo"
    expect(pontuarReceita(receitas[0], ['corria']).pontos).toBe(1);
    expect(pontuarReceita(receitas[1], ['cachorro']).pontos).toBe(0);
  });

  it('ordena as receitas pela pontuação', () => {
    const { sugestoes } = sugerirReceitas(receitas, 'meu cachorro correndo no parque à noite');
    expect(sugestoes[0].receita.id).toBe('1');
    expect(sugestoes.map((s) => s.receita.id)).toContain('2');
  });

  it('não sugere nada para texto vazio ou sem relação', () => {
    expect(sugerirReceitas(receitas, '   ').sugestoes).toEqual([]);
    expect(sugerirReceitas(receitas, 'quero uma foto').sugestoes).toEqual([]);
    expect(sugerirReceitas(receitas, 'microscópio').sugestoes).toEqual([]);
  });

  it('respeita o limite', () => {
    expect(sugerirReceitas(receitas, 'pet noite sol', { limite: 2 }).sugestoes).toHaveLength(2);
  });
});
