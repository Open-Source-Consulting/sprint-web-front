import { iniciais } from '../../data/equipe.js';

// Cartão de cada integrante da equipe.
export default function CartaoIntegrante({ nome, rm, funcao }) {
  return (
    <div className="group h-full min-w-0 rounded-lg border border-linha bg-carta p-5 shadow-suave transition-[translate,border-color,box-shadow] duration-200 ease-padrao hover:-translate-y-0.5 hover:border-linha-forte hover:shadow-media sm:p-6">
      {/* As iniciais são só visuais (aria-hidden), o nome completo vem logo abaixo. */}
      <span
        aria-hidden="true"
        className="grid size-11 place-items-center rounded-full border border-linha bg-papel-alt font-titulo text-sm font-bold tracking-[0.04em] text-acento-texto transition-colors duration-200 group-hover:border-acento group-hover:bg-acento group-hover:text-white"
      >
        {iniciais(nome)}
      </span>

      <h3 className="mt-4 break-words font-titulo text-[1.0625rem] font-bold text-tinta">{nome}</h3>
      <p className="mt-1 text-sm font-medium tabular-nums text-tinta-suave">RM {rm}</p>
      <p className="mt-3 border-t border-linha pt-3 text-sm font-medium text-tinta-media">{funcao}</p>
    </div>
  );
}