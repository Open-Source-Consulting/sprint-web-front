import { useEffect, useState } from 'react';
import { listarReceitas } from '../services/receitas.js';

// Lista de receitas com busca, filtro e o botão "Carregar mais".
// O MockAPI não informa o total de receitas, então consideramos que tem mais
// enquanto a página vier cheia (com "limite" receitas).
export function useReceitas({ busca = '', categoria = '', favorita = false, limite = 6 } = {}) {
  const [receitas, setReceitas] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [temMais, setTemMais] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [erroMais, setErroMais] = useState('');
  // Muda quando a pessoa clica em "Tentar novamente", para o useEffect buscar de novo.
  const [tentativa, setTentativa] = useState(0);

  // Busca a página 1 sempre que a busca ou o filtro mudar.
  useEffect(() => {
    let ignorar = false;
    setCarregando(true);
    setErro('');
    setErroMais('');

    listarReceitas({ busca, categoria, favorita, pagina: 1, limite })
      .then((lista) => {
        if (ignorar) return;
        setReceitas(lista);
        setPagina(1);
        setTemMais(lista.length === limite);
      })
      .catch((falha) => {
        if (!ignorar) setErro(falha.message);
      })
      .finally(() => {
        if (!ignorar) setCarregando(false);
      });

    // Se o filtro mudar antes da resposta chegar, a resposta antiga é ignorada.
    return () => {
      ignorar = true;
    };
  }, [busca, categoria, favorita, limite, tentativa]);

  async function carregarMais() {
    setCarregandoMais(true);
    setErroMais('');
    try {
      const proxima = pagina + 1;
      const lista = await listarReceitas({ busca, categoria, favorita, pagina: proxima, limite });
      setReceitas([...receitas, ...lista]);
      setPagina(proxima);
      setTemMais(lista.length === limite);
    } catch (falha) {
      setErroMais(falha.message);
    }
    setCarregandoMais(false);
  }

  function tentarNovamente() {
    setTentativa(tentativa + 1);
  }

  return {
    receitas,
    carregando,
    erro,
    vazio: !carregando && !erro && receitas.length === 0,
    temMais,
    carregandoMais,
    erroMais,
    carregarMais,
    tentarNovamente,
  };
}
