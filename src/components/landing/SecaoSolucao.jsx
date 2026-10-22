import CabecalhoSecao from '../ui/CabecalhoSecao.jsx';
import Selo from '../ui/Selo.jsx';

const CONSEQUENCIAS = [
  'Dificuldade para configurar a câmera',
  'Perda de tempo antes da captura',
  'Resultados abaixo do esperado',
  'Frustração durante o uso',
  'Subutilização dos recursos do aparelho',
];

const CLASSE_PAINEL = 'min-w-0 rounded-lg p-[clamp(1.5rem,1rem+2vw,2.5rem)]';

export default function SecaoSolucao() {
  return (
    <section id="solucao" aria-labelledby="titulo-solucao" className="secao-y bg-papel">
      <div className="container-site">
        <CabecalhoSecao
          id="titulo-solucao"
          titulo={
            <>
              O problema não é a câmera.
              <br />É saber usá-la.
            </>
          }
        >
          As câmeras dos smartphones evoluíram muito: HDR, modo noturno, panorama, retrato,
          profissional. Os recursos já estão no aparelho. O que falta é alguém para dizer qual usar,
          e quando.
        </CabecalhoSecao>

        <div className="grid items-start gap-6 min-[900px]:grid-cols-2 min-[900px]:gap-8">
          <article className={`${CLASSE_PAINEL} border border-linha bg-carta shadow-suave`}>
            <h3 className="text-h3 font-bold text-tinta">O problema</h3>
            <p className="mt-4 max-w-[58ch] text-tinta-suave">
              A quantidade de modos e configurações, somada à ausência de um guia de uso, dificulta a
              vida de usuários iniciantes e intermediários. O resultado aparece em cinco
              consequências diretas:
            </p>
            <ul className="mt-6">
              {CONSEQUENCIAS.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 border-t border-linha py-3 text-[0.9375rem] font-semibold text-tinta-media"
                >
                  <span aria-hidden="true" className="size-[5px] shrink-0 -translate-y-0.5 rounded-full bg-acento" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article data-tom="escuro" className={`${CLASSE_PAINEL} bg-noite text-sobre-noite shadow-media`}>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-h3 font-bold">A solução</h3>
              <Selo variante="conceito" tom="escuro">
                Conceito da proposta
              </Selo>
            </div>
            <p className="mt-4 max-w-[58ch] text-sobre-noite-suave">
              A JOVI AI funciona como uma{' '}
              <strong className="text-sobre-noite">
                ponte entre o usuário e os recursos avançados da câmera
              </strong>
              . Você explica o que deseja fotografar, em linguagem natural, e a IA encontra a
              configuração adequada.
            </p>
            <p className="mt-4 max-w-[58ch] text-sobre-noite-suave">
              Mais do que ajustar, ela explica o motivo de cada escolha em linguagem simples, de modo
              que o usuário aprenda os recursos enquanto os utiliza, em vez de depender da automação
              para sempre.
            </p>
            <p className="mt-6 border-t border-linha-noite pt-6 text-sm font-semibold leading-relaxed text-acento-claro">
              A intenção declarada pelo usuário permanece prioritária em toda a decisão do agente.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
