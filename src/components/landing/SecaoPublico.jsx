const BENEFICIOS = [
  {
    titulo: 'Menos conhecimento técnico',
    texto: 'Não é preciso dominar fotografia para chegar a um bom resultado.',
  },
  {
    titulo: 'Menos tempo configurando',
    texto: 'A preparação da câmera deixa de custar o momento da captura.',
  },
  {
    titulo: 'Mais entendimento',
    texto: 'Cada recomendação vem explicada, o que ensina os recursos do aparelho.',
  },
  {
    titulo: 'Mais chance de acertar',
    texto: 'O caminho entre a intenção e a foto desejada fica bem mais curto.',
  },
];

// Fundo bg-papel para alternar com a seção Experimente, que vem antes e usa bg-papel-alt.
export default function SecaoPublico() {
  return (
    <section id="publico" aria-labelledby="titulo-publico" className="secao-y bg-papel">
      <div className="container-site grid items-start gap-[clamp(2.5rem,1.5rem+3vw,4rem)] lg:grid-cols-[1.15fr_1fr]">
        <div className="min-w-0">
          <h2 id="titulo-publico" className="text-h2 font-bold text-tinta">
            Para quem carrega a câmera no bolso e não tem tempo a perder
          </h2>
          <p className="mt-4 max-w-[46ch] text-lead text-tinta-suave">
            O público-alvo principal são <strong className="whitespace-nowrap text-tinta">estudantes full-time</strong>,
            usuários ativos de smartphone e{' '}
            <strong className="text-tinta">iniciantes ou intermediários em fotografia</strong>. São
            pessoas que têm dificuldade com os diferentes modos disponíveis na câmera e querem reduzir
            o tempo gasto em configurações manuais.
          </p>
        </div>

        {/* O gap-px deixa o fundo bg-linha aparecer entre os itens, formando uma linha de 1px. */}
        <ul className="grid gap-px overflow-hidden rounded-lg border border-linha bg-linha shadow-suave sm:grid-cols-2">
          {BENEFICIOS.map((beneficio) => (
            <li
              key={beneficio.titulo}
              className="min-w-0 bg-papel p-[clamp(1.25rem,1rem+1vw,1.75rem)] transition-colors duration-150 hover:bg-carta"
            >
              <h3 className="text-base font-semibold text-tinta">{beneficio.titulo}</h3>
              <p className="mt-2 text-[0.9375rem] text-tinta-suave">{beneficio.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
