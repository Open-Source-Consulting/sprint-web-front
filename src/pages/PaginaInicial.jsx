import { useTituloPagina } from '../hooks/useTituloPagina.js';
import Hero from '../components/landing/Hero.jsx';
import SecaoSolucao from '../components/landing/SecaoSolucao.jsx';
import SecaoComoFunciona from '../components/landing/SecaoComoFunciona.jsx';
import SecaoModos from '../components/landing/SecaoModos.jsx';
import SecaoExperimente from '../components/landing/SecaoExperimente.jsx';
import SecaoPublico from '../components/landing/SecaoPublico.jsx';
import SecaoPropostaDemo from '../components/landing/SecaoPropostaDemo.jsx';
import SecaoGaleria from '../components/landing/SecaoGaleria.jsx';
import SecaoEquipe from '../components/landing/SecaoEquipe.jsx';
import SecaoContato from '../components/landing/SecaoContato.jsx';

// Landing page ("/"). O cabeçalho e o rodapé vêm do LayoutSite.
export default function PaginaInicial() {
  // null = título padrão do site
  useTituloPagina(null);

  return (
    <>
      <Hero />
      <SecaoSolucao />
      <SecaoComoFunciona />
      <SecaoModos />
      <SecaoExperimente />
      <SecaoPublico />
      <SecaoPropostaDemo />
      <SecaoGaleria />
      <SecaoEquipe />
      <SecaoContato />
    </>
  );
}
