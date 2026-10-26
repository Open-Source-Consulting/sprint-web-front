import { listarAjustes } from '../../lib/receita.js';

// Cartão lateral com os ajustes sugeridos da receita (modo, ISO, exposição...).
export default function TabelaAjustes({ receita }) {
  const ajustes = listarAjustes(receita);

  return (
    <section
      aria-labelledby="titulo-ajustes"
      className="rounded-lg border border-linha bg-carta p-5 shadow-suave sm:p-6"
    >
      <h2 id="titulo-ajustes" className="text-h3 font-bold text-tinta">
        Ajustes sugeridos
      </h2>

      <dl className="mt-4 divide-y divide-linha border-y border-linha">
        {ajustes.map((ajuste) => (
          <div
            key={ajuste.rotulo}
            className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-x-4 py-3"
          >
            <dt className="font-titulo text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-tinta-suave">
              {ajuste.rotulo}
            </dt>
            <dd className="font-medium break-words tabular-nums text-tinta">{ajuste.valor}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
