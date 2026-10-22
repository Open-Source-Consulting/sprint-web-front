import { tokenizar } from './texto.js';

// Palavras que aparecem em quase todo pedido e não ajudam a escolher uma receita.
// Os acentos são tirados antes, então "pôr" vira "por" e também é ignorado.
const PALAVRAS_IGNORADAS = [
  'a', 'o', 'as', 'os', 'um', 'uma', 'uns', 'umas', 'de', 'da', 'do', 'das', 'dos', 'e', 'ou',
  'em', 'na', 'no', 'nas', 'nos', 'num', 'numa', 'ao', 'aos', 'para', 'pra', 'pro', 'por',
  'pela', 'pelo', 'com', 'sem', 'que', 'se', 'eu', 'me', 'meu', 'minha', 'meus', 'minhas',
  'seu', 'sua', 'seus', 'suas', 'ele', 'ela', 'eles', 'elas', 'isso', 'esse', 'essa', 'este',
  'esta', 'aqui', 'ali', 'la', 'muito', 'muita', 'mais', 'bem', 'como', 'quando', 'onde',
  'quero', 'queria', 'gostaria', 'preciso', 'vou', 'fazer', 'tirar', 'bater', 'foto', 'fotos',
  'fotografar', 'fotografia', 'imagem', 'registrar', 'capturar', 'ter', 'ser', 'estar',
  'estou', 'tem', 'ja', 'so', 'tambem', 'bonita', 'bonito', 'boa', 'bom', 'legal', 'melhor',
];

// Palavras do texto que contam para a sugestão (sem repetir e sem as ignoradas).
export function extrairTermos(texto) {
  const termos = [];
  for (const palavra of tokenizar(texto)) {
    if (palavra.length > 1 && !PALAVRAS_IGNORADAS.includes(palavra) && !termos.includes(palavra)) {
      termos.push(palavra);
    }
  }
  return termos;
}

// Duas palavras são "parecidas" quando começam igual, ex.: "correndo" e "correr".
// Compara as 4 primeiras letras (ou mais, se as palavras forem grandes).
function saoParecidas(a, b) {
  if (a.length < 4 || b.length < 4) return false;
  const tamanho = Math.max(4, Math.min(a.length, b.length) - 2);
  return a.slice(0, tamanho) === b.slice(0, tamanho);
}

// Dá pontos para a receita: palavra igual vale 2 e palavra parecida vale 1.
// Também devolve quais termos combinaram, para mostrar na tela.
export function pontuarReceita(receita, termos) {
  const palavras = tokenizar(`${receita.palavrasChave} ${receita.titulo} ${receita.categoria}`);
  let pontos = 0;
  const combinados = [];

  for (const termo of termos) {
    if (palavras.includes(termo)) {
      pontos += 2;
      combinados.push(termo);
    } else if (palavras.some((palavra) => saoParecidas(termo, palavra))) {
      pontos += 1;
      combinados.push(termo);
    }
  }

  return { pontos, combinados };
}

// Usada no "Descreva a foto". Não é IA: compara as palavras do texto com as
// palavras-chave de cada receita e devolve as que fizeram mais pontos.
export function sugerirReceitas(receitas, texto, { limite = 3 } = {}) {
  const termos = extrairTermos(texto);
  if (termos.length === 0) {
    return { termos, sugestoes: [] };
  }

  const sugestoes = receitas
    .map((receita) => ({ receita, ...pontuarReceita(receita, termos) }))
    .filter((item) => item.pontos > 0)
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, limite);

  return { termos, sugestoes };
}
