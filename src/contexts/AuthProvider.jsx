import { useState } from 'react';
import { AuthContexto } from './auth-contexto.js';
import { conferirCredenciais, gravarSessao, lerSessao } from '../lib/auth-demo.js';

// Guarda o usuário logado e as funções entrar e sair para o site todo.
export default function AuthProvider({ children }) {
  // Começa com a sessão salva no localStorage (se a pessoa já tinha entrado).
  const [usuario, setUsuario] = useState(lerSessao());

  // Devolve true se o login deu certo.
  function entrar(email, senha) {
    if (!conferirCredenciais(email, senha)) {
      return false;
    }
    const sessao = { email: email.trim().toLowerCase() };
    gravarSessao(sessao);
    setUsuario(sessao);
    return true;
  }

  function sair() {
    gravarSessao(null);
    setUsuario(null);
  }

  const valor = { usuario, autenticado: usuario !== null, entrar, sair };

  return <AuthContexto value={valor}>{children}</AuthContexto>;
}
