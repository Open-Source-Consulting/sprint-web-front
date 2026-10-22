import Botao from '../ui/Botao.jsx';
import CabecalhoSecao from '../ui/CabecalhoSecao.jsx';
import Icone from '../ui/Icone.jsx';
import Selo from '../ui/Selo.jsx';
import { TELA_AUTOMATICO_OTIMIZACAO, TELA_GUIADO_PASSOS } from '../../data/telas.js';

const MODOS = [
  {
    titulo: 'Modo Guiado',
    icone: 'guiado',
    lema: 'Você aprende e mantém o controle.',
    texto:
      'O agente fornece instruções curtas, sequenciais e em linguagem simples para que você mesmo faça os ajustes. Nenhuma configuração é aplicada automaticamente: o controle permanece integralmente com o usuário, e o fluxo termina com a câmera pronta para uso manual.',
    tela: TELA_GUIADO_PASSOS,
  },
  {
    titulo: 'Modo Automático',
    icone: 'automatico',
    lema: 'Você descreve. A IA configura.',
    texto:
      'Com sua autorização prévia, o agente aplica as configurações consideradas adequadas a partir da intenção declarada e da análise da cena. Ao final, os parâmetros aplicados são listados de forma transparente e a câmera fica pronta: basta pressionar o disparador.',
    tela: TELA_AUTOMATICO_OTIMIZACAO,
  },
];

export default function SecaoModos() {
  return (
    <section
      id="modos"
      data-tom="escuro"
      aria-labelledby="titulo-modos"
      className="secao-y bg-noite text-sobre-noite"
    >
      <div className="container-site">
        <CabecalhoSecao
          id="titulo-modos"
          tom="escuro"
          titulo="Dois modos. Você escolhe quanto controle entregar."
          acessorio={
            <Selo variante="conceito" tom="escuro">
              Conceito da proposta
            </Selo>
          }
        >
          Fora do modo automático, o agente não altera nada sem autorização explícita. Aceitar ou
          recusar cada sugestão é sempre decisão do usuário.
        </CabecalhoSecao>

        <div className="grid gap-6 min-[900px]:grid-cols-2 min-[900px]:gap-8">
          {MODOS.map((modo) => (
            <article
              key={modo.titulo}
              className="grid min-w-0 grid-rows-[1fr_auto] gap-8 rounded-lg border border-linha-noite bg-noite-alt p-[clamp(1.5rem,1rem+2vw,2.5rem)] shadow-noite transition-[translate,border-color] duration-300 ease-saida hover:-translate-y-0.5 hover:border-acento-claro/30"
            >
              <div>
                <Icone nome={modo.icone} className="size-7 text-acento-claro" />
                <h3 className="mt-4 text-[clamp(1.35rem,1.1rem+1vw,1.75rem)] font-bold">{modo.titulo}</h3>
                <p className="mt-2 text-[1.0625rem] font-semibold text-acento-claro">{modo.lema}</p>
                <p className="mt-4 max-w-[48ch] leading-relaxed text-sobre-noite-media">{modo.texto}</p>
              </div>

              <figure className="mx-auto w-full max-w-60 overflow-hidden rounded-md border border-linha-noite bg-noite shadow-noite">
                <img
                  src={modo.tela.imagem}
                  alt={modo.tela.alt}
                  width={modo.tela.largura}
                  height={modo.tela.altura}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </figure>
            </article>
          ))}
        </div>

        {/* Faixa com o link para ver os dois modos funcionando no Estúdio. */}
        <div className="mt-12 flex flex-col items-start gap-4 border-t border-linha-noite pt-8 lg:flex-row lg:items-center lg:gap-6">
          <Selo variante="demo" tom="escuro" className="shrink-0">
            Funciona nesta demo
          </Selo>
          <p className="min-w-0 max-w-[62ch] flex-1 text-sobre-noite-media">
            No Estúdio desta demonstração, cada receita mostra os dois modos: os passos do Guiado e o
            resumo do que o Automático faria.
          </p>
          <Botao variante="fantasma" para="/estudio" icone="seta" iconeDepois className="shrink-0 lg:ml-auto">
            Ver no Estúdio
          </Botao>
        </div>
      </div>
    </section>
  );
}
