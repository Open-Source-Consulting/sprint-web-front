import { NavLink, Outlet, useNavigate } from 'react-router';
import Icone from '../components/ui/Icone.jsx';
import Marca from '../components/ui/Marca.jsx';
import { useAuth } from '../hooks/useAuth.js';

const LINKS = [
  { para: '/estudio', rotulo: 'Catálogo', icone: 'grade', fim: true },
  { para: '/estudio/favoritos', rotulo: 'Favoritos', icone: 'coracao' },
  { para: '/estudio/nova', rotulo: 'Nova receita', icone: 'mais' },
];

function classeLink({ isActive }) {
  const base =
    'inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md px-2.5 font-titulo text-[0.9375rem] font-semibold transition-colors duration-150 focus-visible:-outline-offset-2 sm:px-3';
  return isActive
    ? `${base} bg-white/8 text-sobre-noite`
    : `${base} text-sobre-noite-suave hover:bg-white/5 hover:text-sobre-noite`;
}

// Layout da área privada (/estudio): barra com navegação, usuário e botão Sair.
export default function LayoutEstudio() {
  const { usuario, sair } = useAuth();
  const navigate = useNavigate();

  // Primeiro vai para a página inicial e só depois sai da conta. Se sair antes, a RotaPrivada
  // vê que não tem usuário e manda para /entrar. O flushSync faz a troca de página na hora.
  function aoSair() {
    navigate('/', { replace: true, flushSync: true });
    sair();
  }

  return (
    <div className="flex min-h-dvh flex-col bg-papel">
      <header data-tom="escuro" className="sticky top-0 z-50 border-b border-linha-noite bg-noite/95 text-sobre-noite backdrop-blur-md">
        <div className="container-site flex min-h-17 flex-wrap items-center gap-x-6 gap-y-1 py-2">
          <Marca para="/" rotulo="JOVI AI — voltar à página inicial" className="min-h-11" />

          <nav aria-label="Estúdio" className="order-last -mx-3 flex w-[calc(100%+1.5rem)] gap-1 overflow-x-auto px-3 pb-1 md:order-none md:mx-0 md:w-auto md:px-0 md:pb-0">
            {LINKS.map((link) => (
              <NavLink key={link.para} to={link.para} end={link.fim} className={classeLink}>
                {/* No celular os ícones somem para os três links caberem na tela. */}
                <Icone nome={link.icone} className="hidden size-4.5 min-[420px]:block" />
                {link.rotulo}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden items-center gap-2 text-sm text-sobre-noite-suave lg:inline-flex">
              <Icone nome="usuario" className="size-4.5" />
              {usuario?.email}
            </span>
            <button
              type="button"
              onClick={aoSair}
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/22 px-3.5 font-titulo text-sm font-semibold text-sobre-noite transition-colors hover:border-white/38 hover:bg-white/7"
            >
              <Icone nome="sair" className="size-4.5" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="border-b border-aviso/20 bg-aviso-suave text-aviso">
        <p className="container-site flex items-start gap-2 py-2.5 text-sm">
          <Icone nome="info" className="mt-0.5 size-4" />
          <span>
            <strong className="font-semibold">Área de demonstração.</strong> Receitas, favoritos e notas
            ficam numa API pública, compartilhada com quem usa o site.
          </span>
        </p>
      </div>

      <main id="conteudo" tabIndex={-1} className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-linha py-6 text-sm text-tinta-suave">
        <p className="container-site">
          JOVI AI · Estúdio de receitas de foto · Projeto acadêmico da Open Source Consulting. As
          receitas sugerem ajustes; nenhuma configuração é enviada a uma câmera real.
        </p>
      </footer>
    </div>
  );
}
