// Campos de formulário com rótulo, dica e erro. A dica e o erro ficam ligados ao campo pelo aria-describedby.

const ESTILO_ENTRADA =
  'w-full rounded-md border bg-carta px-4 py-3 text-[0.9375rem] text-tinta transition-[border-color,box-shadow] duration-150 hover:border-borda-campo-hover focus:border-acento focus:shadow-[0_0_0_3px_rgb(14_124_134_/_0.14)] focus:outline-hidden disabled:bg-papel-alt disabled:text-tinta-suave';

function idsDescricao(id, dica, erro) {
  const ids = [];
  if (dica) ids.push(`${id}-dica`);
  if (erro) ids.push(`${id}-erro`);
  return ids.length ? ids.join(' ') : undefined;
}

export function Rotulo({ htmlFor, children, opcional = false, className = '' }) {
  return (
    <label htmlFor={htmlFor} className={`mb-2 block font-titulo text-sm font-semibold text-tinta ${className}`}>
      {children}
      {opcional && <span className="ml-1.5 font-sans font-normal text-tinta-suave">(opcional)</span>}
    </label>
  );
}

export function TextoDica({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-tinta-suave">
      {children}
    </p>
  );
}

export function TextoErro({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-perigo">
      {children}
    </p>
  );
}

// Coloca o rótulo, a dica e o erro em volta de qualquer campo.
function Campo({ id, rotulo, dica, erro, opcional, className = '', children }) {
  return (
    <div className={className}>
      <Rotulo htmlFor={id} opcional={opcional}>
        {rotulo}
      </Rotulo>
      {children}
      <TextoDica id={`${id}-dica`}>{dica}</TextoDica>
      <TextoErro id={`${id}-erro`}>{erro}</TextoErro>
    </div>
  );
}

export function CampoTexto({ id, rotulo, dica, erro, opcional, className, ...props }) {
  return (
    <Campo id={id} rotulo={rotulo} dica={dica} erro={erro} opcional={opcional} className={className}>
      <input
        id={id}
        className={`${ESTILO_ENTRADA} ${erro ? 'border-perigo' : 'border-borda-campo'}`}
        aria-invalid={erro ? true : undefined}
        aria-describedby={idsDescricao(id, dica, erro)}
        {...props}
      />
    </Campo>
  );
}

export function CampoAreaTexto({ id, rotulo, dica, erro, opcional, className, rows = 4, ...props }) {
  return (
    <Campo id={id} rotulo={rotulo} dica={dica} erro={erro} opcional={opcional} className={className}>
      <textarea
        id={id}
        rows={rows}
        className={`${ESTILO_ENTRADA} min-h-24 resize-y leading-relaxed ${erro ? 'border-perigo' : 'border-borda-campo'}`}
        aria-invalid={erro ? true : undefined}
        aria-describedby={idsDescricao(id, dica, erro)}
        {...props}
      />
    </Campo>
  );
}

// opcoes: lista de textos ou de { valor, rotulo }.
export function CampoSelecao({ id, rotulo, dica, erro, opcional, className, opcoes, textoVazio, ...props }) {
  return (
    <Campo id={id} rotulo={rotulo} dica={dica} erro={erro} opcional={opcional} className={className}>
      <select
        id={id}
        className={`${ESTILO_ENTRADA} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%235A6570'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'%3E%3Cpath%20d='M6%209l6%206%206-6'/%3E%3C/svg%3E")] bg-[length:1.1rem] bg-[position:right_0.9rem_center] bg-no-repeat pr-10 ${erro ? 'border-perigo' : 'border-borda-campo'}`}
        aria-invalid={erro ? true : undefined}
        aria-describedby={idsDescricao(id, dica, erro)}
        {...props}
      >
        {textoVazio && <option value="">{textoVazio}</option>}
        {opcoes.map((opcao) => {
          const valor = typeof opcao === 'string' ? opcao : opcao.valor;
          const texto = typeof opcao === 'string' ? opcao : opcao.rotulo;
          return (
            <option key={valor} value={valor}>
              {texto}
            </option>
          );
        })}
      </select>
    </Campo>
  );
}
