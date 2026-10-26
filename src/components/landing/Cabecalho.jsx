import { useState } from 'react';
import { Link } from 'react-router';
import Marca from '../ui/Marca.jsx';
import Botao from '../ui/Botao.jsx';
import Icone from '../ui/Icone.jsx';
import { useAuth } from '../../hooks/useAuth.js';

// Os links usam "/#id" para funcionar de qualquer página (o useRolagemDeRota rola até a seção).
const LINKS = [
  { id: 'solucao', rotulo: 'A Solução' },
  { id: 'modos', rotulo: 'Modos' },
  { id: 'experimente', rotulo: 'Experimente' },
  { id: 'galeria', rotulo: 'Galeria' },
  { id: 'equipe', rotulo: 'Equipe' },
  { id: 'contato', rotulo: 'Contato' },
];

// No celular (abaixo de 900px) a <nav> vira um menu que abre embaixo do cabeçalho.
// A animação de abrir é a mesma da Sprint 3: grid-template-rows de 0fr para 1fr.
const CLASSE_NAV =
  'absolute inset-x-0 top-full grid border-b border-linha-noite bg-noite shadow-noite transition-all duration-200 min-[900px]:visible min-[900px]:static min-[900px]:ml-auto min-[900px]:block min-[900px]:border-0 min-[900px]:bg-transparent min-[900px]:shadow-none';

// No desktop, o ::after é o sublinhado ciano que aparece no hover.
const CLASSE_LINK =
  'relative flex min-h-12 items-center font-titulo text-base font-semibold text-sobre-noite-suave transition-colors hover:text-sobre-noite min-[900px]:min-h-11 min-[900px]:text-[0.9375rem] after:absolute after:inset-x-0 after:bottom-2.5 after:hidden after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-acento-claro after:transition-transform hover:after:scale-x-100 min-[900px]:after:block';

export default function Cabecalho() {
  const { autenticado } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header
      data-tom="escuro"
      className="sticky top-0 z-50 border-b border-linha-noite bg-noite/95 text-sobre-noite backdrop-blur-md"
    >
      <div className="container-site flex h-17 items-center gap-2 min-[900px]:gap-8">
        <Marca para="/" className="min-h-11" />

        {/* Botão do menu do celular. O order-last coloca ele no fim da linha. */}
        <button
          type="button"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-expanded={menuAberto}
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          className="order-last -mr-1 inline-grid size-11 shrink-0 place-items-center rounded-sm border border-linha-noite text-sobre-noite hover:bg-white/6 min-[900px]:hidden"
        >
          <Icone nome={menuAberto ? 'fechar' : 'menu'} className="size-5" />
        </button>

        {/* Fechado, o menu fica "invisible" para os links não receberem foco pelo Tab. */}
        <nav
          aria-label="Navegação principal"
          className={`${CLASSE_NAV} ${menuAberto ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'}`}
        >
          <div className="min-h-0 overflow-hidden min-[900px]:overflow-visible">
            <ul className="container-site py-2 min-[900px]:flex min-[900px]:w-auto min-[900px]:max-w-none min-[900px]:items-center min-[900px]:gap-6 min-[900px]:px-0 min-[900px]:py-0">
              {LINKS.map((link) => (
                <li key={link.id} className="border-b border-linha-noite last:border-b-0 min-[900px]:border-b-0">
                  <Link to={`/#${link.id}`} onClick={() => setMenuAberto(false)} className={CLASSE_LINK}>
                    {link.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <Botao tamanho="sm" para={autenticado ? '/estudio' : '/entrar'} className="ml-auto shrink-0 min-[900px]:ml-0">
          {autenticado ? 'Abrir Estúdio' : 'Entrar'}
        </Botao>
      </div>
    </header>
  );
}
