import { Link } from 'react-router';
import Icone from './Icone.jsx';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-md border font-titulo font-semibold transition-colors duration-150 disabled:pointer-events-none disabled:opacity-55';

const VARIANTES = {
  // ação principal
  primario: 'border-transparent bg-acento text-white shadow-botao hover:bg-acento-forte',
  // ação secundária em fundo claro
  secundario: 'border-linha-forte bg-carta text-tinta hover:border-tinta-suave hover:bg-papel',
  // ação secundária em fundo escuro
  fantasma: 'border-white/22 bg-transparent text-sobre-noite hover:border-white/38 hover:bg-white/7',
  // para apagar
  perigo: 'border-transparent bg-perigo text-white hover:bg-perigo-forte',
  // só texto, para ações menos importantes
  texto: 'border-transparent bg-transparent px-2! text-acento-texto underline-offset-4 hover:underline',
};

const TAMANHOS = {
  md: 'min-h-12 px-5.5 py-3 text-[0.9375rem]',
  sm: 'min-h-11 px-4 py-2 text-sm',
};

// Botão usado no site todo.
// Com "para" vira um <Link> (rota do site), com "href" vira um <a> e sem os dois é um <button>.
// "icone" é o nome de um ícone do Icone.jsx e "iconeDepois" coloca o ícone depois do texto.
export default function Botao({
  variante = 'primario',
  tamanho = 'md',
  icone,
  iconeDepois = false,
  para,
  href,
  type = 'button',
  className = '',
  children,
  ...resto
}) {
  const classes = `${BASE} ${VARIANTES[variante]} ${TAMANHOS[tamanho]} ${className}`;
  const elementoIcone = icone && <Icone nome={icone} className="size-[1.1em]" />;

  const conteudo = (
    <>
      {!iconeDepois && elementoIcone}
      <span>{children}</span>
      {iconeDepois && elementoIcone}
    </>
  );

  if (para) {
    return (
      <Link to={para} className={classes} {...resto}>
        {conteudo}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...resto}>
        {conteudo}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...resto}>
      {conteudo}
    </button>
  );
}
