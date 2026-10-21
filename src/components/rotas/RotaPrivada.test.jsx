import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router';
import { describe, expect, it } from 'vitest';
import AuthProvider from '../../contexts/AuthProvider.jsx';
import RotaPrivada from './RotaPrivada.jsx';
import { CHAVE_SESSAO } from '../../lib/auth-demo.js';

function TelaEntrar() {
  const location = useLocation();
  return <p>Tela de login (veio de {location.state?.de?.pathname})</p>;
}

function montar() {
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/estudio/favoritos']}>
        <Routes>
          <Route path="/entrar" element={<TelaEntrar />} />
          <Route element={<RotaPrivada />}>
            <Route path="/estudio/favoritos" element={<p>Área privada</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe('RotaPrivada', () => {
  it('sem login, redireciona para /entrar guardando a rota pedida', () => {
    montar();
    expect(screen.getByText('Tela de login (veio de /estudio/favoritos)')).toBeInTheDocument();
    expect(screen.queryByText('Área privada')).not.toBeInTheDocument();
  });

  it('com login, mostra a área privada', () => {
    localStorage.setItem(CHAVE_SESSAO, JSON.stringify({ email: 'demo@jovi.ai' }));
    montar();
    expect(screen.getByText('Área privada')).toBeInTheDocument();
  });
});
