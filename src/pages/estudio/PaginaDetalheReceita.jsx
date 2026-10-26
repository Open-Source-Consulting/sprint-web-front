import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import Botao from '../../components/ui/Botao.jsx';
import Icone from '../../components/ui/Icone.jsx';
import Selo from '../../components/ui/Selo.jsx';
import { AvisoAcao, Carregando, EstadoErro, EstadoVazio } from '../../components/ui/Estados.jsx';
import AlternadorModo from '../../components/estudio/AlternadorModo.jsx';
import TabelaAjustes from '../../components/estudio/TabelaAjustes.jsx';
import BlocoNota from '../../components/estudio/BlocoNota.jsx';
import DialogoConfirmacao from '../../components/estudio/DialogoConfirmacao.jsx';
import { useAvisoDaRota } from '../../hooks/useAvisoDaRota.js';
import { useReceita } from '../../hooks/useReceita.js';
import { useTituloPagina } from '../../hooks/useTituloPagina.js';
import { podeEditar, rotuloCategoria, rotuloNivel, rotuloOrigem } from '../../lib/receita.js';

// Detalhe de uma receita (/estudio/receitas/:id): modos Guiado e Automático, ajustes,
// nota, favoritar e, nas receitas criadas no Estúdio, editar e apagar.
export default function PaginaDetalheReceita() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
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
  } = useReceita(id);
  const [confirmarAberto, setConfirmarAberto] = useState(false);

  useTituloPagina(receita ? receita.titulo : 'Receita');

  // Mensagem que a página anterior mandou (ex.: "Receita criada.").
  const avisoDaRota = useAvisoDaRota();

  // Só mostra o aviso no lugar da ação que gerou ele.
  const avisoFavorito = aviso && aviso.acao === 'favoritar' ? aviso : null;
  const avisoNota = aviso && aviso.acao === 'nota' ? aviso : null;
  const erroRemover = aviso && aviso.acao === 'remover' ? aviso.texto : '';

  function abrirConfirmacao() {
    limparAviso();
    setConfirmarAberto(true);
  }

  async function apagar() {
    const titulo = receita.titulo;
    const apagou = await remover();
    if (apagou) {
      navigate('/estudio', { replace: true, state: { aviso: `Receita “${titulo}” apagada.` } });
    }
    // Se não apagou, a janela continua aberta mostrando o erro.
  }

  let conteudo = null;
  if (carregando) {
    conteudo = <Carregando texto="Carregando receita…" />;
  } else if (naoEncontrada) {
    conteudo = (
      <EstadoVazio
        className="mt-6"
        titulo="Receita não encontrada"
        texto="Ela pode ter sido apagada por alguém que usa a demonstração."
        acao={<Botao para="/estudio">Voltar ao catálogo</Botao>}
      />
    );
  } else if (erro) {
    conteudo = (
      <EstadoErro
        className="mt-6"
        titulo="Não foi possível carregar a receita"
        mensagem={erro}
        aoTentarNovamente={recarregar}
      />
    );
  } else if (receita) {
    const editavel = podeEditar(receita);

    conteudo = (
      <article className="mt-6 animate-focar">
        <header>
          <div className="flex flex-wrap gap-2">
            <Selo variante="acento">{rotuloCategoria(receita.categoria)}</Selo>
            <Selo>{rotuloNivel(receita.nivel)}</Selo>
            <Selo variante={editavel ? 'alerta' : 'neutro'}>{rotuloOrigem(receita.origem)}</Selo>
          </div>
          <h1 className="mt-4 max-w-4xl text-h2 font-bold break-words text-tinta">{receita.titulo}</h1>
          {receita.descricao && <p className="mt-3 max-w-[62ch] text-lead text-tinta-suave">{receita.descricao}</p>}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Botao
              variante="secundario"
              aria-pressed={receita.favorita}
              onClick={favoritar}
              disabled={acao !== null}
            >
              <span className="inline-flex items-center gap-2">
                <Icone
                  nome="coracao"
                  preenchido={receita.favorita}
                  className={`size-[1.1em] ${receita.favorita ? 'text-acento' : ''}`}
                />
                {acao === 'favoritar' ? 'Salvando…' : 'Favorita'}
              </span>
            </Botao>

            {editavel && (
              <>
                <Botao variante="secundario" icone="lapis" para={`/estudio/receitas/${id}/editar`}>
                  Editar
                </Botao>
                <Botao variante="perigo" icone="lixeira" onClick={abrirConfirmacao} disabled={acao !== null}>
                  Apagar
                </Botao>
              </>
            )}
          </div>

          {!editavel && (
            <p className="mt-3 flex items-start gap-2 text-sm text-tinta-suave">
              <Icone nome="info" className="mt-0.5 size-4" />
              Receitas do catálogo podem ser favoritadas e anotadas, mas não editadas nem apagadas.
            </p>
          )}

          {avisoFavorito && (
            <AvisoAcao tipo={avisoFavorito.tipo} className="mt-4 w-fit max-w-full">
              {avisoFavorito.texto}
            </AvisoAcao>
          )}
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-3 lg:gap-10">
          <section className="min-w-0 lg:col-span-2">
            <h2 className="mb-5 text-h3 font-bold text-tinta">Como fazer esta foto</h2>
            <AlternadorModo receita={receita} />
          </section>

          <div className="min-w-0 space-y-6">
            <TabelaAjustes receita={receita} />
            <BlocoNota
              key={receita.id}
              notaSalva={receita.nota}
              aoSalvar={salvarNota}
              salvando={acao === 'nota'}
              bloqueado={acao !== null}
              aviso={avisoNota}
            />
          </div>
        </div>

        {editavel && (
          <DialogoConfirmacao
            aberto={confirmarAberto}
            titulo="Apagar esta receita?"
            aoConfirmar={apagar}
            aoCancelar={() => setConfirmarAberto(false)}
            apagando={acao === 'remover'}
            erro={erroRemover}
          >
            <p>
              A receita <strong className="text-tinta">“{receita.titulo}”</strong> será apagada para todos
              que usam a demonstração. Não dá para desfazer.
            </p>
          </DialogoConfirmacao>
        )}
      </article>
    );
  }

  return (
    <div className="container-site py-10 sm:py-14">
      <Link
        to="/estudio"
        className="inline-flex min-h-11 items-center gap-2 font-titulo text-sm font-semibold text-acento-texto underline-offset-4 hover:underline"
      >
        <Icone nome="voltar" className="size-4.5" />
        Voltar ao catálogo
      </Link>

      {avisoDaRota && <AvisoAcao className="mt-4 w-fit max-w-full">{avisoDaRota}</AvisoAcao>}

      {conteudo}
    </div>
  );
}
