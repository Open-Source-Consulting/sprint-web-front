import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AuthProvider from '../contexts/AuthProvider.jsx';
import { useAuth } from './useAuth.js';
import { CHAVE_SESSAO } from '../lib/auth-demo.js';

function renderizarComAuth() {
  return renderHook(() => useAuth(), { wrapper: AuthProvider });
}

describe('useAuth (login de demonstração)', () => {
  it('entra com as credenciais de demonstração e guarda a sessão', () => {
    const { result } = renderizarComAuth();
    expect(result.current.autenticado).toBe(false);

    let resposta;
    act(() => {
      resposta = result.current.entrar(' DEMO@jovi.ai ', 'jovi2026');
    });

    expect(resposta).toBe(true);
    expect(result.current.autenticado).toBe(true);
    expect(JSON.parse(localStorage.getItem(CHAVE_SESSAO)).email).toBe('demo@jovi.ai');
  });

  it('recusa senha errada', () => {
    const { result } = renderizarComAuth();
    let resposta;
    act(() => {
      resposta = result.current.entrar('demo@jovi.ai', 'errada');
    });
    expect(resposta).toBe(false);
    expect(result.current.autenticado).toBe(false);
  });

  it('sai e apaga a sessão', () => {
    const { result } = renderizarComAuth();
    act(() => {
      result.current.entrar('demo@jovi.ai', 'jovi2026');
    });
    act(() => {
      result.current.sair();
    });
    expect(result.current.autenticado).toBe(false);
    expect(localStorage.getItem(CHAVE_SESSAO)).toBeNull();
  });
});
