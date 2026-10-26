import Icone from '../ui/Icone.jsx';
import Selo from '../ui/Selo.jsx';
import { listarAjustes } from '../../lib/receita.js';

// Conteúdo da aba Modo Automático, parecido com a tela de otimização do protótipo.
// Só mostra o que a JOVI faria, nada é enviado para uma câmera.
export default function PainelModoAutomatico({ receita }) {
  const ajustes = listarAjustes(receita);

  return (
    <div
      data-tom="escuro"
      className="overflow-hidden rounded-lg border border-linha-noite bg-noite text-sobre-noite shadow-noite"
    >
      <div className="p-5 sm:p-7">
        <h3 className="text-h3 font-bold text-sobre-noite">Otimização sugerida</h3>
        <p className="mt-1.5 text-sobre-noite-suave">
          Na proposta, com a sua autorização, a JOVI aplicaria:
        </p>

        <ol className="mt-5 space-y-2.5">
          {ajustes.map((ajuste, indice) => (
            <li key={ajuste.rotulo} className="flex items-center gap-3.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-acento-claro font-titulo text-sm font-bold text-noite">
                {indice + 1}
              </span>
              <p className="min-w-0 flex-1 rounded-md border border-linha-noite bg-noite-alt px-4 py-3 text-sobre-noite-media">
                {ajuste.rotulo}: <strong className="font-semibold text-sobre-noite">{ajuste.valor}</strong>
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex gap-3 border-t border-linha-noite pt-5">
          <Icone nome="automatico" className="mt-1 size-5 text-acento-claro" />
          <p className="min-w-0 text-lead text-sobre-noite">
            {receita.resumoAutomatico || 'Esta receita não tem um resumo do Modo Automático.'}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 border-t border-linha-noite bg-noite-alt px-5 py-4 sm:flex-row sm:items-center sm:gap-3 sm:px-7">
        <Selo variante="conceito" tom="escuro" className="shrink-0">
          Conceito
        </Selo>
        <p className="text-sm text-sobre-noite-suave">
          Nenhum ajuste é enviado a uma câmera. A receita só descreve o que seria feito.
        </p>
      </div>
    </div>
  );
}
