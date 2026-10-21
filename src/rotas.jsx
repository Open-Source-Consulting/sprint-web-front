import { createBrowserRouter } from 'react-router';
import LayoutRaiz from './layouts/LayoutRaiz.jsx';
import LayoutSite from './layouts/LayoutSite.jsx';
import LayoutEstudio from './layouts/LayoutEstudio.jsx';
import RotaPrivada from './components/rotas/RotaPrivada.jsx';
import PaginaInicial from './pages/PaginaInicial.jsx';
import PaginaEntrar from './pages/PaginaEntrar.jsx';
import PaginaNaoEncontrada from './pages/PaginaNaoEncontrada.jsx';
import PaginaErro from './pages/PaginaErro.jsx';
import PaginaCatalogo from './pages/estudio/PaginaCatalogo.jsx';
import PaginaFavoritos from './pages/estudio/PaginaFavoritos.jsx';
import PaginaDetalheReceita from './pages/estudio/PaginaDetalheReceita.jsx';
import PaginaNovaReceita from './pages/estudio/PaginaNovaReceita.jsx';
import PaginaEditarReceita from './pages/estudio/PaginaEditarReceita.jsx';

// Rotas do site. Públicas: /, /entrar e a página 404.
// Privadas: tudo que está em /estudio (precisa do login de demonstração).
export const roteador = createBrowserRouter([
  {
    path: '/',
    element: <LayoutRaiz />,
    errorElement: <PaginaErro />,
    children: [
      {
        element: <LayoutSite />,
        children: [
          { index: true, element: <PaginaInicial /> },
          { path: 'entrar', element: <PaginaEntrar /> },
          { path: '*', element: <PaginaNaoEncontrada /> },
        ],
      },
      {
        path: 'estudio',
        element: (
          <RotaPrivada>
            <LayoutEstudio />
          </RotaPrivada>
        ),
        children: [
          { index: true, element: <PaginaCatalogo /> },
          { path: 'favoritos', element: <PaginaFavoritos /> },
          { path: 'nova', element: <PaginaNovaReceita /> },
          { path: 'receitas/:id', element: <PaginaDetalheReceita /> },
          { path: 'receitas/:id/editar', element: <PaginaEditarReceita /> },
        ],
      },
    ],
  },
]);
