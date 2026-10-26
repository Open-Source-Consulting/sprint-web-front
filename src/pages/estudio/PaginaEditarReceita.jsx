import { Link, useNavigate, useParams } from 'react-router';
import Botao from '../../components/ui/Botao.jsx';
import Icone from '../../components/ui/Icone.jsx';
import { Carregando, EstadoErro, EstadoVazio } from '../../components/ui/Estados.jsx';
import FormularioReceita from '../../components/estudio/FormularioReceita.jsx';
import { useReceita } from '../../hooks/useReceita.js';
import { useTituloPagina } from '../../hooks/useTituloPagina.js';
import { LIMITES, podeEditar } from '../../lib/receita.js';
import { tokenizar } from '../../lib/texto.js';
import { atualizarReceita } from '../../services/receitas.js';

// Copia os campos da receita para o formato do formulário.
function paraFormulario(receita) {
  // O formulário precisa de pelo menos 2 linhas de passo.
  const passos = [...receita.passosGuiado];
  while (passos.length < LIMITES.passos.min) {
    passos.push('');
  }

  // As palavras do título e da categoria já foram juntadas no palavrasChave quando a receita
  // foi salva. Tiramos elas aqui para não aparecerem repetidas (ao salvar, elas voltam).
  const automaticas = tokenizar(`${receita.titulo} ${receita.categoria}`);
  const palavrasDoUsuario = receita.palavrasChave
    .split(' ')
    .filter((palavra) => !automaticas.includes(palavra))
    .join(' ');

  return {
    titulo: receita.titulo,
    categoria: receita.categoria,
    nivel: receita.nivel,
    descricao: receita.descricao,
    palavrasChave: palavrasDoUsuario,
    iso: receita.iso,
    exposicao: receita.exposicao,
    foco: receita.foco,
    hdr: receita.hdr,
    flash: receita.flash,
    modoCamera: receita.modoCamera,
    passosGuiado: passos,
    resumoAutomatico: receita.resumoAutomatico,
  };
}

// Edição de uma receita criada no Estúdio (/estudio/receitas/:id/editar).
// Receitas do catálogo não podem ser editadas.
export default function PaginaEditarReceita() {
  useTituloPagina('Editar receita');
  const { id } = useParams();
  const navigate = useNavigate();
  const { receita, carregando, erro, naoEncontrada, recarregar } = useReceita(id);
  const linkDetalhe = `/estudio/receitas/${id}`;

  // Faz o PUT e volta para o detalhe. Se falhar, devolve a mensagem para o formulário mostrar.
  async function salvar(dados) {
    try {
      await atualizarReceita(id, dados);
      navigate(linkDetalhe, { state: { aviso: 'Alterações salvas.' } });
      return '';
    } catch (falha) {
      return falha.message;
    }
  }

  let conteudo = null;
  if (carregando) {
    conteudo = <Carregando texto="Carregando receita…" />;
  } else if (naoEncontrada) {
    conteudo = (
      <EstadoVazio
        titulo="Receita não encontrada"
        texto="Ela pode ter sido apagada por alguém que usa a demonstração."
        acao={<Botao para="/estudio">Voltar ao catálogo</Botao>}
      />
    );
  } else if (erro) {
    conteudo = (
      <EstadoErro titulo="Não foi possível carregar a receita" mensagem={erro} aoTentarNovamente={recarregar} />
    );
  } else if (receita && !podeEditar(receita)) {
    conteudo = (
      <EstadoVazio
        icone="cadeado"
        titulo="Esta receita não pode ser editada"
        texto="Receitas do catálogo podem ser favoritadas e anotadas, mas não editadas."
        acao={<Botao para={linkDetalhe}>Voltar à receita</Botao>}
      />
    );
  } else if (receita) {
    conteudo = (
      <FormularioReceita
        key={receita.id}
        valoresIniciais={paraFormulario(receita)}
        rotuloEnviar="Salvar alterações"
        cancelarPara={linkDetalhe}
        aoEnviar={salvar}
      />
    );
  }

  return (
    <div className="container-site py-10 sm:py-14">
      <Link
        to={linkDetalhe}
        className="inline-flex min-h-11 items-center gap-2 font-titulo text-sm font-semibold text-acento-texto underline-offset-4 hover:underline"
      >
        <Icone nome="voltar" className="size-4.5" />
        Voltar à receita
      </Link>

      <header className="mt-6 mb-10 max-w-leitura">
        <h1 className="font-titulo text-3xl font-bold text-tinta sm:text-4xl">Editar receita</h1>
        <p className="mt-3 text-lead text-tinta-suave">
          As mudanças valem para todos que usam a demonstração.
        </p>
      </header>

      {conteudo}
    </div>
  );
}
