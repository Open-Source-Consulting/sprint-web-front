import { useState } from 'react';
import CabecalhoSecao from '../ui/CabecalhoSecao.jsx';
import Icone from '../ui/Icone.jsx';
import Lightbox from './Lightbox.jsx';
import { TELAS } from '../../data/telas.js';

// Classes de cada formato de tela (ver "formato" em src/data/telas.js).
// Celular: 1 coluna. Tablet (md): 2 colunas. Desktop (lg): 4 colunas.
const FORMATOS = {
  // ocupa 2 colunas e, no desktop, 2 linhas
  destaque: {
    figura: 'flex flex-col md:col-span-2 lg:row-span-2',
    botao: 'flex-1 border-b',
    imagem: 'max-h-88 md:max-h-[26rem] lg:max-h-[42rem]',
    titulo: 'lg:text-xl',
    legenda: '',
  },
  // ocupa 2 colunas, com a imagem à esquerda e o texto à direita
  larga: {
    figura: 'flex flex-col md:col-span-2 md:grid md:grid-cols-[13rem_1fr]',
    botao: 'border-b md:border-b-0 md:border-r',
    imagem: 'max-h-88 md:max-h-72',
    titulo: '',
    legenda: 'md:self-center',
  },
  // ocupa 1 coluna (no desktop a imagem tem altura fixa para os cartões ficarem alinhados)
  normal: {
    figura: 'flex flex-col',
    botao: 'border-b lg:h-80',
    imagem: 'max-h-88 lg:max-h-68',
    titulo: 'lg:min-h-[2.5em]',
    legenda: '',
  },
};

function CartaoTela({ tela, aoAmpliar }) {
  const formato = FORMATOS[tela.formato];
  // A última tela larga ficaria sozinha em meia linha, então ela ocupa a linha inteira.
  const linhaInteira = tela.linhaInteira ? 'lg:col-span-4' : '';

  return (
    <figure
      className={`group min-w-0 overflow-hidden rounded-lg border border-linha-noite bg-noite-alt shadow-noite transition duration-200 hover:-translate-y-0.5 hover:border-acento-claro/35 ${formato.figura} ${linhaInteira}`}
    >
      <button
        type="button"
        onClick={() => aoAmpliar(tela)}
        aria-label={`Ampliar imagem: ${tela.titulo}`}
        className={`relative grid w-full cursor-zoom-in place-items-center border-linha-noite bg-noite p-5 ${formato.botao}`}
      >
        <img
          src={tela.imagem}
          alt={tela.alt}
          width={tela.largura}
          height={tela.altura}
          loading="lazy"
          className={`h-auto w-auto max-w-full rounded-sm ${formato.imagem}`}
        />
        {/* Ícone de lupa no canto da imagem */}
        <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full border border-linha-noite bg-noite/75 text-sobre-noite">
          <Icone nome="ampliar" className="size-4.5" />
        </span>
      </button>

      <figcaption className={`p-5 ${formato.legenda}`}>
        <h3 className={`font-titulo text-base font-bold text-sobre-noite ${formato.titulo}`}>{tela.titulo}</h3>
        <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-sobre-noite-suave">{tela.texto}</p>
      </figcaption>
    </figure>
  );
}

export default function SecaoGaleria() {
  // Tela que está ampliada no Lightbox (null = nenhuma).
  const [telaAberta, setTelaAberta] = useState(null);

  return (
    <section id="galeria" data-tom="escuro" className="secao-y bg-noite text-sobre-noite">
      <div className="container-site">
        <CabecalhoSecao titulo="A solução por dentro" tom="escuro">
          As telas do protótipo do aplicativo, na ordem em que o usuário as encontra. Clique em
          qualquer imagem para ampliar.
        </CabecalhoSecao>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {TELAS.map((tela) => (
            <CartaoTela key={tela.id} tela={tela} aoAmpliar={setTelaAberta} />
          ))}
        </div>
      </div>

      <Lightbox tela={telaAberta} aoFechar={() => setTelaAberta(null)} />
    </section>
  );
}
