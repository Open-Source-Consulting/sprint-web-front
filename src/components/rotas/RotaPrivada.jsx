import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth.js';

// Protege as rotas de /estudio. Sem login, manda para /entrar e guarda a rota pedida
// em state.de, para voltar a ela depois do login.
// A proteção é só na interface: os dados da API continuam públicos.
export default function RotaPrivada({ children }) {
  const { autenticado } = useAuth();
  const location = useLocation();

  if (!autenticado) {
    return <Navigate to="/entrar" replace state={{ de: location }} />;
  }

  return children || <Outlet />;
}
