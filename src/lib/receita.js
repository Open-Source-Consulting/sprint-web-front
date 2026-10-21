import { normalizarBusca, tokenizar } from './texto.js';

// Valores aceitos no campo "categoria" e o nome que aparece na tela.
export const CATEGORIAS = [
  { valor: 'retrato', rotulo: 'Retrato' },
  { valor: 'paisagem', rotulo: 'Paisagem' },
  { valor: 'noite', rotulo: 'Noite' },
  { valor: 'comida', rotulo: 'Comida e objetos' },
  { valor: 'movimento', rotulo: 'Movimento' },
  { valor: 'contraluz', rotulo: 'Contraluz' },
];

export const NIVEIS = [
  { valor: 'facil', rotulo: 'Fácil' },
  { valor: 'intermediario', rotulo: 'Intermediário' },
];

export const OPCOES_FLASH = ['Desligado', 'Automático', 'Ligado', 'Preenchimento (automático)'];

export const MODOS_CAMERA = [
  'Foto',
  'Retrato',
  'Noite',
  'Pro',
  'Comida',
  'Documento',
  'Panorama',
  'Astro',
  'Foto (rajada)',
];

export const LIMITES = {
  titulo: { min: 3, max: 60 },
  descricao: { max: 160 },
  resumoAutomatico: { max: 240 },
  passo: { max: 160 },
  passos: { min: 2, max: 8 },
  ajuste: { max: 40 },
  palavrasChave: { max: 200 },
  nota: { max: 500 },
};

export function rotuloCategoria(valor) {
  const categoria = CATEGORIAS.find((c) => c.valor === valor);
  return categoria ? categoria.rotulo : 'Sem categoria';
}

export function rotuloNivel(valor) {
  const nivel = NIVEIS.find((n) => n.valor === valor);
  return nivel ? nivel.rotulo : 'Nível não informado';
}

export function rotuloOrigem(valor) {
  return valor === 'usuario' ? 'Criada no Estúdio' : 'Receita do catálogo';
}

// Só receitas criadas no Estúdio podem ser editadas ou apagadas.
export function podeEditar(receita) {
  return receita.origem === 'usuario';
}

// Campos de texto da receita (usado no normalizarReceita).
const CAMPOS_TEXTO = [
  'titulo', 'categoria', 'nivel', 'descricao', 'palavrasChave', 'iso', 'exposicao',
  'foco', 'flash', 'modoCamera', 'resumoAutomatico', 'nota', 'criadoEm',
];

// A API é pública e qualquer um pode gravar nela, então uma receita pode vir incompleta.
// Aqui completamos o que falta para a tela não quebrar.
export function normalizarReceita(dados) {
  const receita = { ...dados };

  for (const campo of CAMPOS_TEXTO) {
    receita[campo] = receita[campo] ? String(receita[campo]) : '';
  }

  receita.id = String(dados.id);
  receita.titulo = receita.titulo.trim() || 'Receita sem título';
  receita.passosGuiado = Array.isArray(dados.passosGuiado) ? dados.passosGuiado : [];
  receita.origem = dados.origem === 'usuario' ? 'usuario' : 'jovi';
  // O MockAPI às vezes devolve booleano como texto ("true").
  receita.favorita = dados.favorita === true || dados.favorita === 'true';
  receita.hdr = dados.hdr === true || dados.hdr === 'true';

  return receita;
}

// Busca feita no front, ignorando acentos. O termo já precisa vir normalizado (normalizarBusca).
export function receitaContemTermo(receita, termo) {
  if (!termo) return true;
  const texto = [
    receita.titulo,
    receita.descricao,
    receita.palavrasChave,
    receita.categoria,
    receita.nivel,
    receita.modoCamera,
    receita.iso,
    receita.exposicao,
    receita.foco,
    receita.flash,
    receita.resumoAutomatico,
    receita.nota,
    ...receita.passosGuiado,
  ].join(' ');
  return normalizarBusca(texto).includes(termo);
}

// Lista de ajustes sugeridos, na ordem em que aparecem na tela.
export function listarAjustes(receita) {
  return [
    { rotulo: 'Modo da câmera', valor: receita.modoCamera || 'Não informado' },
    { rotulo: 'ISO', valor: receita.iso || 'Não informado' },
    { rotulo: 'Exposição', valor: receita.exposicao || 'Não informado' },
    { rotulo: 'Foco', valor: receita.foco || 'Não informado' },
    { rotulo: 'HDR', valor: receita.hdr ? 'Ligado' : 'Desligado' },
    { rotulo: 'Flash', valor: receita.flash || 'Não informado' },
  ];
}

