// Telas do protótipo do aplicativo (feito na Sprint 3), na ordem em que o usuário vê.
import cameraPrincipal from '../assets/screenshots/camera-principal.jpg';
import menuJoviAi from '../assets/screenshots/menu-jovi-ai.png';
import duvidasChatbot from '../assets/screenshots/duvidas-chatbot.png';
import guiadoObjetivo from '../assets/screenshots/modo-guiado-objetivo.png';
import automaticoObjetivo from '../assets/screenshots/modo-automatico-objetivo.png';
import guiadoPassos from '../assets/screenshots/modo-guiado-passos.png';
import automaticoOtimizacao from '../assets/screenshots/modo-automatico-otimizacao.png';
import modosCamera from '../assets/screenshots/modos-camera.png';

// formato: "destaque" (maior), "larga" (imagem ao lado do texto) ou "normal"
export const TELAS = [
  {
    id: 'camera-principal',
    imagem: cameraPrincipal,
    largura: 443,
    altura: 913,
    formato: 'destaque',
    titulo: 'Interface principal',
    texto:
      'A câmera da JOVI com o agente sempre a um toque, pelo botão AI ao lado do disparador. Nada muda no visor até que o usuário peça.',
    alt: 'Tela principal da câmera JOVI com o visor ocupando quase toda a tela, indicadores HDR e 4K60 no topo e o seletor de modos na base.',
  },
  {
    id: 'menu-jovi-ai',
    imagem: menuJoviAi,
    largura: 433,
    altura: 905,
    formato: 'normal',
    titulo: 'JOVI AI',
    texto: 'Três caminhos: tirar dúvidas, ser guiado passo a passo ou autorizar a configuração automática.',
    alt: 'Menu da JOVI AI com o título Selecione uma opção e três alternativas: Dúvidas (chatbot), Modo guiado e Modo automático.',
  },
  {
    id: 'duvidas-chatbot',
    imagem: duvidasChatbot,
    largura: 410,
    altura: 880,
    formato: 'normal',
    titulo: 'Dúvidas',
    texto: 'O chatbot explica modos e recursos em linguagem simples, sem jargão técnico.',
    alt: 'Chatbot da JOVI AI exibindo a mensagem Olá! Sou a JOVI AI. Como posso ajudar com sua foto? e um campo de texto para perguntar à IA.',
  },
  {
    id: 'modo-guiado-objetivo',
    imagem: guiadoObjetivo,
    largura: 447,
    altura: 830,
    formato: 'normal',
    titulo: 'Modo Guiado\u00a0· objetivo',
    texto: 'Em poucas palavras, o usuário diz o que quer fotografar.',
    alt: 'Tela do Modo Guiado perguntando O que você deseja fotografar?, com campo de texto livre e o botão Continuar.',
  },
  {
    id: 'modo-automatico-objetivo',
    imagem: automaticoObjetivo,
    largura: 435,
    altura: 801,
    formato: 'normal',
    titulo: 'Modo Automático\u00a0· objetivo',
    texto: 'A mesma descrição, agora com autorização para a IA configurar.',
    alt: 'Tela do Modo Automático perguntando O que deseja fotografar?, explicando que a IA otimizará a câmera automaticamente.',
  },
  {
    id: 'modo-guiado-passos',
    imagem: guiadoPassos,
    largura: 454,
    altura: 804,
    formato: 'larga',
    titulo: 'Modo Guiado\u00a0· passo a passo',
    texto:
      'Cinco instruções curtas e ordenadas, em linguagem comum. Nenhum ajuste é aplicado automaticamente — quem configura a câmera é você.',
    alt: 'Tela Como Configurar a Câmera com cinco passos numerados: manter o seletor em Foto, centralizar o objeto, usar fundo neutro, travar o foco e ajustar o brilho.',
  },
  {
    id: 'modo-automatico-otimizacao',
    imagem: automaticoOtimizacao,
    largura: 428,
    altura: 904,
    formato: 'larga',
    titulo: 'Modo Automático\u00a0· otimização',
    texto:
      'Tudo o que a IA aplicou fica listado — modo, abertura, ISO e estabilização — antes de a câmera ficar pronta para o disparo.',
    alt: 'Tela Otimização Inteligente listando os parâmetros aplicados pela IA e a confirmação Configurações aplicadas com sucesso, acima do botão Capturar Agora.',
  },
  {
    id: 'modos-camera',
    imagem: modosCamera,
    largura: 459,
    altura: 911,
    formato: 'larga',
    linhaInteira: true, // é a 3ª tela larga, então ocupa a linha toda no desktop
    titulo: 'Modos extras',
    texto:
      'Além dos modos principais, a câmera reúne mais doze recursos especializados — do modo Astro ao Documento — todos ao alcance do agente.',
    alt: 'Tela Mais da câmera JOVI com uma grade de doze modos extras: Pro, Panorama, Câmera Lenta, Time-Lapse, Noite+, Documento, Astro, Profissional, Instantâneo, Comida, Visualização Dupla e Foto em Movimento.',
  },
];

// Telas que também aparecem no hero e na seção de modos.
export const TELA_CAMERA = TELAS[0];
export const TELA_GUIADO_PASSOS = TELAS[5];
export const TELA_AUTOMATICO_OTIMIZACAO = TELAS[6];