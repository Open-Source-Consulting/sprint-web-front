// Login APENAS DE DEMONSTRAÇÃO.
// O e-mail e a senha ficam aqui no front e a "sessão" é só um registro no localStorage.
// Não tem segurança de verdade: serve para mostrar as rotas privadas no trabalho.
export const CREDENCIAIS_DEMO = {
  email: 'demo@jovi.ai',
  senha: 'jovi2026',
};

export const CHAVE_SESSAO = 'jovi:sessao-demo';

export function conferirCredenciais(email, senha) {
  return email.trim().toLowerCase() === CREDENCIAIS_DEMO.email && senha === CREDENCIAIS_DEMO.senha;
}

export function lerSessao() {
  const salvo = localStorage.getItem(CHAVE_SESSAO);
  return salvo ? JSON.parse(salvo) : null;
}

export function gravarSessao(sessao) {
  if (sessao) {
    localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
  } else {
    localStorage.removeItem(CHAVE_SESSAO);
  }
}
