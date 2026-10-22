import CabecalhoSecao from '../ui/CabecalhoSecao.jsx';
import Selo from '../ui/Selo.jsx';

const ETAPAS = [
  {
    titulo: 'Diga o que deseja',
    texto:
      'Você descreve o objetivo da foto por texto ou por voz, em linguagem natural e sem se preocupar com termos técnicos.',
  },
  {
    titulo: 'A IA entende',
    texto:
      'O agente interpreta a intenção declarada e a mantém como prioridade durante todo o restante do processo.',
  },
  {
    titulo: 'A cena é analisada',
    texto:
      'Frames da câmera são analisados para identificar iluminação, contraste, sujeito e contexto do ambiente.',
  },
  {
    titulo: 'A câmera é preparada',
    texto:
      'A IA recomenda os ajustes ou, no modo automático autorizado, aplica-os e deixa a câmera pronta para a captura.',
  },
];

export default function SecaoComoFunciona() {
  return (
    <section id="como-funciona" aria-labelledby="titulo-como-funciona" className="secao-y bg-papel-alt">
      <div className="container-site">
        <CabecalhoSecao
          id="titulo-como-funciona"
          titulo="Como funciona"
          acessorio={<Selo variante="conceito">Conceito da proposta</Selo>}
        >
          Da intenção do usuário até a câmera pronta para o disparo, em quatro etapas.
        </CabecalhoSecao>

        {/* O <ol> já passa a ordem para o leitor de tela, por isso o número fica com aria-hidden. */}
        <ol className="grid sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-6">
          {ETAPAS.map((etapa, indice) => (
            <li
              key={etapa.titulo}
              className="relative min-w-0 border-t border-linha py-6 before:absolute before:-top-px before:left-0 before:h-px before:w-8 before:bg-acento"
            >
              <span
                aria-hidden="true"
                className="block font-titulo text-sm font-bold tracking-[0.1em] tabular-nums text-acento-texto"
              >
                {String(indice + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-h3 font-bold text-tinta">{etapa.titulo}</h3>
              <p className="mt-3 max-w-[34ch] text-[0.9375rem] text-tinta-suave">{etapa.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
