import { Link } from 'react-router';
import Marca from '../ui/Marca.jsx';
import { EQUIPE } from '../../data/equipe.js';

const LINKS = [
  { para: '/#solucao', rotulo: 'A Solução' },
  { para: '/#como-funciona', rotulo: 'Como funciona' },
  { para: '/#modos', rotulo: 'Modos' },
  { para: '/#experimente', rotulo: 'Experimente' },
  { para: '/#publico', rotulo: 'Público-alvo' },
  { para: '/#galeria', rotulo: 'Galeria' },
  { para: '/#equipe', rotulo: 'Equipe' },
  { para: '/#contato', rotulo: 'Contato' },
  { para: '/estudio', rotulo: 'Estúdio (área privada)' },
  { para: '/entrar', rotulo: 'Entrar' },
];

const CLASSE_TITULO =
  'font-titulo text-xs font-bold uppercase tracking-[0.1em] text-sobre-noite-suave';

export default function Rodape() {
  return (
    <footer data-tom="escuro" className="bg-noite pb-8 pt-[clamp(3rem,2rem+3vw,4.5rem)] text-sobre-noite">
      <div className="container-site">
        <div className="grid gap-12 border-b border-linha-noite pb-12 md:grid-cols-2 md:gap-x-8 lg:grid-cols-[1.2fr_1.6fr_1fr]">
          <div className="min-w-0 md:col-span-2 lg:col-span-1">
            <Marca />
            <p className="mt-4 max-w-[42ch] text-[0.9375rem] text-sobre-noite-suave">
              Proposta de um agente de inteligência artificial integrado à câmera do smartphone JOVI,
              que interpreta a intenção do usuário e prepara a câmera para a foto que ele quer fazer.
            </p>
          </div>

          <nav aria-labelledby="rodape-navegacao" className="min-w-0">
            <h2 id="rodape-navegacao" className={CLASSE_TITULO}>
              Navegação
            </h2>
            {/* columns-2: a lista desce pela 1ª coluna e continua na 2ª */}
            <ul className="mt-2 columns-2 gap-x-6">
              {LINKS.map((link) => (
                <li key={link.para} className="break-inside-avoid">
                  <Link
                    to={link.para}
                    className="inline-flex min-h-11 items-center py-1 text-[0.9375rem] text-sobre-noite-suave underline-offset-4 transition-colors duration-150 hover:text-acento-claro hover:underline"
                  >
                    {link.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <h2 className={CLASSE_TITULO}>Equipe</h2>
            <ul className="mt-4 grid gap-3">
              {EQUIPE.map((pessoa) => (
                <li key={pessoa.rm} className="text-[0.9375rem] text-sobre-noite-suave">
                  {pessoa.nome}{' '}
                  <span className="whitespace-nowrap tabular-nums text-sobre-noite-fraca">RM {pessoa.rm}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 max-w-[75ch] text-sm text-sobre-noite-fraca">
          Projeto acadêmico desenvolvido pela Open Source Consulting para o Challenge JOVI. As telas
          apresentadas são de um protótipo. O login e os dados do Estúdio são de demonstração. © 2026.
        </p>
      </div>
    </footer>
  );
}
