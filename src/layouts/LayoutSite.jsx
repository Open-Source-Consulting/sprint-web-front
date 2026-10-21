import { Outlet } from 'react-router';
import Cabecalho from '../components/landing/Cabecalho.jsx';
import Rodape from '../components/landing/Rodape.jsx';

// Layout das páginas públicas: landing, login e 404.
export default function LayoutSite() {
  return (
    <>
      <Cabecalho />
      <main id="conteudo" tabIndex={-1}>
        <Outlet />
      </main>
      <Rodape />
    </>
  );
}
