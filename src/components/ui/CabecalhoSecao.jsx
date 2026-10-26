// Título (h2) e texto do topo das seções da landing.
// Nas seções com fundo escuro, usar tom="escuro".
export default function CabecalhoSecao({ id, titulo, children, tom = 'claro', className = '', acessorio }) {
  const escuro = tom === 'escuro';
  return (
    <div className={`mb-10 max-w-leitura sm:mb-14 ${className}`}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <h2 id={id} className={`text-h2 font-bold ${escuro ? 'text-sobre-noite' : 'text-tinta'}`}>
          {titulo}
        </h2>
        {acessorio}
      </div>
      {children && (
        <p className={`mt-4 max-w-[62ch] text-lead ${escuro ? 'text-sobre-noite-suave' : 'text-tinta-suave'}`}>
          {children}
        </p>
      )}
    </div>
  );
}
