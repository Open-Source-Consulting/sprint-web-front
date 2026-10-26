import Botao from '../ui/Botao.jsx';
import { TELA_CAMERA } from '../../data/telas.js';

// Cantos do "visor" da câmera em volta do celular.
const CANTONEIRAS = [
  'left-0 top-0 border-l-[1.5px] border-t-[1.5px]',
  'right-0 top-0 border-r-[1.5px] border-t-[1.5px]',
  'bottom-0 left-0 border-b-[1.5px] border-l-[1.5px]',
  'bottom-0 right-0 border-b-[1.5px] border-r-[1.5px]',
];

export default function Hero() {
  return (
    <section
      data-tom="escuro"
      aria-labelledby="titulo-hero"
      className="secao-y overflow-hidden bg-noite text-sobre-noite"
    >
      <div className="container-site grid items-center gap-[clamp(2.75rem,2rem+4vw,4.5rem)] min-[900px]:grid-cols-[1.15fr_0.85fr]">
        <div className="min-w-0">
          {/* O animationDelay faz cada parte aparecer um pouco depois da outra. */}
          <h1
            id="titulo-hero"
            className="animate-focar font-titulo text-display font-extrabold text-sobre-noite"
            style={{ animationDelay: '60ms' }}
          >
            Descreva a foto.{' '}
            <br className="hidden sm:inline" />A <span className="whitespace-nowrap">JOVI AI</span> prepara{' '}
            <span className="whitespace-nowrap">a câmera.</span>
          </h1>

          <p
            className="mt-5 max-w-[46ch] animate-focar text-lead text-sobre-noite-suave"
            style={{ animationDelay: '150ms' }}
          >
            Um agente de inteligência artificial integrado à câmera do smartphone JOVI. Você diz o
            que quer fotografar, por texto ou por voz, e ele interpreta sua intenção, analisa a cena
            e indica os ajustes certos. Sem termos técnicos.
          </p>

          <div className="mt-8 flex animate-focar flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
            <Botao para="/#experimente" icone="seta" iconeDepois>
              Experimentar agora
            </Botao>
            <Botao variante="fantasma" para="/estudio">
              Entrar no Estúdio
            </Botao>
          </div>

          <p
            className="mt-6 max-w-[52ch] animate-focar text-sm text-sobre-noite-fraca"
            style={{ animationDelay: '320ms' }}
          >
            Proposta acadêmica para o Challenge JOVI: voz, análise de cena e ajuste automático da
            câmera são conceito. O Estúdio funciona com receitas de demonstração.
          </p>
        </div>

        <div className="mx-auto w-full max-w-68 sm:max-w-84 min-[900px]:mr-0 min-[900px]:max-w-92">
          <div className="relative p-[clamp(0.85rem,2vw,1.15rem)]">
            {CANTONEIRAS.map((posicao) => (
              <span
                key={posicao}
                aria-hidden="true"
                className={`absolute size-[22px] border-acento-claro ${posicao}`}
              />
            ))}

            <div
              className="animate-focar rounded-xl bg-linear-160 from-noite-borda via-noite-alt via-55% to-noite-elev p-[7px] shadow-celular"
              style={{ animationDelay: '120ms' }}
            >
              <img
                src={TELA_CAMERA.imagem}
                alt={TELA_CAMERA.alt}
                width={TELA_CAMERA.largura}
                height={TELA_CAMERA.altura}
                fetchPriority="high"
                className="block h-auto w-full rounded-[23px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
