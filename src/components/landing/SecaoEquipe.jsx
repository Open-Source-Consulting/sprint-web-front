import CabecalhoSecao from '../ui/CabecalhoSecao.jsx';
import CartaoIntegrante from './CartaoIntegrante.jsx';
import { EQUIPE } from '../../data/equipe.js';

export default function SecaoEquipe() {
  return (
    <section id="equipe" aria-labelledby="titulo-equipe" className="secao-y bg-papel">
      <div className="container-site">
        <CabecalhoSecao id="titulo-equipe" titulo="Nossa equipe">
          Open Source Consulting — os cinco integrantes responsáveis pela definição e modelagem da
          solução JOVI AI.
        </CabecalhoSecao>

        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {EQUIPE.map((integrante) => (
            <li key={integrante.rm}>
              <CartaoIntegrante nome={integrante.nome} rm={integrante.rm} funcao={integrante.funcao} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
