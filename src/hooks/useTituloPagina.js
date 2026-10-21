import { useEffect } from 'react';

const TITULO_PADRAO = 'JOVI AI — Assistente de fotografia por inteligência artificial';

// Muda o título da aba do navegador em cada página. Ex.: "Favoritos · JOVI AI"
export function useTituloPagina(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} · JOVI AI` : TITULO_PADRAO;
  }, [titulo]);
}
