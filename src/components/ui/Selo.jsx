// Etiqueta pequena. A variante "demo" marca o que funciona nesta demonstração (bolinha
// pulsando) e a "conceito" marca o que é só proposta (borda tracejada). As outras são para
// categoria, nível e origem. Em fundo escuro, usar tom="escuro".
const ESTILOS = {
  claro: {
    demo: 'border-acento/30 bg-acento-suave text-acento-forte',
    conceito: 'border-dashed border-tinta-suave/60 bg-transparent text-tinta-media',
    neutro: 'border-linha bg-papel-alt text-tinta-media',
    acento: 'border-acento/25 bg-acento-suave text-acento-forte',
    alerta: 'border-aviso/25 bg-aviso-suave text-aviso',
  },
  escuro: {
    demo: 'border-acento-claro/35 bg-acento-claro/10 text-acento-claro',
    conceito: 'border-dashed border-white/30 bg-transparent text-sobre-noite-media',
    neutro: 'border-linha-noite bg-white/5 text-sobre-noite-media',
    acento: 'border-acento-claro/30 bg-acento-claro/10 text-acento-claro',
    alerta: 'border-amber-300/30 bg-amber-300/10 text-amber-200',
  },
};

export default function Selo({ variante = 'neutro', tom = 'claro', children, className = '' }) {
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-titulo text-xs font-semibold leading-5 tracking-[0.02em] ${ESTILOS[tom][variante]} ${className}`}
    >
      {variante === 'demo' && (
        <span
          aria-hidden="true"
          className={`size-1.5 shrink-0 rounded-full animate-pulsar ${tom === 'escuro' ? 'bg-acento-claro' : 'bg-acento'}`}
        />
      )}
      <span className="truncate">{children}</span>
    </span>
  );
}
