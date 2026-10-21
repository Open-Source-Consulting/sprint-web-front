import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

// Pega o aviso que a página anterior mandou no navigate (state.aviso), ex.: "Receita criada.".
// Depois limpa o state, para o aviso não aparecer de novo ao recarregar ou voltar.
export function useAvisoDaRota() {
  const location = useLocation();
  const navigate = useNavigate();
  const [aviso] = useState(location.state?.aviso ?? null);

  useEffect(() => {
    if (location.state?.aviso) {
      navigate(location.pathname + location.search, { replace: true, state: null });
    }
  }, [location, navigate]);

  return aviso;
}
