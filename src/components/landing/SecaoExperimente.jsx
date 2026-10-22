import { useState } from 'react';
import Botao from '../ui/Botao.jsx';
import CabecalhoSecao from '../ui/CabecalhoSecao.jsx';
import { GradeReceitas } from '../ui/CartaoReceita.jsx';
import { CampoTexto } from '../ui/Campos.jsx';
import { Carregando, EstadoErro, EstadoVazio } from '../ui/Estados.jsx';
import Icone from '../ui/Icone.jsx';
import Selo from '../ui/Selo.jsx';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useReceitas } from '../../hooks/useReceitas.js';

const ATALHOS = ['retrato', 'noite', 'comida', 'pôr do sol', 'cachorro', 'documento'];

// Parte da landing que usa a API sem precisar de login: busca receitas pelo que a pessoa
// digita e mostra até 3. Com o campo vazio, mostra as 3 primeiras do catálogo.
export default function SecaoExperimente() {
  const [termo, setTermo] = useState('');
  // Espera 300 ms sem digitar antes de buscar, para não fazer uma requisição por tecla.
  const termoAtrasado = useDebounce(termo, 300);
  const lista = useReceitas({ busca: termoAtrasado, limite: 3 });

  let resultado;
  if (lista.carregando) {
    resultado = <Carregando texto="Buscando receitas…" />;
  } else if (lista.erro) {
    resultado = <EstadoErro mensagem={lista.erro} aoTentarNovamente={lista.tentarNovamente} />;
  } else if (lista.vazio) {
    resultado = (
      <EstadoVazio
        titulo="Nenhuma receita para esse objetivo"
        texto="Tente outra palavra, como retrato, noite ou comida."
        acao={
          <Botao variante="secundario" tamanho="sm" onClick={() => setTermo('')}>
            Limpar busca
          </Botao>
        }
      />
    );
  } else {
    resultado = <GradeReceitas receitas={lista.receitas} />;
  }

  return (
    <section id="experimente" className="secao-y bg-papel-alt">
      <div className="container-site">
        <CabecalhoSecao
          titulo="Experimente: encontre uma receita de foto"
          acessorio={<Selo variante="demo">Funciona nesta demo · dados do MockAPI</Selo>}
        >
          Digite o que você quer fotografar em uma ou duas palavras. A busca consulta o catálogo de
          receitas da API de demonstração.
        </CabecalhoSecao>

        <div className="max-w-2xl">
          <CampoTexto
            id="experimente-busca"
            type="search"
            rotulo="O que você quer fotografar?"
            placeholder="Ex.: retrato, noite, comida"
            autoComplete="off"
            value={termo}
            onChange={(evento) => setTermo(evento.target.value)}
          />

          <p className="mt-4 text-sm text-tinta-suave">Ou escolha um exemplo:</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {ATALHOS.map((atalho) => {
              const ativo = termo === atalho;
              return (
                <button
                  key={atalho}
                  type="button"
                  aria-pressed={ativo}
                  // Clicar no exemplo que já está escolhido limpa a busca.
                  onClick={() => setTermo(ativo ? '' : atalho)}
                  className={`inline-flex min-h-11 items-center rounded-full border px-4 font-titulo text-sm font-semibold transition-colors duration-150 ${
                    ativo
                      ? 'border-acento bg-acento text-white'
                      : 'border-linha-forte bg-carta text-tinta-media hover:border-acento/50 hover:text-acento-texto'
                  }`}
                >
                  {atalho}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10">{resultado}</div>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Botao para="/estudio" icone="seta" iconeDepois className="shrink-0">
            Ver o catálogo completo no Estúdio
          </Botao>
          <p className="flex items-start gap-2 text-sm text-tinta-suave">
            <Icone nome="cadeado" className="mt-0.5 size-4" />
            <span>Abrir uma receita leva ao login de demonstração (os dados de acesso estão na tela).</span>
          </p>
        </div>
      </div>
    </section>
  );
}
