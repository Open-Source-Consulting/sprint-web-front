import { Link } from 'react-router';
import Icone from './Icone.jsx';
import Selo from './Selo.jsx';
import { rotuloCategoria, rotuloNivel } from '../../lib/receita.js';

// Cartão de uma receita. O cartão inteiro é um link para o detalhe.
// O children aparece embaixo (ex.: as palavras que combinaram no "Descreva a foto").
export default function CartaoReceita({ receita, children }) {
  const ajustes = [
    { rotulo: 'Modo', valor: receita.modoCamera },
    { rotulo: 'ISO', valor: receita.iso },
    { rotulo: 'Exposição', valor: receita.exposicao },
  ];

  return (
    <Link
      to={`/estudio/receitas/${receita.id}`}
      className="group flex h-full flex-col rounded-lg border border-linha bg-carta p-5 shadow-suave transition duration-200 hover:-translate-y-0.5 hover:border-linha-forte hover:shadow-media sm:p-6"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Selo variante="acento">{rotuloCategoria(receita.categoria)}</Selo>
        <Selo>{rotuloNivel(receita.nivel)}</Selo>
        {receita.origem === 'usuario' && <Selo variante="alerta">Criada no Estúdio</Selo>}
        {receita.favorita && (
          <span className="ml-auto text-acento">
            <Icone nome="coracao" preenchido className="size-4.5" titulo="Favorita" />
          </span>
        )}
      </div>

      <h3 className="mt-4 font-titulo text-h3 font-bold text-tinta group-hover:text-acento-forte">
        {receita.titulo}
      </h3>

      {receita.descricao && (
        <p className="mt-2 line-clamp-2 text-[0.9375rem] text-tinta-suave">{receita.descricao}</p>
      )}

      <dl className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-linha bg-linha text-sm">
        {ajustes.map((ajuste) => (
          <div key={ajuste.rotulo} className="min-w-0 bg-papel px-2.5 py-2">
            <dt className="font-titulo text-xs font-semibold text-tinta-suave">{ajuste.rotulo}</dt>
            <dd className="mt-0.5 text-sm font-medium break-words text-tinta-media">{ajuste.valor || '—'}</dd>
          </div>
        ))}
      </dl>

      {children && <div className="mt-4">{children}</div>}

      <span className="mt-auto flex items-center gap-1.5 pt-5 font-titulo text-sm font-semibold text-acento-texto">
        Ver receita
        <Icone nome="seta" className="size-4" />
      </span>
    </Link>
  );
}

// Grade de cartões: 1 coluna no celular, 2 no tablet e 3 no desktop.
export function GradeReceitas({ receitas }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {receitas.map((receita) => (
        <li key={receita.id}>
          <CartaoReceita receita={receita} />
        </li>
      ))}
    </ul>
  );
}
