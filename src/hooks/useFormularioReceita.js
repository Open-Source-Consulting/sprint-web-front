import { useState } from 'react';
import { LIMITES, prepararReceitaParaEnvio, validarReceita } from '../lib/receita.js';

// Lógica do formulário de receita (criar e editar). A parte visual fica no FormularioReceita.jsx.
// valoresIniciais tem o mesmo formato do RECEITA_VAZIA (src/lib/receita.js).
export function useFormularioReceita(valoresIniciais) {
  const [valores, setValores] = useState(valoresIniciais);
  const [erros, setErros] = useState({});

  const passos = valores.passosGuiado;

  // Muda um campo e tira o erro dele (a pessoa está corrigindo).
  function alterarCampo(nome, valor) {
    setValores({ ...valores, [nome]: valor });
    setErros({ ...erros, [nome]: undefined });
  }

  function alterarPassos(novosPassos) {
    setValores({ ...valores, passosGuiado: novosPassos });
    setErros({ ...erros, passosGuiado: undefined });
  }

  function alterarPasso(indice, texto) {
    const novos = [...passos];
    novos[indice] = texto;
    alterarPassos(novos);
  }

  function adicionarPasso() {
    if (passos.length < LIMITES.passos.max) {
      alterarPassos([...passos, '']);
    }
  }

  function removerPasso(indice) {
    if (passos.length > LIMITES.passos.min) {
      alterarPassos(passos.filter((_, i) => i !== indice));
    }
  }

  // direcao: -1 sobe o passo e 1 desce.
  function moverPasso(indice, direcao) {
    const destino = indice + direcao;
    if (destino < 0 || destino >= passos.length) return;
    const novos = [...passos];
    const temporario = novos[indice];
    novos[indice] = novos[destino];
    novos[destino] = temporario;
    alterarPassos(novos);
  }

  // Valida tudo, guarda os erros e devolve eles (objeto vazio = pode enviar).
  function validar() {
    const novosErros = validarReceita(valores);
    setErros(novosErros);
    return novosErros;
  }

  function dadosParaEnvio() {
    return prepararReceitaParaEnvio(valores);
  }

  return {
    valores,
    erros,
    alterarCampo,
    alterarPasso,
    adicionarPasso,
    removerPasso,
    moverPasso,
    validar,
    dadosParaEnvio,
    podeAdicionarPasso: passos.length < LIMITES.passos.max,
    podeRemoverPasso: passos.length > LIMITES.passos.min,
  };
}
