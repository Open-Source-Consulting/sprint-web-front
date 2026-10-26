import { useState } from 'react';
import Botao from '../../components/ui/Botao.jsx';
import { AvisoAcao } from '../../components/ui/Estados.jsx';
import DescrevaAFoto from '../../components/estudio/DescrevaAFoto.jsx';
import FiltrosCatalogo from '../../components/estudio/FiltrosCatalogo.jsx';
import ListaPaginada from '../../components/estudio/ListaPaginada.jsx';
import { useAvisoDaRota } from '../../hooks/useAvisoDaRota.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useReceitas } from '../../hooks/useReceitas.js';
import { useTituloPagina } from '../../hooks/useTituloPagina.js';

// /estudio: "Descreva a foto" + catálogo com busca, filtro por categoria e paginação.
export default function PaginaCatalogo() {
  useTituloPagina('Estúdio');
  const aviso = useAvisoDaRota();

  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState(''); // "" = todas
  // Espera 300 ms sem digitar antes de buscar, para não chamar a API a cada tecla.
  const buscaAtrasada = useDebounce(busca, 300);
  const lista = useReceitas({ busca: buscaAtrasada, categoria, limite: 6 });

  function limparFiltros() {
    setBusca('');
    setCategoria('');
  }

  return (
    <div className="container-site py-10 sm:py-14">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 max-w-2xl">
          <h1 className="font-titulo text-3xl font-bold text-tinta sm:text-4xl">Estúdio de receitas</h1>
          <p className="mt-3 text-lead text-tinta-suave">
            Escolha um objetivo de foto e veja os ajustes sugeridos nos modos Guiado e Automático.
          </p>
        </div>
        <Botao para="/estudio/nova" icone="mais" className="shrink-0 self-start sm:self-auto">
          Nova receita
        </Botao>
      </div>

      {/* Mensagem enviada por outra página (ex.: depois de apagar uma receita). */}
      {aviso && <AvisoAcao className="mt-6">{aviso}</AvisoAcao>}

      <DescrevaAFoto className="mt-8 sm:mt-10" />

      <section className="mt-14 sm:mt-20">
        <h2 className="mb-6 font-titulo text-2xl font-bold text-tinta sm:text-[1.75rem]">Catálogo</h2>

        <FiltrosCatalogo
          busca={busca}
          aoMudarBusca={setBusca}
          categoria={categoria}
          aoMudarCategoria={setCategoria}
          aoLimpar={limparFiltros}
        />

        <div className="mt-8">
          <ListaPaginada
            lista={lista}
            vazio={{
              titulo: 'Nenhuma receita para esse objetivo',
              texto: 'Tente outra palavra ou outra categoria.',
              acao: (
                <Botao variante="secundario" icone="fechar" onClick={limparFiltros}>
                  Limpar filtros
                </Botao>
              ),
            }}
          />
        </div>
      </section>
    </div>
  );
}
