import { useEffect, useRef } from 'react';
import Icone from '../ui/Icone.jsx';

// Mostra a imagem da galeria ampliada usando a tag <dialog> do HTML.
// Abre quando recebe uma "tela" e fecha quando ela volta a ser null.
export default function Lightbox({ tela, aoFechar }) {
  const dialogoRef = useRef(null);

  useEffect(() => {
    if (tela) {
      dialogoRef.current.showModal();
    } else {
      dialogoRef.current.close();
    }
  }, [tela]);

  // Clicar no fundo escuro fora da imagem também fecha.
  function aoClicar(evento) {
    if (evento.target === dialogoRef.current) aoFechar();
  }

  return (
    <dialog
      ref={dialogoRef}
      data-tom="escuro"
      onClose={aoFechar} // o Esc também fecha
      onClick={aoClicar}
      className="m-auto max-h-[92dvh] w-[min(92vw,28rem)] overflow-y-auto rounded-lg border border-linha-noite bg-noite-alt p-0 text-sobre-noite shadow-noite-forte animate-focar"
    >
      {tela && (
        <>
          <div className="flex items-center justify-between gap-3 border-b border-linha-noite py-2 pl-5 pr-2">
            <p className="min-w-0 font-titulo font-bold text-sobre-noite">{tela.titulo}</p>
            <button
              type="button"
              onClick={aoFechar}
              aria-label="Fechar imagem ampliada"
              className="grid size-11 shrink-0 place-items-center rounded-full border border-linha-noite bg-noite-elev text-sobre-noite hover:bg-noite-borda"
            >
              <Icone nome="fechar" className="size-5" />
            </button>
          </div>

          <figure className="p-4 sm:p-5">
            <img
              src={tela.imagem}
              alt={tela.alt}
              width={tela.largura}
              height={tela.altura}
              className="mx-auto h-auto max-h-[68vh] w-auto max-w-full rounded-md bg-noite object-contain"
            />
            <figcaption className="mt-4 text-sm leading-relaxed text-sobre-noite-suave">{tela.texto}</figcaption>
          </figure>
        </>
      )}
    </dialog>
  );
}
