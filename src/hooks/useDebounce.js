import { useEffect, useState } from 'react';

// Devolve o valor só depois que ele fica "atraso" ms sem mudar.
// Usado na busca para não fazer uma requisição a cada tecla.
export function useDebounce(valor, atraso = 300) {
  const [valorAtrasado, setValorAtrasado] = useState(valor);

  useEffect(() => {
    const timer = setTimeout(() => setValorAtrasado(valor), atraso);
    return () => clearTimeout(timer);
  }, [valor, atraso]);

  return valorAtrasado;
}
