import { useLocation } from 'react-router';
import Botao from '../components/ui/Botao.jsx';
import { useTituloPagina } from '../hooks/useTituloPagina.js';

// Cantos do "visor" da câmera em volta do 404 (mesmo desenho do hero).
const CANTOS = [
  'left-0 top-0 border-l-[1.5px] border-t-[1.5px]',
  'right-0 top-0 border-r-[1.5px] border-t-[1.5px]',
  'bottom-0 left-0 border-b-[1.5px] border-l-[1.5px]',
  'bottom-0 right-0 border-b-[1.5px] border-r-[1.5px]',
];

// Página 404: qualquer endereço que não existe nas rotas.
export default function PaginaNaoEncontrada() {
  useTituloPagina('Página não encontrada');
  const location = useLocation();

  return (
    <section
      aria-labelledby="titulo-404"
      data-tom="escuro"
      className="flex min-h-[70vh] items-center bg-noite py-16 text-sobre-noite sm:py-24"
    >
      <div className="container-site flex flex-col items-center text-center">
        {/* O "404" é só visual: o h1 já diz que a página não existe. */}
        <div aria-hidden="true" className="relative px-8 py-4 sm:px-12 sm:py-6">
          {CANTOS.map((classes) => (
            <span key={classes} className={`absolute size-6 border-acento-claro/50 ${classes}`} />
          ))}
          <p className="font-titulo text-[5rem] font-extrabold leading-none tracking-[-0.04em] sm:text-[6rem]">404</p>
        </div>

        <h1
          id="titulo-404"
          className="mt-10 font-titulo text-3xl font-bold tracking-[-0.025em] text-sobre-noite sm:text-4xl"
        >
          Página não encontrada
        </h1>
        <p className="mt-4 max-w-[52ch] text-lead text-sobre-noite-suave">
          O endereço <strong className="break-all font-semibold text-sobre-noite">{location.pathname}</strong> não
          existe. Ele pode ter mudado ou sido digitado errado.
        </p>

        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Botao para="/" icone="voltar">
            Voltar para o início
          </Botao>
          <Botao variante="fantasma" para="/estudio">
            Abrir o Estúdio
          </Botao>
        </div>
      </div>
    </section>
  );
}