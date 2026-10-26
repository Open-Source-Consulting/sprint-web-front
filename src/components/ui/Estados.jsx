import Botao from './Botao.jsx';
import Icone from './Icone.jsx';

// Texto mostrado enquanto os dados da API carregam.
export function Carregando({ texto = 'Carregando…', className = '' }) {
  return (
    <p role="status" className={`flex items-center gap-2 py-10 text-tinta-suave ${className}`}>
      <span className="size-2.5 rounded-full bg-acento animate-pulsar" aria-hidden="true" />
      {texto}
    </p>
  );
}

// Mensagem de erro da API com o botão "Tentar novamente".
export function EstadoErro({
  titulo = 'Não foi possível carregar as receitas',
  mensagem,
  aoTentarNovamente,
  className = '',
}) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-start gap-4 rounded-lg border border-perigo/20 bg-perigo-suave p-6 text-tinta sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <div className="flex gap-3">
        <Icone nome="alerta" className="mt-0.5 size-5 text-perigo" />
        <div>
          <p className="font-titulo font-semibold">{titulo}</p>
          {mensagem && <p className="mt-1 text-[0.9375rem] text-tinta-media">{mensagem}</p>}
        </div>
      </div>
      {aoTentarNovamente && (
        <Botao variante="secundario" tamanho="sm" icone="recarregar" onClick={aoTentarNovamente} className="shrink-0">
          Tentar novamente
        </Botao>
      )}
    </div>
  );
}

// Mensagem para quando a lista está vazia, com um botão opcional (ex.: "Limpar filtros").
export function EstadoVazio({ titulo, texto, acao, icone = 'busca', className = '' }) {
  return (
    <div
      className={`flex flex-col items-center rounded-lg border border-dashed border-linha-forte px-6 py-12 text-center text-tinta ${className}`}
    >
      <Icone nome={icone} className="size-7 text-acento" />
      <p className="mt-4 font-titulo text-h3 font-bold">{titulo}</p>
      {texto && <p className="mt-2 max-w-[46ch] text-tinta-suave">{texto}</p>}
      {acao && <div className="mt-6">{acao}</div>}
    </div>
  );
}

// Aviso depois de uma ação, ex.: "Nota salva." (verde) ou uma mensagem de erro (vermelho).
export function AvisoAcao({ tipo = 'sucesso', children, className = '' }) {
  const sucesso = tipo === 'sucesso';
  return (
    <p
      role={sucesso ? 'status' : 'alert'}
      className={`flex items-start gap-2 rounded-md border px-3.5 py-2.5 text-sm font-medium ${
        sucesso
          ? 'border-acento/28 bg-acento-suave text-acento-forte'
          : 'border-perigo/20 bg-perigo-suave text-perigo-forte'
      } ${className}`}
    >
      <Icone nome={sucesso ? 'check' : 'alerta'} className="mt-px size-4.5" />
      <span>{children}</span>
    </p>
  );
}
