import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce.js';
import { listarReceitas } from '../services/receitas.js';
import { sugerirReceitas } from '../lib/sugestao.js';

// Hook do "Descreva a foto". Busca o catálogo inteiro uma vez e compara o texto
// digitado com as palavras-chave de cada receita (ver lib/sugestao.js). Não usa IA.
export function useSugestaoReceita(texto) {
  const textoAtrasado = useDebounce(texto, 300);
  const [catalogo, setCatalogo] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ignorar = false;
    setCarregando(true);
    setErro('');

    listarReceitas()
      .then((lista) => {
        if (!ignorar) setCatalogo(lista);
      })
      .catch((falha) => {
        if (!ignorar) setErro(falha.message);
      })
      .finally(() => {
        if (!ignorar) setCarregando(false);
      });

    return () => {
      ignorar = true;
    };
  }, [tentativa]);

  function recarregar() {
    setTentativa(tentativa + 1);
  }

  // termos = palavras do texto que foram usadas
  // sugestoes = [{ receita, pontos, combinados }]
  const { termos, sugestoes } = sugerirReceitas(catalogo, textoAtrasado);

  return { termos, sugestoes, carregando, erro, recarregar };
}
