import Botao from '../ui/Botao.jsx';
import { Carregando, EstadoErro, EstadoVazio } from '../ui/Estados.jsx';
import { GradeReceitas } from '../ui/CartaoReceita.jsx';

// Mostra a lista que vem do useReceitas: carregando, erro, lista vazia ou os cartões
// com o botão "Carregar mais". "vazio" tem o título e o texto da lista vazia.
export default function ListaPaginada({ lista, vazio }) {
  if (lista.carregando) {
    return <Carregando texto="Carregando receitas…" />;
  }

  if (lista.erro) {
    return <EstadoErro mensagem={lista.erro} aoTentarNovamente={lista.tentarNovamente} />;
  }

  if (lista.vazio) {
    return <EstadoVazio {...vazio} />;
  }

  return (
    <div>
      <GradeReceitas receitas={lista.receitas} />

      <p className="mt-8 text-center text-sm text-tinta-suave">
        {lista.receitas.length === 1 ? '1 receita exibida' : `${lista.receitas.length} receitas exibidas`}
      </p>

      {lista.erroMais && (
        <EstadoErro
          titulo="Não foi possível carregar mais receitas"
          mensagem={lista.erroMais}
          aoTentarNovamente={lista.carregarMais}
          className="mt-4"
        />
      )}

      {lista.temMais && !lista.erroMais && (
        <div className="mt-4 flex justify-center">
          <Botao
            variante="secundario"
            icone="chevron-baixo"
            onClick={lista.carregarMais}
            disabled={lista.carregandoMais}
            className="w-full sm:w-auto"
          >
            {lista.carregandoMais ? 'Carregando…' : 'Carregar mais receitas'}
          </Botao>
        </div>
      )}

      {!lista.temMais && (
        <p className="mt-1 text-center text-sm text-tinta-suave">Você viu todas as receitas desta lista.</p>
      )}
    </div>
  );
}
