import { useEffect, useRef } from 'react';
import Botao from '../ui/Botao.jsx';
import { AvisoAcao } from '../ui/Estados.jsx';

// Janela que pede confirmação antes de apagar uma receita. Usa a tag <dialog> do HTML.
// Quem decide se ela está aberta é o componente pai, pela prop "aberto".
export default function DialogoConfirmacao({ aberto, titulo, children, aoConfirmar, aoCancelar, apagando, erro }) {
  const dialogoRef = useRef(null);

  // O <dialog> precisa do showModal() para abrir com o fundo escuro.
  useEffect(() => {
    if (aberto) {
      dialogoRef.current.showModal();
    } else {
      dialogoRef.current.close();
    }
  }, [aberto]);

  return (
    <dialog
      ref={dialogoRef}
      onClose={aoCancelar} // o Esc também fecha a janela
      className="m-auto w-[min(92vw,28rem)] rounded-lg border border-linha bg-carta p-0 text-tinta shadow-forte"
    >
      <div className="p-6 sm:p-7">
        <h2 className="text-h3 font-bold text-tinta">{titulo}</h2>
        <div className="mt-3 text-tinta-media">{children}</div>

        {erro && (
          <AvisoAcao tipo="erro" className="mt-4">
            {erro}
          </AvisoAcao>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Botao variante="secundario" onClick={aoCancelar} disabled={apagando}>
            Cancelar
          </Botao>
          <Botao variante="perigo" icone="lixeira" onClick={aoConfirmar} disabled={apagando}>
            {apagando ? 'Apagando…' : 'Apagar receita'}
          </Botao>
        </div>
      </div>
    </dialog>
  );
}
