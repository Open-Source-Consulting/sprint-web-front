import Botao from '../ui/Botao.jsx';
import { CampoTexto } from '../ui/Campos.jsx';
import { CATEGORIAS } from '../../lib/receita.js';

// "" significa todas as categorias.
const OPCOES = [{ valor: '', rotulo: 'Todas' }, ...CATEGORIAS];

// Busca e botões de categoria do catálogo.
// O estado fica na PaginaCatalogo, aqui só mostra os valores e avisa quando mudam.
export default function FiltrosCatalogo({ busca, aoMudarBusca, categoria, aoMudarCategoria, aoLimpar }) {
  const temFiltro = busca.trim() !== '' || categoria !== '';

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        <CampoTexto
          id="busca-catalogo"
          type="search"
          rotulo="Buscar no catálogo"
          placeholder="Ex.: noite, retrato, produto"
          dica="A busca ignora acentos."
          value={busca}
          onChange={(evento) => aoMudarBusca(evento.target.value)}
          autoComplete="off"
          enterKeyHint="search"
          className="lg:w-80 lg:shrink-0"
        />

        <div className="min-w-0 flex-1">
          <p id="rotulo-categorias" className="mb-2 font-titulo text-sm font-semibold text-tinta">
            Filtrar por categoria
          </p>
          {/* No celular os botões rolam para o lado (o -mx-5 com px-5 leva a rolagem até a borda).
              A partir do sm eles quebram linha. O py é para o contorno de foco não ser cortado. */}
          <div
            role="group"
            aria-labelledby="rotulo-categorias"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 py-1.5 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          >
            {OPCOES.map((opcao) => {
              const ativo = categoria === opcao.valor;
              return (
                <button
                  key={opcao.valor || 'todas'}
                  type="button"
                  aria-pressed={ativo}
                  onClick={() => aoMudarCategoria(opcao.valor)}
                  className={`inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-4 font-titulo text-sm font-semibold transition-colors duration-150 ${
                    ativo
                      ? 'border-noite bg-noite text-sobre-noite'
                      : 'border-linha bg-carta text-tinta-media hover:border-linha-forte hover:text-tinta'
                  }`}
                >
                  {opcao.rotulo}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {temFiltro && (
        <Botao variante="texto" icone="fechar" onClick={aoLimpar} className="mt-3 -ml-2">
          Limpar filtros
        </Botao>
      )}
    </div>
  );
}
