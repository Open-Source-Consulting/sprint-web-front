import { Outlet } from 'react-router';
import { useRolagemDeRota } from '../hooks/useRolagemDeRota.js';

// Layout que envolve todas as rotas: tem o link "Pular para o conteúdo" e cuida da rolagem
// quando troca de página. Os layouts de dentro têm o <main id="conteudo">.
export default function LayoutRaiz() {
  useRolagemDeRota();

  return (
    <>
      <a
        href="#conteudo"
        className="fixed left-3 top-3 z-[999] -translate-y-[160%] rounded-sm bg-acento px-4 py-3 text-sm font-semibold text-white transition-transform focus-visible:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <Outlet />
    </>
  );
}
