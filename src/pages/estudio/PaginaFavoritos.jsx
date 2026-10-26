import Botao from '../../components/ui/Botao.jsx';
import ListaPaginada from '../../components/estudio/ListaPaginada.jsx';
import { useReceitas } from '../../hooks/useReceitas.js';
import { useTituloPagina } from '../../hooks/useTituloPagina.js';

// /estudio/favoritos: receitas com favorita = true na API.
export default function PaginaFavoritos() {
  useTituloPagina('Favoritos');
  const lista = useReceitas({ favorita: true, limite: 6 });

  return (
    <div className="container-site py-10 sm:py-14">
      <div className="max-w-2xl">
        <h1 className="font-titulo text-3xl font-bold text-tinta sm:text-4xl">Favoritos</h1>
        <p className="mt-3 text-lead text-tinta-suave">
          Receitas marcadas com o coração. Os favoritos ficam na API pública da demonstração e são
          compartilhados com quem usa o site.
        </p>
      </div>

      <div className="mt-8 sm:mt-10">
        <ListaPaginada
          lista={lista}
          vazio={{
            titulo: 'Nenhuma receita favorita ainda',
            texto: 'Abra uma receita e use o botão Favorita para guardá-la aqui.',
            icone: 'coracao',
            acao: (
              <Botao para="/estudio" icone="grade">
                Ver o catálogo
              </Botao>
            ),
          }}
        />
      </div>
    </div>
  );
}
