// Tira os acentos: "Pôr do sol" -> "Por do sol".
// O normalize('NFD') separa a letra do acento ("ô" vira "o" + "^")
// e a regex apaga os acentos que sobraram soltos.
export function semAcentos(texto = '') {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// Deixa o texto pronto para buscar: minúsculo, sem acento, sem pontuação
// e sem espaços repetidos. O ?search= do MockAPI não acha palavras com acento.
export function normalizarBusca(texto = '') {
  return semAcentos(texto)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Separa o texto em palavras: "Cachorro, correndo!" -> ["cachorro", "correndo"]
export function tokenizar(texto = '') {
  return normalizarBusca(texto)
    .split(/[^a-z0-9]+/)
    .filter((palavra) => palavra !== '');
}
