export const EQUIPE = [
  { nome: 'Felipe Pedrol', rm: '569631', funcao: 'Desenvolvimento' },
  { nome: 'Jecky Cossio', rm: '572226', funcao: 'Desenvolvimento' },
  { nome: 'Daniel Ribeiro', rm: '571746', funcao: 'UI/UX e Design' },
  { nome: 'Felipi Godoy', rm: '573741', funcao: 'Criação de Textos e Pesquisa' },
  { nome: 'Leonardo', rm: '571311', funcao: 'Documentação e Testes de Responsividade' },
];

export const NOME_EQUIPE = 'Open Source Consulting';

export function iniciais(nome) {
  const partes = nome.trim().split(/\s+/);
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}