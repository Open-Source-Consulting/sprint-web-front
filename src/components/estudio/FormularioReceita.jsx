import { useState } from 'react';
import Botao from '../ui/Botao.jsx';
import Icone from '../ui/Icone.jsx';
import { CampoAreaTexto, CampoSelecao, CampoTexto, TextoDica, TextoErro } from '../ui/Campos.jsx';
import { AvisoAcao } from '../ui/Estados.jsx';
import { useFormularioReceita } from '../../hooks/useFormularioReceita.js';
import { CATEGORIAS, LIMITES, MODOS_CAMERA, NIVEIS, OPCOES_FLASH, montarPalavrasChave } from '../../lib/receita.js';

// Id de cada campo, na ordem da tela. Serve para colocar o foco no primeiro campo com erro.
const IDS = {
  titulo: 'receita-titulo',
  categoria: 'receita-categoria',
  nivel: 'receita-nivel-facil',
  descricao: 'receita-descricao',
  modoCamera: 'receita-modo',
  iso: 'receita-iso',
  exposicao: 'receita-exposicao',
  foco: 'receita-foco',
  flash: 'receita-flash',
  passosGuiado: 'receita-passo-1',
  resumoAutomatico: 'receita-resumo',
  palavrasChave: 'receita-palavras',
};

// Cada parte do formulário fica num cartão com <fieldset> e <legend>.
function Secao({ titulo, descricao, children }) {
  return (
    <div className="rounded-lg border border-linha bg-carta p-5 shadow-suave sm:p-7">
      <fieldset className="min-w-0">
        <legend>
          <h2 className="text-h3 font-bold text-tinta">{titulo}</h2>
        </legend>
        {descricao && <p className="mt-1.5 text-[0.9375rem] text-tinta-suave">{descricao}</p>}
        <div className="mt-6 space-y-5">{children}</div>
      </fieldset>
    </div>
  );
}

// Botão pequeno só com ícone (subir, descer e remover passo).
function BotaoIcone({ icone, rotulo, ...resto }) {
  return (
    <button
      type="button"
      aria-label={rotulo}
      title={rotulo}
      className="inline-flex size-12 shrink-0 items-center justify-center rounded-md border border-linha-forte bg-carta text-tinta-media transition-colors duration-150 hover:border-tinta-suave hover:text-tinta disabled:pointer-events-none disabled:opacity-40"
      {...resto}
    >
      <Icone nome={icone} className="size-5" />
    </button>
  );
}

