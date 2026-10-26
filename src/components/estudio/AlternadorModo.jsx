import { useState } from 'react';
import Icone from '../ui/Icone.jsx';
import PainelModoGuiado from './PainelModoGuiado.jsx';
import PainelModoAutomatico from './PainelModoAutomatico.jsx';

const MODOS = [
  { valor: 'guiado', rotulo: 'Modo Guiado', icone: 'guiado' },
  { valor: 'automatico', rotulo: 'Modo Automático', icone: 'automatico' },
];

// Dois botões para trocar entre o Modo Guiado e o Modo Automático da receita.
export default function AlternadorModo({ receita }) {
  const [modoAtivo, setModoAtivo] = useState('guiado');

  return (
    <div>
      <div className="flex w-full rounded-md border border-linha bg-papel-alt p-1 sm:inline-flex sm:w-auto">
        {MODOS.map((modo) => {
          const ativo = modoAtivo === modo.valor;
          return (
            <button
              key={modo.valor}
              type="button"
              aria-pressed={ativo}
              onClick={() => setModoAtivo(modo.valor)}
              className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-sm px-2 font-titulo text-sm font-semibold transition-colors duration-150 sm:flex-none sm:px-5 ${
                ativo ? 'bg-carta text-tinta shadow-suave' : 'text-tinta-suave hover:text-tinta'
              }`}
            >
              <Icone nome={modo.icone} className={`hidden size-4.5 sm:block ${ativo ? 'text-acento' : ''}`} />
              {modo.rotulo}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {modoAtivo === 'guiado' ? (
          <PainelModoGuiado passos={receita.passosGuiado} />
        ) : (
          <PainelModoAutomatico receita={receita} />
        )}
      </div>
    </div>
  );
}
