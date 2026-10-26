import { useState } from 'react';
import Selo from '../ui/Selo.jsx';
import { Rotulo } from '../ui/Campos.jsx';
import { Carregando, EstadoErro } from '../ui/Estados.jsx';
import CartaoReceita from '../ui/CartaoReceita.jsx';
import { useSugestaoReceita } from '../../hooks/useSugestaoReceita.js';

const EXEMPLOS = [
  'meu cachorro correndo no parque',
  'jantar com amigos num restaurante',
  'pôr do sol na praia',
  'foto de um documento',
];

// "Descreva a foto": a pessoa escreve o que quer fotografar e mostramos até 3 receitas.
// A comparação é por palavras-chave (useSugestaoReceita), não usa IA.
export default function DescrevaAFoto({ className = '' }) {
  const [texto, setTexto] = useState('');
  const { termos, sugestoes, carregando, erro, recarregar } = useSugestaoReceita(texto);

  // Escolhe o que mostrar embaixo do bloco escuro.
  let resultado;
  if (erro) {
    resultado = (
      <EstadoErro
        titulo="Não foi possível carregar o catálogo para sugerir"
        mensagem={erro}
        aoTentarNovamente={recarregar}
      />
    );
  } else if (termos.length === 0) {
    resultado = (
      <p className="text-tinta-suave">
        Escreva o que você quer fotografar ou escolha um exemplo. As receitas que mais combinarem
        aparecem aqui.
      </p>
    );
  } else if (carregando) {
    resultado = <Carregando texto="Carregando o catálogo…" className="py-0" />;
  } else if (sugestoes.length === 0) {
    resultado = (
      <p className="text-tinta-suave">
        Nenhuma receita combina com essas palavras. Tente termos como retrato, noite, comida ou movimento.
      </p>
    );
  } else {
    resultado = (
      <>
        <p className="mb-4 text-sm text-tinta-suave">
          Palavras consideradas: <span className="font-semibold text-tinta">{termos.join(', ')}</span>
        </p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sugestoes.map((item) => (
            <li key={item.receita.id}>
              <CartaoReceita receita={item.receita}>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-sm text-tinta-suave">Combinou com:</span>
                  {item.combinados.map((palavra) => (
                    <Selo key={palavra}>{palavra}</Selo>
                  ))}
                </div>
              </CartaoReceita>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <section className={className}>
      <div
        data-tom="escuro"
        className="grid gap-6 rounded-xl bg-noite p-6 text-sobre-noite shadow-noite sm:p-8 lg:grid-cols-[5fr_7fr] lg:gap-10"
      >
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h2 className="font-titulo text-2xl font-bold sm:text-[1.75rem]">Descreva a foto que você quer</h2>
            <Selo variante="demo" tom="escuro">
              Sugestão por palavras-chave
            </Selo>
          </div>
          <p className="mt-3 max-w-[52ch] text-sobre-noite-media">
            Comparamos as palavras do seu texto com as palavras-chave de cada receita. Não há IA
            analisando a cena nesta demonstração.
          </p>
        </div>

        <div className="min-w-0">
          {/* O fundo aqui é escuro, então o rótulo usa a cor clara. */}
          <Rotulo htmlFor="texto-descreva" className="text-sobre-noite!">
            O que você quer fotografar?
          </Rotulo>
          <textarea
            id="texto-descreva"
            rows={3}
            maxLength={200}
            value={texto}
            onChange={(evento) => setTexto(evento.target.value)}
            placeholder="Ex.: quero fotografar meu cachorro correndo no parque"
            className="block min-h-24 w-full resize-y rounded-md border border-white/40 bg-noite-alt px-4 py-3 text-base text-sobre-noite hover:border-white/55 focus:border-acento-claro focus:outline-hidden"
          />

          <p className="mt-4 text-sm text-sobre-noite-suave">Ou experimente um exemplo:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {EXEMPLOS.map((exemplo) => (
              <button
                key={exemplo}
                type="button"
                onClick={() => setTexto(exemplo)}
                className="min-h-11 rounded-full border border-white/15 bg-white/5 px-3.5 text-left text-sm text-sobre-noite-media transition-colors duration-150 hover:border-white/30 hover:text-sobre-noite"
              >
                {exemplo}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">{resultado}</div>
    </section>
  );
}
