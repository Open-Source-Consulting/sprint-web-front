import { Link } from 'react-router';
import CabecalhoSecao from '../ui/CabecalhoSecao.jsx';
import Icone from '../ui/Icone.jsx';
import Selo from '../ui/Selo.jsx';

// O que o aplicativo faria (só proposta, nada disso está implementado).
const FUNCIONALIDADES = [
  {
    icone: 'texto',
    titulo: 'Entrada por texto',
    texto:
      'Digite em linguagem natural o que deseja fotografar; o agente interpreta a intenção e recomenda um modo compatível.',
  },
  {
    icone: 'voz',
    titulo: 'Entrada por voz',
    texto:
      'Fale o objetivo da captura quando não der para digitar. O sistema converte a fala em intenção e sugere o modo adequado.',
  },
  {
    icone: 'cena',
    titulo: 'Análise de cena por imagem',
    texto:
      'A partir de frames da câmera, a IA avalia iluminação, contraste, sujeito e contexto antes de recomendar.',
  },
  {
    icone: 'passos',
    titulo: 'Orientação de ajustes',
    texto: 'Instruções claras e sequenciais para que você mesmo realize os ajustes, no seu ritmo.',
  },
  {
    icone: 'sugestao',
    titulo: 'Sugestão automática por contexto',
    texto:
      'O agente identifica o ambiente e sugere configurações sem interromper a experiência. Aceitar ou ignorar é com você.',
  },
  {
    icone: 'explicacao',
    titulo: 'Explicação dos modos',
    texto:
      'Pergunte o que cada modo faz e receba uma explicação simples com exemplo prático, sem sair da câmera.',
  },
];

// O que dá para testar de verdade neste site.
const NA_DEMO = [
  { rotulo: 'Busca de receitas nesta página', para: '/#experimente' },
  { rotulo: 'Catálogo com busca, filtros e paginação', para: '/estudio' },
  { rotulo: '“Descreva a foto” com sugestão por palavras-chave', para: '/estudio' },
  { rotulo: 'Modo Guiado e Modo Automático em cada receita', para: '/estudio' },
  { rotulo: 'Favoritos e notas', para: '/estudio/favoritos' },
  { rotulo: 'Receitas próprias: criar, editar e apagar', para: '/estudio/nova' },
  { rotulo: 'Login de demonstração', para: '/entrar' },
];

export default function SecaoPropostaDemo() {
  return (
    <section id="funcionalidades" aria-labelledby="titulo-funcionalidades" className="secao-y bg-papel-alt">
      <div className="container-site">
        <CabecalhoSecao id="titulo-funcionalidades" titulo="O que é proposta e o que já funciona aqui">
          A JOVI AI é uma proposta de produto. Esta página separa o que o aplicativo faria do que você
          pode testar agora.
        </CabecalhoSecao>

        <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-h3 font-bold text-tinta">Na proposta do produto</h3>
              <Selo variante="conceito">Conceito</Selo>
            </div>
            <ul className="mt-5 border-t border-linha">
              {FUNCIONALIDADES.map((item) => (
                <li key={item.titulo} className="flex gap-4 border-b border-linha py-5">
                  <Icone nome={item.icone} className="mt-0.5 size-5 text-acento" />
                  <div className="min-w-0">
                    <h4 className="font-titulo text-base font-semibold text-tinta">{item.titulo}</h4>
                    <p className="mt-1 max-w-[60ch] text-[0.9375rem] text-tinta-suave">{item.texto}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* No desktop o painel acompanha a rolagem ao lado da lista (sticky). */}
          <div
            data-tom="escuro"
            className="min-w-0 rounded-lg bg-noite p-[clamp(1.5rem,1rem+2vw,2.25rem)] text-sobre-noite shadow-media lg:sticky lg:top-24"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-h3 font-bold">Nesta demonstração</h3>
              <Selo variante="demo" tom="escuro">
                Funciona agora
              </Selo>
            </div>
            <ul className="mt-4">
              {NA_DEMO.map((item) => (
                <li key={item.rotulo} className="border-b border-linha-noite last:border-b-0">
                  <Link
                    to={item.para}
                    className="group flex min-h-12 items-start gap-3 py-3 text-sobre-noite-media transition-colors duration-150 hover:text-sobre-noite"
                  >
                    <Icone nome="check" className="mt-0.5 size-5 text-acento-claro" />
                    <span className="min-w-0 flex-1 break-words">{item.rotulo}</span>
                    <Icone
                      nome="seta"
                      className="mt-1 size-4 text-sobre-noite-fraca transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-acento-claro"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-linha-noite pt-4 text-sm text-sobre-noite-suave">
              As páginas do Estúdio pedem o login de demonstração.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
