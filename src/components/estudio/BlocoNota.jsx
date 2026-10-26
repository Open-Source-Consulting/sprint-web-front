import { useState } from 'react';
import Botao from '../ui/Botao.jsx';
import { CampoAreaTexto } from '../ui/Campos.jsx';
import { AvisoAcao } from '../ui/Estados.jsx';
import { LIMITES } from '../../lib/receita.js';

// Cartão com a nota da receita.
// aoSalvar(texto) faz o PUT na API. "aviso" é o resultado (sucesso ou erro) vindo do useReceita.
export default function BlocoNota({ notaSalva, aoSalvar, salvando, bloqueado, aviso }) {
  // O texto digitado fica aqui até a pessoa clicar em "Salvar nota".
  const [texto, setTexto] = useState(notaSalva);
  const max = LIMITES.nota.max;
  const mudou = texto !== notaSalva;

  function aoEnviar(evento) {
    evento.preventDefault();
    aoSalvar(texto);
  }

  return (
    <section className="rounded-lg border border-linha bg-carta p-5 shadow-suave sm:p-6">
      <h2 className="text-h3 font-bold text-tinta">Anotações</h2>

      <form onSubmit={aoEnviar} className="mt-4">
        <CampoAreaTexto
          id="receita-nota"
          rotulo={`Sua nota (${texto.length}/${max})`}
          rows={5}
          maxLength={max}
          value={texto}
          onChange={(evento) => setTexto(evento.target.value)}
          dica="As notas ficam visíveis para todos que usam a demonstração."
        />

        <Botao type="submit" variante="secundario" icone="nota" className="mt-4 w-full" disabled={!mudou || bloqueado}>
          {salvando ? 'Salvando…' : 'Salvar nota'}
        </Botao>
      </form>

      {/* "Nota salva." só aparece se a pessoa não mexeu no texto depois de salvar. */}
      {aviso && aviso.tipo === 'sucesso' && !mudou && (
        <AvisoAcao className="mt-3">{aviso.texto}</AvisoAcao>
      )}
      {aviso && aviso.tipo === 'erro' && (
        <AvisoAcao tipo="erro" className="mt-3">
          {aviso.texto}
        </AvisoAcao>
      )}
    </section>
  );
}