// Junta as palavras-chave com as palavras do título e a categoria, sem acento e sem repetir.
// Assim a busca acha a receita pelo nome também.
export function montarPalavrasChave({ titulo = '', categoria = '', palavrasChave = '' }) {
  const palavras = [];
  for (const palavra of tokenizar(`${palavrasChave} ${titulo} ${categoria}`)) {
    if (palavra.length > 1 && !palavras.includes(palavra)) {
      palavras.push(palavra);
    }
  }
  return palavras.join(' ');
}

// Valores iniciais do formulário de nova receita.
export const RECEITA_VAZIA = {
  titulo: '',
  categoria: '',
  nivel: 'facil',
  descricao: '',
  palavrasChave: '',
  iso: 'Auto',
  exposicao: '0',
  foco: 'Automático',
  hdr: false,
  flash: 'Desligado',
  modoCamera: 'Foto',
  passosGuiado: ['', ''],
  resumoAutomatico: '',
};

// Valida o formulário. Devolve um objeto { campo: mensagem } (vazio = tudo certo).
export function validarReceita(dados) {
  const erros = {};

  const titulo = dados.titulo.trim();
  if (!titulo) {
    erros.titulo = 'Dê um nome à receita.';
  } else if (titulo.length < LIMITES.titulo.min) {
    erros.titulo = `Use pelo menos ${LIMITES.titulo.min} letras no nome.`;
  } else if (titulo.length > LIMITES.titulo.max) {
    erros.titulo = `Use no máximo ${LIMITES.titulo.max} caracteres no nome.`;
  }

  if (!CATEGORIAS.some((c) => c.valor === dados.categoria)) {
    erros.categoria = 'Escolha uma categoria.';
  }
  if (!NIVEIS.some((n) => n.valor === dados.nivel)) {
    erros.nivel = 'Escolha o nível.';
  }

  const descricao = dados.descricao.trim();
  if (!descricao) {
    erros.descricao = 'Descreva em uma frase o resultado que a receita busca.';
  } else if (descricao.length > LIMITES.descricao.max) {
    erros.descricao = `Use no máximo ${LIMITES.descricao.max} caracteres.`;
  }

  for (const campo of ['modoCamera', 'iso', 'exposicao', 'foco', 'flash']) {
    const valor = dados[campo].trim();
    if (!valor) {
      erros[campo] = 'Preencha este ajuste.';
    } else if (valor.length > LIMITES.ajuste.max) {
      erros[campo] = `Use no máximo ${LIMITES.ajuste.max} caracteres.`;
    }
  }

  const passos = dados.passosGuiado.map((p) => p.trim()).filter((p) => p !== '');
  if (passos.length < LIMITES.passos.min) {
    erros.passosGuiado = `Escreva pelo menos ${LIMITES.passos.min} passos para o Modo Guiado.`;
  } else if (passos.length > LIMITES.passos.max) {
    erros.passosGuiado = `Use no máximo ${LIMITES.passos.max} passos.`;
  } else if (passos.some((p) => p.length > LIMITES.passo.max)) {
    erros.passosGuiado = `Cada passo pode ter até ${LIMITES.passo.max} caracteres.`;
  }

  const resumo = dados.resumoAutomatico.trim();
  if (!resumo) {
    erros.resumoAutomatico = 'Explique o que a JOVI faria no Modo Automático.';
  } else if (resumo.length > LIMITES.resumoAutomatico.max) {
    erros.resumoAutomatico = `Use no máximo ${LIMITES.resumoAutomatico.max} caracteres.`;
  }

  if (dados.palavrasChave.length > LIMITES.palavrasChave.max) {
    erros.palavrasChave = `Use no máximo ${LIMITES.palavrasChave.max} caracteres.`;
  }

  return erros;
}

// Tira os espaços do começo e do fim e os espaços repetidos no meio.
function limpar(texto) {
  return texto.trim().replace(/\s+/g, ' ');
}

// Monta o objeto que vai para a API a partir dos dados do formulário.
export function prepararReceitaParaEnvio(dados) {
  return {
    titulo: limpar(dados.titulo),
    categoria: dados.categoria,
    nivel: dados.nivel,
    descricao: limpar(dados.descricao),
    palavrasChave: montarPalavrasChave({
      titulo: dados.titulo,
      categoria: dados.categoria,
      palavrasChave: dados.palavrasChave,
    }),
    iso: limpar(dados.iso),
    exposicao: limpar(dados.exposicao),
    foco: limpar(dados.foco),
    hdr: dados.hdr,
    flash: limpar(dados.flash),
    modoCamera: limpar(dados.modoCamera),
    passosGuiado: dados.passosGuiado.map(limpar).filter((passo) => passo !== ''),
    resumoAutomatico: limpar(dados.resumoAutomatico),
  };
}
