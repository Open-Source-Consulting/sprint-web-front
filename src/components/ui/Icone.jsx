// Ícones em SVG (vários vieram da Sprint 3). Ex.: <Icone nome="seta" className="size-5" />
// Por padrão ficam com aria-hidden. Quando o ícone aparece sozinho, passar o "titulo".
const DESENHOS = {
  texto: (
    <>
      <path d="M4 5.5h16v10.5H9.5L5.5 19.5V16H4z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </>
  ),
  voz: (
    <>
      <rect x="9.25" y="2.75" width="5.5" height="10.5" rx="2.75" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3.25M9 21.25h6" />
    </>
  ),
  cena: (
    <>
      <path d="M3.5 8V5.5A2 2 0 0 1 5.5 3.5H8M16 3.5h2.5a2 2 0 0 1 2 2V8M20.5 16v2.5a2 2 0 0 1-2 2H16M8 20.5H5.5a2 2 0 0 1-2-2V16" />
      <circle cx="12" cy="12" r="3.25" />
    </>
  ),
  passos: <path d="M4 6.5h2M4 12h2M4 17.5h2M9.5 6.5H20M9.5 12H20M9.5 17.5H20" />,
  sugestao: (
    <>
      <path d="M12 3.5l1.9 4.6 4.6 1.9-4.6 1.9-1.9 4.6-1.9-4.6L5.5 10l4.6-1.9z" />
      <path d="M18 16.5l.8 1.95 1.95.8-1.95.8-.8 1.95-.8-1.95-1.95-.8 1.95-.8z" />
    </>
  ),
  explicacao: (
    <>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M9.6 9.4a2.45 2.45 0 1 1 3.2 2.34c-.5.18-.8.66-.8 1.19v.57" />
      <path d="M12 16.6h.01" />
    </>
  ),
  seta: <path d="M4.5 12h15M13.5 6l6 6-6 6" />,
  voltar: <path d="M19.5 12h-15M10.5 6l-6 6 6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  fechar: <path d="M6 6l12 12M18 6L6 18" />,
  ampliar: (
    <>
      <circle cx="10.75" cy="10.75" r="6.25" />
      <path d="M15.4 15.4l4.1 4.1M10.75 8.25v5M8.25 10.75h5" />
    </>
  ),
  guiado: (
    <>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M15.5 8.5l-2.1 5-5 2.1 2.1-5z" />
    </>
  ),
  automatico: (
    <>
      <path d="M12 3.25l2.1 5.15 5.15 2.1-5.15 2.1-2.1 5.15-2.1-5.15L4.75 10.5l5.15-2.1z" />
      <path d="M18.75 17.5v3.25M17.125 19.125h3.25" />
    </>
  ),
  busca: (
    <>
      <circle cx="10.75" cy="10.75" r="6.25" />
      <path d="M15.4 15.4l4.35 4.35" />
    </>
  ),
  coracao: (
    <path d="M12 19.75s-7.25-4.4-7.25-9.6a4.15 4.15 0 0 1 7.25-2.75 4.15 4.15 0 0 1 7.25 2.75c0 5.2-7.25 9.6-7.25 9.6z" />
  ),
  lapis: (
    <>
      <path d="M4.25 19.75h4L19 9a2.12 2.12 0 0 0-3-3L5.25 16.75z" />
      <path d="M14 8l3 3" />
    </>
  ),
  lixeira: (
    <path d="M4.5 7h15M9.5 7V4.75h5V7M6.5 7l.9 12.25h9.2L17.5 7M10.25 10.75v5.5M13.75 10.75v5.5" />
  ),
  mais: <path d="M12 5v14M5 12h14" />,
  sair: (
    <path d="M14 4.5h4.5A1.5 1.5 0 0 1 20 6v12a1.5 1.5 0 0 1-1.5 1.5H14M10 16.5l4.5-4.5L10 7.5M14.5 12H4" />
  ),
  alerta: (
    <>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M12 7.75v5M12 16.25h.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M12 11v5.25M12 7.75h.01" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  cadeado: (
    <>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8.5 10.5V7.75a3.5 3.5 0 0 1 7 0v2.75" />
    </>
  ),
  olho: (
    <>
      <path d="M2.75 12S6.25 5.75 12 5.75 21.25 12 21.25 12 17.75 18.25 12 18.25 2.75 12 2.75 12z" />
      <circle cx="12" cy="12" r="2.75" />
    </>
  ),
  'olho-fechado': (
    <>
      <path d="M2.75 12S6.25 5.75 12 5.75 21.25 12 21.25 12 17.75 18.25 12 18.25 2.75 12 2.75 12z" />
      <circle cx="12" cy="12" r="2.75" />
      <path d="M4 4l16 16" />
    </>
  ),
  recarregar: <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.5 4.5v4h-4" />,
  grade: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  'chevron-cima': <path d="M6 15l6-6 6 6" />,
  'chevron-baixo': <path d="M6 9l6 6 6-6" />,
  nota: (
    <>
      <path d="M6 3.75h8.5L19 8.25v12H6z" />
      <path d="M14.25 3.75v4.75H19M9 12.5h6.5M9 16h4.5" />
    </>
  ),
  usuario: (
    <>
      <circle cx="12" cy="8.5" r="3.75" />
      <path d="M4.75 20a7.25 7.25 0 0 1 14.5 0" />
    </>
  ),
};

export default function Icone({ nome, titulo, preenchido = false, className = 'size-5', ...resto }) {
  const desenho = DESENHOS[nome];
  if (!desenho) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill={preenchido ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden={titulo ? undefined : true}
      role={titulo ? 'img' : undefined}
      aria-label={titulo}
      focusable="false"
      {...resto}
    >
      {desenho}
    </svg>
  );
}
