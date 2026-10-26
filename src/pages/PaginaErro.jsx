import { isRouteErrorResponse, useRouteError } from 'react-router';
import Botao from '../components/ui/Botao.jsx';
import Icone from '../components/ui/Icone.jsx';
import Marca from '../components/ui/Marca.jsx';
import { useTituloPagina } from '../hooks/useTituloPagina.js';

// Transforma o erro recebido do roteador em um texto para "Detalhes técnicos".
function textoDoErro(erro) {
  if (isRouteErrorResponse(erro)) return `${erro.status} ${erro.statusText}`;
  if (erro instanceof Error) return erro.message;
  return String(erro);
}

// errorElement da rota raiz: aparece quando alguma página dá erro.
// Ela aparece sem os layouts (sem cabeçalho e rodapé), por isso tem a própria marca e o próprio <main>.
export default function PaginaErro() {
  useTituloPagina('Erro');
  const erro = useRouteError();

  return (
    <div data-tom="escuro" className="flex min-h-dvh flex-col bg-noite text-sobre-noite">
      <header className="container-site py-6">
        <Marca para="/" className="min-h-11" />
      </header>

      <main id="conteudo" className="container-site flex flex-1 flex-col justify-center pb-16 pt-6">
        <div className="max-w-2xl">
          <h1 className="font-titulo text-3xl font-bold tracking-[-0.025em] sm:text-4xl">
            Algo deu errado ao abrir esta página
          </h1>
          <p className="mt-4 text-lead text-sobre-noite-suave">
            Pode ter sido uma falha passageira. Recarregue a página ou volte para o início.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Botao icone="recarregar" onClick={() => window.location.reload()}>
              Recarregar a página
            </Botao>
            {/* <a> comum (recarrega o site inteiro), caso o erro esteja no próprio roteador. */}
            <Botao variante="fantasma" href="/" icone="voltar">
              Voltar para o início
            </Botao>
          </div>

          <details className="group mt-10 border-t border-linha-noite pt-4">
            <summary className="inline-flex min-h-11 list-none items-center gap-2 font-titulo text-sm font-semibold text-sobre-noite-media hover:text-sobre-noite [&::-webkit-details-marker]:hidden">
              <Icone nome="chevron-baixo" className="size-4 transition-transform duration-150 group-open:rotate-180" />
              Detalhes técnicos
            </summary>
            <pre className="mt-3 max-h-60 overflow-auto whitespace-pre-wrap break-words rounded-md border border-linha-noite bg-noite-alt p-4 font-mono text-sm text-sobre-noite-media">
              {textoDoErro(erro)}
            </pre>
          </details>
        </div>
      </main>
    </div>
  );
}
