// Conteúdo da aba "Modo Guiado": a lista de passos que a pessoa faz sozinha.
export default function PainelModoGuiado({ passos = [] }) {
  return (
    <div>
      <p className="max-w-[62ch] text-tinta-media">
        Siga os passos e faça cada ajuste você mesmo. Nada é aplicado automaticamente.
      </p>

      {passos.length === 0 ? (
        <p className="mt-5 rounded-md border border-dashed border-linha-forte px-4 py-6 text-center text-tinta-suave">
          Esta receita não tem passos cadastrados.
        </p>
      ) : (
        <ol className="mt-5 space-y-3">
          {passos.map((passo, indice) => (
            <li key={indice} className="flex gap-3.5 sm:gap-4">
              <span className="mt-2.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-acento-claro font-titulo text-sm font-bold text-noite">
                {indice + 1}
              </span>
              <p className="min-w-0 flex-1 rounded-md border border-linha bg-carta px-4 py-3 text-tinta">
                {passo}
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