// Formulário usado para criar e para editar receita.
// aoEnviar(dados) faz a chamada na API e devolve uma mensagem de erro, ou '' se deu certo.
export default function FormularioReceita({ valoresIniciais, aoEnviar, rotuloEnviar, cancelarPara }) {
  const form = useFormularioReceita(valoresIniciais);
  const { valores, erros } = form;
  const passos = valores.passosGuiado;

  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState('');

  // Quantos campos ainda têm erro (diminui conforme a pessoa corrige).
  const quantidadeErros = Object.values(erros).filter(Boolean).length;

  // Mostra como as palavras-chave vão ficar salvas.
  const previaPalavras = montarPalavrasChave(valores);

  // Devolve value, onChange e erro de um campo, para não repetir isso em todos os campos.
  function ligar(nome) {
    return {
      value: valores[nome],
      onChange: (evento) => form.alterarCampo(nome, evento.target.value),
      erro: erros[nome],
    };
  }

  async function aoSubmeter(evento) {
    evento.preventDefault();
    setErroEnvio('');

    const novosErros = form.validar();
    const primeiroErro = Object.keys(IDS).find((campo) => novosErros[campo]);
    if (primeiroErro) {
      document.getElementById(IDS[primeiroErro]).focus();
      return;
    }

    setEnviando(true);
    const erro = await aoEnviar(form.dadosParaEnvio());
    // Se deu certo a página já mudou. Só precisa voltar o botão ao normal se deu erro.
    if (erro) {
      setEnviando(false);
      setErroEnvio(erro);
    }
  }

  return (
    <form noValidate onSubmit={aoSubmeter} className="max-w-leitura">
      <p className="mb-6 text-sm text-tinta-suave">
        Todos os campos são obrigatórios, menos os marcados como opcionais.
      </p>

      <div className="space-y-6">
        <Secao titulo="Sobre a receita">
          <CampoTexto
            id={IDS.titulo}
            rotulo={`Nome da receita (${valores.titulo.length}/${LIMITES.titulo.max})`}
            maxLength={LIMITES.titulo.max}
            autoComplete="off"
            {...ligar('titulo')}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <CampoSelecao
              id={IDS.categoria}
              rotulo="Categoria"
              opcoes={CATEGORIAS}
              textoVazio="Escolha uma categoria"
              {...ligar('categoria')}
            />

            {/* O nível é um grupo de radio, então tem o próprio fieldset. */}
            <fieldset className="min-w-0">
              <legend className="mb-2 font-titulo text-sm font-semibold text-tinta">Nível</legend>
              <div className="flex flex-wrap gap-2">
                {NIVEIS.map((nivel) => (
                  <label
                    key={nivel.valor}
                    className="flex min-h-12 flex-1 items-center gap-2.5 rounded-md border border-linha-forte bg-carta px-3.5 text-[0.9375rem] whitespace-nowrap text-tinta hover:border-tinta-suave has-checked:border-acento has-checked:bg-acento-suave"
                  >
                    <input
                      type="radio"
                      id={`receita-nivel-${nivel.valor}`}
                      name="nivel"
                      value={nivel.valor}
                      checked={valores.nivel === nivel.valor}
                      onChange={() => form.alterarCampo('nivel', nivel.valor)}
                      className="size-4.5 shrink-0 accent-acento"
                    />
                    {nivel.rotulo}
                  </label>
                ))}
              </div>
              <TextoErro>{erros.nivel}</TextoErro>
            </fieldset>
          </div>

          <CampoAreaTexto
            id={IDS.descricao}
            rotulo={`Descrição (${valores.descricao.length}/${LIMITES.descricao.max})`}
            rows={2}
            maxLength={LIMITES.descricao.max}
            dica="Uma frase sobre o resultado que a foto busca."
            {...ligar('descricao')}
          />
        </Secao>

        <Secao
          titulo="Ajustes sugeridos"
          descricao="O que a receita sugere configurar. São só sugestões: nada é enviado a uma câmera."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <CampoTexto
                id={IDS.modoCamera}
                rotulo="Modo da câmera"
                list="receita-modos-lista"
                maxLength={LIMITES.ajuste.max}
                dica="Escolha da lista ou escreva outro."
                autoComplete="off"
                {...ligar('modoCamera')}
              />
              {/* Sugestões que aparecem no campo "Modo da câmera" */}
              <datalist id="receita-modos-lista">
                {MODOS_CAMERA.map((modo) => (
                  <option key={modo} value={modo} />
                ))}
              </datalist>
            </div>
            <CampoTexto
              id={IDS.iso}
              rotulo="ISO"
              maxLength={LIMITES.ajuste.max}
              dica="Ex.: Auto, até 800"
              autoComplete="off"
              {...ligar('iso')}
            />
            <CampoTexto
              id={IDS.exposicao}
              rotulo="Exposição"
              maxLength={LIMITES.ajuste.max}
              dica="Ex.: +0,3 ou -0,7"
              autoComplete="off"
              {...ligar('exposicao')}
            />
            <CampoTexto
              id={IDS.foco}
              rotulo="Foco"
              maxLength={LIMITES.ajuste.max}
              dica="Ex.: Toque no rosto"
              autoComplete="off"
              {...ligar('foco')}
            />
            <CampoSelecao id={IDS.flash} rotulo="Flash" opcoes={OPCOES_FLASH} {...ligar('flash')} />
          </div>

          <div>
            <label
              htmlFor="receita-hdr"
              className="flex min-h-12 w-fit max-w-full items-center gap-3 rounded-md border border-linha-forte bg-carta px-4 text-[0.9375rem] font-medium text-tinta hover:border-tinta-suave has-checked:border-acento has-checked:bg-acento-suave"
            >
              <input
                type="checkbox"
                id="receita-hdr"
                checked={valores.hdr}
                onChange={(evento) => form.alterarCampo('hdr', evento.target.checked)}
                className="size-4.5 shrink-0 accent-acento"
              />
              Ligar HDR
            </label>
            <TextoDica>Ajuda quando a cena tem partes muito claras e muito escuras ao mesmo tempo.</TextoDica>
          </div>
        </Secao>

        <Secao
          titulo="Modo Guiado: passo a passo"
          descricao={`De ${LIMITES.passos.min} a ${LIMITES.passos.max} passos curtos, na ordem em que a pessoa deve fazer.`}
        >
          <ol className="space-y-4">
            {passos.map((passo, indice) => (
              // O índice serve de key porque os campos são controlados pelo estado.
              <li key={indice} className="flex flex-col gap-2 sm:flex-row sm:items-end">
                <CampoTexto
                  id={`receita-passo-${indice + 1}`}
                  rotulo={`Passo ${indice + 1}`}
                  className="min-w-0 flex-1"
                  maxLength={LIMITES.passo.max}
                  value={passo}
                  onChange={(evento) => form.alterarPasso(indice, evento.target.value)}
                  autoComplete="off"
                />
                <div className="flex justify-end gap-1.5">
                  <BotaoIcone
                    icone="chevron-cima"
                    rotulo={`Mover passo ${indice + 1} para cima`}
                    disabled={indice === 0}
                    onClick={() => form.moverPasso(indice, -1)}
                  />
                  <BotaoIcone
                    icone="chevron-baixo"
                    rotulo={`Mover passo ${indice + 1} para baixo`}
                    disabled={indice === passos.length - 1}
                    onClick={() => form.moverPasso(indice, 1)}
                  />
                  <BotaoIcone
                    icone="lixeira"
                    rotulo={`Remover passo ${indice + 1}`}
                    disabled={!form.podeRemoverPasso}
                    onClick={() => form.removerPasso(indice)}
                  />
                </div>
              </li>
            ))}
          </ol>

          {erros.passosGuiado && (
            <p role="alert" className="flex items-start gap-2 text-sm font-medium text-perigo">
              <Icone nome="alerta" className="mt-px size-4.5" />
              {erros.passosGuiado}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Botao
              variante="secundario"
              icone="mais"
              onClick={form.adicionarPasso}
              disabled={!form.podeAdicionarPasso}
            >
              Adicionar passo
            </Botao>
            {!form.podeAdicionarPasso && (
              <p className="text-sm text-tinta-suave">Máximo de {LIMITES.passos.max} passos.</p>
            )}
          </div>
        </Secao>

        <Secao titulo="Modo Automático">
          <CampoAreaTexto
            id={IDS.resumoAutomatico}
            rotulo={`O que a JOVI faria (${valores.resumoAutomatico.length}/${LIMITES.resumoAutomatico.max})`}
            rows={3}
            maxLength={LIMITES.resumoAutomatico.max}
            dica="Escreva no condicional: “A JOVI ativaria…”. Nada é aplicado a uma câmera."
            {...ligar('resumoAutomatico')}
          />
        </Secao>

        <Secao
          titulo="Palavras-chave"
          descricao="Ajudam a receita a aparecer na busca do catálogo e no “Descreva a foto”."
        >
          <div>
            <CampoTexto
              id={IDS.palavrasChave}
              rotulo="Palavras para a busca"
              opcional
              maxLength={LIMITES.palavrasChave.max}
              dica="Separe por espaço. O título e a categoria entram sozinhos e os acentos são removidos."
              autoComplete="off"
              {...ligar('palavrasChave')}
            />
            {previaPalavras && (
              <p className="mt-3 rounded-md bg-papel px-3.5 py-2.5 text-sm text-tinta-suave">
                Serão salvas: <span className="font-medium break-words text-tinta-media">{previaPalavras}</span>
              </p>
            )}
          </div>
        </Secao>
      </div>

      <div className="mt-8 space-y-4">
        {quantidadeErros > 0 && (
          <AvisoAcao tipo="erro">Corrija os campos destacados ({quantidadeErros}).</AvisoAcao>
        )}
        {erroEnvio && <AvisoAcao tipo="erro">{erroEnvio}</AvisoAcao>}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Botao variante="secundario" para={cancelarPara}>
            Cancelar
          </Botao>
          <Botao type="submit" icone="check" disabled={enviando}>
            {enviando ? 'Salvando…' : rotuloEnviar}
          </Botao>
        </div>
      </div>
    </form>
  );
}
