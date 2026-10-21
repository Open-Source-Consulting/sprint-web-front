import { useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import Botao from '../components/ui/Botao.jsx';
import Icone from '../components/ui/Icone.jsx';
import Selo from '../components/ui/Selo.jsx';
import { CampoTexto, Rotulo, TextoErro } from '../components/ui/Campos.jsx';
import { AvisoAcao } from '../components/ui/Estados.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useTituloPagina } from '../hooks/useTituloPagina.js';
import { CREDENCIAIS_DEMO } from '../lib/auth-demo.js';

const RECURSOS_ESTUDIO = [
  'Catálogo de receitas com busca e filtros',
  'Descreva a foto e receba sugestões por palavras-chave',
  'Modo Guiado e Modo Automático em cada receita',
  'Favoritos e notas (compartilhados na demonstração)',
  'Receitas próprias: criar, editar e apagar',
];

// /entrar: login APENAS de demonstração (ver src/lib/auth-demo.js).
export default function PaginaEntrar() {
  useTituloPagina('Entrar');
  const { autenticado, entrar } = useAuth();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erros, setErros] = useState({});
  const [erroLogin, setErroLogin] = useState('');

  // A RotaPrivada manda em state.de a página que a pessoa tentou abrir sem login.
  const paginaPedida = location.state?.de?.pathname;

  // Depois de entrar (ou se já estava logado), vai para a página pedida ou para o Estúdio.
  if (autenticado) {
    return <Navigate to={paginaPedida || '/estudio'} replace />;
  }

  function preencherDemo() {
    setEmail(CREDENCIAIS_DEMO.email);
    setSenha(CREDENCIAIS_DEMO.senha);
    setErros({});
    setErroLogin('');
  }

  function aoEnviar(evento) {
    evento.preventDefault();
    setErroLogin('');

    const novosErros = {};
    if (!email.trim()) novosErros.email = 'Digite o e-mail.';
    if (!senha) novosErros.senha = 'Digite a senha.';
    setErros(novosErros);
    if (novosErros.email || novosErros.senha) return;

    const deuCerto = entrar(email, senha);
    if (!deuCerto) {
      setErroLogin('E-mail ou senha não conferem com o acesso de demonstração.');
    }
  }

  return (
    <section className="bg-papel py-12 sm:py-20">
      <div className="container-site grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
        {/* No HTML o formulário vem primeiro. No desktop o painel escuro vai para a esquerda (lg:order-first). */}
        <div className="min-w-0 rounded-lg border border-linha bg-carta p-6 shadow-suave sm:p-10">
          <h1 className="font-titulo text-2xl font-bold text-tinta sm:text-3xl">Entrar no Estúdio</h1>
          <p className="mt-2 text-tinta-suave">Use o acesso de demonstração que aparece abaixo do formulário.</p>

          {paginaPedida && (
            <p className="mt-5 flex items-start gap-2 rounded-md border border-linha bg-papel px-3.5 py-2.5 text-sm text-tinta-media">
              <Icone nome="info" className="mt-0.5 size-4 text-acento" />
              <span className="min-w-0">
                Entre para continuar em <strong className="break-all text-tinta">{paginaPedida}</strong>.
              </span>
            </p>
          )}

          <form noValidate onSubmit={aoEnviar} className="mt-6 flex flex-col gap-5">
            <CampoTexto
              id="entrar-email"
              type="email"
              rotulo="E-mail"
              autoComplete="username"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              erro={erros.email}
            />

            {/* A senha não usa o CampoTexto porque tem o botão de mostrar/ocultar dentro do campo. */}
            <div>
              <Rotulo htmlFor="entrar-senha">Senha</Rotulo>
              <div className="relative">
                <input
                  id="entrar-senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={senha}
                  onChange={(evento) => setSenha(evento.target.value)}
                  className={`w-full rounded-md border bg-carta py-3 pl-4 pr-14 text-[0.9375rem] text-tinta hover:border-borda-campo-hover focus:border-acento focus:outline-hidden ${
                    erros.senha ? 'border-perigo' : 'border-borda-campo'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-tinta-suave hover:text-tinta"
                >
                  <Icone nome={mostrarSenha ? 'olho-fechado' : 'olho'} className="size-5" />
                </button>
              </div>
              <TextoErro>{erros.senha}</TextoErro>
            </div>

            {erroLogin && <AvisoAcao tipo="erro">{erroLogin}</AvisoAcao>}

            <Botao type="submit" icone="seta" iconeDepois className="w-full">
              Entrar
            </Botao>
          </form>

          <div className="mt-8 rounded-md border border-dashed border-linha-forte bg-papel p-4 sm:p-5">
            <p className="font-titulo text-sm font-semibold text-tinta">Acesso de demonstração</p>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[0.9375rem]">
              <dt className="text-tinta-suave">E-mail</dt>
              <dd className="font-semibold text-tinta">{CREDENCIAIS_DEMO.email}</dd>
              <dt className="text-tinta-suave">Senha</dt>
              <dd className="font-semibold text-tinta">{CREDENCIAIS_DEMO.senha}</dd>
            </dl>
            <Botao variante="secundario" onClick={preencherDemo} className="mt-4 w-full sm:w-auto">
              Preencher dados de demonstração
            </Botao>
            <p className="mt-4 text-sm text-tinta-suave">
              Login só para demonstração: o e-mail e a senha estão no código do site e não há segurança real.
            </p>
          </div>
        </div>

        <div
          data-tom="escuro"
          className="min-w-0 rounded-xl bg-noite p-6 text-sobre-noite shadow-noite sm:p-10 lg:order-first lg:self-start"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h2 className="font-titulo text-2xl font-bold sm:text-[1.75rem]">O que tem no Estúdio</h2>
            <Selo variante="alerta" tom="escuro">
              Área privada de demonstração
            </Selo>
          </div>
          <ul className="mt-6 flex flex-col gap-4">
            {RECURSOS_ESTUDIO.map((recurso) => (
              <li key={recurso} className="flex items-start gap-3 text-sobre-noite-media">
                <Icone nome="check" className="mt-0.5 size-5 text-acento-claro" />
                <span>{recurso}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
