# JOVI AI

Landing page e Estúdio de receitas de foto da proposta **JOVI AI**, um assistente de fotografia integrado à câmera do smartphone JOVI. A pessoa descreve a foto que quer, por texto ou voz, e o assistente orienta passo a passo (Modo Guiado) ou prepara a câmera com autorização (Modo Automático).

Projeto acadêmico da equipe Open Source Consulting para o Challenge JOVI (FIAP, Sprint 4 — Front-End Design e Web Development). Esta versão é a evolução da landing page da Sprint 3, feita em HTML, CSS e JavaScript: o site foi migrado para React e ganhou o Estúdio, uma área privada que consome uma API.

## Links

- Deploy na Vercel: https://sprint-web-front-delta.vercel.app/
- Repositório Git: https://github.com/Open-Source-Consulting/sprint-web-front

## Funcionalidades

- Landing page com a proposta, os dois modos, a galeria de telas do protótipo, a equipe e um formulário de contato demonstrativo.
- Seção "Experimente", na própria landing, que busca receitas na API sem precisar de login.
- Login de demonstração e rotas privadas.
- Estúdio: catálogo com busca, filtro por categoria e botão "Carregar mais"; "Descreva a foto", que sugere receitas por palavras-chave; detalhe de cada receita com Modo Guiado e Modo Automático; favoritos e notas; criação, edição e exclusão de receitas próprias.

## Tecnologias utilizadas

- React 19: componentes, props, hooks nativos e hooks customizados
- React Router 8: rotas públicas e privadas
- Tailwind CSS 4: estilização e responsividade (celular, tablet e desktop)
- Vite 8: servidor de desenvolvimento e build
- MockAPI: API mockada com o recurso `Receitas`
- Vitest e Testing Library: testes automatizados
- ESLint: verificação do código
- Fontes Archivo e Atkinson Hyperlegible Next, instaladas pelos pacotes do Fontsource

## Como instalar as dependências

Pré-requisito: [Node.js](https://nodejs.org/) 22.22 ou mais recente (o npm já vem junto).

```bash
npm install
```

## Como executar o projeto

```bash
npm run dev
```

Abra o endereço que aparece no terminal (normalmente `http://localhost:5173`).

Outros comandos:

| Comando | O que faz |
| --- | --- |
| `npm run build` | gera a versão de produção na pasta `dist` |
| `npm run preview` | abre a versão gerada pelo build (`http://localhost:4173`) |
| `npm test` | roda os testes |
| `npm run lint` | confere o código com o ESLint |

## Back-end e API

O projeto não tem back-end próprio, então não há servidor para executar além do `npm run dev`. Os dados vêm de uma API mockada no MockAPI, que já está com o catálogo cadastrado:

- Endereço: `https://6acef518f338359cf1c3c7f6.mockapi.io/Receitas`
- Operações usadas: listar com busca, filtro e paginação (`GET /Receitas`), ver o detalhe (`GET /Receitas/:id`), criar (`POST`), editar, favoritar e anotar (`PUT`) e apagar (`DELETE`).

Não é preciso configurar nada. Para usar outro projeto do MockAPI, copie o `.env.example` para `.env` e troque o valor de `VITE_API_URL`.

A API é pública: receitas, favoritos e notas são compartilhados por todos que usam o site. Para voltar ao catálogo original, rode:

```bash
npm run seed
```

Atenção: esse comando **apaga todos os registros** da API e cadastra de novo as receitas de `scripts/receitas.seed.json`.

## Usuário e senha para teste

O Estúdio (`/estudio`) é uma área privada. Para entrar, use o acesso de demonstração:

- E-mail: `demo@jovi.ai`
- Senha: `jovi2026`

A tela de login também tem o botão "Preencher dados de demonstração". O login é só demonstrativo: as credenciais ficam no código do front-end e a sessão é guardada no `localStorage`, sem segurança real.

## Rotas

| Rota | Acesso | Página |
| --- | --- | --- |
| `/` | pública | landing page |
| `/entrar` | pública | login de demonstração |
| `/estudio` | privada | catálogo de receitas e "Descreva a foto" |
| `/estudio/favoritos` | privada | receitas favoritas |
| `/estudio/nova` | privada | criar uma receita |
| `/estudio/receitas/:id` | privada | detalhe da receita (Modo Guiado e Modo Automático) |
| `/estudio/receitas/:id/editar` | privada | editar uma receita criada no Estúdio |

Qualquer outro endereço mostra a página 404.

## Estrutura de pastas

```text
src/
  assets/       imagens das telas do protótipo
  components/   componentes da landing, do Estúdio, de interface (ui) e de rotas
  contexts/     contexto do login de demonstração
  data/         dados fixos: equipe e telas do protótipo
  hooks/        hooks customizados (a lógica fica separada da parte visual)
  layouts/      layouts das páginas públicas e do Estúdio
  lib/          funções de apoio: receitas, textos, sugestão e login
  pages/        páginas de cada rota
  services/     chamadas à API
  testes/       configuração dos testes
scripts/        seed da API e teste dos dados do seed
```

## Uso de IA no projeto

**No produto:** a JOVI AI é uma proposta. Neste site, a parte de inteligência artificial (entrada por voz, análise de cena e ajuste automático da câmera) aparece apenas como conceito, em textos e nas telas do protótipo. O "Descreva a foto" do Estúdio não usa IA: ele compara as palavras digitadas com as palavras-chave de cada receita.

**No desenvolvimento:** a equipe usou ferramentas de IA como apoio. O Codex (OpenAI) ajudou a reorganizar a documentação do repositório e a preparar as instruções para a continuação do projeto. O Claude Code (Anthropic) foi usado na revisão do código e deixar os comentários mais claros.

## Equipe

Open Source Consulting. Os nomes completos e os RMs estão em [INTEGRANTES.txt](INTEGRANTES.txt).
