import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Cuida da rolagem quando troca de página.
// Se o link tem âncora (ex.: /#galeria), rola até a seção. Se não tem, volta para o topo.
export function useRolagemDeRota() {
  // A key muda a cada navegação, então clicar de novo no mesmo link também rola.
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const secao = document.getElementById(hash.slice(1));
      if (secao) {
        secao.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, key]);
}
