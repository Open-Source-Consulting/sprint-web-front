import { afterEach, describe, expect, it, vi } from 'vitest';
import { atualizarReceita, criarReceita, listarReceitas, obterReceita } from './receitas.js';

// Simula o fetch devolvendo uma resposta com status e corpo JSON.
function simularFetch(status, corpo) {
  const fetchFalso = vi.fn().mockResolvedValue(new Response(JSON.stringify(corpo), { status }));
  vi.stubGlobal('fetch', fetchFalso);
  return fetchFalso;
}

function urlChamada(fetchFalso, indice = 0) {
  return new URL(fetchFalso.mock.calls[indice][0]);
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('serviço de receitas', () => {
  it('lista com busca normalizada e paginação', async () => {
    const fetchFalso = simularFetch(200, [{ id: '1', titulo: 'Pôr do sol' }]);
    const receitas = await listarReceitas({ busca: 'Pôr!', pagina: 2, limite: 6 });

    const url = urlChamada(fetchFalso);
    expect(url.pathname).toBe('/Receitas');
    expect(url.searchParams.get('search')).toBe('por');
    expect(url.searchParams.get('page')).toBe('2');
    expect(url.searchParams.get('limit')).toBe('6');
    expect(receitas[0].titulo).toBe('Pôr do sol');
  });

  it('com busca de várias palavras, filtra no front ignorando acentos', async () => {
    const fetchFalso = simularFetch(200, [
      { id: '1', titulo: 'Retrato à noite' },
      { id: '2', titulo: 'Retrato de dia' },
    ]);
    const receitas = await listarReceitas({ busca: 'retrato a noite', pagina: 1, limite: 6 });

    const url = urlChamada(fetchFalso);
    expect(url.searchParams.has('search')).toBe(false);
    expect(receitas.map((r) => r.id)).toEqual(['1']);
  });

  it('trata o 404 da listagem como lista vazia', async () => {
    simularFetch(404, 'Not found');
    await expect(listarReceitas({ busca: 'xyz' })).resolves.toEqual([]);
  });

  it('com busca + categoria, pede só a categoria e filtra no front', async () => {
    const fetchFalso = simularFetch(200, [
      { id: '1', titulo: 'Cidade à noite', categoria: 'noite' },
      { id: '2', titulo: 'Lua', categoria: 'noite' },
    ]);
    const receitas = await listarReceitas({ busca: 'lua', categoria: 'noite', pagina: 1, limite: 6 });

    const url = urlChamada(fetchFalso);
    expect(url.searchParams.get('categoria')).toBe('noite');
    expect(url.searchParams.has('search')).toBe(false);
    expect(receitas.map((r) => r.id)).toEqual(['2']);
  });

  it('dá erro com status 404 no detalhe inexistente', async () => {
    simularFetch(404, 'Not found');
    await expect(obterReceita('999')).rejects.toMatchObject({ status: 404 });
  });

  it('dá erro quando o servidor falha', async () => {
    simularFetch(500, {});
    await expect(listarReceitas()).rejects.toMatchObject({ status: 500 });
  });

  it('mostra uma mensagem própria quando a rede falha', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(listarReceitas()).rejects.toThrow('Não foi possível conectar à API');
  });

  it('cria receita com origem "usuario"', async () => {
    const fetchFalso = simularFetch(201, { id: '20', titulo: 'Minha receita', origem: 'usuario' });
    await criarReceita({ titulo: 'Minha receita' });

    const opcoes = fetchFalso.mock.calls[0][1];
    const corpo = JSON.parse(opcoes.body);
    expect(opcoes.method).toBe('POST');
    expect(corpo).toMatchObject({ origem: 'usuario', favorita: false, nota: '' });
    expect(typeof corpo.criadoEm).toBe('string');
  });

  it('PUT envia só os campos alterados', async () => {
    const fetchFalso = simularFetch(200, { id: '3', titulo: 'Lua', favorita: true });
    const receita = await atualizarReceita('3', { favorita: true });

    expect(urlChamada(fetchFalso).pathname).toBe('/Receitas/3');
    expect(JSON.parse(fetchFalso.mock.calls[0][1].body)).toEqual({ favorita: true });
    expect(receita.favorita).toBe(true);
  });
});
