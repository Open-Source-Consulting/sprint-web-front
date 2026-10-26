import { Link, useNavigate } from 'react-router';
import Icone from '../../components/ui/Icone.jsx';
import FormularioReceita from '../../components/estudio/FormularioReceita.jsx';
import { useTituloPagina } from '../../hooks/useTituloPagina.js';
import { criarReceita } from '../../services/receitas.js';
import { RECEITA_VAZIA } from '../../lib/receita.js';

// Criação de receita própria (/estudio/nova). Faz o POST e abre o detalhe da receita criada.
export default function PaginaNovaReceita() {
  useTituloPagina('Nova receita');
  const navigate = useNavigate();

  // Se der erro, devolve a mensagem para o formulário mostrar.
  async function criar(dados) {
    try {
      const criada = await criarReceita(dados);
      navigate(`/estudio/receitas/${criada.id}`, { state: { aviso: 'Receita criada.' } });
      return '';
    } catch (falha) {
      return falha.message;
    }
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

      <header className="mt-6 mb-10 max-w-leitura">
        <h1 className="font-titulo text-3xl font-bold text-tinta sm:text-4xl">Nova receita</h1>
        <p className="mt-3 text-lead text-tinta-suave">
          Crie uma receita própria. Ela fica marcada como Criada no Estúdio e pode ser editada ou
          apagada depois.
        </p>
      </header>

      <FormularioReceita
        valoresIniciais={RECEITA_VAZIA}
        rotuloEnviar="Criar receita"
        cancelarPara="/estudio"
        aoEnviar={criar}
      />
    </div>
  );
}
