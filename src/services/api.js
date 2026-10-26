// Endereço do nosso projeto no MockAPI (a API é pública, não é segredo).
// Dá para trocar pela variável VITE_API_URL no arquivo .env.
export const URL_API = import.meta.env.VITE_API_URL || 'https://6acef518f338359cf1c3c7f6.mockapi.io';

function mensagemDeErro(status) {
  if (status === 404) return 'O item não foi encontrado na API.';
  if (status === 429) return 'Muitas requisições em pouco tempo. Espere alguns segundos e tente de novo.';
  if (status >= 500) return 'A API (MockAPI) está fora do ar no momento.';
  return `A API respondeu com erro (status ${status}).`;
}

// Faz uma requisição para a API e devolve o JSON da resposta.
// Se der erro, lança um Error com a mensagem e o status HTTP (erro.status).
export async function requisitar(caminho, { metodo = 'GET', corpo, parametros } = {}) {
  let url = URL_API + caminho;
  if (parametros) {
    url += '?' + new URLSearchParams(parametros).toString();
  }

  const opcoes = { method: metodo };
  if (corpo) {
    opcoes.headers = { 'Content-Type': 'application/json' };
    opcoes.body = JSON.stringify(corpo);
  }

  let resposta;
  try {
    resposta = await fetch(url, opcoes);
  } catch {
    // O fetch só cai aqui quando nem chega a ter resposta (ex.: sem internet).
    throw new Error('Não foi possível conectar à API. Verifique sua internet e tente de novo.');
  }

  if (!resposta.ok) {
    const erro = new Error(mensagemDeErro(resposta.status));
    erro.status = resposta.status;
    throw erro;
  }

  return resposta.json();
}
