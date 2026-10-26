import { Link } from 'react-router';

// Símbolo da marca: círculo ciano com o miolo translúcido.
export function SimboloMarca({ className = 'size-6.5' }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-block shrink-0 rounded-full border-2 border-acento-claro after:absolute after:inset-[4px] after:rounded-full after:bg-acento-claro/28 ${className}`}
    />
  );
}

// Logo "JOVI AI". Com "para" vira link (no cabeçalho), sem ele é só texto (no rodapé).
export default function Marca({ para, className = '', rotulo = 'JOVI AI — início' }) {
  const conteudo = (
    <>
      <SimboloMarca />
      <span className="text-[1.0625rem] font-medium">
        JOVI <strong className="font-extrabold">AI</strong>
      </span>
    </>
  );
  const classes = `inline-flex items-center gap-3 font-titulo font-bold tracking-[0.02em] ${className}`;

  if (para !== undefined) {
    return (
      <Link to={para} className={classes} aria-label={rotulo}>
        {conteudo}
      </Link>
    );
  }
  return <p className={classes}>{conteudo}</p>;
}
