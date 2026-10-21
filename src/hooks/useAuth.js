import { useContext } from 'react';
import { AuthContexto } from '../contexts/auth-contexto.js';

// Para usar o login em qualquer componente: { usuario, autenticado, entrar, sair }.
// entrar(email, senha) devolve { ok: true } ou { ok: false, erro }.
export function useAuth() {
  const contexto = useContext(AuthContexto);
  if (!contexto) {
    throw new Error('useAuth precisa estar dentro de <AuthProvider>.');
  }
  return contexto;
}
