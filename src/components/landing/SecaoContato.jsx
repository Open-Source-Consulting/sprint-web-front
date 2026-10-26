import { useState } from 'react';
import Botao from '../ui/Botao.jsx';
import CabecalhoSecao from '../ui/CabecalhoSecao.jsx';
import { CampoAreaTexto, CampoTexto } from '../ui/Campos.jsx';
import { AvisoAcao } from '../ui/Estados.jsx';
import { NOME_EQUIPE } from '../../data/equipe.js';

const CAMPOS_VAZIOS = { nome: '', email: '', mensagem: '' };
const MENSAGEM_MIN = 10;
const MENSAGEM_MAX = 1000;

// Formato simples de e-mail: texto@texto.texto, sem espaços.
const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Devolve um objeto só com os campos que têm erro. Ex.: { email: 'Informe seu e-mail.' }
function validar({ nome, email, mensagem }) {
  const erros = {};
  if (!nome.trim()) erros.nome = 'Informe seu nome.';

  if (!email.trim()) erros.email = 'Informe seu e-mail.';
  else if (!FORMATO_EMAIL.test(email.trim())) {
    erros.email = 'Digite um e-mail válido, como nome@exemplo.com.';
  }

  const tamanho = mensagem.trim().length;
  if (tamanho === 0) erros.mensagem = 'Escreva sua mensagem.';
  else if (tamanho < MENSAGEM_MIN) {
    erros.mensagem = `A mensagem precisa ter pelo menos ${MENSAGEM_MIN} caracteres.`;
  } else if (tamanho > MENSAGEM_MAX) {
    erros.mensagem = `A mensagem pode ter no máximo ${MENSAGEM_MAX} caracteres.`;
  }
  return erros;
}

const SOBRE_O_PROJETO = [
  { termo: 'Equipe', valor: NOME_EQUIPE },
  { termo: 'Entrega', valor: 'Challenge JOVI · Sprint 4' },
  { termo: 'Natureza', valor: 'Projeto acadêmico (FIAP)' },
  {
    termo: 'Escopo',
    valor:
      'Definição e modelagem da solução de software: escopo estruturado, backlog, user stories, fluxos de interação e arquitetura técnica.',
  },
  {
    termo: 'Nesta versão',
    valor: 'React, rotas públicas e privadas, hooks, Tailwind CSS e API mockada (MockAPI)',
  },
];

// Formulário de contato DEMONSTRATIVO: valida os campos, mas não envia nada.
export default function SecaoContato() {
  const [campos, setCampos] = useState(CAMPOS_VAZIOS);
  const [erros, setErros] = useState({});
  const [aviso, setAviso] = useState('');

  // Um único onChange para os três campos: o "name" do campo diz qual mudar.
  function aoDigitar(evento) {
    setCampos({ ...campos, [evento.target.name]: evento.target.value });
    setErros({ ...erros, [evento.target.name]: '' });
    setAviso('');
  }

  function aoEnviar(evento) {
    evento.preventDefault();
    const novosErros = validar(campos);
    setErros(novosErros);
    setAviso('');

    if (Object.keys(novosErros).length > 0) {
      return;
    }

    setAviso(
      `Obrigado, ${campos.nome.trim()}. Esta página é uma demonstração acadêmica e não possui servidor, portanto sua mensagem não foi enviada nem armazenada.`,
    );
    setCampos(CAMPOS_VAZIOS);
  }

  const tamanhoMensagem = campos.mensagem.trim().length;

  return (
    <section id="contato" aria-labelledby="titulo-contato" className="secao-y bg-papel-alt">
      <div className="container-site grid items-start gap-[clamp(2.5rem,1.5rem+3vw,4rem)] lg:grid-cols-[1.15fr_0.85fr]">
        <div className="min-w-0">
          <CabecalhoSecao id="titulo-contato" titulo="Fale com a equipe" className="sm:mb-10">
            Dúvidas ou sugestões sobre o projeto? Deixe sua mensagem abaixo.
          </CabecalhoSecao>

          <form noValidate onSubmit={aoEnviar} className="grid gap-5 sm:grid-cols-2">
            <CampoTexto
              id="contato-nome"
              name="nome"
              rotulo="Nome"
              autoComplete="name"
              placeholder="Como podemos chamar você?"
              value={campos.nome}
              onChange={aoDigitar}
              erro={erros.nome}
              required
            />
            <CampoTexto
              id="contato-email"
              name="email"
              type="email"
              rotulo="E-mail"
              autoComplete="email"
              placeholder="seunome@exemplo.com"
              value={campos.email}
              onChange={aoDigitar}
              erro={erros.email}
              required
            />
            <CampoAreaTexto
              id="contato-mensagem"
              name="mensagem"
              rotulo="Mensagem"
              rows={5}
              placeholder="Escreva sua dúvida ou sugestão sobre a JOVI AI."
              value={campos.mensagem}
              onChange={aoDigitar}
              erro={erros.mensagem}
              dica={`Entre ${MENSAGEM_MIN} e ${MENSAGEM_MAX} caracteres (${tamanhoMensagem}/${MENSAGEM_MAX}).`}
              required
              className="sm:col-span-2"
            />

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:col-span-2">
              <Botao type="submit" icone="seta" iconeDepois>
                Enviar mensagem
              </Botao>
              <p className="min-w-0 flex-[1_1_18rem] text-sm text-tinta-suave">
                Este formulário é uma demonstração: nenhuma mensagem é enviada ou armazenada. Não use
                dados pessoais reais.
              </p>
            </div>
          </form>

          {aviso && <AvisoAcao className="mt-5">{aviso}</AvisoAcao>}
        </div>

        <aside
          aria-labelledby="titulo-sobre-projeto"
          className="min-w-0 rounded-lg border border-linha bg-carta p-6 shadow-suave sm:p-8"
        >
          <h3 id="titulo-sobre-projeto" className="font-titulo text-h3 font-bold text-tinta">
            Sobre o projeto
          </h3>
          <dl className="mt-5">
            {SOBRE_O_PROJETO.map((item) => (
              <div key={item.termo} className="border-t border-linha py-3 first:border-t-0 first:pt-0 last:pb-0">
                <dt className="font-titulo text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-tinta-suave">
                  {item.termo}
                </dt>
                <dd className="mt-1 text-[0.9375rem] font-medium text-tinta">{item.valor}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
