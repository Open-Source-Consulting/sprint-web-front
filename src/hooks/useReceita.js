import { useEffect, useState } from 'react';
import { atualizarReceita, obterReceita, removerReceita } from '../services/receitas.js';

// Busca uma receita pelo id e tem as ações da página de detalhe:
// favoritar, salvar nota e apagar.
export function useReceita(id) {
  const [receita, setReceita] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [naoEncontrada, setNaoEncontrada] = useState(false);
  const [tentativa, setTentativa] = useState(0);

  // Ação que está em andamento: 'favoritar', 'nota', 'remover' ou null.
  const [acao, setAcao] = useState(null);
  // Resultado da última ação, ex.: { acao: 'nota', tipo: 'sucesso', texto: 'Nota salva.' }
  const [aviso, setAviso] = useState(null);

  useEffect(() => {
    let ignorar = false;
    setCarregando(true);
    setErro('');
    setNaoEncontrada(false);

    obterReceita(id)
      .then((dados) => {
        if (!ignorar) setReceita(dados);
      })
      .catch((falha) => {
        if (ignorar) return;
        if (falha.status === 404) {
          setNaoEncontrada(true);
        } else {
          setErro(falha.message);
        }
      })
      .finally(() => {
        if (!ignorar) setCarregando(false);
      });

    return () => {
      ignorar = true;
    };
  }, [id, tentativa]);

  function recarregar() {
    setTentativa(tentativa + 1);
  }

  async function favoritar() {
    setAcao('favoritar');
    setAviso(null);
    try {
      const atualizada = await atualizarReceita(id, { favorita: !receita.favorita });
      setReceita(atualizada);
      const texto = atualizada.favorita ? 'Adicionada aos favoritos.' : 'Removida dos favoritos.';
      setAviso({ acao: 'favoritar', tipo: 'sucesso', texto });
    } catch (falha) {
      setAviso({ acao: 'favoritar', tipo: 'erro', texto: falha.message });
    }
    setAcao(null);
  }

  async function salvarNota(nota) {
    setAcao('nota');
    setAviso(null);
    try {
      const atualizada = await atualizarReceita(id, { nota });
      setReceita(atualizada);
      setAviso({ acao: 'nota', tipo: 'sucesso', texto: 'Nota salva.' });
    } catch (falha) {
      setAviso({ acao: 'nota', tipo: 'erro', texto: falha.message });
    }
    setAcao(null);
  }

  // Devolve true se apagou. Se der erro, o aviso aparece na janela de confirmação.
  async function remover() {
    setAcao('remover');
    setAviso(null);
    try {
      await removerReceita(id);
      return true;
    } catch (falha) {
      setAviso({ acao: 'remover', tipo: 'erro', texto: falha.message });
      setAcao(null);
      return false;
    }
  }

  function limparAviso() {
    setAviso(null);
  }

  return {
    receita,
    carregando,
    erro,
    naoEncontrada,
    recarregar,
    acao,
    aviso,
    limparAviso,
    favoritar,
    salvarNota,
    remover,
  };
}
