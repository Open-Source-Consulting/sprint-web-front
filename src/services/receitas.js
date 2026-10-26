import { requisitar } from './api.js';
import { normalizarReceita, receitaContemTermo } from '../lib/receita.js';
import { normalizarBusca } from '../lib/texto.js';

// O recurso no MockAPI tem R maiúsculo ("/receitas" dá 404).
const RECURSO = '/Receitas';

// GET /Receitas. Quando a busca não acha nada, o MockAPI responde 404 em vez de [].
// Por isso aqui o 404 vira uma lista vazia.
async function buscarLista(parametros) {
  try {
    const dados = await requisitar(RECURSO, { parametros });
    return dados.map(normalizarReceita);
  } catch (erro) {
    if (erro.status === 404) return [];
    throw erro;
  }
}

// Lista as receitas com busca, filtros e paginação.
// O ?search= do MockAPI não funciona junto com filtro e não acha palavras com acento.
// Então, quando tem filtro ou mais de uma palavra, buscamos tudo e filtramos aqui no front.
export async function listarReceitas({ busca = '', categoria = '', favorita = false, pagina = 1, limite } = {}) {
  const termo = normalizarBusca(busca);
  const parametros = {};
  if (categoria) parametros.categoria = categoria;
  if (favorita) parametros.favorita = 'true';

  const buscarNoFront = termo && (categoria || favorita || termo.includes(' '));

  if (buscarNoFront) {
    const todas = await buscarLista(parametros);
    const encontradas = todas.filter((receita) => receitaContemTermo(receita, termo));
    if (!limite) return encontradas;
    const inicio = (pagina - 1) * limite;
    return encontradas.slice(inicio, inicio + limite);
  }

  if (termo) parametros.search = termo;
  if (limite) {
    parametros.page = pagina;
    parametros.limit = limite;
  }
  return buscarLista(parametros);
}

// GET /Receitas/:id. Se não existir, o erro vem com status 404.
export async function obterReceita(id) {
  const dados = await requisitar(`${RECURSO}/${id}`);
  return normalizarReceita(dados);
}

// POST /Receitas. Receitas criadas no Estúdio ficam com origem "usuario".
export async function criarReceita(dados) {
  const corpo = {
    ...dados,
    origem: 'usuario',
    favorita: false,
    nota: '',
    criadoEm: new Date().toISOString(),
  };
  const criada = await requisitar(RECURSO, { metodo: 'POST', corpo });
  return normalizarReceita(criada);
}

// PUT /Receitas/:id. O MockAPI só muda os campos enviados,
// então dá para mandar só { favorita } ou só { nota }.
export async function atualizarReceita(id, alteracoes) {
  const atualizada = await requisitar(`${RECURSO}/${id}`, { metodo: 'PUT', corpo: alteracoes });
  return normalizarReceita(atualizada);
}

// DELETE /Receitas/:id
export async function removerReceita(id) {
  await requisitar(`${RECURSO}/${id}`, { metodo: 'DELETE' });
}
